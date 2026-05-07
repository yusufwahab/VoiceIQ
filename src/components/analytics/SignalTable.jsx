import Panel, { PanelHeader } from '../ui/Panel'

const severityColor = {
  critical: 'text-risk-critical',
  yellow: 'text-mtn-yellow',
  blue: 'text-mtn-blue',
}

export default function SignalTable({ signals }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Signal Intelligence Table</span>
      </PanelHeader>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default">
              {['Signal', 'Frequency', 'Avg Impact', 'Top Channel'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] text-text-muted tracking-widest uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {signals.map((row, i) => (
              <tr key={i} className="border-b border-border-default hover:bg-bg-overlay transition-colors">
                <td className="px-4 py-3 font-plex text-sm text-text-primary">{row.signal}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-text-secondary">{row.frequency.toLocaleString()}</td>
                <td className={`px-4 py-3 font-mono text-[11px] font-bold ${severityColor[row.severity] || 'text-text-secondary'}`}>
                  +{row.avgImpact.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[10px] bg-bg-elevated text-text-secondary px-2 py-0.5 rounded border border-border-default">
                    {row.topChannel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
