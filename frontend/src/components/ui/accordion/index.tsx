import { Accordion } from '@ark-ui/react/accordion'
import { ChevronDown, FilePenLine } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { Frame } from '@/components/ui/frame'

function AccordionRoot({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Accordion.Root>) {
  return (
    <Accordion.Root
      collapsible
      {...rest}
      className={twMerge(['flex flex-col gap-3', className])}
    >
      {children}
    </Accordion.Root>
  )
}

function AccordionItem({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Accordion.Item>) {
  return (
    <Accordion.Item
      className={twMerge([
        'relative px-6 pt-3 pb-5 data-[state=open]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[--color-frame-1-stroke:var(--color-primary)]',
        '[--color-frame-1-fill:var(--color-primary)]/20',
        '[--color-frame-2-stroke:var(--color-primary)]',
        '[--color-frame-2-fill:transparent]',
        className,
      ])}
      {...rest}
    >
      <Frame
        paths={JSON.parse(
          '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","15","0"],["L","100% - 0","0"],["L","100% - 0","100% - 7"],["L","0% + 0","100% - 7"],["L","0% + 0","0% + 15"],["L","15","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","7","100% - 7"],["L","100% - 8","100% - 7"],["L","100% - 14","100% + 0"],["L","12","100% + 0"],["L","7","100% - 7"]]}]',
        )}
      />
      <div className="relative">{children}</div>
    </Accordion.Item>
  )
}

function AccordionTrigger({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Accordion.ItemTrigger>) {
  return (
    <Accordion.ItemTrigger
      className={twMerge([
        'text-shadow-primary group -my-2 flex w-full cursor-pointer items-center py-2 font-bold transition-[padding] duration-100 data-[state=open]:pt-3.5 data-[state=open]:text-shadow-lg',
        className,
      ])}
      {...rest}
    >
      <FilePenLine className="me-2.5 size-4.5" /> {children}
      <ChevronDown className="ms-auto size-4 group-data-[state=open]:rotate-180" />
    </Accordion.ItemTrigger>
  )
}

function AccordionContent({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Accordion.ItemContent>) {
  return (
    <Accordion.ItemContent
      className={twMerge([
        'data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0 mt-1 py-2 opacity-80',
        className,
      ])}
      {...rest}
    >
      {children}
    </Accordion.ItemContent>
  )
}

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent }
