import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart, ReferenceArea,
} from 'recharts'
import Panel, { PanelHeader } from '../ui/Panel'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-bg-elevated border border-border-active rounded-lg px-3 py-2">
      <p className="font-mono text-[10px] text-text-muted">Day {label}</p>
      <p className="font-grotesk font-bold text-accent-cobalt text-sm">{payload[0].value}%</p>
    </div>
  )
}

export default function RiskTimeline({ data }) {
  return (
    <Panel>
      <PanelHeader>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">30-Day Risk Timeline</span>
      </PanelHeader>
      <div className="p-4" style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F7EFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4F7EFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(79,126,255,0.08)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              interval={4}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}%`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Spike zone */}
            <ReferenceArea x1={27} x2={30} fill="rgba(248,113,113,0.08)" />

            {/* Event markers */}
            <ReferenceLine x={20} stroke="#F5C518" strokeDasharray="3 3" label={{ value: 'Data complaint', fill: '#F5C518', fontSize: 9, fontFamily: 'JetBrains Mono' }} />
            <ReferenceLine x={26} stroke="#FB923C" strokeDasharray="3 3" label={{ value: 'Repeat call', fill: '#FB923C', fontSize: 9, fontFamily: 'JetBrains Mono' }} />
            <ReferenceLine x={29} stroke="#F87171" strokeDasharray="3 3" label={{ value: 'Port intent', fill: '#F87171', fontSize: 9, fontFamily: 'JetBrains Mono' }} />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#4F7EFF"
              strokeWidth={2}
              fill="url(#riskGrad)"
              dot={false}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
