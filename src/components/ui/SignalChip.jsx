const typeStyles = {
  critical: {
    border: 'border-risk-critical',
    bg: 'bg-risk-critical/10',
    text: 'text-risk-critical',
  },
  yellow: {
    border: 'border-mtn-yellow',
    bg: 'bg-primary-dim',
    text: 'text-mtn-yellow',
  },
  blue: {
    border: 'border-mtn-blue',
    bg: 'bg-secondary-dim',
    text: 'text-mtn-blue',
  },
  success: {
    border: 'border-status-success',
    bg: 'bg-status-success/10',
    text: 'text-status-success',
  },
}

export default function SignalChip({ label, type = 'yellow' }) {
  const s = typeStyles[type] || typeStyles.yellow
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${s.border} ${s.bg} ${s.text} font-mono text-[11px] whitespace-nowrap`}>
      {label}
    </span>
  )
}
