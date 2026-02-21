import { useEffect, useState } from 'react';

const key = 'tarihche:zoom';

function clamp(value: number) {
  return Math.min(1.6, Math.max(0.7, value));
}

export function useZoom() {
  const [zoom, setZoom] = useState(() => {
    const raw = localStorage.getItem(key);
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) ? clamp(n) : 1;
  });

  useEffect(() => {
    localStorage.setItem(key, String(zoom));
    document.documentElement.style.setProperty('--tc-zoom', String(zoom));
  }, [zoom]);

  const zoomIn = () => setZoom((z) => clamp(Math.round((z + 0.1) * 10) / 10));
  const zoomOut = () => setZoom((z) => clamp(Math.round((z - 0.1) * 10) / 10));
  const reset = () => setZoom(1);

  return { zoom, setZoom, zoomIn, zoomOut, reset };
}
