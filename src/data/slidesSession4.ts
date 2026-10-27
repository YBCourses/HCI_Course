import type { ActMeta } from '../types';
import { ACTS_BASE_4 } from './session4Helpers';
import type { Slide4 } from './session4Types';
import { ACT_1_SLIDES } from './session4/act1';
import { ACT_2_SLIDES } from './session4/act2';
import { ACT_3_SLIDES } from './session4/act3';
import { ACT_4_SLIDES } from './session4/act4';
import { ACT_5_SLIDES } from './session4/act5';
import { ACT_6_SLIDES } from './session4/act6';

/**
 * SESSION 4 — The Need (4 hours = 240 minutes: a 30-minute bridge + 210 minutes of requirements).
 * Plan: course/teacher/session4-plan.md. Case: course/teacher/session4-case.md.
 * Same data-driven architecture as Sessions 2 and 3: slides are data, layouts are shared, demos live in
 * components/experiments/session4/. Slide ids are assigned from the order; act ranges are computed.
 */
const RAW_SLIDES: Slide4[] = [...ACT_1_SLIDES, ...ACT_2_SLIDES, ...ACT_3_SLIDES, ...ACT_4_SLIDES, ...ACT_5_SLIDES, ...ACT_6_SLIDES];

export const SLIDES_DATA_SESSION_4: Slide4[] = RAW_SLIDES.map((s, i) => ({ ...s, id: i + 1 }));

export const ACTS_METADATA_SESSION_4: ActMeta[] = ACTS_BASE_4.map((a) => {
  const ids = SLIDES_DATA_SESSION_4.filter((x) => x.act === a.id).map((x) => x.id);
  return { ...a, slidesRange: ids.length ? `Slides ${ids[0]}–${ids[ids.length - 1]}` : '' };
});
