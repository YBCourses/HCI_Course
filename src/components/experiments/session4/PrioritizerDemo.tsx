import React, { useRef, useState } from 'react';
import { ChevronRight, RotateCcw, Brain } from 'lucide-react';

/**
 * Lecturer-run prioritiser (MoSCoW + budget bar) for the Fresh Batch requirements R1-R12.
 * Costs and impact ratings are illustrative, "in our case".
 * AHA: you cannot build everything. Musts take EUR 1,300, the Shoulds do not all fit in what is left, so one waits;
 * the most expensive card (R11, EUR 900) is the one with no evidence behind it. Evidence and cost decide.
 * Fixed layout for the 1824 x 671 box. Drag works (scaled canvas handled) and "Place next" does the same.
 */

type Tier = 'must' | 'should' | 'could' | 'wont';

interface Req {
  id: string;
  label: string;
  cost: number;
  impact: number;
  tier: Tier;
  reason: string;
}

const BUDGET = 2000;

const REQS: Req[] = [
  { id: 'R1', label: 'Next batch readable at 3 m', cost: 300, impact: 5, tier: 'must', reason: 'Salma squints from 4 m and walks over to read (note 2). Without it nothing else helps.' },
  { id: 'R2', label: 'Changes reach all in 1 min', cost: 400, impact: 5, tier: 'must', reason: 'A change in a corner is missed (notes 3, 4). This is the biggest pain of the night.' },
  { id: 'R3', label: 'Nothing erased by accident', cost: 150, impact: 4, tier: 'must', reason: 'A floury sleeve wiped an order line (note 6). Cheap, and a lost order is a late van.' },
  { id: 'R4', label: 'Packing order visible', cost: 250, impact: 4, tier: 'must', reason: '"Which shop first?" asked three times, and the driver waits (notes 7, 9).' },
  { id: 'R5', label: 'Works with floury hands', cost: 200, impact: 4, tier: 'must', reason: '"My hands are never clean" (note 12). If it needs touch, it fails in this hall.' },
  { id: 'R6', label: 'Numbers and icons, not text', cost: 100, impact: 3, tier: 'should', reason: 'Youssef guesses the French words (note 8). Valuable and cheap, but people cope today.' },
  { id: 'R7', label: 'Works with weak network', cost: 350, impact: 3, tier: 'should', reason: 'The network is weak near the ovens. Important, but a plan kept on screen covers part of it.' },
  { id: 'R8', label: 'Write the plan once', cost: 300, impact: 3, tier: 'should', reason: 'Writing the plan takes 8 minutes today. It saves time but is not a failure on the night.' },
  { id: 'R9', label: 'Alerts without sound', cost: 250, impact: 3, tier: 'should', reason: 'The hall is about 80 dB, so a beep is not heard. R2 already covers part of this.' },
  { id: 'R10', label: 'Record for next shift', cost: 400, impact: 2, tier: 'could', reason: 'Handover works today, only slowly. Nice to have if money is left over.' },
  { id: 'R11', label: 'Sales charts, dashboards', cost: 900, impact: 1, tier: 'wont', reason: 'The nephew wants it; no user asked for it (no evidence). It is also the most expensive card.' },
  { id: 'R12', label: 'Weather forecast', cost: 100, impact: 1, tier: 'wont', reason: 'A wish with no evidence behind it. Cheap, but cheap and useless is still waste.' },
];

const TIERS: Record<Tier, { title: string; sub: string; col: number; box: string; head: string; card: string }> = {
  must: { title: 'Must', sub: 'build first', col: 0, box: 'bg-red-50 border-[#E5391C]/50', head: 'text-[#E5391C]', card: 'border-[#E5391C]/60' },
  should: { title: 'Should', sub: 'if the budget allows', col: 1, box: 'bg-amber-50 border-amber-300', head: 'text-amber-700', card: 'border-amber-400' },
  could: { title: 'Could', sub: 'only if money is left', col: 2, box: 'bg-blue-50 border-blue-300', head: 'text-blue-700', card: 'border-blue-400' },
  wont: { title: "Won't", sub: 'not now', col: 3, box: 'bg-stone-100 border-stone-300', head: 'text-[#525254]', card: 'border-stone-300' },
};
const TIER_KEYS = Object.keys(TIERS) as Tier[];

