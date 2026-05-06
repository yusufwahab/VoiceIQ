/**
 * VoicePanel.jsx
 * Full voice session panel used in the Live Agent Dashboard.
 *
 * Flow:
 *   1. Agent clicks mic → MediaRecorder starts (useVoiceRecorder)
 *   2. Agent clicks stop → blob sent to Groq Whisper (transcribeAudio)
 *   3. Transcript sent to Groq LLM (analyseTranscript)
 *   4. Structured result displayed + TTS reads the suggestedReply
 *
 * Props:
 *   onResult(result) — called with Groq analysis whenever a new result arrives
 */

import { useState, useEffect } from 'react'
import { Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useVoiceRecorder from '../../hooks/useVoiceRecorder'
import { transcribeAudio } from '../../services/whisper'
import { analyseTranscript } from '../../services/groq'
import { speak, stopSpeaking, ttsSupported } from '../../services/tts'
import VoiceOrb from './VoiceOrb'
import RiskBadge from '../ui/RiskBadge'
import SignalChip from '../ui/SignalChip'

const RISK_TYPE_MAP = { critical: 'critical', high: 'critical', medium: 'amber', low: 'cobalt' }

export default function VoicePanel({ onResult }) {
  const { isRecording, startRecording, stopRecording, audioBlob, error: recError, permissionDenied } = useVoiceRecorder()

  const [orbState,    setOrbState]    = useState('idle')   // idle | recording | processing | error
  const [transcript,  setTranscript]  = useState('')
  const [result,      setResult]      = useState(null)
  const [error,       setError]       = useState(null)
  const [ttsActive,   setTtsActive]   = useState(false)
  const [ttsEnabled,  setTtsEnabled]  = useState(true)

  // When recorder produces a blob → transcribe → analyse
  useEffect(() => {
    if (!audioBlob) return
    ;(async () => {
      setOrbState('processing')
      setError(null)
      try {
        // Step 1: Whisper STT
        const text = await transcribeAudio(audioBlob)
        setTranscript(text)

        if (!text) {
          setError('No speech detected. Please try again.')
          setOrbState('error')
          return
        }

        // Step 2: Groq LLM analysis
        const analysis = await analyseTranscript(text)
        setResult(analysis)
        onResult?.(analysis)

        // Step 3: TTS — read the suggested reply aloud
        if (ttsEnabled && ttsSupported() && analysis.suggestedReply) {
          setTtsActive(true)
          speak(analysis.suggestedReply, { onEnd: () => setTtsActive(false) })
        }

        setOrbState('idle')
      } catch (err) {
        setError(err.message)
        setOrbState('error')
      }
    })()
  }, [audioBlob])

  // Sync recorder errors
  useEffect(() => {
    if (recError) { setError(recError); setOrbState('error') }
  }, [recError])

  function handleOrbClick() {
    if (orbState === 'recording') {
      stopRecording()
      setOrbState('processing') // will be overridden by useEffect above
    } else if (orbState === 'idle' || orbState === 'error') {
      setError(null)
      setResult(null)
      setTranscript('')
      startRecording()
      setOrbState('recording')
    }
  }

  function handleReset() {
    stopSpeaking()
    setOrbState('idle')
    setTranscript('')
    setResult(null)
    setError(null)
    setTtsActive(false)
  }

  function toggleTts() {
    if (ttsActive) { stopSpeaking(); setTtsActive(false) }
    setTtsEnabled(e => !e)
  }

  return (
    <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-border-default px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-accent-amber tracking-widest uppercase">
            Voice Intelligence
          </span>
          <span className="font-mono text-[9px] text-text-muted">· Whisper + Groq</span>
        </div>
        <div className="flex items-center gap-2">
          {ttsSupported() && (
            <button
              onClick={toggleTts}
              title={ttsEnabled ? 'Disable TTS' : 'Enable TTS'}
              className={`p-1.5 rounded-lg transition-colors ${ttsEnabled ? 'text-accent-cobalt hover:bg-accent-cobalt-dim' : 'text-text-muted hover:text-text-secondary'}`}
            >
              {ttsEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          )}
          {(result || error) && (
            <button onClick={handleReset} className="p-1.5 rounded-lg text-text-muted hover:text-text-secondary transition-colors" title="Reset">
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Orb + instruction */}
        <div className="flex flex-col items-center gap-3 py-2">
          <VoiceOrb state={orbState} onClick={handleOrbClick} size="lg" disabled={permissionDenied} />
          <p className="font-plex text-[11px] text-text-muted text-center max-w-[200px]">
            {permissionDenied
              ? 'Microphone access denied. Check browser permissions.'
              : orbState === 'idle'
              ? 'Tap to record customer speech'
              : orbState === 'recording'
              ? 'Recording… tap to stop'
              : orbState === 'processing'
              ? 'Transcribing and analysing…'
              : 'Tap to try again'}
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-[rgba(251,146,60,0.1)] border border-risk-high/30 rounded-lg px-3 py-2"
            >
              <p className="font-plex text-[11px] text-risk-high">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-bg-base border border-border-default rounded-lg p-3"
            >
              <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase block mb-1.5">
                Whisper Transcript
              </span>
              <p className="font-plex text-[12px] text-text-secondary leading-relaxed italic">
                "{transcript}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Groq Analysis Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              {/* Risk + signals */}
              <div className="flex items-center gap-2 flex-wrap">
                <RiskBadge level={result.churnRisk} label={result.churnRisk?.toUpperCase()} />
                {result.signals?.map((s, i) => (
                  <SignalChip key={i} label={s} type={RISK_TYPE_MAP[result.churnRisk] || 'cobalt'} />
                ))}
              </div>

              {/* Analysis */}
              <div className="bg-bg-elevated border border-border-default rounded-lg p-3">
                <span className="font-mono text-[9px] text-accent-cobalt tracking-widest uppercase block mb-1">
                  Groq Analysis
                </span>
                <p className="font-plex text-[12px] text-text-secondary leading-relaxed">
                  {result.analysis}
                </p>
              </div>

              {/* Recommendation */}
              {result.recommendation && (
                <div className="border-l-4 border-accent-cobalt bg-bg-elevated rounded-r-lg px-3 py-2">
                  <span className="font-mono text-[9px] text-accent-cobalt tracking-widest uppercase block mb-1">
                    Recommended Action
                  </span>
                  <p className="font-plex text-[12px] text-text-primary">{result.recommendation}</p>
                </div>
              )}

              {/* Suggested reply + TTS indicator */}
              {result.suggestedReply && (
                <div className="bg-bg-base border border-border-default rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">
                      Suggested Reply
                    </span>
                    {ttsActive && (
                      <span className="flex items-center gap-1 font-mono text-[9px] text-accent-cobalt">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cobalt animate-pulse" />
                        Speaking…
                      </span>
                    )}
                  </div>
                  <p className="font-plex text-[12px] text-text-secondary italic leading-relaxed">
                    "{result.suggestedReply}"
                  </p>
                  {ttsSupported() && ttsEnabled && !ttsActive && (
                    <button
                      onClick={() => { setTtsActive(true); speak(result.suggestedReply, { onEnd: () => setTtsActive(false) }) }}
                      className="mt-2 font-mono text-[9px] text-accent-cobalt hover:underline"
                    >
                      ▶ Play again
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
