import React, { useEffect, useState } from 'react';
import {
  ChefHat,
  Check,
  ClipboardList,
  Clock,
  Eye,
  Flame,
  Gauge,
  Megaphone,
  Package,
  PhoneCall,
  RotateCcw,
  Timer,
  User,
  Users,
  X,
} from 'lucide-react';

/*
 * ScenarioBranchDemo (Session 4, slide 32).
 * The 03:20 scene: shop 14 wants +60 baguettes, Oven 2 is mid-cycle. Hassan can do A, B or C.
 * Each option plays the same hall plan on the same clock, so the audience SEES who learns the change, and when.
 * AHA: the scenario exposes the need: the winning option is simply the one that lets the change reach everyone
 * within a minute. The need ("learn about a change within a minute") is visible in the story before any design.
 * All numbers are illustrative case numbers.
 */

type PId = 'o1' | 'salma' | 'o3' | 'youssef';
type ToneKey = 'amber' | 'emerald' | 'blue';

interface Person {
  id: PId;
  name: string;
  sub: string;
  x: number;
  y: number;
  Icon: React.ElementType;
}

const HX = 23; // Hassan x (%)
const HY = 50;

const PEOPLE: Person[] = [
  { id: 'o1', name: 'Oven 1 baker', sub: 'Oven 1', x: 47, y: 20, Icon: User },
  { id: 'salma', name: 'Salma', sub: 'Oven 2', x: 47, y: 50, Icon: User },
  { id: 'o3', name: 'Oven 3 baker', sub: 'Oven 3', x: 47, y: 80, Icon: User },
  { id: 'youssef', name: 'Youssef', sub: 'packing', x: 90, y: 80, Icon: Package },
];

interface Ev {
  t: number;
  text: string;
}

interface Opt {
  id: 'A' | 'B' | 'C';
  label: string;
  tone: ToneKey;
  end: number;
  missAt: number;
  learn: Record<PId, number | null>;
  events: Ev[];
  verdict: { head: string; body: string };
}

const OPTS: Opt[] = [
  {
    id: 'A',
    label: 'Write on the board and shout',
    tone: 'amber',
    end: 300,
    missAt: 240,
    learn: { o1: 40, salma: null, o3: null, youssef: null },
    events: [
      { t: 0, text: 'Hassan writes “+60 baguettes” in a corner of the board.' },
      { t: 20, text: 'He shouts across the hall.' },
      { t: 40, text: 'Only the Oven 1 baker hears. The hall is about 80 dB.' },
      { t: 150, text: 'Salma keeps baking the old quantity (note 4).' },
      { t: 240, text: 'A floury sleeve can wipe a corner line (note 6).' },
    ],
    verdict: {
      head: 'Salma misses it.',
      body: 'One person out of four knows. Shouting does not carry over the noise, and a note in a corner is easy to miss.',
    },
  },
  {
    id: 'B',
    label: 'Change the plan where all can see it, mark NEW',
    tone: 'emerald',
    end: 90,
    missAt: 9999,
    learn: { o1: 20, salma: 15, o3: 25, youssef: 40 },
    events: [
      { t: 0, text: 'Hassan changes the plan where everyone can see it.' },
      { t: 10, text: 'The new line is marked NEW.' },
      { t: 15, text: 'Salma sees NEW from Oven 2.' },
      { t: 40, text: 'Everyone has seen it: under a minute.' },
    ],
    verdict: {
      head: 'Everyone knows in under a minute.',
      body: 'A change that is visible from every station and marked NEW does not depend on who is listening.',
    },
  },
  {
    id: 'C',
    label: 'Call each baker',
    tone: 'blue',
    end: 300,
    missAt: 210,
    learn: { o1: 60, salma: 150, o3: null, youssef: null },
    events: [
      { t: 0, text: 'Hassan calls the Oven 1 baker.' },
      { t: 60, text: 'Oven 1 baker knows (1 minute).' },
      { t: 150, text: 'Salma knows (2 minutes 30).' },
      { t: 210, text: 'The Oven 3 baker is not reached. Oven 3 sits idle.' },
    ],
    verdict: {
      head: 'Two bakers reached, one oven idles.',
      body: 'Calling works one person at a time. It keeps Hassan busy on the phone, and the packer is never told.',
    },
  },
];

