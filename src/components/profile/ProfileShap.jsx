import Panel, { PanelHeader } from '../ui/Panel'
import ShapPanel from '../dashboard/ShapPanel'

export default function ProfileShap({ features }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Aggregate Signal Importance</span>
        <span className="font-plex text-[11px] text-text-muted">30-day aggregate profile</span>
      </PanelHeader>
      <div className="p-4">
        <ShapPanel
          features={features}
          title="SHAP FEATURE IMPORTANCE"
          subtitle="Aggregate signal importance across all interactions"
        />
      </div>
    </Panel>
  )
}
