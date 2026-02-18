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
  { id: "getting-started", title: "Getting Started", order: 1 },
  { id: "sample", title: "Sample Content", order: 2 },
];

export const topics: Topic[] = [
  {
    slug: "welcome",
    title: "Welcome to Tarihche",
    unitId: "getting-started",
    order: 1,
    load: () => import("./topics/welcome.mdx"),
  },
  {
    slug: "how-to-use",
    title: "How to Use This Interface",
    unitId: "getting-started",
    order: 2,
    load: () => import("./topics/how-to-use.mdx"),
  },
  {
    slug: "sample-lesson",
    title: "Sample Lesson (Structure Demo)",
    unitId: "sample",
    order: 1,
    load: () => import("./topics/sample-lesson.mdx"),
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getUnitsWithTopics(): Array<Unit & { topics: Topic[] }> {
  const sortedUnits = [...units].sort((a, b) => a.order - b.order);
  const sortedTopics = [...topics].sort((a, b) => a.order - b.order);

  return sortedUnits.map((unit) => ({
    ...unit,
    topics: sortedTopics.filter((t) => t.unitId === unit.id),
  }));
}
