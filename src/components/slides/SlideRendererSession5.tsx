import React from 'react';
import { SlideData } from '../../types';
import { SLIDES_DATA_SESSION_5, ACTS_METADATA_SESSION_5 } from '../../data/slidesSession5';
import type { Content5 } from '../../data/session5Types';
import type { Content3 } from '../../data/session3Types';
import { MAIN_CLASS, SlideFrame, SlideHeading } from '../session2/primitives';
import { renderContent3 } from './SlideRendererSession3';
import { CUSTOM5 } from '../session5/registry';

interface Props {
  slide: SlideData;
  onNextSlide: () => void;
  onOpenTimer: (seconds: number, label: string) => void;
}

/** Draws one piece of Session 5 content (also used by the dev harness): Session 3's renderer plus Session 5's demos. */
export const renderContent5 = (
  c: Content5,
  frame: { actLabel: string; index: number; total: number },
  onNext: () => void,
): React.ReactNode => {
  if (c.kind !== 'custom') return renderContent3(c as Content3, frame, onNext);
  const Demo = CUSTOM5[c.component];
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

/** Session 5 renderer (earlier sessions' renderers are untouched). */
export const SlideRendererSession5: React.FC<Props> = ({ slide, onNextSlide }) => {
  const full = SLIDES_DATA_SESSION_5.find((s) => s.id === slide.id) ?? SLIDES_DATA_SESSION_5[0];
  const act = ACTS_METADATA_SESSION_5.find((a) => a.id === full.act);
  return (
    <>
      {renderContent5(
        full.content,
        { actLabel: act?.title ?? full.actTitle, index: SLIDES_DATA_SESSION_5.indexOf(full) + 1, total: SLIDES_DATA_SESSION_5.length },
        onNextSlide,
      )}
    </>
  );
};
