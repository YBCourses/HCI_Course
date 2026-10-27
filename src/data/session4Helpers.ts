import type { ActId, ActMeta, SlideType } from '../types';
import type { Content4, Slide4 } from './session4Types';

/** Session 4 acts (minutes: 30 bridge · 35 · 35 · 35 · 45 · 60 = 240). */
export const ACTS_BASE_4: ActMeta[] = [
  { id: 1, title: 'ACT 1 · BRIDGE: THE STORY SO FAR', subtitle: 'Fresh Batch: from an idea to a user study', slidesRange: '', color: '#3b82f6' },
  { id: 2, title: 'ACT 2 · FROM EVIDENCE TO PERSONAS', subtitle: 'Turning study notes into people we design for', slidesRange: '', color: '#8b5cf6' },
  { id: 3, title: 'ACT 3 · GOALS, CONSTRAINTS & FEELINGS', subtitle: 'What people want, what limits us, how it feels', slidesRange: '', color: '#E5391C' },
  { id: 4, title: 'ACT 4 · TASKS, SCENARIOS & JOURNEYS', subtitle: 'The story of what people do over time', slidesRange: '', color: '#10b981' },
  { id: 5, title: 'ACT 5 · GOOD REQUIREMENTS', subtitle: 'Say what is needed, not how to build it', slidesRange: '', color: '#d97736' },
  { id: 6, title: 'ACT 6 · PRIORITIES, VALUE & STUDIO', subtitle: 'Choose, measure, and build your Requirements Pack', slidesRange: '', color: '#059669' },
];

const ACT_LABEL = Object.fromEntries(ACTS_BASE_4.map((a) => [a.id, a.title])) as Record<ActId, string>;

export interface Notes {
  /** minutes */
  t: number;
  points: string[];
  script: string;
  tip: string;
}

/** Same helper as Sessions 2 and 3: slides are pure data; ids are assigned from the order in slidesSession4.ts. */
export const slide4 = (act: ActId, type: SlideType, content: Content4, n: Notes): Slide4 => {
  const h =
    'heading' in content
      ? content.heading
      : content.kind === 'hero'
        ? { title: content.title, subtitle: content.subtitle }
        : content.kind === 'divider'
          ? { title: content.title, subtitle: content.question }
          : { title: '', subtitle: '' };
  return {
    id: 0,
    act,
    actTitle: ACT_LABEL[act],
    title: h.title,
    subtitle: h.subtitle,
    type,
    speakerNotes: {
      timingMin: n.t,
      keyPoints: n.points,
      spokenScriptAdvice: n.script,
      classroomFacilitationTip: n.tip,
    },
    content,
  };
};
