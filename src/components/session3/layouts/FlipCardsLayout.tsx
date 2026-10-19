import React from 'react';
import { RotateCcw, Layers } from 'lucide-react';
import { Icon, MAIN_CLASS, SlideHeading, TakeawayBanner, TONES, rich } from '../../session2/primitives';
import type { NewKind } from '../../../data/session3Types';
import type { Tone } from '../../../data/session2Types';

/** Session 3 layout "flipcards": 3-4 tall cards, each a 3D flip on click (lecturer-run). */
const ORDER: Tone[] = ['accent', 'neutral', 'good', 'warn'];

const SOFT: Record<Tone, { face: string; border: string; badge: string; ring: string }> = {
  accent: { face: 'bg-[#FDF5F3]', border: 'border-[#FAD6CF]', badge: 'bg-[#E5391C] text-white', ring: 'bg-white text-[#E5391C] border-[#FAD6CF]' },
  neutral: { face: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600 text-white', ring: 'bg-white text-blue-700 border-blue-200' },
  good: { face: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-600 text-white', ring: 'bg-white text-emerald-700 border-emerald-200' },
  warn: { face: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-600 text-white', ring: 'bg-white text-amber-700 border-amber-200' },
};

const hidden: React.CSSProperties = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

export const FlipCardsLayout: React.FC<{ c: Extract<NewKind, { kind: 'flipcards' }> }> = ({ c }) => {
  const n = c.cards.length;
  const [flipped, setFlipped] = React.useState<boolean[]>(() => c.cards.map(() => false));
  const count = flipped.filter(Boolean).length;
  const toggle = (i: number) => setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));
  const btn =
    'h-14 px-7 rounded-2xl border-2 text-[22px] font-semibold flex items-center gap-3 transition-all duration-300 active:scale-95 cursor-pointer';

  return (
    <main className={MAIN_CLASS}>
      <style>{`@keyframes fc-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
      <SlideHeading heading={c.heading} />
      <div className="flex items-center justify-between flex-shrink-0 -mb-2">
        <span className="text-[18px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold">
          {count} of {n} flipped
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => setFlipped(c.cards.map(() => true))}
            className={`${btn} bg-white border-[#E5391C] text-[#E5391C] hover:bg-[#FDF5F3]`}
          >
            <Layers className="w-7 h-7" /> Flip all
          </button>
          <button
            onClick={() => setFlipped(c.cards.map(() => false))}
            className={`${btn} bg-white border-[#E8E2D9] text-[#525254] hover:border-[#6E6D70]`}
          >
            <RotateCcw className="w-7 h-7" /> Reset
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {c.cards.map((card, i) => {
          const t = ORDER[i % ORDER.length];
          const s = SOFT[t];
          const tone = TONES[t];
          const on = flipped[i];
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-pressed={on}
              className="flex-1 min-w-0 min-h-0 relative text-left cursor-pointer"
              style={{ perspective: 1600, animation: `fc-rise 600ms ${i * 120}ms both ease-out` }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transformStyle: 'preserve-3d', transform: on ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 bg-white border-2 border-[#E8E2D9] rounded-3xl shadow-md flex flex-col items-center justify-between px-7 py-6 text-center overflow-hidden"
                  style={hidden}
                >
                  <div className={`absolute top-0 left-0 right-0 h-3 ${tone.bar}`} />
                  <span className={`self-start mt-2 w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-mono font-bold ${s.badge}`}>
                    {i + 1}
                  </span>
                  <div className="flex flex-col items-center gap-4 min-h-0">
                    <div className={`w-28 h-28 rounded-full border-2 flex items-center justify-center ${s.face} ${s.border} ${tone.text}`}>
                      <Icon name={card.icon} className="w-16 h-16" />
                    </div>
                    <div className="text-[30px] leading-tight font-serif-display font-medium text-[#2D2D2E]">{card.term}</div>
                    <p className="text-[24px] leading-snug text-[#525254]">{card.front}</p>
                  </div>
                  <span className="text-[16px] font-mono uppercase tracking-widest text-[#6E6D70] font-bold">Click to flip</span>
                </div>

                {/* BACK */}
                <div
                  className={`absolute inset-0 border-2 rounded-3xl shadow-md flex flex-col gap-3 px-7 py-6 overflow-hidden ${s.face} ${s.border}`}
                  style={{ ...hidden, transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${s.ring}`}>
                      <Icon name={card.icon} className="w-7 h-7" />
                    </div>
                    <div className={`text-[30px] leading-tight font-serif-display font-medium ${tone.title}`}>{card.term}</div>
                  </div>
                  <p className="text-[26px] leading-snug text-[#222222]">{rich(card.back)}</p>
                  {card.example && (
                    <div className={`mt-auto rounded-2xl bg-white border px-4 py-3 flex-shrink-0 ${s.border}`}>
                      <div className={`text-[16px] font-mono uppercase tracking-wider font-bold ${tone.text}`}>Example</div>
                      <p className="text-[22px] leading-snug text-[#525254]">{card.example}</p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
    </main>
  );
};
