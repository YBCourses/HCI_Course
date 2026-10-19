import type { ActId, ActMeta, SlideType } from '../types';
import type { Content3, Slide3 } from './session3Types';

/** Session 3 acts (minutes: 30 · 35 · 30 · 65 · 40 · 40 = 240). */
export const ACTS_BASE_3: ActMeta[] = [
  { id: 1, title: 'ACT 1 · WHO IS A USER?', subtitle: 'What a user is, and why you are not one', slidesRange: '', color: '#3b82f6' },
  { id: 2, title: 'ACT 2 · FROM IDEA TO QUESTION', subtitle: 'Assumptions, research questions and methods', slidesRange: '', color: '#8b5cf6' },
  { id: 3, title: 'ACT 3 · FINDING YOUR USERS', subtitle: 'Who to study, how many, and how to ask them', slidesRange: '', color: '#E5391C' },
  { id: 4, title: 'ACT 4 · METHODS IN PRACTICE', subtitle: 'Observe, think aloud and interview', slidesRange: '', color: '#10b981' },
  { id: 5, title: 'ACT 5 · MAKE SENSE', subtitle: 'From a pile of notes to clear insights', slidesRange: '', color: '#d97736' },
  { id: 6, title: 'ACT 6 · STUDIO & HANDOFF', subtitle: 'Prepare your user study', slidesRange: '', color: '#059669' },
];

const ACT_LABEL = Object.fromEntries(ACTS_BASE_3.map((a) => [a.id, a.title])) as Record<ActId, string>;

export interface Notes {
  /** minutes */
  t: number;
  points: string[];
  script: string;
  tip: string;
}

/** Same helper as Session 2: slides are pure data; ids are assigned from the order in slidesSession3.ts. */
export const slide3 = (act: ActId, type: SlideType, content: Content3, n: Notes): Slide3 => {
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
