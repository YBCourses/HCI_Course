import React, { useEffect, useRef, useState } from 'react';
import { Play, Link2, Boxes, Split, RotateCcw, Brain, MousePointerClick } from 'lucide-react';

/**
 * Open-sort results: 12 scripted participants sorted the 16 Fresh Batch cards (illustrative, "in our case").
 * HOW TO READ IT (said on screen): rows and columns are the SAME 16 cards; one square = one PAIR of cards; the number in it =
 * how many of the 12 people put that pair in the same group (darker = more agreement). Each pair appears once (lower triangle).
 * Steps: "Add the 12 sorts" fills the matrix person by person; "Read one square" shows a worked example with a crosshair;
 * "Strong pairs" outlines pairs grouped together by 10+ of 12; "Cluster" reorders rows and columns so blocks appear;
 * "Splits" marks the cards 3, 4, 8, 14 whose pairs sit around 5 of 12.
 * AHA: many different sorts become one map of agreement, and the splits (not the agreement) are the real design questions.
 * Data is deterministic and consistent with session5-case.md. Fixed layout for the 1824 x 671 box.
 */

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

// 12 open sorts; each participant = list of groups (card numbers)
const SORTS: number[][][] = [
  [[1, 2, 10, 16, 3], [5, 6, 15], [7, 9], [8], [4], [11, 12, 13, 14]],
  [[1, 2, 10, 16, 3], [5, 6, 15], [7, 9, 4, 8], [11, 12, 13, 14]],
  [[1, 2, 10, 16, 3], [5, 6, 15], [7, 9, 4], [8], [11, 12, 13, 14]],
  [[1, 2, 10, 16, 3], [5, 6, 15], [7, 9, 4, 8, 14], [11, 12, 13]],
  [[1, 2, 10, 16], [3, 4], [5, 6, 15], [7, 9, 8, 14], [11, 12, 13]],
  [[1, 2, 10, 16], [3, 4], [5, 6, 15], [7, 9], [8, 14], [11, 12, 13]],
  [[1, 2, 10, 16], [3, 4], [5, 6, 15], [7, 9, 8], [11, 12, 13, 14]],
  [[1, 2, 10, 16], [3, 4], [5, 6, 15], [7, 9], [8], [11, 12, 13, 14]],
  [[1, 2, 10, 16, 3], [5, 6, 15], [7, 9, 4], [8, 14], [11, 12, 13]],
  [[1, 2, 10, 16], [3], [5, 6, 15, 4], [7, 9, 8], [11, 12, 13, 14]],
  [[1, 10, 16, 3], [2], [5, 6, 15], [7, 9], [4, 8], [11, 12, 13, 14]],
  [[1, 2, 10, 16], [3, 4, 15], [5, 6], [7, 8], [9], [11], [12, 13, 14]],
];
const N = SORTS.length;

const sameGroup = (p: number[][], a: number, b: number) => p.some((g) => g.includes(a) && g.includes(b));
const countUpTo = (a: number, b: number, n: number) => SORTS.slice(0, n).filter((p) => sameGroup(p, a, b)).length;
const FULL = (a: number, b: number) => countUpTo(a, b, N);

const STRONG_MIN = 10;
const SPLIT_CARDS = [8, 3, 4, 14];
const EX_A = 2; // worked example: row "Oven timers" ...
const EX_B = 1; // ... column 1 "Next batch per oven"

// clustered order and suggested names
const CLUSTERS = [
  { name: 'Ovens now', ids: [1, 2, 10, 16], c: '#E5391C' },
  { name: 'Changes', ids: [5, 6, 15], c: '#2563EB' },
  { name: 'Packing', ids: [7, 9], c: '#059669' },
  { name: 'Night record', ids: [11, 12, 13], c: '#7C3AED' },
  { name: 'Not sure yet', ids: [3, 4, 8, 14], c: '#D97706' },
];
const CLUSTER_ORDER = CLUSTERS.flatMap((c) => c.ids);

const CELL = 34;
const AX = 44; // header band (column numbers)
const LABEL_W = 330; // row labels (card names)
const MAT_W = LABEL_W + 16 * CELL;
const MAT_H = AX + 16 * CELL;

