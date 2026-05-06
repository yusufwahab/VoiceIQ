import { motion } from 'framer-motion'
import Shell from '../components/layout/Shell'
import StatsRow from '../components/analytics/StatsRow'
import ChurnDistribution from '../components/analytics/ChurnDistribution'
import SignalTable from '../components/analytics/SignalTable'
import InterventionFeed from '../components/analytics/InterventionFeed'
import { analytics } from '../data/mock'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
}

export default function AnalyticsView() {
  return (
    <Shell title="Churn Analytics" subtitle="AGGREGATE INTELLIGENCE · MTN NIGERIA · REAL-TIME">
      <div className="flex flex-col gap-5">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <StatsRow stats={analytics.stats} />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            <ChurnDistribution distribution={analytics.distribution} />
          </motion.div>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
            <SignalTable signals={analytics.signalTable} />
          </motion.div>
        </div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
          <InterventionFeed interventions={analytics.interventions} />
        </motion.div>
      </div>
    </Shell>
  )
}
