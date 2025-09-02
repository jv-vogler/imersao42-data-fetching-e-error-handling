import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface GameOverScreenProps {
  status: 'won' | 'lost'
  rounds: number
  onRestart: () => void
}

export function GameOverScreen({
  status,
  rounds,
  onRestart,
}: GameOverScreenProps) {
  return (
    <Container className="my-96 flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          {status === 'won' ? '🎉 You Won!' : '😢 You Lost!'}
        </h1>
        <p className="mb-8 text-xl opacity-80">Game lasted {rounds} rounds</p>
        <Button onClick={onRestart} className="px-8 py-4 text-xl">
          Play Again
        </Button>
      </div>
    </Container>
  )
}
