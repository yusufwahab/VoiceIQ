import { useState } from 'react'
import { motion } from 'framer-motion'
import Shell from '../components/layout/Shell'
import ConversationList from '../components/inbox/ConversationList'
import ConversationThread from '../components/inbox/ConversationThread'
import { inbox } from '../data/mock'

export default function InboxView() {
  const [activeId, setActiveId] = useState('c1')
  const activeConv = inbox.conversations.find(c => c.id === activeId) || inbox.conversations[0]

  return (
    <Shell title="Omnichannel Inbox" subtitle="VOICE · WHATSAPP · SMS · SORTED BY CHURN RISK">
      <motion.div
        className="bg-bg-surface border border-border-default rounded-xl overflow-hidden"
        style={{ height: 'calc(100vh - 120px)', display: 'grid', gridTemplateColumns: '320px 1fr' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ConversationList
          conversations={inbox.conversations}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <ConversationThread
          conversation={activeConv}
          thread={inbox.activeThread}
          suggestedReply={inbox.suggestedReply}
        />
      </motion.div>
    </Shell>
  )
}
