/**
 * VoiceOrb.jsx
 * Animated microphone button with three visual states:
 *   idle       → cobalt ring, mic icon
 *   recording  → pulsing red ring, stop icon, live timer
 *   processing → spinning cobalt ring, loader icon
 */

import { useState, useEffect, useRef } from 'react'
import { Mic, Square, Loader2, MicOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceOrb({ state = 'idle', onClick, disabled = false, size = 'md' }) {
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef(null)

  // Run a live timer while recording
  useEffect(() => {
    if (state === 'recording') {
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [state])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const sizeMap = {
    sm: { orb: 'w-9 h-9',  icon: 14, text: 'text-[9px]'  },
    md: { orb: 'w-12 h-12', icon: 18, text: 'text-[10px]' },
    lg: { orb: 'w-16 h-16', icon: 22, text: 'text-[11px]' },
  }
  const sz = sizeMap[size] || sizeMap.md

  const stateConfig = {
    idle: {
      ring:    'border-mtn-yellow/40',
      bg:      'bg-primary-dim hover:bg-primary-dim/80',
      icon:    <Mic size={sz.icon} className="text-mtn-yellow" />,
      label:   'Speak',
      pulse:   false,
    },
    recording: {
      ring:    'border-status-error',
      bg:      'bg-status-error/15',
      icon:    <Square size={sz.icon} className="text-status-error" fill="currentColor" />,
      label:   fmt(elapsed),
      pulse:   true,
    },
    processing: {
      ring:    'border-mtn-blue',
      bg:      'bg-secondary-dim',
      icon:    <Loader2 size={sz.icon} className="text-mtn-blue animate-spin" />,
      label:   'Processing…',
      pulse:   false,
    },
    error: {
      ring:    'border-status-warning',
      bg:      'bg-status-warning/12',
      icon:    <MicOff size={sz.icon} className="text-status-warning" />,
      label:   'Error',
      pulse:   false,
    },
  }

  const cfg = stateConfig[state] || stateConfig.idle

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        onClick={onClick}
        disabled={disabled || state === 'processing'}
        whileTap={{ scale: 0.92 }}
        className={`
          relative ${sz.orb} rounded-full border-2 ${cfg.ring} ${cfg.bg}
          flex items-center justify-center
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-2 focus-visible:outline-mtn-yellow
        `}
      >
        {/* Pulse ring for recording state */}
        {cfg.pulse && (
          <span className="absolute inset-0 rounded-full border-2 border-status-error animate-ping opacity-40" />
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {cfg.icon}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <span className={`font-mono ${sz.text} ${state === 'recording' ? 'text-status-error' : 'text-text-muted'} tabular-nums`}>
        {cfg.label}
      </span>
    </div>
  )
}
