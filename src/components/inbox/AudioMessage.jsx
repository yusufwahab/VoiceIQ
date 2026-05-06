/**
 * AudioMessage.jsx
 * WhatsApp-style voice message bubble.
 * Play → waveform animates → audio ends → transcript reveals word by word
 * → VoiceIQ detection card animates in → live churn score ticks up
 */

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Mic, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RiskBadge from '../ui/RiskBadge'
import SignalChip from '../ui/SignalChip'

const WAVE_HEIGHTS = [3,6,10,16,22,18,12,8,14,20,26,22,16,10,6,12,18,24,20,14,8,16,22,18,12,6,10,16,8,4]
const SEVERITY_TYPE = { critical: 'critical', amber: 'amber', cobalt: 'cobalt' }

export default function AudioMessage({ msg, onChurnUpdate }) {
  const audioRef = useRef(null)
  const [playing,          setPlaying]          = useState(false)
  const [progress,         setProgress]         = useState(0)
  const [elapsed,          setElapsed]          = useState(0)
  const [duration,         setDuration]         = useState(0)
  const [showTranscript,   setShowTranscript]   = useState(false)
  const [revealedWords,    setRevealedWords]    = useState(0)
  const [showDetection,    setShowDetection]    = useState(false)
  const [liveChurn,        setLiveChurn]        = useState(61)   // starts at behavioral baseline

  const words = msg.transcript?.split(' ') ?? []

  // Words to highlight as churn signals
  const signalWords = ['heck', 'fucking', 'poor', 'frustrated', 'frustration', '10 days', 'wrong']

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onMeta = () => setDuration(audio.duration || 0)
    audio.addEventListener('loadedmetadata', onMeta)
    return () => audio.removeEventListener('loadedmetadata', onMeta)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setElapsed(audio.currentTime)
      setProgress(duration ? (audio.currentTime / duration) * 100 : 0)
    }
    const onEnd = () => {
      setPlaying(false)
      setProgress(100)
      startTranscriptReveal()
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [duration, words.length])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause(); setPlaying(false)
    } else {
      audio.play(); setPlaying(true)
    }
  }

  function handleScrub(e) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect  = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setProgress(ratio * 100)
  }

  function startTranscriptReveal() {
    setShowTranscript(true)
    // Reveal one word every 80ms
    words.forEach((_, i) => {
      setTimeout(() => {
        setRevealedWords(i + 1)
        // Tick churn score up as high-risk words appear
        if (i === Math.floor(words.length * 0.4)) tickChurn(68)
        if (i === Math.floor(words.length * 0.7)) tickChurn(79)
        if (i === words.length - 1) {
          tickChurn(87)
          setTimeout(() => setShowDetection(true), 700)
        }
      }, i * 80)
    })
  }

  function tickChurn(target) {
    setLiveChurn(prev => {
      if (prev >= target) return prev
      onChurnUpdate?.(target)
      return target
    })
  }

  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  const displayTime = (playing || elapsed > 0) ? fmt(elapsed) : (duration ? fmt(duration) : msg.duration ?? '0:00')

  return (
    <div className="flex justify-end">
      <div className="w-full max-w-[88%] flex flex-col gap-2">

        {/* ── Audio bubble ── */}
        <div className="bg-bg-elevated border border-border-default border-l-2 border-l-accent-amber rounded-2xl rounded-tr-sm px-4 py-3">

          {/* Top row: label + download */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-accent-amber/20 flex items-center justify-center">
                <Mic size={10} className="text-accent-amber" />
              </div>
              <span className="font-mono text-[9px] text-accent-amber tracking-widest uppercase">
                Voice Message · {msg.sender}
              </span>
            </div>
            <a
              href={msg.audioSrc}
              download
              className="p-1 rounded text-text-muted hover:text-text-secondary transition-colors"
              title="Download audio"
            >
              <Download size={12} />
            </a>
          </div>

          {/* Player row */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-accent-cobalt hover:brightness-110 active:scale-95 flex items-center justify-center shrink-0 transition-all shadow-lg shadow-accent-cobalt/20 focus-visible:outline-2 focus-visible:outline-accent-cobalt"
            >
              {playing
                ? <Pause size={15} className="text-white" fill="white" />
                : <Play  size={15} className="text-white" fill="white" style={{ marginLeft: 2 }} />
              }
            </button>

            {/* Waveform */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div
                className="flex items-center gap-[2.5px] h-8 cursor-pointer select-none"
                onClick={handleScrub}
              >
                {WAVE_HEIGHTS.map((h, i) => {
                  const barPct = (i / WAVE_HEIGHTS.length) * 100
                  const isPlayed = barPct <= progress
                  const isActive = playing && isPlayed
                  return (
                    <motion.div
                      key={i}
                      className={`rounded-full w-[3px] shrink-0 transition-colors duration-100 ${
                        isPlayed ? 'bg-accent-cobalt' : 'bg-bg-overlay'
                      }`}
                      style={{ height: h }}
                      animate={isActive ? { scaleY: [1, 1.4, 0.9, 1.2, 1] } : { scaleY: 1 }}
                      transition={{
                        duration: 0.5,
                        repeat: isActive ? Infinity : 0,
                        delay: i * 0.015,
                        ease: 'easeInOut',
                      }}
                    />
                  )
                })}
              </div>

              {/* Scrub bar */}
              <div
                className="h-1 bg-bg-overlay rounded-full cursor-pointer overflow-hidden"
                onClick={handleScrub}
              >
                <motion.div
                  className="h-full bg-accent-cobalt rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Timer + live churn */}
            <div className="flex flex-col items-end gap-0.5 shrink-0">
              <span className="font-mono text-[10px] text-text-muted tabular-nums">{displayTime}</span>
              {showTranscript && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[9px] font-bold text-risk-critical tabular-nums"
                >
                  {liveChurn}%
                </motion.span>
              )}
            </div>
          </div>

          <span className="font-mono text-[9px] text-text-muted mt-2 block">{msg.timestamp}</span>
        </div>

        {/* ── Transcript reveal ── */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className="bg-bg-base border border-border-default rounded-xl px-4 py-3 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
                <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">
                  Whisper Transcript · Groq Whisper Large v3
                </span>
              </div>
              <p className="font-plex text-[12px] text-text-secondary leading-relaxed italic">
                {words.slice(0, revealedWords).map((word, i) => {
                  const isSignal = signalWords.some(s => word.toLowerCase().includes(s.toLowerCase()))
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className={isSignal ? 'bg-accent-amber-dim text-accent-cobalt rounded px-0.5 mx-0.5' : ''}
                    >
                      {word}{' '}
                    </motion.span>
                  )
                })}
                {revealedWords < words.length && (
                  <span className="inline-flex gap-0.5 ml-1">
                    <span className="typing-dot w-1 h-1 rounded-full bg-text-muted inline-block" />
                    <span className="typing-dot w-1 h-1 rounded-full bg-text-muted inline-block" />
                    <span className="typing-dot w-1 h-1 rounded-full bg-text-muted inline-block" />
                  </span>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── VoiceIQ Detection card ── */}
        <AnimatePresence>
          {showDetection && msg.detection && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-bg-base border border-border-default border-l-4 border-l-accent-cobalt rounded-xl px-4 py-3 flex flex-col gap-2.5"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cobalt animate-pulse" />
                  <span className="font-mono text-[9px] text-accent-cobalt tracking-widest uppercase">
                    VoiceIQ Detected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RiskBadge level={msg.detection.riskLevel} score={msg.detection.riskScore} />
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-mono text-[10px] font-bold text-risk-critical bg-[rgba(248,113,113,0.12)] border border-risk-critical/30 px-1.5 py-0.5 rounded"
                  >
                    {msg.detection.churnDelta}
                  </motion.span>
                </div>
              </div>

              {/* Summary */}
              <p className="font-plex text-[12px] text-text-secondary leading-relaxed">
                {msg.detection.summary}
              </p>

              {/* Signal chips — staggered */}
              <div className="flex flex-wrap gap-1.5">
                {msg.detection.signals.map((sig, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SignalChip label={sig.label} type={SEVERITY_TYPE[sig.severity] || 'cobalt'} />
                  </motion.div>
                ))}
              </div>

              {/* Churn contribution bar */}
              <div className="pt-1 border-t border-border-default">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-text-muted">Churn signal contribution</span>
                  <span className="font-mono text-[9px] text-risk-critical font-bold">{msg.detection.churnDelta}</span>
                </div>
                <div className="h-1.5 bg-bg-overlay rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-risk-critical to-red-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <audio ref={audioRef} src={msg.audioSrc} preload="metadata" className="hidden" />
      </div>
    </div>
  )
}
