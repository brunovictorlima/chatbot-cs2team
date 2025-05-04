// src/components/ChatUI.jsx

import React, { useRef, useEffect } from 'react';
import './ChatUI.css';
// Certifique-se de que MessageBubble está importado e correto (código da resposta anterior)
import MessageBubble from './MessageBubble';

// ChatUI recebe as mensagens, a função de enviar e o estado de desabilitado do input
const ChatUI = ({ messages, onSendMessage, isInputDisabled }) => {
  const inputRef = useRef(null); // Ref para o campo de input
  const chatEndRef = useRef(null); // Ref para rolar até o final

  // Efeito para rolar para a última mensagem sempre que a lista de mensagens for atualizada
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Depende da lista de mensagens

  // NOVO EFEITO: Focar no campo de input
  useEffect(() => {
    // Verifica se a referência do input existe E se o chat NÃO está desabilitado
    if (inputRef.current && !isInputDisabled) {
      inputRef.current.focus(); // Seta o foco no campo de input
    }
  }, [isInputDisabled]); // Depende do estado isInputDisabled.
                          // Roda na montagem (quando isInputDisabled é false inicialmente)
                          // e sempre que isInputDisabled mudar (true -> false ou false -> true)


  // Handler para enviar mensagem ao pressionar Enter no input
  const handleKeyDown = (e) => {
    // Só envia se o chat NÃO estiver desabilitado
    if (!isInputDisabled && e.key === 'Enter') {
      handleSend(); // Chama a função de envio comum
    }
  };

  // Handler para enviar mensagem ao clicar no botão "Enviar"
  const handleSend = () => {
    // Só envia se o chat NÃO estiver desabilitado
     if (!isInputDisabled) {
        const messageText = inputRef.current.value.trim();
        if (messageText !== '') {
          onSendMessage(messageText); // Chama a prop onSendMessage com o texto do input
          inputRef.current.value = ''; // Limpa o campo de input após enviar
        }
     }
  };

  // Handler para lidar com o clique em um botão de opção dentro de um MessageBubble
  const handleOptionClick = (optionValue) => {
      // A lógica no App.jsx já verifica isChatDisabled antes de processar,
      // mas podemos adicionar um check aqui também para segurança,
      // ou confiar no atributo 'disabled' dos botões se MessageBubble o utilizar.
      // Por enquanto, confiamos na lógica do App.jsx e no atributo disabled do botão.
       if (!isInputDisabled) { // Adiciona um check para ser explícito
          onSendMessage(optionValue); // Chama a prop onSendMessage com o valor da opção clicada
       }
  };


  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Mapeia a lista de mensagens e renderiza um MessageBubble para cada uma */}
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx} // Chave única
            message={msg} // Passa o objeto de mensagem completo
            onOptionClick={handleOptionClick} // Passa a handler de clique de opção
          />
        ))}
        {/* Este div vazio ajuda na rolagem automática */}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        {/* Campo de input para o usuário digitar */}
        <input
          ref={inputRef} // Liga a ref ao input
          type="text"
          placeholder="Digite sua mensagem..."
          onKeyDown={handleKeyDown} // Lida com Enter
          disabled={isInputDisabled} // Usa a prop para desabilitar/habilitar
        />
        {/* Botão para enviar a mensagem do input */}
        <button
          onClick={handleSend}
          disabled={isInputDisabled} // Usa a prop para desabilitar/habilitar
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatUI;