/**
 * tts.js — Text-to-speech via the browser Web Speech API
 * Zero latency · no API key · works offline · graceful fallback
 */

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

/** @type {SpeechSynthesisUtterance|null} */
let current = null

/**
 * Speak text aloud. Cancels any in-progress speech first.
 * @param {string} text
 * @param {{ rate?:number, pitch?:number, lang?:string, onEnd?:()=>void }} opts
 */
export function speak(text, opts = {}) {
  if (!synth || !text?.trim()) return
  stopSpeaking()

  const utt   = new SpeechSynthesisUtterance(text)
  utt.rate    = opts.rate  ?? 1.05   // slightly faster for call-center use
  utt.pitch   = opts.pitch ?? 1
  utt.lang    = opts.lang  ?? 'en-NG'

  // Prefer Nigerian → British → any English voice
  const voices    = synth.getVoices()
  const preferred = voices.find(v => v.lang === 'en-NG')
    || voices.find(v => v.lang === 'en-GB')
    || voices.find(v => v.lang.startsWith('en'))
  if (preferred) utt.voice = preferred

  if (opts.onEnd) utt.onend = opts.onEnd
  current = utt
  synth.speak(utt)
}

/** Cancel any in-progress speech. */
export function stopSpeaking() {
  if (synth?.speaking) synth.cancel()
  current = null
}

/** @returns {boolean} */
export const isSpeaking   = () => synth?.speaking ?? false
export const ttsSupported = () => !!synth
