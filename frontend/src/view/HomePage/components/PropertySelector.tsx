import { useState } from 'react'

import { useListCollection } from '@ark-ui/react/combobox'
import type { Combobox } from '@ark-ui/react/combobox'

import type { CombatProperty, Starship } from '@/starshipBattles/game'

import { Button } from '@/components/ui/button'
import {
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

interface PropertySelectorProps {
  starship: Starship
  onPropertySelect: (property: CombatProperty) => void
  disabled?: boolean
}

export const PropertySelector = ({
  starship,
  onPropertySelect,
  disabled = false,
}: PropertySelectorProps) => {
  const properties = ['speed', 'maneuverability', 'firepower', 'shields']
  const [selectedProperty, setSelectedProperty] = useState<Array<string>>([])

  const { collection, filter } = useListCollection({
    initialItems: properties,
    filter: (itemText, filterText) =>
      itemText.toLowerCase().includes(filterText.toLowerCase()),
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleSelection = (details: { value: Array<string> }) => {
    setSelectedProperty(details.value)
  }

  const handleBattle = () => {
    if (selectedProperty.length > 0) {
      onPropertySelect(selectedProperty[0] as CombatProperty)
    }
  }

  const getPropertyValue = (property: string) => {
    return starship[property as keyof Starship] as number
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-xl">Choose a property to battle with:</p>
      <div className="mx-auto flex max-w-md flex-col items-center space-y-4">
        <ComboboxRoot
          value={selectedProperty.length > 0 ? selectedProperty : []}
          collection={collection}
          onInputValueChange={handleInputChange}
          onValueChange={handleSelection}
          disabled={disabled}
          className="flex"
        >
          <ComboboxControl className={cn('capitalize')}>
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxPositioner>
            <ComboboxContent className="w-72">
              <ComboboxInput />
              <ComboboxItemGroup>
                {collection.items.map((item) => (
                  <ComboboxItem
                    key={item}
                    item={item}
                    className="relative text-lg"
                  >
                    <ComboboxItemText className="flex w-full justify-between capitalize">
                      <span
                        className={cn(
                          item === selectedProperty[0]
                            ? 'text-xl font-bold text-white'
                            : 'text-sm text-gray-300',
                        )}
                      >
                        {item}
                      </span>
                      <span
                        className={cn(
                          item === selectedProperty[0]
                            ? 'text-xl font-bold text-white'
                            : 'text-sm text-gray-300',
                        )}
                      >
                        {getPropertyValue(item)}
                      </span>
                    </ComboboxItemText>
                    <ComboboxItemIndicator className="absolute -right-1.5" />
                  </ComboboxItem>
                ))}
              </ComboboxItemGroup>
            </ComboboxContent>
          </ComboboxPositioner>
        </ComboboxRoot>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-4xl font-bold text-white">
            {selectedProperty.length > 0
              ? getPropertyValue(selectedProperty[0])
              : '?'}
          </p>
          <Button
            onClick={handleBattle}
            disabled={disabled || selectedProperty.length === 0}
            className="flex text-lg font-bold"
            variant="accent"
          >
            ⚔️ Battle!
          </Button>
        </div>
      </div>
    </div>
  )
}
