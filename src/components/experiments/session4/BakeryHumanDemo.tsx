import React, { useEffect, useRef, useState } from 'react';
import {
  Hand,
  Glasses,
  Volume2,
  Brain,
  RotateCcw,
  Play,
  Eye,
  EyeOff,
  Check,
  X,
  Ear,
  User,
  Flame,
  Layers,
  ChevronRight,
  Timer,
  Lightbulb,
} from 'lucide-react';

/*
 * BakeryHumanDemo: four mini-experiments that turn the hall's constraints into limits of people (Session 2 links).
 * AHA: the hall's limits are the limits of people: big and close wins, size must match distance, sound is masked,
 * and memory holds about four chunks. All numbers are rules of thumb / "in our case", not measurements.
 */

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px] transition-colors';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;
const SEG_ON = `${BTN} bg-[#222222] text-white border border-[#222222]`;
const SEG_OFF = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;

type TabKey = 'gloves' | 'distance' | 'noise' | 'memory';
const TABS: { key: TabKey; label: string; Icon: React.ElementType; link: string }[] = [
  { key: 'gloves', label: 'Gloves', Icon: Hand, link: 'Session 2: Fitts’ law' },
  { key: 'distance', label: 'Distance', Icon: Glasses, link: 'Session 2: legibility' },
  { key: 'noise', label: 'Noise', Icon: Volume2, link: 'Session 2: the senses' },
  { key: 'memory', label: 'Memory', Icon: Brain, link: 'Session 2: chunking' },
];