type Last = 'init' | 'filling' | 'filled' | 'example' | 'strong' | 'cluster' | 'splits';

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-4 py-3 text-[24px] font-bold flex items-center gap-2.5 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-4 py-3 text-[24px] font-bold flex items-center gap-2.5 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnActive =
  'bg-[#222222] text-white rounded-xl px-4 py-3 text-[24px] font-bold flex items-center gap-2.5 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const SortResultsDemo: React.FC = () => {
  const [n, setN] = useState(0); // participants added so far
  const [example, setExample] = useState(false);
  const [strong, setStrong] = useState(false);
  const [clustered, setClustered] = useState(false);
  const [splits, setSplits] = useState(false);
  const [last, setLast] = useState<Last>('init');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);

  const filling = n > 0 && n < N;
  const done = n === N;

  const play = () => {
    stop();
    setN(0);
    setExample(false);
    setLast('filling');
    let k = 0;
    timer.current = setInterval(() => {
      k += 1;
      setN(k);
      if (k >= N) {
        stop();
        setLast('filled');
      }
    }, 450);
  };

  const reset = () => {
    stop();
    setN(0);
    setExample(false);
    setStrong(false);
    setClustered(false);
    setSplits(false);
    setLast('init');
  };

  const order = clustered ? CLUSTER_ORDER : IDS;
  const idx = (id: number) => order.indexOf(id);
  const colX = (id: number) => LABEL_W + idx(id) * CELL;
  const rowY = (id: number) => AX + idx(id) * CELL;

  const exCount = FULL(EX_A, EX_B);

  let reading: React.ReactNode;
  if (last === 'init') {
    reading = (
      <span className="flex items-start gap-3">
        <Brain size={28} className="text-[#E5391C] shrink-0 mt-1" />
        Think in silence: if 12 people sort these 16 cards on their own, which cards would nearly everyone put together?
      </span>
    );
  } else if (last === 'filling') {
    reading = `${n} of ${N} people have sorted. Each sort adds one to every pair of cards the person put in the same group.`;
  } else if (last === 'filled') {
    reading = 'Now the map is complete. Click "Read one square" to see how to read it.';
  } else if (last === 'example') {
    reading = (
      <div>
        Take the row <b>“{CARDS[EX_A]}”</b> and the column <b>{EX_B}</b> (“{CARDS[EX_B]}”). Where they cross, the square says <b className="text-[#E5391C]">{exCount}</b>:{' '}
        <b>{exCount} of the 12 people</b> put these two cards in the same group.
      </div>
    );
  } else if (last === 'strong') {
    const pairs: [number, number][] = [[1, 2], [5, 6], [7, 9], [11, 12], [10, 16]];
    reading = (
      <div>
        Green outlines: 10 or more of 12 agree. Examples:{' '}
        {pairs.map(([a, b], i) => (
          <span key={a}>
            {i > 0 && ', '}
            <b>{a} + {b}</b> ({FULL(a, b)})
          </span>
        ))}
        .
      </div>
    );
  } else if (last === 'cluster') {
    reading = (
      <div className="flex flex-col gap-2">
        <div>Same data, rows and columns reordered: blocks of dark squares appear. Each block is a group to try as a section.</div>
        <div className="flex flex-wrap gap-2 text-[24px] font-bold">
          {CLUSTERS.map((cl) => (
            <span key={cl.name} className="rounded-full px-3 py-1 text-white" style={{ background: cl.c }}>{cl.name}</span>
          ))}
        </div>
        <div className="text-[24px] text-[#525254]">Four cards (dashed) belong to no block yet.</div>
      </div>
    );
  } else {
    reading = (
      <div className="flex flex-col gap-1 text-[24px]">
        <div className="text-[26px] font-bold text-amber-700">Amber cards split the people. These are the design questions:</div>
        <div><b>8 Route order</b>: with Packing for {FULL(8, 7)} of 12, alone or with contacts for the rest.</div>
        <div><b>3 Quantities</b>: with Next batch for {FULL(3, 1)}, with Today's orders for {FULL(3, 4)}.</div>
        <div><b>4 Today's orders</b>: with Quantities for {FULL(4, 3)}, with Packing for {FULL(4, 7)}.</div>
        <div><b>14 Shop contacts</b>: with Night record for {FULL(14, 11)}, with Route for {FULL(14, 8)}.</div>
      </div>
    );
  }

  const heat = (c: number) => `rgba(229,57,28,${(0.06 + (c / N) * 0.9).toFixed(3)})`;

  return (
    <div className="flex-1 min-h-0 flex gap-6 px-6 py-3">
      {/* matrix */}
      <div className="relative shrink-0" style={{ width: MAT_W, height: MAT_H }}>
        {/* column header numbers */}
        {IDS.map((id) => {
          const hl = (example && (id === EX_B)) || (splits && SPLIT_CARDS.includes(id));
          return (
            <div
              key={`c${id}`}
              className="absolute flex items-center justify-center text-[22px] font-bold rounded-full text-white"
              style={{ left: colX(id) + 2, top: 6, width: CELL - 4, height: CELL - 4, background: splits && SPLIT_CARDS.includes(id) ? '#D97706' : example && id === EX_B ? '#E5391C' : '#222222', transition: 'left 800ms ease, background 400ms', outline: hl ? '3px solid rgba(229,57,28,.25)' : undefined }}
            >
              {id}
            </div>
          );
        })}
        <div className="absolute text-[22px] text-[#6E6D70]" style={{ left: 0, top: 2, width: LABEL_W - 12, textAlign: 'right', lineHeight: '34px' }}>
          card ▸ (column)
        </div>

        {/* row labels */}
        {IDS.map((id) => {
          const cl = clustered ? CLUSTERS.find((c) => c.ids.includes(id)) : undefined;
          const hl = example && id === EX_A;
          const sp = splits && SPLIT_CARDS.includes(id);
          return (
            <div
              key={`r${id}`}
              className={`absolute flex items-center justify-end gap-2 text-[22px] whitespace-nowrap ${hl ? 'font-bold text-[#E5391C]' : sp ? 'font-bold text-amber-700' : 'text-[#222222]'}`}
              style={{ left: 0, top: rowY(id), width: LABEL_W - 6, height: CELL, transition: 'top 800ms ease' }}
            >
              <span>{CARDS[id]}</span>
              <span
                className="shrink-0 w-7 h-7 rounded-full text-white text-[22px] font-bold flex items-center justify-center transition-colors duration-500"
                style={{ background: sp ? '#D97706' : hl ? '#E5391C' : cl ? cl.c : '#222222' }}
              >
                {id}
              </span>
            </div>
          );
        })}

        {/* example crosshair */}
        <div
          className="absolute pointer-events-none rounded-md"
          style={{ left: LABEL_W, top: rowY(EX_A), width: (idx(EX_B) + 1) * CELL, height: CELL, background: 'rgba(229,57,28,.14)', opacity: example ? 1 : 0, transition: 'opacity 400ms' }}
        />
        <div
          className="absolute pointer-events-none rounded-md"
          style={{ left: colX(EX_B), top: AX, width: CELL, height: (idx(EX_A) + 1) * CELL, background: 'rgba(229,57,28,.14)', opacity: example ? 1 : 0, transition: 'opacity 400ms' }}
        />

        {/* cells: each pair once (row below column) */}
        {IDS.map((a) =>
          IDS.map((b) => {
            if (idx(a) <= idx(b)) return null;
            const c = countUpTo(a, b, n);
            const isStrong = done && FULL(a, b) >= STRONG_MIN;
            const dim = strong && done && !isStrong;
            const isEx = example && ((a === EX_A && b === EX_B) || (a === EX_B && b === EX_A));
            const isSplit = splits && done && (SPLIT_CARDS.includes(a) || SPLIT_CARDS.includes(b));
            return (
              <div
                key={`${a}-${b}`}
                className="absolute"
                style={{ left: colX(b), top: rowY(a), width: CELL, height: CELL, padding: 1, transition: 'left 800ms ease, top 800ms ease, opacity 400ms', opacity: dim ? 0.2 : 1 }}
              >
                <div
                  className="w-full h-full rounded-[4px] flex items-center justify-center text-[22px] font-semibold"
                  style={{
                    background: n === 0 ? '#F3F0EA' : heat(c),
                    color: c >= 7 ? '#fff' : '#222222',
                    transition: 'background 350ms',
                    boxShadow: isEx ? '0 0 0 4px #E5391C' : strong && isStrong ? 'inset 0 0 0 3px #059669' : isSplit ? 'inset 0 0 0 3px #D97706' : undefined,
                  }}
                >
                  {n > 0 ? c : ''}
                </div>
              </div>
            );
          }),
        )}

        {/* diagonal ticks (a card with itself: not a pair) */}
        {IDS.map((id) => (
          <div key={`d${id}`} className="absolute rounded-[4px]" style={{ left: colX(id) + 1, top: rowY(id) + 1, width: CELL - 2, height: CELL - 2, background: '#EFEAE1', transition: 'left 800ms ease, top 800ms ease' }} />
        ))}

        {/* cluster outlines and names */}
        {CLUSTERS.map((cl) => {
          const start = CLUSTER_ORDER.indexOf(cl.ids[0]);
          const size = cl.ids.length * CELL;
          return (
            <React.Fragment key={cl.name}>
              <div
                className="absolute rounded-md pointer-events-none"
                style={{ left: LABEL_W + start * CELL, top: AX + start * CELL, width: size, height: size, border: `3px ${cl.name === 'Not sure yet' ? 'dashed' : 'solid'} ${cl.c}`, opacity: clustered ? 1 : 0, transition: 'opacity 600ms 500ms' }}
              />
            </React.Fragment>
          );
        })}
      </div>

      {/* right panel */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex items-center gap-3 h-[52px] text-[30px] font-bold text-[#222222]">
          <span>
            12 people sorted the 16 cards <span className="text-[24px] font-semibold text-[#6E6D70]">({n} of {N} added)</span>
          </span>
          <button className={btnSecondary + ' ml-auto'} onClick={reset}>
            <RotateCcw size={22} /> Reset
          </button>
        </div>

        {/* how to read */}
        <div className="rounded-2xl border border-[#E8E2D9] bg-white px-5 py-3 text-[24px] leading-[1.3] text-[#222222]">
          <div><b>Rows and columns:</b> the same 16 cards.</div>
          <div><b>One square:</b> one pair of cards.</div>
          <div><b>The number:</b> how many of the 12 put the pair in one group.</div>
          <div className="mt-2 flex items-center gap-3 text-[22px] text-[#525254]">
            <span>few</span>
            <span className="flex-1 h-4 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(229,57,28,.08), rgba(229,57,28,.96))' }} />
            <span>all 12</span>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button className={btnPrimary} disabled={filling} onClick={play}>
            <Play size={24} /> {done ? 'Replay sorts' : 'Add the 12 sorts'}
          </button>
          <button
            className={example ? btnActive : btnSecondary}
            disabled={!done}
            onClick={() => {
              setExample(!example);
              setLast(example ? 'filled' : 'example');
            }}
          >
            <MousePointerClick size={24} /> Read one square
          </button>
          <button
            className={strong ? btnActive : btnSecondary}
            disabled={!done}
            onClick={() => {
              setStrong(!strong);
              setLast(strong ? 'filled' : 'strong');
            }}
          >
            <Link2 size={24} /> Strong pairs
          </button>
          <button
            className={clustered ? btnActive : btnSecondary}
            disabled={!done}
            onClick={() => {
              setClustered(!clustered);
              setLast(clustered ? 'filled' : 'cluster');
            }}
          >
            <Boxes size={24} /> Cluster
          </button>
          <button
            className={splits ? btnActive : btnSecondary}
            disabled={!done}
            onClick={() => {
              setSplits(!splits);
              setLast(splits ? 'filled' : 'splits');
            }}
          >
            <Split size={24} /> Splits
          </button>
        </div>

        {/* reading */}
        <div className="flex-1 min-h-0 text-[26px] leading-[1.3] text-[#222222]">{reading}</div>
      </div>
    </div>
  );
};
