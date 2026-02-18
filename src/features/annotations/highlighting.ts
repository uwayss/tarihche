import type { Highlight } from "./types";

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function removeAppliedHighlights(container: HTMLElement) {
  const marks = Array.from(
    container.querySelectorAll("mark[data-highlight-id]"),
  );
  for (const mark of marks) {
    const parent = mark.parentNode;
    if (!parent) continue;

    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }

    parent.removeChild(mark);
    if (parent instanceof HTMLElement) parent.normalize();
  }
}

function getTextNodes(container: HTMLElement): Text[] {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  let next: Node | null;
  while ((next = walker.nextNode())) {
    const text = next as Text;
    if (!text.nodeValue) continue;
    if (!text.nodeValue.trim()) continue;

    nodes.push(text);
  }

  return nodes;
}

export function selectionToOffsets(
  container: HTMLElement,
): { start: number; end: number } | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return null;

  if (!container.contains(range.commonAncestorContainer)) return null;

  const preStart = document.createRange();
  preStart.selectNodeContents(container);
  preStart.setEnd(range.startContainer, range.startOffset);
  const start = preStart.toString().length;

  const preEnd = document.createRange();
  preEnd.selectNodeContents(container);
  preEnd.setEnd(range.endContainer, range.endOffset);
  const end = preEnd.toString().length;

  if (start === end) return null;
  return start < end ? { start, end } : { start: end, end: start };
}

function wrapTextSlice(
  text: Text,
  sliceStart: number,
  sliceEnd: number,
  highlightId: string,
) {
  const original = text.nodeValue ?? "";
  if (sliceStart <= 0 && sliceEnd >= original.length) {
    const mark = document.createElement("mark");
    mark.dataset.highlightId = highlightId;
    const parent = text.parentNode;
    if (!parent) return;

    parent.replaceChild(mark, text);
    mark.appendChild(text);
    return;
  }

  const middle = text.splitText(sliceStart);
  // After splitText, `middle` contains the tail; split again to isolate the middle segment
  const after = middle.splitText(sliceEnd - sliceStart);

  void after;

  const mark = document.createElement("mark");
  mark.dataset.highlightId = highlightId;

  const parent = middle.parentNode;
  if (!parent) return;

  parent.replaceChild(mark, middle);
  mark.appendChild(middle);
}

export function applyHighlights(
  container: HTMLElement,
  highlights: Highlight[],
) {
  removeAppliedHighlights(container);

  const ordered = [...highlights]
    .filter(
      (h) =>
        Number.isFinite(h.start) && Number.isFinite(h.end) && h.end > h.start,
    )
    .sort((a, b) => a.start - b.start);

  for (const h of ordered) {
    const nodes = getTextNodes(container);
    let cursor = 0;

    for (const node of nodes) {
      const value = node.nodeValue ?? "";
      const nodeStart = cursor;
      const nodeEnd = cursor + value.length;

      if (nodeEnd <= h.start) {
        cursor = nodeEnd;
        continue;
      }
      if (nodeStart >= h.end) break;

      const sliceStart = Math.max(0, h.start - nodeStart);
      const sliceEnd = Math.min(value.length, h.end - nodeStart);

      if (sliceEnd > sliceStart) {
        wrapTextSlice(node, sliceStart, sliceEnd, h.id);
      }

      cursor = nodeEnd;
    }
  }
}

export function addHighlight(
  existing: Highlight[],
  start: number,
  end: number,
): Highlight[] {
  const next = [...existing, { id: uid("hl"), start, end }].sort(
    (a, b) => a.start - b.start,
  );

  const merged: Highlight[] = [];
  for (const h of next) {
    const last = merged.at(-1);
    if (!last) {
      merged.push(h);
      continue;
    }

    if (h.start <= last.end + 1) {
      last.end = Math.max(last.end, h.end);
      continue;
    }

    merged.push(h);
  }

  return merged;
}
