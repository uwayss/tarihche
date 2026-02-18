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
  strokes: Stroke[];
};

export type AnnotationMode = "off" | "pen" | "erase";
