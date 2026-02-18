import type { ReactNode } from 'react'

export function Shell(props: {
  left?: ReactNode
  right?: ReactNode
  children: ReactNode
  readingMode?: boolean
}) {
  const cls = props.readingMode ? 'tc-shell tc-shellReading' : 'tc-shell'

  return (
    <div className={cls}>
      <aside className="tc-left" aria-label="Navigation">
        {props.left}
      </aside>
      <main className="tc-main">{props.children}</main>
      <aside className="tc-right" aria-label="Sections">
        {props.right}
      </aside>
    </div>
  )
}
