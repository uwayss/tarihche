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
    <section id={sectionId} data-section-id={sectionId} className="tc-section">
      <header className="tc-sectionHeader">
        <h2 className="tc-sectionTitle">{props.title}</h2>
        <div className="tc-hairline" aria-hidden="true" />
      </header>
      <div className="tc-sectionBody">{props.children}</div>
    </section>
  );
}
