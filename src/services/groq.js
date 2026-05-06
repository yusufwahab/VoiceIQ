/**
 * groq.js — Groq chat completions client
 * Base URL : https://api.groq.com/openai/v1
 * Model    : VITE_GROQ_MODEL (default: llama3-70b-8192)
 * Key      : VITE_GROQ_API_KEY  ← set in .env, never hardcoded
 */

const BASE_URL = 'https://api.groq.com/openai/v1'
const API_KEY  = import.meta.env.VITE_GROQ_API_KEY
const MODEL    = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `You are VoiceIQ, an AI co-pilot embedded in a Nigerian telco (MTN Nigeria) call-center.
Your job:
1. Analyse customer speech for churn signals, frustration, and intent.
2. Detect Nigerian Pidgin, Yoruba/Igbo/Hausa code-switching, and local slang.
3. Suggest concise, empathetic retention actions for the agent.
4. Flag high-risk phrases: port intent, competitor mentions, repeat complaints.

Always respond with ONLY valid JSON matching this exact shape:
{
  "analysis": "one-sentence summary",
  "signals": ["signal1", "signal2"],
  "churnRisk": "low|medium|high|critical",
  "recommendation": "specific action for the agent",
  "suggestedReply": "exact words the agent should say"
}`

/**
 * Send a conversation to Groq and receive structured intelligence.
 * @param {Array<{role:'user'|'assistant', content:string}>} messages
 * @param {{ temperature?:number, maxTokens?:number }} opts
 * @returns {Promise<{analysis:string, signals:string[], churnRisk:string, recommendation:string, suggestedReply:string}>}
 */
export async function chatWithGroq(messages, opts = {}) {
  if (!API_KEY) throw new Error('VITE_GROQ_API_KEY is not set in .env')

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: opts.temperature ?? 0.3,
      max_tokens: opts.maxTokens ?? 512,
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Groq ${res.status}: ${err?.error?.message || res.statusText}`)
  }

  const data = await res.json()
  const raw  = data.choices?.[0]?.message?.content ?? '{}'

  try {
    return JSON.parse(raw)
  } catch {
    return { analysis: raw, signals: [], churnRisk: 'medium', recommendation: '', suggestedReply: '' }
  }
}

/**
 * Convenience wrapper: analyse a plain transcript string.
 * @param {string} transcript
 */
export async function analyseTranscript(transcript) {
  return chatWithGroq([{
    role: 'user',
    content: `Analyse this customer call transcript:\n\n"${transcript}"`,
  }])
}
