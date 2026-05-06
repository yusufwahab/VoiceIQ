import Panel, { PanelHeader } from '../ui/Panel'
import ChurnBar from '../ui/ChurnBar'

export default function ChurnScoreCard({ churnScores }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Churn Risk Score</span>
        <span className="font-mono text-[10px] bg-accent-amber-dim text-accent-amber border border-accent-amber/30 px-2 py-0.5 rounded-full">
          +{churnScores.delta}pts conversational layer
        </span>
      </PanelHeader>
      <div className="p-4 flex flex-col gap-4">
        <ChurnBar
          label="Behavioral model only"
          value={churnScores.behavioral}
          colorKey="muted"
        />
        <ChurnBar
          label="VoiceIQ full signal"
          value={churnScores.voiceiq}
          colorKey="critical"
          delay={200}
        />
        <p className="font-mono text-[9px] text-text-muted tracking-wide">
          XGBoost · behavioral + conversational features · SHAP explained
        </p>
      </div>
    </Panel>
  )
}
