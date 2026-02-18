import type { ReactNode } from 'react'

export function ReaderLayout(props: {
  topBar: ReactNode
  toolBar: ReactNode
  children: ReactNode
}) {
  return (
    <div className="tc-reader">
      <header className="tc-topbar">{props.topBar}</header>
      <div className="tc-readerBody">
        <main className="tc-readerMain">{props.children}</main>
        <aside className="tc-tools" aria-label="Araçlar">
          {props.toolBar}
        </aside>
      </div>
    </div>
  )
}
