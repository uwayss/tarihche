import React from 'react';
import { CauseEffect } from '../edu/CauseEffect';
import { KeyTerm } from '../edu/KeyTerm';
import { Media } from '../edu/Media';
import { NoteBox } from '../edu/NoteBox';
import { Section } from '../edu/Section';
import { Timeline, TimelineItem } from '../edu/Timeline';

export const mdxComponents = {
  Section,
  NoteBox,
  KeyTerm,
  CauseEffect,
  Timeline,
  TimelineItem,
  Media,
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1
      className="text-5xl font-black text-slate-900 mt-12 mb-8 tracking-tight font-serif"
      {...props}
    />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2
      className="text-3xl font-bold text-slate-800 mt-12 mb-6 tracking-tight border-b-2 border-slate-200 pb-3 font-serif"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3
      className="text-2xl font-bold text-slate-800 mt-8 mb-4 font-serif"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p
      className="text-xl leading-relaxed text-slate-800 mb-6 font-serif"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul
      className="list-disc list-outside ml-8 mb-6 text-xl text-slate-800 space-y-3 font-serif"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="list-decimal list-outside ml-8 mb-6 text-xl text-slate-800 space-y-3 font-serif"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className="pl-2" {...props} />,
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-amber-400 bg-amber-50/50 p-6 italic text-slate-700 my-8 text-xl font-serif rounded-r-xl"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-indigo-700 hover:text-indigo-900 underline decoration-indigo-300 underline-offset-4 transition-colors font-semibold"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-bold text-slate-900" {...props} />
  ),
};
