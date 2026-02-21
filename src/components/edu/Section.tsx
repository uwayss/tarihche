import { useEffect, useMemo, type ReactNode } from 'react';
import { useSectionRegistry } from '../../features/sections/SectionRegistry';
import { slugify } from '../../utils/slugify';

export function Section(props: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  const { registerSection } = useSectionRegistry();

  const sectionId = useMemo(() => {
    return props.id?.trim() ? props.id.trim() : slugify(props.title);
  }, [props.id, props.title]);

  useEffect(() => {
    registerSection({ id: sectionId, title: props.title });
  }, [registerSection, sectionId, props.title]);

  return (
    <section id={sectionId} data-section-id={sectionId} className="my-16 scroll-mt-24">
      <header className="mb-8 flex items-center gap-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight m-0">{props.title}</h2>
        <div className="flex-1 h-1 bg-slate-100 rounded-full" aria-hidden="true" />
      </header>
      <div className="prose prose-slate prose-lg max-w-none">{props.children}</div>
    </section>
  );
}
