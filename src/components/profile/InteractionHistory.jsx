import { Phone, MessageCircle, MessageSquare } from 'lucide-react'
import Panel, { PanelHeader } from '../ui/Panel'

const channelIcon = {
  VOICE: <Phone size={14} className="text-accent-cobalt" />,
  WHATSAPP: <MessageCircle size={14} className="text-[#25D366]" />,
  SMS: <MessageSquare size={14} className="text-accent-amber" />,
}

const outcomeColor = {
  critical: 'bg-risk-critical',
  amber: 'bg-accent-amber',
  cobalt: 'bg-accent-cobalt',
  low: 'bg-risk-low',
}

export default function InteractionHistory({ interactions }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Interaction History</span>
      </PanelHeader>
      <div className="p-4 relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-border-default" />

        <div className="flex flex-col gap-4 relative">
          {interactions.map(ev => (
            <div key={ev.id} className="flex gap-3 relative">
              {/* Dot */}
              <div className={`w-3 h-3 rounded-full ${outcomeColor[ev.outcomeLevel]} shrink-0 mt-1 z-10 ring-4 ring-bg-surface`} />

              {/* Content */}
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  {channelIcon[ev.channel]}
                  <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">{ev.channel}</span>
                </div>
                <p className="font-plex text-sm text-text-primary mb-0.5">{ev.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    ev.outcomeLevel === 'critical' ? 'bg-[rgba(248,113,113,0.15)] text-risk-critical' :
                    ev.outcomeLevel === 'low' ? 'bg-[rgba(52,211,153,0.15)] text-risk-low' :
                    ev.outcomeLevel === 'amber' ? 'bg-accent-amber-dim text-accent-amber' :
                    'bg-accent-cobalt-dim text-accent-cobalt'
                  }`}>
                    {ev.outcome}
                  </span>
                  <span className="font-mono text-[9px] text-text-muted">{ev.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
