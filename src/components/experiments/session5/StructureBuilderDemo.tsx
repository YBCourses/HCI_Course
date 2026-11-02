import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, GripVertical, Layers, MoveUp, Plus, RotateCcw } from 'lucide-react';

/*
 * StructureBuilderDemo (Session 5, slide 35).
 * Four group tiles from the card sort (the Fresh Batch Board structure) are placed one by one into a tree:
 * NOW is the home screen, the other three groups hang below it. "Place next group" or drag a tile into the tree area.
 * Then three important tasks (R1, R2, R4) show their path from the home screen, step by step.
 * Final move: "Order changes" is taken out of ORDERS (first draft) and put on NOW: the R2 path drops from 2 steps to 1.
 * AHA: the structure follows the important tasks: put what people need most, now, closest to the home screen.
 * Step counts are in our case (illustrative).
 */

type GId = 'now' | 'ord' | 'pack' | 'rec';
type TId = 'R1' | 'R2' | 'R4';

const ORDER_CHANGES = 'Order changes';

interface Group {
  id: GId;
  name: string;
  items: string[];
  head: string; // header tile classes
  border: string;
}

const GROUPS: Group[] = [
  {
    id: 'now',
    name: 'NOW (home)',
    items: ['Next batch per oven', 'Oven timers', 'Oven status', 'Mark a batch as done'],
    head: 'bg-[#E5391C] text-white',
    border: 'border-[#E5391C]',
  },
  {
    id: 'ord',
    name: 'ORDERS',
    // first draft: Order changes still lives here
    items: [ORDER_CHANGES, "Today's orders by shop", 'Quantities per product', 'Late-change deadline', 'Confirm a change was seen', 'Shop contacts'],
    head: 'bg-blue-600 text-white',
    border: 'border-blue-600',
  },
  {
    id: 'pack',
    name: 'PACKING AND LOADING',
    items: ['Packing order', 'Crates per shop', 'Route order'],
    head: 'bg-emerald-600 text-white',
    border: 'border-emerald-600',
  },
  {
    id: 'rec',
    name: 'NIGHT RECORD',
    items: ['Handover notes', 'Add a handover note', 'Waste count', 'Late deliveries log'],
    head: 'bg-amber-500 text-white',
    border: 'border-amber-500',
  },
];
const G = Object.fromEntries(GROUPS.map((g) => [g.id, g])) as Record<GId, Group>;

interface Task {
  id: TId;
  label: string;
}
const TASKS: Task[] = [
  { id: 'R1', label: 'See the next batch' },
  { id: 'R2', label: 'See a changed order' },
  { id: 'R4', label: 'See the packing order' },
];

interface Hop {
  label: string;
  tile: GId;
  item?: string;
}

