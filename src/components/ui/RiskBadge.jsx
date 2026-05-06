const levelStyles = {
  critical: 'bg-[rgba(248,113,113,0.15)] text-risk-critical border border-risk-critical/30',
  high: 'bg-[rgba(251,146,60,0.15)] text-risk-high border border-risk-high/30',
  medium: 'bg-[rgba(245,197,24,0.15)] text-risk-medium border border-risk-medium/30',
  low: 'bg-[rgba(52,211,153,0.15)] text-risk-low border border-risk-low/30',
  cobalt: 'bg-accent-cobalt-dim text-accent-cobalt border border-accent-cobalt/30',
  amber: 'bg-accent-amber-dim text-accent-amber border border-accent-amber/30',
}

export default function RiskBadge({ level = 'low', label, score }) {
  const s = levelStyles[level] || levelStyles.low
  const display = label || (score !== undefined ? `${score}%` : level.toUpperCase())
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px] font-bold tracking-wide ${s}`}>
      {display}
    </span>
  )
}
