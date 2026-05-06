import { motion } from 'framer-motion'
import Shell from '../components/layout/Shell'
import ProfileHeader from '../components/profile/ProfileHeader'
import RiskTimeline from '../components/profile/RiskTimeline'
import InteractionHistory from '../components/profile/InteractionHistory'
import ProfileShap from '../components/profile/ProfileShap'
import Panel from '../components/ui/Panel'
import { subscriberProfile } from '../data/mock'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
}

export default function ProfileView() {
  return (
    <Shell title="Subscriber Profile" subtitle="CHIOMA OKONKWO · MTN-NG-08031247856">
      <div className="flex flex-col gap-5">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <ProfileHeader info={subscriberProfile.info} />
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {/* Contact & Account */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            <Panel>
              <div className="p-4 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Contact & Account</span>
                {[
                  ['Phone', subscriberProfile.info.phone],
                  ['Email', subscriberProfile.info.email],
                  ['Plan', subscriberProfile.info.plan],
                  ['Active Since', subscriberProfile.info.activeSince],
                  ['Last Recharge', subscriberProfile.info.lastRecharge],
                  ['Total Spend', subscriberProfile.info.totalSpend],
                  ['NPS Score', subscriberProfile.info.nps],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] text-text-muted tracking-widest uppercase">{label}</div>
                    <div className="font-plex text-sm text-text-primary mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* Risk Timeline */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
            <RiskTimeline data={subscriberProfile.riskTimeline} />
          </motion.div>

          {/* Interaction History */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
            <InteractionHistory interactions={subscriberProfile.interactions} />
          </motion.div>
        </div>

        {/* SHAP */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <ProfileShap features={subscriberProfile.shapAggregate} />
        </motion.div>
      </div>
    </Shell>
  )
}
