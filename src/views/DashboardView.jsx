import { useState } from 'react'
import { motion } from 'framer-motion'
import Shell from '../components/layout/Shell'
import CallerCard from '../components/dashboard/CallerCard'
import LiveTranscript from '../components/dashboard/LiveTranscript'
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

export default function DashboardView() {
  const [pulsedShap,    setPulsedShap]    = useState(null)
  const [voiceResult,   setVoiceResult]   = useState(null)

  function handleNodeClick(nodeId) {
    setPulsedShap(nodeId)
    setTimeout(() => setPulsedShap(null), 300)
  }

  // When VoicePanel returns a Groq result, surface it in the SHAP panel
  function handleVoiceResult(result) {
    setVoiceResult(result)
  }

  return (
    <Shell title="Live Agent Dashboard" subtitle="ACTIVE CALL · CHIOMA OKONKWO · MTN NIGERIA">
      <div className="flex flex-col gap-4">
        {/* Main 3-col grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1.5fr 1fr' }}>

          {/* Col 1 — Active Call */}
          <motion.div className="flex flex-col gap-3" initial="hidden" animate="show">
            <motion.div custom={0} variants={fadeUp}>
              <CallerCard subscriber={activeCall.subscriber} />
            </motion.div>
            <motion.div custom={1} variants={fadeUp}>
              <LiveTranscript transcript={activeCall.transcript} />
            </motion.div>
            <motion.div custom={2} variants={fadeUp}>
              <Panel>
                <PanelHeader>
                  <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Detected Signals</span>
                </PanelHeader>
                <div className="p-3">
                  <SignalStrip signals={activeCall.signals} />
                </div>
              </Panel>
            </motion.div>
          </motion.div>

          {/* Col 2 — Intelligence */}
          <motion.div className="flex flex-col gap-3" initial="hidden" animate="show">
            <motion.div custom={1} variants={fadeUp}>
              <ChurnScoreCard churnScores={activeCall.churnScores} />
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
                  <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">Subscriber Context</span>
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
              <VoicePanel onResult={handleVoiceResult} />
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
