export default function Panel({ children, className = '' }) {
  return (
    <div className={`bg-bg-surface border border-border-default rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export function PanelHeader({ children, className = '' }) {
  return (
    <div className={`border-b border-border-default px-4 py-3 flex justify-between items-center ${className}`}>
      {children}
    </div>
  )
}
