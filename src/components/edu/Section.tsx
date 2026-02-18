import { useEffect, useMemo, type ReactNode } from 'react'
import { useSectionRegistry } from '../../features/sections/SectionRegistry'
import { slugify } from '../../utils/slugify'

export function Section(props: {
  id?: string
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const { registerSection } = useSectionRegistry()

  const sectionId = useMemo(() => {
    return props.id?.trim() ? props.id.trim() : slugify(props.title)
  }, [props.id, props.title])

  useEffect(() => {
    registerSection({ id: sectionId, title: props.title })
  }, [registerSection, sectionId, props.title])

  return (
    <section id={sectionId} data-section-id={sectionId} className="tc-section">
      <details className="tc-sectionDetails" open={props.defaultOpen}>
        <summary className="tc-sectionSummary">{props.title}</summary>
        <div className="tc-sectionBody">{props.children}</div>
      </details>
    </section>
  )
}
