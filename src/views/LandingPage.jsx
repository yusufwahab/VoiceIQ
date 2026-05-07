import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, ArrowRight, Mic, BarChart2, MessageSquare, ShieldCheck,
  TrendingUp, Users, Globe, ChevronRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: Mic,
    color: 'text-mtn-yellow',
    bg: 'bg-primary-dim',
    border: 'border-mtn-yellow/20',
    title: 'Real-Time Voice Intelligence',
    desc: 'Transcribes and analyses live calls in Nigerian Pidgin, Yoruba, Igbo, and Hausa code-switching — detecting churn signals as the conversation unfolds.',
  },
  {
    icon: BarChart2,
    color: 'text-mtn-blue',
    bg: 'bg-secondary-dim',
    border: 'border-mtn-blue/20',
    title: 'Explainable SHAP Scoring',
    desc: 'Every churn prediction is broken down into feature contributions. Agents see exactly why a subscriber is at risk — not just a number.',
  },
  {
    icon: MessageSquare,
    color: 'text-status-info',
    bg: 'bg-status-info/10',
    border: 'border-status-info/20',
    title: 'Omnichannel Inbox',
    desc: 'Voice, WhatsApp, and SMS conversations unified in one view, sorted by churn risk. Never miss a high-value subscriber in distress.',
  },
  {
    icon: ShieldCheck,
    color: 'text-status-success',
    bg: 'bg-status-success/10',
    border: 'border-status-success/20',
    title: 'AI-Powered Retention Actions',
    desc: 'Context-aware next-best-action recommendations delivered to agents in real time. One click to apply a retention offer.',
  },
]

const stats = [
  { value: '87%', label: 'Churn prediction accuracy', color: 'text-mtn-yellow' },
  { value: '+26pts', label: 'Signal lift over behavioral-only', color: 'text-mtn-blue' },
  { value: '₦42.3M', label: 'Estimated revenue protected', color: 'text-status-success' },
  { value: '3 min', label: 'Average agent response time', color: 'text-status-info' },
]

