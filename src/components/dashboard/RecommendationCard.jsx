import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import ActionButton from '../ui/ActionButton'

function boldPhrases(text, phrases) {
  let parts = [{ text, bold: false }]
  for (const phrase of phrases) {
    parts = parts.flatMap(p => {
      if (p.bold) return [p]
      const idx = p.text.indexOf(phrase)
      if (idx === -1) return [p]
      return [
        { text: p.text.slice(0, idx), bold: false },
        { text: phrase, bold: true },
        { text: p.text.slice(idx + phrase.length), bold: false },
      ]
    })
  }
  return parts
}

export default function RecommendationCard({ recommendation }) {
  const [applied, setApplied] = useState(false)

  function handleApply() {
    setApplied(true)
    setTimeout(() => setApplied(false), 2000)
  }

  const parts = boldPhrases(recommendation.body, recommendation.boldPhrases)

  return (
    <div className="border-l-4 border-accent-cobalt bg-bg-elevated rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <CheckCircle size={14} className="text-accent-cobalt shrink-0" />
        <span className="font-mono text-[10px] text-accent-cobalt tracking-widest uppercase">AI Recommendation</span>
        <span className="font-plex text-[11px] text-text-muted ml-1">· Agent reviews and acts</span>
      </div>

      {/* Body */}
      <p className="font-plex text-[13px] text-text-secondary leading-relaxed">
        {parts.map((p, i) =>
          p.bold ? <strong key={i} className="text-text-primary font-semibold">{p.text}</strong> : <span key={i}>{p.text}</span>
        )}
      </p>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <ActionButton
          variant={applied ? 'success' : 'primary'}
          onClick={handleApply}
        >
          {applied ? '✓ Offer Applied' : 'Apply Offer'}
        </ActionButton>
        <ActionButton variant="secondary">Escalate to Retention</ActionButton>
        <ActionButton variant="ghost">Override</ActionButton>
      </div>
    </div>
  )
}
