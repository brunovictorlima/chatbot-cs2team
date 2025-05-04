// src/data/botPrompts.js

const botPrompts = {
  start: {
    type: "menu",
    message: `Fala, guerreiro(a)!

Aqui é o contato inteligente da FURIA CS!

Esse espaço é pra você, nosso torcedor!
Aqui você encontra tudo sobre:

1. Próximos Jogos
2. Retrospecto e Estatísticas
3. Setup e CFG dos jogadores

É só dizer o número ou o que você procura!`,
    options: [
      { label: "1. Próximos Jogos", value: "1", keywords: ["proximos jogos", "jogos"], next: "nextGames" },
      { label: "2. Retrospecto e Estatísticas", value: "2", keywords: ["retrospecto", "estatisticas", "stats"], next: "statsMenu" },
      { label: "3. Setup e CFG dos jogadores", value: "3", keywords: ["setup", "cfg", "jogadores"], next: "cfgMenu" },
    ]
  },

  nextGames: {
    type: "info",
    message: `Sobre o torneio:

Data: De 03/05/2025 a 10/05/2025.
Local: Arena Fictícia, Copenhagen - Dinamarca.
Formato: Fase de Grupos MD3, Playoffs Eliminação Simples MD3.
Premiação: $250.000.

Nosso próximo confronto:
Enfrentaremos a equipe (Nome do Adversário).

A partida está prevista para as (Hora do Próximo Jogo + Fuso horário) — Fique ligado(a) para possíveis atrasos!`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  statsMenu: {
    type: "menu",
    message: `Aqui você pode ver tudo sobre nosso retrospecto recente:

1. Placares
2. Mapas jogados
3. Estatísticas individuais`,
    options: [
      { label: "1. Placares", value: "1", keywords: ["placares", "placar"], next: "scoreHistory" },
      { label: "2. Mapas jogados", value: "2", keywords: ["mapas", "mapas jogados"], next: "mapStats" },
      { label: "3. Estatísticas individuais", value: "3", keywords: ["estatisticas", "stats", "individuais", "jogadores"], next: "playerStats" },
    ]
  },

  scoreHistory: {
    type: "info",
    message: "Placares (últimos 3 meses)",
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  mapStats: {
    type: "info",
    message: "Estatísticas de mapas jogados (últimos 3 meses)",
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  playerStats: {
    type: "info",
    message: "Estatísticas individuais de todos os players da equipe (últimos 3 meses)",
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  cfgMenu: {
    type: "menu",
    message: `Aqui você encontra os periféricos e as principais configurações de jogo dos nossos craques!

1. FalleN
2. KSCERATO
3. YEKINDAR
4. yuurih
5. molodoy`,
    options: [
      { label: "1. FalleN", value: "1", keywords: ["player1", "player 1"], next: "cfgPlayer1" },
      { label: "2. KSCERATO", value: "2", keywords: ["player2", "player 2"], next: "cfgPlayer2" },
      { label: "3. YEKINDAR", value: "3", keywords: ["player3", "player 3"], next: "cfgPlayer3" },
      { label: "4. yuurih", value: "4", keywords: ["player4", "player 4"], next: "cfgPlayer4" },
      { label: "5. molodoy", value: "5", keywords: ["player5", "player 5"], next: "cfgPlayer5" },
    ]
  },

  cfgPlayer1: {
    type: "info",
    message: `Informações do FalleN:

### Periféricos ###
Mouse: ZOWIE EC1-DW
Mousepad: Fallen Gear Pantera Pro Furia Edition
Teclado: Razer Huntsman V3 Pro TKL White
Monitor: ZOWIE XL2546k
Headset: Fallen Gear Morcego Pro Wireless
Earphones: Bose QuietComfort 20

### Configurações de jogo ###
Sensitivity: 2.2 | DPI: 400 | eDPI: 880 | Zoom Sensitivity: 1
Hz: 1000 | Windows Sensitivity: 6

Crosshair: CSGO-5pfty-Rr37G-beVGw-RNfo2-HDWzE

Viewmodel:
viewmodel_fov 60; viewmodel_offset_x 1; viewmodel_offset_y 1; viewmodel_offset_z -1; viewmodel_presetpos 1;

Launch Options:
-w 1024 -h 768 -tickrate 128 -refresh 240 -novid

Video Settings:
Resolução: 1280x960 | 4:3 | Stretched
Bright: 100% | Fullscreen
V-Sync: OFF | Reflex: OFF | FPS: 999
Sombras: High | Detalhes: Low | Anti-Aliasing: 4x MSAA

Radar:
Player Centralizado: Sim | Rotacionando: Sim | Toggle Shape With Scoreboard: Yes | Radar Hud Size: 1.00 | Radar Map Zoom: 0.5`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  cfgPlayer2: {
    type: "info",
    message: `Informações do Player2 (mock)...`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

   cfgPlayer3: {
    type: "info",
    message: `Informações do Player3 (mock)...`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

   cfgPlayer4: {
    type: "info",
    message: `Informações do Player4 (mock)...`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

   cfgPlayer5: {
    type: "info",
    message: `Informações do Player5 (mock)...`,
    options: [
      { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
      { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
    ]
  },

  error: {
    type: "info",
    message: `Hmm... não entendi o que você deseja.\nDigite o número correspondente ou escreva uma das opções.`,
    options: []
  },

   systemDown: {
    type: "info",
    message: `Parece que estamos passando por uma instabilidade no sistema, tente novamente daqui há alguns minutos.`,
    options: []
  },

  // PROMPT: Usado para perguntar se quer voltar ou finalizar
  returnOrEndPrompt: {
      type: "menu", // Mantemos 'menu' para renderizar botões
      // MENSAGEM ATUALIZADA para incluir as opções explicitamente no texto
      message: `O que mais você gostaria de fazer?

1 - Voltar para o menu principal
2 - Finalizar conversa`,
      options: [
          { label: "1. Voltar para o menu principal", value: "1", keywords: ["voltar", "menu", "principal"], next: "start" },
          { label: "2. Finalizar conversa", value: "2", keywords: ["finalizar", "encerrar", "adeus"], next: "end" },
      ]
  },

  end: {
    type: "end",
    message: `Estamos finalizando a conversa, mas sempre que quiser, entre em contato com a gente!`,
    options: []
  }
};

export default botPrompts;