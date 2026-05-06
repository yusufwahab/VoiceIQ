export default function StatCard({ label, value, accent = 'cobalt', sub }) {
  const accentMap = {
    cobalt: 'border-accent-cobalt text-accent-cobalt',
    critical: 'border-risk-critical text-risk-critical',
    amber: 'border-accent-amber text-accent-amber',
    low: 'border-risk-low text-risk-low',
  }
  return (
    <div className={`bg-bg-surface border-t-2 ${accentMap[accent]} rounded-xl p-4 flex flex-col gap-1`}>
      <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">{label}</span>
      <span className={`font-grotesk font-700 text-2xl ${accentMap[accent].split(' ')[1]}`}>{value}</span>
      {sub && <span className="font-plex text-[11px] text-text-muted">{sub}</span>}
    </div>
  )
}
