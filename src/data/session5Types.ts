import type { SlideData } from '../types';
import type { Heading } from './session2Types';
import type { Content3 } from './session3Types';

/** Names of the Session 5 live demos (resolved in components/session5/registry.tsx). */
export type Custom5Key =
  | 'ContentInventoryDemo'
  | 'MentalModelDemo'
  | 'CardSortDemo'
  | 'SortResultsDemo'
  | 'LabelTestDemo'
  | 'HierarchyDemo'
  | 'WayfindingDemo'
  | 'StructureBuilderDemo'
  | 'TreeTestDemo'
  | 'ProcessMapStructure';

/** Session 5 uses every Session 2/3 layout; only its custom demos have their own keys. */
export type Content5 = Exclude<Content3, { kind: 'custom' }> | { kind: 'custom'; heading: Heading; component: Custom5Key };

export interface Slide5 extends SlideData {
  content: Content5;
}
