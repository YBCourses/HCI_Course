import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Frown, Lightbulb, RotateCcw, Smile, StepForward } from 'lucide-react';

/*
 * JourneyCurveDemo (Session 4, slide 35).
 * Hassan's night as an emotion curve, drawn one stage at a time. Under each point: the pain and the opportunity.
 * AHA: the curve tells you where to focus. The lowest point (Change, 03:30) is the biggest opportunity;
 * the high points are not where the design effort pays off.
 * Feeling scale: 1 = stressed, 5 = calm (case file).
 */

interface Stage {
  name: string;
  time: string;
  feel: number;
  pain: string;
  opp: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    name: 'Prepare',
    time: '01:00',
    feel: 4,
    pain: 'reading the order sheet',
    opp: 'orders ready and clear',
    detail: '01:00 the shift starts and Hassan reads the order sheet.',
  },
  {
    name: 'Plan',
    time: '01:30',
    feel: 3,
    pain: 'writing on the whiteboard takes 8 min',
    opp: 'plan appears itself',
    detail: '01:30 the dough is ready and Hassan writes the bake plan on the whiteboard: 8 minutes (note 1).',
  },
  {
    name: 'Bake',
    time: '02:00 to 05:00',
    feel: 3,
    pain: 'ovens idle 6 min',
    opp: 'next batch visible at distance',
    detail: '02:00 first bake, ovens run 40-minute cycles. At 03:45 Oven 2 waits 6 minutes: nobody knows what comes next (note 5).',
  },
  {
    name: 'Change',
    time: '03:30',
    feel: 1,
    pain: 'change in a corner is missed',
    opp: 'changes reach everyone at once',
    detail: '03:30 is the deadline for shop changes. A line in a corner is missed (notes 3, 4) and one was wiped away (note 6).',
  },
  {
    name: 'Pack',
    time: '04:30',
    feel: 2,
    pain: '“which shop first?” three times',
    opp: 'packing order shown',
    detail: '04:30 packing starts. Youssef asks “which shop first?” three times and no one answers over the noise (note 7).',
  },
  {
    name: 'Load',
    time: '05:30',
    feel: 2,
    pain: 'driver waits, calls Hassan',
    opp: 'route order known',
    detail: '05:30 loading. Amine waits at the dock without the route order, so he calls Hassan (note 9).',
  },
  {
    name: 'Handover',
    time: '06:00',
    feel: 4,
    pain: 'relief only if it worked',
    opp: 'a clear record for the next shift',
    detail: '06:00 the vans leave. Relief if it all worked, then a short handover to the next shift.',
  },
];

