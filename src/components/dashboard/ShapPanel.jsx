import { motion } from 'framer-motion'
import { useState } from 'react'

const colorMap = {
  critical: { bar: '#F87171', text: 'text-risk-critical', bg: 'bg-[rgba(248,113,113,0.15)]' },
  cobalt: { bar: '#4F7EFF', text: 'text-accent-cobalt', bg: 'bg-accent-cobalt-dim' },
  amber: { bar: '#F5C518', text: 'text-accent-amber', bg: 'bg-accent-amber-dim' },
  violet: { bar: '#7C6FFF', text: 'text-accent-violet', bg: 'bg-[rgba(124,111,255,0.15)]' },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const barVariant = {
  hidden: { width: 0, opacity: 0 },
  show: (bw) => ({
    width: `${bw}%`,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  }),
}

export default function ShapPanel({ features, pulsedId, title = 'SHAP FEATURE IMPORTANCE', subtitle = 'Explaining the 87% prediction' }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">{title}</span>
        <p className="font-plex text-[11px] text-text-muted mt-0.5">{subtitle}</p>
      </div>

      <motion.div
        className="flex flex-col gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map(f => {
          const c = colorMap[f.color] || colorMap.cobalt
          const isPulsed = pulsedId === f.id
          return (
            <div
              key={f.id}
              className={`flex flex-col gap-1 transition-transform duration-300 ${isPulsed ? 'scale-[1.02]' : ''}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-plex text-[11px] text-text-secondary">{f.label}</span>
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${c.text} ${c.bg}`}>
                  +{f.value.toFixed(2)}
                </span>
              </div>
              <div className="h-1.5 bg-bg-overlay rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: c.bar }}
                  variants={barVariant}
                  custom={f.barWidth}
                />
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Verdict */}
      <div className="bg-bg-base border-l-4 border-accent-cobalt p-3 rounded-r-lg">
        <p className="font-plex text-[12px] text-text-secondary italic leading-relaxed">
          Chioma is at high churn risk because she explicitly stated intent to port, has contacted support 3 times this week, has not recharged in 9 days, and mentioned Airtel as an alternative. Immediate retention action recommended.
        </p>
      </div>
    </div>
  )
}
