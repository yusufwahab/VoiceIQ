const typeStyles = {
  critical: {
    border: 'border-risk-critical',
    bg: 'bg-[rgba(248,113,113,0.1)]',
    text: 'text-risk-critical',
  },
  amber: {
    border: 'border-accent-amber',
    bg: 'bg-[rgba(245,197,24,0.1)]',
    text: 'text-accent-amber',
  },
  cobalt: {
    border: 'border-accent-cobalt',
    bg: 'bg-accent-cobalt-dim',
    text: 'text-accent-cobalt',
  },
  violet: {
    border: 'border-accent-violet',
    bg: 'bg-[rgba(124,111,255,0.1)]',
    text: 'text-accent-violet',
  },
}

export default function SignalChip({ label, type = 'cobalt' }) {
  const s = typeStyles[type] || typeStyles.cobalt
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${s.border} ${s.bg} ${s.text} font-mono text-[11px] whitespace-nowrap`}>
      {label}
    </span>
  )
}
