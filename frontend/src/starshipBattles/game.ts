export type Starship = {
  name: string
  model: string
  starship_class: string
  speed: number
  maneuverability: number
  firepower: number
  shields: number
  overall: number
}

export type CombatProperty =
  | 'speed'
  | 'maneuverability'
  | 'firepower'
  | 'shields'

export type GameStatus = 'playing' | 'won' | 'lost'

export interface BattleResult {
  playerCard: Starship
  aiCard: Starship
  property: CombatProperty
  playerValue: number
  aiValue: number
  winner: 'player' | 'ai' | 'draw'
}

export interface GameState {
  playerDeck: Array<Starship>
  aiDeck: Array<Starship>
  currentRound: number
  gameStatus: GameStatus
  battleHistory: Array<BattleResult>
  isPlayerTurn: boolean
}

const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const newGame = (starships: Array<Starship>): GameState => {
  const shuffled = shuffleArray(starships)
  const midpoint = Math.floor(shuffled.length / 2)

  return {
    playerDeck: shuffled.slice(0, midpoint),
    aiDeck: shuffled.slice(midpoint),
    currentRound: 1,
    gameStatus: 'playing',
    battleHistory: [],
    isPlayerTurn: true,
  }
}

const battleCards = (
  playerCard: Starship,
  aiCard: Starship,
  property: CombatProperty,
): BattleResult => {
  const playerValue = playerCard[property]
  const aiValue = aiCard[property]

  let winner: 'player' | 'ai' | 'draw'

  if (playerValue === aiValue) {
    if (playerCard.overall > aiCard.overall) {
      winner = 'player'
    } else if (aiCard.overall > playerCard.overall) {
      winner = 'ai'
    } else {
      winner = 'draw'
    }
  } else if (playerValue > aiValue) {
    winner = 'player'
  } else if (aiValue > playerValue) {
    winner = 'ai'
  } else {
    winner = 'draw'
  }

  return {
    playerCard,
    aiCard,
    property,
    playerValue,
    aiValue,
    winner,
  }
}

const playRound = (
  gameState: GameState,
  property: CombatProperty,
): GameState => {
  const { playerDeck, aiDeck, currentRound, battleHistory, isPlayerTurn } =
    gameState

  if (playerDeck.length === 0 || aiDeck.length === 0) {
    return gameState
  }

  const playerCard = playerDeck[0]
  const aiCard = aiDeck[0]

  const battleResult = battleCards(playerCard, aiCard, property)

  let newPlayerDeck = playerDeck.slice(1)
  let newAiDeck = aiDeck.slice(1)
  let newIsPlayerTurn = isPlayerTurn

  if (battleResult.winner === 'player') {
    newPlayerDeck = [...newPlayerDeck, playerCard, aiCard]
    newIsPlayerTurn = true
  } else if (battleResult.winner === 'ai') {
    newAiDeck = [...newAiDeck, aiCard, playerCard]
    newIsPlayerTurn = false
  } else {
    newPlayerDeck = [...newPlayerDeck, playerCard]
    newAiDeck = [...newAiDeck, aiCard]
  }

  let gameStatus: GameStatus = 'playing'
  if (newPlayerDeck.length === 0) {
    gameStatus = 'lost'
  } else if (newAiDeck.length === 0) {
    gameStatus = 'won'
  }

  return {
    playerDeck: newPlayerDeck,
    aiDeck: newAiDeck,
    currentRound: currentRound + 1,
    gameStatus,
    battleHistory: [...battleHistory, battleResult],
    isPlayerTurn: newIsPlayerTurn,
  }
}

const getCurrentPlayerCard = (gameState: GameState): Starship | null => {
  return gameState.playerDeck.length > 0 ? gameState.playerDeck[0] : null
}

const getCurrentAiCard = (gameState: GameState): Starship | null => {
  return gameState.aiDeck.length > 0 ? gameState.aiDeck[0] : null
}

const getRandomProperty = (): CombatProperty => {
  const properties: Array<CombatProperty> = [
    'speed',
    'maneuverability',
    'firepower',
    'shields',
  ]
  return properties[Math.floor(Math.random() * properties.length)]
}

export const makeGame = () => {
  return {
    newGame,
    playRound,
    getCurrentPlayerCard,
    getCurrentAiCard,
    getRandomProperty,
    battleCards,
  }
}
