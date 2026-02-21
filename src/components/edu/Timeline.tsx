import type { ReactNode } from 'react';

export function Timeline(props: { children: ReactNode }) {
  return <ol className="tc-timeline">{props.children}</ol>;
}

export function TimelineItem(props: { label: string; children: ReactNode }) {
  return (
    <li className="tc-timelineItem">
      <div className="tc-timelineLabel">{props.label}</div>
      <div className="tc-timelineBody">{props.children}</div>
    </li>
  );
}
