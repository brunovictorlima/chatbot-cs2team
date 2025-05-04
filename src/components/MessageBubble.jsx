// src/components/MessageBubble.jsx

import React from 'react';
import './ChatUI.css'; // Importa o CSS para estilização

const MessageBubble = ({ message, onOptionClick }) => {
  const isBot = message.sender === 'bot';

  // Função para renderizar o texto da mensagem, tratando quebras de linha (\n)
  const renderText = (text) => {
    if (typeof text !== 'string') return null; // Safeguard
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Não precisamos de renderOptionsAsText separada mais, pois a segunda mensagem é um menu separadamente.

  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="chat-bubble">
        {/* Renderiza o texto principal da mensagem para TODOS os tipos */}
        {renderText(message.text)}

        {/* Renderiza botões APENAS se for Bot e tipo 'menu' e tiver opções */}
        {isBot && message.type === 'menu' && message.options && message.options.length > 0 && (
          <div className="chat-options-buttons">
            {message.options.map((option, index) => (
              <button
                key={index}
                className="chat-option-button"
                onClick={() => onOptionClick(option.value || option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Para tipos que não são 'menu', apenas o texto principal (renderizado acima) é suficiente */}
        {/* A segunda mensagem de opções (se houver) será um novo balão do tipo 'menu' */}

      </div>
    </div>
  );
};

export default MessageBubble;