import React, { useEffect, useState } from 'react';
import { ChevronRight, Home, MousePointerClick, RotateCcw, Search, Shuffle, Target } from 'lucide-react';

/*
 * HierarchyDemo (Session 5, slide 30).
 * The same 24 items in three structures: Flat (24 on one screen), Balanced (6 x 4, two levels), Deep (3, 2, 2, 2: four levels).
 * "Find item" animates a search: the scan highlight sweeps the choices of each screen, then the right one is tapped.
 * Cost (rule of thumb, illustrative): about 0.6 s to decide and tap + 0.1 s per choice read. More choices = slower (Hick's law).
 * AHA: breadth vs depth is a trade-off. Flat is slow to scan, deep needs many clicks; balance (5 to 7 per level, 2 to 3 levels) wins.
 * Five of the 24 items are illustrative extras added to the case's 19.
 */

interface Node {
  name: string;
  children?: Node[];
}
const leaf = (name: string): Node => ({ name });
const grp = (name: string, ...c: Node[]): Node => ({ name, children: c });

const ORDER_CHANGES = 'Order changes (NEW)';
const L = {
  next: leaf('Next batch per oven'),
  timers: leaf('Oven timers'),
  status: leaf('Oven status'),
  done: leaf('Mark a batch as done'),
  dough: leaf('Dough ready times'),
  stock: leaf('Ingredient stock'),
  products: leaf('Product list'),
  qty: leaf('Quantities per product'),
  orders: leaf("Today's orders by shop"),
  changes: leaf(ORDER_CHANGES),
  deadline: leaf('Late-change deadline'),
  confirm: leaf('Confirm a change was seen'),
  pack: leaf('Packing order'),
  crates: leaf('Crates per shop'),
  route: leaf('Route order'),
  van: leaf('Van loading checklist'),
  handover: leaf('Handover notes'),
  addNote: leaf('Add a handover note'),
  waste: leaf('Waste count'),
  late: leaf('Late deliveries log'),
  shifts: leaf('Shift schedule'),
  contacts: leaf('Shop contacts'),
  clean: leaf('Cleaning checklist'),
  safety: leaf('Safety reminders'),
};

const FLAT: Node = { name: 'Home', children: Object.values(L) };

const G = {
  ovens: grp('Ovens', L.next, L.timers, L.status, L.done),
  dough: grp('Dough and stock', L.dough, L.stock, L.products, L.qty),
  orders: grp('Orders', L.orders, L.changes, L.deadline, L.confirm),
  packing: grp('Packing', L.pack, L.crates, L.route, L.van),
  record: grp('Night record', L.handover, L.addNote, L.waste, L.late),
  team: grp('Team', L.shifts, L.contacts, L.clean, L.safety),
};
const BALANCED: Node = { name: 'Home', children: Object.values(G) };

const DEEP: Node = grp(
  'Home',
  grp(
    'Bake',
    grp('Ovens', grp('Now', L.next, L.status), grp('Control', L.timers, L.done)),
    grp('Dough and stock', grp('Dough', L.dough, L.stock), grp('Products', L.products, L.qty)),
  ),
  grp(
    'Ship',
    grp('Orders', grp('Today', L.orders, L.deadline), grp('Changes', L.changes, L.confirm)),
    grp('Packing', grp('Crates', L.pack, L.crates), grp('Van', L.route, L.van)),
  ),
  grp(
    'Team and record',
    grp('Night record', grp('Notes', L.handover, L.addNote), grp('Counts', L.waste, L.late)),
    grp('Team', grp('People', L.shifts, L.contacts), grp('Rules', L.clean, L.safety)),
  ),
);

interface Struct {
  key: string;
  label: string;
  root: Node;
  blurb: string;
}
const STRUCTS: Struct[] = [
  { key: 'flat', label: 'Flat', root: FLAT, blurb: '24 choices, 1 level' },
  { key: 'bal', label: 'Balanced', root: BALANCED, blurb: '6 x 4, 2 levels' },
  { key: 'deep', label: 'Deep', root: DEEP, blurb: '3, 2, 2, 2: 4 levels' },
];

const TARGETS = [ORDER_CHANGES, 'Route order', 'Add a handover note', 'Safety reminders'];

