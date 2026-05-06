import { useState } from 'react'

function toXY(angle, distance, cx, cy) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: cx + distance * Math.cos(rad),
    y: cy + distance * Math.sin(rad),
  }
}

const CX = 200
const CY = 140

export default function NetworkDiagram({ nodes, onNodeClick }) {
  const [hovered, setHovered] = useState(null)

  const center = nodes.find(n => n.id === 'center')
  const factors = nodes.filter(n => n.id !== 'center')

  return (
    <div className="flex flex-col gap-1">
      <svg
        viewBox="0 0 400 280"
        className="w-full rounded-xl bg-bg-base border border-border-default"
        style={{ maxHeight: 220 }}
      >
        {/* Dot grid */}
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(79,126,255,0.08)" />
          </pattern>
          <filter id="glow-center">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-node">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="400" height="280" fill="url(#dotgrid)" />

        {/* Connecting lines */}
        {factors.map(node => {
          const pos = toXY(node.angle, node.distance, CX, CY)
          const shapVal = parseFloat(node.shap?.replace('+', '') || '0')
          const isHov = hovered === node.id
          return (
            <line
              key={`line-${node.id}`}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke={isHov ? node.color : 'rgba(79,126,255,0.3)'}
              strokeWidth={shapVal * 12}
              strokeLinecap="round"
              style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
            />
          )
        })}

        {/* Factor nodes */}
        {factors.map(node => {
          const pos = toXY(node.angle, node.distance, CX, CY)
          const isHov = hovered === node.id
          return (
            <g
              key={node.id}
              transform={`translate(${pos.x},${pos.y})`}
              style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onNodeClick && onNodeClick(node.id)}
            >
              <circle
                r={isHov ? node.radius * 1.15 : node.radius}
                fill={node.color}
                fillOpacity={isHov ? 0.25 : 0.15}
                stroke={node.color}
                strokeWidth={isHov ? 2 : 1.5}
                filter={isHov ? 'url(#glow-node)' : undefined}
                style={{ transition: 'r 0.3s, fill-opacity 0.3s' }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color}
                fontSize={node.radius > 18 ? 9 : 8}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {node.label.split(' ').map((word, wi) => (
                  <tspan key={wi} x="0" dy={wi === 0 ? (node.label.includes(' ') ? -5 : 0) : 11}>
                    {word}
                  </tspan>
                ))}
              </text>
              {isHov && node.shap && (
                <g>
                  <rect x={-22} y={node.radius + 4} width={44} height={14} rx={3} fill="#162035" stroke={node.color} strokeWidth={0.8} />
                  <text x={0} y={node.radius + 13} textAnchor="middle" fill={node.color} fontSize={8} fontFamily="JetBrains Mono, monospace">
                    {node.shap} impact
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Center node */}
        <g transform={`translate(${CX},${CY})`}>
          <circle r={36} fill="#4F7EFF" fillOpacity={0.2} stroke="#4F7EFF" strokeWidth={2} filter="url(#glow-center)" />
          <circle r={28} fill="#4F7EFF" fillOpacity={0.9} />
          <text textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={11} fontFamily="Space Grotesk, sans-serif" fontWeight="700">
            {center?.label}
          </text>
        </g>
      </svg>
      <span className="font-mono text-[9px] text-text-muted text-center">
        Signal contribution network — hover to explore
      </span>
    </div>
  )
}
