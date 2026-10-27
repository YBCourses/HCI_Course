import type { SlideData } from '../types';
import type { Heading } from './session2Types';
import type { Content3 } from './session3Types';

/** Names of the Session 4 live demos (resolved in components/session4/registry.tsx). */
export type Custom4Key =
  | 'BakeryCaseDemo'
  | 'BakeryHumanDemo'
  | 'BakeryStudyDemo'
  | 'ProcessMapBridge'
  | 'ProcessMapEnd'
  | 'PersonaBuilderDemo'
  | 'BadPersonaDemo'
  | 'GoalsConstraintsDemo'
  | 'EmpathyMapDemo'
  | 'TaskBreakdownDemo'
  | 'ScenarioBranchDemo'
  | 'JourneyCurveDemo'
  | 'NeedOrSolutionDemo'
  | 'RequirementTesterDemo'
  | 'TraceabilityDemo'
  | 'PrioritizerDemo'
  | 'ValuePropDemo';

/** Session 4 uses every Session 2/3 layout; only its custom demos have their own keys. */
export type Content4 = Exclude<Content3, { kind: 'custom' }> | { kind: 'custom'; heading: Heading; component: Custom4Key };

export interface Slide4 extends SlideData {
  content: Content4;
}
