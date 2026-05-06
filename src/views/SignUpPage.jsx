import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff, User, Building, ArrowRight, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setLoading(true)
    // Mock registration — navigate after 1s
    setTimeout(() => {
      localStorage.setItem('voiceiq_auth', 'true')
      navigate('/dashboard')
    }, 1000)
  }

  const benefits = [
    'Real-time Pidgin & code-switching detection',
    'Explainable SHAP churn predictions',
    'Omnichannel inbox (Voice, WhatsApp, SMS)',
    'AI-powered retention recommendations',
  ]

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-violet opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-cobalt opacity-[0.03] blur-[100px] pointer-events-none" />

      {/* Back to landing */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 font-plex text-sm text-text-secondary hover:text-text-primary transition-colors">
        <Zap size={16} className="text-accent-cobalt" />
        <span className="font-grotesk font-bold">VoiceIQ</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl relative">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — Benefits */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-cobalt flex items-center justify-center mb-4">
                <Zap size={20} className="text-white" />
              </div>
              <h2 className="font-grotesk font-bold text-3xl text-text-primary mb-3">
                Start Preventing Churn Today
              </h2>
              <p className="font-plex text-sm text-text-secondary leading-relaxed">
                Join Nigerian telcos using VoiceIQ to turn every customer conversation into a retention opportunity.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-cobalt-dim border border-accent-cobalt/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-accent-cobalt" />
                  </div>
                  <span className="font-plex text-sm text-text-secondary">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-bg-surface border border-border-default rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xs">
                  AO
                </div>
                <div>
                  <div className="font-grotesk font-semibold text-xs text-text-primary">Amaka Osei</div>
                  <div className="font-plex text-[10px] text-text-muted">MTN Lagos Call Center</div>
                </div>
              </div>
              <p className="font-plex text-xs text-text-secondary italic">
                "VoiceIQ cut my average handle time by 40%. I know exactly what the customer needs before I finish reading their profile."
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-bg-surface border border-border-default rounded-2xl p-8">
            <div className="mb-6">
              <h1 className="font-grotesk font-bold text-2xl text-text-primary mb-2">Create Your Account</h1>
              <p className="font-plex text-sm text-text-secondary">
                Get started with a free demo account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="font-plex text-xs text-text-secondary block mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Amaka Osei"
                    required
                    className="w-full bg-bg-base border border-border-default rounded-lg pl-10 pr-4 py-2.5 font-plex text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-plex text-xs text-text-secondary block mb-1.5">Work Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="amaka@mtn.ng"
                    required
                    className="w-full bg-bg-base border border-border-default rounded-lg pl-10 pr-4 py-2.5 font-plex text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-colors"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="font-plex text-xs text-text-secondary block mb-1.5">Company</label>
                <div className="relative">
                  <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="MTN Nigeria"
                    required
                    className="w-full bg-bg-base border border-border-default rounded-lg pl-10 pr-4 py-2.5 font-plex text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="font-plex text-xs text-text-secondary block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full bg-bg-base border border-border-default rounded-lg pl-10 pr-10 py-2.5 font-plex text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="font-plex text-xs text-text-secondary block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={e => handleChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full bg-bg-base border border-border-default rounded-lg pl-10 pr-10 py-2.5 font-plex text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-active transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 rounded border-border-default bg-bg-base accent-accent-cobalt mt-0.5 shrink-0" />
                <span className="font-plex text-xs text-text-secondary">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-cobalt hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-plex font-semibold text-sm px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center">
              <span className="font-plex text-sm text-text-secondary">Already have an account? </span>
              <Link to="/signin" className="font-plex text-sm text-accent-cobalt hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-amber-dim border border-accent-amber/30 rounded-lg px-3 py-2">
            <span className="font-mono text-[10px] text-accent-amber tracking-widest">DEMO MODE</span>
            <span className="font-plex text-xs text-text-secondary">All fields are optional for demo</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
