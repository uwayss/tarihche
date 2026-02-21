import type { ReactNode } from 'react';

export type NoteType = 'default' | 'conflict' | 'diplomacy' | 'economy' | 'people' | 'culture';

export function NoteBox(props: { title?: string; type?: NoteType; children: ReactNode }) {
  const type = props.type || 'default';
  
  const styles = {
    default: 'bg-slate-50 border-slate-300 text-slate-800',
    conflict: 'bg-[var(--color-semantic-conflict-bg)] border-[var(--color-semantic-conflict)] text-slate-900',
    diplomacy: 'bg-[var(--color-semantic-diplomacy-bg)] border-[var(--color-semantic-diplomacy)] text-slate-900',
    economy: 'bg-[var(--color-semantic-economy-bg)] border-[var(--color-semantic-economy)] text-slate-900',
    people: 'bg-[var(--color-semantic-people-bg)] border-[var(--color-semantic-people)] text-slate-900',
    culture: 'bg-[var(--color-semantic-culture-bg)] border-[var(--color-semantic-culture)] text-slate-900',
  };

  const titleStyles = {
    default: 'text-slate-700',
    conflict: 'text-[var(--color-semantic-conflict)]',
    diplomacy: 'text-[var(--color-semantic-diplomacy)]',
    economy: 'text-[var(--color-semantic-economy)]',
    people: 'text-[var(--color-semantic-people)]',
    culture: 'text-[var(--color-semantic-culture)]',
  };

  return (
    <aside 
      className={`my-8 p-6 rounded-2xl border-l-8 shadow-md ${styles[type]}`} 
      aria-label={props.title ?? 'Note'}
    >
      {props.title ? (
        <div className={`font-bold text-xl mb-3 uppercase tracking-wider ${titleStyles[type]}`}>
          {props.title}
        </div>
      ) : null}
      <div className="prose prose-lg max-w-none prose-p:last:mb-0">
        {props.children}
      </div>
    </aside>
  );
}
