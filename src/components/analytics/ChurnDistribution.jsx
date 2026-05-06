import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import Panel, { PanelHeader } from '../ui/Panel'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-elevated border border-border-active rounded-lg px-3 py-2">
      <p className="font-plex text-xs text-text-primary font-semibold">{label}</p>
      <p className="font-mono text-[11px] text-text-secondary">{payload[0].value.toLocaleString()} subscribers</p>
    </div>
  )
}

export default function ChurnDistribution({ distribution }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Churn Risk Distribution</span>
      </PanelHeader>
      <div className="p-4" style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} stroke="rgba(79,126,255,0.08)" />
            <XAxis
              type="number"
              tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => v.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'IBM Plex Sans' }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,126,255,0.05)' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1200}>
              {distribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
