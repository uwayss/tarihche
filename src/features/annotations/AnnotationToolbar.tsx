import type { AnnotationMode } from './types'

const modes: Array<{ id: AnnotationMode; label: string }> = [
  { id: 'off', label: 'Off' },
  { id: 'highlight', label: 'Highlight' },
  { id: 'pen', label: 'Pen' },
  { id: 'erase', label: 'Erase' },
]

export function AnnotationToolbar(props: {
  mode: AnnotationMode
  setMode: (mode: AnnotationMode) => void
  onClear: () => void
}) {
  return (
    <div className="tc-annoToolbar" role="toolbar" aria-label="Annotations">
      <div className="tc-annoModes">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            className={props.mode === m.id ? 'tc-annoBtn tc-annoBtnActive' : 'tc-annoBtn'}
            onClick={() => props.setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <button type="button" className="tc-annoBtn" onClick={props.onClear}>
        Clear
      </button>
    </div>
  )
}
