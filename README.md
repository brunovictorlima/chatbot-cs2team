# Protótipo Funcional Responsivo de Chatbot FURIA CS2

## Descrição do Repositório

Protótipo Funcional Responsivo de Chatbot desenvolvido com ReactJS para demonstrar na prática todo o fluxo do Caso de Uso Conversacional desenvolvido.

## Tecnologias Utilizadas

Este protótipo funcional foi desenvolvido utilizando as seguintes tecnologias e ferramentas principais:

-   **Frontend:** ReactJS (com Hooks para gerenciamento de estado), Vite (como ferramenta de build e servidor de desenvolvimento), JavaScript (ES6+), CSS.
-   **Gerenciador de Pacotes:** npm (Node Package Manager).
-   **Controle de Versão:** Git e a plataforma GitHub para hospedagem do repositório.
-   **Deploy:** Firebase Hosting, utilizado para disponibilizar a aplicação online de forma rápida e eficiente.

## Fluxos Conversacionais Implementados

Este protótipo de chatbot foi desenvolvido para simular o fluxo de atendimento descrito no Caso de Uso Conversacional fornecido, demonstrando a capacidade de navegar por menus, apresentar informações e tratar interações do usuário. Abaixo estão os principais cenários e lógicas implementadas, refletindo o comportamento do chatbot:

### Menu Principal

Ao iniciar ou reiniciar o chat, o usuário é recebido com a mensagem de boas-vindas e as opções principais:

-   **1. Próximos Jogos**
-   **2. Retrospecto e Estatísticas**
-   **3. Setup e CFG dos jogadores**

O usuário pode navegar selecionando o **número** ou digitando **palavras-chave** correspondentes à opção desejada.

### Navegação para Tópicos de Informação (Regra Global 2)

Ao selecionar uma opção que leva a informações específicas (como Próximos Jogos, Placares, Estatísticas, ou CFG de um Jogador), o chatbot responde com a informação solicitada. **Imediatamente após exibir a informação, o chatbot apresentará uma segunda mensagem contendo o menu "O que mais você gostaria de fazer?"** com as opções para voltar ao menu principal ou finalizar a conversa.

-   **Exemplo:**
    1.  Usuário seleciona "1. Próximos Jogos" no menu principal.
    2.  Chatbot envia mensagem com **Informações do Próximo Jogo**.
    3.  Chatbot envia uma **segunda mensagem** com o menu "O que mais você gostaria de fazer?", oferecendo "1. Voltar para o menu principal" e "2. Finalizar conversa".

### Menus Secundários e Opção "Mais Opções" (Regra Global 1)

Ao selecionar uma opção que leva a um menu secundário (como Retrospecto e Estatísticas, ou Setup e CFG dos jogadores), o chatbot exibe o menu com as novas opções do submenu. **Em todos esses menus secundários, uma opção "Mais opções" é automaticamente adicionada ao final da lista**, com um número sequencial apropriado.

-   **Exemplo:**
    1.  Usuário seleciona "2. Retrospecto e Estatísticas" no menu principal.
    2.  Chatbot exibe o menu do Retrospecto, listando "1. Placares", "2. Mapas jogados", "3. Estatísticas individuais", **e a opção dinâmica "4. Mais opções"**.

**Ação "Mais Opções":** Ao selecionar a opção "Mais opções" de qualquer menu, o chatbot responde com o menu "O que mais você gostaria de fazer?", oferecendo as opções "1. Voltar para o menu principal" e "2. Finalizar conversa".

### Opção "Voltar para o Menu Principal"

A opção "1. Voltar para o menu principal" (presente no menu "O que mais você gostaria de fazer?") redireciona a conversa de volta para o menu inicial.

### Opção "Finalizar Conversa"

A opção "2. Finalizar conversa" (presente no menu "O que mais você gostaria de fazer?") leva à mensagem final de despedida do chatbot. Ao alcançar este estado, o campo de input é desabilitado por um breve período e depois reabilitado para permitir o reinício.

