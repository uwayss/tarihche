import type { ReactNode } from 'react';
import type { AnnotationMode } from '../annotations/types';

function Icon(props: { children: ReactNode }) {
  return (
    <svg
      className="tc-toolIcon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {props.children}
    </svg>
  );
}

function IconPen() {
  return (
    <Icon>
      <path
        d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.1L16.6 5.5a1.5 1.5 0 0 0-2.1 0L4 16v4Zm11.5-13.4 1.9 1.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function IconEraser() {
  return (
    <Icon>
      <path
        d="M7 21h12M4.5 15.5l7.8-7.8a2 2 0 0 1 2.8 0l3 3a2 2 0 0 1 0 2.8l-6 6H8.2L4.5 15.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function IconZoomIn() {
  return (
    <Icon>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.3-4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 7v6M8 10h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function IconZoomOut() {
  return (
    <Icon>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.3-4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 10h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function IconFullscreen() {
  return (
    <Icon>
      <path
        d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function IconReset() {
  return (
    <Icon>
      <path
        d="M20 12a8 8 0 1 1-2.3-5.7M20 4v6h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ToolSidebar(props: {
  mode: AnnotationMode;
  setMode: (mode: AnnotationMode) => void;
  onClear: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleFullscreen: () => void;
}) {
  const btn = (active: boolean) =>
    active ? 'tc-toolBtn tc-toolBtnActive' : 'tc-toolBtn';

  return (
    <div className="tc-toolStack">
      <button
        type="button"
        className={btn(props.mode === 'pen')}
        onClick={() => props.setMode(props.mode === 'pen' ? 'off' : 'pen')}
        aria-label="Kalem"
        title="Kalem"
      >
        <IconPen />
      </button>
      <button
        type="button"
        className={btn(props.mode === 'erase')}
        onClick={() => props.setMode(props.mode === 'erase' ? 'off' : 'erase')}
        aria-label="Silgi"
        title="Silgi"
      >
        <IconEraser />
      </button>

      <div className="tc-toolDivider" role="separator" />

      <button
        type="button"
        className="tc-toolBtn"
        onClick={props.onZoomIn}
        aria-label="Yakınlaştır"
        title="Yakınlaştır"
      >
        <IconZoomIn />
      </button>
      <button
        type="button"
        className="tc-toolBtn"
        onClick={props.onZoomOut}
        aria-label="Uzaklaştır"
        title="Uzaklaştır"
      >
        <IconZoomOut />
      </button>

      <div className="tc-toolDivider" role="separator" />

      <button
        type="button"
        className="tc-toolBtn"
        onClick={props.onToggleFullscreen}
        aria-label="Tam ekran"
        title="Tam ekran"
      >
        <IconFullscreen />
      </button>
      <button
        type="button"
        className="tc-toolBtn"
        onClick={props.onClear}
        aria-label="Temizle"
        title="Temizle"
      >
        <IconReset />
      </button>
    </div>
  );
}
