import React, { useState } from 'react';
import { ChevronRight, Eye, RotateCcw } from 'lucide-react';
import { Icon, MAIN_CLASS, SlideHeading, TakeawayBanner } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

const QuoteMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 48" className={className} fill="currentColor" aria-hidden>
    <path d="M0 48V28C0 12 8 3 24 0l3 7C18 10 14 15 14 22h12v26H0zm36 0V28c0-16 8-25 24-28l3 7c-9 3-13 8-13 15h12v26H36z" />
  </svg>
);

const BtnBase =
  'h-16 px-8 rounded-2xl flex items-center justify-center gap-3 text-[28px] font-bold cursor-pointer transition-all duration-300 whitespace-nowrap';

/**
 * Session 3 layout "spotlight": one big statement, up to 3 supporting points that slide in on click.
 * With no points the statement takes the full width, centred, with decorative shapes.
 */
export const SpotlightLayout: React.FC<{ c: Extract<NewKind, { kind: 'spotlight' }> }> = ({ c }) => {
  const [n, setN] = useState(0);
  const total = c.points.length;
  const hasPoints = total > 0;
  const all = n >= total;

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes spRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex gap-10 items-stretch">
        {/* STATEMENT */}
        <div
          className={`relative min-h-0 flex flex-col ${hasPoints ? 'basis-[55%] shrink-0 grow-0' : 'flex-1'}`}
          style={{ animation: 'spRise 600ms ease-out both' }}
        >
          <div
            className={`relative flex-1 min-h-0 rounded-3xl border border-[#E8E2D9] bg-white shadow-xs overflow-hidden flex items-center ${
              hasPoints ? 'px-14 py-6' : 'px-24 py-6 justify-center text-center'
            }`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#E5391C]" />
            {!hasPoints && (
              <>
                <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#FDF5F3] border border-[#FAD6CF]" style={{ animation: 'spFloat 8s ease-in-out infinite' }} />
                <div className="absolute -left-16 -bottom-20 w-64 h-64 rounded-full bg-[#E5391C]/10" style={{ animation: 'spFloat 9s ease-in-out 1s infinite' }} />
                <div className="absolute right-20 bottom-10 w-24 h-24 rounded-2xl rotate-12 border-4 border-[#E5391C]/25" />
              </>
            )}
            <QuoteMark
              className={`absolute text-[#E5391C]/15 ${hasPoints ? 'left-10 top-6 w-28 h-24' : 'left-1/2 -translate-x-1/2 top-6 w-24 h-20'}`}
            />
            <p
              className={`relative font-serif-display font-medium text-[#2D2D2E] text-[58px] leading-[1.15] tracking-tight ${
                hasPoints ? 'pt-14' : 'pt-12'
              }`}
            >
              {c.statement}
            </p>
          </div>

          {hasPoints && (
            <div className="flex items-center gap-4 pt-5 shrink-0">
              <button
                type="button"
                disabled={all}
                onClick={() => setN((v) => Math.min(total, v + 1))}
                className={`${BtnBase} ${all ? 'bg-stone-200 text-stone-400 cursor-default' : 'bg-[#E5391C] text-white shadow-md hover:brightness-110'}`}
              >
                Next
                <ChevronRight className="w-8 h-8" />
                <span className="text-[22px] font-mono font-semibold opacity-80">{n}/{total}</span>
              </button>
              <button
                type="button"
                disabled={all}
                onClick={() => setN(total)}
                className={`${BtnBase} border-2 ${all ? 'border-[#E8E2D9] text-stone-400 bg-white cursor-default' : 'border-[#E5391C]/40 text-[#E5391C] bg-white hover:bg-[#FDF5F3]'}`}
              >
                <Eye className="w-7 h-7" />
                Show all
              </button>
              <button
                type="button"
                onClick={() => setN(0)}
                className={`${BtnBase} border-2 border-[#E8E2D9] text-[#525254] bg-white hover:border-stone-400`}
              >
                <RotateCcw className="w-7 h-7" />
                Hide
              </button>
            </div>
          )}
        </div>

        {/* POINTS */}
        {hasPoints && (
          <div className="flex-1 min-w-0 min-h-0 flex flex-col justify-center gap-4">
            {c.points.map((p, i) => {
              const on = i < n;
              return (
                <div key={i} className="relative">
                  <div
                    className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#E8E2D9] flex items-center justify-start pl-6 transition-opacity duration-300"
                    style={{ opacity: on ? 0 : 1 }}
                  >
                    <span className="w-12 h-12 rounded-full border-2 border-dashed border-[#E8E2D9]" />
                  </div>
                  <div
                    className="relative rounded-3xl border border-[#FAD6CF] bg-white shadow-sm px-6 py-4 flex items-center gap-5 transition-all duration-500"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateX(0)' : 'translateX(64px)',
                    }}
                    aria-hidden={!on}
                  >
                    <div className="relative shrink-0">
                      <span className="w-16 h-16 rounded-2xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
                        <Icon name={p.icon} className="w-9 h-9" />
                      </span>
                      <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-[#E5391C] text-white text-[16px] font-mono font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[28px] font-bold leading-tight text-[#222222]">{p.lead}</div>
                      <div className="text-[26px] leading-[1.25] text-[#525254] pt-1">{p.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
    </main>
  );
};
