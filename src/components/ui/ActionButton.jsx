export default function ActionButton({ children, variant = 'primary', onClick, className = '', disabled = false }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-plex font-semibold text-sm transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-mtn-yellow disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-mtn-yellow text-white hover:bg-mtn-yellow-light shadow-md shadow-mtn-yellow/20',
    secondary: 'border border-mtn-blue text-mtn-blue hover:bg-secondary-dim',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
    success: 'bg-status-success text-white hover:brightness-110 shadow-md shadow-status-success/20',
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