const Slider: React.FC<{ label: string; value: string; min: number; max: number; step: number; v: number; onChange: (n: number) => void }> = ({
  label, value, min, max, step, v, onChange,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-baseline justify-between">
      <div className="text-[24px] text-[#525254]">{label}</div>
      <div className="text-[30px] font-bold text-[#222222] tabular-nums">{value}</div>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={v}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-14 cursor-pointer accent-[#E5391C]"
    />
  </div>
);

/* ------------------------------ (a) Gloves vs target ------------------------------ */
// fixed pseudo-random tap offsets (unit scatter), so the lesson never changes between runs
const TAPS: [number, number][] = [
  [-0.4, 0.9], [1.1, -0.2], [0.2, 0.3], [-1.3, 0.5], [0.7, -1.1], [-0.2, -0.6],
  [1.6, 0.8], [-0.9, -1.4], [0.3, 1.5], [-1.7, -0.3], [0.1, -0.1], [1.0, 1.2],
];
const PXMM = 9;

const GlovesTab: React.FC<{ shown: number; glove: boolean; setGlove: (b: boolean) => void; size: number; setSize: (n: number) => void; dist: number; setDist: (n: number) => void }> = ({
  shown, glove, setGlove, size, setSize, dist, setDist,
}) => {
  const sd = glove ? 8 : 3; // mm of scatter of a tap (illustrative)
  const finger = glove ? 24 : 10; // mm contact diameter (illustrative)
  const cx = 150 + dist * 13;
  const cy = 310;
  const hits = TAPS.slice(0, shown).filter(([x, y]) => Math.hypot(x, y) * sd <= size / 2).length;
  const done = shown >= TAPS.length;
  const id = Math.log2((dist * 10) / size + 1); // Fitts index of difficulty
  const effort = Math.min(1, id / 6.2);
  const bad = done && hits <= 6;
  const mid = done && hits > 6 && hits < TAPS.length - 1;
  return (
    <div className="h-full flex gap-4 min-h-0">
      <div className="relative flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden" style={{ width: 1060, height: 590 }}>
        <div className="absolute left-5 top-4 text-[22px] font-mono text-[#6E6D70]">A button on a panel, seen from the front (to scale: 1 mm = 9 px)</div>
        {/* path from hand to button */}
        <div className="absolute border-t-[3px] border-dashed border-[#B8B2A7]" style={{ left: 150, top: cy, width: cx - 150 }} />
        <div className="absolute rounded-full bg-stone-200 border-2 border-[#525254] flex items-center justify-center" style={{ left: 150 - 44, top: cy - 44, width: 88, height: 88 }}>
          <Hand className="w-11 h-11 text-[#525254]" />
        </div>
        <div className="absolute text-[24px] text-[#525254] whitespace-nowrap" style={{ left: 150 - 44, top: cy + 52 }}>Your hand</div>
        <div className="absolute text-[24px] font-bold text-[#222222] bg-white px-2 rounded" style={{ left: 150 + (cx - 150) / 2 - 80, top: cy - 100, width: 160, textAlign: 'center' }}>
          {dist} cm
        </div>
        {/* button */}
        <div
          className="absolute rounded-xl bg-[#E5391C] text-white flex items-center justify-center font-bold text-[24px] transition-all duration-300"
          style={{ left: cx - (size * PXMM) / 2, top: cy - (size * PXMM) / 2, width: size * PXMM, height: size * PXMM }}
        >
          {size >= 12 ? 'OK' : ''}
        </div>
        {/* fingertip contact circle */}
        <div
          className={`absolute rounded-full border-[3px] border-dashed ${glove ? 'border-amber-600 bg-amber-300/30' : 'border-blue-600 bg-blue-300/30'} transition-all duration-300 pointer-events-none`}
          style={{ left: cx - (finger * PXMM) / 2, top: cy - (finger * PXMM) / 2, width: finger * PXMM, height: finger * PXMM }}
        />
        {/* taps */}
        {TAPS.slice(0, shown).map(([x, y], i) => {
          const hit = Math.hypot(x, y) * sd <= size / 2;
          return (
            <div
              key={i}
              className={`absolute w-5 h-5 rounded-full border-2 border-white shadow transition-all duration-300 ${hit ? 'bg-emerald-600' : 'bg-[#222222]'}`}
              style={{ left: cx + x * sd * PXMM - 10, top: cy + y * sd * PXMM - 10 }}
            />
          );
        })}
        <div className="absolute left-5 bottom-4 flex items-center gap-5 text-[22px] text-[#525254]">
          <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-600" /> hit</span>
          <span className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#222222]" /> miss</span>
          <span className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full border-2 border-dashed ${glove ? 'border-amber-600' : 'border-blue-600'}`} />
            {glove ? 'floury glove tip, about 24 mm' : 'bare fingertip, about 10 mm'}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setGlove(false)} className={!glove ? SEG_ON : SEG_OFF}><Hand className="w-6 h-6" />Bare finger</button>
          <button onClick={() => setGlove(true)} className={glove ? SEG_ON : SEG_OFF}><Hand className="w-6 h-6" />Floury glove</button>
        </div>
        <Slider label="Button size" value={`${size} mm`} min={6} max={40} step={1} v={size} onChange={setSize} />
        <Slider label="Distance from your hand" value={`${dist} cm`} min={5} max={40} step={1} v={dist} onChange={setDist} />
        <div>
          <div className="text-[24px] text-[#525254] mb-1">Effort to hit it (Fitts' law)</div>
          <div className="h-6 rounded-full bg-[#E8E2D9] overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${effort > 0.66 ? 'bg-[#E5391C]' : effort > 0.4 ? 'bg-amber-500' : 'bg-emerald-600'}`} style={{ width: `${effort * 100}%` }} />
          </div>
        </div>
        <div
          className={`flex-1 min-h-0 rounded-2xl border-2 px-5 py-3 flex flex-col justify-center ${
            !shown ? 'border-[#E8E2D9] bg-[#FAF9F6]' : bad ? 'border-[#E5391C] bg-[#FDECE8]' : mid ? 'border-amber-500 bg-amber-50' : done ? 'border-emerald-600 bg-emerald-50' : 'border-[#E8E2D9] bg-white'
          }`}
        >
          {!shown ? (
            <div className="text-[26px] leading-[1.25] text-[#525254]">Think in silence: with a floury glove, how big must the button be? Then press Tap 12 times.</div>
          ) : (
            <>
              <div className="text-[34px] leading-tight font-bold text-[#222222] tabular-nums">{hits} of {shown} taps hit</div>
              {done && (
                <div className="text-[26px] leading-[1.2] text-[#222222] mt-1">
                  {bad ? 'The glove is bigger than the target: misses everywhere.' : mid ? 'Some misses: slower and annoying.' : 'Big and close wins.'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ (b) Reading distance ------------------------------ */
const DistanceTab: React.FC<{ d: number; setD: (n: number) => void; h: number; setH: (n: number) => void }> = ({ d, setD, h, setH }) => {
  const minH = d * 5; // mm: distance / 200 (rule of thumb)
  const comfH = d * 10; // mm: distance / 100
  const rho = h / minH;
  const blur = rho >= 2 ? 0 : rho >= 1 ? (2 - rho) * 1.8 : 1.8 + (1 - rho) * 9;
  const verdict = rho >= 2 ? { t: 'Comfortable to read from here.', c: 'border-emerald-600 bg-emerald-50', I: Check, ic: 'text-emerald-700' }
    : rho >= 1 ? { t: 'Bare minimum: tiring, easy to misread.', c: 'border-amber-500 bg-amber-50', I: Eye, ic: 'text-amber-600' }
    : { t: 'Too small: Salma has to walk over.', c: 'border-[#E5391C] bg-[#FDECE8]', I: X, ic: 'text-[#E5391C]' };
  const RX0 = 60;
  const PER = 190;
  const personX = 1000 - d * PER;
  return (
    <div className="h-full flex gap-4 min-h-0">
      <div className="flex-shrink-0 flex flex-col gap-3" style={{ width: 1060 }}>
        <div className="relative rounded-2xl border-[6px] border-[#B8B2A7] bg-white flex items-center justify-center overflow-hidden" style={{ height: 340 }}>
          <div className="absolute left-4 top-3 text-[22px] font-mono text-[#6E6D70]">What you see, to scale for the distance</div>
          <div
            className="font-bold text-blue-900 whitespace-nowrap transition-all duration-300"
            style={{ fontSize: h * 2, lineHeight: 1.1, filter: `blur(${blur}px)`, opacity: rho < 1 ? 0.7 : 1, fontFamily: '"Comic Sans MS", "Segoe Print", cursive' }}
          >
            Shop 14 +60 baguettes
          </div>
        </div>
        <div className="relative flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden">
          <div className="absolute left-4 top-3 text-[22px] font-mono text-[#6E6D70]">Top view: where you stand</div>
          <div className="absolute rounded bg-[#FDECE8]" style={{ left: 1000 - 4 * PER, width: 2 * PER, top: 104, height: 36 }} />
          <div className="absolute text-[22px] text-[#C92B10] font-bold whitespace-nowrap" style={{ left: 1000 - 4 * PER, top: 172 }}>
            where the team works, 2 to 4 m
          </div>
          <div className="absolute border-t-[3px] border-[#525254]" style={{ left: RX0, width: 1000 - RX0, top: 120 }} />
          {[1, 2, 3, 4, 5].map((m) => (
            <div key={m} className="absolute text-[22px] text-[#525254] whitespace-nowrap" style={{ left: 1000 - m * PER - 20, top: 142 }}>
              <div className="absolute w-0.5 h-3 bg-[#525254]" style={{ left: 20, top: -12 }} />
              {m} m
            </div>
          ))}
          <div className="absolute w-3 rounded bg-[#222222]" style={{ left: 996, top: 56, height: 84 }} />
          <div className="absolute text-[22px] font-bold text-[#222222]" style={{ left: 940, top: 28 }}>Board</div>
          <div className="absolute rounded-full bg-[#222222] text-white flex items-center justify-center transition-all duration-300" style={{ left: personX - 28, top: 44, width: 56, height: 56 }}>
            <User className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        <Slider label="Distance to the board" value={`${d} m`} min={1} max={5} step={0.5} v={d} onChange={setD} />
        <Slider label="Letter height" value={`${h} mm`} min={10} max={45} step={5} v={h} onChange={setH} />
        <div className="rounded-xl border border-[#E8E2D9] bg-white px-4 py-3">
          <div className="text-[22px] font-mono text-[#6E6D70]">Rule of thumb at {d} m</div>
          <div className="text-[26px] leading-[1.25] text-[#222222]">
            bare minimum <b>{minH} mm</b> (distance / 200)<br />
            comfortable <b>{comfH} mm</b> (distance / 100)
          </div>
        </div>
        <div className={`flex-1 min-h-0 rounded-2xl border-2 px-5 py-3 flex items-center gap-4 transition-colors duration-300 ${verdict.c}`}>
          <verdict.I className={`w-12 h-12 flex-shrink-0 ${verdict.ic}`} />
          <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">{verdict.t}</div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ (c) Noise ------------------------------ */
const HALL_DB = 80;
const dbX = (db: number) => ((db - 40) / 70) * 920;

const NoiseTab: React.FC<{ beepTick: number; level: number; setLevel: (n: number) => void; change: boolean }> = ({ beepTick, level, setLevel, change }) => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!beepTick) return;
    setOn(true);
    const id = window.setTimeout(() => setOn(false), 2400);
    return () => window.clearTimeout(id);
  }, [beepTick]);
  const heard = level >= HALL_DB + 10;
  const played = beepTick > 0;
  return (
    <div className="h-full flex gap-4 min-h-0">
      <style>{`
        @keyframes fbStripe { from { background-position: 0 0; } to { background-position: 56px 0; } }
        @keyframes fbBeep { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes fbPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(229,57,28,0.55); } 50% { box-shadow: 0 0 0 14px rgba(229,57,28,0); } }
      `}</style>
      <div className="flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white px-6 py-4 flex flex-col gap-4" style={{ width: 1060 }}>
        <div className="text-[22px] font-mono text-[#6E6D70]">Loudness in decibels (dB)</div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Flame className="w-8 h-8 text-[#E5391C]" />
            <div className="text-[28px] font-bold text-[#222222]">The hall: {HALL_DB} dB</div>
          </div>
          <div className="relative h-14 rounded-lg bg-[#F1ECE3]" style={{ width: 920 }}>
            <div
              className="absolute inset-y-0 left-0 rounded-lg"
              style={{
                width: dbX(HALL_DB),
                backgroundColor: '#6E6D70',
                backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.25) 0 14px, transparent 14px 28px)',
                backgroundSize: '56px 100%',
                animation: 'fbStripe 0.7s linear infinite',
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Volume2 className="w-8 h-8 text-blue-600" />
            <div className="text-[28px] font-bold text-[#222222]">A sound alert: {level} dB</div>
            {played && (
              <div className={`ml-auto flex items-center gap-2 text-[26px] font-bold ${heard ? 'text-emerald-700' : 'text-[#E5391C]'}`}>
                {heard ? <Check className="w-7 h-7" /> : <X className="w-7 h-7" />}
                {heard ? 'Heard, but painful and unsafe' : 'Lost in the noise'}
              </div>
            )}
          </div>
          <div className="relative h-14 rounded-lg bg-[#F1ECE3]" style={{ width: 920 }}>
            <div
              className="absolute inset-y-0 left-0 rounded-lg bg-blue-600 transition-all duration-300"
              style={{ width: dbX(level), animation: on ? 'fbBeep 0.4s ease-in-out infinite' : undefined, opacity: played ? 1 : 0.35 }}
            />
            {/* the hall noise drowns the part of the alert below it */}
            {played && (
              <div className="absolute inset-y-0 left-0 rounded-l-lg bg-[#6E6D70]/60" style={{ width: Math.min(dbX(level), dbX(HALL_DB)) }} />
            )}
            <div className="absolute top-[-8px] bottom-[-8px] border-l-4 border-dashed border-[#E5391C]" style={{ left: dbX(HALL_DB + 10) }} />
          </div>
          <div className="relative h-16" style={{ width: 920 }}>
            {[40, 60, 80, 100].map((d) => (
              <div key={d} className="absolute text-[22px] text-[#525254]" style={{ left: dbX(d) - 20 }}>{d}</div>
            ))}
            <div className="absolute text-[22px] font-bold text-[#E5391C] whitespace-nowrap" style={{ left: dbX(HALL_DB + 10) - 200, top: 32, width: 400, textAlign: 'center' }}>
              rule of thumb: +10 dB over the noise
            </div>
          </div>
        </div>
        <div className="w-[920px]">
          <Slider label="Make the alert louder" value={`${level} dB`} min={50} max={100} step={5} v={level} onChange={setLevel} />
        </div>
        <div className="flex items-center gap-3 text-[24px] text-[#525254] leading-[1.2]">
          <Ear className="w-8 h-8 flex-shrink-0" />
          To be heard, the alert must be much louder than the hall, which hurts the ears and hides other warnings.
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        <div className="text-[22px] font-mono text-[#6E6D70]">The same change, shown on a board</div>
        <div className="rounded-2xl border-[6px] border-[#B8B2A7] bg-white px-5 py-4 flex flex-col gap-2">
          {[['Oven 1', 'Baguettes'], ['Oven 2', 'Croissants'], ['Oven 3', 'Bread']].map(([o, p]) => (
            <div key={o} className="flex items-center gap-3 text-[28px] text-[#222222]">
              <b className="w-[120px]">{o}</b>
              {p}
            </div>
          ))}
          <div
            className={`rounded-xl px-3 py-2 flex items-center gap-3 text-[28px] font-bold border-2 transition-all duration-500 ${
              change ? 'border-[#E5391C] bg-[#FDECE8] text-[#222222]' : 'border-dashed border-[#E8E2D9] text-transparent'
            }`}
            style={change ? { animation: 'fbPulse 1.6s ease-in-out infinite' } : undefined}
          >
            <span className={`rounded-md px-2 text-white ${change ? 'bg-[#E5391C]' : 'bg-transparent'}`}>NEW</span>
            Shop 14: +60 baguettes
          </div>
        </div>
        <div
          className={`flex-1 min-h-0 rounded-2xl border-2 px-5 py-3 flex items-center gap-4 ${
            change ? 'border-emerald-600 bg-emerald-50' : 'border-[#E8E2D9] bg-[#FAF9F6]'
          }`}
        >
          {change ? (
            <>
              <Eye className="w-10 h-10 text-emerald-700 flex-shrink-0" />
              <div className="text-[28px] leading-[1.2] font-bold text-[#222222]">
                A visual change is not masked by noise. Calm, not flashing: nothing may distract someone at an oven.
              </div>
            </>
          ) : (
            <>
              <EyeOff className="w-9 h-9 text-[#6E6D70] flex-shrink-0" />
              <div className="text-[26px] leading-[1.25] text-[#525254]">
                {played ? 'The alert was lost. What could carry the change instead?' : 'Think in silence: would Salma hear a beep over 80 dB? Then press Play the beep.'}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ (d) Memory ------------------------------ */
interface Line { shop: string; item: string; qty: number }
const LINES: Line[] = [
  { shop: 'Shop 14', item: 'baguettes', qty: 60 },
  { shop: 'Shop 22', item: 'croissants', qty: 40 },
  { shop: 'Shop 7', item: 'rolls', qty: 80 },
  { shop: 'Shop 14', item: 'croissants', qty: 30 },
  { shop: 'Shop 22', item: 'baguettes', qty: 50 },
  { shop: 'Shop 7', item: 'croissants', qty: 20 },
  { shop: 'Shop 14', item: 'rolls', qty: 40 },
  { shop: 'Shop 22', item: 'rolls', qty: 60 },
];
const SHOPS = ['Shop 14', 'Shop 22', 'Shop 7'];
const STICK = [0, 1, 6, 7]; // typical: first and last lines stick

const MemoryTab: React.FC<{ phase: number; left: number }> = ({ phase, left }) => {
  // phase 0 idle, 1 flashing, 2 hidden, 3 what sticks, 4 regrouped by shop
  const pos = (i: number) => {
    if (phase >= 4) {
      const g = SHOPS.indexOf(LINES[i].shop);
      const idx = LINES.slice(0, i).filter((l) => l.shop === LINES[i].shop).length;
      return { x: g * 360, y: 10 + idx * 92, w: 340 };
    }
    return { x: (i % 2) * 530, y: Math.floor(i / 2) * 108, w: 510 };
  };
  const visible = phase === 1 || phase >= 3;
  return (
    <div className="h-full flex gap-4 min-h-0">
      <div className="relative flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white" style={{ width: 1100, height: 590 }}>
        <div className="absolute" style={{ left: 30, top: 70 }}>
          {SHOPS.map((s, g) => (
            <div
              key={s}
              className={`absolute rounded-xl bg-emerald-100 border-2 border-emerald-600 text-[28px] font-bold text-emerald-900 px-4 flex items-center transition-opacity duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: g * 360, top: -62, width: 340, height: 56 }}
            >
              Chunk {g + 1}: {s}
            </div>
          ))}
          {LINES.map((l, i) => {
            const p = pos(i);
            const sticks = phase === 3 && STICK.includes(i);
            const faded = phase === 3 && !sticks;
            return (
              <div
                key={i}
                className={`absolute rounded-xl border-2 px-4 flex items-center gap-3 text-[28px] font-semibold transition-all duration-700 ${
                  visible ? '' : 'opacity-0'
                } ${sticks ? 'bg-[#222222] text-white border-[#222222]' : 'bg-white text-[#222222] border-[#CFC8BC]'} ${faded ? 'opacity-25' : ''}`}
                style={{ left: p.x, top: p.y, width: p.w, height: phase >= 4 ? 82 : 96 }}
              >
                <span className="w-9 h-9 rounded-full bg-stone-200 text-[#525254] text-[22px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                {phase >= 4 ? `${l.qty} ${l.item}` : `${l.shop} · ${l.qty} ${l.item}`}
              </div>
            );
          })}
        </div>
        {phase === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#525254]">
            <Layers className="w-14 h-14" />
            <div className="text-[30px]">Eight order lines are ready.</div>
          </div>
        )}
        {phase === 1 && (
          <div className="absolute left-8 right-8 bottom-6 flex items-center gap-4">
            <Timer className="w-8 h-8 text-[#E5391C]" />
            <div className="flex-1 h-5 rounded-full bg-[#E8E2D9] overflow-hidden">
              <div className="h-full bg-[#E5391C] rounded-full" style={{ width: `${(left / 3) * 100}%`, transition: 'width 0.1s linear' }} />
            </div>
            <div className="text-[26px] font-bold text-[#222222] tabular-nums w-[70px]">{left.toFixed(1)} s</div>
          </div>
        )}
        {phase === 2 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-16">
            <EyeOff className="w-14 h-14 text-[#6E6D70]" />
            <div className="text-[34px] leading-[1.25] font-bold text-[#222222]">Hidden. Write silently what you remember.</div>
            <div className="text-[26px] text-[#525254]">Nobody shares it. The lecturer reveals what usually sticks.</div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3 min-h-0">
        <div className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-4">
          <div className="text-[22px] font-mono text-[#6E6D70]">Working memory</div>
          <div className="flex gap-3 mt-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const filled = phase === 3 ? i < 4 : phase >= 4 ? i < 3 : false;
              return (
                <div
                  key={i}
                  className={`flex-1 h-14 rounded-lg border-2 transition-all duration-500 ${
                    i >= 4 ? 'border-dashed border-[#E8E2D9] bg-[#F5F2EC]' : filled ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-[#CFC8BC]'
                  } ${i < 4 ? '' : 'opacity-50'}`}
                />
              );
            })}
          </div>
          <div className="text-[22px] text-[#525254] mt-2">about 4 slots (rule of thumb)</div>
        </div>
        <div
          className={`flex-1 min-h-0 rounded-2xl border-2 px-5 py-3 flex flex-col justify-center gap-2 transition-colors duration-500 ${
            phase >= 4 ? 'border-emerald-600 bg-emerald-50' : phase === 3 ? 'border-amber-500 bg-amber-50' : 'border-[#E8E2D9] bg-[#FAF9F6]'
          }`}
        >
          {phase <= 1 && <div className="text-[26px] leading-[1.25] text-[#525254]">Eight lines at once is more than most people can hold. Press Flash for 3 seconds.</div>}
          {phase === 2 && <div className="text-[26px] leading-[1.25] text-[#525254]">Count how many lines you kept. Then press Reveal.</div>}
          {phase === 3 && (
            <>
              <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">About 4 stick.</div>
              <div className="text-[26px] leading-[1.25] text-[#222222]">Typically the first and the last lines; the middle fades.</div>
            </>
          )}
          {phase >= 4 && (
            <>
              <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">8 lines became 3 chunks.</div>
              <div className="text-[26px] leading-[1.25] text-[#222222]">Grouped by shop, it fits. A board must do the grouping so the team does not have to remember.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Main ------------------------------ */
export const BakeryHumanDemo: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('gloves');
  // gloves
  const [glove, setGlove] = useState(true);
  const [size, setSize] = useState(12);
  const [dist, setDist] = useState(20);
  const [shown, setShown] = useState(0);
  // distance
  const [d, setD] = useState(3);
  const [h, setH] = useState(20);
  // noise
  const [level, setLevel] = useState(70);
  const [beepTick, setBeepTick] = useState(0);
  const [change, setChange] = useState(false);
  // memory
  const [phase, setPhase] = useState(0);
  const [left, setLeft] = useState(3);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearInterval(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const tapAll = () => {
    clearTimers();
    setShown(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= TAPS.length) window.clearInterval(id);
    }, 160);
    timers.current.push(id);
  };

  const flash = () => {
    clearTimers();
    setPhase(1);
    setLeft(3);
    let t = 3;
    const id = window.setInterval(() => {
      t = Math.max(0, +(t - 0.1).toFixed(1));
      setLeft(t);
      if (t <= 0) {
        window.clearInterval(id);
        setPhase(2);
      }
    }, 100);
    timers.current.push(id);
  };

  const reset = () => {
    clearTimers();
    setTab('gloves');
    setGlove(true); setSize(12); setDist(20); setShown(0);
    setD(3); setH(20);
    setLevel(70); setBeepTick(0); setChange(false);
    setPhase(0); setLeft(3);
  };

  const cur = TABS.find((t) => t.key === tab)!;
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-3">
        {TABS.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setTab(key)} className={`rounded-xl px-5 min-h-[56px] text-[26px] font-bold flex items-center gap-2 transition-colors border ${
            tab === key ? 'bg-[#222222] text-white border-[#222222]' : 'bg-white text-[#525254] border-[#E8E2D9] hover:bg-stone-100'
          }`}>
            <Icon className="w-7 h-7" />
            {label}
          </button>
        ))}
        <div className="text-[22px] text-[#6E6D70] ml-2 flex items-center gap-2 whitespace-nowrap">
          <Lightbulb className="w-6 h-6" />
          {cur.link}
        </div>
        <div className="flex-1" />
        {tab === 'gloves' && (
          <button onClick={tapAll} className={`${PRIMARY} min-w-[240px]`}>
            <Play className="w-6 h-6" />
            Tap 12 times
          </button>
        )}
        {tab === 'distance' && [2, 3, 4].map((m) => (
          <button key={m} onClick={() => setD(m)} className={d === m ? SEG_ON : SEG_OFF}>{m} m</button>
        ))}
        {tab === 'noise' && (
          <>
            <button onClick={() => setBeepTick((v) => v + 1)} className={PRIMARY}>
              <Volume2 className="w-6 h-6" />
              Play the beep
            </button>
            <button onClick={() => setChange((v) => !v)} className={change ? SEG_ON : SEG_OFF}>
              <Eye className="w-6 h-6" />
              {change ? 'Hide the change' : 'Show a visual change'}
            </button>
          </>
        )}
        {tab === 'memory' && (
          <button
            onClick={() => (phase === 0 ? flash() : phase === 2 ? setPhase(3) : phase === 3 ? setPhase(4) : undefined)}
            disabled={phase === 1 || phase >= 4}
            className={`${PRIMARY} min-w-[300px]`}
          >
            {phase === 0 ? 'Flash for 3 seconds' : phase === 1 ? 'Look…' : phase === 2 ? 'Reveal what sticks' : 'Regroup by shop'}
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>
      <div className="flex-1 min-h-0">
        {tab === 'gloves' && <GlovesTab shown={shown} glove={glove} setGlove={setGlove} size={size} setSize={setSize} dist={dist} setDist={setDist} />}
        {tab === 'distance' && <DistanceTab d={d} setD={setD} h={h} setH={setH} />}
        {tab === 'noise' && <NoiseTab beepTick={beepTick} level={level} setLevel={setLevel} change={change} />}
        {tab === 'memory' && <MemoryTab phase={phase} left={left} />}
      </div>
    </div>
  );
};
