import { motion } from 'framer-motion'
import Panel, { PanelHeader } from '../ui/Panel'
import ChurnBar from '../ui/ChurnBar'

export default function ChurnScoreCard({ churnScores }) {
  const isLive = churnScores.delta > 0
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Churn Risk Score</span>
        <motion.span
          key={churnScores.delta}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
            isLive
              ? 'bg-accent-amber-dim text-accent-amber border-accent-amber/30'
              : 'bg-bg-elevated text-text-muted border-border-default'
          }`}
        >
          {isLive ? `+${churnScores.delta}pts conversational layer` : 'Awaiting live signal'}
        </motion.span>
      </PanelHeader>
      <div className="p-4 flex flex-col gap-4">
        <ChurnBar
          label="Behavioral model only"
          value={churnScores.behavioral}
          colorKey="muted"
        />
        <ChurnBar
          key={churnScores.voiceiq}
          label="VoiceIQ full signal"
          value={churnScores.voiceiq}
          colorKey={churnScores.voiceiq >= 80 ? 'critical' : 'cobalt'}
          delay={0}
        />
        <p className="font-mono text-[9px] text-text-muted tracking-wide">
          XGBoost · behavioral + conversational features · SHAP explained
        </p>
      </div>
    </Panel>
  )
}
