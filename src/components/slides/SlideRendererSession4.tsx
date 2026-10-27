import React from 'react';
import { SlideData } from '../../types';
import { SLIDES_DATA_SESSION_4, ACTS_METADATA_SESSION_4 } from '../../data/slidesSession4';
import type { Content4 } from '../../data/session4Types';
import type { Content3 } from '../../data/session3Types';
import { MAIN_CLASS, SlideFrame, SlideHeading } from '../session2/primitives';
import { renderContent3 } from './SlideRendererSession3';
import { CUSTOM4 } from '../session4/registry';

interface Props {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer: (seconds: number, label: string) => void;
}

/** Draws one piece of Session 4 content (also used by the dev harness): Session 3's renderer plus Session 4's demos. */
export const renderContent4 = (
  c: Content4,
  frame: { actLabel: string; index: number; total: number },
  onNext: () => void,
): React.ReactNode => {
  if (c.kind !== 'custom') return renderContent3(c as Content3, frame, onNext);
  const Demo = CUSTOM4[c.component];
  return (
    <SlideFrame actLabel={frame.actLabel} index={frame.index} total={frame.total}>
      <main className={MAIN_CLASS}>
        <SlideHeading heading={c.heading} />
        <div className="flex-1 min-h-0 flex flex-col">
          <Demo />
        </div>
      </main>
    </SlideFrame>
  );
};

/** Session 4 renderer (Sessions 1, 2 and 3 renderers are untouched). */
export const SlideRendererSession4: React.FC<Props> = ({ slide, onNextSlide }) => {
  const full = SLIDES_DATA_SESSION_4.find((s) => s.id === slide.id) ?? SLIDES_DATA_SESSION_4[0];
  const act = ACTS_METADATA_SESSION_4.find((a) => a.id === full.act);
  return (
    <>
      {renderContent4(
        full.content,
        { actLabel: act?.title ?? full.actTitle, index: SLIDES_DATA_SESSION_4.indexOf(full) + 1, total: SLIDES_DATA_SESSION_4.length },
        onNextSlide,
      )}
    </>
  );
};
