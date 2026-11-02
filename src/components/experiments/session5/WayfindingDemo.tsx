import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ClipboardList,
  Eye,
  Flame,
  Home,
  Package,
  RotateCcw,
  Route,
  Send,
  SkipForward,
  Undo2,
} from 'lucide-react';

/*
 * WayfindingDemo (Session 5, slide 32).
 * A visitor looks for "Route order" in the Fresh Batch Board structure (a hub with four sections).
 * The lecturer removes the navigation cues one by one (section title, highlighted current section, back button, breadcrumb).
 * Each removal makes the visitor's scripted path longer and the "lost meter" rise; restoring the cues brings the path back to the goal.
 * AHA: three questions every screen must answer (Where am I? What is here? Where can I go?) are answered by cues;
 * take the cues away and people get lost even when the structure itself is perfect.
 * The lost meter and the step counts are illustrative (scripted, not measured).
 */

type NId = 'hub' | 'now' | 'ord' | 'pack' | 'rec' | 'lNow' | 'lOrd' | 'route' | 'lRec';
type CueKey = 'title' | 'lit' | 'back' | 'crumb';

interface NodeDef {
  id: NId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string[];
  kind: 'hub' | 'section' | 'leaf';
  section: 'hub' | 'now' | 'ord' | 'pack' | 'rec';
  name: string; // name shown as title in the screen mock
}

const SEC_Y = 180;
const LEAF_Y = 330;
const NODES: NodeDef[] = [
  { id: 'hub', x: 350, y: 46, w: 170, h: 60, label: ['Home'], kind: 'hub', section: 'hub', name: 'Home' },
  { id: 'now', x: 90, y: SEC_Y, w: 164, h: 72, label: ['Now'], kind: 'section', section: 'now', name: 'Now' },
  { id: 'ord', x: 265, y: SEC_Y, w: 164, h: 72, label: ['Orders'], kind: 'section', section: 'ord', name: 'Orders' },
  { id: 'pack', x: 440, y: SEC_Y, w: 164, h: 72, label: ['Packing', 'and loading'], kind: 'section', section: 'pack', name: 'Packing and loading' },
  { id: 'rec', x: 615, y: SEC_Y, w: 164, h: 72, label: ['Night record'], kind: 'section', section: 'rec', name: 'Night record' },
  { id: 'lNow', x: 90, y: LEAF_Y, w: 164, h: 56, label: ['Oven timers'], kind: 'leaf', section: 'now', name: 'Oven timers' },
  { id: 'lOrd', x: 265, y: LEAF_Y, w: 164, h: 56, label: ["Today's orders"], kind: 'leaf', section: 'ord', name: "Today's orders" },
  { id: 'route', x: 440, y: LEAF_Y, w: 164, h: 56, label: ['Route order'], kind: 'leaf', section: 'pack', name: 'Route order' },
  { id: 'lRec', x: 615, y: LEAF_Y, w: 164, h: 56, label: ['Waste count'], kind: 'leaf', section: 'rec', name: 'Waste count' },
];
const NODE = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NId, NodeDef>;
const PARENT: Partial<Record<NId, NId>> = { now: 'hub', ord: 'hub', pack: 'hub', rec: 'hub', lNow: 'now', lOrd: 'ord', route: 'pack', lRec: 'rec' };

// scripted wandering, one path per number of removed cues (0..4)
const PATHS: NId[][] = [
  ['hub', 'pack', 'route'],
  ['hub', 'ord', 'hub', 'pack', 'route'],
  ['hub', 'ord', 'lOrd', 'ord', 'hub', 'pack', 'route'],
  ['hub', 'ord', 'lOrd', 'ord', 'hub', 'now', 'lNow', 'now', 'hub', 'pack', 'route'],
  ['hub', 'ord', 'lOrd', 'ord', 'hub', 'now', 'lNow', 'now', 'hub', 'rec', 'lRec', 'rec', 'hub', 'ord'],
];
const LOST = [0, 25, 50, 75, 100];