const TONE: Record<ToneKey, { bg: string; border: string; text: string; solid: string; line: string }> = {
  amber: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-800', solid: 'bg-amber-500', line: '#d97706' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-600', text: 'text-emerald-800', solid: 'bg-emerald-600', line: '#059669' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-600', text: 'text-blue-800', solid: 'bg-blue-600', line: '#2563eb' },
};

const SPEED = 4; // scene seconds per 100 ms tick (40 s per real second)

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

interface LineSpec {
  to: PId;
  kind: 'ok' | 'sound' | 'try';
}

const linesFor = (o: Opt, t: number): LineSpec[] => {
  const out: LineSpec[] = [];
  (Object.keys(o.learn) as PId[]).forEach((id) => {
    const l = o.learn[id];
    if (l !== null && t >= l) out.push({ to: id, kind: o.id === 'A' ? 'sound' : 'ok' });
  });
  if (o.id === 'C') {
    const cur: PId | null = t < 60 ? 'o1' : t < 150 ? 'salma' : t < 210 ? 'o3' : null;
    if (cur && !out.some((l) => l.to === cur)) out.push({ to: cur, kind: 'try' });
  }
  return out;
};

const hassanChip = (o: Opt | null, t: number): string => {
  if (!o) return 'Shop 14 is on the phone';
  if (o.id === 'A') return t < 20 ? 'Writing in a corner' : t < 100 ? 'Shouting' : 'Back to work';
  if (o.id === 'B') return t < 10 ? 'Changing the plan' : 'Plan is shared';
  if (t < 60) return 'Calling Oven 1 baker';
  if (t < 150) return 'Calling Salma';
  if (t < 210) return 'Calling Oven 3 baker';
  return 'Phone call over';
};

