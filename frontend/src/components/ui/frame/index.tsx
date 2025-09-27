import { useEffect, useRef } from 'react'

import { setupSvgRenderer } from '@left4code/svg-renderer'
import { twMerge } from 'tailwind-merge'
import type { Paths } from '@left4code/svg-renderer'

function Frame({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: {
  paths: Paths
  enableBackdropBlur?: boolean
  enableViewBox?: boolean
} & React.ComponentProps<'svg'>) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      })

      return () => instance.destroy()
    }
  }, [paths])

  return (
    <svg
      {...props}
      className={twMerge(['absolute inset-0 size-full', className])}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    />
  )
}

export { Frame }
