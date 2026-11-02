import type { ActId, ActMeta, SlideType } from '../types';
import type { Content5, Slide5 } from './session5Types';

/** Session 5 acts (minutes: 35 · 45 · 30 · 45 · 30 · 55 = 240). */
export const ACTS_BASE_5: ActMeta[] = [
  { id: 1, title: 'ACT 1 · FROM REQUIREMENTS TO THINGS', subtitle: 'What the interface must hold and do', slidesRange: '', color: '#3b82f6' },
  { id: 2, title: 'ACT 2 · GROUPING WITH CARD SORTING', subtitle: 'How people group things', slidesRange: '', color: '#8b5cf6' },
  { id: 3, title: 'ACT 3 · NAMES AND LABELS', subtitle: 'The words people use and understand', slidesRange: '', color: '#E5391C' },
  { id: 4, title: 'ACT 4 · STRUCTURE AND NAVIGATION', subtitle: 'Levels, paths and finding your way', slidesRange: '', color: '#10b981' },
  { id: 5, title: 'ACT 5 · CHECKING THE STRUCTURE', subtitle: 'Test the map before building on it', slidesRange: '', color: '#d97736' },
  { id: 6, title: 'ACT 6 · STUDIO & HANDOFF', subtitle: 'Build and test your Structure Pack', slidesRange: '', color: '#059669' },
];

const ACT_LABEL = Object.fromEntries(ACTS_BASE_5.map((a) => [a.id, a.title])) as Record<ActId, string>;

export interface Notes {
  /** minutes */
  t: number;
  points: string[];
  script: string;
  tip: string;
}

/** Same helper as Sessions 2 to 4: slides are pure data; ids are assigned from the order in slidesSession5.ts. */
export const slide5 = (act: ActId, type: SlideType, content: Content5, n: Notes): Slide5 => {
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
