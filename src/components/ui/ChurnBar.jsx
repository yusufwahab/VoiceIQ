import { useState, useEffect } from 'react'

const colorMap = {
  critical: 'from-risk-critical to-[#ef4444]',
  cobalt: 'from-accent-cobalt to-[#3b6bff]',
  muted: 'from-bg-overlay to-bg-elevated',
}

export default function ChurnBar({ label, value, colorKey = 'cobalt', delay = 0 }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-plex text-[11px] text-text-secondary">{label}</span>
        <span className="font-grotesk font-bold text-sm text-text-primary">{value}%</span>
      </div>
      <div className="h-2.5 bg-bg-overlay rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[colorKey] || colorMap.cobalt}`}
          style={{
            width: `${width}%`,
            transition: 'width 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}
