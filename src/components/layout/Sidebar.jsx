import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  User,
  Zap,
  LogOut,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Live Dashboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/profile', icon: User, label: 'Subscriber' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleSignOut() {
    localStorage.removeItem('voiceiq_auth')
    navigate('/')
  }

  return (
    <aside className="w-[240px] bg-bg-surface border-r border-border-default flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-border-default flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-accent-cobalt flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <div className="font-grotesk font-bold text-base text-text-primary leading-none">VoiceIQ</div>
          <div className="font-mono text-[9px] text-text-muted tracking-widest mt-0.5">AI4TELCO · MTN NG</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? 'bg-accent-cobalt-dim text-accent-cobalt border border-border-active'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-overlay'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-accent-cobalt' : 'text-text-muted group-hover:text-text-secondary'} />
              <span className="font-plex text-sm">{label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-cobalt" />}
            </NavLink>
          )
        })}
      </nav>

      {/* Agent info */}
      <div className="px-4 py-3 border-t border-border-default">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xs">
            AO
          </div>
          <div>
            <div className="font-plex text-xs text-text-primary">Amaka Osei</div>
            <div className="font-mono text-[9px] text-text-muted">Agent · Lagos CC</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-risk-low" title="Online" />
        </div>
        <button
          onClick={handleSignOut}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-text-muted hover:text-risk-critical hover:bg-[rgba(248,113,113,0.08)] transition-all text-left">
          <LogOut size={14} />
          <span className="font-plex text-xs">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
