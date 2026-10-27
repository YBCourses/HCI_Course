import React, { useEffect, useRef, useState } from 'react';
import { Eye, ArrowRight, RotateCcw, Target, Lock, Heart, Footprints, Sparkles } from 'lucide-react';

// AHA: four sentences that all look like "requirements" are really four different kinds of thing:
// a need (what people must be able to do, no solution), a goal (a result someone wants), a constraint (a limit we cannot change)
// and a wish (nice, but no evidence). Only the first three drive design; the wish waits.

type BinKey = 'need' | 'goal' | 'constraint' | 'wish';

const BINS: Record<BinKey, { label: string; hint: string; Icon: React.FC<{ className?: string }>; box: string; head: string; chip: string; text: string }> = {
  need: { label: 'Need', hint: 'what people must be able to do', Icon: Footprints, box: 'border-emerald-300 bg-emerald-50/50', head: 'bg-emerald-600 text-white', chip: 'bg-white border-emerald-400', text: 'text-emerald-700' },
  goal: { label: 'Goal', hint: 'a result someone wants to reach', Icon: Target, box: 'border-blue-300 bg-blue-50/50', head: 'bg-blue-600 text-white', chip: 'bg-white border-blue-400', text: 'text-blue-700' },
  constraint: { label: 'Constraint', hint: 'a limit we must respect', Icon: Lock, box: 'border-amber-300 bg-amber-50/50', head: 'bg-amber-500 text-white', chip: 'bg-white border-amber-400', text: 'text-amber-700' },
  wish: { label: 'Wish', hint: 'nice to have, not needed', Icon: Heart, box: 'border-stone-300 bg-stone-100/60', head: 'bg-stone-500 text-white', chip: 'bg-white border-stone-400', text: 'text-stone-600' },
};
const ORDER: BinKey[] = ['need', 'goal', 'constraint', 'wish'];

