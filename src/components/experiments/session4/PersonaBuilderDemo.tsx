import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, RotateCcw, ShieldAlert, User } from 'lucide-react';

/*
 * AHA: a persona is assembled from evidence, line by line. Every line of Hassan's card carries the numbers of the
 * observation notes behind it. Guesses ("likes football") are refused: no evidence, no design decision.
 * Case: Fresh Batch (teacher/session4-case.md): notes 1-12, persona Hassan.
 */

type SlotId = 'goal' | 'context' | 'behaviour' | 'pain' | 'quote';

interface Card {
  id: string;
  note?: number; // evidence note number (undefined = guess)
  text: string;
  slot?: SlotId;
  frag?: string; // the persona text this note supports
}

const CARDS: Card[] = [
  { id: 'n1', note: 1, text: '01:35 Hassan writes the plan on the whiteboard with a marker, standing; it takes 8 minutes.', slot: 'behaviour', frag: 'Plans on the whiteboard, standing' },
  { id: 'n2', note: 2, text: '02:10 Salma looks at the whiteboard from the oven, 4 metres away, and squints.', slot: 'context', frag: 'His team stands 2 to 4 m from the board' },
  { id: 'n3', note: 3, text: '02:50 Nadia phones: shop 14 wants 60 more baguettes. Hassan writes it in a corner.', slot: 'behaviour', frag: 'writes late changes in a corner' },
  { id: 'n5', note: 5, text: '03:45 Oven 2 waits 6 minutes: nobody knows what comes next.', slot: 'pain', frag: 'Ovens wait for a decision' },
  { id: 'n6', note: 6, text: '04:00 A floury sleeve wipes the board; one order line disappears.', slot: 'pain', frag: 'changes get erased or lost' },
  { id: 'n7', note: 7, text: '04:35 Youssef asks "which shop first?" three times; no one answers over the noise.', slot: 'context', frag: 'in a hall too loud to hear a question' },
  { id: 'n9', note: 9, text: '05:25 Amine waits at the dock, does not know the route order, calls Hassan.', slot: 'goal', frag: 'Get every van out at 06:00 with the right quantities' },
  { id: 'n11', note: 11, text: 'Hassan: "I do not need more information. I need to see the next thing, now."', slot: 'quote', frag: '"I do not need more information. I need to see the next thing, now."' },
  { id: 'g1', text: 'Likes football' },
  { id: 'g2', text: 'Has two children' },
  { id: 'g3', text: 'Prefers dark mode' },
  { id: 'g4', text: 'Drinks a lot of coffee' },
];

// Order in which "Place next" moves cards (evidence and guesses mixed).
const SEQUENCE = ['n1', 'g1', 'n3', 'n6', 'g2', 'n2', 'n7', 'n5', 'g3', 'n9', 'g4', 'n11'];
// Where each card sits in the pool (mixed up on purpose).
const LAYOUT = ['g3', 'n5', 'n1', 'g2', 'n11', 'n7', 'n2', 'g1', 'n9', 'n3', 'g4', 'n6'];

const SLOTS: { id: SlotId; label: string }[] = [
  { id: 'goal', label: 'Goal' },
  { id: 'context', label: 'Context' },
  { id: 'behaviour', label: 'Behaviour' },
  { id: 'pain', label: 'Pain point' },
  { id: 'quote', label: 'Quote' },
];

const CW = 288;
const CH = 132;
const GAP = 14;
const POOL_W = 3 * CW + 2 * GAP;
const home = (id: string) => {
  const k = LAYOUT.indexOf(id);
  return { x: (k % 3) * (CW + GAP), y: Math.floor(k / 3) * (CH + GAP) };
};

