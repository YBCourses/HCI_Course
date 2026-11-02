import React, { useEffect, useRef, useState } from 'react';
import { Check, Flag, Play, RotateCcw, Wrench } from 'lucide-react';

/*
 * AHA: success is not enough. Task 1 "succeeds" for 11 of 12, yet 2 people wandered; task 2 succeeds for only
 * 7 and the dots show WHERE they go wrong (they click ORDERS first). Look at directness and at the node where
 * people go wrong, then fix and test again.
 * Case: Fresh Batch (teacher/session5-case.md, "Tree test"). All numbers are illustrative, "in our case".
 * Participants are scripted (no randomness): each one is a list of visited nodes.
 * Node ids: 'r' = home, 's<n>' = section n, 'i<s>_<k>' = item k of section s.
 */

const N = 12;

interface Section {
  name: string;
  items: string[];
}

const TREE: Section[] = [
  { name: 'NOW', items: ['Next batch per oven', 'Oven timers', 'Oven status', 'Mark a batch as done', 'Order changes'] },
  { name: 'ORDERS', items: ["Today's orders by shop", 'Quantities per product', 'Late-change deadline', 'Confirm a change was seen', 'Shop contacts'] },
  { name: 'PACKING AND LOADING', items: ['Packing order', 'Crates per shop', 'Route order'] },
  { name: 'NIGHT RECORD', items: ['Handover notes', 'Add a handover note', 'Waste count', 'Late deliveries log'] },
];

// The fixed tree (illustrative): ONE change, Order changes also listed under ORDERS.
const FIXED: Section[] = [
  TREE[0],
  { name: 'ORDERS', items: ['Order changes', "Today's orders by shop", 'Quantities per product', 'Late-change deadline', 'Confirm a change was seen', 'Shop contacts'] },
  TREE[2],
  TREE[3],
];

interface Task {
  text: string;
  correct: string;
  targets: string[];
  paths: string[][];
  reading: string;
}

const rep = (n: number, p: string[]) => Array.from({ length: n }, () => p);

const TASKS: Task[] = [
  {
    text: 'Where do you see which shop to pack first?',
    correct: 'PACKING AND LOADING > Packing order',
    targets: ['i2_0'],
    paths: [
      ...rep(9, ['r', 's2', 'i2_0']),
      ['r', 's1', 'r', 's2', 'i2_0'],
      ['r', 's0', 'r', 's2', 'i2_0'],
      ['r', 's1', 'i1_0'],
    ],
    reading: 'Looks good: 11 of 12 succeed and 9 go straight there. But 2 wandered first. Success alone hides that.',
  },
  {
    text: 'Where do you see that shop 14 changed its order?',
    correct: 'NOW > Order changes',
    targets: ['i0_4'],
    paths: [
      ...rep(3, ['r', 's0', 'i0_4']),
      ['r', 's1', 'r', 's0', 'i0_4'],
      ['r', 's0', 'i0_0', 's0', 'i0_4'],
      ['r', 's0', 'i0_2', 's0', 'i0_4'],
      ['r', 's0', 'i0_1', 's0', 'i0_4'],
      ['r', 's1', 'i1_3'],
      ['r', 's1', 'i1_3'],
      ['r', 's1', 'i1_0'],
      ['r', 's1', 'i1_4'],
      ['r', 's3', 'i3_0'],
    ],
    reading: 'Only 7 of 12 succeed and 3 go straight. 5 clicked ORDERS first: the label attracts them. Problem node: ORDERS vs NOW.',
  },
  {
    text: 'Where do you check the order of the stops for the van?',
    correct: 'PACKING AND LOADING > Route order',
    targets: ['i2_2'],
    paths: [
      ...rep(6, ['r', 's2', 'i2_2']),
      ['r', 's1', 'r', 's2', 'i2_2'],
      ['r', 's2', 'i2_1', 's2', 'i2_2'],
      ['r', 's1', 'i1_2'],
      ['r', 's1', 'i1_0'],
      ['r', 's0', 'i0_4'],
      ['r', 's3', 'i3_0'],
    ],
    reading: '8 of 12 succeed, 6 directly. 3 looked in ORDERS: the route is about the van, but "Orders" sounds right.',
  },
  {
    text: 'Where do you leave a note for the next shift?',
    correct: 'NIGHT RECORD > Add a handover note',
    targets: ['i3_1'],
    paths: [...rep(11, ['r', 's3', 'i3_1']), ['r', 's3', 'i3_0', 's3', 'i3_1']],
    reading: '12 of 12 succeed and 11 go straight. A clear label in a clear place: leave it alone.',
  },
];

