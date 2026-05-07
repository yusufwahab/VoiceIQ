import { useEffect, useState } from 'react'

export default function Panel({ children, className = '' }) {
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

  const bgColor = isLightMode ? 'bg-white' : 'bg-bg-surface'
  const borderColor = isLightMode ? 'border-gray-200' : 'border-border-default'

  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function PanelHeader({ children, className = '' }) {
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

  const borderColor = isLightMode ? 'border-gray-200' : 'border-border-default'
  const bgColor = isLightMode ? 'bg-gray-50' : ''

  return (
    <div className={`border-b ${borderColor} ${bgColor} px-4 py-3 flex justify-between items-center ${className}`}>
      {children}
    </div>
  )
}
