import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Icon, rich, MAIN_CLASS, SlideHeading, TakeawayBanner } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

/**
 * Session 3 layout "journey": 3-5 steps along a horizontal path. The lecturer clicks a node (or Next / Back)
 * to select a step; the detail panel under the path shows that step. The progress line fills as you advance.
 */
export const JourneyLayout: React.FC<{ c: Extract<NewKind, { kind: 'journey' }> }> = ({ c }) => {
  const steps = c.steps;
  const n = steps.length;
  const [sel, setSel] = React.useState(0);
  const last = sel >= n - 1;
  const NODE = 92;
  const inset = 100 / n / 2;
  const fill = n > 1 ? (sel / (n - 1)) * 100 : 0;
  const step = steps[sel];

  const next = () => setSel((s) => (s >= n - 1 ? 0 : s + 1));
  const back = () => setSel((s) => Math.max(0, s - 1));

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes jr-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes jr-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(229,57,28,.28); } 50% { box-shadow: 0 0 0 14px rgba(229,57,28,0); } }
        .jr-in { animation: jr-in .4s ease-out both; }
        .jr-pulse { animation: jr-pulse 2.4s ease-in-out infinite; }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex flex-col gap-5">
        {/* Path */}
        <div className="relative flex-shrink-0 pt-2">
          <div
            className="absolute h-2 rounded-full bg-[#E8E2D9]"
            style={{ left: `${inset}%`, right: `${inset}%`, top: 8 + NODE / 2 - 4 }}
          />
          <div
            className="absolute h-2 rounded-full bg-[#E5391C] transition-all duration-500 ease-out"
            style={{ left: `${inset}%`, width: `${fill * (100 - 2 * inset) / 100}%`, top: 8 + NODE / 2 - 4 }}
          />
          <div className="relative flex">
            {steps.map((s, i) => {
              const done = i < sel;
              const active = i === sel;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSel(i)}
                  className="flex-1 min-w-0 flex flex-col items-center text-center px-2 cursor-pointer group focus:outline-none"
                >
                  <span className="relative">
                    <span
                      className={`flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        active
                          ? 'bg-[#E5391C] border-[#E5391C] text-white scale-110 shadow-lg jr-pulse'
                          : done
                            ? 'bg-[#222222] border-[#222222] text-white'
                            : 'bg-white border-[#E8E2D9] text-[#6E6D70] group-hover:border-[#FAD6CF]'
                      }`}
                      style={{ width: NODE, height: NODE }}
                    >
                      <Icon name={s.icon} className="w-11 h-11" />
                    </span>
                    <span
                      className={`absolute -top-1 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-[18px] font-mono font-bold border-2 transition-colors duration-300 ${
                        active || done ? 'bg-white text-[#E5391C] border-[#E5391C]' : 'bg-[#FAF9F6] text-[#6E6D70] border-[#E8E2D9]'
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <span
                    className={`mt-4 text-[30px] leading-tight font-serif-display font-medium transition-colors duration-300 ${
                      active ? 'text-[#E5391C]' : done ? 'text-[#222222]' : 'text-[#6E6D70]'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className={`mt-1 text-[24px] leading-snug transition-colors duration-300 ${active ? 'text-[#525254]' : 'text-[#6E6D70]'}`}>
                    {s.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-h-0 bg-white border-2 border-[#FAD6CF] rounded-3xl shadow-xs flex items-stretch">
          <div key={sel} className="jr-in flex-1 min-w-0 flex items-center gap-8 px-8 py-4">
            <div className="w-28 h-28 rounded-3xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C] flex-shrink-0">
              <Icon name={step.icon} className="w-16 h-16" />
            </div>
            <div className="min-w-0 space-y-2">
              <div className="text-[18px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">
                Step {sel + 1} of {n} · {step.title}
              </div>
              <p className="text-[34px] leading-snug text-[#222222]">{rich(step.detail)}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 px-8 border-l border-[#E8E2D9] bg-[#FAF9F6] rounded-r-[22px] flex-shrink-0">
            <button
              type="button"
              onClick={next}
              className="min-h-[64px] px-7 rounded-2xl bg-[#E5391C] text-white text-[26px] font-semibold flex items-center justify-center gap-3 shadow-sm hover:bg-[#c92f15] transition-colors cursor-pointer"
            >
              {last ? (
                <>
                  <RotateCcw className="w-7 h-7" /> Start over
                </>
              ) : (
                <>
                  Next step <ArrowRight className="w-7 h-7" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={back}
              disabled={sel === 0}
              className="min-h-[64px] px-7 rounded-2xl bg-white border-2 border-[#E8E2D9] text-[#222222] text-[26px] font-semibold flex items-center justify-center gap-3 hover:border-[#E5391C] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
            >
              <ArrowLeft className="w-7 h-7" /> Back
            </button>
          </div>
        </div>

        {c.footer && <TakeawayBanner>{c.footer}</TakeawayBanner>}
      </div>
    </main>
  );
};
