import type { TopicAnnotations } from './types';

function storageKey(topicSlug: string) {
  return `tarihche:annotations:${topicSlug}`;
}

export function loadTopicAnnotations(topicSlug: string): TopicAnnotations {
  const raw = localStorage.getItem(storageKey(topicSlug));
  if (!raw) {
    return { strokes: [] };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') {
      return { strokes: [] };
    }

    const obj = parsed as Partial<TopicAnnotations>;
    return {
      strokes: Array.isArray(obj.strokes)
        ? (obj.strokes as TopicAnnotations['strokes'])
        : [],
    };
  } catch {
    return { strokes: [] };
  }
}

export function saveTopicAnnotations(topicSlug: string, doc: TopicAnnotations) {
  localStorage.setItem(storageKey(topicSlug), JSON.stringify(doc));
}
