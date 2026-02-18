import type { TopicAnnotations } from "./types";

function storageKey(topicSlug: string) {
  return `tarihche:annotations:${topicSlug}`;
}

export function loadTopicAnnotations(topicSlug: string): TopicAnnotations {
  const raw = localStorage.getItem(storageKey(topicSlug));
  if (!raw) {
    return { highlights: [], strokes: [] };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return { highlights: [], strokes: [] };
    }

    const obj = parsed as Partial<TopicAnnotations>;
    return {
      highlights: Array.isArray(obj.highlights)
        ? (obj.highlights as TopicAnnotations["highlights"])
        : [],
      strokes: Array.isArray(obj.strokes)
        ? (obj.strokes as TopicAnnotations["strokes"])
        : [],
    };
  } catch {
    return { highlights: [], strokes: [] };
  }
}

export function saveTopicAnnotations(topicSlug: string, doc: TopicAnnotations) {
  localStorage.setItem(storageKey(topicSlug), JSON.stringify(doc));
}
