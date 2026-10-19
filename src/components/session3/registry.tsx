import React from 'react';
import type { Custom3Key } from '../../data/session3Types';
import { TapSongDemo } from '../experiments/session3/TapSongDemo';
import { SessionReplay } from '../experiments/session3/SessionReplay';
import { SayDoGapDemo } from '../experiments/session3/SayDoGapDemo';
import { MethodPickerDemo } from '../experiments/session3/MethodPickerDemo';
import { ObserverCompareDemo } from '../experiments/session3/ObserverCompareDemo';
import { SpotTheBiasDemo } from '../experiments/session3/SpotTheBiasDemo';
import { ThinkAloudTranscriptDemo } from '../experiments/session3/ThinkAloudTranscriptDemo';
import { QuestionRewriterDemo } from '../experiments/session3/QuestionRewriterDemo';
import { AffinityWallDemo } from '../experiments/session3/AffinityWallDemo';
import { InsightBuilderDemo } from '../experiments/session3/InsightBuilderDemo';
import { UsersVsProblemsDemo } from '../experiments/session3/UsersVsProblemsDemo';
import { PriorityMatrixDemo } from '../experiments/session3/PriorityMatrixDemo';
import { AudienceVarietyDemo } from '../experiments/session3/AudienceVarietyDemo';
import { AssumptionsDemo } from '../experiments/session3/AssumptionsDemo';
import { RecruitScreenerDemo } from '../experiments/session3/RecruitScreenerDemo';
import { AudienceProfileDemo } from '../experiments/session3/AudienceProfileDemo';

/** Session 3 live demos. Each fills the content box (1824 x ~671 px) and is run by the lecturer. */
export const CUSTOM3: Record<Custom3Key, React.ComponentType> = {
  TapSongDemo,
  SessionReplayWatch: () => <SessionReplay mode="watch" />,
  SessionReplayTimeline: () => <SessionReplay mode="timeline" />,
  SayDoGapDemo,
  MethodPickerDemo,
  ObserverCompareDemo,
  SpotTheBiasDemo,
  ThinkAloudTranscriptDemo,
  QuestionRewriterDemo,
  AffinityWallDemo,
  InsightBuilderDemo,
  UsersVsProblemsDemo,
  PriorityMatrixDemo,
  AudienceVarietyDemo,
  AssumptionsDemo,
  RecruitScreenerDemo,
  AudienceProfileDemo,
};