type Status = 'pool' | 'placed' | 'rejected';

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const PersonaBuilderDemo: React.FC = () => {
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [order, setOrder] = useState<string[]>([]); // placed evidence ids, in arrival order
  const [flash, setFlash] = useState<string | null>(null); // guess currently pushed against the card
  const [alarm, setAlarm] = useState<string | null>(null);
  const [targets, setTargets] = useState<Record<string, { x: number; y: number }>>({});
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const slotEls = useRef<Record<string, HTMLDivElement | null>>({});
  const dragInfo = useRef<{ id: string; px: number; py: number; ox: number; oy: number } | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useLayoutEffect(() => {
    const el = area.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const sx = r.width / el.offsetWidth || 1;
    const sy = r.height / el.offsetHeight || 1;
    const t: Record<string, { x: number; y: number }> = {};
    CARDS.forEach((c) => {
      const s = c.slot && slotEls.current[c.slot];
      if (!s) return;
      const sr = s.getBoundingClientRect();
      t[c.id] = { x: (sr.left - r.left) / sx + 40, y: (sr.top - r.top) / sy + sr.height / sy / 2 - CH / 2 };
    });
    setTargets(t);
  }, []);

  const busy = flash !== null;
  const get = (id: string): Status => status[id] ?? 'pool';
  const processed = CARDS.filter((c) => get(c.id) !== 'pool').length;
  const done = processed === CARDS.length;
  const evidencePlaced = order.length;

  const accept = (id: string) => {
    if (busy || get(id) !== 'pool') return;
    const card = CARDS.find((c) => c.id === id)!;
    setAlarm(null);
    if (card.note !== undefined) {
      setStatus((s) => ({ ...s, [id]: 'placed' }));
      setOrder((o) => [...o, id]);
    } else {
      // guess: pushes against the persona, red alarm, bounces back out
      setFlash(id);
      setAlarm(`"${card.text}": no evidence. Does it change a design decision?`);
      later(() => {
        setFlash(null);
        setStatus((s) => ({ ...s, [id]: 'rejected' }));
      }, 1400);
    }
  };

  const placeNext = () => {
    const next = SEQUENCE.find((id) => get(id) === 'pool');
    if (next) accept(next);
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setStatus({});
    setOrder([]);
    setFlash(null);
    setAlarm(null);
    setDrag(null);
    dragInfo.current = null;
  };

  const onDown = (e: React.PointerEvent, id: string) => {
    if (busy || get(id) !== 'pool') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const h = home(id);
    dragInfo.current = { id, px: e.clientX, py: e.clientY, ox: h.x, oy: h.y };
    setDrag({ id, x: h.x, y: h.y });
  };
  const onMove = (e: React.PointerEvent) => {
    const d = dragInfo.current;
    const el = area.current;
    if (!d || !el) return;
    const r = el.getBoundingClientRect();
    const sx = r.width / el.offsetWidth || 1;
    const sy = r.height / el.offsetHeight || 1;
    setDrag({ id: d.id, x: d.ox + (e.clientX - d.px) / sx, y: d.oy + (e.clientY - d.py) / sy });
  };
  const onUp = () => {
    const d = dragInfo.current;
    dragInfo.current = null;
    if (!d) return;
    setDrag((cur) => {
      if (cur && cur.x + CW / 2 > POOL_W + 20) accept(d.id);
      return null;
    });
  };

  const cardStyle = (c: Card): React.CSSProperties => {
    const st = get(c.id);
    const h = home(c.id);
    if (drag && drag.id === c.id) return { left: drag.x, top: drag.y, zIndex: 50, boxShadow: '0 12px 24px rgba(0,0,0,0.25)', transition: 'none' };
    if (st === 'placed') {
      const t = targets[c.id] ?? h;
      return { left: t.x, top: t.y, opacity: 0, transform: 'scale(0.35)', zIndex: 40, transition: 'left 0.8s ease, top 0.8s ease, transform 0.8s ease, opacity 0.8s ease 0.1s' };
    }
    if (flash === c.id) return { left: h.x + POOL_W + 40, top: h.y, transform: 'rotate(-3deg)', zIndex: 45, transition: 'left 0.5s ease, top 0.5s ease, transform 0.5s ease' };
    return { left: h.x, top: h.y, transition: 'left 0.6s cubic-bezier(.3,1.6,.5,1), top 0.6s ease, transform 0.6s ease' };
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={placeNext} disabled={done || busy} className={PRIMARY}>
          <ArrowRight className="w-6 h-6" />
          Place next card
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1" />
        <div className="text-[28px] text-[#525254]">
          <b className="text-[#222222]">{processed} of 12</b> cards sorted
        </div>
      </div>

      <div ref={area} className="relative flex-1 min-h-0 select-none">
        {/* persona card */}
        <div className="absolute top-0 bottom-0 right-0 rounded-2xl border border-[#E8E2D9] bg-white flex flex-col overflow-hidden" style={{ left: POOL_W + 24 }}>
          <div className="h-16 flex-shrink-0 px-5 flex items-center gap-4 bg-[#222222] text-white">
            <User className="w-8 h-8" />
            <span className="text-[28px] font-bold">Hassan, 52, head baker</span>
            <div className="flex-1" />
            <span className={`text-[22px] font-bold rounded-full px-3 py-0.5 ${done ? 'bg-emerald-600' : 'bg-white/15'}`}>
              {done ? 'every line backed by evidence' : `${evidencePlaced} of 8 notes used`}
            </span>
          </div>
          <div className="flex-1 min-h-0 grid mb-[80px]" style={{ gridTemplateRows: 'repeat(5, 1fr) 1fr' }}>
            {SLOTS.map((s, i) => {
              const mine = order.map((id) => CARDS.find((c) => c.id === id)!).filter((c) => c.slot === s.id);
              return (
                <div key={s.id} className={`flex items-stretch min-h-0 ${i > 0 ? 'border-t border-[#E8E2D9]' : ''}`}>
                  <div className="w-[170px] flex-shrink-0 px-4 flex items-center text-[26px] font-bold text-[#E5391C] bg-[#FAF9F6]">{s.label}</div>
                  <div
                    ref={(el) => {
                      slotEls.current[s.id] = el;
                    }}
                    className="flex-1 min-w-0 px-4 flex items-center text-[24px] leading-[1.25] text-[#222222]"
                  >
                    {mine.length === 0 ? (
                      <span className="text-[#B8B3AA] text-[22px]">waiting for evidence</span>
                    ) : (
                      <span className={s.id === 'quote' ? 'italic' : ''}>
                        {mine.map((c, k) => (
                          <span key={c.id} className="animate-[fadeIn_0.6s_ease_0.7s_both]">
                            {k > 0 && ', '}
                            {c.frag && s.id !== 'quote' ? (k > 0 ? c.frag.charAt(0).toLowerCase() : c.frag.charAt(0).toUpperCase()) + c.frag.slice(1) : c.frag}
                            <span className="ml-1.5 align-middle inline-block rounded-full bg-[#E5391C] text-white text-[22px] font-bold px-2 leading-[26px] not-italic">#{c.note}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-2 border-t border-[#E8E2D9] min-h-0">
              {[0, 1].map((k) => (
                <div key={k} className={`flex items-center px-4 gap-2 text-[22px] ${k === 1 ? 'border-l border-[#E8E2D9]' : ''}`}>
                  <span className="text-[#6E6D70] font-bold">Trait</span>
                  <span className="rounded-lg border-2 border-dashed border-[#D9D3C8] px-3 py-1 text-[#B8B3AA]">{done ? 'empty: no evidence yet' : 'only with evidence'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stereotype alarm */}
          <div
            className="absolute left-3 right-3 bottom-3 rounded-xl bg-[#E5391C] text-white px-4 py-2 flex items-center gap-3 text-[24px] font-bold leading-[1.2] transition-all duration-300"
            style={{ height: 68, opacity: alarm ? 1 : 0, transform: alarm ? 'translateY(0)' : 'translateY(20px)', pointerEvents: 'none' }}
          >
            <ShieldAlert className="w-9 h-9 flex-shrink-0" />
            <span>Stereotype alarm! {alarm}</span>
          </div>
          {done && (
            <div className="absolute left-3 right-3 bottom-3 rounded-xl bg-emerald-600 text-white px-4 py-2 flex items-center gap-3 text-[24px] font-bold leading-[1.2]" style={{ height: 68 }}>
              <BadgeCheck className="w-9 h-9 flex-shrink-0" />
              <span>Evidence in, persona out: {evidencePlaced} notes used, 4 guesses refused.</span>
            </div>
          )}
        </div>

        {/* cards */}
        {CARDS.map((c) => {
          const st = get(c.id);
          const isGuess = c.note === undefined;
          return (
            <div
              key={c.id}
              onPointerDown={(e) => onDown(e, c.id)}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className={`absolute rounded-xl border-2 px-3 py-2 text-[22px] leading-[1.2] flex items-center touch-none ${
                st === 'rejected' ? 'border-[#E5391C] bg-[#FFF3EF] text-[#E5391C] line-through opacity-60' : flash === c.id ? 'border-[#E5391C] bg-[#FFF3EF] text-[#222222]' : 'border-[#E8E2D9] bg-white text-[#222222] cursor-grab'
              }`}
              style={{ width: CW, height: CH, ...cardStyle(c) }}
            >
              <span>
                <span className={`mr-1.5 inline-block rounded-full text-[22px] font-bold px-2 leading-[26px] not-italic no-underline ${isGuess ? 'bg-[#E8E2D9] text-[#6E6D70]' : 'bg-[#E5391C] text-white'}`}>
                  {isGuess ? 'no note' : `#${c.note}`}
                </span>
                {c.text}
              </span>
            </div>
          );
        })}
        <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      </div>
    </div>
  );
};
