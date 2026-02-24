import React, { type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function tryExtractPlainText(node: ReactNode): string | null {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);

  if (Array.isArray(node)) {
    const parts: string[] = [];
    for (const child of node) {
      const part = tryExtractPlainText(child);
      if (part == null) return null;
      parts.push(part);
    }
    return parts.join('\n');
  }

  if (React.isValidElement(node) && node.type === React.Fragment) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    return tryExtractPlainText(element.props.children);
  }

  return null;
}

function MarkdownOrNode(props: { content: ReactNode }) {
  const extracted = tryExtractPlainText(props.content);
  if (extracted == null) return <>{props.content}</>;

  let markdown = extracted.replace(/\r\n?/g, '\n').trim();
  if (!markdown) return null;

  if (/^[-*]\s+/.test(markdown)) {
    markdown = markdown.replace(/([.!?:;)])\s+-\s+/g, '$1\n- ');
  }

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
}

export function CauseEffect(props: {
  causeTitle?: string;
  effectTitle?: string;
  cause: ReactNode;
  effect: ReactNode;
}) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-col bg-white rounded-xl p-5 border-t-4 border-[var(--color-semantic-conflict)] shadow-sm">
        <div className="text-[var(--color-semantic-conflict)] font-bold text-lg uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {props.causeTitle ?? 'Neden'}
        </div>
        <div className="prose prose-slate max-w-none">
          <MarkdownOrNode content={props.cause} />
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-xl p-5 border-t-4 border-[var(--color-semantic-economy)] shadow-sm relative">
        <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center text-slate-400">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
        <div className="text-[var(--color-semantic-economy)] font-bold text-lg uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {props.effectTitle ?? 'Sonuç'}
        </div>
        <div className="prose prose-slate max-w-none">
          <MarkdownOrNode content={props.effect} />
        </div>
      </div>
    </div>
  );
}
