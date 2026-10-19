import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, ListChecks, RotateCcw } from 'lucide-react';

const SECTIONS = ['Who they are', 'What they try to do', 'Where and when', 'What they need', 'What hurts'];

interface Insight {
  text: string;
  section: number;
  slot: number; // position inside the section (0 or 1)
  hx: number; // home (scattered) position
  hy: number;
  rot: number;
  color: string;
}

// Listed in placement order. Home positions are deliberately mixed up.
const INSIGHTS: Insight[] = [
  { text: 'They are students with a full timetable', section: 0, slot: 0, hx: 40, hy: 210, rot: -2, color: '#FFF3A8' },
  { text: 'They want a room for a group of 3 to 6', section: 1, slot: 0, hx: 10, hy: 4, rot: 1.5, color: '#CDEBFF' },
  { text: 'Most book on a phone in a corridor, with about ten minutes', section: 2, slot: 0, hx: 50, hy: 107, rot: 2, color: '#D3F5D0' },
  { text: 'They only trust the booking once they see a confirmation', section: 3, slot: 0, hx: 25, hy: 494, rot: -1.5, color: '#FFE0B8' },
  { text: 'They think Hold finishes the booking', section: 4, slot: 0, hx: 55, hy: 309, rot: 1.5, color: '#FFD6E0' },
  { text: 'Room codes are only on the Rooms tab', section: 4, slot: 1, hx: 10, hy: 398, rot: -1, color: '#FFD6E0' },
];

const CHIP_W = 410;
const CHIP_H = 88;
const LEFT_W = 470;

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const AudienceProfileDemo: React.FC = () => {
  const [placed, setPlaced] = useState(0);
  const [targets, setTargets] = useState<{ x: number; y: number }[]>([]);
  const area = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const el = area.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const sx = r.width / el.offsetWidth || 1;
    const sy = r.height / el.offsetHeight || 1;
    setTargets(
      INSIGHTS.map((n) => {
        const s = slots.current[n.section];
        if (!s) return { x: 0, y: 0 };
        const sr = s.getBoundingClientRect();
        return {
          x: (sr.left - r.left) / sx + n.slot * (CHIP_W + 16),
          y: (sr.top - r.top) / sy + (sr.height / sy - CHIP_H) / 2,
        };
      }),
    );
  }, []);

  const done = placed === INSIGHTS.length;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => setPlaced((p) => Math.min(INSIGHTS.length, p + 1))} disabled={done} className={PRIMARY}>
          <ArrowRight className="w-6 h-6" />
          Place next insight
        </button>
        <button onClick={() => setPlaced(INSIGHTS.length)} disabled={done} className={PRIMARY}>
          <ListChecks className="w-6 h-6" />
          Place all
        </button>
        <button onClick={() => setPlaced(0)} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1" />
        <div className="text-[28px] text-[#525254]">
          Insights from the Study Room Booking study: <b className="text-[#222222]">{placed} of {INSIGHTS.length}</b> placed
        </div>
      </div>

      <div ref={area} className="relative flex-1 min-h-0 select-none">
        {/* left zone: banner appears once chips have left */}
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center text-center rounded-2xl border-2 border-[#E5391C] bg-[#FFF3EF] px-6 text-[28px] font-bold leading-[1.25] text-[#222222] transition-opacity duration-700"
          style={{ width: LEFT_W, opacity: done ? 1 : 0 }}
        >
          <span>
            A profile describes a <span className="text-[#E5391C]">GROUP</span> of users. Session 4 turns it into personas and requirements.
          </span>
        </div>

        {/* profile card */}
        <div
          className="absolute top-0 bottom-0 rounded-2xl border border-[#E8E2D9] bg-white flex flex-col overflow-hidden"
          style={{ left: LEFT_W + 24, right: 0 }}
        >
          <div className="h-12 flex-shrink-0 px-5 flex items-center bg-[#222222] text-white text-[28px] font-bold">
            Audience profile: students who book study rooms
          </div>
          <div className="flex-1 min-h-0 grid grid-rows-5">
            {SECTIONS.map((s, i) => (
              <div key={s} className={`flex items-stretch min-h-0 ${i > 0 ? 'border-t border-[#E8E2D9]' : ''}`}>
                <div className="w-[290px] flex-shrink-0 px-5 flex items-center text-[26px] font-bold text-[#E5391C] bg-[#FAF9F6]">{s}</div>
                <div className="flex-1 flex items-center gap-4 px-4">
                  <div
                    ref={(el) => {
                      slots.current[i] = el;
                    }}
                    className="h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* insight chips */}
        {INSIGHTS.map((n, i) => {
          const isPlaced = i < placed && targets[i];
          const x = isPlaced ? targets[i].x : n.hx;
          const y = isPlaced ? targets[i].y : n.hy;
          return (
            <div
              key={n.text}
              className="absolute flex items-center px-4 text-[24px] leading-[1.2] font-medium text-[#222222] rounded-md"
              style={{
                left: x,
                top: y,
                width: CHIP_W,
                height: CHIP_H,
                background: n.color,
                transform: `rotate(${isPlaced ? 0 : n.rot}deg)`,
                zIndex: isPlaced ? 20 : 10,
                boxShadow: isPlaced ? '0 1px 3px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.22)',
                transition: 'left 0.9s ease, top 0.9s ease, transform 0.9s ease, box-shadow 0.4s',
              }}
            >
              {n.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
