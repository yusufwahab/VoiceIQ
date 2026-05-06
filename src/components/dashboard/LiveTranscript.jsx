import { useState, useEffect } from 'react'

function highlightText(text, phrases) {
  if (!phrases || phrases.length === 0) return <span>{text}</span>
  let result = text
  const parts = []
  let remaining = text

  // Build segments
  const allPhrases = [...phrases].sort((a, b) => text.indexOf(a) - text.indexOf(b))
  let cursor = 0
  for (const phrase of allPhrases) {
    const idx = remaining.indexOf(phrase)
    if (idx === -1) continue
    const absIdx = cursor + idx
    if (absIdx > cursor) {
      parts.push({ text: text.slice(cursor, absIdx), highlight: false })
    }
    parts.push({ text: phrase, highlight: true })
    cursor = absIdx + phrase.length
    remaining = text.slice(cursor)
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), highlight: false })
  }

  return (
    <>
      {parts.map((p, i) =>
        p.highlight ? (
          <mark key={i} className="bg-accent-amber-dim text-accent-cobalt rounded px-0.5 not-italic">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  )
}

export default function LiveTranscript({ transcript }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    transcript.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === transcript.length - 1) {
          setTimeout(() => setShowTyping(true), 400)
        }
      }, i * 600)
    })
  }, [])

  return (
    <div className="bg-bg-base border border-border-default rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-accent-amber tracking-widest uppercase">
          Live Transcript — Pidgin NLP Active
        </span>
        <span className="w-2 h-2 rounded-full bg-risk-critical animate-pulse" />
      </div>

      {/* Lines */}
      <div className="flex flex-col gap-2 min-h-[120px]">
        {transcript.slice(0, visibleCount).map((line, i) => (
          <div
            key={line.id}
            className="flex gap-2 animate-[fadeUp_0.4s_ease-out_forwards]"
            style={{ animationFillMode: 'both' }}
          >
            <span className={`font-mono text-[10px] shrink-0 mt-0.5 ${line.speaker === 'Agent' ? 'text-accent-cobalt' : 'text-accent-amber'}`}>
              {line.speaker === 'Agent' ? 'AGT' : 'SUB'}
            </span>
            <p className="font-plex text-[12px] text-text-secondary leading-relaxed">
              {highlightText(line.text, line.highlights)}
            </p>
          </div>
        ))}

        {showTyping && (
          <div className="flex gap-2 items-center mt-1">
            <span className="font-mono text-[10px] text-accent-amber shrink-0">SUB</span>
            <div className="flex gap-1 items-center">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-text-muted inline-block" />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border-default pt-2">
        <span className="font-mono text-[9px] text-text-muted">
          Groq Whisper · Pidgin model active · llama3-70b-8192
        </span>
      </div>
    </div>
  )
}
