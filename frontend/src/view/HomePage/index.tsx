import { useState } from 'react'
import { BattleResultScreen } from './components/BattleResultScreen'
import { GameScreen } from './components/GameScreen'
import { StartScreen } from './components/StartScreen'
import { GameOverScreen } from './components/GameOverScreen'
import { useStarshipGame } from './hooks/useStarshipGame'
import type { Starship } from '@/starshipBattles/game'
import { Overlay } from '@/view/HomePage/components/Overlay'

const starships: Array<Starship> = [
  {
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    starship_class: 'Corvette',
    speed: 85,
    maneuverability: 70,
    firepower: 60,
    shields: 50,
    overall: 66,
  },
  {
    name: 'Star Destroyer',
    model: 'Imperial I-class Star Destroyer',
    starship_class: 'Star Destroyer',
    speed: 65,
    maneuverability: 30,
    firepower: 90,
    shields: 85,
    overall: 68,
  },
  {
    name: 'Sentinel landing craft',
    model: 'Sentinel-class landing craft',
    starship_class: 'Landing craft',
    speed: 70,
    maneuverability: 60,
    firepower: 40,
    shields: 45,
    overall: 54,
  },
  {
    name: 'Millennium Falcon',
    model: 'YT-1300 light freighter',
    starship_class: 'Light freighter',
    speed: 95,
    maneuverability: 85,
    firepower: 70,
    shields: 65,
    overall: 79,
  },
  {
    name: 'Y-wing',
    model: 'BTL Y-wing',
    starship_class: 'Assault starfighter',
    speed: 75,
    maneuverability: 70,
    firepower: 65,
    shields: 50,
    overall: 65,
  },
  {
    name: 'X-wing',
    model: 'T-65 X-wing',
    starship_class: 'Starfighter',
    speed: 80,
    maneuverability: 80,
    firepower: 70,
    shields: 55,
    overall: 71,
  },
]

const FADE_TRANSITION_DELAY = 1500

export const HomePage = () => {
  const {
    gameState,
    lastBattle,
    isShowingBattleResult,
    frozenCardCounts,
    startNewGame,
    nextRound,
    playRound,
    currentPlayerCard,
  } = useStarshipGame()
  const [fade, setFade] = useState<'in' | 'out' | null>('in')

  const handleStartGame = () => {
    setFade('out')

    setTimeout(() => {
      startNewGame(starships)
      setFade('in')
    }, FADE_TRANSITION_DELAY)
  }

  if (!gameState) {
    return (
      <div className="relative flex h-screen items-center justify-center">
        <Overlay fade={fade} />
        <StartScreen onStart={handleStartGame} />
      </div>
    )
  }

  if (gameState.gameStatus !== 'playing' && !isShowingBattleResult) {
    return (
      <GameOverScreen
        status={gameState.gameStatus}
        rounds={gameState.currentRound - 1}
        onRestart={handleStartGame}
      />
    )
  }

  if (isShowingBattleResult && lastBattle) {
    return (
      <BattleResultScreen
        battle={lastBattle}
        playerCardsRemaining={gameState.playerDeck.length}
        aiCardsRemaining={gameState.aiDeck.length}
        frozenPlayerCount={frozenCardCounts?.playerCount}
        frozenAICount={frozenCardCounts?.aiCount}
        onNextRound={nextRound}
        isGameOver={gameState.gameStatus !== 'playing'}
      />
    )
  }

  if (currentPlayerCard) {
    return (
      <div className="relative flex h-screen items-center justify-center">
        <Overlay fade={fade} />
        <GameScreen
          gameState={gameState}
          currentPlayerCard={currentPlayerCard}
          onPropertySelect={playRound}
        />
      </div>
    )
  }

  return null
}
