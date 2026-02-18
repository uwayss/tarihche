import { MDXProvider } from '@mdx-js/react'
import { useEffect, useMemo, useRef, useState, type ComponentType, type MouseEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mdxComponents } from '../components/mdx/mdxComponents'
import { getTopicBySlug, getUnitsWithTopics } from '../content/catalog'
import { AnnotationToolbar } from '../features/annotations/AnnotationToolbar'
import { addHighlight, applyHighlights, selectionToOffsets } from '../features/annotations/highlighting'
import { PenLayer } from '../features/annotations/PenLayer'
import { loadTopicAnnotations, saveTopicAnnotations } from '../features/annotations/storage'
import type { AnnotationMode, TopicAnnotations } from '../features/annotations/types'
import { SectionRegistryProvider, useSectionRegistry } from '../features/sections/SectionRegistry'
import { Shell } from '../layout/Shell'

function SectionsNav(props: { activeId: string | null }) {
  const { sections } = useSectionRegistry()

  return (
    <nav className="tc-sectionsNav">
      <div className="tc-sectionsTitle">Sections</div>
      <ul className="tc-sectionsList">
        {sections.map((s) => (
          <li key={s.id} className={props.activeId === s.id ? 'tc-sectionsItem tc-sectionsItemActive' : 'tc-sectionsItem'}>
            <a className="tc-link" href={`#${s.id}`}>
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function LeftNav(props: { currentSlug: string }) {
  const units = getUnitsWithTopics()

  return (
    <nav className="tc-leftNav">
      <div className="tc-leftHeader">
        <Link to="/" className="tc-link">
          Tarihche
        </Link>
      </div>
      {units.map((u) => (
        <section key={u.id} className="tc-leftUnit">
          <div className="tc-leftUnitTitle">{u.title}</div>
          <ul className="tc-leftTopicList">
            {u.topics.map((t) => (
              <li key={t.slug}>
                <Link
                  to={`/topic/${t.slug}`}
                  className={t.slug === props.currentSlug ? 'tc-leftTopic tc-leftTopicActive' : 'tc-leftTopic'}
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  )
}

export default function TopicPage() {
  const { slug = '' } = useParams()
  const topic = useMemo(() => getTopicBySlug(slug), [slug])

  if (!topic) {
    return (
      <div className="tc-missing">
        <p>Topic not found.</p>
        <Link to="/" className="tc-link">
          Go home
        </Link>
      </div>
    )
  }

  return <TopicPageInner key={topic.slug} topicSlug={topic.slug} topicTitle={topic.title} load={topic.load} />
}

function TopicPageInner(props: {
  topicSlug: string
  topicTitle: string
  load: () => Promise<{ default: ComponentType<{ components?: Record<string, unknown> }> }>
}) {
  const topic = props

  const [Mdx, setMdx] = useState<null | ComponentType<{ components?: Record<string, unknown> }>>(null)
  const [readingMode, setReadingMode] = useState(false)

  const articleRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const articleWrapRef = useRef<HTMLDivElement | null>(null)

  const [mode, setMode] = useState<AnnotationMode>('off')
  const [annotations, setAnnotations] = useState<TopicAnnotations>(() => loadTopicAnnotations(topic.topicSlug))

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    topic
      .load()
      .then((mod) => {
        if (cancelled) return
        setMdx(() => mod.default)
      })
      .catch(() => {
        if (cancelled) return
        setMdx(() => null)
      })

    return () => {
      cancelled = true
    }
  }, [topic])

  useEffect(() => {
    saveTopicAnnotations(topic.topicSlug, annotations)
  }, [topic, annotations])

  useEffect(() => {
    const el = articleRef.current
    if (!el) return
    applyHighlights(el, annotations.highlights)
  }, [annotations.highlights, Mdx])

  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    const sectionEls = Array.from(root.querySelectorAll<HTMLElement>('[data-section-id]'))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return

        visible.sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))
        const first = visible[0].target as HTMLElement
        const id = first.dataset.sectionId
        if (id) setActiveSectionId(id)
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] },
    )

    for (const el of sectionEls) observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [Mdx])

  const onMouseUp = () => {
    if (mode !== 'highlight') return
    const container = articleRef.current
    if (!container) return

    const offsets = selectionToOffsets(container)
    if (!offsets) return

    setAnnotations((prev) => ({
      ...prev,
      highlights: addHighlight(prev.highlights, offsets.start, offsets.end),
    }))

    window.getSelection()?.removeAllRanges()
  }

  const onClickCapture = (event: MouseEvent) => {
    if (mode !== 'erase') return

    const container = articleRef.current
    if (!container) return

    const target = event.target as HTMLElement | null
    const mark = target?.closest('mark[data-highlight-id]') as HTMLElement | null
    if (!mark?.dataset.highlightId) return

    const id = mark.dataset.highlightId
    setAnnotations((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((h) => h.id !== id),
    }))
  }

  const clear = () => {
    setAnnotations({ highlights: [], strokes: [] })
    setMode('off')
  }

  return (
    <SectionRegistryProvider>
      <Shell
        left={<LeftNav currentSlug={topic.topicSlug} />}
        right={<SectionsNav activeId={activeSectionId} />}
        readingMode={readingMode}
      >
        <div className="tc-topicHeader">
          <h1 className="tc-topicTitle">{topic.topicTitle}</h1>
          <div className="tc-topicControls">
            <button
              type="button"
              className={readingMode ? 'tc-btn tc-btnActive' : 'tc-btn'}
              onClick={() => setReadingMode((v) => !v)}
            >
              Reading mode
            </button>
          </div>
        </div>

        <AnnotationToolbar mode={mode} setMode={setMode} onClear={clear} />

        <div
          ref={contentRef}
          className={mode === 'pen' || mode === 'erase' ? 'tc-content tc-contentAnnotating' : 'tc-content'}
        >
          <div ref={articleWrapRef} className="tc-articleWrap">
            <article
              ref={articleRef}
              className="tc-article"
              onMouseUp={onMouseUp}
              onClickCapture={onClickCapture}
            >
              <MDXProvider components={mdxComponents}>
                {Mdx ? <Mdx components={mdxComponents} /> : <p>Loading…</p>}
              </MDXProvider>
            </article>
            <PenLayer
              containerRef={articleWrapRef}
              mode={mode}
              strokes={annotations.strokes}
              setStrokes={(strokes) => setAnnotations((prev) => ({ ...prev, strokes }))}
            />
          </div>
        </div>
      </Shell>
    </SectionRegistryProvider>
  )
}
