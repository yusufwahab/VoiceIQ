/**
 * useVoiceRecorder.js
 * Custom hook that wraps the MediaRecorder API.
 *
 * Returns:
 *   { isRecording, startRecording, stopRecording, audioBlob, error, permissionDenied }
 *
 * Usage:
 *   const { isRecording, startRecording, stopRecording, audioBlob } = useVoiceRecorder()
 */

import { useState, useRef, useCallback } from 'react'

// Prefer webm/opus (best browser support + Groq accepts it)
const PREFERRED_MIME = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4']

function getSupportedMime() {
  return PREFERRED_MIME.find(m => MediaRecorder.isTypeSupported(m)) || ''
}

export default function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [error, setError] = useState(null)
  const [permissionDenied, setPermissionDenied] = useState(false)

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  const startRecording = useCallback(async () => {
    setError(null)
    setAudioBlob(null)
    chunksRef.current = []

    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,       // mono — smaller file, faster upload
          sampleRate: 16000,     // 16kHz — Whisper's native rate
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionDenied(true)
        setError('Microphone permission denied. Please allow access and try again.')
      } else {
        setError(`Could not access microphone: ${err.message}`)
      }
      return
    }

    streamRef.current = stream
    const mimeType = getSupportedMime()
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' })
      setAudioBlob(blob)
      // Release microphone
      stream.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }

    recorder.onerror = (e) => {
      setError(`Recording error: ${e.error?.message || 'Unknown error'}`)
      setIsRecording(false)
    }

    mediaRecorderRef.current = recorder
    recorder.start(250) // collect chunks every 250ms for low latency
    setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }, [])

  return { isRecording, startRecording, stopRecording, audioBlob, error, permissionDenied }
}