const READING = [
  'All cues on: every screen answers the three questions. The visitor goes straight to the goal.',
  'No section title: the visitor cannot tell what a screen is about, and opens the wrong section first.',
  'No highlighted section either: after a wrong turn the visitor does not know where they are.',
  'No back button: the only way out is to walk back through the home screen. The path gets long.',
  'No cues at all: the visitor wanders in circles, then gives up and asks for help.',
];

const CUES: { key: CueKey; label: string }[] = [
  { key: 'title', label: 'Section title' },
  { key: 'lit', label: 'Section lit up' },
  { key: 'back', label: 'Back button' },
  { key: 'crumb', label: 'Breadcrumb' },
];

const QUESTIONS: { q: string; cues: CueKey[] }[] = [
  { q: 'Where am I?', cues: ['title', 'lit', 'crumb'] },
  { q: 'What is here?', cues: ['title', 'crumb'] },
  { q: 'Where can I go?', cues: ['back', 'crumb', 'lit'] },
];

const SECTION_ITEMS: Record<'now' | 'ord' | 'pack' | 'rec', string[]> = {
  now: ['Next batch per oven', 'Oven timers', 'Oven status', 'Mark a batch as done', 'Order changes'],
  ord: ["Today's orders by shop", 'Quantities per product', 'Late-change deadline', 'Confirm a change was seen', 'Shop contacts'],
  pack: ['Packing order', 'Crates per shop', 'Route order'],
  rec: ['Handover notes', 'Add a handover note', 'Waste count', 'Late deliveries log'],
};

