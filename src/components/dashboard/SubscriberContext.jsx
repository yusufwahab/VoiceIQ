import RiskBadge from '../ui/RiskBadge'

const channelColors = {
  WHATSAPP: { bg: 'bg-[rgba(37,211,102,0.15)]', text: 'text-[#25D366]', label: 'WA' },
  VOICE: { bg: 'bg-accent-cobalt-dim', text: 'text-accent-cobalt', label: 'VC' },
  SMS: { bg: 'bg-accent-amber-dim', text: 'text-accent-amber', label: 'SM' },
}

const behavioralSignals = [
  { dot: 'bg-risk-critical', text: 'No recharge in 9 days', sub: 'Last: ₦500 airtime top-up' },
  { dot: 'bg-risk-critical', text: '3 contacts this week', sub: 'All data-related complaints' },
  { dot: 'bg-accent-amber', text: 'Data usage dropped 68%', sub: 'vs. 30-day average' },
  { dot: 'bg-accent-cobalt', text: 'Active on WhatsApp', sub: 'High engagement channel' },
]

function Sparkline({ data }) {
  const w = 200, h = 52
  const max = Math.max(...data)
  const min = 0
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3
    return `${x},${y}`
  })
  const polyline = pts.join(' ')
  const area = `0,${h} ${polyline} ${w},${h}`

  return (
    <div className="flex flex-col gap-1">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F7EFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4F7EFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#sparkFill)" />
        <polyline points={polyline} fill="none" stroke="#4F7EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-mono text-[9px] text-text-muted">Recharge activity — 30 days</span>
    </div>
  )
}

export default function SubscriberContext({ subscriber, sparkline }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Mini card */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-sm shrink-0">
            {subscriber.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-grotesk font-semibold text-sm text-text-primary truncate">{subscriber.name}</div>
            <span className="font-mono text-[9px] bg-accent-amber-dim text-accent-amber border border-accent-amber/30 px-1.5 py-0.5 rounded">
              4yr subscriber
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-grotesk font-bold text-accent-amber text-base">{subscriber.arpu}</span>
          <RiskBadge level="low" label="HIGH VALUE" />
        </div>
        <div className="font-plex text-[11px] text-text-muted">{subscriber.network} · {subscriber.location}</div>
      </div>

      {/* Omnichannel history */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">Omnichannel History</span>
        {[
          { ch: 'WHATSAPP', msg: 'Abeg this data don finish again...', time: '2h ago' },
          { ch: 'VOICE', msg: '3:42 · Data complaint · Unresolved', time: 'Yesterday' },
          { ch: 'SMS', msg: 'MTN network bad since morning', time: '3 days ago' },
        ].map((item, i) => {
          const c = channelColors[item.ch]
          return (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                <span className={`font-mono text-[9px] font-bold ${c.text}`}>{c.label}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-plex text-[11px] text-text-secondary truncate">{item.msg}</p>
                <span className="font-mono text-[9px] text-text-muted">{item.time}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Behavioral signals */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">Behavioral Signals</span>
        {behavioralSignals.map((s, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className={`w-2 h-2 rounded-full ${s.dot} mt-1.5 shrink-0`} />
            <div>
              <div className="font-plex text-[11px] text-text-secondary">{s.text}</div>
              <div className="font-plex text-[10px] text-text-muted">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <Sparkline data={sparkline} />
    </div>
  )
}
