/**
 * VoiceMicButton.jsx
 * Compact mic button for the Inbox reply composer.
 * Records speech → Whisper STT → fills the reply textarea.
 *
 * Props:
 *   onTranscript(text) — called with the transcribed string
 */

import { useState, useEffect } from 'react'
import { Mic, Square, Loader2 } from 'lucide-react'
import useVoiceRecorder from '../../hooks/useVoiceRecorder'
import { transcribeAudio } from '../../services/whisper'

export default function VoiceMicButton({ onTranscript }) {
  const { isRecording, startRecording, stopRecording, audioBlob, error } = useVoiceRecorder()
  const [state, setState] = useState('idle') // idle | recording | processing

  // When blob is ready → transcribe
  useEffect(() => {
    if (!audioBlob) return
    ;(async () => {
      setState('processing')
      try {
        const text = await transcribeAudio(audioBlob)
        if (text) onTranscript?.(text)
      } catch (err) {
        console.error('[VoiceMicButton] Whisper error:', err.message)
      } finally {
        setState('idle')
      }
    })()
  }, [audioBlob])

  function handleClick() {
    if (state === 'recording') {
      stopRecording()
      setState('processing')
    } else if (state === 'idle') {
      startRecording()
      setState('recording')
    }
  }

  const iconMap = {
    idle:       <Mic size={16} />,
    recording:  <Square size={16} fill="currentColor" />,
    processing: <Loader2 size={16} className="animate-spin" />,
  }

  const colorMap = {
    idle:       'text-text-muted hover:text-accent-cobalt hover:bg-accent-cobalt-dim',
    recording:  'text-risk-critical bg-[rgba(248,113,113,0.12)] border-risk-critical/40',
    processing: 'text-accent-cobalt bg-accent-cobalt-dim',
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'processing'}
      title={state === 'recording' ? 'Stop recording' : 'Record voice input'}
      className={`
        w-10 h-10 rounded-xl border border-border-default flex items-center justify-center
        transition-all duration-150 shrink-0
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-accent-cobalt
        ${colorMap[state]}
      `}
    >
      {iconMap[state]}
    </button>
  )
}
