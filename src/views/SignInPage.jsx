import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Mock auth — just navigate after 800ms
    setTimeout(() => {
      localStorage.setItem('voiceiq_auth', 'true')
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-cobalt opacity-[0.03] blur-[120px] pointer-events-none" />

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
        className="w-full max-w-md relative">

        {/* Card */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent-cobalt mx-auto flex items-center justify-center mb-4">
              <Zap size={20} className="text-white" />
            </div>
            <h1 className="font-grotesk font-bold text-2xl text-text-primary mb-2">Welcome Back</h1>
            <p className="font-plex text-sm text-text-secondary">
              Sign in to access your VoiceIQ dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="font-plex text-xs text-text-secondary block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="amaka@mtn.ng"
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border-default bg-bg-base accent-accent-cobalt" />
                <span className="font-plex text-xs text-text-secondary">Remember me</span>
              </label>
              <button type="button" className="font-plex text-xs text-accent-cobalt hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-cobalt hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-plex font-semibold text-sm px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border-default" />
            <span className="font-mono text-[10px] text-text-muted tracking-widest">OR</span>
            <div className="flex-1 h-px bg-border-default" />
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <span className="font-plex text-sm text-text-secondary">Don't have an account? </span>
            <Link to="/signup" className="font-plex text-sm text-accent-cobalt hover:underline font-semibold">
              Create one now
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-amber-dim border border-accent-amber/30 rounded-lg px-3 py-2">
            <span className="font-mono text-[10px] text-accent-amber tracking-widest">DEMO MODE</span>
            <span className="font-plex text-xs text-text-secondary">Any email/password will work</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