const pathFor = (t: TId, moved: boolean): Hop[] => {
  const home: Hop = { label: 'Home (NOW)', tile: 'now' };
  if (t === 'R1') return [home, { label: 'Next batch per oven', tile: 'now', item: 'Next batch per oven' }];
  if (t === 'R4')
    return [home, { label: 'PACKING AND LOADING', tile: 'pack' }, { label: 'Packing order', tile: 'pack', item: 'Packing order' }];
  return moved
    ? [home, { label: ORDER_CHANGES, tile: 'now', item: ORDER_CHANGES }]
    : [home, { label: 'ORDERS', tile: 'ord' }, { label: ORDER_CHANGES, tile: 'ord', item: ORDER_CHANGES }];
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const STEP_MS = 600;

export const StructureBuilderDemo: React.FC = () => {
  const [placed, setPlaced] = useState<GId[]>([]);
  const [task, setTask] = useState<TId | null>(null);
  const [moved, setMoved] = useState(false);
  const [shown, setShown] = useState(0); // how many hops of the current path are lit
  const [drag, setDrag] = useState<{ id: GId; dx: number; dy: number } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: GId; px: number; py: number; sx: number } | null>(null);

  const all = placed.length === 4;
  const path = task ? pathFor(task, moved) : [];

  // light up the hops of the chosen task one after the other
  useEffect(() => {
    if (!task) return;
    const len = pathFor(task, moved).length;
    if (shown >= len) return;
    const id = window.setTimeout(() => setShown((s) => s + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [task, moved, shown]);

  const place = (id: GId) => setPlaced((p) => (p.includes(id) ? p : [...p, id]));
  const placeNext = () => {
    const next = GROUPS.find((g) => !placed.includes(g.id));
    if (next) place(next.id);
  };
  const pick = (t: TId) => {
    setTask(t);
    setShown(1);
  };
  const doMove = () => {
    setMoved(true);
    setTask('R2');
    setShown(1);
  };
  const reset = () => {
    setPlaced([]);
    setTask(null);
    setMoved(false);
    setShown(0);
    setDrag(null);
    dragRef.current = null;
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>, id: GId) => {
    const root = rootRef.current;
    if (!root) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = root.getBoundingClientRect();
    dragRef.current = { id, px: e.clientX, py: e.clientY, sx: rect.width / root.offsetWidth || 1 };
    setDrag({ id, dx: 0, dy: 0 });
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    setDrag({ id: d.id, dx: (e.clientX - d.px) / d.sx, dy: (e.clientY - d.py) / d.sx });
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    setDrag(null);
    const c = canvasRef.current;
    if (!d || !c) return;
    const r = c.getBoundingClientRect();
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) place(d.id);
  };

  // which item chips are lit, and how
  const litItems = new Map<string, 'go' | 'long'>();
  const litTiles = new Set<GId>();
  path.slice(0, shown).forEach((h, i) => {
    litTiles.add(h.tile);
    if (h.item) litItems.set(h.item, task === 'R2' && !moved ? 'long' : 'go');
    void i;
  });

  const itemsOf = (id: GId): string[] => {
    if (!moved) return G[id].items;
    if (id === 'now') return [...G.now.items, ORDER_CHANGES];
    if (id === 'ord') return G.ord.items.filter((x) => x !== ORDER_CHANGES);
    return G[id].items;
  };

  const renderTile = (id: GId, cols: number) => {
    const g = G[id];
    const lit = litTiles.has(id);
    return (
      <div
        key={id}
        className={`sb-pop rounded-2xl border-2 bg-white overflow-hidden flex flex-col ${lit ? g.border : 'border-[#E8E2D9]'} ${
          lit ? 'shadow-md' : ''
        }`}
      >
        <div className={`px-4 py-1.5 text-[26px] font-bold ${g.head}`}>{g.name}</div>
        <div className={`p-2.5 grid gap-1.5 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {itemsOf(id).map((it) => {
            const l = litItems.get(it);
            const isNew = it === ORDER_CHANGES && moved && id === 'now';
            return (
              <div
                key={it}
                className={`h-[38px] rounded-lg border px-2.5 flex items-center justify-between gap-1 text-[22px] leading-none ${
                  l === 'go'
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-bold'
                    : l === 'long'
                      ? 'bg-amber-100 border-amber-500 text-amber-900 font-bold'
                      : 'bg-[#FAF9F6] border-[#E8E2D9] text-[#222222]'
                } ${isNew ? 'sb-pop' : ''}`}
              >
                <span className="whitespace-nowrap">{it}</span>
                {isNew && <span className="rounded bg-[#E5391C] text-white px-1.5 py-0.5 text-[22px] font-bold">NEW</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const slotCls = 'rounded-2xl border-2 border-dashed border-[#E8E2D9] bg-white/40';
  const bottoms: GId[] = ['ord', 'pack', 'rec'];

  const steps = path.length - 1;
  const was = task === 'R2' && moved ? 2 : null;

  return (
    <div ref={rootRef} className="flex-1 min-h-0 flex gap-5 p-4 text-[#222222]">
      <style>{`@keyframes sbPop{0%{transform:scale(.85);opacity:0}100%{transform:scale(1);opacity:1}} .sb-pop{animation:sbPop .4s ease-out}`}</style>

      {/* LEFT */}
      <div className="flex flex-col min-h-0 w-[430px] shrink-0">
        {!all ? (
          <>
            <div className="text-[24px] font-bold text-[#525254] mb-2 flex items-center gap-2">
              <Layers size={24} className="text-[#E5391C]" /> Groups from the card sort
            </div>
            <div className="flex flex-col gap-2">
              {GROUPS.map((g) => {
                const isPlaced = placed.includes(g.id);
                const isDrag = drag?.id === g.id;
                return (
                  <div key={g.id} className="h-[72px]">
                    {!isPlaced && (
                      <div
                        onPointerDown={(e) => onDown(e, g.id)}
                        onPointerMove={onMove}
                        onPointerUp={onUp}
                        onPointerCancel={() => {
                          dragRef.current = null;
                          setDrag(null);
                        }}
                        style={{
                          touchAction: 'none',
                          transform: isDrag ? `translate(${drag.dx}px, ${drag.dy}px)` : undefined,
                          zIndex: isDrag ? 50 : undefined,
                          position: 'relative',
                        }}
                        className={`h-full rounded-xl border-2 bg-white px-3 flex items-center gap-2 cursor-grab select-none ${g.border} ${
                          isDrag ? 'shadow-xl' : ''
                        }`}
                      >
                        <GripVertical size={24} className="text-[#6E6D70] shrink-0" />
                        <div className="min-w-0">
                          <div className="text-[26px] font-bold leading-tight truncate">{g.name}</div>
                          <div className="text-[22px] text-[#525254] leading-tight">{g.items.length + (g.id === 'ord' ? 0 : 0)} items</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-[24px] text-[#525254] leading-snug flex-1 min-h-0">
              {placed.length === 0
                ? 'Think in silence: which group should be the home screen? Then place the groups, or drag them into the tree.'
                : 'Each group becomes a branch of the tree.'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className={PRIMARY} onClick={placeNext}>
                <Plus size={22} /> Place next
              </button>
              <button className={SECONDARY} onClick={reset}>
                <RotateCcw size={22} /> Reset
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-[24px] font-bold text-[#525254] mb-2">Three important tasks</div>
            <div className="flex flex-col gap-2">
              {TASKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => pick(t.id)}
                  className={`h-[72px] rounded-xl border-2 px-4 flex items-center gap-3 text-left ${
                    task === t.id ? 'border-[#E5391C] bg-red-50' : 'border-[#E8E2D9] bg-white hover:bg-stone-100'
                  }`}
                >
                  <span className="rounded-lg bg-[#222222] text-white px-2.5 py-1 text-[24px] font-bold">{t.id}</span>
                  <span className="text-[26px] font-bold leading-tight">{t.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 text-[24px] text-[#525254] leading-snug flex-1 min-h-0">
              {moved
                ? 'Order changes now sits on NOW. The most urgent task needs one step: the structure follows the important tasks.'
                : task === 'R2'
                  ? 'Two steps for the most urgent task. Think in silence: what could we change?'
                  : task
                    ? 'Count the steps from the home screen.'
                    : 'Choose a task to see its path from the home screen.'}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className={PRIMARY} onClick={doMove} disabled={moved || task !== 'R2'}>
                <MoveUp size={22} /> Move Order changes to NOW
              </button>
              <button className={SECONDARY} onClick={reset}>
                <RotateCcw size={22} /> Reset
              </button>
            </div>
          </>
        )}
      </div>

      {/* RIGHT: the tree */}
      <div className="flex-1 min-h-0 min-w-0 flex flex-col gap-2">
        <div ref={canvasRef} className="flex-1 min-h-0 flex flex-col relative">
          {/* root row */}
          <div className="flex justify-center">
            <div className="w-[640px]">
              {placed.includes('now') ? (
                renderTile('now', 2)
              ) : (
                <div className={`${slotCls} h-[118px]`} />
              )}
            </div>
          </div>
          {/* connectors */}
          <div className="relative h-[34px] shrink-0">
            <div className={`absolute left-1/2 top-0 h-1/2 w-[4px] -ml-[2px] ${placed.length > 1 ? 'bg-[#525254]' : 'bg-transparent'}`} />
            {bottoms.map((id, i) => {
              const on = placed.includes(id);
              const x = ['16.666%', '50%', '83.333%'][i];
              return (
                <React.Fragment key={id}>
                  {i !== 1 && (
                    <div
                      className={`absolute top-1/2 h-[4px] -mt-[2px] ${on ? 'bg-[#525254]' : 'bg-transparent'}`}
                      style={i === 0 ? { left: x, width: '33.333%' } : { left: '50%', width: '33.333%' }}
                    />
                  )}
                  <div className={`absolute top-1/2 bottom-0 w-[4px] -ml-[2px] ${on ? 'bg-[#525254]' : 'bg-transparent'}`} style={{ left: x }} />
                </React.Fragment>
              );
            })}
          </div>
          {/* second row */}
          <div className="grid grid-cols-3 gap-4 items-start flex-1 min-h-0">
            {bottoms.map((id) =>
              placed.includes(id) ? renderTile(id, 1) : <div key={id} className={`${slotCls} h-[200px]`} />,
            )}
          </div>
          {!all && placed.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-xl bg-white/90 border border-[#E8E2D9] px-5 py-3 text-[26px] text-[#525254]">The tree is empty</div>
            </div>
          )}
        </div>

        {/* path strip */}
        <div className="h-[76px] shrink-0 rounded-xl border border-[#E8E2D9] bg-white px-4 flex items-center gap-3 overflow-hidden">
          {task && all ? (
            <>
              <span className="rounded-lg bg-[#222222] text-white px-2.5 py-1 text-[24px] font-bold shrink-0">{task}</span>
              <div className="flex items-center gap-2 min-w-0">
                {path.map((h, i) => (
                  <React.Fragment key={`${h.label}-${i}`}>
                    {i > 0 && <ArrowRight size={24} className="text-[#6E6D70] shrink-0" />}
                    <span
                      className={`rounded-lg border px-3 py-1.5 text-[24px] font-bold whitespace-nowrap transition-opacity duration-300 ${
                        i < shown
                          ? task === 'R2' && !moved && i > 0
                            ? 'bg-amber-100 border-amber-500 text-amber-900'
                            : 'bg-emerald-100 border-emerald-600 text-emerald-900'
                          : 'opacity-0 border-transparent'
                      }`}
                    >
                      {h.label}
                    </span>
                  </React.Fragment>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2 shrink-0">
                {shown >= path.length && (
                  <>
                    {was !== null && <span className="text-[26px] text-[#6E6D70] line-through">{was} steps</span>}
                    <span className={`text-[30px] font-bold ${was !== null ? 'text-emerald-700' : 'text-[#222222]'}`}>
                      {steps} {steps === 1 ? 'step' : 'steps'}
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <span className="text-[24px] text-[#6E6D70]">
              {all ? 'Pick a task: its path from the home screen appears here.' : `${placed.length} of 4 groups placed`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