const TABS: { id: 'hub' | 'now' | 'ord' | 'pack' | 'rec'; label: string; Icon: React.ElementType }[] = [
  { id: 'hub', label: 'Home', Icon: Home },
  { id: 'now', label: 'Now', Icon: Flame },
  { id: 'ord', label: 'Orders', Icon: ClipboardList },
  { id: 'pack', label: 'Pack', Icon: Package },
  { id: 'rec', label: 'Night', Icon: BookOpen },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const STEP_MS = 650;

interface Walk {
  level: number;
  idx: number;
  key: number;
}

export const WayfindingDemo: React.FC = () => {
  const [cues, setCues] = useState<Record<CueKey, boolean>>({ title: true, lit: true, back: true, crumb: true });
  const [walk, setWalk] = useState<Walk | null>(null);
  const [peek, setPeek] = useState(false);

  const removed = CUES.filter((c) => !cues[c.key]).length;
  // what the screen mock draws: the real cues, or (while comparing) every cue switched on
  const ALL_ON: Record<CueKey, boolean> = { title: true, lit: true, back: true, crumb: true };
  const sc = peek ? ALL_ON : cues;
  const level = walk ? walk.level : removed;
  const path = PATHS[level];
  const idx = walk ? walk.idx : 0;
  const cur = NODE[path[idx]];
  const done = walk !== null && walk.idx >= path.length - 1;
  const gaveUp = done && level === 4;
  const found = done && !gaveUp;

  useEffect(() => {
    if (!walk) return;
    const total = PATHS[walk.level].length - 1;
    if (walk.idx >= total) return;
    const id = window.setTimeout(() => setWalk((w) => (w && w.key === walk.key ? { ...w, idx: w.idx + 1 } : w)), STEP_MS);
    return () => window.clearTimeout(id);
  }, [walk]);

  const start = (count: number) => setWalk((w) => ({ level: count, idx: 0, key: (w ? w.key : 0) + 1 }));

  const setCue = (next: Record<CueKey, boolean>) => {
    setCues(next);
    setPeek(false);
    start(CUES.filter((c) => !next[c.key]).length);
  };
  const removeNext = () => {
    const k = CUES.find((c) => cues[c.key]);
    if (k) setCue({ ...cues, [k.key]: false });
  };
  const restore = () => setCue({ title: true, lit: true, back: true, crumb: true });
  const reset = () => {
    setCues({ title: true, lit: true, back: true, crumb: true });
    setPeek(false);
    setWalk(null);
  };

  const visited = new Set<NId>(path.slice(0, idx + 1));
  const trailColor = level === 0 ? '#059669' : level < 3 ? '#d97706' : '#dc2626';
  const meter = walk ? LOST[level] : LOST[removed];
  const meterColor = meter === 0 ? 'bg-emerald-600' : meter < 60 ? 'bg-amber-500' : 'bg-red-600';
  const steps = path.length - 1;

  // ---- screen mock -------------------------------------------------------
  const sec = cur.section;
  const crumb =
    cur.kind === 'hub'
      ? 'Home'
      : cur.kind === 'section'
        ? `Home › ${cur.name}`
        : `Home › ${NODE[PARENT[cur.id] as NId].name} › ${cur.name}`;
  const canBack = cur.kind !== 'hub';
  const isGoal = cur.id === 'route';

  return (
    <div className="flex-1 min-h-0 flex gap-5 p-4 text-[#222222]">
      {/* LEFT: structure + reading */}
      <div className="flex flex-col min-h-0 w-[704px] shrink-0">
        <div className="text-[24px] font-bold text-[#525254] mb-1 flex items-center gap-2">
          <Route size={24} className="text-[#E5391C]" /> The structure: a hub with four sections
        </div>
        <svg width={704} height={420} viewBox="0 0 704 420" className="shrink-0" role="img" aria-label="Structure map with the visitor's path">
          {NODES.filter((n) => PARENT[n.id]).map((n) => {
            const p = NODE[PARENT[n.id] as NId];
            return (
              <line key={n.id} x1={p.x} y1={p.y + p.h / 2} x2={n.x} y2={n.y - n.h / 2} stroke="#E8E2D9" strokeWidth={4} />
            );
          })}
          {path.slice(0, idx).map((id, i) => {
            const a = NODE[id];
            const b = NODE[path[i + 1]];
            return (
              <line
                key={`${i}-${id}-${path[i + 1]}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={trailColor}
                strokeWidth={6}
                strokeLinecap="round"
                opacity={0.55}
              />
            );
          })}
          {NODES.map((n) => {
            const isCur = n.id === cur.id;
            const goal = n.id === 'route';
            const vis = visited.has(n.id);
            const fill = goal ? '#ECFDF5' : vis ? '#FFFBEB' : '#FFFFFF';
            const stroke = goal ? '#059669' : isCur ? '#E5391C' : vis ? '#d97706' : '#E8E2D9';
            return (
              <g key={n.id}>
                <rect
                  x={n.x - n.w / 2}
                  y={n.y - n.h / 2}
                  width={n.w}
                  height={n.h}
                  rx={14}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isCur || goal ? 4 : 2}
                />
                {n.label.map((t, i) => (
                  <text
                    key={t}
                    x={n.x}
                    y={n.y + (i - (n.label.length - 1) / 2) * 26 + 8}
                    textAnchor="middle"
                    fontSize={22}
                    fontWeight={n.kind === 'leaf' ? 500 : 700}
                    fill="#222222"
                  >
                    {t}
                  </text>
                ))}
              </g>
            );
          })}
          <text x={440} y={LEAF_Y + 56} textAnchor="middle" fontSize={22} fontWeight={700} fill="#059669">
            Goal
          </text>
          {/* the visitor */}
          <g
            style={{
              transform: `translate(${cur.x + cur.w / 2 - 8}px, ${cur.y - cur.h / 2 + 4}px)`,
              transition: 'transform 500ms ease',
            }}
          >
            <circle r={16} fill={gaveUp ? '#dc2626' : '#E5391C'} stroke="#fff" strokeWidth={3} />
            <circle cy={-4} r={4.5} fill="#fff" />
            <path d="M-7 8 a7 6 0 0 1 14 0 z" fill="#fff" />
          </g>
        </svg>
        <div
          className={`mt-2 rounded-xl border px-4 py-2.5 text-[24px] leading-snug flex-1 min-h-0 ${
            !walk
              ? 'bg-white border-[#E8E2D9] text-[#525254]'
              : found && level === 0
                ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                : gaveUp
                  ? 'bg-red-50 border-red-500 text-red-900'
                  : 'bg-amber-50 border-amber-500 text-amber-900'
          }`}
        >
          {!walk ? (
            <>Think in silence: what will happen to a visitor looking for “Route order” if we take the cues away?</>
          ) : done ? (
            <>{READING[level]}</>
          ) : (
            <>The visitor is looking for “Route order”…</>
          )}
        </div>
      </div>

      {/* MIDDLE: the screen */}
      <div className="flex flex-col min-h-0 w-[500px] shrink-0">
        <div className="text-[24px] font-bold mb-1 flex items-center gap-2 h-[34px]">
          <span className="text-[#525254]">What the visitor sees</span>
          {peek ? (
            <span className="rounded-full bg-emerald-600 text-white px-3 text-[22px]">with all cues</span>
          ) : removed > 0 ? (
            <span className="rounded-full bg-red-600 text-white px-3 text-[22px]">{removed} cue{removed > 1 ? 's' : ''} removed</span>
          ) : (
            <span className="rounded-full bg-emerald-600 text-white px-3 text-[22px]">all cues on</span>
          )}
        </div>
        <div className="relative flex-1 min-h-0 rounded-2xl border-2 border-[#222222] bg-white flex flex-col overflow-hidden">
          <style>{`@keyframes wf-flash { 0%,100% { background: rgba(220,38,38,.04); } 50% { background: rgba(220,38,38,.22); } } .wf-ghost { animation: wf-flash 1.1s ease-in-out 3; }`}</style>
          {/* header */}
          <div className="bg-[#FAF9F6] border-b border-[#E8E2D9] px-4 pt-3 pb-3 h-[128px] shrink-0">
            <div className="flex items-center gap-3 h-[44px]">
              {sc.back && canBack ? (
                <div className="flex items-center gap-1 rounded-lg bg-[#222222] text-white px-3 py-1 text-[22px] font-bold shrink-0">
                  <ArrowLeft size={22} /> Back
                </div>
              ) : !sc.back && canBack ? (
                <div className="wf-ghost shrink-0 rounded-lg border-2 border-dashed border-red-500 text-red-600 px-3 py-1 text-[22px] font-bold line-through">
                  Back
                </div>
              ) : (
                <div className="w-[8px] shrink-0" />
              )}
              {sc.crumb ? (
                <div className="text-[22px] text-[#6E6D70] truncate">{crumb}</div>
              ) : (
                <div className="wf-ghost flex-1 min-w-0 rounded-lg border-2 border-dashed border-red-500 text-red-600 px-3 py-1 text-[22px] font-bold truncate line-through">
                  Breadcrumb
                </div>
              )}
            </div>
            {sc.title ? (
              <div className="mt-2 text-[30px] font-bold leading-tight h-[44px] truncate">{cur.name}</div>
            ) : (
              <div className="wf-ghost mt-2 h-[44px] rounded-lg border-2 border-dashed border-red-500 text-red-600 px-3 flex items-center text-[26px] font-bold line-through">
                Section title
              </div>
            )}
          </div>
          {/* body */}
          <div className="flex-1 min-h-0 px-4 py-3 overflow-hidden">
            {cur.kind === 'hub' && (
              <div className="grid grid-cols-2 gap-3 h-full">
                {(['now', 'ord', 'pack', 'rec'] as const).map((s) => {
                  const T = TABS.find((t) => t.id === s) as (typeof TABS)[number];
                  return (
                    <div key={s} className="rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] flex flex-col items-center justify-center gap-1 text-[24px] font-bold text-center leading-tight px-1">
                      <T.Icon size={34} className="text-[#E5391C]" />
                      {NODE[s].name}
                    </div>
                  );
                })}
              </div>
            )}
            {cur.kind === 'section' && (
              <div className="flex flex-col gap-1.5">
                {SECTION_ITEMS[sec as 'now' | 'ord' | 'pack' | 'rec'].map((it) => (
                  <div key={it} className="h-[44px] rounded-lg border border-[#E8E2D9] bg-white px-3 flex items-center text-[24px] truncate">
                    {it}
                  </div>
                ))}
              </div>
            )}
            {cur.kind === 'leaf' && (
              <div className="h-full flex flex-col items-center justify-center gap-3">
                {isGoal ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-700 text-[28px] font-bold text-center">
                    <div className="w-[64px] h-[64px] rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check size={40} />
                    </div>
                    Route order found
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-2">
                    {[88, 70, 80].map((w, i) => (
                      <div key={i} className="h-[22px] rounded-full bg-stone-200" style={{ width: `${w}%` }} />
                    ))}
                    <div className="text-[24px] text-[#6E6D70] mt-2">Not what I was looking for…</div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* tab bar */}
          {!sc.lit && (
            <div className="wf-ghost shrink-0 mx-3 mb-1 rounded-lg border-2 border-dashed border-red-500 text-red-600 px-3 py-1 text-[22px] font-bold text-center line-through">
              Current section lit up
            </div>
          )}
          <div className="h-[76px] shrink-0 border-t border-[#E8E2D9] flex bg-white">
            {TABS.map((t) => {
              const on = sc.lit && t.id === sec;
              return (
                <div
                  key={t.id}
                  className={`flex-1 flex flex-col items-center justify-center text-[22px] leading-none gap-1 ${
                    on ? 'bg-[#E5391C] text-white font-bold' : 'text-[#6E6D70]'
                  }`}
                >
                  <t.Icon size={26} />
                  {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: questions, cues, meter, buttons */}
      <div className="flex flex-col min-h-0 flex-1 gap-2.5">
        <div className="rounded-xl border border-[#E8E2D9] bg-white px-4 py-2">
          {QUESTIONS.map(({ q, cues: ks }) => {
            const on = ks.filter((k) => cues[k]).length;
            const tone = on === ks.length ? 'bg-emerald-600' : on > 0 ? 'bg-amber-500' : 'bg-red-600';
            return (
              <div key={q} className="flex items-center justify-between h-[44px]">
                <span className="text-[26px] font-bold">{q}</span>
                <span className="flex items-center gap-2">
                  {ks.map((k) => (
                    <span key={k} className={`w-[18px] h-[18px] rounded-full ${cues[k] ? tone : 'bg-stone-200'}`} />
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {CUES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCue({ ...cues, [c.key]: !cues[c.key] })}
              className={`rounded-xl border-2 min-h-[56px] px-2 text-[22px] font-bold flex items-center justify-center gap-1.5 ${
                cues[c.key] ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : 'bg-stone-100 border-dashed border-stone-400 text-stone-500 line-through'
              }`}
            >
              {cues[c.key] && <Check size={20} />}
              {c.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[#E8E2D9] bg-white px-4 py-2.5">
          <div className="flex items-center justify-between text-[22px] text-[#525254]">
            <span className="font-bold">Lost meter</span>
            <span>illustrative</span>
          </div>
          <div className="h-[22px] rounded-full bg-stone-200 mt-1 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${meterColor}`} style={{ width: `${Math.max(meter, 3)}%` }} />
          </div>
          <div className="text-[24px] mt-1.5 font-bold">
            {walk ? (gaveUp ? `${Math.min(idx, steps)} steps, gives up` : `${idx} of ${steps} steps`) : 'Shortest path: 2 steps'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button className={PRIMARY} onClick={removeNext} disabled={removed >= 4}>
            <SkipForward size={22} /> Remove cue
          </button>
          <button className={SECONDARY} onClick={restore} disabled={removed === 0}>
            <Undo2 size={22} /> Restore all
          </button>
          <button className={SECONDARY} onClick={() => start(removed)}>
            <Send size={22} /> {walk ? 'Replay walk' : 'Send visitor'}
          </button>
          <button className={SECONDARY} onClick={reset}>
            <RotateCcw size={22} /> Reset
          </button>
          <button
            className={`${peek ? 'bg-[#222222] text-white' : SECONDARY} ${BTN} col-span-2 border border-[#E8E2D9]`}
            onClick={() => setPeek(!peek)}
            disabled={removed === 0}
          >
            <Eye size={22} /> {peek ? 'Back to the screen without cues' : 'Compare: show it with all cues'}
          </button>
        </div>
      </div>
    </div>
  );
};
