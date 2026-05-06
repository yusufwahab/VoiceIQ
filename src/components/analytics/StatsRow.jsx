import StatCard from '../ui/StatCard'

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Total Monitored" value={stats.totalMonitored} accent="cobalt" sub="Active subscribers" />
      <StatCard label="High Risk (>70%)" value={stats.highRisk} accent="critical" sub="Require intervention" />
      <StatCard label="Interventions This Week" value={stats.interventions} accent="amber" sub="Agent actions taken" />
      <StatCard label="Churn Prevented (est.)" value={stats.churnPrevented} accent="low" sub="Revenue protected" />
    </div>
  )
}
