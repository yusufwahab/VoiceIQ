import RiskBadge from '../ui/RiskBadge'

export default function ProfileHeader({ info }) {
  return (
    <div className="bg-bg-surface border border-border-default rounded-xl p-6 flex items-start gap-6">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xl shrink-0">
        {info.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-grotesk font-bold text-2xl text-text-primary">{info.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="font-mono text-[10px] text-text-muted">{info.id}</span>
              <span className="font-mono text-[9px] bg-accent-amber-dim text-accent-amber border border-accent-amber/30 px-1.5 py-0.5 rounded">
                4yr subscriber
              </span>
              <span className="font-grotesk font-bold text-accent-amber text-sm">{info.arpu}</span>
              <RiskBadge level="low" label="HIGH VALUE" />
            </div>
          </div>

          {/* Churn score */}
          <div className="text-right shrink-0">
            <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase mb-1">Current Churn Risk</div>
            <div className="font-grotesk font-bold text-5xl text-risk-critical leading-none">87%</div>
          </div>
        </div>

        {/* Pills */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {[info.network, info.location, info.plan].map(pill => (
            <span key={pill} className="font-plex text-[11px] bg-bg-elevated border border-border-default text-text-secondary px-2.5 py-1 rounded-full">
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