const FIX_TASK: Task = {
  text: TASKS[1].text,
  correct: "NOW > Order changes, or TODAY'S ORDERS > Order changes",
  targets: ['i0_4', 'i1_0'],
  paths: [
    ...rep(7, ['r', 's0', 'i0_4']),
    ...rep(2, ['r', 's1', 'i1_0']),
    ['r', 's1', 'r', 's0', 'i0_4'],
    ['r', 's0', 'i0_2', 's0', 'i0_4'],
    ['r', 's3', 'i3_2'],
  ],
  reading:
    'Illustrative numbers after the fix: Order changes now sits in NOW and in TODAY\'S ORDERS. Success goes from 7 to 11 of 12, directly from 3 to 9. Now test again.',
};

// Geometry of the tree (px, inside a 1824 wide box).
const COL = 456;
const GUT = 84;
const BOX_W = 350;
const ROW_H = 38;
const SEC_Y = 62;
const SEC_H = 42;
const ITEM_Y = 112;
const TREE_H = 346;
const ROOT = { x: 832, y: 0, h: 40 };
const boxLeft = (c: number) => c * COL + 90;

const nodeBox = (id: string): { x: number; y: number; h: number } => {
  if (id === 'r') return ROOT;
  if (id[0] === 's') return { x: boxLeft(Number(id.slice(1))), y: SEC_Y, h: SEC_H };
  const [s, k] = id.slice(1).split('_').map(Number);
  return { x: boxLeft(s), y: ITEM_Y + k * ROW_H, h: ROW_H };
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;
const ACTIVE = `${BTN} bg-[#222222] text-white`;

type Outcome = 'direct' | 'indirect' | 'fail';
const outcomeOf = (path: string[], targets: string[]): Outcome => {
  const ok = targets.includes(path[path.length - 1]);
  if (!ok) return 'fail';
  return path.length === 3 ? 'direct' : 'indirect';
};
const DOT: Record<Outcome, string> = { direct: '#059669', indirect: '#F59E0B', fail: '#DC2626' };

export const TreeTestDemo: React.FC = () => {
  const [task, setTask] = useState<number | null>(null);
  const [fixed, setFixed] = useState(false);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const [fixDone, setFixDone] = useState(false); // task 2 finished on the original tree (unlocks the fix)
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => stop, []);

  const cur: Task | null = fixed ? FIX_TASK : task !== null ? TASKS[task] : null;
  const maxStep = cur ? Math.max(...cur.paths.map((p) => p.length)) - 1 : 0;
  const done = cur !== null && !running && t >= maxStep;

  const run = (nTask: number, useFix: boolean) => {
    stop();
    setTask(nTask);
    setFixed(useFix);
    setT(0);
    setRunning(true);
    const tk = useFix ? FIX_TASK : TASKS[nTask];
    const max = Math.max(...tk.paths.map((p) => p.length)) - 1;
    let step = 0;
    timer.current = window.setInterval(() => {
      step += 1;
      setT(step);
      if (step >= max) {
        stop();
        setRunning(false);
        if (!useFix && nTask === 1) setFixDone(true);
      }
    }, 750);
  };
  const reset = () => {
    stop();
    setTask(null);
    setFixed(false);
    setT(0);
    setRunning(false);
    setFixDone(false);
  };

  const sections = fixed ? FIXED : TREE;
  const paths = cur ? cur.paths : [];
  const posAt = (p: string[]) => p[Math.min(t, p.length - 1)];
  const finished = (p: string[]) => cur !== null && t >= p.length - 1;
  const outcomes = paths.map((p) => outcomeOf(p, cur!.targets));
  const nDone = paths.filter(finished).length;
  const nSuccess = paths.filter((p, i) => finished(p) && outcomes[i] !== 'fail').length;
  const nDirect = paths.filter((p, i) => finished(p) && outcomes[i] === 'direct').length;
  // first clicks on a section (heat)
  const firstClicks = [0, 0, 0, 0];
  if (cur && t >= 1) paths.forEach((p) => (firstClicks[Number(p[1].slice(1))] += 1));
  const problemOrders = done && task === 1 && !fixed;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        {TASKS.map((_, i) => (
          <button key={i} onClick={() => run(i, false)} disabled={running} className={task === i && !fixed ? ACTIVE : SECONDARY}>
            <Play className="w-6 h-6" />
            Run task {i + 1}
          </button>
        ))}
        <button onClick={() => run(1, true)} disabled={running || !fixDone} className={PRIMARY}>
          <Wrench className="w-6 h-6" />
          Show the fix
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1" />
        <div className="text-[26px] text-[#525254]">
          12 test participants, text-only tree {fixed && <b className="text-emerald-700">(fixed)</b>}
        </div>
      </div>

      {/* the text-only tree with walking dots */}
      <div className="relative flex-shrink-0 w-full" style={{ height: TREE_H }}>
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 1824 ${TREE_H}`} fill="none">
          <path d={`M 912 ${ROOT.h} V 52 M ${boxLeft(0) + BOX_W / 2} 52 H ${boxLeft(3) + BOX_W / 2}`} stroke="#D9D3C8" strokeWidth={3} />
          {sections.map((_, c) => (
            <path key={c} d={`M ${boxLeft(c) + BOX_W / 2} 52 V ${SEC_Y}`} stroke="#D9D3C8" strokeWidth={3} />
          ))}
        </svg>

        <div
          className="absolute rounded-xl border-2 border-[#222222] bg-white flex items-center justify-center text-[24px] font-bold text-[#222222]"
          style={{ left: ROOT.x, top: ROOT.y, width: 160, height: ROOT.h }}
        >
          Home
        </div>

        {sections.map((sec, c) => {
          const heat = firstClicks[c] / N;
          const isProblem = problemOrders && c === 1;
          const renamed = fixed && c === 1;
          return (
            <React.Fragment key={c}>
              <div
                className={`absolute rounded-xl border-2 flex items-center justify-between px-3 text-[24px] font-bold text-[#222222] transition-all duration-500 ${
                  isProblem ? 'border-[#E5391C] ring-4 ring-[#E5391C]/40' : renamed ? 'border-emerald-600' : 'border-[#222222]'
                }`}
                style={{
                  left: boxLeft(c),
                  top: SEC_Y,
                  width: BOX_W,
                  height: SEC_H,
                  background: heat > 0 ? `rgba(229,57,28,${(0.12 + heat * 0.75).toFixed(2)})` : '#FFFFFF',
                }}
              >
                <span className="whitespace-nowrap">{sec.name}</span>
                {firstClicks[c] > 0 && (
                  <span className="rounded-full bg-white border border-[#E5391C] text-[#E5391C] text-[22px] leading-[26px] px-2.5">{firstClicks[c]}</span>
                )}
              </div>
              {sec.items.map((it, k) => {
                const id = `i${c}_${k}`;
                const isTarget = done && cur!.targets.includes(id);
                const isNew = fixed && it === 'Order changes';
                return (
                  <div
                    key={id}
                    className={`absolute rounded-lg px-3 flex items-center gap-2 text-[22px] text-[#222222] whitespace-nowrap border ${
                      isTarget ? 'bg-emerald-50 border-emerald-600 font-bold' : isNew ? 'bg-emerald-50 border-emerald-300' : 'bg-[#FAF9F6] border-[#E8E2D9]'
                    }`}
                    style={{ left: boxLeft(c), top: ITEM_Y + k * ROW_H, width: BOX_W, height: ROW_H - 3 }}
                  >
                    {isTarget && <Flag className="w-5 h-5 text-emerald-700 flex-shrink-0" />}
                    <span className="truncate">{it}</span>
                    {isNew && <span className="ml-auto rounded bg-[#E5391C] text-white text-[22px] leading-[26px] px-1.5 font-bold">NEW</span>}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}

        {/* participants */}
        {cur &&
          paths.map((p, i) => {
            const nb = nodeBox(posAt(p));
            const x = nb.x - GUT + 4 + (i % 6) * 14;
            const y = nb.y + Math.max(2, (nb.h - 32) / 2) + Math.floor(i / 6) * 16;
            const fin = finished(p);
            return (
              <span
                key={i}
                className="absolute rounded-full border border-white"
                style={{
                  left: 0,
                  top: 0,
                  width: 14,
                  height: 14,
                  transform: `translate(${x}px, ${y}px)`,
                  background: fin ? DOT[outcomes[i]] : '#2563EB',
                  transition: `transform 500ms ease ${i * 30}ms, background-color 300ms`,
                }}
              />
            );
          })}
      </div>

      {/* bottom: task, stats, reading */}
      <div className="flex-1 min-h-0 grid gap-3" style={{ gridTemplateColumns: '600px 520px 1fr' }}>
        <div className="rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] p-4 flex flex-col gap-2 min-h-0 overflow-hidden">
          {cur ? (
            <>
              <div className="text-[22px] font-bold text-[#6E6D70] uppercase tracking-wide">{fixed ? 'Task 2 again, on the fixed tree' : `Task ${task! + 1} of 4`}</div>
              <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">{cur.text}</div>
              {done && (
                <div className="text-[24px] leading-[1.25] text-emerald-700 font-bold flex items-start gap-2 mt-auto">
                  <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span>Correct path: {cur.correct}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-[28px] leading-[1.3] text-[#6E6D70]">
              Think in silence: where would you click first? Then run a task.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 flex flex-col justify-center gap-3 min-h-0 overflow-hidden">
          <StatBar label="Success" value={nSuccess} tone="#059669" shown={cur !== null} />
          <StatBar label="Directly" value={nDirect} tone="#2563EB" shown={cur !== null} />
          <div className="flex items-center gap-4 text-[22px] text-[#525254]">
            <Legend color={DOT.direct} text="direct" />
            <Legend color={DOT.indirect} text="backtracked" />
            <Legend color={DOT.fail} text="wrong" />
          </div>
        </div>

        <div className={`rounded-2xl border-2 p-4 flex items-center min-h-0 overflow-hidden ${done ? (fixed ? 'border-emerald-600 bg-emerald-50' : task === 1 ? 'border-[#E5391C] bg-[#FFF3EF]' : 'border-[#E8E2D9] bg-[#FAF9F6]') : 'border-[#E8E2D9] bg-[#FAF9F6]'}`}>
          {done && cur ? (
            <div className="text-[24px] leading-[1.3] text-[#222222]">{cur.reading}</div>
          ) : (
            <div className="text-[24px] leading-[1.3] text-[#6E6D70]">
              {running ? `${nDone} of ${N} finished...` : 'The reading appears when the task is finished.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string; value: number; tone: string; shown: boolean }> = ({ label, value, tone, shown }) => (
  <div className="flex items-center gap-3">
    <div className="w-[130px] text-[26px] font-bold text-[#222222]">{label}</div>
    <div className="flex-1 flex gap-1">
      {Array.from({ length: N }, (_, i) => (
        <span key={i} className="flex-1 h-7 rounded-sm transition-colors duration-300" style={{ background: shown && i < value ? tone : '#EDE8DF' }} />
      ))}
    </div>
    <div className="w-[96px] text-right text-[26px] font-bold text-[#222222]">{shown ? `${value}/${N}` : '-'}</div>
  </div>
);

const Legend: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <span className="flex items-center gap-1.5">
    <span className="w-3.5 h-3.5 rounded-full" style={{ background: color }} />
    {text}
  </span>
);
