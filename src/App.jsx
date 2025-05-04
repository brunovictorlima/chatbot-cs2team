// src/App.jsx

import React, { useState } from 'react';
import './App.css';
import ChatUI from './components/ChatUI';
import botPrompts from './data/botPrompts';

// Obtém o objeto do prompt inicial 'start'
const initialPrompt = botPrompts['start'];

function App() {
  // Inicializa o estado 'messages' DIRETAMENTE com a primeira mensagem do bot
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: initialPrompt.message,
      type: initialPrompt.type,
      options: initialPrompt.options
    }
  ]);

  // currentStep representa o prompt ATUAL onde o bot está esperando input
  const [currentStep, setCurrentStep] = useState('start');

  // Estado para controlar se o chat está desabilitado visualmente (para o delay de reinício)
  const [isChatDisabled, setIsChatDisabled] = useState(false);

  // Função auxiliar para adicionar uma nova mensagem ao estado 'messages'
  const addMessage = (messageObject) => {
    setMessages(prevMessages => [...prevMessages, messageObject]);
  };

  // handleUserMessage agora lida com reinício ou processamento normal
  const handleUserMessage = (input) => {
    // --- Lógica de REINÍCIO ---
    // Se o estado atual for 'end' ou 'systemDown', QUALQUER input do usuário REINICIA a conversa.
    if (currentStep === 'end' || currentStep === 'systemDown') {
       console.log(`Chat no estado final (${currentStep}). Entrada "${input}" recebida. Reiniciando conversa...`);

       // 1. Resetar os estados para o início
       setMessages([]); // Limpa todas as mensagens da conversa anterior
       setCurrentStep('start'); // Retorna para o passo inicial
       // O campo será reabilitado visualmente após a primeira mensagem de reinício (veja abaixo)
       // Não precisamos setar isChatDisabled(false) aqui imediatamente.

       // 2. Adicionar a primeira mensagem do bot (prompt 'start') à nova conversa
       // Usamos um pequeno delay para que a UI limpe antes de adicionar a primeira mensagem
       const restartPrompt = botPrompts['start']; // Pega o prompt inicial 'start' novamente
       setTimeout(() => {
           addMessage({
             sender: 'bot',
             text: restartPrompt.message,
             type: restartPrompt.type,
             options: restartPrompt.options
           });
            // HABILITA o chat input visualmente AGORA, após a primeira mensagem de reinício ser agendada
            setIsChatDisabled(false); // <-- Reabilita o input visualmente
            console.log("Chat re-habilitado visualmente. Digite para reiniciar.");

       }, 100); // Delay para a mensagem de reinício aparecer

       // IMPORTANTE: NÃO processe a entrada do usuário ('input') como um comando neste caso.
       // A entrada apenas serviu como um "gatilho" para o reinício.
       return; // Interrompe o processamento adicional nesta chamada
    }

    // --- Lógica de Processamento Normal (se NÃO estamos no estado final) ---
    // Se chegamos aqui, o chat NÃO está no estado final. Processamos a entrada normalmente.
    console.log(`Chat habilitado. Processando entrada: "${input}" no passo "${currentStep}".`);

    // 1. Adiciona a mensagem do usuário (apenas se não for um reinício)
    // Esta linha é executada SOMENTE se o chat NÃO estava em estado final
    addMessage({ sender: 'user', text: String(input) });

    // 2. Determina o próximo passo pretendido baseado no estado atual e input do usuário
    const currentPrompt = botPrompts[currentStep];
    let intendedNextStepId = 'error'; // Padrão: vai para o estado de erro, se nenhuma opção corresponder

    const normalizedInput = String(input).trim().toLowerCase();

    // Procura uma opção que corresponda à entrada do usuário no prompt atual
    const matchedOption = currentPrompt.options.find(option => {
      // Verifica por correspondência de valor (números, etc.)
      if (option.value && normalizedInput === String(option.value).toLowerCase()) {
        return true;
      }
      // Verifica por correspondência de palavra(s)-chave
      if (option.keywords && option.keywords.some(keyword => normalizedInput.includes(keyword))) {
         return normalizedInput.includes(keyword); // eslint-disable-line no-undef
      }
      return false; // Nenhuma correspondência encontrada para esta opção
    });

    // Se uma opção correspondente foi encontrada no estado atual (não final), define o próximo passo pretendido
    if (matchedOption) {
        intendedNextStepId = matchedOption.next;
    } else {
        // Se nenhuma opção correspondeu à entrada do usuário no estado atual (não final), vai para erro
        console.log(`Entrada "${input}" não correspondeu a nenhuma opção no estado "${currentStep}". Indo para estado de erro.`);
         intendedNextStepId = 'error'; // Vai para o estado de erro geral
    }


    // --- Determina a sequência de mensagens do bot e o estado final para esta interação ---
    const primaryPrompt = botPrompts[intendedNextStepId];
    const messagesSequence = []; // Mensagens que o bot enviará NESTA rodada
    let finalCurrentStep = intendedNextStepId; // Assume que o estado final será o passo pretendido

    if (primaryPrompt) { // Verifica se o prompt para o intendedNextStepId existe

        // --- Implementa a regra "Mais opções" para MENUs ---
        if (primaryPrompt.type === 'menu') {
            const menuPromptWithExtraOption = JSON.parse(JSON.stringify(primaryPrompt));
            menuPromptWithExtraOption.options = menuPromptWithExtraOption.options || [];

            const highestValue = menuPromptWithExtraOption.options.reduce((max, option) => {
                const optionValue = option.value ? parseInt(option.value, 10) : NaN;
                return !isNaN(optionValue) ? Math.max(max, optionValue) : max;
            }, 0);

            const nextNumber = highestValue + 1;

            const maisOpcoesOption = {
                label: `${nextNumber}. Mais opções`,
                value: `${nextNumber}`,
                keywords: ["mais opcoes", "mais opções", "maisopcoes", "maisopções", "outras opções", "outras opcoes", String(nextNumber)],
                next: "returnOrEndPrompt"
            };

            menuPromptWithExtraOption.options.push(maisOpcoesOption);

            messagesSequence.push({
                sender: 'bot',
                text: menuPromptWithExtraOption.message,
                type: menuPromptWithExtraOption.type,
                options: menuPromptWithExtraOption.options
            });

            finalCurrentStep = intendedNextStepId; // Fica no estado do menu
            setIsChatDisabled(false); // Garante que está habilitado para menus

        } else if (primaryPrompt.type === 'info' || primaryPrompt.type === 'error' || primaryPrompt.type === 'systemDown') {
             // --- Implementa a regra: INFO/ERRO/SYSTEMDOWN seguido pelo menu Voltar/Finalizar ---

             messagesSequence.push({
                sender: 'bot',
                text: primaryPrompt.message,
                type: primaryPrompt.type,
                options: [] // IMPORTANTE: Não inclui options aqui
            });

            const returnOrEndPromptObj = botPrompts['returnOrEndPrompt'];

            if (returnOrEndPromptObj) {
                 messagesSequence.push({
                    sender: 'bot',
                    text: returnOrEndPromptObj.message,
                    type: returnOrEndPromptObj.type,
                    options: returnOrEndPromptObj.options
                 });
                 finalCurrentStep = 'returnOrEndPrompt'; // Vai para o estado do menu Voltar/Finalizar
                 setIsChatDisabled(false); // Habilita o chat para este menu
            } else {
                console.error("Prompt 'returnOrEndPrompt' not found!");
                 const systemDownPrompt = botPrompts['systemDown'];
                 messagesSequence.push({
                     sender: 'bot',
                     text: systemDownPrompt.message,
                     type: systemDownPrompt.type,
                     options: systemDownPrompt.options
                 });
                 finalCurrentStep = 'systemDown';
                 setIsChatDisabled(true); // Desabilita o chat
            }

        } else if (primaryPrompt.type === 'end') {
             // --- Lida com o tipo 'end' ---
             messagesSequence.push({
                sender: 'bot',
                text: primaryPrompt.message,
                type: primaryPrompt.type,
                options: primaryPrompt.options
             });
             finalCurrentStep = intendedNextStepId;
             // O chat será desabilitado brevemente, e depois reabilitado AUTOMATICAMENTE pelo setTimeout abaixo.
             setIsChatDisabled(true); // Desabilita *agora* (visual)

        } else {
            // --- Lida com outros tipos desconhecidos ---
            console.warn(`Tipo de prompt desconhecido: ${primaryPrompt.type}. Tratando como info simples.`);
             messagesSequence.push({
                sender: 'bot',
                text: primaryPrompt.message,
                type: primaryPrompt.type,
                options: primaryPrompt.options
             });
             finalCurrentStep = intendedNextStepId;
             setIsChatDisabled(false); // Assumindo que é interativo por padrão
        }

    } else {
        // --- Lida com o caso onde intendedNextStepId não existe (erro grave) ---
         console.error(`Erro: O prompt '${intendedNextStepId}' não foi encontrado em botPrompts.`);
         const systemDownPrompt = botPrompts['systemDown'];
         messagesSequence.push({
             sender: 'bot',
             text: systemDownPrompt.message,
             type: systemDownPrompt.type,
             options: systemDownPrompt.options
         });
         finalCurrentStep = 'systemDown';
         setIsChatDisabled(true);
    }


    // --- Agenda a adição das mensagens à UI com delays e atualiza o estado final ---
    let delay = 500; // Delay base entre mensagens do bot (ms)

    messagesSequence.forEach((msg, index) => {
        setTimeout(() => {
            addMessage(msg); // Adiciona a mensagem atual

             // --- Lógica para atualizar estado APÓS a última mensagem E REABILITAR INPUT ---
            if (index === messagesSequence.length - 1) {
                 setTimeout(() => { // Pequeno delay para garantir que o React processou a última mensagem
                   setCurrentStep(finalCurrentStep);
                   console.log(`Estado final alcançado: ${finalCurrentStep}.`);

                   // Se o estado final for 'end' ou 'systemDown', agendar a reabilitação do input VISUAL
                   // A lógica de REINICIO é disparada verificando currentStep === 'end' || 'systemDown' NO TOPO
                   if (finalCurrentStep === 'end' || finalCurrentStep === 'systemDown') {
                       const restartEnableVisualDelay = 2500; // Atraso para reabilitar visualmente (2.5 segundos)
                       console.log(`Agendando re-habilitação VISUAL do input em ${restartEnableVisualDelay}ms.`);
                       setTimeout(() => {
                           setIsChatDisabled(false); // <-- REABILITA o input visualmente AQUI
                           // A lógica de reinício AGORA depende de currentStep ser 'end' ou 'systemDown',
                           // o que é setado logo acima.
                           console.log("Chat visualmente re-habilitado. Digite para reiniciar.");
                       }, restartEnableVisualDelay);
                   }
                   // Para outros estados, isChatDisabled já foi setado como false antes do loop de agendamento

                 }, 100); // Pequeno delay adicional para atualização de estado

            }
        }, delay * (index + 1)); // Delay sequencial para cada mensagem

    });

    // Safeguard: Se a sequência estiver vazia, garante estado correto
     if (messagesSequence.length === 0) {
         if (finalCurrentStep !== 'end' && finalCurrentStep !== 'systemDown') {
             setIsChatDisabled(false);
             console.error("Sequência de mensagens do bot vazia, mas não é estado final.");
         }
         // Se for estado final e sequência vazia, isChatDisabled já foi setado como true
         // e a reabilitação visual será agendada.
     }
  }; // Fim de handleUserMessage


  return (
    <>
      {/* Renderiza o componente ChatUI, passando as props necessárias */}
      <ChatUI
        messages={messages} // Lista de mensagens para exibir
        onSendMessage={handleUserMessage} // Função que lida com a entrada do usuário
        isInputDisabled={isChatDisabled} // Passa o estado para desabilitar/habilitar a UI
      />
    </>
  );
}

export default App;