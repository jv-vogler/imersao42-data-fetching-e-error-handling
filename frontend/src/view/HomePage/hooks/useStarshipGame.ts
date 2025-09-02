import { useState } from 'react'
import type {
  BattleResult,
  CombatProperty,
  GameState,
  Starship,
} from '@/starshipBattles/game'
import { makeGame } from '@/starshipBattles/game'
import { showToast } from '@/lib/toast'

const AI_TURN_DELAY = 1000

const game = makeGame()

export function useStarshipGame() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [lastBattle, setLastBattle] = useState<BattleResult | null>(null)
  const [isShowingBattleResult, setIsShowingBattleResult] = useState(false)
  const [pendingAITurn, setPendingAITurn] = useState(false)
  const [frozenCardCounts, setFrozenCardCounts] = useState<{
    playerCount: number
    aiCount: number
  } | null>(null)

  const startNewGame = (starships: Array<Starship>) => {
    const newGameState = game.newGame(starships)
    setGameState(newGameState)
    setLastBattle(null)
    setIsShowingBattleResult(false)
    setPendingAITurn(false)
    setFrozenCardCounts(null)
  }

  const nextRound = () => {
    if (!gameState || !lastBattle) return
    if (gameState.gameStatus !== 'playing') {
      setIsShowingBattleResult(false)
      return
    }
    if (pendingAITurn) {
      setFrozenCardCounts({
        playerCount: gameState.playerDeck.length,
        aiCount: gameState.aiDeck.length,
      })
      setTimeout(() => {
        setGameState((currentGameState) => {
          if (!currentGameState) return currentGameState
          const aiProperty = game.getRandomProperty()
          const aiState = game.playRound(currentGameState, aiProperty)
          const aiBattle =
            aiState.battleHistory[aiState.battleHistory.length - 1]
          setLastBattle(aiBattle)
          setPendingAITurn(false)
          setIsShowingBattleResult(true)
          if (aiBattle.winner === 'ai') {
            showToast.error(
              `AI won with ${aiBattle.property}: ${aiBattle.aiValue} vs ${aiBattle.playerValue}`,
            )
          } else if (aiBattle.winner === 'player') {
            showToast.success(
              `You won with ${aiBattle.property}: ${aiBattle.playerValue} vs ${aiBattle.aiValue}`,
            )
          } else {
            showToast.info(
              `Draw! Both had ${aiBattle.property}: ${aiBattle.playerValue}`,
            )
          }
          return aiState
        })
      }, AI_TURN_DELAY)
    } else {
      if (!gameState.isPlayerTurn) {
        setFrozenCardCounts({
          playerCount: gameState.playerDeck.length,
          aiCount: gameState.aiDeck.length,
        })
        setPendingAITurn(true)
        setTimeout(() => {
          setGameState((currentGameState) => {
            if (!currentGameState) return currentGameState
            const aiProperty = game.getRandomProperty()
            const aiState = game.playRound(currentGameState, aiProperty)
            const aiBattle =
              aiState.battleHistory[aiState.battleHistory.length - 1]
            setLastBattle(aiBattle)
            setPendingAITurn(false)
            setIsShowingBattleResult(true)
            if (aiBattle.winner === 'ai') {
              showToast.error(
                `AI won with ${aiBattle.property}: ${aiBattle.aiValue} vs ${aiBattle.playerValue}`,
              )
            } else if (aiBattle.winner === 'player') {
              showToast.success(
                `You won with ${aiBattle.property}: ${aiBattle.playerValue} vs ${aiBattle.aiValue}`,
              )
            } else {
              showToast.info(
                `Draw! Both had ${aiBattle.property}: ${aiBattle.playerValue}`,
              )
            }
            return aiState
          })
        }, AI_TURN_DELAY)
      } else {
        setIsShowingBattleResult(false)
        setTimeout(() => setFrozenCardCounts(null), 100)
      }
    }
  }

  const playRound = (property: CombatProperty) => {
    if (!gameState) return
    setFrozenCardCounts({
      playerCount: gameState.playerDeck.length,
      aiCount: gameState.aiDeck.length,
    })
    const newState = game.playRound(gameState, property)
    const lastBattleResult =
      newState.battleHistory[newState.battleHistory.length - 1]
    setGameState(newState)
    setLastBattle(lastBattleResult)
    setIsShowingBattleResult(true)
    if (lastBattleResult.winner === 'player') {
      showToast.success(
        `You won with ${lastBattleResult.property}: ${lastBattleResult.playerValue} vs ${lastBattleResult.aiValue}`,
      )
    } else if (lastBattleResult.winner === 'ai') {
      showToast.error(
        `AI won with ${lastBattleResult.property}: ${lastBattleResult.aiValue} vs ${lastBattleResult.playerValue}`,
      )
    } else {
      showToast.info(
        `Draw! Both had ${lastBattleResult.property}: ${lastBattleResult.playerValue}`,
      )
    }
    if (newState.gameStatus === 'playing' && !newState.isPlayerTurn) {
      setPendingAITurn(true)
    }
  }

  const currentPlayerCard = gameState
    ? game.getCurrentPlayerCard(gameState)
    : null

  return {
    gameState,
    lastBattle,
    isShowingBattleResult,
    pendingAITurn,
    frozenCardCounts,
    startNewGame,
    nextRound,
    playRound,
    currentPlayerCard,
  }
}
