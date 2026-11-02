import React, { useState } from 'react';
import { Shuffle, GitCompareArrows, Link2, RotateCcw, Brain } from 'lucide-react';

/**
 * Open card sort: the same 16 bakery cards, sorted by three people (Fresh Batch, session5-case.md "Card sort data").
 * Lecturer-run: pick a person tab, "Sort" animates the pile into that person's groups, "Compare the three" lines the three
 * sorts up row by row, and "Show what all three agree on" tints the cards that stayed together for all three.
 * AHA: three people, three groupings (each one follows that person's task: stand at the ovens, pack, drive). Only a few
 * clusters survive in all three; the rest is a design question. The structure must serve the tasks.
 * Cards are absolutely positioned so they glide between layouts. Fixed layout for the 1824 x 671 box.
 */

type Who = 'salma' | 'youssef' | 'amine';
type View = 'pile' | 'sorted' | 'compare';

const CARDS: Record<number, string> = {
  1: 'Next batch per oven',
  2: 'Oven timers',
  3: 'Quantities per product',
  4: "Today's orders by shop",
  5: 'Order changes',
  6: 'Late-change deadline',
  7: 'Packing order',
  8: 'Route order',
  9: 'Crates per shop',
  10: 'Oven status',
  11: 'Handover notes',
  12: 'Waste count',
  13: 'Late deliveries log',
  14: 'Shop contacts',
  15: 'Confirm a change was seen',
  16: 'Mark a batch as done',
};
const IDS = Object.keys(CARDS).map(Number);

interface Group {
  name: string;
  ids: number[];
}
interface Person {
  name: string;
  role: string;
  mindset: string;
  groups: Group[];
}

const PEOPLE: Record<Who, Person> = {
  salma: {
    name: 'Salma',
    role: 'oven baker',
    mindset: 'Salma groups by where she stands and when.',
    groups: [
      { name: 'Ovens now', ids: [1, 2, 10, 16] },
      { name: 'Next', ids: [3] },
      { name: 'Changes', ids: [5, 6, 15] },
      { name: 'Orders', ids: [4] },
      { name: 'Packing and route', ids: [7, 8, 9] },
      { name: 'Other', ids: [11, 12, 13, 14] },
    ],
  },
  youssef: {
    name: 'Youssef',
    role: 'packer',
    mindset: 'Youssef groups around the packing table.',
    groups: [
      { name: 'Packing', ids: [7, 9, 4, 3] },
      { name: 'Changes', ids: [5, 15, 6] },
      { name: 'Ovens', ids: [1, 2, 10, 16] },
      { name: 'Route', ids: [8] },
      { name: 'Records', ids: [11, 12, 13, 14] },
    ],
  },
  amine: {
    name: 'Amine',
    role: 'driver',
    mindset: 'Amine groups by the route of his van.',
    groups: [
      { name: 'Route', ids: [8, 7, 9, 14] },
      { name: 'Orders', ids: [4, 5, 6, 15] },
      { name: 'Ovens', ids: [1, 2, 10, 16, 3] },
      { name: 'Records', ids: [11, 12, 13] },
    ],
  },
};
const WHO: Who[] = ['salma', 'youssef', 'amine'];

// group colours (index in the group list)
const PALETTE = [
  { card: 'bg-red-50 border-[#E5391C]/60', box: 'bg-red-50/70 border-[#E5391C]/40', head: 'text-[#C92B10]', chip: 'bg-red-100 text-red-900' },
  { card: 'bg-amber-50 border-amber-400', box: 'bg-amber-50/70 border-amber-300', head: 'text-amber-700', chip: 'bg-amber-100 text-amber-900' },
  { card: 'bg-blue-50 border-blue-400', box: 'bg-blue-50/70 border-blue-300', head: 'text-blue-700', chip: 'bg-blue-100 text-blue-900' },
  { card: 'bg-emerald-50 border-emerald-500', box: 'bg-emerald-50/70 border-emerald-300', head: 'text-emerald-700', chip: 'bg-emerald-100 text-emerald-900' },
  { card: 'bg-violet-50 border-violet-400', box: 'bg-violet-50/70 border-violet-300', head: 'text-violet-700', chip: 'bg-violet-100 text-violet-900' },
  { card: 'bg-stone-100 border-stone-400', box: 'bg-stone-100/80 border-stone-300', head: 'text-[#525254]', chip: 'bg-stone-200 text-stone-800' },
];

const groupOf = (who: Who, id: number) => {
  const gs = PEOPLE[who].groups;
  const gi = gs.findIndex((g) => g.ids.includes(id));
  return { gi, name: gs[gi].name };
};