## Reinício da Conversa

Após a conversa ser finalizada (seja pelo fluxo "Finalizar Conversa" ou pelo estado de instabilidade), o campo de input é desabilitado por um curto período e reabilitado automaticamente. **Qualquer nova mensagem digitada pelo usuário neste ponto irá limpar o histórico do chat e reiniciar a conversa**, voltando para o menu principal.

---

### Tratamento de Entradas Inválidas

Se o usuário digitar uma mensagem que o chatbot não consegue entender (não corresponde a nenhuma opção no estado atual da conversa), o chatbot responde com uma mensagem indicando que não compreendeu **e, em seguida, apresenta o menu "O que mais você gostaria de fazer?"** para guiar o usuário de volta ao fluxo.

### Tratamento de Instabilidade (Simulado)

Em um cenário que simula uma instabilidade do sistema (ocorre no código caso um ID de prompt não seja encontrado em `botPrompts.js`), o chatbot responde com a mensagem de erro de sistema **e, em seguida, apresenta o menu "O que mais você gostaria de fazer?"**.

---

## Testes Realizados

De acordo com os testes realizados durante o desenvolvimento deste protótipo, todo o fluxo de navegação da aplicação por meio da **seleção numérica das opções** foi testado e está funcional, seguindo o Caso de Uso Conversacional implementado.

A interpretação de **palavras-chave e mensagens de texto livre** para navegação, embora implementada, pode conter erros ou apresentar alguma instabilidade, pois não foi testada exaustivamente para todas as opções e variações possíveis de texto.

---

## Como Executar Localmente

Siga os passos abaixo para configurar e rodar a aplicação na sua máquina local, permitindo testar o código e fazer modificações se necessário.

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados no seu computador:

-   **Node.js:** Necessário para executar o ambiente de desenvolvimento JavaScript e o npm. Baixe e instale a versão LTS (Long-Term Support) recomendada para o seu sistema operacional no site oficial: [https://nodejs.org/](https://nodejs.org/). O npm é instalado junto com o Node.js.
-   **Git:** Essencial para clonar o código do repositório GitHub. Baixe e instale a versão mais recente para o seu sistema operacional no site oficial: [https://git-scm.com/](https://git-scm.com/).

### Passos para Rodar

1.  **Clone o Repositório:**
    Abra o terminal ou PowerShell no diretório onde você deseja salvar o projeto e execute o comando `git clone`, seguido da URL do seu repositório privado no GitHub:
    ```bash
    git clone [https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility](https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
    ```
    *Certifique-se de usar a URL correta do seu repositório privado. Você pode obtê-la na página do seu repositório no GitHub, clicando no botão "Code".*

2.  **Navegue até o Diretório do Projeto:**
    Entre na pasta do projeto que foi criada após a clonagem. O nome da pasta será o nome do seu repositório.
    ```bash
    cd Nome-da-Pasta-do-Seu-Repositorio
    ```
    *Substitua `Nome-da-Pasta-do-Seu-Repositorio` pelo nome real da pasta.*

3.  **Instale as Dependências:**
    Dentro do diretório do projeto, instale todas as dependências necessárias definidas no arquivo `package.json`. Como você usa npm, o comando é:
    ```bash
    npm install
    ```

4.  **Inicie o Servidor de Desenvolvimento:**
    Execute o script para iniciar a aplicação em modo de desenvolvimento. **Como este projeto utiliza Vite**, o script comum para iniciar o servidor de desenvolvimento é `dev`.
    ```bash
    npm run dev
    ```
    *Este comando inicia o servidor de desenvolvimento do Vite.*

5.  **Acesse a Aplicação:**
    Após iniciar o servidor, a aplicação estará disponível no seu navegador. O endereço padrão para projetos Vite é geralmente:
    ```
    http://localhost:5173
    ```
    O terminal onde você rodou o comando `npm run dev` também indicará o endereço exato.
