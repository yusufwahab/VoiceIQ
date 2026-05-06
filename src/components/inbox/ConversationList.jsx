import { Phone, MessageCircle, MessageSquare } from 'lucide-react'
import RiskBadge from '../ui/RiskBadge'

const channelIcon = {
  VOICE: <Phone size={12} className="text-accent-cobalt" />,
  WHATSAPP: <MessageCircle size={12} className="text-[#25D366]" />,
  SMS: <MessageSquare size={12} className="text-accent-amber" />,
}

export default function ConversationList({ conversations, activeId, onSelect }) {
  return (
    <div className="flex flex-col border-r border-border-default h-full overflow-y-auto">
      <div className="px-4 py-3 border-b border-border-default">
        <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Conversations</span>
      </div>
      {conversations.map(conv => {
        const isActive = conv.id === activeId
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full text-left px-4 py-3 border-b border-border-default transition-all duration-150 flex items-start gap-3 ${
              isActive ? 'bg-bg-overlay border-l-2 border-l-accent-cobalt' : 'hover:bg-bg-overlay'
            }`}
          >
            {/* Avatar with unread dot */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xs">
                {conv.initials}
              </div>
              {conv.unread && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-amber border-2 border-bg-surface" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-grotesk font-semibold text-xs text-text-primary truncate">{conv.name}</span>
                <span className="font-mono text-[9px] text-text-muted shrink-0 ml-1">{conv.timestamp}</span>
              </div>
              <p className="font-plex text-[11px] text-text-secondary truncate">{conv.preview}</p>
              <div className="flex items-center gap-1.5 mt-1">
                {channelIcon[conv.channel]}
                <RiskBadge level={conv.riskLevel} score={conv.riskScore} />
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
