import { useState } from 'react'
import { Send } from 'lucide-react'
import RiskBadge from '../ui/RiskBadge'
import ActionButton from '../ui/ActionButton'
import { useNavigate } from 'react-router-dom'

export default function ConversationThread({ conversation, thread, suggestedReply }) {
  const [reply, setReply] = useState(suggestedReply)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-default flex items-center gap-3 bg-bg-surface shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xs shrink-0">
          {conversation.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-grotesk font-semibold text-sm text-text-primary">{conversation.name}</span>
            <RiskBadge level={conversation.riskLevel} score={conversation.riskScore} />
          </div>
          <span className="font-plex text-[11px] text-text-muted">{conversation.channel}</span>
        </div>
        <ActionButton variant="secondary" onClick={() => navigate('/profile')}>
          Open Profile
        </ActionButton>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {thread.map(msg => {
          if (msg.type === 'subscriber') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[70%] bg-bg-elevated border-l-2 border-accent-amber rounded-2xl rounded-tl-sm px-4 py-2.5">
                  <p className="font-plex text-sm text-text-primary">{msg.text}</p>
                  <span className="font-mono text-[9px] text-text-muted mt-1 block">{msg.timestamp}</span>
                </div>
              </div>
            )
          }
          if (msg.type === 'detection') {
            return (
              <div key={msg.id} className="w-full bg-bg-base border border-border-default border-l-2 border-l-accent-cobalt rounded-lg px-4 py-2.5">
                <span className="font-mono text-[9px] text-accent-cobalt tracking-widest uppercase block mb-1">VoiceIQ Detected</span>
                <p className="font-plex text-[12px] text-text-secondary">{msg.text}</p>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Reply input */}
      <div className="px-5 py-4 border-t border-border-default bg-bg-surface shrink-0">
        <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase block mb-2">AI Suggested</span>
        <div className="flex gap-2">
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={2}
            className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-3 font-plex text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-border-active transition-colors"
          />
          <button className="bg-accent-cobalt hover:brightness-110 active:scale-95 text-white rounded-xl px-4 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-accent-cobalt">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
