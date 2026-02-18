# Tarihche

The project is a statically deployed, content-driven educational web application built with a lightweight Vite + React (TS) setup and hosted on Vercel. The primary goal is to transform a traditional linear textbook into a modular, structured, and highly navigable learning experience. Content and presentation are strictly separated: raw educational material is stored in a portable format (MDX or structured data), while rendering logic is handled by a composable component system. This enables long-term maintainability, fast iteration, and consistent layout across all topics.

Content is organized into semantic sections rather than continuous text. Each section is rendered through reusable layout components that accept rich children, allowing the insertion of custom educational elements such as note boxes, timelines, highlighted key terms, cause-effect blocks, media, and interactive widgets. The architecture must allow inline usage of these components inside the content layer so that emphasis, visual hierarchy, and pedagogical enhancements are defined at the content level without tightly coupling text to page layouts.

The platform includes usability features that improve comprehension and classroom practicality: collapsible sections for progressive disclosure, built-in highlighting/pen annotations for live teaching, fast navigation, and a clean reading mode suitable for projection. All functionality must remain client-side and static-host compatible, avoiding a backend unless absolutely necessary. Performance, typography, and clarity take priority over visual complexity.

The content production workflow is AI-assisted. Large language models are used programmatically with a strict prompting pipeline to generate structured, curriculum-aligned summaries that fit the platform’s component schema. The system should make it easy to regenerate or update content without changing the rendering logic.

The end result is not a simple summary, but a reusable, extensible study interface that can function both as a personal learning tool and as a classroom presentation resource.
