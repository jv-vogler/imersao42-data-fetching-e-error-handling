interface BattleResultBadgeProps {
  winner: 'player' | 'ai' | 'draw'
}

export function BattleResultBadge({ winner }: BattleResultBadgeProps) {
  let text = ''
  let className = ''
  if (winner === 'player') {
    text = '🎉 You Won This Round!'
    className = 'bg-green-500/20 text-green-400'
  } else if (winner === 'ai') {
    text = '😔 AI Won This Round'
    className = 'bg-red-500/20 text-red-400'
  } else {
    text = '🤝 Draw!'
    className = 'bg-yellow-500/20 text-yellow-400'
  }
  return (
    <div
      className={`inline-block rounded-full px-6 py-3 text-2xl font-bold ${className}`}
    >
      {text}
    </div>
  )
}

interface CardCountProps {
  label: string
  count: number
  color: string
}

export function CardCount({ label, count, color }: CardCountProps) {
  return (
    <div className="text-center">
      <div className="mb-1 text-sm font-medium text-gray-400">{label}</div>
      <div className={`text-3xl font-bold ${color}`}>{count}</div>
      <div className="text-xs text-gray-500">cards left</div>
    </div>
  )
}
