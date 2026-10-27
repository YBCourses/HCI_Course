import React, { useEffect, useRef, useState } from 'react';
import {
  Users,
  Map as MapIcon,
  Moon,
  ClipboardList,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  Wind,
  Flame,
  WifiOff,
  Hand,
  Ruler,
  Clock,
  Flame as OvenIcon,
  Package,
  Truck,
  Wheat,
  LayoutGrid,
  PenLine,
  Phone,
  MousePointerClick,
  Eye,
  EyeOff,
  Quote,
  AlertTriangle,
  ChevronRight,
  Lightbulb,
  Timer,
  Percent,
  CalendarX,
  MessageSquareWarning,
} from 'lucide-react';

/*
 * BakeryCaseDemo: the case file explorer for "Fresh Batch".
 * AHA: the problem is the whole situation (people, place, time, today's habits), not a screen.
 * Every number and quote comes from teacher/session4-case.md.
 */

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px] transition-colors';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

type TabKey = 'people' | 'place' | 'night' | 'today';
const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
  { key: 'people', label: 'People', Icon: Users },
  { key: 'place', label: 'Place', Icon: MapIcon },
  { key: 'night', label: 'Night', Icon: Moon },
  { key: 'today', label: 'Today', Icon: ClipboardList },
];

/* ---------------------------------- People ---------------------------------- */
interface Person {
  name: string;
  age: number;
  role: string;
  desc: string;
  where: string;
  seen: string;
  note: string;
  tone: string;
  tag?: string;
}
const PEOPLE: Person[] = [
  {
    name: 'Hassan', age: 52, role: 'Head baker',
    desc: '25 years in the job. Decides the night plan, reads Arabic and French, wears reading glasses.',
    where: 'Office and hall', seen: '“I do not need more information. I need to see the next thing, now.”', note: 'Note 11',
    tone: 'bg-[#E5391C]', tag: 'Primary',
  },
  {
    name: 'Salma', age: 29, role: 'Oven baker',
    desc: 'Moves between mixer and ovens, hands floury or in gloves, always carrying something.',
    where: 'Mixer and ovens', seen: '“My hands are never clean. I cannot touch anything.”', note: 'Note 12',
    tone: 'bg-blue-600', tag: 'Secondary',
  },
  {
    name: 'Youssef', age: 35, role: 'Packer',
    desc: 'Packs crates and checks labels. Reads numbers easily, French text less easily.',
    where: 'Packing table', seen: '“I read the numbers, the French words I guess.”', note: 'Note 8',
    tone: 'bg-emerald-600',
  },
  {
    name: 'Amine', age: 41, role: 'Delivery driver',
    desc: 'Loads the van from 05:00. Needs to know the shop order for the route.',
    where: 'Loading dock', seen: 'Waits at the dock, does not know the route order, so he calls Hassan.', note: 'Note 9',
    tone: 'bg-amber-600',
  },
  {
    name: 'Nadia', age: 38, role: 'Order manager',
    desc: 'Takes shop changes by phone and messaging (until 03:30), often from her phone at home at night.',
    where: 'At home, on the phone', seen: 'Phones: shop 14 wants 60 more baguettes.', note: 'Note 3',
    tone: 'bg-[#6E6D70]',
  },
];

