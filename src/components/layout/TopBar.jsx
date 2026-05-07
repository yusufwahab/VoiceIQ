import { Bell, Search, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TopBar({ title, subtitle }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('voiceiq_theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('voiceiq_theme', isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('light-mode', !isDarkMode)
  }, [isDarkMode])

  const bgColor = isDarkMode ? 'bg-[#111827]' : 'bg-white'
  const borderColor = isDarkMode ? 'border-border-default' : 'border-gray-200'
  const textPrimary = isDarkMode ? 'text-text-primary' : 'text-gray-900'
  const textMuted = isDarkMode ? 'text-text-muted' : 'text-gray-500'
  const textSecondary = isDarkMode ? 'text-text-secondary' : 'text-gray-700'
  const inputBg = isDarkMode ? 'bg-bg-elevated' : 'bg-gray-50'
  const hoverBg = isDarkMode ? 'hover:bg-bg-overlay' : 'hover:bg-gray-100'
  const hoverText = isDarkMode ? 'hover:text-text-primary' : 'hover:text-gray-900'

  return (
    <header className={`h-14 ${bgColor} border-b ${borderColor} flex items-center px-6 gap-4 shrink-0`}>
      <div className="flex-1">
        <h1 className={`font-grotesk font-bold text-base ${textPrimary} leading-none`}>{title}</h1>
        {subtitle && <p className={`font-mono text-[10px] ${textMuted} mt-0.5 tracking-wide`}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
          <input
            type="text"
            placeholder="Search subscribers..."
            className={`${inputBg} border ${borderColor} rounded-lg pl-8 pr-3 py-1.5 font-plex text-xs ${textSecondary} placeholder:${textMuted} focus:outline-none focus:border-mtn-yellow w-48 transition-colors`}
          />
        </div>
        
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${hoverBg} transition-colors ${textSecondary} ${hoverText} focus-visible:outline-2 focus-visible:outline-mtn-yellow`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className={`relative w-8 h-8 flex items-center justify-center rounded-lg ${hoverBg} transition-colors ${textSecondary} ${hoverText} focus-visible:outline-2 focus-visible:outline-mtn-yellow`}>
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-mtn-yellow shadow-sm shadow-mtn-yellow" />
        </button>
      </div>
    </header>
  )
}
