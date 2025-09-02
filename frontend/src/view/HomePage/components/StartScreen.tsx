import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface StartScreenProps {
  onStart: () => void
}

function StarsBackground() {
  const [stars, setStars] = useState<
    Array<{
      x: number
      y: number
      r: number
      opacity: number
      duration: number
      delay: number
    }>
  >([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setStars(
      Array.from({ length: 80 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      })),
    )
  }, [])

  if (!isMounted) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg className="block h-full w-full" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg className="block h-full w-full">
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill="white"
            opacity={star.opacity}
            className="star-twinkle"
            style={{
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [flyAway, setFlyAway] = useState(false)

  const handleStart = () => {
    setFlyAway(true)
  }

  const handleAnimationEnd = () => {
    if (flyAway) {
      setTimeout(() => onStart(), 500)
    }
  }

  return (
    <Container className="relative m-96 flex flex-1 items-center justify-center overflow-hidden bg-black">
      <StarsBackground />
      <img
        src="/images/starships/Millennium Falcon.webp"
        alt="Millennium Falcon"
        className={`pointer-events-none absolute right-0 bottom-0 w-1/3 max-w-xs select-none ${flyAway ? 'animate-ship-fly-away' : 'animate-ship-fly'}`}
        aria-hidden
        onAnimationEnd={handleAnimationEnd}
      />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8">
        <h1 className="mb-4 animate-pulse text-5xl font-extrabold text-yellow-300 drop-shadow-[0_0_16px_rgba(250,204,21,0.7)]">
          Starship Battles
        </h1>
        <Button
          onClick={handleStart}
          className="px-8 py-4 text-xl"
          variant="accent"
          disabled={flyAway}
        >
          Start New Battle
        </Button>
      </div>
    </Container>
  )
}
