import { Bell, Search } from 'lucide-react'

export default function TopBar({ title, subtitle }) {
  return (
    <header className="h-14 bg-bg-surface border-b border-border-default flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1">
        <h1 className="font-grotesk font-bold text-base text-text-primary leading-none">{title}</h1>
        {subtitle && <p className="font-mono text-[10px] text-text-muted mt-0.5 tracking-wide">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search subscribers..."
            className="bg-bg-base border border-border-default rounded-lg pl-8 pr-3 py-1.5 font-plex text-xs text-text-secondary placeholder:text-text-muted focus:outline-none focus:border-mtn-yellow w-48 transition-colors"
          />
        </div>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-overlay transition-colors text-text-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-mtn-yellow">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-mtn-yellow shadow-sm shadow-mtn-yellow" />
        </button>
      </div>
    </header>
  )
}