// geometry in the 1824 x 671 box
const POOL_W = 310;
const BODY_Y = 70;
const BODY_H = 500;
const COL_X0 = 330;
const COL_W = 359;
const COL_STEP = 373;
const CARD_W = 335;
const CARD_H = 70;
const BAR_X = 330;
const BAR_W = 1494;
const SCALE = 2700; // bar covers 0..2700 euros so the overflow is visible

const colRect = (t: Tier) => ({ x: COL_X0 + TIERS[t].col * COL_STEP, y: BODY_Y, w: COL_W, h: BODY_H });
const eur = (n: number) => `€${n.toLocaleString('en-US')}`;
const dots = (n: number) => '●'.repeat(n) + '○'.repeat(5 - n);

/** which placed cards fit in the budget: Musts first, then Shoulds, then Coulds, in placement order */
const evaluate = (where: Record<string, Tier | undefined>, order: string[]) => {
  const waits = new Set<string>();
  const fit: Record<Tier, number> = { must: 0, should: 0, could: 0, wont: 0 };
  let total = 0;
  let wait = 0;
  (['must', 'should', 'could'] as Tier[]).forEach((t) => {
    order
      .filter((id) => where[id] === t)
      .forEach((id) => {
        const r = REQS.find((x) => x.id === id)!;
        if (total + r.cost <= BUDGET) {
          total += r.cost;
          fit[t] += r.cost;
        } else {
          waits.add(id);
          wait += r.cost;
        }
      });
  });
  return { waits, fit, total, wait };
};

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const PrioritizerDemo: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [where, setWhere] = useState<Record<string, Tier | undefined>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [drag, setDrag] = useState<{ id: string; x: number; y: number; dx: number; dy: number } | null>(null);

  const pool = REQS.filter((r) => !where[r.id]).map((r) => r.id);
  const ev = evaluate(where, order);

  const describe = (r: Req, t: Tier, w: Record<string, Tier | undefined>, o: string[]) => {
    const e = evaluate(w, o);
    let s = `${r.id} ${r.label} (${eur(r.cost)}): `;
    s += t === r.tier ? r.reason : `our reading: ${TIERS[r.tier].title}. ${r.reason}`;
    if (t !== 'wont') {
      if (e.waits.has(r.id)) s += ` It does not fit: it would pass ${eur(BUDGET)}, so it waits.`;
      else s += ` Planned so far: ${eur(e.total)} of ${eur(BUDGET)}.`;
    }
    return s;
  };

  const place = (id: string, t: Tier) => {
    const w = { ...where, [id]: t };
    const o = [...order.filter((x) => x !== id), id];
    setWhere(w);
    setOrder(o);
    setNote(describe(REQS.find((x) => x.id === id)!, t, w, o));
  };
  const unplace = (id: string) => {
    setWhere((w) => ({ ...w, [id]: undefined }));
    setOrder((o) => o.filter((x) => x !== id));
  };
  const placeNext = () => {
    const r = REQS.find((x) => !where[x.id]);
    if (r) place(r.id, r.tier);
  };
  const reset = () => {
    setWhere({});
    setOrder([]);
    setNote('');
    setDrag(null);
  };

  const done = pool.length === 0;
  const message =
    note ||
    `Think in silence: you have ${eur(BUDGET)} (in our case). Which of these would you build first? Then click Place next.`;
  const summary = done
    ? ` Musts ${eur(ev.fit.must)} + Shoulds that fit ${eur(ev.fit.should)} = ${eur(ev.total)}. ${[...ev.waits].join(' and ') || 'Nothing'} must wait.`
    : '';

  // pointer -> root coordinates (the slide canvas is scaled)
  const toRoot = (e: React.PointerEvent) => {
    const r = root.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (root.current!.offsetWidth / r.width), y: (e.clientY - r.top) * (root.current!.offsetHeight / r.height) };
  };

  const cardPos = (r: Req) => {
    const t = where[r.id];
    if (!t) {
      const k = pool.indexOf(r.id);
      if (k === 0) return { x: 8, y: BODY_Y + 46, w: POOL_W - 16, h: 76, mode: 'next' as const };
      const j = k - 1;
      return { x: 8 + (j % 2) * 154, y: BODY_Y + 46 + 76 + 10 + Math.floor(j / 2) * 58, w: 144, h: 52, mode: 'chip' as const };
    }
    const slot = order.filter((id) => where[id] === t).indexOf(r.id);
    const c = colRect(t);
    return { x: c.x + 12, y: c.y + 56 + slot * (CARD_H + 6), w: CARD_W, h: CARD_H, mode: 'col' as const };
  };

  const onDown = (e: React.PointerEvent, r: Req) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const p = toRoot(e);
    const pos = cardPos(r);
    setDrag({ id: r.id, x: pos.x, y: pos.y, dx: p.x - pos.x, dy: p.y - pos.y });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const p = toRoot(e);
    setDrag({ ...drag, x: p.x - drag.dx, y: p.y - drag.dy });
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag) return;
    const p = toRoot(e);
    const hit = TIER_KEYS.find((t) => {
      const c = colRect(t);
      return p.x >= c.x && p.x < c.x + c.w && p.y >= c.y && p.y < c.y + c.h;
    });
    if (hit) place(drag.id, hit);
    else if (p.x < COL_X0 && where[drag.id]) unplace(drag.id);
    setDrag(null);
  };

  const px = (n: number) => `${(n / SCALE) * 100}%`;
  const fitEnd = ev.total;
  const overEnd = ev.total + ev.wait;

  return (
    <div ref={root} className="flex-1 min-h-0 relative select-none overflow-hidden">
      <style>{`@keyframes prStripe{from{background-position:0 0}to{background-position:28px 0}}`}</style>

      {/* budget bar */}
      <div className="absolute flex flex-col justify-center" style={{ left: 0, top: 0, width: 320, height: 60 }}>
        <div className="text-[26px] font-bold text-[#222222] leading-tight">Budget {eur(BUDGET)}</div>
        <div className="text-[22px] text-[#6E6D70] leading-tight">planned {eur(ev.total)} {ev.wait > 0 && <span className="text-red-600 font-bold">+ {eur(ev.wait)} waiting</span>}</div>
      </div>
      <div className="absolute rounded-xl border border-[#D8D1C5] bg-[#FAF9F6] overflow-hidden" style={{ left: BAR_X, top: 8, width: BAR_W, height: 46 }}>
        {/* over-budget zone */}
        <div className="absolute top-0 bottom-0 right-0 bg-red-50" style={{ left: px(BUDGET) }} />
        {/* fitted segments */}
        {(
          [
            ['must', 'bg-[#E5391C]', 0],
            ['should', 'bg-amber-500', ev.fit.must],
            ['could', 'bg-blue-500', ev.fit.must + ev.fit.should],
          ] as [Tier, string, number][]
        ).map(([t, cls, start]) =>
          ev.fit[t] > 0 ? (
            <div key={t} className={`absolute top-0 bottom-0 ${cls} text-white text-[22px] font-bold flex items-center justify-center whitespace-nowrap overflow-hidden`} style={{ left: px(start), width: px(ev.fit[t]), transition: 'all .7s ease' }}>
              {TIERS[t].title} {eur(ev.fit[t])}
            </div>
          ) : null,
        )}
        {/* waiting segment (overflows the line) */}
        {ev.wait > 0 && (
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center text-red-700 text-[22px] font-bold whitespace-nowrap overflow-hidden"
            style={{
              left: px(fitEnd),
              width: px(overEnd - fitEnd),
              background: 'repeating-linear-gradient(135deg,#FECACA 0 10px,#FEE2E2 10px 20px)',
              backgroundSize: '28px 28px',
              animation: 'prStripe 1.2s linear infinite',
              transition: 'all .7s ease',
            }}
          >
            waits {eur(ev.wait)}
          </div>
        )}
        {/* budget line */}
        <div className="absolute top-0 bottom-0 w-[4px] bg-[#222222]" style={{ left: px(BUDGET) }} />
      </div>

      {/* pool */}
      <div className="absolute rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6]" style={{ left: 0, top: BODY_Y, width: POOL_W, height: BODY_H }}>
        <div className="px-4 pt-2 text-[28px] font-bold text-[#222222]">
          Waiting <span className="text-[22px] font-normal text-[#6E6D70]">({pool.length} left)</span>
        </div>
      </div>

      {/* columns */}
      {TIER_KEYS.map((t) => {
        const c = colRect(t);
        const d = TIERS[t];
        return (
          <div key={t} className={`absolute rounded-2xl border-2 ${d.box}`} style={{ left: c.x, top: c.y, width: c.w, height: c.h }}>
            <div className="px-4 pt-2 flex items-baseline gap-3">
              <span className={`text-[28px] font-bold ${d.head}`}>{d.title}</span>
              <span className="text-[22px] text-[#6E6D70]">{d.sub}</span>
            </div>
          </div>
        );
      })}

      {/* cards */}
      {REQS.map((r) => {
        const dragging = drag?.id === r.id;
        const pos = dragging ? { ...cardPos(r), x: drag!.x, y: drag!.y } : cardPos(r);
        const t = where[r.id];
        const waits = ev.waits.has(r.id);
        return (
          <div
            key={r.id}
            onPointerDown={(e) => onDown(e, r)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={() => setDrag(null)}
            className={`absolute touch-none cursor-grab rounded-xl bg-white flex flex-col justify-center px-3 text-[22px] leading-tight text-[#222222] ${
              waits ? 'border-2 border-dashed border-red-500 bg-red-50' : t ? `border-2 ${TIERS[t].card}` : 'border border-[#E8E2D9]'
            } ${t === 'wont' ? 'opacity-70' : ''} ${dragging ? 'shadow-xl z-20 cursor-grabbing' : 'shadow-sm z-10'}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: pos.w,
              height: pos.h,
              transition: dragging ? 'none' : 'left .7s ease, top .7s ease, width .7s ease, height .7s ease',
            }}
          >
            {pos.mode === 'chip' ? (
              <span className="font-bold">
                {r.id} <span className="font-normal text-[#525254]">{eur(r.cost)}</span>
              </span>
            ) : (
              <>
                <div className="truncate">{r.label}</div>
                <div className="text-[22px] text-[#525254] truncate">
                  <b>{r.id}</b> · {eur(r.cost)} · {waits ? <b className="text-red-600">waits</b> : <span>{pos.mode === 'col' ? 'impact ' : ''}{dots(r.impact)}</span>}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* hint / reason + buttons */}
      <div className="absolute flex items-center gap-3 text-[24px] text-[#222222] leading-snug" style={{ left: COL_X0, top: BODY_Y + BODY_H + 8, width: 1000, height: 88 }}>
        {!note && <Brain className="w-8 h-8 text-[#E5391C] shrink-0" />}
        <span>
          {message}
          {summary && <b className="text-[#E5391C]">{summary}</b>}
        </span>
      </div>
      <div className="absolute flex gap-4" style={{ left: 1366, top: BODY_Y + BODY_H + 16 }}>
        <button onClick={placeNext} disabled={done} className={btnPrimary}>
          Place next <ChevronRight className="w-6 h-6" />
        </button>
        <button onClick={reset} className={btnSecondary}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
      </div>
    </div>
  );
};
