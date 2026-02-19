import { MDXProvider } from '@mdx-js/react'
import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { mdxComponents } from '../components/mdx/mdxComponents'
import { getTopicBySlug, getTopicNeighbors } from '../content/catalog'
import { PenLayer } from '../features/annotations/PenLayer'
import { loadTopicAnnotations, saveTopicAnnotations } from '../features/annotations/storage'
import type { AnnotationMode, TopicAnnotations } from '../features/annotations/types'
import { toggleFullscreen } from '../features/reader/fullscreen'
import { ToolSidebar } from '../features/reader/ToolSidebar'
import { useZoom } from '../features/reader/useZoom'
import { ReaderLayout } from '../layout/ReaderLayout'

const lastTopicKey = 'tarihche:lastTopic'

export default function TopicPage() {
  const { slug = '' } = useParams()
  const topic = useMemo(() => getTopicBySlug(slug), [slug])

  if (!topic) {
    return (
      <div className="tc-missing">
        <p>Konu bulunamadı.</p>
        <Link to="/" className="tc-link">
          Başlangıca dön
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

  const articleRef = useRef<HTMLElement | null>(null)
  const contentAreaRef = useRef<HTMLDivElement | null>(null)
  const articleWrapRef = useRef<HTMLDivElement | null>(null)
  const zoomWrapRef = useRef<HTMLDivElement | null>(null)

  const [mode, setMode] = useState<AnnotationMode>('off')
  const [annotations, setAnnotations] = useState<TopicAnnotations>(() => loadTopicAnnotations(topic.topicSlug))

  const { zoom, zoomIn, zoomOut } = useZoom()
  const neighbors = useMemo(() => getTopicNeighbors(topic.topicSlug), [topic.topicSlug])

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
    try {
      localStorage.setItem(lastTopicKey, topic.topicSlug)
    } catch {
      // ignore
    }
  }, [topic.topicSlug])

  useEffect(() => {
    saveTopicAnnotations(topic.topicSlug, annotations)
  }, [topic, annotations])

  const onToggleFullscreen = async () => {
    try {
      await toggleFullscreen()
    } catch {
      // ignore
    }
  }

  const clear = () => {
    setAnnotations({ strokes: [] })
    setMode('off')
  }

  return (
    <ReaderLayout
      topBar={
        <div className="tc-topbarInner">
          <div className="tc-topbarLeft">
            <Link to="/toc" className="tc-topbarBrand" aria-label="İçindekiler">
              Tarihche
            </Link>
          </div>
          <div className="tc-topbarCenter">
            <Link
              to={neighbors.prev ? `/topic/${neighbors.prev.slug}` : '#'}
              className={neighbors.prev ? 'tc-topbarNavBtn' : 'tc-topbarNavBtn tc-topbarNavBtnDisabled'}
              aria-disabled={!neighbors.prev}
              onClick={(e) => {
                if (!neighbors.prev) e.preventDefault()
              }}
            >
              Önceki
            </Link>
            <div className="tc-topbarTitle" title={topic.topicTitle}>
              {topic.topicTitle}
            </div>
            <Link
              to={neighbors.next ? `/topic/${neighbors.next.slug}` : '#'}
              className={neighbors.next ? 'tc-topbarNavBtn' : 'tc-topbarNavBtn tc-topbarNavBtnDisabled'}
              aria-disabled={!neighbors.next}
              onClick={(e) => {
                if (!neighbors.next) e.preventDefault()
              }}
            >
              Sonraki
            </Link>
          </div>
          <div className="tc-topbarRight" />
        </div>
      }
      toolBar={
        <ToolSidebar
          mode={mode}
          setMode={setMode}
          onClear={clear}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onToggleFullscreen={onToggleFullscreen}
        />
      }
    >
      <div
        ref={contentAreaRef}
        className={mode === 'pen' || mode === 'erase' ? 'tc-content tc-contentAnnotating' : 'tc-content'}
      >
        <div ref={zoomWrapRef} className="tc-zoomWrap">
          <div ref={articleWrapRef} className="tc-articleWrap">
            <article ref={articleRef} className="tc-article">
              <MDXProvider components={mdxComponents}>
                {Mdx ? <Mdx components={mdxComponents} /> : <p>Yükleniyor…</p>}
              </MDXProvider>
            </article>
          </div>

          <PenLayer
            containerRef={zoomWrapRef}
            mode={mode}
            zoom={zoom}
            strokes={annotations.strokes}
            setStrokes={(strokes) => setAnnotations((prev) => ({ ...prev, strokes }))}
          />
        </div>
      </div>
    </ReaderLayout>
  )
}
