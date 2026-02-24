import type { ReactNode } from 'react';

export type ProfileLink = {
  label: string;
  href: string;
  hint?: string;
};

export function ProfileCard(props: {
  name: string;
  tagline?: string;
  links?: ProfileLink[];
  children?: ReactNode;
}) {
  const initial = (props.name.trim().slice(0, 1) || 'T').toUpperCase();
  const links = (props.links ?? []).filter((l) => l.href.trim());

  return (
    <aside className="my-10 rounded-2xl border border-slate-200 bg-white/60 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        <header className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center text-2xl font-black font-serif flex-none"
            aria-hidden="true"
          >
            {initial}
          </div>

          <div className="min-w-0">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
              {props.name}
            </div>
            {props.tagline ? (
              <div className="mt-1 text-lg text-slate-600 font-serif">
                {props.tagline}
              </div>
            ) : null}
          </div>
        </header>

        {props.children ? (
          <div className="prose prose-slate prose-lg max-w-none">
            {props.children}
          </div>
        ) : null}

        {links.length ? (
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={`${link.label}:${link.href}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
              >
                <span className="font-bold font-serif">{link.label}</span>
                {link.hint ? (
                  <span className="text-slate-500 font-serif">{link.hint}</span>
                ) : null}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
