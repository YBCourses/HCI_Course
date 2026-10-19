import type { SlideData } from '../types';
import type { Content, Heading, IconName, Tone } from './session2Types';

/** Names of the Session 3 live demos (resolved in components/session3/registry.tsx). */
export type Custom3Key =
  | 'TapSongDemo'
  | 'SessionReplayWatch'
  | 'SessionReplayTimeline'
  | 'SayDoGapDemo'
  | 'MethodPickerDemo'
  | 'ObserverCompareDemo'
  | 'SpotTheBiasDemo'
  | 'ThinkAloudTranscriptDemo'
  | 'QuestionRewriterDemo'
  | 'AffinityWallDemo'
  | 'InsightBuilderDemo'
  | 'UsersVsProblemsDemo'
  | 'PriorityMatrixDemo'
  | 'AudienceVarietyDemo'
  | 'AssumptionsDemo'
  | 'RecruitScreenerDemo'
  | 'AudienceProfileDemo';

/**
 * Session 3 slide layouts that Session 2 does not have (see components/session3/layouts/).
 * All are lecturer-run: they reveal on click, nobody in the room is asked to do anything.
 * Budgets (characters) are for the validated typography; stay under them.
 */
export interface JourneyStep {
  icon: IconName;
  /** <= 22 chars */
  title: string;
  /** <= 40 chars, shown on the node */
  short: string;
  /** <= 170 chars, shown in the detail panel when the node is selected */
  detail: string;
}
export interface FlipCard {
  icon: IconName;
  /** the term on the front, <= 22 chars */
  term: string;
  /** <= 70 chars: a hint or question on the front */
  front: string;
  /** <= 150 chars: the explanation on the back */
  back: string;
  /** <= 80 chars: optional example under the explanation */
  example?: string;
}
export interface VersusRow {
  icon?: IconName;
  /** <= 60 chars each */
  left: string;
  right: string;
}
export interface SpotlightPoint {
  icon: IconName;
  /** <= 24 chars */
  lead: string;
  /** <= 70 chars */
  text: string;
}
export interface ChecklistItem {
  icon?: IconName;
  /** <= 26 chars */
  title: string;
  /** <= 90 chars */
  text: string;
}
export interface Tile {
  icon: IconName;
  /** <= 18 chars */
  name: string;
  /** <= 50 chars */
  tells: string;
  /** <= 60 chars */
  when: string;
  /** optional short tag shown on the tile (e.g. "Page 1"), <= 12 chars */
  tag?: string;
}
export interface FactRow {
  /** <= 60 chars: the note as written */
  note: string;
  verdict: 'fact' | 'guess';
  /** <= 90 chars */
  why: string;
}

export type NewKind =
  /** 3-5 numbered steps along a path; clicking a step shows its detail (processes, rules, plans) */
  | { kind: 'journey'; heading: Heading; steps: JourneyStep[]; footer?: string }
  /** 3-4 cards that flip on click (term -> explanation); concepts, types, biases */
  | { kind: 'flipcards'; heading: Heading; cards: FlipCard[]; takeaway?: string }
  /** two sides with a switch (left/right); contrasts like say vs do */
  | { kind: 'versus'; heading: Heading; leftLabel: string; rightLabel: string; leftTone?: Tone; rightTone?: Tone; rows: VersusRow[]; takeaway?: string }
  /** one big statement with up to 3 supporting points; hooks and key ideas */
  | { kind: 'spotlight'; heading: Heading; statement: string; points: SpotlightPoint[]; takeaway?: string }
  /** 3-5 items that tick themselves in one by one on click */
  | { kind: 'checklist'; heading: Heading; items: ChecklistItem[]; footer?: string }
  /** 4-6 clickable tiles (a map of options); methods, report parts */
  | { kind: 'tiles'; heading: Heading; tiles: Tile[]; takeaway?: string }
  /** rows that show FACT or GUESS (and why) when clicked */
  | { kind: 'factcheck'; heading: Heading; rows: FactRow[]; footer?: string };

/**
 * Session 3 reuses the Session 2 layouts (hero, quiz, agenda, narrative, compare, rules, table, divider,
 * teaser, ...). `activity` is drawn by Session 3's own "mission" layout. New kinds above.
 */
export type Content3 =
  | Exclude<Content, { kind: 'custom' }>
  | { kind: 'custom'; heading: Heading; component: Custom3Key }
  | NewKind;

export interface Slide3 extends SlideData {
  content: Content3;
}
