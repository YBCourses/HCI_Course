import React from 'react';
import type { Custom5Key } from '../../data/session5Types';
import { ContentInventoryDemo } from '../experiments/session5/ContentInventoryDemo';
import { MentalModelDemo } from '../experiments/session5/MentalModelDemo';
import { CardSortDemo } from '../experiments/session5/CardSortDemo';
import { SortResultsDemo } from '../experiments/session5/SortResultsDemo';
import { LabelTestDemo } from '../experiments/session5/LabelTestDemo';
import { HierarchyDemo } from '../experiments/session5/HierarchyDemo';
import { WayfindingDemo } from '../experiments/session5/WayfindingDemo';
import { StructureBuilderDemo } from '../experiments/session5/StructureBuilderDemo';
import { TreeTestDemo } from '../experiments/session5/TreeTestDemo';
import { ProcessMapDemo } from '../experiments/session4/ProcessMapDemo';

/** Session 5 live demos. Each fills the content box (1824 x ~671 px) and is run by the lecturer. */
export const CUSTOM5: Record<Custom5Key, React.ComponentType> = {
  ContentInventoryDemo,
  MentalModelDemo,
  CardSortDemo,
  SortResultsDemo,
  LabelTestDemo,
  HierarchyDemo,
  WayfindingDemo,
  StructureBuilderDemo,
  TreeTestDemo,
  ProcessMapStructure: () => <ProcessMapDemo here="structure" />,
};
