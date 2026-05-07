export default function StatCard({ label, value, accent = 'yellow', sub }) {
  const accentMap = {
    yellow: 'border-mtn-yellow text-mtn-yellow',
    blue: 'border-mtn-blue text-mtn-blue',
    critical: 'border-risk-critical text-risk-critical',
    success: 'border-status-success text-status-success',
  }
  return (
    <div className={`bg-bg-surface border-t-2 ${accentMap[accent]} rounded-xl p-4 flex flex-col gap-1 shadow-sm`}>
      <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">{label}</span>
      <span className={`font-grotesk font-700 text-2xl ${accentMap[accent].split(' ')[1]}`}>{value}</span>
      {sub && <span className="font-plex text-[11px] text-text-muted">{sub}</span>}
    </div>
  )
}
