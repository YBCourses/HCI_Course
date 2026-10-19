import React from 'react';
import { CheckCircle2, Eye, HelpCircle, MousePointerClick, RotateCcw, StickyNote } from 'lucide-react';
import { MAIN_CLASS, SlideHeading, TakeawayBanner } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

/** Session 3 layout "factcheck": notes that flip on click to a FACT / GUESS verdict and the reason. */
export const FactCheckLayout: React.FC<{ c: Extract<NewKind, { kind: 'factcheck' }> }> = ({ c }) => {
  const [open, setOpen] = React.useState<boolean[]>(() => c.rows.map(() => false));
  const n = c.rows.length;
  const count = open.filter(Boolean).length;
  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes factUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .fact-in { animation: factUp 450ms ease-out both; }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <div className="flex-shrink-0 flex items-center gap-5">
          <div className="flex items-center gap-3">
            {c.rows.map((_, i) => (
              <span
                key={i}
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  open[i] ? (c.rows[i].verdict === 'fact' ? 'bg-emerald-600' : 'bg-amber-600') : 'bg-[#E8E2D9]'
                }`}
              />
            ))}
          </div>
          <span className="text-[28px] font-bold text-[#222222]">
            {count} of {n} checked
          </span>
          <span className="text-[22px] text-[#6E6D70] flex items-center gap-2">
            <MousePointerClick className="w-6 h-6" />
            Click a note to check it
          </span>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setOpen(c.rows.map(() => true))}
              className="h-14 px-6 rounded-xl text-[24px] font-bold bg-[#E5391C] hover:bg-[#C92B10] text-white shadow-sm flex items-center gap-3 cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-6 h-6" />
              Reveal all
            </button>
            <button
              onClick={() => setOpen(c.rows.map(() => false))}
              className="h-14 px-6 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border-2 border-[#E8E2D9] flex items-center gap-3 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-6 h-6" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {c.rows.map((r, i) => {
            const fact = r.verdict === 'fact';
            const isOpen = open[i];
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="fact-in flex-1 min-h-0 cursor-pointer text-left"
                style={{ perspective: '1600px', animationDelay: `${i * 90}ms` }}
                aria-pressed={isOpen}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500 ease-in-out"
                  style={{ transformStyle: 'preserve-3d', transform: isOpen ? 'rotateX(180deg)' : 'none' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-white border-2 border-[#E8E2D9] rounded-2xl shadow-sm flex items-center gap-5 px-6"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E8E2D9] text-[#525254] flex items-center justify-center shrink-0">
                      <StickyNote className="w-7 h-7" />
                    </span>
                    <span className="text-[30px] leading-tight font-serif-display text-[#222222] min-w-0 flex-1 truncate">
                      “{r.note}”
                    </span>
                    <span className="text-[22px] font-mono text-[#6E6D70] flex items-center gap-2 shrink-0">
                      <HelpCircle className="w-6 h-6" />
                      Fact or guess?
                    </span>
                  </div>
                  {/* Back */}
                  <div
                    className={`absolute inset-0 border-2 rounded-2xl shadow-sm flex items-center gap-6 px-6 ${
                      fact ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                    }`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                  >
                    <span
                      className={`h-12 w-[170px] rounded-full text-white flex items-center justify-center gap-2 shrink-0 text-[28px] font-bold tracking-wide ${
                        fact ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                    >
                      {fact ? <CheckCircle2 className="w-7 h-7" /> : <HelpCircle className="w-7 h-7" />}
                      {fact ? 'FACT' : 'GUESS'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[22px] leading-tight text-[#6E6D70] truncate">“{r.note}”</div>
                      <div className="text-[26px] leading-tight text-[#222222] font-medium truncate">{r.why}</div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {c.footer && <TakeawayBanner>{c.footer}</TakeawayBanner>}
      </div>
    </main>
  );
};
