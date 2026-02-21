import { useEffect, useMemo, useRef, useState } from 'react';
import type { AnnotationMode, Point, Stroke } from './types';

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function pointsToPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M ${p.x} ${p.y} L ${p.x + 0.01} ${p.y + 0.01}`;
  }

  return points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');
}

function distance(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function PenLayer(props: {
  containerRef: React.RefObject<HTMLElement | null>;
  mode: AnnotationMode;
  zoom?: number;
  strokes: Stroke[];
  setStrokes: (next: Stroke[]) => void;
}) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const drawingStrokeId = useRef<string | null>(null);

  const zoom = props.zoom && Number.isFinite(props.zoom) ? props.zoom : 1;

  const pointerEnabled = props.mode === 'pen' || props.mode === 'erase';

  useEffect(() => {
    const el = props.containerRef.current;
    if (!el) return;

    const update = () => {
      const width = Math.max(1, el.clientWidth);
      const height = Math.max(1, el.clientHeight);
      setSize({ width, height });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [props.containerRef]);

  const paths = useMemo(() => {
    return props.strokes.map((s) => ({
      id: s.id,
      d: pointsToPath(s.points),
      width: s.width,
    }));
  }, [props.strokes]);

  const getPoint = (event: React.PointerEvent<SVGSVGElement>): Point | null => {
    const container = props.containerRef.current;
    if (!container) return null;

    const rect = container.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / zoom,
      y: (event.clientY - rect.top) / zoom,
    };
  };

  const eraseAt = (p: Point) => {
    const threshold = 14 / zoom;
    const hit = props.strokes.find((s) =>
      s.points.some((pt) => distance(pt, p) <= threshold),
    );
    if (!hit) return;
    props.setStrokes(props.strokes.filter((s) => s.id !== hit.id));
  };

  const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!pointerEnabled) return;

    const p = getPoint(event);
    if (!p) return;

    if (props.mode === 'erase') {
      eraseAt(p);
      return;
    }

    const id = uid('st');
    drawingStrokeId.current = id;

    props.setStrokes([...props.strokes, { id, points: [p], width: 3 / zoom }]);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!pointerEnabled) return;

    const p = getPoint(event);
    if (!p) return;

    if (props.mode === 'erase') return;

    const id = drawingStrokeId.current;
    if (!id) return;

    props.setStrokes(
      props.strokes.map((s) =>
        s.id === id ? { ...s, points: [...s.points, p] } : s,
      ),
    );
  };

  const onPointerUp = () => {
    drawingStrokeId.current = null;
  };

  return (
    <svg
      className={`absolute inset-0 w-full h-full z-10 ${
        pointerEnabled ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
      }`}
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={p.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-600 drop-shadow-sm"
        />
      ))}
    </svg>
  );
}
