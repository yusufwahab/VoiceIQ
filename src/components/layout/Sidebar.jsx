import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  User,
  Zap,
  LogOut,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Live Dashboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/inbox', icon: MessageSquare, label: 'Inbox' },
  { to: '/profile', icon: User, label: 'Subscriber' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains('light-mode'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function handleSignOut() {
    localStorage.removeItem('voiceiq_auth')
    navigate('/')
  }

  const bgColor = isLightMode ? 'bg-white' : 'bg-[#111827]'
  const borderColor = isLightMode ? 'border-gray-200' : 'border-border-default'
  const textPrimary = isLightMode ? 'text-gray-900' : 'text-text-primary'
  const textMuted = isLightMode ? 'text-gray-500' : 'text-text-muted'
  const textSecondary = isLightMode ? 'text-gray-600' : 'text-text-secondary'
  const hoverBg = isLightMode ? 'hover:bg-gray-100' : 'hover:bg-bg-elevated'
  const activeBg = isLightMode ? 'bg-mtn-yellow/10' : 'bg-primary-dim'
  const activeText = isLightMode ? 'text-mtn-yellow-dark' : 'text-mtn-yellow'
  const hoverText = isLightMode ? 'hover:text-gray-900' : 'hover:text-text-primary'

  return (
    <aside className={`w-[240px] ${bgColor} border-r ${borderColor} flex flex-col h-full shrink-0 shadow-lg`}>
      {/* Logo */}
      <div className={`px-5 py-4 border-b ${borderColor} flex items-center gap-2.5 ${bgColor}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mtn-yellow to-mtn-yellow-dark flex items-center justify-center shadow-lg shadow-mtn-yellow/30">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <div className={`font-grotesk font-bold text-base ${textPrimary} leading-none`}>VoiceIQ</div>
          <div className={`font-mono text-[9px] ${textMuted} tracking-widest mt-0.5`}>AI4TELCO · MTN NG</div>
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
                  ? `${activeBg} ${activeText} border border-mtn-yellow/30 shadow-sm`
                  : `${textSecondary} ${hoverText} ${hoverBg}`
              }`}
            >
              <Icon size={16} className={isActive ? activeText : `${textMuted} group-hover:${textSecondary}`} />
              <span className="font-plex text-sm">{label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-mtn-yellow shadow-sm shadow-mtn-yellow" />}
            </NavLink>
          )
        })}
      </nav>

      {/* Agent info */}
      <div className={`px-4 py-3 border-t ${borderColor} ${bgColor}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-mtn-yellow to-mtn-blue flex items-center justify-center text-white font-grotesk font-bold text-xs shadow-md">
            AO
          </div>
          <div>
            <div className={`font-plex text-xs ${textPrimary}`}>Amaka Osei</div>
            <div className={`font-mono text-[9px] ${textMuted}`}>Agent · Lagos CC</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-status-success shadow-sm shadow-status-success" title="Online" />
        </div>
        <button
          onClick={handleSignOut}
          className={`mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg ${textMuted} hover:text-status-error ${isLightMode ? 'hover:bg-red-50' : 'hover:bg-status-error/10'} transition-all text-left`}>
          <LogOut size={14} />
          <span className="font-plex text-xs">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
