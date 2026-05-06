export default function ActionButton({ children, variant = 'primary', onClick, className = '', disabled = false }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-plex font-semibold text-sm transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent-cobalt disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-accent-cobalt text-white hover:brightness-110',
    secondary: 'border border-border-active text-accent-cobalt hover:bg-accent-cobalt-dim',
    ghost: 'text-text-secondary hover:text-text-primary',
    success: 'bg-risk-low text-bg-base hover:brightness-110',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