interface Screen {
  path: string[];
  choices: string[];
  pick: number;
}
// the sequence of screens a person sees on the way to the target
function screensFor(root: Node, target: string): Screen[] {
  const out: Screen[] = [];
  const walk = (n: Node, path: string[]): boolean => {
    if (!n.children) return n.name === target;
    for (let i = 0; i < n.children.length; i++) {
      out.push({ path, choices: n.children.map((c) => c.name), pick: i });
      if (walk(n.children[i], [...path, n.children[i].name])) return true;
      out.pop();
    }
    return false;
  };
  walk(root, []);
  return out;
}
const choiceCounts = (root: Node): number[] => {
  const res: number[] = [];
  let n: Node = root;
  while (n.children) {
    res.push(n.children.length);
    n = n.children[0];
  }
  return res;
};
const screenCost = (n: number) => 0.6 + 0.1 * n;

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

type Phase = 'idle' | 'scan' | 'hold' | 'done';
interface Result {
  clicks: number;
  time: number;
}

export const HierarchyDemo: React.FC = () => {
  const [si, setSi] = useState(0);
  const [ti, setTi] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [k, setK] = useState(0);
  const [scan, setScan] = useState(0);
  const [results, setResults] = useState<Record<string, Result>>({});

  const st = STRUCTS[si];
  const target = TARGETS[ti];
  const screens = screensFor(st.root, target);
  const running = phase === 'scan' || phase === 'hold';

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return;
    const sc = screens[k];
    let id: number;
    if (phase === 'scan') {
      if (scan < sc.pick) id = window.setTimeout(() => setScan(scan + 1), 90);
      else id = window.setTimeout(() => setPhase('hold'), 200);
    } else {
      id = window.setTimeout(() => {
        if (k < screens.length - 1) {
          setK(k + 1);
          setScan(0);
          setPhase('scan');
        } else {
          const time = screens.reduce((a, s) => a + screenCost(s.choices.length), 0);
          setResults((r) => ({ ...r, [`${st.key}|${target}`]: { clicks: screens.length, time } }));
          setPhase('done');
        }
      }, 700);
    }
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, k, scan]);

  const stopAnd = (fn: () => void) => {
    setPhase('idle');
    setK(0);
    setScan(0);
    fn();
  };
  const find = () => {
    setK(0);
    setScan(0);
    setPhase('scan');
  };
  const reset = () => {
    setSi(0);
    setTi(0);
    setPhase('idle');
    setK(0);
    setScan(0);
    setResults({});
  };

  const shown = phase === 'idle' ? screens[0] : screens[k];
  const nChoices = shown.choices.length;
  const cols = nChoices > 8 ? 6 : nChoices > 4 ? 3 : nChoices;

  // live values for the current structure
  const completed = phase === 'idle' ? 0 : phase === 'scan' ? k : k + 1;
  const liveClicks = completed;
  const liveTime = screens.slice(0, completed).reduce((a, s) => a + screenCost(s.choices.length), 0);

  const allDone = STRUCTS.every((s) => results[`${s.key}|${target}`]);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <style>{`@keyframes hi-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="flex-shrink-0 h-[64px] flex items-center gap-3">
        {STRUCTS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => stopAnd(() => setSi(i))}
            className={`rounded-xl px-5 min-h-[56px] text-[24px] font-bold border-2 ${
              i === si ? 'border-[#E5391C] bg-white text-[#E5391C]' : 'border-[#E8E2D9] bg-white text-[#525254] hover:bg-stone-50'
            }`}
          >
            {s.label}
          </button>
        ))}
        <button onClick={() => stopAnd(() => setTi((ti + 1) % TARGETS.length))} className={SECONDARY}>
          <Shuffle className="w-6 h-6" />
          Next item
        </button>
        <button onClick={find} disabled={running} className={PRIMARY}>
          <Search className="w-6 h-6" />
          Find item
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 flex gap-3">
        {/* Screen mock */}
        <div className="w-[1000px] flex-shrink-0 min-h-0 rounded-2xl border-2 border-[#222222] bg-white overflow-hidden flex flex-col">
          <div className="flex-shrink-0 h-[56px] bg-[#222222] text-white px-4 flex items-center gap-2 text-[24px] font-bold">
            <Home className="w-6 h-6" />
            <span>Home</span>
            {shown.path.map((p) => (
              <React.Fragment key={p}>
                <ChevronRight className="w-6 h-6 text-white/60" />
                <span>{p}</span>
              </React.Fragment>
            ))}
            <span className="ml-auto text-[22px] font-normal text-white/70">
              {nChoices} choices on this screen
            </span>
          </div>
          <div className="flex-shrink-0 mx-3 mt-3 rounded-xl border-2 border-[#E5391C] bg-[#FDF5F3] px-4 py-2 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-[#E5391C] text-white flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8" />
            </span>
            <span className="text-[26px] font-bold text-[#E5391C] uppercase tracking-wide">Find</span>
            <span className="text-[38px] leading-[1.05] font-bold text-[#222222] truncate">{target}</span>
          </div>
          <div
            key={`${st.key}-${phase === 'idle' ? 0 : k}`}
            className="flex-1 min-h-0 p-3 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: '1fr', animation: 'hi-in 0.35s both' }}
          >
            {shown.choices.map((c, i) => {
              const isScan = phase === 'scan' && i === scan;
              const picked = (phase === 'hold' || phase === 'done') && i === shown.pick;
              const looked = phase !== 'idle' && i < scan && phase === 'scan';
              return (
                <div
                  key={c}
                  className={`rounded-xl border-2 px-3 flex items-center justify-center text-center font-semibold leading-[1.1] min-h-0 transition-colors ${
                    nChoices > 8 ? 'text-[22px]' : 'text-[28px]'
                  } ${
                    picked
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
                      : isScan
                        ? 'border-[#E5391C] bg-red-50 text-[#222222]'
                        : looked
                          ? 'border-[#E8E2D9] bg-stone-50 text-[#6E6D70]'
                          : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#222222]'
                  }`}
                >
                  {picked && <MousePointerClick className="w-6 h-6 mr-2 flex-shrink-0" />}
                  {c}
                </div>
              );
            })}
          </div>
        </div>

        {/* Costs */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2">
          {STRUCTS.map((s, i) => {
            const res = results[`${s.key}|${target}`];
            const cur = i === si;
            const counts = choiceCounts(s.root);
            const clicks = cur && running ? liveClicks : res?.clicks;
            const time = cur && running ? liveTime : res?.time;
            return (
              <div key={s.key} className={`flex-1 min-h-0 rounded-xl border-2 bg-white px-4 py-2 flex flex-col justify-center gap-1 ${cur ? 'border-[#E5391C]' : 'border-[#E8E2D9]'}`}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[28px] font-bold text-[#222222]">{s.label}</span>
                  <span className="text-[24px] text-[#525254]">choices per screen: {counts.join(' · ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-[150px] flex-shrink-0 text-[26px] font-bold text-[#222222]">
                    {clicks === undefined ? '– clicks' : `${clicks} click${clicks === 1 ? '' : 's'}`}
                  </span>
                  <div className="flex-1 h-[22px] rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${cur ? 'bg-[#E5391C]' : 'bg-[#6E6D70]'}`}
                      style={{ width: time === undefined ? '0%' : `${Math.min(100, (time / 4) * 100)}%` }}
                    />
                  </div>
                  <span className="w-[90px] flex-shrink-0 text-right text-[26px] font-bold text-[#222222]">
                    {time === undefined ? '– s' : `${time.toFixed(1)} s`}
                  </span>
                </div>
              </div>
            );
          })}
          <div
            className={`flex-shrink-0 rounded-xl px-4 py-2 text-[24px] leading-[1.2] ${
              allDone ? 'bg-emerald-50 border border-emerald-500 text-[#222222]' : 'bg-[#FAF9F6] border border-[#E8E2D9] text-[#525254]'
            }`}
            style={allDone ? { animation: 'hi-in 0.5s both' } : undefined}
          >
            {allDone ? (
              <>
                <b>Balance wins:</b> about 5 to 7 choices per level, 2 to 3 levels. Flat is slow to scan; deep needs too many clicks.
              </>
            ) : (
              <>Run Flat, Balanced and Deep for the same item, then compare. Rule of thumb (illustrative): 0.6 s to decide and tap, plus 0.1 s per choice read. More choices, slower (Hick’s law).</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
