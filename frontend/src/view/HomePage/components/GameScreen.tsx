import { PropertySelector } from './PropertySelector'
import { StarshipCard } from './StarshipCard'

import type {
  CombatProperty,
  GameState,
  Starship,
} from '@/starshipBattles/game'

import { Container } from '@/components/ui/container'

interface GameScreenProps {
  gameState: GameState
  currentPlayerCard: Starship
  onPropertySelect: (property: CombatProperty) => void
}

export const GameScreen = ({
  gameState,
  currentPlayerCard,
  onPropertySelect,
}: GameScreenProps) => {
  return (
    <Container>
      <div className="mx-auto max-w-4xl py-8">
        <div className="mb-12">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold">Starship Battles</h1>
          </div>

          <div className="rounded-xl bg-gray-800/50 p-6">
            <div className="mb-4 text-center">
              <span className="text-2xl font-bold text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,50,0.3)]">
                Round {gameState.currentRound}
              </span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="mb-1 text-sm font-medium text-gray-400">
                  You
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {gameState.playerDeck.length}
                </div>
                <div className="text-xs text-gray-500">cards</div>
              </div>

              <div className="text-2xl font-bold text-gray-500">VS</div>

              <div className="text-center">
                <div className="mb-1 text-sm font-medium text-gray-400">AI</div>
                <div className="text-3xl font-bold text-red-400">
                  {gameState.aiDeck.length}
                </div>
                <div className="text-xs text-gray-500">cards</div>
              </div>
            </div>
          </div>
        </div>

        {!gameState.isPlayerTurn && (
          <div className="mb-8 text-center">
            <p className="text-xl text-yellow-400">
              AI's Turn - Choosing property...
            </p>
          </div>
        )}

        {gameState.isPlayerTurn && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-bold">Your Ship</h2>
              <StarshipCard
                starship={currentPlayerCard}
                isPlayerCard={true}
              />
            </div>

            <PropertySelector
              starship={currentPlayerCard}
              onPropertySelect={onPropertySelect}
              disabled={!gameState.isPlayerTurn}
            />
          </div>
        )}

        {gameState.battleHistory.length > 0 && (
          <div className="mt-12 rounded-xl bg-gray-800/50 p-6">
            <h3 className="mb-6 text-center text-2xl font-bold">
              Recent Battles
            </h3>
            <div className="custom-scrollbar max-h-48 space-y-3 overflow-y-auto">
              {gameState.battleHistory
                .slice(-5)
                .reverse()
                .map((battle, index) => {
                  const roundNumber = gameState.battleHistory.length - index
                  const isPlayerWin = battle.winner === 'player'
                  const isAIWin = battle.winner === 'ai'

                  return (
                    <div key={index} className="rounded-lg bg-gray-700/50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-300">
                          Round {roundNumber}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {battle.property}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold ${isPlayerWin ? 'text-green-400' : 'text-gray-300'}`}
                          >
                            You: {battle.playerValue}
                          </span>
                          <span className="text-gray-500">vs</span>
                          <span
                            className={`font-bold ${isAIWin ? 'text-red-400' : 'text-gray-300'}`}
                          >
                            AI: {battle.aiValue}
                          </span>
                        </div>

                        <div
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            isPlayerWin
                              ? 'bg-green-500/20 text-green-400'
                              : isAIWin
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {isPlayerWin
                            ? 'You Won'
                            : isAIWin
                              ? 'AI Won'
                              : 'Draw'}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
