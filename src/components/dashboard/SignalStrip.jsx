import SignalChip from '../ui/SignalChip'

export default function SignalStrip({ signals }) {
  return (
    <div className="flex flex-wrap gap-2">
      {signals.map(sig => (
        <SignalChip key={sig.id} label={sig.label} type={sig.type} />
      ))}
    </div>
  )
}
