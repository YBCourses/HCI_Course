import React from 'react';
import type { Custom4Key } from '../../data/session4Types';
import { BakeryCaseDemo } from '../experiments/session4/BakeryCaseDemo';
import { BakeryHumanDemo } from '../experiments/session4/BakeryHumanDemo';
import { BakeryStudyDemo } from '../experiments/session4/BakeryStudyDemo';
import { PersonaBuilderDemo } from '../experiments/session4/PersonaBuilderDemo';
import { BadPersonaDemo } from '../experiments/session4/BadPersonaDemo';
import { GoalsConstraintsDemo } from '../experiments/session4/GoalsConstraintsDemo';
import { EmpathyMapDemo } from '../experiments/session4/EmpathyMapDemo';
import { TaskBreakdownDemo } from '../experiments/session4/TaskBreakdownDemo';
import { ScenarioBranchDemo } from '../experiments/session4/ScenarioBranchDemo';
import { JourneyCurveDemo } from '../experiments/session4/JourneyCurveDemo';
import { NeedOrSolutionDemo } from '../experiments/session4/NeedOrSolutionDemo';
import { RequirementTesterDemo } from '../experiments/session4/RequirementTesterDemo';
import { TraceabilityDemo } from '../experiments/session4/TraceabilityDemo';
import { PrioritizerDemo } from '../experiments/session4/PrioritizerDemo';
import { ValuePropDemo } from '../experiments/session4/ValuePropDemo';
import { ProcessMapDemo } from '../experiments/session4/ProcessMapDemo';

/** Session 4 live demos. Each fills the content box (1824 x ~671 px) and is run by the lecturer. */
export const CUSTOM4: Record<Custom4Key, React.ComponentType> = {
  BakeryCaseDemo,
  BakeryHumanDemo,
  BakeryStudyDemo,
  ProcessMapBridge: () => <ProcessMapDemo here="user" />,
  ProcessMapEnd: () => <ProcessMapDemo here="need" />,
  PersonaBuilderDemo,
  BadPersonaDemo,
  GoalsConstraintsDemo,
  EmpathyMapDemo,
  TaskBreakdownDemo,
  ScenarioBranchDemo,
  JourneyCurveDemo,
  NeedOrSolutionDemo,
  RequirementTesterDemo,
  TraceabilityDemo,
  PrioritizerDemo,
  ValuePropDemo,
};
