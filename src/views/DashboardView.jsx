import { useState } from 'react'
import { motion } from 'framer-motion'
import Shell from '../components/layout/Shell'
import LiveCallPlayer from '../components/dashboard/LiveCallPlayer'
import SignalStrip from '../components/dashboard/SignalStrip'
import ChurnScoreCard from '../components/dashboard/ChurnScoreCard'
import NetworkDiagram from '../components/dashboard/NetworkDiagram'
import ShapPanel from '../components/dashboard/ShapPanel'
import RecommendationCard from '../components/dashboard/RecommendationCard'
import SubscriberContext from '../components/dashboard/SubscriberContext'
import CallQueue from '../components/dashboard/CallQueue'
import Panel, { PanelHeader } from '../components/ui/Panel'
import VoicePanel from '../components/voice/VoicePanel'
import { activeCall, callQueue } from '../data/mock'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
}

// Churn starts at behavioral baseline (61), increments as signals fire
const BASE_CHURN = { behavioral: 61, voiceiq: 61, delta: 0 }

export default function DashboardView() {
  const [pulsedShap,   setPulsedShap]   = useState(null)
  const [liveSignals,  setLiveSignals]  = useState([])
  const [churnScores,  setChurnScores]  = useState(BASE_CHURN)

  function handleNodeClick(nodeId) {
    setPulsedShap(nodeId)
    setTimeout(() => setPulsedShap(null), 300)
  }

  // Called by LiveCallPlayer each time a Chioma line fires
  function handleChurnUpdate(delta) {
    if (delta === -1) {
      // Reset signal from player restart
      setChurnScores(BASE_CHURN)
      setLiveSignals([])
      return
    }
    setChurnScores(prev => {
      const next = Math.min(87, prev.voiceiq + delta)
      return { behavioral: 61, voiceiq: next, delta: next - 61 }
    })
  }

  function handleSignal(signal) {
    setLiveSignals(prev => {
      if (prev.find(s => s.label === signal.label)) return prev
      return [...prev, { ...signal, id: prev.length + 1 }]
    })
  }

  // Merge live signals with static ones — live ones appear first
  const displaySignals = liveSignals.length > 0
    ? [...liveSignals, ...activeCall.signals.filter(s => !liveSignals.find(l => l.label === s.label))]
    : activeCall.signals

  return (
    <Shell title="Live Agent Dashboard" subtitle="ACTIVE CALL · CHIOMA OKONKWO · MTN NIGERIA">
      <div className="flex flex-col gap-4">
        {/* Main 3-col grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1.5fr 1fr' }}>

          {/* Col 1 — Active Call */}
          <motion.div className="flex flex-col gap-3" initial="hidden" animate="show">
            <motion.div custom={0} variants={fadeUp}>
              <LiveCallPlayer
                subscriber={activeCall.subscriber}
                onChurnUpdate={handleChurnUpdate}
                onSignal={handleSignal}
              />
            </motion.div>
            <motion.div custom={1} variants={fadeUp}>
              <Panel>
                <PanelHeader>
                  <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">
                    Detected Signals
                  </span>
                  {liveSignals.length > 0 && (
                    <span className="font-mono text-[9px] text-risk-critical bg-[rgba(248,113,113,0.1)] border border-risk-critical/30 px-1.5 py-0.5 rounded animate-pulse">
                      {liveSignals.length} LIVE
                    </span>
                  )}
                </PanelHeader>
                <div className="p-3">
                  <SignalStrip signals={displaySignals} />
                </div>
              </Panel>
            </motion.div>
          </motion.div>

          {/* Col 2 — Intelligence */}
          <motion.div className="flex flex-col gap-3" initial="hidden" animate="show">
            <motion.div custom={1} variants={fadeUp}>
              {/* Live churn score card — updates as audio plays */}
              <ChurnScoreCard churnScores={churnScores} />
            </motion.div>
            <motion.div custom={2} variants={fadeUp}>
              <NetworkDiagram nodes={activeCall.networkNodes} onNodeClick={handleNodeClick} />
            </motion.div>
            <motion.div custom={3} variants={fadeUp}>
              <Panel>
                <div className="p-4">
                  <ShapPanel features={activeCall.shap} pulsedId={pulsedShap} />
                </div>
              </Panel>
            </motion.div>
            <motion.div custom={4} variants={fadeUp}>
              <RecommendationCard recommendation={activeCall.recommendation} />
            </motion.div>
          </motion.div>

          {/* Col 3 — Subscriber Context + Voice */}
          <motion.div className="flex flex-col gap-3" initial="hidden" animate="show">
            <motion.div custom={2} variants={fadeUp}>
              <Panel>
                <PanelHeader>
                  <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">
                    Subscriber Context
                  </span>
                </PanelHeader>
                <div className="p-4">
                  <SubscriberContext
                    subscriber={activeCall.subscriber}
                    sparkline={activeCall.sparkline}
                  />
                </div>
              </Panel>
            </motion.div>
            <motion.div custom={3} variants={fadeUp}>
              <VoicePanel onResult={() => {}} />
            </motion.div>
          </motion.div>
        </div>

        {/* Call Queue */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
          <CallQueue queue={callQueue} />
        </motion.div>
      </div>
    </Shell>
  )
}
