import { Portal } from '@ark-ui/react/portal'
import {
  Toaster as ReactToaster,
  Toast,
  createToaster,
} from '@ark-ui/react/toast'
import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button'
import { Frame } from '@/components/ui/frame'

function ToasterRoot({
  toaster,
  children,
}: React.ComponentProps<typeof ReactToaster>) {
  return (
    <Portal>
      <ReactToaster toaster={toaster}>{children}</ReactToaster>
    </Portal>
  )
}

function ToastRoot({
  children,
  className,
}: React.ComponentProps<typeof Toast.Root>) {
  return (
    <Toast.Root
      className={twMerge([
        '[z-index:var(--z-index)] [height:var(--height)] [translate:var(--x)_var(--y)] [scale:var(--scale)] [opacity:var(--opacity)] [will-change:translate,scale]',
        '[transition-timing-function:cubic-bezier(0.21,_1.02,_0.73,_1)] [transition:translate_400ms,_scale_400ms,_opacity_400ms]',
        'data-[state=closed]:[transition-timing-function:cubic-bezier(0.06,_0.71,_0.55,_1)] data-[state=closed]:[transition:translate_400ms,_scale_400ms,_opacity_200ms]',
      ])}
    >
      <div
        className={twMerge([
          'font-orbitron relative me-1 px-10 py-6 text-sm',
          '[--color-frame-1-stroke:var(--color-primary)]',
          '[--color-frame-1-fill:var(--color-primary)]/20',
          '[--color-frame-2-stroke:var(--color-primary)]',
          '[--color-frame-2-fill:var(--color-primary)]/20',
          '[--color-frame-3-stroke:var(--color-accent)]',
          '[--color-frame-3-fill:var(--color-accent)]/35',
          className,
        ])}
      >
        <Frame
          enableBackdropBlur
          enableViewBox
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","35","0"],["L","0% + 70.5","0"],["L","0% + 87.5","7"],["L","0% + 81.5","0% + 0"],["L","100% - 96.5","0% + 0"],["L","100% - 91.5","0% + 3"],["L","100% - 86.5","0% + 0"],["L","100% - 32.5","0% + 0"],["L","100% - 18.5","0% + 10"],["L","100% + 0","100% - 16"],["L","100% - 9","100% - 6"],["L","0% + 12","100% - 6"],["L","0","100% - 17.5"],["L","16","0% + 14.5"],["L","35","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","20","100% - 6"],["L","100% - 19.5","100% - 6"],["L","100% - 25.5","100% + 0"],["L","26","100% + 0"],["L","20","100% - 6"]]}]',
          )}
        />
        {children}
      </div>
    </Toast.Root>
  )
}

function ToastTitle({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Toast.Title>) {
  return (
    <Toast.Title
      className={twMerge([
        'text-shadow-primary relative flex w-full items-center font-bold text-nowrap text-shadow-lg',
        className,
      ])}
      {...rest}
    >
      {children}
    </Toast.Title>
  )
}

function ToastDescription({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Toast.Description>) {
  return (
    <Toast.Description
      className={twMerge(['relative pt-2 text-nowrap opacity-80', className])}
      {...rest}
    >
      {children}
    </Toast.Description>
  )
}

function ToastCloseTrigger({
  className,
  children,
  asChild,
  ...rest
}: React.ComponentProps<typeof Toast.CloseTrigger>) {
  return (
    <Toast.CloseTrigger asChild {...rest}>
      {!asChild ? (
        <Button
          shape="flat"
          variant="accent"
          enableViewBox
          className={twMerge([
            'absolute -top-1.5 right-2 scale-x-[-1] transform px-4 py-1.5',
            '[--color-frame-1-fill:var(--color-accent)]/70',
            className,
          ])}
        >
          <X className="size-4" />
        </Button>
      ) : (
        children
      )}
    </Toast.CloseTrigger>
  )
}

function Toaster({
  toaster,
}: Pick<React.ComponentProps<typeof ToasterRoot>, 'toaster'>) {
  return (
    <ToasterRoot toaster={toaster}>
      {(toast) => (
        <ToastRoot
          className={
            toast.type === 'error'
              ? '[--color-frame-1-fill:theme(colors.red.500/20%)] [--color-frame-1-stroke:theme(colors.red.500)] [--color-frame-2-fill:theme(colors.red.600/10%)] [--color-frame-2-stroke:theme(colors.red.600)] [--color-frame-3-fill:theme(colors.red.400/35%)] [--color-frame-3-stroke:theme(colors.red.400)]'
              : toast.type === 'success'
                ? '[--color-frame-1-fill:theme(colors.green.500/20%)] [--color-frame-1-stroke:theme(colors.green.500)] [--color-frame-2-fill:theme(colors.green.600/10%)] [--color-frame-2-stroke:theme(colors.green.600)] [--color-frame-3-fill:theme(colors.green.400/35%)] [--color-frame-3-stroke:theme(colors.green.400)]'
                : ''
          }
        >
          <ToastTitle className="text-white">{toast.title}</ToastTitle>
          <ToastDescription
            className={
              toast.type === 'error'
                ? 'text-red-100'
                : toast.type === 'success'
                  ? 'text-green-100'
                  : ''
            }
          >
            {toast.description}
          </ToastDescription>
          <ToastCloseTrigger />
        </ToastRoot>
      )}
    </ToasterRoot>
  )
}

export {
  createToaster,
  Toaster,
  ToasterRoot,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
}
