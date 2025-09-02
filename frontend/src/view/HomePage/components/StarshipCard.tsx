import { getPropertyColor } from '../utils'
import type { CombatProperty, Starship } from '@/starshipBattles/game'

const getShipImageUrl = (shipName: string): string => {
  return `/images/starships/${shipName}.webp`
}

interface StarshipCardProps {
  starship: Starship
  isPlayerCard?: boolean
  showAllStats?: boolean
  selectedProperty?: CombatProperty | null
}

export const StarshipCard = ({
  starship,
  isPlayerCard = false,
  showAllStats = true,
  selectedProperty = null,
}: StarshipCardProps) => {
  const properties = [
    { key: 'speed' as CombatProperty, label: 'Speed', value: starship.speed },
    {
      key: 'maneuverability' as CombatProperty,
      label: 'Maneuverability',
      value: starship.maneuverability,
    },
    {
      key: 'firepower' as CombatProperty,
      label: 'Firepower',
      value: starship.firepower,
    },
    {
      key: 'shields' as CombatProperty,
      label: 'Shields',
      value: starship.shields,
    },
  ]

  return (
    <div
      className={`rounded-lg border p-6 ${
        isPlayerCard
          ? 'border-blue-400 bg-gray-800'
          : 'border-red-400 bg-gray-800'
      }`}
    >
      <div className="mb-6 flex items-center gap-6">
        <img
          src={getShipImageUrl(starship.name)}
          alt={starship.name}
          className="h-32 w-32 rounded object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/starships/placeholder.webp'
          }}
        />
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-black">{starship.name}</h3>
          <p className="text-sm text-gray-300">{starship.model}</p>
          <p className="mt-4 text-xs text-gray-400">
            {starship.starship_class}
          </p>
        </div>
      </div>

      {showAllStats && (
        <div className="space-y-3">
          {properties.map((prop) => (
            <div
              key={prop.key}
              className={`flex items-center justify-between rounded p-2 ${
                selectedProperty === prop.key
                  ? 'border border-blue-400 bg-blue-600/30'
                  : 'bg-gray-700/50'
              }`}
            >
              <span className="text-sm font-medium">{prop.label}</span>
              <span
                className={`text-lg font-bold tabular-nums ${
                  selectedProperty === prop.key
                    ? 'text-blue-300'
                    : getPropertyColor(prop.value)
                }`}
              >
                {prop.value}
              </span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between rounded bg-gray-700/30 p-2">
            <span className="text-sm font-medium">Overall</span>
            <span className="text-lg font-bold text-purple-300 tabular-nums">
              {starship.overall}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
