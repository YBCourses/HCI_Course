import type { ActMeta } from '../types';
import { ACTS_BASE_5 } from './session5Helpers';
import type { Slide5 } from './session5Types';
import { ACT_1_SLIDES } from './session5/act1';
import { ACT_2_SLIDES } from './session5/act2';
import { ACT_3_SLIDES } from './session5/act3';
import { ACT_4_SLIDES } from './session5/act4';
import { ACT_5_SLIDES } from './session5/act5';
import { ACT_6_SLIDES } from './session5/act6';

/**
 * SESSION 5 — Structure (4 hours = 240 minutes). Plan: course/teacher/session5-plan.md.
 * Cases: course/teacher/session4-case.md + session5-case.md (Fresh Batch bakery).
 * Same data-driven architecture as Sessions 2 to 4. Slide ids are assigned from the order; act ranges are computed.
 */
const RAW_SLIDES: Slide5[] = [...ACT_1_SLIDES, ...ACT_2_SLIDES, ...ACT_3_SLIDES, ...ACT_4_SLIDES, ...ACT_5_SLIDES, ...ACT_6_SLIDES];

export const SLIDES_DATA_SESSION_5: Slide5[] = RAW_SLIDES.map((s, i) => ({ ...s, id: i + 1 }));

export const ACTS_METADATA_SESSION_5: ActMeta[] = ACTS_BASE_5.map((a) => {
  const ids = SLIDES_DATA_SESSION_5.filter((x) => x.act === a.id).map((x) => x.id);
  return { ...a, slidesRange: ids.length ? `Slides ${ids[0]}–${ids[ids.length - 1]}` : '' };
});