const testimonials = [
  {
    name: 'Amaka Osei',
    role: 'Call Center Agent, MTN Lagos',
    initials: 'AO',
    quote: 'VoiceIQ tells me exactly what a customer needs before I even finish reading their account. The Pidgin detection is scary accurate.',
  },
  {
    name: 'Chidi Nwosu',
    role: 'Retention Manager, MTN Nigeria',
    initials: 'CN',
    quote: 'We reduced churn by 18% in the first month. The SHAP explanations help my team understand the model and trust the recommendations.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-base text-text-primary overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-border-default">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mtn-yellow to-mtn-yellow-dark flex items-center justify-center shadow-md shadow-mtn-yellow/20">
              <Zap size={16} className="text-bg-base" />
            </div>
            <span className="font-grotesk font-bold text-base text-text-primary">VoiceIQ</span>
            <span className="font-mono text-[9px] text-text-muted border border-border-default px-1.5 py-0.5 rounded ml-1 tracking-widest">AI4TELCO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'How It Works', 'Results'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="font-plex text-sm text-text-secondary hover:text-text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/signin')}
              className="font-plex text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5">
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-mtn-yellow hover:bg-mtn-yellow-light active:scale-95 text-bg-base font-plex font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-mtn-yellow/20">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-mtn-yellow opacity-[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-mtn-blue opacity-[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-mtn-yellow border border-mtn-yellow/30 bg-primary-dim px-3 py-1.5 rounded-full tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-mtn-yellow animate-pulse" />
              AI4TELCO HACKATHON · MICROSOFT AI SKILLS WEEK LAGOS 2026
            </span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="font-grotesk font-bold text-5xl md:text-6xl text-text-primary leading-tight mb-6">
            Turn Every Call Into a{' '}
            <span className="text-mtn-yellow">Retention Opportunity</span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="font-plex text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            VoiceIQ is the first churn intelligence platform built for how Nigerians actually communicate —
            detecting Pidgin, code-switching, and local slang in real time to give your agents
            explainable AI signals before it's too late.
          </motion.p>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2 bg-mtn-yellow hover:bg-mtn-yellow-light active:scale-95 text-bg-base font-plex font-semibold text-base px-6 py-3 rounded-xl transition-all shadow-lg shadow-mtn-yellow/20">
              Start Free Demo <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="inline-flex items-center gap-2 border border-mtn-blue text-mtn-blue hover:bg-secondary-dim font-plex font-semibold text-base px-6 py-3 rounded-xl transition-all">
              Sign In to Dashboard <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          className="max-w-5xl mx-auto mt-16 relative">
          <div className="bg-bg-surface border border-border-default rounded-2xl overflow-hidden shadow-2xl">
            {/* Fake browser bar */}
            <div className="bg-bg-elevated border-b border-border-default px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-risk-critical opacity-60" />
                <div className="w-3 h-3 rounded-full bg-risk-medium opacity-60" />
                <div className="w-3 h-3 rounded-full bg-risk-low opacity-60" />
              </div>
              <div className="flex-1 mx-4 bg-bg-base border border-border-default rounded px-3 py-1 font-mono text-[10px] text-text-muted">
                app.voiceiq.ng/dashboard
              </div>
            </div>
            {/* Dashboard mockup */}
            <div className="p-4 grid gap-3" style={{ gridTemplateColumns: '2fr 1.5fr 1fr' }}>
              {/* Col 1 */}
              <div className="flex flex-col gap-2">
                <div className="bg-bg-elevated border border-border-default rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mtn-yellow to-mtn-blue flex items-center justify-center text-bg-base font-grotesk font-bold text-sm shadow-md">CO</div>
                  <div>
                    <div className="font-grotesk font-semibold text-sm text-text-primary">Chioma Okonkwo</div>
                    <div className="font-mono text-[9px] text-mtn-yellow">00:47 · LIVE</div>
                  </div>
                </div>
                <div className="bg-bg-base border border-border-default rounded-xl p-3 space-y-1.5">
                  <div className="font-mono text-[8px] text-mtn-blue tracking-widest">LIVE TRANSCRIPT — PIDGIN NLP ACTIVE</div>
                  {['AGT: Good afternoon, thank you for calling MTN...', 'SUB: Abeg my data don finish again...', 'SUB: I wan port go Airtel if una no fix this today.'].map((line, i) => (
                    <div key={i} className="font-plex text-[10px] text-text-secondary">{line}</div>
                  ))}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {['Port Intent', '3rd Contact', 'High Frustration'].map(chip => (
                    <span key={chip} className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-risk-critical/40 bg-[rgba(248,113,113,0.1)] text-risk-critical">{chip}</span>
                  ))}
                </div>
              </div>
              {/* Col 2 */}
              <div className="flex flex-col gap-2">
                <div className="bg-bg-elevated border border-border-default rounded-xl p-3">
                  <div className="font-mono text-[8px] text-text-muted mb-2 tracking-widest">CHURN RISK SCORE</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1"><span className="font-plex text-[10px] text-text-secondary">Behavioral only</span><span className="font-grotesk font-bold text-xs text-text-primary">61%</span></div>
                      <div className="h-1.5 bg-bg-overlay rounded-full"><div className="h-full w-[61%] bg-bg-overlay rounded-full border border-text-muted/30" /></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="font-plex text-[10px] text-text-secondary">VoiceIQ full signal</span><span className="font-grotesk font-bold text-xs text-risk-critical">87%</span></div>
                      <div className="h-1.5 bg-bg-overlay rounded-full"><div className="h-full w-[87%] bg-gradient-to-r from-risk-critical to-red-400 rounded-full" /></div>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-elevated border border-border-default rounded-xl p-3 flex-1">
                  <div className="font-mono text-[8px] text-text-muted mb-2 tracking-widest">SHAP IMPORTANCE</div>
                  {[['Port intent', 100, '#EF4444'], ['Repeat contact', 77, '#F97316'], ['No recharge', 61, '#0066CC'], ['Competitor', 55, '#FFCB05']].map(([label, w, color]) => (
                    <div key={label} className="mb-1.5">
                      <div className="flex justify-between mb-0.5"><span className="font-plex text-[9px] text-text-secondary">{label}</span></div>
                      <div className="h-1 bg-bg-overlay rounded-full"><div className="h-full rounded-full" style={{ width: `${w}%`, backgroundColor: color, opacity: 0.8 }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Col 3 */}
              <div className="bg-bg-elevated border border-border-default rounded-xl p-3 flex flex-col gap-2">
                <div className="font-mono text-[8px] text-text-muted tracking-widest">SUBSCRIBER</div>
                <div className="font-grotesk font-bold text-mtn-yellow text-sm">₦2,400/mo</div>
                <div className="font-mono text-[8px] bg-status-success/15 text-status-success px-1.5 py-0.5 rounded w-fit">HIGH VALUE</div>
                <div className="mt-auto">
                  <div className="font-mono text-[8px] text-text-muted mb-1">AI RECOMMENDATION</div>
                  <div className="font-plex text-[10px] text-text-secondary">Offer 1GB bundle + 30-day loyalty package</div>
                  <div className="mt-2 bg-mtn-yellow text-bg-base font-plex text-[10px] font-semibold px-2 py-1 rounded text-center shadow-sm">Apply Offer</div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow under preview */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-mtn-yellow opacity-10 blur-2xl rounded-full pointer-events-none" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-border-default bg-bg-surface">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
              <div className={`font-grotesk font-bold text-3xl ${s.color} mb-1`}>{s.value}</div>
              <div className="font-plex text-xs text-text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="font-mono text-[10px] text-mtn-yellow tracking-widest uppercase">Platform Capabilities</span>
            <h2 className="font-grotesk font-bold text-3xl text-text-primary mt-3">Built for Nigerian Telcos</h2>
            <p className="font-plex text-text-secondary mt-3 max-w-xl mx-auto">
              Every feature is designed around the realities of Nigerian customer communication — not adapted from a Western template.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`bg-bg-surface border ${f.border} rounded-xl p-5 flex gap-4`}>
                <div className={`w-10 h-10 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center shrink-0`}>
                  <f.icon size={18} className={f.color} />
                </div>
                <div>
                  <h3 className="font-grotesk font-semibold text-sm text-text-primary mb-1.5">{f.title}</h3>
                  <p className="font-plex text-[13px] text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-bg-surface border-y border-border-default">
        <div className="max-w-4xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="font-mono text-[10px] text-mtn-blue tracking-widest uppercase">The Narrative</span>
            <h2 className="font-grotesk font-bold text-3xl text-text-primary mt-3">Signal → Score → Explanation → Action</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', icon: Mic, color: 'text-mtn-yellow', bg: 'bg-primary-dim', title: 'Signal Detected', desc: 'Pidgin NLP picks up "wan port go Airtel" in real time' },
              { step: '02', icon: TrendingUp, color: 'text-risk-critical', bg: 'bg-risk-critical/12', title: 'Score Updated', desc: 'Churn risk jumps from 61% to 87% — +26pt delta' },
              { step: '03', icon: BarChart2, color: 'text-mtn-blue', bg: 'bg-secondary-dim', title: 'SHAP Explained', desc: 'Port intent contributes +0.31 to the prediction' },
              { step: '04', icon: ShieldCheck, color: 'text-status-success', bg: 'bg-status-success/12', title: 'Action Taken', desc: 'Agent applies 1GB bundle + loyalty offer in one click' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-bg-elevated border border-border-default rounded-xl p-4 relative">
                <div className="font-mono text-[9px] text-text-muted tracking-widest mb-3">{item.step}</div>
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                  <item.icon size={16} className={item.color} />
                </div>
                <h3 className="font-grotesk font-semibold text-sm text-text-primary mb-1">{item.title}</h3>
                <p className="font-plex text-[12px] text-text-secondary">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={16} className="text-text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <span className="font-mono text-[10px] text-status-success tracking-widest uppercase">From the Field</span>
            <h2 className="font-grotesk font-bold text-3xl text-text-primary mt-3">Agents Love It</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-bg-surface border border-border-default rounded-xl p-5">
                <p className="font-plex text-sm text-text-secondary italic leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mtn-yellow to-mtn-blue flex items-center justify-center text-bg-base font-grotesk font-bold text-xs shrink-0 shadow-md">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-grotesk font-semibold text-sm text-text-primary">{t.name}</div>
                    <div className="font-plex text-[11px] text-text-muted">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-bg-surface border-t border-border-default">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mtn-yellow to-mtn-yellow-dark mx-auto flex items-center justify-center mb-6 shadow-lg shadow-mtn-yellow/20">
            <Zap size={24} className="text-bg-base" />
          </div>
          <h2 className="font-grotesk font-bold text-3xl text-text-primary mb-4">
            Ready to stop churn before it happens?
          </h2>
          <p className="font-plex text-text-secondary mb-8">
            Join the demo and see VoiceIQ turn a live Pidgin conversation into a retention action in under 3 minutes.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2 bg-mtn-yellow hover:bg-mtn-yellow-light active:scale-95 text-bg-base font-plex font-semibold text-base px-8 py-3 rounded-xl transition-all shadow-lg shadow-mtn-yellow/20">
              Create Free Account <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="font-plex text-sm text-text-secondary hover:text-text-primary transition-colors">
              Already have an account? Sign in →
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-mtn-yellow to-mtn-yellow-dark flex items-center justify-center shadow-sm">
              <Zap size={12} className="text-bg-base" />
            </div>
            <span className="font-grotesk font-bold text-sm text-text-primary">VoiceIQ</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={12} className="text-text-muted" />
            <span className="font-plex text-xs text-text-muted">Built for AI4Telco Hackathon · Microsoft AI Skills Week Lagos 2026</span>
          </div>
          <span className="font-mono text-[10px] text-text-muted">© 2026 VoiceIQ</span>
        </div>
      </footer>
    </div>
  )
}
