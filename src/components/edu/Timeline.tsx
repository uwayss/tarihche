import type { ReactNode } from 'react';

export function Timeline(props: { children: ReactNode }) {
  return (
    <div className="my-10 relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>
      <ol className="relative z-10 flex flex-col gap-8 m-0 p-0 list-none">
        {props.children}
      </ol>
    </div>
  );
}

export function TimelineItem(props: {
  label: string;
  children: ReactNode;
  type?:
    | 'conflict'
    | 'diplomacy'
    | 'economy'
    | 'people'
    | 'culture'
    | 'default';
}) {
  const type = props.type || 'default';

  const dotColors = {
    default: 'bg-slate-400 border-white',
    conflict:
      'bg-[var(--color-semantic-conflict)] border-[var(--color-semantic-conflict-bg)]',
    diplomacy:
      'bg-[var(--color-semantic-diplomacy)] border-[var(--color-semantic-diplomacy-bg)]',
    economy:
      'bg-[var(--color-semantic-economy)] border-[var(--color-semantic-economy-bg)]',
    people:
      'bg-[var(--color-semantic-people)] border-[var(--color-semantic-people-bg)]',
    culture:
      'bg-[var(--color-semantic-culture)] border-[var(--color-semantic-culture-bg)]',
  };

  const labelColors = {
    default: 'text-slate-600 bg-slate-100',
    conflict:
      'text-[var(--color-semantic-conflict)] bg-[var(--color-semantic-conflict-bg)]',
    diplomacy:
      'text-[var(--color-semantic-diplomacy)] bg-[var(--color-semantic-diplomacy-bg)]',
    economy:
      'text-[var(--color-semantic-economy)] bg-[var(--color-semantic-economy-bg)]',
    people:
      'text-[var(--color-semantic-people)] bg-[var(--color-semantic-people-bg)]',
    culture:
      'text-[var(--color-semantic-culture)] bg-[var(--color-semantic-culture-bg)]',
  };

  return (
    <li className="relative flex items-start gap-6 group">
      <div
        className={`flex-none w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${dotColors[type]}`}
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
        <div
          className={`inline-block px-3 py-1 rounded-lg font-bold text-sm tracking-wider mb-3 ${labelColors[type]}`}
        >
          {props.label}
        </div>
        <div className="prose prose-slate max-w-none">{props.children}</div>
      </div>
    </li>
  );
}
