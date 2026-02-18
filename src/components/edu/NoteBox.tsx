import type { ReactNode } from 'react'

export function NoteBox(props: { title?: string; children: ReactNode }) {
  return (
    <aside className="tc-noteBox" aria-label={props.title ?? 'Note'}>
      {props.title ? <div className="tc-noteTitle">{props.title}</div> : null}
      <div className="tc-noteBody">{props.children}</div>
    </aside>
  )
}
