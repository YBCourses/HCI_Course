import React, { useRef, useState } from 'react';
import { Layers, Tag, RotateCcw } from 'lucide-react';

/** Fictional observations about the Study Room Booking app (class example), 5 per theme. */
interface Note {
  text: string;
  group: number;
  sx: number; // scattered position
  sy: number;
  rot: number;
  color: string;
}

const COLORS = ['#FFF3A8', '#FFD6E0', '#CDEBFF', '#D3F5D0', '#FFE0B8'];

const GROUP_TITLES = [
  'Cannot find the Reserve step',
  'Unclear what is reserved',
  'Too many rooms to scan',
  'Date and time confusion',
];

// [text, group, scatter x, scatter y, rotation]
const RAW: [string, number, number, number, number][] = [
  ['Wanted to see only free rooms', 2, 70, 20, -2],
  ['Typed the date with slashes, got an error', 3, 410, 60, 1.5],
  ['Reserve is tiny, in the far corner', 0, 820, 10, -1],
  ['Not sure whether my room was booked', 1, 1190, 50, 2],
  ['Looked for a Reserve button for ages', 0, 1480, 15, -1.5],
  ['Tiny green dots are hard to read', 2, 20, 150, 1],
  ['Did not know Hold lasts only ten minutes', 1, 360, 190, -2],
  ['Error just said Invalid input, no help', 3, 760, 150, 1.5],
  ['Thought Hold was the only way to book', 0, 1120, 175, -1],
  ['Had to check every row for four seats', 2, 1500, 160, 2],
  ['Clicked Reserve and nothing changed on screen', 1, 90, 290, 1.5],
  ['Did not know the time format to use', 3, 440, 330, -1.5],
  ['Scanned the whole screen to find Reserve', 0, 800, 300, 1],
  ['Checked My items to see if it worked', 1, 1170, 320, -2],
  ['Rooms too small for my group were shown', 2, 1490, 310, 1],
  ['Wanted a calendar to pick tomorrow', 3, 30, 430, -1],
  ['Almost gave up before finding the button', 0, 380, 450, 2],
  ['No message told me the room was mine', 1, 760, 440, -1.5],
  ['Typed 2pm instead of 14:00, it failed', 3, 1140, 455, 1.5],
  ['Twenty-four rooms in a list, no order', 2, 1480, 450, -2],
];

const NOTES: Note[] = RAW.map(([text, group, sx, sy, rot], i) => ({ text, group, sx, sy, rot, color: COLORS[(i * 3) % COLORS.length] }));

const NOTE_W = 300;
const NOTE_H = 100;
const COL_W = 456;
const TITLE_H = 70;
const STEP = 94;

/** Position of note i when grouped. */
const groupPos = (i: number) => {
  const g = NOTES[i].group;
  const k = NOTES.slice(0, i).filter((n) => n.group === g).length;
  return { x: g * COL_W + (COL_W - NOTE_W) / 2 + (k % 2 ? 10 : -10), y: TITLE_H + k * STEP };
};

const scatterPositions = () => NOTES.map((n) => ({ x: n.sx, y: n.sy }));
const groupedPositions = () => NOTES.map((_, i) => groupPos(i));

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const AffinityWallDemo: React.FC = () => {
  const [pos, setPos] = useState(scatterPositions);
  const [grouped, setGrouped] = useState(false);
  const [named, setNamed] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [z, setZ] = useState<number[]>(() => NOTES.map((_, i) => i));
  const wall = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; px: number; py: number; ox: number; oy: number } | null>(null);
  const zTop = useRef(NOTES.length);

  const onDown = (e: React.PointerEvent, i: number) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: i, px: e.clientX, py: e.clientY, ox: pos[i].x, oy: pos[i].y };
    setDragging(i);
    zTop.current += 1;
    const top = zTop.current;
    setZ((p) => p.map((v, k) => (k === i ? top : v)));
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = wall.current;
    if (!d || !el) return;
    const rect = el.getBoundingClientRect();
    const sx = rect.width / el.offsetWidth || 1;
    const sy = rect.height / el.offsetHeight || 1;
    const x = Math.min(el.offsetWidth - NOTE_W, Math.max(0, d.ox + (e.clientX - d.px) / sx));
    const y = Math.min(el.offsetHeight - NOTE_H, Math.max(0, d.oy + (e.clientY - d.py) / sy));
    setPos((p) => p.map((v, k) => (k === d.id ? { x, y } : v)));
  };

  const onUp = () => {
    drag.current = null;
    setDragging(null);
  };

  const group = () => {
    setPos(groupedPositions());
    setGrouped(true);
  };
  const reset = () => {
    setPos(scatterPositions());
    setGrouped(false);
    setNamed(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex items-center gap-3 flex-shrink-0">
        <div className="text-[28px] text-[#525254] mr-2">20 observations from users of the booking app</div>
        <div className="flex-1" />
        <button onClick={group} disabled={grouped} className={PRIMARY}>
          <Layers className="w-6 h-6" />
          Group them
        </button>
        <button onClick={() => setNamed(true)} disabled={!grouped || named} className={PRIMARY}>
          <Tag className="w-6 h-6" />
          Name the groups
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 rounded-3xl border border-[#E8E2D9] bg-[#FAF9F6] overflow-hidden">
        <div ref={wall} className="relative w-full h-full select-none touch-none">
          {GROUP_TITLES.map((t, g) => (
            <div
              key={t}
              className="absolute flex items-center justify-center text-center text-[28px] font-bold text-[#E5391C] leading-tight border-b-4 border-[#E5391C] transition-opacity duration-500"
              style={{ left: g * COL_W + 28, top: 0, width: COL_W - 56, height: TITLE_H - 8, opacity: named ? 1 : 0 }}
            >
              {t}
            </div>
          ))}
          {NOTES.map((n, i) => (
            <div
              key={n.text}
              onPointerDown={(e) => onDown(e, i)}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="absolute flex items-center px-4 text-[22px] leading-[1.25] font-medium text-[#222222] cursor-grab active:cursor-grabbing rounded-sm"
              style={{
                left: pos[i].x,
                top: pos[i].y,
                width: NOTE_W,
                height: NOTE_H,
                background: n.color,
                transform: `rotate(${grouped ? 0 : n.rot}deg)`,
                zIndex: z[i],
                boxShadow: dragging === i ? '0 10px 22px rgba(0,0,0,0.25)' : '0 2px 5px rgba(0,0,0,0.18)',
                transition: dragging === i ? 'none' : 'left 0.8s ease, top 0.8s ease, transform 0.8s ease, box-shadow 0.2s',
              }}
            >
              {n.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
