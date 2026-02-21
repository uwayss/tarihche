import type { ReactNode } from 'react';

export function Shell(props: {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  readingMode?: boolean;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50">
      {!props.readingMode && props.left && (
        <aside
          className="flex-none w-80 border-r border-slate-200 bg-white overflow-y-auto"
          aria-label="Navigation"
        >
          {props.left}
        </aside>
      )}
      <main className="flex-1 overflow-y-auto relative bg-white shadow-xl shadow-slate-200/50 z-10">
        {props.children}
      </main>
      {!props.readingMode && props.right && (
        <aside
          className="flex-none w-72 border-l border-slate-200 bg-white overflow-y-auto"
          aria-label="Sections"
        >
          {props.right}
        </aside>
      )}
    </div>
  );
}
