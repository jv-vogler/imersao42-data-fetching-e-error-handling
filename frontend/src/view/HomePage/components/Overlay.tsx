import { cn } from '@/lib/utils'

type OverlayProps = {
  fade?: 'in' | 'out' | null
}

export const Overlay = ({ fade = 'in' }: OverlayProps) => {
  return (
    <div
      className={cn(
        `pointer-events-none absolute z-50 h-full w-full bg-transparent transition-colors duration-1000`,
        `${fade === 'out' ? 'bg-black' : 'bg-transparent'}`,
      )}
    />
  )
}
