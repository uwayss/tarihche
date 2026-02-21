import type { ReactNode } from 'react';

export function ReaderLayout(props: {
  topBar: ReactNode;
  toolBar?: ReactNode;
  children: ReactNode;
}) {
  const showTools = props.toolBar !== undefined && props.toolBar !== null;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-transparent text-slate-900">
      <header className="flex-none h-20 border-b-4 border-double border-slate-800 bg-[#fdfbf7] z-20 flex items-center px-6 shadow-sm">
        {props.topBar}
      </header>
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto relative z-0">
          {props.children}
        </main>
        {showTools ? (
          <aside className="flex-none w-24 border-l-4 border-double border-slate-800 bg-[#fdfbf7] z-10 flex flex-col items-center py-6 gap-4 shadow-[-4px_0_15px_rgba(0,0,0,0.05)]" aria-label="Araçlar">
            {props.toolBar}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
