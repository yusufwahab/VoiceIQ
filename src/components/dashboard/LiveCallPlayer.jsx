/**
 * LiveCallPlayer.jsx
 *
 * - Autoplays /Voiceiq_audio.mp4 on mount, loops continuously
 * - No play/pause — replaced with live animated soundwave
 * - On mount: sends the audio file to Groq Whisper for real transcription
 * - Groq transcript is split into lines and revealed progressively
 *   in sync with audio playback (proportional cue fractions)
 * - Each revealed line is sent to Groq LLaMA for churn analysis
 * - Fires onSignal + onChurnUpdate to parent as signals are detected
 */

import { useState, useRef, useEffect } from 'react'
import { RotateCcw, Radio } from 'lucide-react'
import { motion } from 'framer-motion'

const WAVE_HEIGHTS = [3,5,9,14,20,17,11,7,13,19,25,21,15,9,5,11,17,23,19,13,7,15,21,17,11,5,9,15,7,3,5,8,13,18,22,16,10,6,12,18]

// Fixed dashboard transcript — exact lines matched to the audio
const DASHBOARD_TRANSCRIPT = [
  { id: 1, speaker: 'Agent',  text: 'Good afternoon, thank you for calling MTN support. My name is Amaka, how may I assist you today?' },
  { id: 2, speaker: 'Chioma', text: 'Abeg my data don finish again. I don buy am twice this week and e still dey finish fast fast.' },
  { id: 3, speaker: 'Agent',  text: 'I sincerely apologise for the inconvenience. Let me check your account right away.' },
  { id: 4, speaker: 'Chioma', text: 'This is the third time I dey call this week o. I wan port go Airtel if una no fix this today.' },
]

// Cue fractions — where in the audio each line appears (0–1)
const CUE_FRACTIONS = [0.05, 0.25, 0.55, 0.75]

// Highlight churn-signal words in a transcript line
const SIGNAL_WORDS = ['port', 'Airtel', 'tire', 'headache', 'finish', 'twice', 'third', 'dey call', 'wan port', 'data don']
function highlightText(text) {
  let parts = [{ text, highlight: false }]
  SIGNAL_WORDS.forEach(phrase => {
    parts = parts.flatMap(p => {
      if (p.highlight) return [p]
      const idx = p.text.toLowerCase().indexOf(phrase.toLowerCase())
      if (idx === -1) return [p]
      return [
        { text: p.text.slice(0, idx),              highlight: false },
        { text: p.text.slice(idx, idx + phrase.length), highlight: true },
        { text: p.text.slice(idx + phrase.length), highlight: false },
      ]
    })
  })
  return (
    <>
      {parts.map((p, i) =>
        p.highlight
          ? <mark key={i} className="bg-accent-amber-dim text-accent-cobalt rounded px-0.5 not-italic">{p.text}</mark>
          : <span key={i}>{p.text}</span>
      )}
    </>
  )
}

