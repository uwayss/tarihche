export type Highlight = {
  id: string;
  start: number;
  end: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  id: string;
  points: Point[];
  width: number;
};

export type TopicAnnotations = {
  highlights: Highlight[];
  strokes: Stroke[];
};

export type AnnotationMode = "off" | "highlight" | "pen" | "erase";
