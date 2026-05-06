import { useState, useEffect } from 'react'

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export default function CallerCard({ subscriber }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-bg-surface border border-border-default rounded-xl p-4 flex flex-col gap-3">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-13 h-13 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-lg shrink-0"
          style={{ width: 52, height: 52 }}>
          {subscriber.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-grotesk font-semibold text-[18px] text-text-primary leading-tight truncate">
            {subscriber.name}
          </div>
          <div className="font-plex text-[11px] text-text-secondary mt-0.5 leading-snug">
            {subscriber.phone} · {subscriber.network}
          </div>
          <div className="font-plex text-[11px] text-text-secondary leading-snug">
            {subscriber.location} · {subscriber.tenure}
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Live Call</span>
        <span className="font-grotesk font-bold text-accent-cobalt text-sm bg-accent-cobalt-dim border border-border-active px-2.5 py-0.5 rounded-full">
          {formatTime(seconds)}
        </span>
      </div>

      {/* Channel badges */}
      <div className="flex gap-2 flex-wrap">
        <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-accent-cobalt/40 bg-accent-cobalt-dim text-accent-cobalt tracking-widest">VOICE</span>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-accent-amber/40 bg-accent-amber-dim text-accent-amber tracking-widest">WHATSAPP</span>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-accent-violet/40 bg-[rgba(124,111,255,0.1)] text-accent-violet tracking-widest">SMS</span>
      </div>
    </div>
  )
}
