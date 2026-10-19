import React from 'react';
import { ListChecks, RotateCcw } from 'lucide-react';
import { Icon, rich, MAIN_CLASS, SlideHeading, TakeawayBanner } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

/**
 * Session 3 layout "checklist": 3-5 items, each muted until the lecturer ticks it (Tick next, Tick all, or
 * clicking an item). Nothing is revealed before the click; Reset puts everything back.
 */
export const ChecklistLayout: React.FC<{ c: Extract<NewKind, { kind: 'checklist' }> }> = ({ c }) => {
  const items = c.items;
  const n = items.length;
  const [ticked, setTicked] = React.useState<boolean[]>(() => items.map(() => false));
  const count = ticked.filter(Boolean).length;
  const all = count === n;

  const tickNext = () => {
    const i = ticked.findIndex((t) => !t);
    if (i >= 0) setTicked(ticked.map((t, k) => (k === i ? true : t)));
  };
  const toggle = (i: number) => setTicked(ticked.map((t, k) => (k === i ? !t : t)));

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes ck-pop { 0% { transform: scale(.85); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
        .ck-pop { animation: ck-pop .4s ease-out both; }
        .ck-path { stroke-dasharray: 30; transition: stroke-dashoffset .45s ease-out .1s; }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {/* Controls + progress */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="flex items-center gap-4 min-w-[210px]">
            <div className="w-12 h-12 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] flex items-center justify-center text-[#E5391C]">
              <ListChecks className="w-7 h-7" />
            </div>
            <span className="text-[28px] font-semibold text-[#222222] whitespace-nowrap">
              {count} of {n}
            </span>
          </div>
          <div className="flex-1 h-4 rounded-full bg-[#E8E2D9] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#E5391C] transition-all duration-500 ease-out"
              style={{ width: `${(count / n) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={tickNext}
            disabled={all}
            className="min-h-[60px] px-7 rounded-2xl bg-[#E5391C] text-white text-[26px] font-semibold shadow-sm hover:bg-[#c92f15] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Tick next
          </button>
          <button
            type="button"
            onClick={() => setTicked(items.map(() => true))}
            disabled={all}
            className="min-h-[60px] px-7 rounded-2xl bg-white border-2 border-[#E8E2D9] text-[#222222] text-[26px] font-semibold hover:border-[#E5391C] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Tick all
          </button>
          <button
            type="button"
            onClick={() => setTicked(items.map(() => false))}
            disabled={count === 0}
            className="min-h-[60px] px-6 rounded-2xl bg-white border-2 border-[#E8E2D9] text-[#525254] text-[26px] font-semibold flex items-center gap-3 hover:border-[#E5391C] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <RotateCcw className="w-6 h-6" /> Reset
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {items.map((it, i) => {
            const on = ticked[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                className={`flex-1 min-h-0 w-full flex items-center gap-6 px-6 rounded-2xl border-2 text-left cursor-pointer transition-all duration-300 ${
                  on ? 'bg-white border-emerald-300 shadow-sm' : 'bg-[#F3F0EA] border-[#E8E2D9] hover:border-[#FAD6CF]'
                }`}
              >
                <span
                  className={`w-14 h-14 rounded-full border-4 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    on ? 'bg-emerald-600 border-emerald-600 ck-pop' : 'bg-white border-[#CFC8BC]'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ck-path" d="M5 12.5l4.5 4.5L19 7.5" style={{ strokeDashoffset: on ? 0 : 30 }} />
                  </svg>
                </span>
                {it.icon && (
                  <span
                    className={`w-14 h-14 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      on ? 'bg-[#FDF5F3] border-[#FAD6CF] text-[#E5391C]' : 'bg-transparent border-[#DDD6CA] text-[#9A978F]'
                    }`}
                  >
                    <Icon name={it.icon} className="w-8 h-8" />
                  </span>
                )}
                <span
                  className={`w-[440px] flex-shrink-0 text-[30px] leading-tight font-serif-display font-medium transition-colors duration-300 ${
                    on ? 'text-[#222222]' : 'text-[#6E6D70]'
                  }`}
                >
                  {it.title}
                </span>
                <span
                  className={`flex-1 min-w-0 text-[26px] leading-snug text-[#525254] transition-all duration-500 ${
                    on ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                  }`}
                >
                  {rich(it.text)}
                </span>
              </button>
            );
          })}
        </div>

        {c.footer && <TakeawayBanner>{c.footer}</TakeawayBanner>}
      </div>
    </main>
  );
};
