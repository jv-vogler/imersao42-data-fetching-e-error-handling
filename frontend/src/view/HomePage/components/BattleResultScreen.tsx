import { useEffect, useState } from 'react'
import { StarshipCard } from './StarshipCard'
import { BattleResultBadge, CardCount } from './BattleResultHelpers'

import type { BattleResult } from '@/starshipBattles/game'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const BATTLE_ANIMATION_DURATION = 1800

interface BattleResultScreenProps {
  battle: BattleResult
  playerCardsRemaining: number
  aiCardsRemaining: number
  frozenPlayerCount?: number
  frozenAICount?: number
  onNextRound: () => void
  isGameOver?: boolean
}

export const BattleResultScreen = ({
  battle,
  playerCardsRemaining,
  aiCardsRemaining,
  frozenPlayerCount,
  frozenAICount,
  onNextRound,
  isGameOver = false,
}: BattleResultScreenProps) => {
  const [showButton, setShowButton] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [displayedPlayerCards, setDisplayedPlayerCards] = useState(
    frozenPlayerCount ?? playerCardsRemaining,
  )
  const [displayedAICards, setDisplayedAICards] = useState(
    frozenAICount ?? aiCardsRemaining,
  )

  useEffect(() => {
    setDisplayedPlayerCards(frozenPlayerCount ?? playerCardsRemaining)
    setDisplayedAICards(frozenAICount ?? aiCardsRemaining)
  }, [playerCardsRemaining, aiCardsRemaining])

  useEffect(() => {
    setShowButton(false)
    setButtonClicked(false)
    setAnimationKey((prev) => prev + 1)

    const cardUpdateTimer = setTimeout(() => {
      setDisplayedPlayerCards(playerCardsRemaining)
      setDisplayedAICards(aiCardsRemaining)
    }, BATTLE_ANIMATION_DURATION)

    const buttonTimer = setTimeout(() => {
      setShowButton(true)
    }, BATTLE_ANIMATION_DURATION)

    return () => {
      clearTimeout(cardUpdateTimer)
      clearTimeout(buttonTimer)
    }
  }, [battle])

  const handleNextRound = () => {
    if (buttonClicked) return
    setButtonClicked(true)
    onNextRound()
  }

  return (
    <Container>
      <div className="mx-auto max-w-6xl py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-4xl font-bold">Battle Result</h1>

          <div className="rounded-xl bg-gray-800/50 p-6">
            <div className="mb-6 flex items-center justify-center gap-8">
              <CardCount
                label="You"
                count={displayedPlayerCards}
                color="text-green-400"
              />
              <div className="text-2xl font-bold text-gray-500">VS</div>
              <CardCount
                label="AI"
                count={displayedAICards}
                color="text-red-400"
              />
            </div>
            <BattleResultBadge winner={battle.winner} />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            key={`player-${animationKey}`}
            className={`battle-card player-card ${
              battle.winner === 'player'
                ? 'winner'
                : battle.winner === 'ai'
                  ? 'loser'
                  : ''
            }`}
          >
            <h2 className="mb-4 text-xl font-bold text-green-400">Your Ship</h2>
            <StarshipCard
              starship={battle.playerCard}
              isPlayerCard={true}
              showAllStats={false}
              selectedProperty={battle.property}
            />
            <div className="mt-4 text-center">
              <div
                className={
                  battle.winner === 'player'
                    ? 'text-3xl font-bold text-green-400'
                    : 'text-base font-semibold text-green-400'
                }
              >
                {battle.property}: {battle.playerValue}
              </div>
              {battle.playerValue === battle.aiValue && (
                <div className="mt-2 text-xs font-bold text-purple-300">
                  Overall: {battle.playerCard.overall}
                </div>
              )}
            </div>
          </div>

          <div
            key={`ai-${animationKey}`}
            className={`battle-card ai-card ${
              battle.winner === 'ai'
                ? 'winner'
                : battle.winner === 'player'
                  ? 'loser'
                  : ''
            }`}
          >
            <h2 className="mb-4 text-xl font-bold text-red-400">AI Ship</h2>
            <StarshipCard
              starship={battle.aiCard}
              isPlayerCard={false}
              showAllStats={false}
              selectedProperty={battle.property}
            />
            <div className="mt-4 text-center">
              <div
                className={
                  battle.winner === 'ai'
                    ? 'text-3xl font-bold text-red-400'
                    : 'text-base font-semibold text-red-400'
                }
              >
                {battle.property}: {battle.aiValue}
              </div>
              {battle.playerValue === battle.aiValue && (
                <div className="mt-2 text-xs font-bold text-purple-300">
                  Overall: {battle.aiCard.overall}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleNextRound}
            className={`px-8 py-4 text-xl transition-opacity ${showButton && !buttonClicked ? 'opacity-100' : 'opacity-0'}`}
            variant="accent"
            disabled={!showButton || buttonClicked}
          >
            {isGameOver ? 'View Results' : 'Next Round'}
          </Button>
        </div>
      </div>
    </Container>
  )
}
