import React from 'react';
import { Icon, MAIN_CLASS, SlideHeading, TakeawayBanner } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';

/** Session 3 layout "tiles": a row of clickable tiles; the selected one shows a large detail panel. */
export const TilesLayout: React.FC<{ c: Extract<NewKind, { kind: 'tiles' }> }> = ({ c }) => {
  const n = c.tiles.length;
  const [sel, setSel] = React.useState(0);
  const t = c.tiles[Math.min(sel, n - 1)];

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes tl-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes tl-swap{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex gap-4 flex-shrink-0 relative z-10">
          {c.tiles.map((tile, i) => {
            const on = i === sel;
            return (
              <button
                key={i}
                onClick={() => setSel(i)}
                aria-pressed={on}
                className={`flex-1 min-w-0 min-h-[176px] rounded-3xl border-2 px-4 py-5 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all duration-300 ${
                  on
                    ? 'bg-[#FDF5F3] border-[#E5391C] shadow-lg -translate-y-2 ring-4 ring-[#E5391C]/15'
                    : 'bg-white border-[#E8E2D9] shadow-xs hover:border-[#FAD6CF] hover:-translate-y-1'
                }`}
                style={{ animation: `tl-rise 600ms ${i * 90}ms both ease-out` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    on ? 'bg-[#E5391C] text-white' : 'bg-[#FDF5F3] text-[#E5391C] border border-[#FAD6CF]'
                  }`}
                >
                  <Icon name={tile.icon} className="w-9 h-9" />
                </div>
                <div className={`text-[28px] leading-tight font-serif-display font-medium ${on ? 'text-[#E5391C]' : 'text-[#2D2D2E]'}`}>
                  {tile.name}
                </div>
                {tile.tag && (
                  <span
                    className={`text-[16px] font-mono uppercase tracking-wider font-bold px-3 py-0.5 rounded-full border ${
                      on ? 'bg-[#E5391C] text-white border-[#E5391C]' : 'bg-[#FAF9F6] text-[#6E6D70] border-[#E8E2D9]'
                    }`}
                  >
                    {tile.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* detail panel with a notch pointing at the selected tile */}
        <div className="flex-1 min-h-0 relative mt-5">
          <div
            className="absolute -top-3 w-6 h-6 rotate-45 bg-white border-l-2 border-t-2 border-[#E5391C] transition-all duration-300 z-10"
            style={{ left: `calc(${((sel + 0.5) / n) * 100}% - 12px)` }}
          />
          <div className="absolute inset-0 bg-white border-2 border-[#E5391C] rounded-3xl shadow-md overflow-hidden flex">
            <div className="w-3 bg-[#E5391C] flex-shrink-0" />
            <div key={sel} className="flex-1 min-w-0 px-10 py-6 flex flex-col gap-4 justify-center" style={{ animation: 'tl-swap 400ms both ease-out' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FDF5F3] border border-[#FAD6CF] text-[#E5391C] flex items-center justify-center flex-shrink-0">
                  <Icon name={t.icon} className="w-8 h-8" />
                </div>
                <div className="text-[30px] leading-tight font-serif-display font-medium text-[#2D2D2E]">{t.name}</div>
                {t.tag && (
                  <span className="text-[16px] font-mono uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-[#FDF5F3] text-[#E5391C] border border-[#FAD6CF]">
                    {t.tag}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="rounded-2xl bg-[#FDF5F3] border border-[#FAD6CF] px-6 py-4">
                  <div className="text-[16px] font-mono uppercase tracking-wider font-bold text-[#E5391C] mb-1">What it tells you</div>
                  <p className="text-[34px] leading-tight text-[#222222]">{t.tells}</p>
                </div>
                <div className="rounded-2xl bg-[#FAF9F6] border border-[#E8E2D9] px-6 py-4">
                  <div className="text-[16px] font-mono uppercase tracking-wider font-bold text-[#6E6D70] mb-1">Use it when</div>
                  <p className="text-[34px] leading-tight text-[#222222]">{t.when}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
    </main>
  );
};
