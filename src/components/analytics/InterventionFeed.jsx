import Panel, { PanelHeader } from '../ui/Panel'
import RiskBadge from '../ui/RiskBadge'

const outcomeMap = {
  Accepted: 'low',
  Pending: 'amber',
  Declined: 'critical',
}

export default function InterventionFeed({ interventions }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Recent Interventions</span>
      </PanelHeader>
      <div className="p-4 flex flex-col gap-3">
        {interventions.map(item => (
          <div key={item.id} className="bg-bg-elevated border border-border-default rounded-lg p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-grotesk font-semibold text-sm text-text-primary">{item.name}</span>
                <RiskBadge level="critical" score={item.churnScore} />
              </div>
              <p className="font-plex text-[11px] text-text-secondary">{item.action}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <RiskBadge level={outcomeMap[item.outcome]} label={item.outcome} />
              <span className="font-mono text-[9px] text-text-muted">{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
