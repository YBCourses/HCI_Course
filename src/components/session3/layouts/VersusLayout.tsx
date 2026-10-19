import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { CARD, Icon, MAIN_CLASS, SlideHeading, TakeawayBanner, TONES } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

const HEADER_H = 76;

/**
 * Session 3 layout "versus": two panels, left side visible, right side revealed by the lecturer
 * (slides in row by row, with a gap marker between each pair). Lecturer-run, click only.
 */
export const VersusLayout: React.FC<{ c: Extract<NewKind, { kind: 'versus' }> }> = ({ c }) => {
  const [shown, setShown] = useState(false);
  const lt = TONES[c.leftTone ?? 'neutral'];
  const rt = TONES[c.rightTone ?? 'accent'];

  const body = 'flex-1 min-h-0 flex flex-col gap-3 p-4';

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes vsRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 grid gap-0 items-stretch" style={{ gridTemplateColumns: '1fr 96px 1fr' }}>
        {/* LEFT PANEL */}
        <div className={`${CARD} ${lt.border} flex flex-col min-h-0 overflow-hidden`} style={{ animation: 'vsRise 500ms ease-out both' }}>
          <div className={`flex items-center gap-4 px-6 ${lt.card} border-b ${lt.border} shrink-0`} style={{ height: HEADER_H }}>
            <span className={`w-4 h-4 rounded-full ${lt.dot}`} />
            <span className={`text-[28px] font-bold leading-tight ${lt.title}`}>{c.leftLabel}</span>
          </div>
          <div className={body}>
            {c.rows.map((r, i) => (
              <div
                key={i}
                className={`flex-1 min-h-0 flex items-center gap-4 rounded-2xl border ${lt.border} ${lt.card} px-4 py-2`}
              >
                {r.icon && (
                  <span className={`w-12 h-12 rounded-xl bg-white border ${lt.border} flex items-center justify-center shrink-0 ${lt.text}`}>
                    <Icon name={r.icon} className="w-7 h-7" />
                  </span>
                )}
                <span className="text-[28px] leading-[1.2] text-[#222222] font-medium">{r.left}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GAP COLUMN */}
        <div className="flex flex-col min-h-0 border border-transparent">
          <div className="shrink-0" style={{ height: HEADER_H }} />
          <div className={body}>
            {c.rows.map((_, i) => (
              <div key={i} className="flex-1 min-h-0 flex items-center justify-center relative">
                <div
                  className="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-dashed border-[#E8E2D9] transition-opacity duration-300"
                  style={{ opacity: shown ? 0 : 1 }}
                />
                <div
                  className="relative w-14 h-14 rounded-full bg-[#E5391C] text-white shadow-md flex items-center justify-center transition-all duration-500"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'scale(1)' : 'scale(0.4)',
                    transitionDelay: shown ? `${250 + i * 140}ms` : '0ms',
                  }}
                >
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`${CARD} ${shown ? rt.border : 'border-[#E8E2D9]'} flex flex-col min-h-0 overflow-hidden transition-colors duration-300`} style={{ animation: 'vsRise 500ms ease-out 120ms both' }}>
          <div
            className={`flex items-center justify-between gap-4 px-4 border-b shrink-0 transition-colors duration-300 ${shown ? `${rt.card} ${rt.border}` : 'bg-white border-[#E8E2D9]'}`}
            style={{ height: HEADER_H }}
          >
            {shown ? (
              <div className="flex items-center gap-4 pl-2 min-w-0">
                <span className={`w-4 h-4 rounded-full shrink-0 ${rt.dot}`} />
                <span className={`text-[28px] font-bold leading-tight ${rt.title}`}>{c.rightLabel}</span>
              </div>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => setShown((s) => !s)}
              className={`h-14 px-6 rounded-2xl flex items-center gap-3 text-[26px] font-bold cursor-pointer transition-all duration-300 shrink-0 ${
                shown
                  ? 'bg-white border-2 border-[#E8E2D9] text-[#525254] hover:border-stone-400'
                  : 'bg-[#E5391C] text-white shadow-md hover:brightness-110 w-full justify-center'
              }`}
            >
              {shown ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
              <span className="whitespace-nowrap">{shown ? 'Hide' : `Reveal: ${c.rightLabel}`}</span>
            </button>
          </div>
          <div className={body}>
            {c.rows.map((r, i) => (
              <div key={i} className="flex-1 min-h-0 relative">
                {/* empty slot, visible until revealed */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#E8E2D9] transition-opacity duration-300"
                  style={{ opacity: shown ? 0 : 1 }}
                />
                <div
                  className={`absolute inset-0 flex items-center gap-4 rounded-2xl border ${rt.border} ${rt.card} px-4 py-2 transition-all duration-500`}
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'translateX(0)' : 'translateX(48px)',
                    transitionDelay: shown ? `${i * 140}ms` : '0ms',
                  }}
                  aria-hidden={!shown}
                >
                  {r.icon && (
                    <span className={`w-12 h-12 rounded-xl bg-white border ${rt.border} flex items-center justify-center shrink-0 ${rt.text}`}>
                      <Icon name={r.icon} className="w-7 h-7" />
                    </span>
                  )}
                  <span className="text-[28px] leading-[1.2] text-[#222222] font-medium">{r.right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
    </main>
  );
};
