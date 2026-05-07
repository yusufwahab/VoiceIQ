/**
 * ConversationThread.jsx
 *
 * Flow:
 * 1. Thread starts in PREVIEW state — shows the WhatsApp messages as a
 *    read-only preview using the exact same bubble/detection UI, with an
 *    audio message included. A banner + "Import & Analyse" button sits at top.
 * 2. Click "Import & Analyse" → preview clears, messages animate in one by one
 *    with VoiceIQ scanning each one live.
 * 3. Audio message shows player → play → transcript reveals → detection card.
 * 4. Live churn score in header ticks up as signals are detected.
 */

import { useState, useRef } from 'react'
import { Send, MessageCircle, CheckCheck, Shield, TrendingUp, Mic, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RiskBadge from '../ui/RiskBadge'
import ActionButton from '../ui/ActionButton'
import VoiceMicButton from '../voice/VoiceMicButton'
import AudioMessage from './AudioMessage'
import { useNavigate } from 'react-router-dom'

// ─── The full sequence that animates in after import ─────────────────────────
const IMPORT_SEQUENCE = [
  {
    id: 'wa1',
    type: 'subscriber',
    text: 'Hello, I sent a message earlier about my data. Nobody has replied me.',
    timestamp: '9:58 AM',
    churnSignals: [],
  },
  {
    id: 'wa2',
    type: 'subscriber',
    text: 'Abeg this data don finish again. I buy 2GB yesterday and e don finish.',
    timestamp: '10:02 AM',
    churnSignals: ['data don finish', '2GB'],
  },
  {
    id: 'wd2',
    type: 'detection',
    text: 'Data complaint · Frustration: Medium · Churn signal: +0.09',
  },
  {
    id: 'wa3',
    type: 'subscriber',
    text: 'Una customer service no dey reply. This is very bad service.',
    timestamp: '10:08 AM',
    churnSignals: ['no dey reply', 'very bad service'],
  },
  {
    id: 'wd3',
    type: 'detection',
    text: 'Service dissatisfaction · No response complaint · Churn signal: +0.11',
  },
  {
    id: 'wa4',
    type: 'audio',
    sender: 'Chioma Okonkwo',
    timestamp: '10:15 AM',
    duration: '0:42',
    audioSrc: '/Voiceiq_audio.mp4',
    transcript: 'What the heck is wrong with this fucking network. I have been trying to upload a picture to facebook and the network is just poor. This has been happening for over 10 days. I am very very frustrated with this network.',
    detection: {
      signals: [
        { label: 'High Frustration',  severity: 'critical' },
        { label: 'Network Complaint', severity: 'critical' },
        { label: 'Prolonged Issue',   severity: 'critical' },
        { label: 'Service Failure',   severity: 'amber'    },
      ],
      summary: 'Extreme frustration · Network failure 10+ days · Churn signal: +0.24 · Escalation risk high',
      churnDelta: '+0.24',
      riskLevel: 'critical',
      riskScore: 87,
    },
  },
  {
    id: 'wa5',
    type: 'subscriber',
    text: 'I wan port go Airtel if una no fix this today. I don tire.',
    timestamp: '10:17 AM',
    churnSignals: ['port go Airtel', 'don tire'],
  },
  {
    id: 'wd5',
    type: 'detection',
    text: 'Port intent confirmed · Risk elevated to 87% · Immediate intervention required',
  },
]

// ─── Highlight churn phrases ──────────────────────────────────────────────────
function HighlightedText({ text, signals = [] }) {
  if (!signals.length) return <span>{text}</span>
  let parts = [{ text, highlight: false }]
  signals.forEach(phrase => {
    parts = parts.flatMap(p => {
      if (p.highlight) return [p]
      const idx = p.text.toLowerCase().indexOf(phrase.toLowerCase())
      if (idx === -1) return [p]
      return [
        { text: p.text.slice(0, idx),                    highlight: false },
        { text: p.text.slice(idx, idx + phrase.length),  highlight: true  },
        { text: p.text.slice(idx + phrase.length),       highlight: false },
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

// ─── Static preview audio bubble (before import) ─────────────────────────────
function PreviewAudioBubble() {
  return (
    <div className="flex justify-end">
      <div className="max-w-[72%] bg-bg-elevated border border-border-default border-l-2 border-l-accent-amber rounded-2xl rounded-tr-sm px-4 py-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-accent-amber/20 flex items-center justify-center">
            <Mic size={10} className="text-accent-amber" />
          </div>
          <span className="font-mono text-[9px] text-accent-amber tracking-widest uppercase">
            Voice Message · Chioma Okonkwo
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Static play button */}
          <div className="w-9 h-9 rounded-full bg-accent-cobalt/30 border border-accent-cobalt/40 flex items-center justify-center shrink-0">
            <Play size={13} className="text-accent-cobalt" style={{ marginLeft: 2 }} />
          </div>
          {/* Static waveform */}
          <div className="flex items-center gap-[2.5px] h-7 flex-1">
            {[3,6,10,16,22,18,12,8,14,20,26,22,16,10,6,12,18,24,20,14,8,16,22,18,12,6,10,16,8,4].map((h, i) => (
              <div key={i} className="rounded-full w-[3px] bg-bg-overlay shrink-0" style={{ height: h }} />
            ))}
          </div>
          <span className="font-mono text-[10px] text-text-muted tabular-nums shrink-0">0:42</span>
        </div>
        <span className="font-mono text-[9px] text-text-muted mt-2 block">10:15 AM</span>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ConversationThread({ conversation, suggestedReply }) {
  const navigate   = useNavigate()
  const threadRef  = useRef(null)

  const [reply,      setReply]      = useState(suggestedReply)
  const [phase,      setPhase]      = useState('preview')
  const [messages,   setMessages]   = useState([])
  const [churnScore, setChurnScore] = useState(61)
  const [sent,       setSent]       = useState(false)

  function handleSend() {
    const text = reply.trim()
    if (!text) return
    setMessages(prev => [...prev, {
      id: `agent-${Date.now()}`,
      type: 'agent',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
    setReply('')
    setSent(true)
    setTimeout(() => setSent(false), 2000)
    setTimeout(() => {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const churnColor = churnScore >= 80 ? 'text-risk-critical'
    : churnScore >= 60 ? 'text-risk-high'
    : 'text-risk-medium'

  function startImport() {
    setPhase('importing')
    setMessages([])

    IMPORT_SEQUENCE.forEach((msg, i) => {
      const isDetection = msg.type === 'detection'
      const delay = isDetection ? i * 700 + 400 : i * 700
      setTimeout(() => {
        setMessages(prev => [...prev, msg])
        if (msg.id === 'wd2') setChurnScore(68)
        if (msg.id === 'wd3') setChurnScore(74)
        if (msg.id === 'wd5') setChurnScore(87)
        setTimeout(() => {
          threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
        }, 50)
      }, delay)
    })

    // Switch to live after all messages are in
    setTimeout(() => setPhase('live'), IMPORT_SEQUENCE.length * 700 + 800)
  }

  const isLive = phase === 'live' || phase === 'importing'

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Header ── */}
      <div className="px-5 py-3 border-b border-border-default flex items-center gap-3 bg-bg-surface shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cobalt to-accent-violet flex items-center justify-center text-white font-grotesk font-bold text-xs shrink-0">
          {conversation.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-grotesk font-semibold text-sm text-text-primary">{conversation.name}</span>
            <RiskBadge level={conversation.riskLevel} score={conversation.riskScore} />
            {isLive && (
              <motion.span
                key={churnScore}
                initial={{ scale: 1.25, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`font-mono text-[10px] font-bold ${churnColor} bg-bg-elevated border border-border-default px-1.5 py-0.5 rounded tabular-nums`}
              >
                <TrendingUp size={9} className="inline mr-0.5" />
                {churnScore}% churn
              </motion.span>
            )}
          </div>
          <span className="font-plex text-[11px] text-text-muted">{conversation.channel}</span>
        </div>

        {phase === 'live' ? (
          <span className="flex items-center gap-1 font-mono text-[9px] text-[#25D366] tracking-widest shrink-0">
            <CheckCheck size={12} />
            IMPORTED
          </span>
        ) : (
          <span className="font-mono text-[9px] text-text-muted tracking-widest shrink-0">PREVIEW</span>
        )}

        <ActionButton variant="secondary" onClick={() => navigate('/profile')}>
          Open Profile
        </ActionButton>
      </div>

      {/* ── Thread area ── */}
      <div ref={threadRef} className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-3">

        {/* PREVIEW PHASE — show static messages + import CTA */}
        {phase === 'preview' && (
          <>
            {/* Import banner at top */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[rgba(37,211,102,0.06)] border border-[#25D366]/20 rounded-xl px-4 py-3 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[rgba(37,211,102,0.12)] border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <div className="font-grotesk font-semibold text-sm text-text-primary mb-0.5">
                    WhatsApp Chat Ready to Import
                  </div>
                  <p className="font-plex text-[12px] text-text-secondary">
                    5 messages found including 1 voice note · VoiceIQ will scan for churn signals, transcribe audio, and update the risk score live.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1 border-t border-[#25D366]/10">
                <Shield size={12} className="text-accent-cobalt shrink-0" />
                <span className="font-mono text-[9px] text-text-muted tracking-widest flex-1">
                  CHURN PHRASES WILL BE HIGHLIGHTED · AUDIO WILL BE TRANSCRIBED
                </span>
                <button
                  onClick={startImport}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] hover:brightness-110 active:scale-95 text-white font-plex text-xs font-semibold transition-all shrink-0"
                >
                  <MessageCircle size={13} />
                  Import & Analyse
                </button>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-2 py-1">
              <div className="flex-1 h-px bg-border-default" />
              <span className="font-mono text-[9px] text-text-muted tracking-widest px-2">PREVIEW</span>
              <div className="flex-1 h-px bg-border-default" />
            </div>

            {/* Static preview of all messages — same UI as live */}
            {[
              { id: 'p1', type: 'subscriber', text: 'Hello, I sent a message earlier about my data. Nobody has replied me.', timestamp: '9:58 AM', churnSignals: [] },
              { id: 'p2', type: 'subscriber', text: 'Abeg this data don finish again. I buy 2GB yesterday and e don finish.', timestamp: '10:02 AM', churnSignals: ['data don finish', '2GB'] },
              { id: 'p3', type: 'subscriber', text: 'Una customer service no dey reply. This is very bad service.', timestamp: '10:08 AM', churnSignals: ['no dey reply', 'very bad service'] },
              { id: 'p4', type: 'audio-preview' },
              { id: 'p5', type: 'subscriber', text: 'I wan port go Airtel if una no fix this today. I don tire.', timestamp: '10:17 AM', churnSignals: ['port go Airtel', 'don tire'] },
            ].map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                {msg.type === 'subscriber' && (
                  <div className="flex justify-end">
                    <div className="max-w-[72%] bg-bg-elevated border-l-2 border-[#25D366]/40 rounded-2xl rounded-tr-sm px-4 py-2.5 opacity-70">
                      <span className="font-mono text-[8px] text-[#25D366]/60 tracking-widest uppercase block mb-1">
                        WhatsApp · {msg.timestamp}
                      </span>
                      <p className="font-plex text-sm text-text-primary leading-relaxed">
                        <HighlightedText text={msg.text} signals={msg.churnSignals} />
                      </p>
                    </div>
                  </div>
                )}
                {msg.type === 'audio-preview' && (
                  <div className="opacity-70">
                    <PreviewAudioBubble />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Bottom import CTA */}
            <div className="flex justify-center pt-2">
              <button
                onClick={startImport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:brightness-110 active:scale-95 text-white font-plex text-sm font-semibold transition-all"
              >
                <MessageCircle size={15} />
                Import & Analyse
              </button>
            </div>
          </>
        )}

        {/* IMPORTING / LIVE PHASE — messages animate in */}
        {isLive && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 py-1"
            >
              <div className="flex-1 h-px bg-border-default" />
              <span className="font-mono text-[9px] text-[#25D366] tracking-widest px-2 flex items-center gap-1.5">
                <MessageCircle size={10} />
                {phase === 'importing' ? 'VOICEIQ SCANNING…' : 'WHATSAPP IMPORTED · VOICEIQ COMPLETE'}
              </span>
              <div className="flex-1 h-px bg-border-default" />
            </motion.div>

            {messages.map(msg => {
              if (msg.type === 'agent') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[72%] bg-accent-cobalt-dim border border-accent-cobalt/20 border-l-2 border-l-accent-cobalt rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <span className="font-mono text-[8px] text-accent-cobalt tracking-widest uppercase block mb-1">
                        Agent · {msg.timestamp}
                      </span>
                      <p className="font-plex text-sm text-text-primary leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                )
              }

              if (msg.type === 'subscriber') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: 20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[72%] bg-bg-elevated border-l-2 border-[#25D366] rounded-2xl rounded-tr-sm px-4 py-2.5">
                      <span className="font-mono text-[8px] text-[#25D366] tracking-widest uppercase block mb-1">
                        WhatsApp · {msg.timestamp}
                      </span>
                      <p className="font-plex text-sm text-text-primary leading-relaxed">
                        <HighlightedText text={msg.text} signals={msg.churnSignals} />
                      </p>
                    </div>
                  </motion.div>
                )
              }

              if (msg.type === 'audio') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <AudioMessage msg={msg} onChurnUpdate={setChurnScore} />
                  </motion.div>
                )
              }

              if (msg.type === 'detection') {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full bg-bg-base border border-border-default border-l-2 border-l-accent-cobalt rounded-lg px-4 py-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cobalt animate-pulse" />
                      <span className="font-mono text-[9px] text-accent-cobalt tracking-widest uppercase">
                        VoiceIQ Detected
                      </span>
                    </div>
                    <p className="font-plex text-[12px] text-text-secondary">{msg.text}</p>
                  </motion.div>
                )
              }

              return null
            })}
          </>
        )}
      </div>

      {/* ── Reply composer ── */}
      <div className="px-5 py-4 border-t border-border-default bg-bg-surface shrink-0">
        <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase block mb-2">
          AI Suggested
        </span>
        <div className="flex gap-2">
          <VoiceMicButton onTranscript={text => setReply(prev => prev ? `${prev} ${text}` : text)} />
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Type a reply…"
            className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-3 font-plex text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-border-active transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!reply.trim()}
            className={`rounded-xl px-4 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-accent-cobalt active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              sent
                ? 'bg-risk-low text-bg-base'
                : 'bg-accent-cobalt hover:brightness-110 text-white'
            }`}
          >
            {sent ? <span className="font-mono text-[11px] font-bold">✓</span> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