export const ScenarioBranchDemo: React.FC = () => {
  const [oi, setOi] = useState<number | null>(null);
  const [t, setT] = useState(0);
  const [showNeed, setShowNeed] = useState(false);
  const [seen, setSeen] = useState(false);

  const opt = oi === null ? null : OPTS[oi];
  const ended = opt !== null && t >= opt.end;

  useEffect(() => {
    if (!opt || ended) return;
    const id = window.setInterval(() => setT((v) => Math.min(opt.end, v + SPEED)), 100);
    return () => window.clearInterval(id);
  }, [opt, ended]);

  useEffect(() => {
    if (ended) setSeen(true);
  }, [ended]);

  const play = (i: number) => {
    setOi(i);
    setT(0);
    setShowNeed(false);
  };
  const reset = () => {
    setOi(null);
    setT(0);
    setShowNeed(false);
    setSeen(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Scene */}
      <div className="flex-shrink-0 h-[64px] flex items-center gap-4 bg-white border border-[#E8E2D9] rounded-2xl px-5">
        <div className="flex items-center gap-2 text-[#E5391C] flex-shrink-0">
          <Clock className="w-8 h-8" />
          <span className="text-[30px] font-bold font-mono">03:20</span>
        </div>
        <div className="flex-1 min-w-0 text-[28px] font-semibold text-[#222222] truncate">
          Shop 14 just phoned: +60 baguettes. Oven 2 is mid-cycle with croissants.
        </div>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      {/* Options */}
      <div className="flex-shrink-0 h-[76px] flex gap-3">
        {OPTS.map((o, i) => {
          const tn = TONE[o.tone];
          const sel = oi === i;
          return (
            <button
              key={o.id}
              onClick={() => play(i)}
              className={`flex-1 min-w-0 rounded-xl px-4 py-2 flex items-center gap-3 text-left text-[24px] font-bold leading-[1.15] border-2 transition-colors ${
                sel ? `${tn.bg} ${tn.border} ${tn.text}` : 'bg-white border-[#E8E2D9] text-[#222222] hover:bg-stone-100'
              }`}
            >
              <span className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-[26px] flex-shrink-0 ${tn.solid}`}>{o.id}</span>
              <span className="min-w-0">{o.label}</span>
            </button>
          );
        })}
        <button onClick={() => setShowNeed((s) => !s)} disabled={!seen} className={`${PRIMARY} w-[330px] flex-shrink-0`}>
          <Eye className="w-6 h-6" />
          {showNeed ? 'Back to the result' : 'What did Hassan need?'}
        </button>
      </div>

      {/* Hall + meters */}
      <div className="flex-1 min-h-0 flex gap-3">
        <Hall opt={opt} t={t} />
        <div className="w-[500px] flex-shrink-0 min-h-0 flex flex-col gap-3">
          <Meters opt={opt} t={t} />
          <Slot opt={opt} t={t} ended={ended} showNeed={showNeed} />
        </div>
      </div>
    </div>
  );
};

const Hall: React.FC<{ opt: Opt | null; t: number }> = ({ opt, t }) => {
  const tn = opt ? TONE[opt.tone] : TONE.amber;
  const lines = opt ? linesFor(opt, t) : [];
  const boardState: 'none' | 'corner' | 'new' = !opt ? 'none' : opt.id === 'A' ? 'corner' : opt.id === 'B' && t >= 0 ? 'new' : 'none';
  const clock = `03:${20 + Math.floor(t / 60)}`;
  const shouting = opt?.id === 'A' && t >= 20 && t < 100;

  return (
    <div className="flex-1 min-w-0 relative bg-white border border-[#E8E2D9] rounded-2xl overflow-hidden">
      {/* clock */}
      <div className="absolute left-4 top-3 flex items-baseline gap-3 z-20">
        <span className="text-[30px] font-bold font-mono text-[#222222]">{clock}</span>
        <span className="text-[24px] text-[#6E6D70] font-mono">+{fmt(t)}</span>
      </div>

      {/* lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((l) => {
          const p = PEOPLE.find((q) => q.id === l.to)!;
          return (
            <line
              key={l.to + l.kind}
              x1={HX}
              y1={HY}
              x2={p.x}
              y2={p.y}
              stroke={l.kind === 'try' ? '#6E6D70' : tn.line}
              strokeWidth={4}
              strokeDasharray={l.kind === 'ok' ? undefined : '10 8'}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* board */}
      <div className="absolute z-10" style={{ left: '8%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <div className="w-[190px] h-[190px] rounded-xl bg-[#FAF9F6] border-2 border-[#222222]/70 p-3 flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 text-[#525254] text-[22px] font-bold">
            <ClipboardList className="w-6 h-6" />
            Board
          </div>
          {[70, 85, 60].map((w, i) => (
            <div key={i} className="h-3 rounded bg-stone-300" style={{ width: `${w}%` }} />
          ))}
          {boardState === 'new' && (
            <div className="rounded-lg bg-emerald-600 text-white text-[22px] font-bold px-2 py-1 flex items-center justify-between animate-pulse">
              <span>14: +60</span>
              <span className="bg-white text-emerald-700 rounded px-1.5">NEW</span>
            </div>
          )}
          {boardState === 'corner' && t >= 5 && (
            <div className="absolute right-2 bottom-2 rounded bg-amber-200 text-amber-900 text-[22px] font-bold px-1.5 leading-[28px]">+60</div>
          )}
        </div>
      </div>

      {/* Hassan */}
      <div className="absolute z-10 flex flex-col items-center" style={{ left: `${HX}%`, top: `${HY}%`, transform: 'translate(-50%,-50%)' }}>
        <div className="relative">
          {shouting && <span className="absolute inset-0 rounded-full bg-amber-400/60 animate-ping" />}
          <div className="relative w-[72px] h-[72px] rounded-full bg-[#222222] text-white flex items-center justify-center">
            <ChefHat className="w-10 h-10" />
          </div>
          {(!opt || (opt.id === 'C' && t < 210)) && (
            <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-white border-2 border-[#E5391C] text-[#E5391C] flex items-center justify-center animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
          )}
          {shouting && (
            <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-white border-2 border-amber-500 text-amber-700 flex items-center justify-center">
              <Megaphone className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="text-[24px] font-bold text-[#222222] mt-1">Hassan</div>
        <div className="text-[22px] text-[#525254] bg-[#FAF9F6] border border-[#E8E2D9] rounded-full px-3 whitespace-nowrap">{hassanChip(opt, t)}</div>
      </div>

      {/* ovens */}
      {PEOPLE.slice(0, 3).map((p, i) => {
        const idle = opt?.id === 'C' && i === 2 && t >= 210;
        return (
          <div
            key={p.sub}
            className="absolute"
            style={{ left: '68%', top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
          >
            <div className={`w-[160px] rounded-xl border-2 px-3 py-2 ${idle ? 'border-amber-500 bg-amber-50' : 'border-[#E8E2D9] bg-[#FAF9F6]'}`}>
              <div className="flex items-center gap-2 text-[24px] font-bold text-[#222222]">
                <Flame className={`w-6 h-6 ${idle ? 'text-stone-400' : 'text-[#E5391C]'}`} />
                {p.sub}
              </div>
              <div className="text-[22px] text-[#525254]">
                {idle ? 'idle' : i === 1 ? 'croissants' : 'baking'}
              </div>
            </div>
          </div>
        );
      })}

      {/* people */}
      {PEOPLE.map((p) => {
        const learn = opt ? opt.learn[p.id] : null;
        const knows = opt !== null && learn !== null && t >= learn;
        const missed = opt !== null && learn === null && t >= opt.missAt;
        const chip = knows ? `knows · ${fmt(learn as number)}` : missed ? (p.id === 'youssef' ? 'not told' : 'missed it') : 'waiting';
        return (
          <div
            key={p.id}
            className="absolute z-10 flex flex-col items-center"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}
          >
            <div
              className={`relative w-[60px] h-[60px] rounded-full border-[3px] flex items-center justify-center transition-colors duration-300 ${
                knows ? 'bg-emerald-50 border-emerald-600 text-emerald-700' : missed ? 'bg-red-50 border-[#E5391C] text-[#E5391C]' : 'bg-white border-[#E8E2D9] text-[#525254]'
              }`}
            >
              <p.Icon className="w-8 h-8" />
              {(knows || missed) && (
                <span
                  className={`absolute -right-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center text-white ${knows ? 'bg-emerald-600' : 'bg-[#E5391C]'}`}
                >
                  {knows ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </span>
              )}
            </div>
            <div className="text-[24px] font-bold text-[#222222] leading-tight mt-1 whitespace-nowrap">{p.name}</div>
            <div
              className={`text-[22px] rounded-full px-3 whitespace-nowrap ${
                knows ? 'bg-emerald-100 text-emerald-800 font-semibold' : missed ? 'bg-red-100 text-[#C92B10] font-semibold' : 'bg-stone-100 text-[#6E6D70]'
              }`}
            >
              {chip}
            </div>
          </div>
        );
      })}

      {/* progress */}
      {opt && (
        <div className="absolute left-0 bottom-0 h-[8px] transition-all" style={{ width: `${(t / opt.end) * 100}%`, background: tn.line }} />
      )}
    </div>
  );
};

const Meter: React.FC<{ Icon: React.ElementType; label: string; value: string; frac: number; color: string }> = ({ Icon, label, value, frac, color }) => (
  <div className="bg-white border border-[#E8E2D9] rounded-xl px-4 py-2">
    <div className="flex items-center gap-2 text-[24px] leading-[30px]">
      <Icon className="w-6 h-6 text-[#525254]" />
      <span className="text-[#525254] font-semibold flex-1">{label}</span>
      <span className="font-bold text-[#222222]">{value}</span>
    </div>
    <div className="h-4 rounded-full bg-stone-100 mt-1 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-200" style={{ width: `${Math.max(0, Math.min(1, frac)) * 100}%`, background: color }} />
    </div>
  </div>
);

const Meters: React.FC<{ opt: Opt | null; t: number }> = ({ opt, t }) => {
  const ids = PEOPLE.map((p) => p.id);
  const reached = opt ? ids.filter((id) => opt.learn[id] !== null && t >= (opt.learn[id] as number)).length : 0;
  const allAt = opt && ids.every((id) => opt.learn[id] !== null) ? Math.max(...ids.map((id) => opt.learn[id] as number)) : null;
  const allKnow = allAt !== null && t >= allAt;
  const minutesVal = allKnow ? allAt : t;
  const risk = opt ? ((4 - reached) / 4) * Math.min(1, t / 90) : 0;
  const riskLabel = !opt ? 'not played' : risk < 0.15 ? 'Low' : risk < 0.6 ? 'Medium' : 'High';
  const riskColor = risk < 0.15 ? '#059669' : risk < 0.6 ? '#d97706' : '#E5391C';
  return (
    <div className="flex-shrink-0 flex flex-col gap-2">
      <Meter
        Icon={Users}
        label="People reached"
        value={`${reached} of 4`}
        frac={reached / 4}
        color={reached === 4 ? '#059669' : '#d97706'}
      />
      <Meter
        Icon={Timer}
        label="Time so far"
        value={opt ? (allKnow ? `${fmt(minutesVal)}, all know` : fmt(minutesVal)) : '0:00'}
        frac={minutesVal / 300}
        color={allKnow ? '#059669' : '#E5391C'}
      />
      <Meter Icon={Gauge} label="Risk" value={riskLabel} frac={risk} color={riskColor} />
    </div>
  );
};

const Slot: React.FC<{ opt: Opt | null; t: number; ended: boolean; showNeed: boolean }> = ({ opt, t, ended, showNeed }) => {
  const box = 'flex-1 min-h-0 rounded-xl border-2 p-4 flex flex-col justify-center gap-2 overflow-hidden';
  if (showNeed) {
    return (
      <div className={`${box} border-[#E5391C] bg-red-50`}>
        <div className="text-[28px] font-bold text-[#C92B10]">What Hassan needed to see</div>
        <div className="text-[28px] font-bold leading-[1.2] text-[#222222]">Every change reaches every station within a minute.</div>
        <div className="text-[24px] leading-[1.25] text-[#525254]">Not a louder shout. The need is about people, before any screen.</div>
      </div>
    );
  }
  if (!opt) {
    return (
      <div className={`${box} border-[#E8E2D9] bg-white`}>
        <div className="flex items-center gap-2 text-[30px] font-bold text-[#222222]">
          <Eye className="w-8 h-8 text-[#E5391C]" />
          Think in silence
        </div>
        <div className="text-[26px] leading-[1.25] text-[#525254]">Which option gets the change to everyone? Decide privately, then watch each one play.</div>
      </div>
    );
  }
  if (ended) {
    const tn = TONE[opt.tone];
    return (
      <div className={`${box} ${tn.border} ${tn.bg}`}>
        <div className="text-[30px] font-bold leading-[1.15] text-[#222222]">{opt.verdict.head}</div>
        <div className="text-[24px] leading-[1.25] text-[#222222]">{opt.verdict.body}</div>
      </div>
    );
  }
  const seen = opt.events.filter((e) => e.t <= t).slice(-3);
  return (
    <div className={`${box} border-[#E8E2D9] bg-white justify-end`}>
      {seen.map((e, i) => (
        <div key={e.t} className={`flex gap-2 text-[24px] leading-[1.15] ${i === seen.length - 1 ? 'text-[#222222] font-semibold' : 'text-[#6E6D70]'}`}>
          <span className="font-mono flex-shrink-0">{fmt(e.t)}</span>
          <span className="min-w-0">{e.text}</span>
        </div>
      ))}
    </div>
  );
};
