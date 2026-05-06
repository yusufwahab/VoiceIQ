import { Phone, MessageCircle, MessageSquare } from 'lucide-react'
import RiskBadge from '../ui/RiskBadge'
import Panel, { PanelHeader } from '../ui/Panel'

const channelIcon = {
  VOICE: <Phone size={14} className="text-accent-cobalt" />,
  WHATSAPP: <MessageCircle size={14} className="text-[#25D366]" />,
  SMS: <MessageSquare size={14} className="text-accent-amber" />,
}

const riskBorderMap = {
  critical: 'hover:border-risk-critical',
  high: 'hover:border-risk-high',
  medium: 'hover:border-risk-medium',
  low: 'hover:border-risk-low',
}

export default function CallQueue({ queue }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Call Queue</span>
        <span className="font-mono text-[10px] text-text-muted">{queue.length} waiting</span>
      </PanelHeader>
      <div className="p-4 grid grid-cols-3 gap-3">
        {queue.map(item => (
          <div
            key={item.id}
            className={`bg-bg-elevated border border-border-default rounded-xl p-3 flex flex-col gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${riskBorderMap[item.riskLevel]}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-grotesk font-semibold text-sm text-text-primary">{item.name}</span>
              {channelIcon[item.channel]}
            </div>
            <span className="font-plex text-[11px] text-text-secondary">{item.issue}</span>
            <div className="flex items-center justify-between mt-1">
              <RiskBadge level={item.riskLevel} score={item.riskScore} />
              <span className={`font-grotesk font-bold text-xl ${
                item.riskLevel === 'critical' ? 'text-risk-critical' :
                item.riskLevel === 'high' ? 'text-risk-high' :
                item.riskLevel === 'low' ? 'text-risk-low' : 'text-risk-medium'
              }`}>
                {item.riskScore}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
