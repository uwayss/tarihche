import { MDXProvider } from '@mdx-js/react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { mdxComponents } from '../components/mdx/mdxComponents';
import { getTopicBySlug, getTopicNeighbors } from '../content/catalog';
import { PenLayer } from '../features/annotations/PenLayer';
import {
  loadTopicAnnotations,
  saveTopicAnnotations,
} from '../features/annotations/storage';
import type {
  AnnotationMode,
  TopicAnnotations,
} from '../features/annotations/types';
import { toggleFullscreen } from '../features/reader/fullscreen';
import { ToolSidebar } from '../features/reader/ToolSidebar';
import { useZoom } from '../features/reader/useZoom';
import { ReaderLayout } from '../layout/ReaderLayout';

const lastTopicKey = 'tarihche:lastTopic';

export default function TopicPage() {
  const { slug = '' } = useParams();
  const topic = useMemo(() => getTopicBySlug(slug), [slug]);

  if (!topic) {
    return (
      <div className="tc-missing">
        <p>Konu bulunamadı.</p>
        <Link to="/" className="tc-link">
          Başlangıca dön
        </Link>
      </div>
    );
  }

  return (
    <TopicPageInner
      key={topic.slug}
      topicSlug={topic.slug}
      topicTitle={topic.title}
      load={topic.load}
    />
  );
}

function TopicPageInner(props: {
  topicSlug: string;
  topicTitle: string;
  load: () => Promise<{
    default: ComponentType<{ components?: Record<string, unknown> }>;
  }>;
}) {
  const topic = props;

  const [Mdx, setMdx] = useState<null | ComponentType<{
    components?: Record<string, unknown>;
  }>>(null);

  const articleRef = useRef<HTMLElement | null>(null);
  const contentAreaRef = useRef<HTMLDivElement | null>(null);
  const articleWrapRef = useRef<HTMLDivElement | null>(null);
  const zoomWrapRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<AnnotationMode>('off');
  const [annotations, setAnnotations] = useState<TopicAnnotations>(() =>
    loadTopicAnnotations(topic.topicSlug),
  );

  const { zoom, zoomIn, zoomOut } = useZoom();
  const neighbors = useMemo(
    () => getTopicNeighbors(topic.topicSlug),
    [topic.topicSlug],
  );

  useEffect(() => {
    let cancelled = false;
    topic
      .load()
      .then((mod) => {
        if (cancelled) return;
        setMdx(() => mod.default);
      })
      .catch(() => {
        if (cancelled) return;
        setMdx(() => null);
      });

    return () => {
      cancelled = true;
    };
  }, [topic]);

  useEffect(() => {
    try {
      localStorage.setItem(lastTopicKey, topic.topicSlug);
    } catch {
      // ignore
    }
  }, [topic.topicSlug]);

  useEffect(() => {
    saveTopicAnnotations(topic.topicSlug, annotations);
  }, [topic, annotations]);

  const onToggleFullscreen = async () => {
    try {
      await toggleFullscreen();
    } catch {
      // ignore
    }
  };

  const clear = () => {
    setAnnotations({ strokes: [] });
    setMode('off');
  };

  return (
    <ReaderLayout
      topBar={
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex-none w-48">
            <Link to="/toc" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-slate-900 hover:text-indigo-700 transition-colors font-serif" aria-label="İçindekiler">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-sm flex items-center justify-center text-lg">T</span>
              Tarihche
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center gap-6">
            <Link
              to={neighbors.prev ? `/topic/${neighbors.prev.slug}` : '#'}
              className={`px-4 py-2 rounded-lg font-bold transition-colors font-serif ${
                neighbors.prev
                  ? 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  : 'text-slate-300 cursor-not-allowed'
              }`}
              aria-disabled={!neighbors.prev}
              onClick={(e) => {
                if (!neighbors.prev) e.preventDefault();
              }}
            >
              ← Önceki
            </Link>
            <div className="text-xl font-bold text-slate-800 truncate max-w-md font-serif border-b-2 border-slate-300 pb-1" title={topic.topicTitle}>
              {topic.topicTitle}
            </div>
            <Link
              to={neighbors.next ? `/topic/${neighbors.next.slug}` : '#'}
              className={`px-4 py-2 rounded-lg font-bold transition-colors font-serif ${
                neighbors.next
                  ? 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  : 'text-slate-300 cursor-not-allowed'
              }`}
              aria-disabled={!neighbors.next}
              onClick={(e) => {
                if (!neighbors.next) e.preventDefault();
              }}
            >
              Sonraki →
            </Link>
          </div>
          <div className="flex-none w-48" />
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
        className={`relative w-full h-full overflow-y-auto overflow-x-hidden ${
          mode === 'pen' || mode === 'erase' ? 'select-none' : ''
        }`}
      >
        <div 
          ref={zoomWrapRef} 
          className="relative min-h-full w-full flex justify-center py-16 px-4 sm:px-8 md:px-16 transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoom})` }}
        >
          <div ref={articleWrapRef} className="w-full max-w-4xl bg-[#fffdfa] rounded-sm shadow-xl border border-slate-200 p-12 md:p-20 relative z-0 before:absolute before:inset-0 before:border-[12px] before:border-double before:border-slate-100/50 before:pointer-events-none before:rounded-sm">
            <article ref={articleRef} className="prose prose-slate prose-lg max-w-none">
              <MDXProvider components={mdxComponents}>
                {Mdx ? <Mdx components={mdxComponents} /> : <p className="text-slate-500 italic">Yükleniyor…</p>}
              </MDXProvider>
            </article>
          </div>

          <PenLayer
            containerRef={zoomWrapRef}
            mode={mode}
            zoom={zoom}
            strokes={annotations.strokes}
            setStrokes={(strokes) =>
              setAnnotations((prev) => ({ ...prev, strokes }))
            }
          />
        </div>
      </div>
    </ReaderLayout>
  );
}
