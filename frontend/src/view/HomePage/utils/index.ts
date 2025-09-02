export function getPropertyColor(value: number) {
  if (value >= 80) return 'text-green-500'
  if (value >= 70) return 'text-lime-400'
  if (value >= 60) return 'text-yellow-400'
  if (value >= 50) return 'text-amber-400'
  if (value >= 40) return 'text-orange-500'
  return 'text-red-500'
}