// "stayed together for all three": clusters = connected cards that share a group in every one of the three sorts
const together = (a: number, b: number) => WHO.every((w) => groupOf(w, a).gi === groupOf(w, b).gi);
const buildClusters = () => {
  const seen = new Set<number>();
  const out: number[][] = [];
  IDS.forEach((id) => {
    if (seen.has(id)) return;
    const comp = [id];
    seen.add(id);
    for (let i = 0; i < comp.length; i++) {
      IDS.forEach((o) => {
        if (!seen.has(o) && together(comp[i], o)) {
          seen.add(o);
          comp.push(o);
        }
      });
    }
    out.push(comp.sort((a, b) => a - b));
  });
  return out;
};
const ALL_CLUSTERS = buildClusters();
const STABLE = ALL_CLUSTERS.filter((c) => c.length > 1);
const LOOSE = ALL_CLUSTERS.filter((c) => c.length === 1).map((c) => c[0]);
const STABLE_COLORS = [0, 2, 3, 4, 1]; // palette index per stable cluster
const stableIndex = (id: number) => STABLE.findIndex((c) => c.includes(id));
const AGREE_ORDER = [...STABLE.flat(), ...LOOSE];

// geometry (body area is about 1824 wide)
const CARD_W = 280;
const CARD_H = 64;
const STEP_Y = 72;
const SIDE = 24;
const HEAD_H = 52;

interface Pos {
  x: number;
  y: number;
  w: number;
  h: number;
}

const pilePos = (id: number): Pos => {
  const i = id - 1;
  const col = i % 4;
  const row = Math.floor(i / 4);
  const x0 = (1776 - (4 * CARD_W + 3 * 40)) / 2;
  return { x: x0 + col * (CARD_W + 40), y: 40 + row * 100, w: CARD_W, h: CARD_H };
};

const sortedLayout = (who: Who) => {
  const gs = PEOPLE[who].groups;
  const n = gs.length;
  const colW = (1776 - 2 * SIDE) / n;
  const cw = Math.min(CARD_W + 20, colW - 20);
  const pos: Record<number, Pos> = {};
  const boxes = gs.map((g, gi) => {
    const bx = SIDE + gi * colW + 6;
    const bw = colW - 12;
    g.ids.forEach((id, k) => {
      pos[id] = { x: bx + (bw - cw) / 2, y: HEAD_H + 10 + k * STEP_Y, w: cw, h: CARD_H };
    });
    return { x: bx, y: 4, w: bw, h: HEAD_H + 16 + g.ids.length * STEP_Y - 8, name: g.name, count: g.ids.length, gi };
  });
  return { pos, boxes };
};