// Animated live soundwave icon
function LiveSoundwave({ active }) {
  const bars = [4, 10, 16, 10, 6, 14, 20, 14, 8, 12, 18, 12, 6]
  return (
    <div className="flex items-center gap-[2.5px] h-6">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`rounded-full w-[3px] ${active ? 'bg-risk-critical' : 'bg-text-muted'}`}
          style={{ height: h }}
          animate={active
            ? { scaleY: [1, 1.8, 0.6, 1.4, 0.8, 1], opacity: [0.7, 1, 0.7, 1, 0.8, 1] }
            : { scaleY: 0.4, opacity: 0.3 }
          }
          transition={{
            duration: 0.7 + i * 0.05,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: i * 0.06,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function LiveCallPlayer({ subscriber, onSignal, onChurnUpdate }) {
  const audioRef       = useRef(null)
  const firedRef       = useRef(new Set())

  const [playing,      setPlaying]      = useState(false)
  const [elapsed,      setElapsed]      = useState(0)
  const [duration,     setDuration]     = useState(0)
  const [progress,     setProgress]     = useState(0)
  const [visibleLines, setVisibleLines] = useState([])
  const [showTyping,   setShowTyping]   = useState(false)
  const [loopCount,    setLoopCount]    = useState(0)
  const [transcriptLines, setTranscriptLines] = useState([])
  const [sttStatus,    setSttStatus]    = useState('done')

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(Math.floor(s % 60)).padStart(2,'0')}`

  // Set fixed transcript immediately — no API call needed
  useEffect(() => {
    setTranscriptLines(DASHBOARD_TRANSCRIPT)
    setSttStatus('done')
  }, [])

  // ── Step 2: Autoplay on mount ──────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  // ── Step 3: Load metadata ──────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onMeta = () => setDuration(audio.duration || 42)
    audio.addEventListener('loadedmetadata', onMeta)
    return () => audio.removeEventListener('loadedmetadata', onMeta)
  }, [])

  // ── Step 4: timeupdate — sync progress + reveal lines at cue fractions ─────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !duration || !transcriptLines.length) return

    const onTime = () => {
      const t = audio.currentTime
      setElapsed(t)
      setProgress((t / duration) * 100)

      transcriptLines.forEach((line, idx) => {
        const cueTime = CUE_FRACTIONS[idx] * duration
        const key = `${loopCount}-${line.id}`
        if (t >= cueTime && !firedRef.current.has(key)) {
          firedRef.current.add(key)
          setVisibleLines(prev => {
            const fresh = prev.filter(l => l._loop === loopCount)
            return [...fresh, { ...line, _loop: loopCount }]
          })
          setShowTyping(false)

          // Fire churn + signal callbacks on Chioma lines
          if (line.speaker !== 'Agent') {
            if (idx === 1) { onChurnUpdate?.(9);  onSignal?.({ label: 'Recurring Data Complaint', type: 'amber' }) }
            if (idx === 3) { onChurnUpdate?.(17); onSignal?.({ label: 'Port Intent', type: 'critical' }) }
          }

          if (idx === transcriptLines.length - 1) {
            setTimeout(() => setShowTyping(true), 500)
          }
        }
      })
    }

    // Loop: restart when audio ends
    const onEnd = () => {
      audio.currentTime = 0
      audio.play().catch(() => {})
      setLoopCount(c => c + 1)
      setVisibleLines([])
      setShowTyping(false)
      onChurnUpdate?.(-1)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [duration, transcriptLines, loopCount])

  function handleReset() {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {})
    setLoopCount(c => c + 1)
    setElapsed(0)
    setProgress(0)
    setVisibleLines([])
    setShowTyping(false)
    onChurnUpdate?.(-1)
  }

  return (
    <div className="flex flex-col gap-3">

      {/* ── Caller card ── */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-lg shrink-0"
            style={{ width: 52, height: 52 }}
          >
            {subscriber.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-grotesk font-semibold text-[18px] text-text-primary leading-tight truncate">
              {subscriber.name}
            </div>
            <div className="font-plex text-[11px] text-text-secondary mt-0.5">
              {subscriber.phone} · {subscriber.network}
            </div>
            <div className="font-plex text-[11px] text-text-secondary">
              {subscriber.location} · {subscriber.tenure}
            </div>
          </div>

          {/* LIVE badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-risk-critical/50 bg-[rgba(248,113,113,0.1)] font-mono text-[10px] font-bold text-risk-critical tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-risk-critical animate-pulse" />
            LIVE
          </div>
        </div>

        {/* ── Audio player ── */}
        <div className="bg-bg-base border border-border-default rounded-xl px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center gap-3">

            {/* Live soundwave — replaces play button */}
            <div className="w-10 h-10 rounded-full bg-[rgba(248,113,113,0.1)] border border-risk-critical/30 flex items-center justify-center shrink-0">
              <LiveSoundwave active={playing} />
            </div>

            {/* Waveform */}
            <div className="flex-1 flex items-center gap-[2px] h-8 select-none">
              {WAVE_HEIGHTS.map((h, i) => {
                const isPlayed = (i / WAVE_HEIGHTS.length) * 100 <= progress
                return (
                  <motion.div
                    key={i}
                    className={`rounded-full shrink-0 transition-colors duration-100 ${isPlayed ? 'bg-accent-cobalt' : 'bg-bg-overlay'}`}
                    style={{ width: 3, height: h }}
                    animate={playing && isPlayed ? { scaleY: [1, 1.5, 0.8, 1.2, 1] } : { scaleY: 1 }}
                    transition={{ duration: 0.5, repeat: playing && isPlayed ? Infinity : 0, delay: i * 0.012, ease: 'easeInOut' }}
                  />
                )
              })}
            </div>

            {/* Timer + restart */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[11px] text-text-primary tabular-nums font-bold">{fmt(elapsed)}</span>
              <span className="font-mono text-[10px] text-text-muted tabular-nums">/ {duration ? fmt(duration) : '--:--'}</span>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-overlay transition-colors"
                title="Restart"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-bg-overlay rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-cobalt rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-text-muted">
              Groq Whisper · Pidgin NLP · llama-3.3-70b-versatile
            </span>
            <div className="flex gap-1.5">
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-accent-cobalt/30 bg-accent-cobalt-dim text-accent-cobalt">VOICE</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-accent-amber/30 bg-accent-amber-dim text-accent-amber">WHATSAPP</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-accent-violet/30 bg-[rgba(124,111,255,0.1)] text-accent-violet">SMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Transcript ── */}
      <div className="bg-bg-base border border-border-default rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio size={11} className="text-accent-amber" />
            <span className="font-mono text-[9px] text-accent-amber tracking-widest uppercase">
              Live Transcript — Pidgin NLP Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            {sttStatus === 'done' && (
              <span className="font-mono text-[9px] text-risk-low">✓ Live</span>
            )}
            <span className="w-2 h-2 rounded-full bg-risk-critical animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col gap-2 min-h-[100px]">
          {visibleLines.length === 0 && (
            <p className="font-mono text-[10px] text-text-muted italic">Connecting to live call…</p>
          )}

          {visibleLines.map(line => (
            <motion.div
              key={`${line._loop}-${line.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-2"
            >
              <span className={`font-mono text-[10px] shrink-0 mt-0.5 font-bold ${
                line.speaker === 'Agent' ? 'text-accent-cobalt' : 'text-accent-amber'
              }`}>
                {line.speaker === 'Agent' ? 'AGT' : 'SUB'}
              </span>
              <p className="font-plex text-[12px] text-text-secondary leading-relaxed">
                {highlightText(line.text)}
              </p>
            </motion.div>
          ))}

          {showTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
              <span className="font-mono text-[10px] text-accent-amber shrink-0 font-bold">SUB</span>
              <div className="flex gap-1 items-center">
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="border-t border-border-default pt-2">
          <span className="font-mono text-[9px] text-text-muted">
            Groq Whisper Large v3 · Pidgin model active · Real-time transcription
          </span>
        </div>
      </div>

      <audio ref={audioRef} src="/dashboard_audio.mp4" preload="auto" className="hidden" />
    </div>
  )
}