const N = STAGES.length;
const CH = 210; // chart height
const PAD = 30;
const yOf = (f: number) => PAD + ((5 - f) / 4) * (CH - 2 * PAD);
const feelColor = (f: number) => (f <= 2 ? '#E5391C' : f === 3 ? '#d97706' : '#059669');

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const JourneyCurveDemo: React.FC = () => {
  const [k, setK] = useState(0); // stages revealed
  const [sel, setSel] = useState<number | null>(null);
  const [w, setW] = useState(1700);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const xOf = (i: number) => ((i + 0.5) / N) * w;

  const next = () => {
    if (k >= N) return;
    setK(k + 1);
    setSel(k);
  };
  const reset = () => {
    setK(0);
    setSel(null);
  };

  const segs: string[] = [];
  for (let i = 1; i < k; i++) {
    const x0 = xOf(i - 1);
    const y0 = yOf(STAGES[i - 1].feel);
    const x1 = xOf(i);
    const y1 = yOf(STAGES[i].feel);
    const xm = (x0 + x1) / 2;
    segs.push(`M ${x0} ${y0} C ${xm} ${y0}, ${xm} ${y1}, ${x1} ${y1}`);
  }
  const lowShown = k >= 4;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <style>{`
        @keyframes jc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes jc-pop { 0% { transform: scale(0); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }
        @keyframes jc-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Controls + detail */}
      <div className="flex-shrink-0 h-[64px] flex items-center gap-4">
        <button onClick={next} disabled={k >= N} className={`${PRIMARY} w-[230px]`}>
          <StepForward className="w-6 h-6" />
          {k >= N ? 'All stages' : k === 0 ? 'First stage' : 'Next stage'}
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1 min-w-0 text-[24px] leading-[1.15] text-[#525254]">
          {sel === null ? (
            <span>Think in silence: in Hassan{'’'}s night, where do you expect the lowest mood?</span>
          ) : (
            <span>
              <span className="font-bold text-[#222222]">{STAGES[sel].name}, feeling {STAGES[sel].feel} of 5. </span>
              {STAGES[sel].detail}
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-shrink-0 flex gap-2" style={{ height: CH + 62 }}>
        <div className="w-[100px] flex-shrink-0 flex flex-col justify-between py-2" style={{ height: CH }}>
          <div className="flex flex-col items-center text-emerald-700">
            <Smile className="w-7 h-7" />
            <span className="text-[22px] leading-none">5 calm</span>
          </div>
          <div className="flex flex-col items-center text-[#E5391C]">
            <Frown className="w-7 h-7" />
            <span className="text-[22px] leading-none">1 stressed</span>
          </div>
        </div>
        <div ref={ref} className="flex-1 min-w-0 relative">
          <div className="absolute left-0 right-0 top-0 bg-white border border-[#E8E2D9] rounded-2xl" style={{ height: CH }} />
          <svg className="absolute left-0 top-0" width={w} height={CH}>
            {[1, 2, 3, 4, 5].map((f) => (
              <line key={f} x1={0} x2={w} y1={yOf(f)} y2={yOf(f)} stroke="#E8E2D9" strokeDasharray="3 8" />
            ))}
            {segs.map((d, i) => (
              <path
                key={i}
                d={d}
                pathLength={1}
                fill="none"
                stroke="#222222"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray="1"
                style={{ animation: 'jc-draw 0.7s ease-out both' }}
              />
            ))}
            {lowShown && (
              <line
                x1={xOf(3)}
                x2={xOf(3)}
                y1={96}
                y2={yOf(1) - 22}
                stroke="#E5391C"
                strokeWidth={3}
                strokeDasharray="6 6"
              />
            )}
          </svg>

          {STAGES.map((s, i) => {
            const shown = i < k;
            return (
              <React.Fragment key={s.name}>
                {shown && (
                  <button
                    onClick={() => setSel(i)}
                    className="absolute"
                    style={{ left: xOf(i) - 20, top: yOf(s.feel) - 20, width: 40, height: 40 }}
                    aria-label={s.name}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center text-white text-[24px] font-bold border-[3px] border-white ${
                        sel === i ? 'ring-4 ring-[#222222]' : ''
                      }`}
                      style={{ background: feelColor(s.feel), animation: `jc-pop 0.5s ${i === k - 1 ? '0.5s' : '0s'} both` }}
                    >
                      {s.feel}
                    </div>
                  </button>
                )}
                {/* stage label under the chart */}
                <button
                  onClick={() => shown && setSel(i)}
                  className={`absolute text-center ${shown ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ left: xOf(i) - w / N / 2, width: w / N, top: CH + 6 }}
                >
                  <div className={`text-[26px] font-bold leading-[1.1] ${sel === i ? 'text-[#E5391C]' : shown ? 'text-[#222222]' : 'text-[#6E6D70]'}`}>
                    {i + 1} {s.name}
                  </div>
                  <div className="text-[22px] leading-[1.2] text-[#6E6D70] whitespace-nowrap">{s.time}</div>
                </button>
              </React.Fragment>
            );
          })}

          {lowShown && (
            <div
              className="absolute rounded-xl bg-[#E5391C] text-white px-4 py-1.5 text-center"
              style={{ left: xOf(3) - 180, width: 360, top: 14, animation: 'jc-rise 0.5s 0.9s both' }}
            >
              <div className="text-[26px] font-bold leading-[1.15]">Biggest opportunity</div>
              <div className="text-[22px] leading-[1.15]">the lowest point of the night</div>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 min-h-0 flex gap-2">
        <div className="w-[100px] flex-shrink-0 flex flex-col gap-2">
          <div className="flex-1 flex items-center justify-center text-[22px] font-bold text-[#C92B10] gap-1">
            <AlertTriangle className="w-6 h-6" /> Pain
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-[22px] font-bold text-emerald-700 text-center leading-[1.1]">
            <Lightbulb className="w-6 h-6" /> Chance
          </div>
        </div>
        <div className="flex-1 min-w-0 grid gap-2" style={{ gridTemplateColumns: `repeat(${N}, minmax(0,1fr))` }}>
          {STAGES.map((s, i) => {
            const shown = i < k;
            const star = lowShown && i === 3;
            return (
              <div key={s.name} className="min-h-0 flex flex-col gap-2" style={shown ? { animation: 'jc-rise 0.5s 0.6s both' } : undefined}>
                <button
                  onClick={() => shown && setSel(i)}
                  className={`flex-1 min-h-0 rounded-xl border p-2.5 text-left text-[24px] leading-[1.15] overflow-hidden ${
                    shown ? 'bg-red-50 border-red-200 text-[#222222]' : 'bg-transparent border-dashed border-[#E8E2D9]'
                  } ${sel === i ? 'ring-2 ring-[#222222]' : ''}`}
                >
                  {shown ? s.pain : ''}
                </button>
                <button
                  onClick={() => shown && setSel(i)}
                  className={`flex-1 min-h-0 rounded-xl p-2.5 text-left text-[24px] leading-[1.15] overflow-hidden border ${
                    shown ? 'bg-emerald-50 border-emerald-300 text-[#222222]' : 'bg-transparent border-dashed border-[#E8E2D9]'
                  } ${star ? 'ring-4 ring-[#E5391C] font-bold' : ''} ${sel === i ? 'ring-2 ring-[#222222]' : ''}`}
                >
                  {shown ? s.opp : ''}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