const PeopleTab: React.FC = () => {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <div className="flex-1 min-h-0 grid grid-cols-5 gap-4">
        {PEOPLE.map((p, i) => {
          const on = sel === i;
          return (
            <button
              key={p.name}
              onClick={() => setSel(on ? null : i)}
              className={`min-h-0 text-left rounded-2xl bg-white px-5 py-4 flex flex-col gap-2 transition-all duration-300 ${
                on ? 'border-[3px] border-[#E5391C] shadow-lg -translate-y-1' : 'border border-[#E8E2D9] hover:bg-[#FAF9F6]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-[84px] h-[84px] rounded-full flex items-center justify-center text-white text-[34px] font-bold flex-shrink-0 ${p.tone}`}>
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-[30px] leading-tight font-bold text-[#222222]">{p.name}, {p.age}</div>
                  <div className="text-[24px] leading-tight text-[#525254]">{p.role}</div>
                </div>
              </div>
              {p.tag && (
                <div className="self-start rounded-full bg-[#FDECE8] border border-[#E5391C] text-[#C92B10] text-[22px] font-bold px-3 leading-[1.4]">
                  {p.tag} persona
                </div>
              )}
              <div className="text-[24px] leading-[1.25] text-[#222222]">{p.desc}</div>
              <div className="flex items-center gap-2 text-[22px] text-[#525254] mt-auto">
                <MapIcon className="w-6 h-6 flex-shrink-0 text-[#6E6D70]" />
                {p.where}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex-shrink-0 h-[132px] rounded-2xl border border-[#E8E2D9] bg-white px-6 flex items-center gap-5">
        {sel === null ? (
          <>
            <MousePointerClick className="w-10 h-10 text-[#6E6D70] flex-shrink-0" />
            <div className="text-[28px] text-[#525254]">Five people share one night. Click a person to see them at work.</div>
          </>
        ) : (
          <>
            <Quote className="w-10 h-10 text-[#E5391C] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[22px] font-mono text-[#6E6D70]">{PEOPLE[sel].name} in the observation notes ({PEOPLE[sel].note})</div>
              <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">{PEOPLE[sel].seen}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------- Place ---------------------------------- */
type Cn = 'noise' | 'dust' | 'heat' | 'net' | 'hands' | 'dist' | 'time';
const CN: Record<Cn, { Icon: React.ElementType; label: string; color: string }> = {
  noise: { Icon: Volume2, label: 'Noise about 80 dB: a sound alert is not heard', color: 'text-blue-600' },
  dust: { Icon: Wind, label: 'Flour dust in the air and on every surface', color: 'text-amber-600' },
  heat: { Icon: Flame, label: 'Heat near the ovens, about 40 °C', color: 'text-[#E5391C]' },
  net: { Icon: WifiOff, label: 'Weak network near the ovens', color: 'text-[#525254]' },
  hands: { Icon: Hand, label: 'Floury or gloved hands: no touching shared surfaces', color: 'text-emerald-700' },
  dist: { Icon: Ruler, label: 'People stand 2 to 4 metres away', color: 'text-[#525254]' },
  time: { Icon: Clock, label: 'Strict clock: vans leave at 06:00', color: 'text-[#E5391C]' },
};

interface Station {
  id: string;
  name: string;
  Icon: React.ElementType;
  x: number; y: number; w: number; h: number;
  what: string;
  who: string;
  cons: Cn[];
  bg: string;
}
const STATIONS: Station[] = [
  { id: 'mix', name: 'Mixing area', Icon: Wheat, x: 20, y: 20, w: 240, h: 250,
    what: 'Dough is mixed and rested. It is ready at 01:30.', who: 'Salma, between the mixer and the ovens', cons: ['noise', 'dust'], bg: 'bg-amber-50' },
  { id: 'o1', name: 'Oven 1', Icon: OvenIcon, x: 300, y: 20, w: 180, h: 150,
    what: 'Each bake cycle takes 40 minutes. The ovens run from 02:00 until about 05:00.', who: 'Salma loads and unloads', cons: ['noise', 'heat', 'net', 'hands'], bg: 'bg-orange-100' },
  { id: 'o2', name: 'Oven 2', Icon: OvenIcon, x: 500, y: 20, w: 180, h: 150,
    what: 'Each bake cycle takes 40 minutes. At 03:45 this oven waited 6 minutes: nobody knew what came next.', who: 'Salma loads and unloads', cons: ['noise', 'heat', 'net', 'hands'], bg: 'bg-orange-100' },
  { id: 'o3', name: 'Oven 3', Icon: OvenIcon, x: 700, y: 20, w: 180, h: 150,
    what: 'Each bake cycle takes 40 minutes. The ovens run from 02:00 until about 05:00.', who: 'Salma loads and unloads', cons: ['noise', 'heat', 'net', 'hands'], bg: 'bg-orange-100' },
  { id: 'cool', name: 'Cooling racks', Icon: LayoutGrid, x: 300, y: 210, w: 580, h: 120,
    what: 'Baked bread and pastries rest on racks before packing. A crate for shop 22 was once found on the wrong rack (note 10).', who: 'Salma, then Youssef', cons: ['noise', 'dust'], bg: 'bg-stone-100' },
  { id: 'pack', name: 'Packing table', Icon: Package, x: 300, y: 370, w: 580, h: 200,
    what: 'From 04:30 Youssef packs crates and checks labels. He asked "which shop first?" three times: no one answered over the noise.', who: 'Youssef', cons: ['noise', 'dust', 'hands'], bg: 'bg-blue-50' },
  { id: 'board', name: 'Whiteboard', Icon: PenLine, x: 20, y: 310, w: 240, h: 260,
    what: 'At 01:35 Hassan writes the plan with a marker, standing: 8 minutes. Late changes go in a corner.', who: 'Hassan writes; everyone reads', cons: ['dust', 'dist'], bg: 'bg-white' },
  { id: 'dock', name: 'Loading dock', Icon: Truck, x: 920, y: 20, w: 120, h: 550,
    what: 'Amine loads the vans from the packed crates. The vans leave at 06:00.', who: 'Amine', cons: ['noise', 'time'], bg: 'bg-emerald-50' },
];
const HALL_WIDE: Cn[] = ['noise', 'dust', 'time'];

const PlaceTab: React.FC<{ line: boolean }> = ({ line }) => {
  const [sel, setSel] = useState<string | null>(null);
  const st = STATIONS.find((s) => s.id === sel) ?? null;
  return (
    <div className="h-full flex gap-4 min-h-0">
      <div className="relative flex-shrink-0 rounded-2xl border-2 border-[#CFC8BC] bg-[#FAF9F6] overflow-hidden" style={{ width: 1060, height: 590 }}>
        <svg className="absolute inset-0 pointer-events-none" width="1060" height="590">
          <defs>
            <marker id="arr" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M0,0 L12,6 L0,12 z" fill="#6E6D70" />
            </marker>
            <marker id="arrR" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M0,0 L12,6 L0,12 z" fill="#E5391C" />
            </marker>
          </defs>
          {[[260, 95, 296, 95], [390, 172, 390, 206], [590, 172, 590, 206], [790, 172, 790, 206], [590, 332, 590, 366], [882, 470, 916, 470]].map(([a, b, c, d], i) => (
            <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#6E6D70" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#arr)" />
          ))}
          {line && (
            <line x1="260" y1="360" x2="590" y2="172" stroke="#E5391C" strokeWidth="5" strokeDasharray="4 8" strokeLinecap="round" markerEnd="url(#arrR)" />
          )}
        </svg>
        {STATIONS.map((s) => {
          const on = sel === s.id;
          const isOven = s.id.startsWith('o') && s.id !== 'o0';
          return (
            <button
              key={s.id}
              onClick={() => setSel(on ? null : s.id)}
              className={`absolute rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center transition-all duration-300 ${s.bg} ${
                on ? 'border-[4px] border-[#E5391C] shadow-xl scale-[1.03] z-10' : 'border-2 border-[#CFC8BC] hover:border-[#6E6D70]'
              }`}
              style={{ left: s.x, top: s.y, width: s.w, height: s.h }}
            >
              <s.Icon className={`w-10 h-10 ${isOven ? 'text-[#E5391C]' : 'text-[#525254]'}`} />
              <div className="text-[26px] leading-tight font-bold text-[#222222]">{s.name}</div>
              {s.id === 'board' && line && (
                <div className="text-[22px] leading-tight font-bold text-[#E5391C]">4 m from the ovens: squint</div>
              )}
              <div className="flex items-center justify-center gap-2 mt-1">
                {s.cons.slice(0, 4).map((c) => {
                  const K = CN[c];
                  return <K.Icon key={c} className={`w-7 h-7 ${K.color}`} />;
                })}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-w-0 rounded-2xl border border-[#E8E2D9] bg-white px-6 py-5 flex flex-col gap-3 min-h-0">
        {st ? (
          <>
            <div className="flex items-center gap-4">
              <st.Icon className="w-12 h-12 text-[#E5391C] flex-shrink-0" />
              <div className="text-[32px] leading-tight font-bold text-[#222222]">{st.name}</div>
            </div>
            <div>
              <div className="text-[22px] font-mono text-[#6E6D70]">What happens here</div>
              <div className="text-[26px] leading-[1.25] text-[#222222]">{st.what}</div>
            </div>
            <div>
              <div className="text-[22px] font-mono text-[#6E6D70]">Who</div>
              <div className="text-[26px] leading-[1.25] text-[#222222]">{st.who}</div>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <div className="text-[22px] font-mono text-[#6E6D70]">What limits you here</div>
              {st.cons.map((c) => {
                const K = CN[c];
                return (
                  <div key={c} className="flex items-center gap-3">
                    <K.Icon className={`w-8 h-8 flex-shrink-0 ${K.color}`} />
                    <div className="text-[24px] leading-[1.2] text-[#222222]">{K.label}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 text-[#525254]">
              <MousePointerClick className="w-10 h-10 flex-shrink-0" />
              <div className="text-[28px] leading-tight">Click a station on the plan.</div>
            </div>
            <div className="text-[24px] leading-[1.25] text-[#525254]">
              Dashed arrows show how the bread travels: mixing, oven, cooling, packing, dock.
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-[22px] font-mono text-[#6E6D70]">Everywhere in the hall</div>
              {HALL_WIDE.map((c) => {
                const K = CN[c];
                return (
                  <div key={c} className="flex items-center gap-3">
                    <K.Icon className={`w-8 h-8 flex-shrink-0 ${K.color}`} />
                    <div className="text-[24px] leading-[1.2] text-[#222222]">{K.label}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------- Night ---------------------------------- */
const TOTAL = 300; // minutes from 01:00 to 06:00
const TW = 1400; // track width in px
const px = (m: number) => (m / TOTAL) * TW;
const fmt = (m: number) => {
  const h = 1 + Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
};
interface Ev { at: number; label: string; sub: string; key?: boolean; color: string; }
const EVENTS: Ev[] = [
  { at: 0, label: 'Shift starts', sub: 'Hassan reads the order sheet', color: '#525254' },
  { at: 30, label: 'Plan', sub: 'Dough ready; plan on the whiteboard', color: '#525254' },
  { at: 60, label: 'First bake', sub: '40-minute cycles begin', key: true, color: '#059669' },
  { at: 150, label: 'Change deadline', sub: 'Shops can no longer change orders', key: true, color: '#E5391C' },
  { at: 210, label: 'Packing starts', sub: 'Crates, labels, shop order', key: true, color: '#2563EB' },
  { at: 270, label: 'Loading', sub: 'Crates onto the vans', color: '#525254' },
  { at: 300, label: 'Vans leave', sub: 'Every van out, on time', key: true, color: '#E5391C' },
];

const Clock2: React.FC<{ minutes: number }> = ({ minutes }) => {
  const total = 60 + minutes; // minutes since 00:00
  const mAng = (total % 60) * 6;
  const hAng = ((total / 60) % 12) * 30;
  const hand = (ang: number, len: number, w: number, c: string) => {
    const r = ((ang - 90) * Math.PI) / 180;
    return <line x1="100" y1="100" x2={100 + len * Math.cos(r)} y2={100 + len * Math.sin(r)} stroke={c} strokeWidth={w} strokeLinecap="round" />;
  };
  return (
    <svg width="190" height="190" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="94" fill="#fff" stroke="#222222" strokeWidth="5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const r = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={100 + 80 * Math.sin(r)} y1={100 - 80 * Math.cos(r)} x2={100 + 90 * Math.sin(r)} y2={100 - 90 * Math.cos(r)} stroke="#525254" strokeWidth={i % 3 === 0 ? 4 : 2} />;
      })}
      {hand(hAng, 48, 7, '#222222')}
      {hand(mAng, 72, 4, '#E5391C')}
      <circle cx="100" cy="100" r="7" fill="#222222" />
    </svg>
  );
};

const NightTab: React.FC<{ t: number }> = ({ t }) => {
  const lanes: { label: string; from: number; to: number; color: string; segs?: boolean; note: string }[] = [
    { label: 'Shops may change orders', from: 0, to: 150, color: '#F59E0B', note: 'phone and messages' },
    { label: 'Read and plan', from: 0, to: 60, color: '#525254', note: 'sheet, whiteboard' },
    { label: 'Ovens', from: 60, to: 240, color: '#059669', segs: true, note: '' },
    { label: 'Packing', from: 210, to: 300, color: '#2563EB', note: 'from 04:30' },
    { label: 'Loading', from: 270, to: 300, color: '#E5391C', note: '' },
  ];
  const popped = EVENTS.filter((e) => t >= e.at);
  const latest = popped.length ? popped[popped.length - 1] : null;
  const renderBars = (grey: boolean) =>
    lanes.map((l, i) => (
      <div key={l.label} className="absolute left-0" style={{ top: i * 58, height: 50, width: TW }}>
        {l.segs ? (
          Array.from({ length: 5 }).map((_, k) => {
            const a = l.from + k * 40;
            const b = Math.min(a + 40, 240);
            if (a >= 240) return null;
            return (
              <div
                key={k}
                className="absolute top-0 h-full rounded-lg border-2 border-white flex items-center justify-center text-[22px] font-bold text-white overflow-hidden"
                style={{ left: px(a), width: px(b - a), background: grey ? '#D6D0C6' : k % 2 ? '#047857' : '#059669' }}
              >
                {b - a === 40 ? '40 min' : '20'}
              </div>
            );
          })
        ) : (
          <div
            className="absolute top-0 h-full rounded-lg flex items-center px-3 text-[22px] font-bold text-white whitespace-nowrap overflow-hidden"
            style={{ left: px(l.from), width: px(l.to - l.from), background: grey ? '#D6D0C6' : l.color }}
          >
            {l.note}
          </div>
        )}
      </div>
    ));

  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      <div className="flex-shrink-0 flex items-center gap-4 rounded-2xl border border-[#E8E2D9] bg-white px-5 py-3" style={{ height: 214 }}>
        <Clock2 minutes={t} />
        <div className="w-[190px] flex-shrink-0">
          <div className="text-[22px] font-mono text-[#6E6D70]">Night shift</div>
          <div className="text-[34px] font-bold text-[#222222] tabular-nums leading-tight">{fmt(t)}</div>
          <div className="text-[22px] text-[#525254] leading-tight">{t >= TOTAL ? 'Vans gone' : t > 0 ? 'Night running' : 'Press Play'}</div>
        </div>
        <div className="flex-1 min-w-0 grid grid-cols-7 gap-3 h-full">
          {EVENTS.map((e) => {
            const on = t >= e.at;
            const isLatest = latest === e;
            return (
              <div
                key={e.at}
                className={`rounded-xl px-3 py-2 flex flex-col transition-all duration-500 min-h-0 ${
                  on ? 'bg-white border-2' : 'border-2 border-dashed border-[#E8E2D9] bg-[#FAF9F6]'
                } ${isLatest ? 'scale-[1.05] shadow-lg' : ''}`}
                style={on ? { borderColor: e.color } : undefined}
              >
                <div className={`transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-[26px] leading-tight font-bold" style={{ color: e.color }}>{fmt(e.at)}</div>
                  <div className="text-[24px] leading-tight font-bold text-[#222222]">{e.label}</div>
                  <div className="text-[22px] leading-[1.15] text-[#525254]">{e.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white px-5 py-4 flex gap-4">
        <div className="flex-shrink-0 relative" style={{ width: 230 }}>
          {lanes.map((l, i) => (
            <div key={l.label} className="absolute left-0 text-[24px] leading-[1.1] font-semibold text-[#222222] flex items-center" style={{ top: i * 58, height: 50, width: 230 }}>
              {l.label}
            </div>
          ))}
        </div>
        <div className="relative flex-shrink-0" style={{ width: TW, height: 330 }}>
          {/* hour grid */}
          {[0, 1, 2, 3, 4, 5].map((h) => (
            <div key={h} className="absolute top-0 border-l-2 border-dashed border-[#E8E2D9]" style={{ left: px(h * 60), height: 290 }} />
          ))}
          {renderBars(true)}
          <div className="absolute left-0 top-0 overflow-hidden" style={{ width: px(t), height: 290 }}>
            <div className="relative" style={{ width: TW, height: 290 }}>{renderBars(false)}</div>
          </div>
          {/* axis */}
          <div className="absolute left-0 w-full border-t-2 border-[#525254]" style={{ top: 296 }} />
          {[0, 1, 2, 3, 4, 5].map((h) => (
            <div
              key={h}
              className="absolute text-[24px] text-[#525254] tabular-nums whitespace-nowrap"
              style={{ left: px(h * 60), top: 300, transform: h === 5 ? 'translateX(-100%)' : h === 0 ? 'none' : 'translateX(-50%)' }}
            >
              {fmt(h * 60)}
            </div>
          ))}
          {popped.map((e) => (
            <div key={e.at} className="absolute w-5 h-5 rounded-full border-2 border-white shadow" style={{ left: px(e.at) - 10, top: 287, background: e.color }} />
          ))}
          {/* playhead */}
          <div className="absolute top-[-6px] w-1 rounded bg-[#222222]" style={{ left: px(t) - 2, height: 300 }} />
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- Today ---------------------------------- */
interface Problem { Icon: React.ElementType; head: string; num: string; text: string; tone: string }
const PROBLEMS: Problem[] = [
  { Icon: MessageSquareWarning, head: 'Changes are missed', num: 'Notes 3, 4, 6', text: 'Shop 14 asks for 60 more baguettes. The line is in a corner; Salma keeps baking the old quantity. A floury sleeve wipes one line away.', tone: 'text-[#E5391C]' },
  { Icon: Timer, head: 'Ovens wait', num: '6 min', text: 'At 03:45 Oven 2 waits 6 minutes: nobody knows what comes next.', tone: 'text-amber-600' },
  { Icon: AlertTriangle, head: 'Packing order unknown', num: '3 times', text: 'Youssef asks "which shop first?" three times at 04:35. No one answers over the noise.', tone: 'text-blue-600' },
  { Icon: Percent, head: 'Waste', num: 'about 6%', text: 'About 6% of production is wasted.', tone: 'text-[#525254]' },
  { Icon: CalendarX, head: 'Late deliveries', num: 'about 3 a month', text: 'Vans that miss the 06:00 departure.', tone: 'text-[#E5391C]' },
];

const TodayTab: React.FC<{ n: number }> = ({ n }) => (
  <div className="h-full flex gap-4 min-h-0">
    <div className="flex-shrink-0 flex flex-col gap-3" style={{ width: 600 }}>
      <div className="flex-1 min-h-0 rounded-2xl border-[6px] border-[#B8B2A7] bg-white px-6 py-4 relative overflow-hidden">
        <div className="text-[22px] font-mono text-[#6E6D70]">Whiteboard today</div>
        <div className="text-[30px] leading-[1.3] text-blue-900 font-semibold" style={{ fontFamily: '"Comic Sans MS", "Segoe Print", cursive' }}>
          <div>Baguettes ... Oven 1</div>
          <div>Croissants ... Oven 2</div>
          <div>Bread ... Oven 3</div>
        </div>
        <div className="absolute right-4 bottom-4 text-[26px] leading-tight text-[#E5391C] font-semibold -rotate-3" style={{ fontFamily: '"Comic Sans MS", "Segoe Print", cursive', width: 200 }}>
          Shop 14: +60 baguettes
        </div>
        <div className="absolute left-6 bottom-6 w-[230px] h-[44px] rounded-full bg-stone-300/70 blur-[2px] rotate-[-4deg]" />
        <div className="absolute left-[60px] bottom-[70px] text-[22px] text-[#6E6D70] whitespace-nowrap">wiped by a sleeve</div>
      </div>
      <div className="flex-shrink-0 grid grid-cols-3 gap-3">
        {[{ I: ClipboardList, t: 'Paper sheet' }, { I: PenLine, t: 'Whiteboard' }, { I: Volume2, t: 'Shouting' }].map((x) => (
          <div key={x.t} className="rounded-xl border border-[#E8E2D9] bg-white px-3 py-3 flex items-center gap-2 text-[24px] font-bold text-[#222222]">
            <x.I className="w-8 h-8 text-[#525254] flex-shrink-0" />
            {x.t}
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 min-w-0 grid grid-cols-2 grid-rows-3 gap-3 min-h-0">
      {PROBLEMS.map((p, i) => {
        const on = n > i;
        return (
          <div
            key={p.head}
            className={`min-h-0 rounded-2xl px-5 py-3 flex flex-col justify-center transition-all duration-500 ${
              on ? 'bg-white border border-[#E8E2D9] opacity-100 translate-y-0' : 'border-2 border-dashed border-[#E8E2D9] bg-[#FAF9F6]'
            }`}
          >
            <div className={`flex flex-col transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-3">
                <p.Icon className={`w-9 h-9 flex-shrink-0 ${p.tone}`} />
                <div className="text-[28px] leading-tight font-bold text-[#222222]">{p.head}</div>
                <div className={`ml-auto text-[28px] font-bold whitespace-nowrap ${p.tone}`}>{p.num}</div>
              </div>
              <div className="text-[24px] leading-[1.2] text-[#525254] mt-1">{p.text}</div>
            </div>
          </div>
        );
      })}
      <div
        className={`min-h-0 rounded-2xl px-5 py-3 flex items-center gap-3 transition-all duration-500 ${
          n >= PROBLEMS.length ? 'bg-[#222222] text-white' : n === 0 ? 'border-2 border-dashed border-[#E8E2D9] bg-[#FAF9F6] text-[#525254]' : 'border-2 border-dashed border-[#E8E2D9] bg-[#FAF9F6] text-transparent'
        }`}
      >
        {n >= PROBLEMS.length ? (
          <>
            <Lightbulb className="w-10 h-10 text-amber-400 flex-shrink-0" />
            <div className="text-[28px] leading-[1.2] font-bold">The problem is the whole situation, not a screen.</div>
          </>
        ) : n === 0 ? (
          <>
            <EyeOff className="w-9 h-9 flex-shrink-0 text-[#6E6D70]" />
            <div className="text-[26px] leading-[1.2]">Think in silence: what goes wrong in this hall?</div>
          </>
        ) : (
          <span className="text-[26px]">.</span>
        )}
      </div>
    </div>
  </div>
);

/* ---------------------------------- Main ---------------------------------- */
export const BakeryCaseDemo: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('people');
  const [visited, setVisited] = useState<Set<TabKey>>(new Set(['people']));
  const [line, setLine] = useState(false);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [n, setN] = useState(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      tRef.current = Math.min(TOTAL, tRef.current + 0.9);
      setT(tRef.current);
      if (tRef.current >= TOTAL) setPlaying(false);
    }, 50);
    return () => window.clearInterval(id);
  }, [playing]);

  const goTab = (k: TabKey) => {
    setTab(k);
    setVisited((v) => new Set(v).add(k));
  };
  const reset = () => {
    setTab('people');
    setVisited(new Set(['people']));
    setLine(false);
    setPlaying(false);
    tRef.current = 0;
    setT(0);
    setN(0);
  };
  const play = () => {
    if (tRef.current >= TOTAL) {
      tRef.current = 0;
      setT(0);
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-3">
        {TABS.map(({ key, label, Icon }) => {
          const on = tab === key;
          return (
            <button
              key={key}
              onClick={() => goTab(key)}
              className={`rounded-xl px-5 min-h-[56px] text-[26px] font-bold flex items-center gap-2 transition-colors border ${
                on ? 'bg-[#222222] text-white border-[#222222]' : 'bg-white text-[#525254] border-[#E8E2D9] hover:bg-stone-100'
              }`}
            >
              <Icon className="w-7 h-7" />
              {label}
              {visited.has(key) && !on && <span className="w-3 h-3 rounded-full bg-emerald-600" />}
            </button>
          );
        })}
        <div className="flex-1" />
        {tab === 'place' && (
          <button onClick={() => setLine((v) => !v)} className={line ? PRIMARY : SECONDARY}>
            {line ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            {line ? 'Hide the 4 m line' : 'Show the 4 m line'}
          </button>
        )}
        {tab === 'night' && (
          <button onClick={play} className={`${PRIMARY} min-w-[260px]`}>
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {playing ? 'Pause' : t >= TOTAL ? 'Replay the night' : 'Play the night'}
          </button>
        )}
        {tab === 'today' && (
          <button onClick={() => setN((v) => Math.min(PROBLEMS.length, v + 1))} disabled={n >= PROBLEMS.length} className={`${PRIMARY} min-w-[260px]`}>
            Reveal next problem
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>
      <div className="flex-1 min-h-0">
        {tab === 'people' && <PeopleTab />}
        {tab === 'place' && <PlaceTab line={line} />}
        {tab === 'night' && <NightTab t={t} />}
        {tab === 'today' && <TodayTab n={n} />}
      </div>
    </div>
  );
};

