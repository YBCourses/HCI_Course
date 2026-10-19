import React from 'react';
import { SlideData } from '../../types';
import { SLIDES_DATA_SESSION_3, ACTS_METADATA_SESSION_3 } from '../../data/slidesSession3';
import type { Content3 } from '../../data/session3Types';
import { MAIN_CLASS, SlideFrame, SlideHeading } from '../session2/primitives';
import {
  AgendaLayout, BarsLayout, CompareLayout, FlowLayout, FormulaLayout, HeroLayout,
  NarrativeLayout, QuizLayout, RulesLayout, StatsLayout, TableLayout, TakeawayLayout, TracksLayout,
  DividerLayout, ProjectsLayout, AuditLayout, TeaserLayout,
} from '../session2/layouts';
import { CUSTOM3 } from '../session3/registry';
import { MissionLayout } from '../session3/layouts/MissionLayout';
import { FactCheckLayout } from '../session3/layouts/FactCheckLayout';
import { JourneyLayout } from '../session3/layouts/JourneyLayout';
import { ChecklistLayout } from '../session3/layouts/ChecklistLayout';
import { FlipCardsLayout } from '../session3/layouts/FlipCardsLayout';
import { TilesLayout } from '../session3/layouts/TilesLayout';
import { VersusLayout } from '../session3/layouts/VersusLayout';
import { SpotlightLayout } from '../session3/layouts/SpotlightLayout';

interface Props {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer: (seconds: number, label: string) => void;
}

/** Draws one piece of Session 3 content inside the standard slide frame (also used by the dev harness). */
export const renderContent3 = (
  c: Content3,
  frame: { actLabel: string; index: number; total: number },
  onNext: () => void,
): React.ReactNode => {
  if (c.kind === 'hero') return <HeroLayout c={c} onNext={onNext} />;
  if (c.kind === 'teaser') return <TeaserLayout c={c} index={frame.index} total={frame.total} />;

  const body = (() => {
    switch (c.kind) {
      case 'quiz': return <QuizLayout c={c} />;
      case 'agenda': return <AgendaLayout c={c} />;
      case 'narrative': return <NarrativeLayout c={c} />;
      case 'compare': return <CompareLayout c={c} />;
      case 'flow': return <FlowLayout c={c} />;
      case 'stats': return <StatsLayout c={c} />;
      case 'bars': return <BarsLayout c={c} />;
      case 'formula': return <FormulaLayout c={c} />;
      case 'rules': return <RulesLayout c={c} />;
      case 'activity': return <MissionLayout c={c} />;
      case 'table': return <TableLayout c={c} />;
      case 'tracks': return <TracksLayout c={c} />;
      case 'takeaway': return <TakeawayLayout c={c} />;
      case 'divider': return <DividerLayout c={c} />;
      case 'projects': return <ProjectsLayout c={c} />;
      case 'audit': return <AuditLayout c={c} />;
      case 'journey': return <JourneyLayout c={c} />;
      case 'flipcards': return <FlipCardsLayout c={c} />;
      case 'versus': return <VersusLayout c={c} />;
      case 'spotlight': return <SpotlightLayout c={c} />;
      case 'checklist': return <ChecklistLayout c={c} />;
      case 'tiles': return <TilesLayout c={c} />;
      case 'factcheck': return <FactCheckLayout c={c} />;
      case 'custom': {
        const Demo = CUSTOM3[c.component];
        return (
          <main className={MAIN_CLASS}>
            <SlideHeading heading={c.heading} />
            <div className="flex-1 min-h-0 flex flex-col">
              <Demo />
            </div>
          </main>
        );
      }
    }
  })();

  return (
    <SlideFrame actLabel={frame.actLabel} index={frame.index} total={frame.total}>
      {body}
    </SlideFrame>
  );
};

/**
 * Session 3 renderer: Session 2's validated layouts plus Session 3's own, with Session 3's data and demos.
 * (Session 2's own renderer is untouched.)
 */
export const SlideRendererSession3: React.FC<Props> = ({ slide, onNextSlide }) => {
  const full = SLIDES_DATA_SESSION_3.find((s) => s.id === slide.id) ?? SLIDES_DATA_SESSION_3[0];
  const act = ACTS_METADATA_SESSION_3.find((a) => a.id === full.act);
  return (
    <>
      {renderContent3(
        full.content,
        { actLabel: act?.title ?? full.actTitle, index: SLIDES_DATA_SESSION_3.indexOf(full) + 1, total: SLIDES_DATA_SESSION_3.length },
        onNextSlide,
      )}
    </>
  );
};