// compare layout: 2 columns x 8 rows, each card becomes a row with three group chips
const CMP_W = 856;
const CMP_H = 56;
const CMP_STEP = 60;
const CMP_Y0 = 44;
const cmpPos = (id: number, order: number[]): Pos => {
  const i = order.indexOf(id);
  const col = Math.floor(i / 8);
  const row = i % 8;
  return { x: SIDE + col * (CMP_W + 16), y: CMP_Y0 + row * CMP_STEP, w: CMP_W, h: CMP_H };
};

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const CardSortDemo: React.FC = () => {
  const [who, setWho] = useState<Who>('salma');
  const [view, setView] = useState<View>('pile');
  const [agree, setAgree] = useState(false);

  const person = PEOPLE[who];
  const layout = sortedLayout(who);
  const order = agree ? AGREE_ORDER : IDS;

  const posOf = (id: number): Pos => {
    if (view === 'pile') return pilePos(id);
    if (view === 'sorted') return layout.pos[id];
    return cmpPos(id, order);
  };

  const reset = () => {
    setWho('salma');
    setView('pile');
    setAgree(false);
  };

  let note: React.ReactNode;
  if (view === 'pile') {
    note = (
      <span className="flex items-center gap-3">
        <Brain size={26} className="text-[#E5391C] shrink-0" />
        Think in silence: how would you group these 16 cards? Then press Sort to see how {person.name} ({person.role}) did it.
      </span>
    );
  } else if (view === 'sorted') {
    note = `${person.mindset} Same 16 cards, ${person.groups.length} groups. Switch the tab: the cards regroup.`;
  } else if (!agree) {
    note = 'Each row is one card. The coloured chips are the group name each person gave it. Do the three agree?';
  } else {
    note = `Together in all three sorts: ${STABLE.length} clusters (coloured). The grey cards, ${LOOSE.join(', ')}, went to different places.`;
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 px-6 pt-2 pb-3">
      {/* controls */}
      <div className="flex items-center gap-3 shrink-0 h-[60px]">
        {WHO.map((w) => (
          <button
            key={w}
            onClick={() => {
              setWho(w);
              if (view === 'compare') setView('sorted');
            }}
            className={`rounded-xl px-5 text-[24px] font-bold h-[56px] flex items-center cursor-pointer whitespace-nowrap border ${
              who === w && view !== 'compare'
                ? 'bg-[#222222] text-white border-[#222222]'
                : 'bg-white text-[#525254] border-[#E8E2D9] hover:bg-stone-100'
            }`}
          >
            {PEOPLE[w].name}
            <span className="ml-2 text-[22px] font-medium opacity-80">{PEOPLE[w].role}</span>
          </button>
        ))}
        <div className="w-px h-9 bg-[#E8E2D9] mx-1" />
        <button className={btnPrimary} disabled={view !== 'pile'} onClick={() => setView('sorted')}>
          <Shuffle size={24} /> Sort
        </button>
        <button className={btnSecondary} disabled={view === 'pile'} onClick={() => setView('compare')}>
          <GitCompareArrows size={24} /> Compare the three
        </button>
        <button className={btnSecondary} disabled={view !== 'compare'} onClick={() => setAgree((a) => !a)}>
          <Link2 size={24} /> {agree ? 'Hide agreement' : 'What all three agree on'}
        </button>
        <div className="flex-1" />
        <button className={btnSecondary} onClick={reset}>
          <RotateCcw size={22} /> Reset
        </button>
      </div>

      {/* stage */}
      <div className="relative flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] overflow-hidden -mx-0">
        {/* group boxes of the chosen person */}
        {layout.boxes.map((b) => (
          <div
            key={`${who}-${b.gi}`}
            className={`absolute rounded-2xl border-2 transition-opacity duration-500 ${PALETTE[b.gi].box}`}
            style={{ left: b.x, top: b.y, width: b.w, height: b.h, opacity: view === 'sorted' ? 1 : 0 }}
          >
            <div className={`px-3 pt-2 text-[26px] font-bold leading-tight whitespace-nowrap ${PALETTE[b.gi].head}`}>
              {b.name} <span className="text-[22px] font-medium text-[#6E6D70]">({b.count})</span>
            </div>
          </div>
        ))}

        {/* compare column headings */}
        {view === 'compare' &&
          [0, 1].map((col) => (
            <div
              key={col}
              className="absolute flex items-center text-[22px] font-bold text-[#6E6D70]"
              style={{ left: SIDE + col * (CMP_W + 16) + 286, top: 4, width: CMP_W - 286, height: 34 }}
            >
              {WHO.map((w) => (
                <div key={w} style={{ width: 180, marginRight: 8 }} className="pl-1">
                  {PEOPLE[w].name}
                </div>
              ))}
            </div>
          ))}

        {/* cards */}
        {IDS.map((id, i) => {
          const p = posOf(id);
          const si = stableIndex(id);
          const own = groupOf(who, id);
          let tone: string;
          if (view === 'pile') tone = 'bg-white border-[#E8E2D9]';
          else if (view === 'sorted') tone = PALETTE[own.gi].card;
          else if (!agree) tone = 'bg-white border-[#E8E2D9]';
          else if (si >= 0) tone = PALETTE[STABLE_COLORS[si % STABLE_COLORS.length]].card + ' border-2';
          else tone = 'bg-stone-100 border-stone-300 border-dashed';
          const rot = view === 'pile' ? ((i * 7) % 5) - 2 : 0;
          return (
            <div
              key={id}
              className={`absolute rounded-xl border flex items-center gap-3 px-3 shadow-sm ${tone}`}
              style={{
                left: p.x,
                top: p.y,
                width: p.w,
                height: p.h,
                transform: `rotate(${rot}deg)`,
                transition: 'left 700ms ease, top 700ms ease, width 700ms ease, height 700ms ease, transform 700ms ease, background-color 500ms',
                transitionDelay: `${i * 25}ms`,
              }}
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-[#222222] text-white text-[22px] font-bold flex items-center justify-center">
                {id}
              </span>
              <span
                className="text-[22px] leading-[24px] text-[#222222] font-semibold"
                style={view === 'compare' ? { width: 214 } : { flex: 1 }}
              >
                {CARDS[id]}
              </span>
              {view === 'compare' && (
                <div className="flex items-center gap-2 ml-auto">
                  {WHO.map((w) => {
                    const g = groupOf(w, id);
                    return (
                      <span
                        key={w}
                        className={`rounded-lg px-1 h-10 flex items-center justify-center text-[22px] font-medium whitespace-nowrap ${PALETTE[g.gi].chip}`}
                        style={{ width: 180 }}
                      >
                        {g.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* reading */}
      <div className="shrink-0 min-h-[40px] flex items-center text-[26px] text-[#222222] leading-tight">{note}</div>
    </div>
  );
};
