import type { ReactNode } from 'react';

export function ReaderLayout(props: {
  topBar: ReactNode;
  toolBar?: ReactNode;
  children: ReactNode;
}) {
  const showTools = props.toolBar !== undefined && props.toolBar !== null;

  return (
    <div className="tc-reader">
      <header className="tc-topbar">{props.topBar}</header>
      <div
        className={
          showTools ? 'tc-readerBody' : 'tc-readerBody tc-readerBodyNoTools'
        }
      >
        <main className="tc-readerMain">{props.children}</main>
        {showTools ? (
          <aside className="tc-tools" aria-label="Araçlar">
            {props.toolBar}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
