import { Checkbox } from '@ark-ui/react/checkbox'
import { Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Frame } from '@/components/ui/frame'

function CheckboxRoot({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root
      className={twMerge([
        'flex cursor-pointer items-center gap-3.5',
        className,
      ])}
      {...rest}
    >
      {children}
    </Checkbox.Root>
  )
}

function CheckboxLabel({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Checkbox.Label>) {
  return (
    <Checkbox.Label className={twMerge(['order-2', className])} {...rest}>
      {children}
    </Checkbox.Label>
  )
}

function CheckboxControl({
  className,
  ...rest
}: React.ComponentProps<typeof Checkbox.Control>) {
  return (
    <Checkbox.Control
      className={twMerge([
        'group relative flex size-5 items-center justify-center data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[--color-frame-1-stroke:var(--color-primary)]/80',
        '[--color-frame-1-fill:var(--color-primary)]/10',
        className,
      ])}
      {...rest}
    >
      <Frame
        paths={JSON.parse(
          '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]',
        )}
      />
      <Check className="-mt-1 -mr-2 size-6 stroke-(--color-primary)/80 opacity-0 drop-shadow-[0_0px_2px_var(--color-primary)] transition-all duration-100 group-data-[state=checked]:opacity-100" />
    </Checkbox.Control>
  )
}

function CheckboxHiddenInput() {
  return <Checkbox.HiddenInput />
}

export { CheckboxRoot, CheckboxLabel, CheckboxControl, CheckboxHiddenInput }
