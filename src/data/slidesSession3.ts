import type { ActMeta } from '../types';
import { ACTS_BASE_3 } from './session3Helpers';
import type { Slide3 } from './session3Types';
import { ACT_1_SLIDES } from './session3/act1';
import { ACT_2_SLIDES } from './session3/act2';
import { ACT_3_SLIDES } from './session3/act3';
import { ACT_4_SLIDES } from './session3/act4';
import { ACT_5_SLIDES } from './session3/act5';
import { ACT_6_SLIDES } from './session3/act6';

/**
 * SESSION 3 — The User (4 hours = 240 minutes). Plan: course/teacher/session3-plan.md.
 * Same data-driven architecture as Session 2: slides are data, layouts are shared, demos live in
 * components/experiments/session3/. Slide ids are assigned from the order; act ranges are computed.
 */
const RAW_SLIDES: Slide3[] = [...ACT_1_SLIDES, ...ACT_2_SLIDES, ...ACT_3_SLIDES, ...ACT_4_SLIDES, ...ACT_5_SLIDES, ...ACT_6_SLIDES];

export const SLIDES_DATA_SESSION_3: Slide3[] = RAW_SLIDES.map((s, i) => ({ ...s, id: i + 1 }));

export const ACTS_METADATA_SESSION_3: ActMeta[] = ACTS_BASE_3.map((a) => {
  const ids = SLIDES_DATA_SESSION_3.filter((x) => x.act === a.id).map((x) => x.id);
  return { ...a, slidesRange: ids.length ? `Slides ${ids[0]}–${ids[ids.length - 1]}` : '' };
});
