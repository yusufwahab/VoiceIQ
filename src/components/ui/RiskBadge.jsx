const levelStyles = {
  critical: 'bg-risk-critical/15 text-risk-critical border border-risk-critical/30',
  high: 'bg-risk-high/15 text-risk-high border border-risk-high/30',
  medium: 'bg-mtn-yellow/15 text-mtn-yellow border border-mtn-yellow/30',
  low: 'bg-status-success/15 text-status-success border border-status-success/30',
  yellow: 'bg-primary-dim text-mtn-yellow border border-mtn-yellow/30',
  blue: 'bg-secondary-dim text-mtn-blue border border-mtn-blue/30',
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