const CARDS: { text: string; bin: BinKey; why: string }[] = [
  { text: 'Waste down from 6% to 3%', bin: 'goal', why: 'A business goal: a result with a number the owner wants to reach.' },
  { text: 'See the next batch from 3 metres', bin: 'need', why: 'A need: what people must be able to do, and no solution is named.' },
  { text: 'Budget: about 2,000 euros', bin: 'constraint', why: 'A limit we cannot change. It shapes every choice we make.' },
  { text: 'A nice colourful dashboard', bin: 'wish', why: 'A wish: pleasant to imagine, but no user evidence behind it.' },
  { text: 'Get the right quantity baked on time', bin: 'goal', why: 'A user goal: what the baker is trying to achieve tonight.' },
  { text: 'Learn about a change within a minute', bin: 'need', why: 'A need: the change must reach people fast, however we do it.' },
  { text: 'Dirty hands must not touch shared surfaces', bin: 'constraint', why: 'A constraint: a hygiene rule we have to respect.' },
  { text: 'Charts of last year’s sales', bin: 'wish', why: 'A wish: nobody on the night shift asked for it.' },
  { text: 'Late deliveries from 3 a month to at most 1', bin: 'goal', why: 'A business goal: a target the owner can measure.' },
  { text: 'Know the packing order', bin: 'need', why: 'A need: packers must know which shop goes first.' },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const GoalsConstraintsDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [fly, setFly] = useState<{ dx: number; dy: number } | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const binRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const done = idx >= CARDS.length;
  const card = done ? null : CARDS[idx];

  const reveal = () => {
    if (!card || revealed) return;
    setRevealed(true);
    const root = rootRef.current, c = cardRef.current, b = binRefs.current[card.bin];
    if (root && c && b) {
      const k = root.getBoundingClientRect().width / root.offsetWidth || 1;
      const cr = c.getBoundingClientRect(), br = b.getBoundingClientRect();
      requestAnimationFrame(() =>
        setFly({
          dx: (br.left + br.width / 2 - (cr.left + cr.width / 2)) / k,
          dy: (br.top + 120 - (cr.top + cr.height / 2)) / k,
        }),
      );
    }
    const i = idx;
    timer.current = window.setTimeout(() => setPlaced((p) => [...p, i]), 750);
  };

  const next = () => {
    setFly(null);
    setRevealed(false);
    setIdx((i) => i + 1);
  };

  const reset = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setIdx(0); setRevealed(false); setFly(null); setPlaced([]);
  };

  const landed = revealed && placed.includes(idx);

  return (
    <div ref={rootRef} className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden relative">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={reveal} disabled={done || revealed} className={PRIMARY}>
          <Eye className="w-6 h-6" />
          Reveal bin
        </button>
        <button onClick={next} disabled={done || !landed} className={PRIMARY}>
          <ArrowRight className="w-6 h-6" />
          {idx === CARDS.length - 1 ? 'Finish' : 'Next card'}
        </button>
        <div className="flex-1" />
        <div className="text-[28px] font-bold text-[#222222]">
          {Math.min(placed.length, CARDS.length)} <span className="text-[#6E6D70] font-normal">of {CARDS.length} sorted</span>
        </div>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 flex gap-4">
        {/* left: current card */}
        <div className="w-[500px] flex-shrink-0 flex flex-col gap-3">
          {!done && card && (
            <>
              <div className="text-[24px] text-[#525254]">
                Card {idx + 1} of {CARDS.length}
              </div>
              <div className="h-[200px] flex-shrink-0 relative">
                <div
                  ref={cardRef}
                  className="absolute inset-0 rounded-2xl border-2 border-[#E5391C] bg-white shadow-md px-6 flex items-center text-[34px] font-bold leading-[1.15] text-[#222222]"
                  style={{
                    transition: 'transform 700ms cubic-bezier(.5,0,.3,1), opacity 700ms ease-in',
                    transform: fly ? `translate(${fly.dx}px, ${fly.dy}px) scale(0.45)` : 'none',
                    opacity: fly ? (landed ? 0 : 0.15) : 1,
                    zIndex: 20,
                  }}
                >
                  {card.text}
                </div>
              </div>
              {!revealed ? (
                <div className="rounded-2xl border border-dashed border-[#E8E2D9] bg-[#FAF9F6] px-5 py-4 text-[26px] leading-[1.25] text-[#525254] flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-[#E5391C] flex-shrink-0" />
                  <span>Think in silence: which of the four bins?</span>
                </div>
              ) : (
                <div className={`rounded-2xl border-2 px-5 py-4 bg-white ${BINS[card.bin].box.split(' ')[0]}`}>
                  <div className={`text-[28px] font-bold ${BINS[card.bin].text}`}>{BINS[card.bin].label}</div>
                  <div className="text-[24px] leading-[1.25] text-[#222222]">{card.why}</div>
                </div>
              )}
            </>
          )}
          {done && (
            <div className="rounded-2xl border-2 border-[#E5391C] bg-white px-6 py-5 flex flex-col gap-3">
              <div className="text-[30px] font-bold text-[#E5391C]">Four kinds of sentence</div>
              <div className="text-[26px] leading-[1.3] text-[#222222]">
                Design for the <b className="text-emerald-700">needs</b> and the <b className="text-blue-700">goals</b>, inside the{' '}
                <b className="text-amber-700">constraints</b>. A <b className="text-stone-600">wish</b> waits for evidence.
              </div>
              <div className="text-[22px] text-[#6E6D70]">Numbers and cases are illustrative (&ldquo;in our case&rdquo;).</div>
            </div>
          )}
        </div>

        {/* right: four bins */}
        <div className="flex-1 min-w-0 grid grid-cols-4 gap-3">
          {ORDER.map((k) => {
            const b = BINS[k];
            const items = placed.filter((i) => CARDS[i].bin === k);
            return (
              <div
                key={k}
                ref={(el) => { binRefs.current[k] = el; }}
                className={`min-h-0 rounded-2xl border-2 flex flex-col overflow-hidden ${b.box}`}
              >
                <div className={`flex-shrink-0 px-4 py-3 ${b.head}`}>
                  <div className="flex items-center gap-2 text-[30px] font-bold leading-tight">
                    <b.Icon className="w-7 h-7" />
                    {b.label}
                    <span className="ml-auto text-[28px]">{items.length}</span>
                  </div>
                  <div className="text-[22px] leading-[1.2] opacity-95">{b.hint}</div>
                </div>
                <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
                  {items.map((i) => (
                    <div
                      key={i}
                      className={`rounded-xl border-2 px-3 py-2 text-[22px] font-semibold leading-[1.2] text-[#222222] ${b.chip}`}
                      style={{ animation: 'gcPop 400ms ease-out' }}
                    >
                      {CARDS[i].text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes gcPop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};
