import React, { useRef, useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';

/** Lecturer-run 2x2: how often x how bad. Study Room Booking problems. Fixed layout for the 1824 x 671 box. */

type Q = 'first' | 'soon' | 'cheap' | 'leave';

interface Card {
  id: string;
  label: string;
  q: Q;
  reason: string;
}

const CARDS: Card[] = [
  { id: 'hold', label: 'Hold looks like the main button', q: 'first', reason: 'Almost everyone clicks it, and they lose the room: often and serious.' },
  { id: 'confirm', label: 'Nothing changes after Reserve', q: 'first', reason: 'Every booking ends here and nobody knows if it worked: often and serious.' },
  { id: 'clear', label: 'Clear erases the form, no question', q: 'soon', reason: 'Only a slip causes it, but all the typing is lost: rare and serious.' },
  { id: 'ten', label: 'Ten-minute limit hidden in tiny print', q: 'soon', reason: 'Few people lose a room this way, but it costs them the booking: rare and serious.' },
  { id: 'code', label: 'Room must be typed as a code', q: 'first', reason: 'Every booking needs it and one typo blocks it: often and serious.' },
  { id: 'reserve', label: 'Reserve button tiny, in a corner', q: 'cheap', reason: 'It slows everyone a little, and making it bigger is quick: often and small.' },
  { id: 'date', label: 'Date format not shown', q: 'cheap', reason: 'Many people guess once, then get it right; a hint is cheap: often and small.' },
  { id: 'dots', label: 'Tiny status dots in the room list', q: 'leave', reason: 'Rarely misread, and the list still works: rare and small.' },
];

const QUADS: Record<Q, { title: string; sub: string; col: number; row: number; box: string; head: string }> = {
  soon: { title: 'Fix soon', sub: 'rare + serious', col: 0, row: 0, box: 'bg-amber-50 border-amber-300', head: 'text-amber-700' },
  first: { title: 'Fix first', sub: 'often + serious', col: 1, row: 0, box: 'bg-red-50 border-[#E5391C]/50', head: 'text-[#E5391C]' },
  leave: { title: 'Leave for now', sub: 'rare + small', col: 0, row: 1, box: 'bg-stone-100 border-stone-300', head: 'text-[#525254]' },
  cheap: { title: 'Fix if cheap', sub: 'often + small', col: 1, row: 1, box: 'bg-blue-50 border-blue-300', head: 'text-blue-700' },
};

// geometry in the 1824 x 671 box
const MX = 70; // matrix left
const QW = 610;
const QH = 276;
const TRAY_X = 1332;
const TRAY_W = 492;
const CW_Q = 286; // card width in a quadrant
const CH_Q = 60;
const CW_T = 460; // card width in the tray
const CH_T = 52;

const qRect = (q: Q) => {
  const d = QUADS[q];
  return { x: MX + d.col * QW, y: d.row * QH, w: QW, h: QH };
};

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const PriorityMatrixDemo: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [where, setWhere] = useState<Record<string, Q | null>>({});
  const [order, setOrder] = useState<string[]>([]); // placement order, drives slots
  const [note, setNote] = useState('');
  const [drag, setDrag] = useState<{ id: string; x: number; y: number; dx: number; dy: number } | null>(null);

  const trayIds = CARDS.filter((c) => !where[c.id]).map((c) => c.id);

  const place = (id: string, q: Q) => {
    setWhere((w) => ({ ...w, [id]: q }));
    setOrder((o) => [...o.filter((x) => x !== id), id]);
  };
  const unplace = (id: string) => {
    setWhere((w) => ({ ...w, [id]: null }));
    setOrder((o) => o.filter((x) => x !== id));
  };

  const explain = (c: Card, q: Q) => {
    if (q === c.q) setNote(`${c.label} → ${c.reason}`);
    else setNote(`${c.label} → our reading: "${QUADS[c.q].title}". ${c.reason}`);
  };

  const placeNext = () => {
    const c = CARDS.find((x) => !where[x.id]);
    if (!c) return;
    place(c.id, c.q);
    explain(c, c.q);
  };

  const reset = () => {
    setWhere({});
    setOrder([]);
    setNote('');
    setDrag(null);
  };

  // pointer position -> root coordinates (the slide canvas is scaled)
  const toRoot = (e: React.PointerEvent) => {
    const r = root.current!.getBoundingClientRect();
    const sx = root.current!.offsetWidth / r.width;
    const sy = root.current!.offsetHeight / r.height;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  const cardPos = (c: Card) => {
    const q = where[c.id];
    if (!q) {
      const i = trayIds.indexOf(c.id);
      return { x: TRAY_X + 16, y: 56 + i * (CH_T + 8), w: CW_T, h: CH_T };
    }
    const slot = order.filter((id) => where[id] === q).indexOf(c.id);
    const r = qRect(q);
    return { x: r.x + 12 + (slot % 2) * (CW_Q + 12), y: r.y + 58 + Math.floor(slot / 2) * (CH_Q + 8), w: CW_Q, h: CH_Q };
  };

  const onDown = (e: React.PointerEvent, c: Card) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const p = toRoot(e);
    const pos = cardPos(c);
    setDrag({ id: c.id, x: pos.x, y: pos.y, dx: p.x - pos.x, dy: p.y - pos.y });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const p = toRoot(e);
    setDrag({ ...drag, x: p.x - drag.dx, y: p.y - drag.dy });
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag) return;
    const p = toRoot(e);
    const c = CARDS.find((x) => x.id === drag.id)!;
    const hit = (Object.keys(QUADS) as Q[]).find((q) => {
      const r = qRect(q);
      return p.x >= r.x && p.x < r.x + r.w && p.y >= r.y && p.y < r.y + r.h;
    });
    if (hit) {
      place(c.id, hit);
      explain(c, hit);
    } else if (p.x >= TRAY_X && where[c.id]) {
      unplace(c.id);
    }
    setDrag(null);
  };

  return (
    <div ref={root} className="flex-1 min-h-0 relative select-none overflow-hidden">
      {/* axis: vertical */}
      <div
        className="absolute flex items-center justify-between text-[24px] text-[#525254] font-bold"
        style={{ left: 0, top: 0, width: 62, height: 2 * QH, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <span>small</span>
        <span className="text-[#222222] text-[26px]">How bad it is</span>
        <span>serious</span>
      </div>

      {/* quadrants */}
      {(Object.keys(QUADS) as Q[]).map((q) => {
        const r = qRect(q);
        const d = QUADS[q];
        return (
          <div
            key={q}
            className={`absolute rounded-2xl border-2 ${d.box}`}
            style={{ left: r.x + 3, top: r.y + 3, width: r.w - 6, height: r.h - 6 }}
          >
            <div className="px-4 pt-2 flex items-baseline gap-3">
              <span className={`text-[28px] font-bold ${d.head}`}>{d.title}</span>
              <span className="text-[22px] text-[#6E6D70]">{d.sub}</span>
            </div>
          </div>
        );
      })}

      {/* axis: horizontal */}
      <div className="absolute flex items-center justify-between text-[24px] text-[#525254] font-bold" style={{ left: MX, top: 2 * QH + 2, width: 2 * QW, height: 36 }}>
        <span>rarely</span>
        <span className="text-[#222222] text-[26px]">How often it happens</span>
        <span>often</span>
      </div>

      {/* tray */}
      <div className="absolute rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6]" style={{ left: TRAY_X, top: 0, width: TRAY_W, height: 2 * QH + 38 }}>
        <div className="px-4 pt-2 text-[28px] font-bold text-[#222222]">
          Problems waiting <span className="text-[22px] font-normal text-[#6E6D70]">({trayIds.length} left)</span>
        </div>
      </div>

      {/* cards */}
      {CARDS.map((c) => {
        const dragging = drag?.id === c.id;
        const pos = dragging ? { ...cardPos(c), x: drag!.x, y: drag!.y } : cardPos(c);
        const placed = !!where[c.id];
        return (
          <div
            key={c.id}
            onPointerDown={(e) => onDown(e, c)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={() => setDrag(null)}
            className={`absolute touch-none cursor-grab rounded-xl border bg-white flex items-center px-3 text-[22px] leading-tight text-[#222222] ${
              placed ? 'border-[#D8D1C5]' : 'border-[#E8E2D9]'
            } ${dragging ? 'shadow-xl z-20 cursor-grabbing' : 'shadow-sm z-10'}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: pos.w,
              height: pos.h,
              transition: dragging ? 'none' : 'left .7s ease, top .7s ease, width .7s ease, height .7s ease',
            }}
          >
            {c.label}
          </div>
        );
      })}

      {/* reason line + buttons */}
      <div className="absolute flex items-center text-[24px] text-[#222222] leading-snug" style={{ left: MX, top: 2 * QH + 44, width: 2 * QW, height: 72 }}>
        {note || 'Place a problem and see where it lands, and why.'}
      </div>
      <div className="absolute flex gap-4" style={{ left: TRAY_X, top: 2 * QH + 46, width: TRAY_W }}>
        <button onClick={placeNext} disabled={trayIds.length === 0} className={btnPrimary}>
          Place next <ChevronRight className="w-6 h-6" />
        </button>
        <button onClick={reset} className={btnSecondary}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
      </div>
    </div>
  );
};
