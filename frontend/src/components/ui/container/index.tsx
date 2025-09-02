import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

const sizeVariants = {
  sm: 'px-4 py-6 max-w-md',
  md: 'px-6 py-8 max-w-2xl',
  lg: 'px-8 py-12 max-w-4xl',
  xl: 'px-12 py-16 max-w-6xl',
}

function Container({
  children,
  className,
  size = 'lg',
  fullWidth = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        // Base styles
        'font-orbitron bg-primary/5 border-primary/20 shadow-primary/10 mt-4 flex items-center justify-center border text-sm shadow-lg backdrop-blur-md',
        // Responsive sizing
        fullWidth
          ? 'w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12'
          : sizeVariants[size],
        // Center container unless full width
        !fullWidth && 'mx-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { Container }
