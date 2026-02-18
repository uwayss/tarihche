import type { ComponentType } from "react";

export type TopicModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
};

export type Unit = {
  id: string;
  title: string;
  order: number;
};

export type Topic = {
  slug: string;
  title: string;
  unitId: string;
  order: number;
  load: () => Promise<TopicModule>;
};

export const units: Unit[] = [
  { id: "getting-started", title: "Başlangıç", order: 1 },
  { id: "sample", title: "Örnek İçerik", order: 2 },
];

export const topics: Topic[] = [
  {
    slug: "welcome",
    title: "Tarihche'ye Hoş Geldiniz",
    unitId: "getting-started",
    order: 1,
    load: () => import("./topics/welcome.mdx"),
  },
  {
    slug: "how-to-use",
    title: "Nasıl Kullanılır",
    unitId: "getting-started",
    order: 2,
    load: () => import("./topics/how-to-use.mdx"),
  },
  {
    slug: "sample-lesson",
    title: "Örnek Ders (Yapı Gösterimi)",
    unitId: "sample",
    order: 1,
    load: () => import("./topics/sample-lesson.mdx"),
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getOrderedTopics(): Topic[] {
  const unitOrder = new Map(units.map((u) => [u.id, u.order] as const));
  return [...topics].sort((a, b) => {
    const ua = unitOrder.get(a.unitId) ?? 0;
    const ub = unitOrder.get(b.unitId) ?? 0;
    if (ua !== ub) return ua - ub;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getFirstTopicSlug(): string {
  return getOrderedTopics()[0]?.slug ?? "";
}

export function getTopicNeighbors(slug: string): {
  prev: Topic | null;
  next: Topic | null;
} {
  const ordered = getOrderedTopics();
  const index = ordered.findIndex((t) => t.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}

export function getUnitsWithTopics(): Array<Unit & { topics: Topic[] }> {
  const sortedUnits = [...units].sort((a, b) => a.order - b.order);
  const sortedTopics = [...topics].sort((a, b) => a.order - b.order);

  return sortedUnits.map((unit) => ({
    ...unit,
    topics: sortedTopics.filter((t) => t.unitId === unit.id),
  }));
}
