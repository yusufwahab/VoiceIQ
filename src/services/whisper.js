/**
 * whisper.js — Speech-to-text via Groq's Whisper endpoint
 * Endpoint : POST https://api.groq.com/openai/v1/audio/transcriptions
 * Model    : VITE_GROQ_WHISPER_MODEL (default: whisper-large-v3)
 * Key      : VITE_GROQ_API_KEY  ← set in .env, never hardcoded
 *
 * Accepted formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm
 */

const BASE_URL      = 'https://api.groq.com/openai/v1'
const API_KEY       = import.meta.env.VITE_GROQ_API_KEY
const WHISPER_MODEL = import.meta.env.VITE_GROQ_WHISPER_MODEL || 'whisper-large-v3'

// Context prompt — helps Whisper handle Pidgin + telco vocabulary
const CONTEXT_PROMPT = 'Nigerian Pidgin, MTN, Airtel, Glo, 9mobile, data bundle, recharge, port, network, abeg, don, dey, wan'

/**
 * Transcribe an audio Blob using Groq Whisper.
 * @param {Blob} audioBlob  — raw audio from MediaRecorder (webm/ogg/mp4)
 * @param {{ language?:string, prompt?:string }} opts
 * @returns {Promise<string>} transcribed text
 */
export async function transcribeAudio(audioBlob, opts = {}) {
  if (!API_KEY)                    throw new Error('VITE_GROQ_API_KEY is not set in .env')
  if (!audioBlob || audioBlob.size === 0) throw new Error('Audio blob is empty — nothing to transcribe')

  const form = new FormData()
  // Groq requires a filename with a recognised extension
  form.append('file',            audioBlob, 'recording.webm')
  form.append('model',           WHISPER_MODEL)
  form.append('response_format', 'json')
  form.append('prompt',          opts.prompt ?? CONTEXT_PROMPT)
  if (opts.language) form.append('language', opts.language)

  // Do NOT set Content-Type — browser sets it with the correct multipart boundary
  const res = await fetch(`${BASE_URL}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: form,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Whisper ${res.status}: ${err?.error?.message || res.statusText}`)
  }

  const data = await res.json()
  return data.text?.trim() ?? ''
}
