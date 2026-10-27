import React, { useMemo, useState } from 'react';
import { RotateCcw, SearchCheck, AlertTriangle } from 'lucide-react';

/**
 * Lecturer-run traceability graph: Pain points -> Requirements -> Success measures -> Business goal (Fresh Batch case).
 * Click any node to light its whole chain. "Check for orphans" flags R11: nothing behind it, nothing to measure.
 * AHA: every requirement must trace back to evidence (and forward to a measure and a goal); a line that cannot be
 * traced is a wish, not a requirement.
 * Fixed layout for the 1824 x 671 box.
 */

type Col = 0 | 1 | 2 | 3;
interface Node {
  id: string;
  col: Col;
  y: number;
  h: number;
  title: string;
  sub?: string;
  short: string;
}

const COLW = 372;
const GAP = 112;
const colX = (c: Col) => c * (COLW + GAP);
const TOP = 54;

const REQ_H = 74;
const REQ_STEP = 86;
const reqY = (i: number) => TOP + i * REQ_STEP;
const PAIN_H = 112;
const PAIN_STEP = 132;
const painY = (i: number) => TOP + i * PAIN_STEP;

const NODES: Node[] = [
  { id: 'P2', col: 0, y: painY(0), h: PAIN_H, title: 'Ovens wait for a decision', sub: 'notes 2, 5', short: 'Ovens wait' },
  { id: 'P1', col: 0, y: painY(1), h: PAIN_H, title: 'Changes get lost', sub: 'notes 3, 4, 6', short: 'Changes get lost' },
  { id: 'P3', col: 0, y: painY(2), h: PAIN_H, title: 'Packing order unknown', sub: 'notes 7, 9', short: 'Packing order unknown' },
  { id: 'P4', col: 0, y: painY(3), h: PAIN_H, title: 'Hands always busy', sub: 'note 12', short: 'Hands busy' },

  { id: 'R1', col: 1, y: reqY(0), h: REQ_H, title: 'R1 Next batch readable from 3 m in 3 s', short: 'R1' },
  { id: 'R2', col: 1, y: reqY(1), h: REQ_H, title: 'R2 Every change reaches all within 1 min', short: 'R2' },
  { id: 'R3', col: 1, y: reqY(2), h: REQ_H, title: 'R3 Nothing erased by accident', short: 'R3' },
  { id: 'R4', col: 1, y: reqY(3), h: REQ_H, title: 'R4 Packing order visible at table and dock', short: 'R4' },
  { id: 'R5', col: 1, y: reqY(4), h: REQ_H, title: 'R5 Usable with floury hands, no touch', short: 'R5' },
  { id: 'R11', col: 1, y: reqY(5), h: REQ_H, title: 'R11 Sales charts and weekly dashboards', short: 'R11' },

  { id: 'M1', col: 2, y: reqY(0), h: REQ_H, title: '6 of 8 read it from 3 m within 3 s', short: 'M1' },
  { id: 'M2', col: 2, y: reqY(1), h: REQ_H, title: 'Seen by all within 60 seconds', short: 'M2' },
  { id: 'M3', col: 2, y: reqY(2), h: REQ_H, title: 'Zero lost order lines in a week', short: 'M3' },
  { id: 'M4', col: 2, y: reqY(3), h: REQ_H, title: '"Which shop first?" questions: 0 a night', short: 'M4' },
  { id: 'M5', col: 2, y: reqY(4), h: REQ_H, title: 'All key information readable, no touch', short: 'M5' },

  { id: 'G1', col: 3, y: 66, h: 210, title: 'Late deliveries', sub: 'from 3 a month to at most 1', short: 'Late deliveries down' },
  { id: 'G2', col: 3, y: 316, h: 210, title: 'Waste', sub: 'from 6% to 3%', short: 'Waste down' },
];

const EDGES: [string, string][] = [
  ['P2', 'R1'],
  ['P1', 'R2'],
  ['P1', 'R3'],
  ['P3', 'R4'],
  ['P4', 'R5'],
  ['R1', 'M1'],
  ['R2', 'M2'],
  ['R3', 'M3'],
  ['R4', 'M4'],
  ['R5', 'M5'],
  ['M1', 'G2'],
  ['M2', 'G1'],
  ['M3', 'G1'],
  ['M4', 'G1'],
  ['M5', 'G2'],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, Node>;

const COL_HEAD = ['1  Pain points (evidence)', '2  Requirements', '3  Success measures', '4  Business goal'];
const COL_TONE = [
  { box: 'border-amber-300 bg-amber-50', lit: 'border-amber-500 bg-amber-100', head: 'text-amber-700' },
  { box: 'border-blue-300 bg-blue-50', lit: 'border-blue-600 bg-blue-100', head: 'text-blue-700' },
  { box: 'border-emerald-300 bg-emerald-50', lit: 'border-emerald-600 bg-emerald-100', head: 'text-emerald-700' },
  { box: 'border-[#D8D1C5] bg-white', lit: 'border-[#E5391C] bg-red-50', head: 'text-[#E5391C]' },
];

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const TraceabilityDemo: React.FC = () => {
  const [sel, setSel] = useState<string | null>(null);
  const [orphans, setOrphans] = useState(false);

  // every node connected to the selection, going back to evidence and forward to the goal
  const chain = useMemo(() => {
    if (!sel) return new Set<string>();
    const seen = new Set<string>([sel]);
    const walk = (from: number, to: number) => {
      const stack = [sel];
      while (stack.length) {
        const cur = stack.pop()!;
        EDGES.forEach((e) => {
          if (e[from] === cur && !seen.has(e[to])) {
            seen.add(e[to]);
            stack.push(e[to]);
          }
        });
      }
    };
    walk(1, 0); // backwards
    walk(0, 1); // forwards
    return seen;
  }, [sel]);

  const pick = (id: string) => {
    setOrphans(false);
    setSel((s) => (s === id ? null : id));
  };

  const message = (() => {
    if (orphans)
      return 'R11 has no pain point behind it and no measure to test it. Without evidence it is a wish: not now.';
    if (sel) {
      const names = (c: Col) => NODES.filter((n) => n.col === c && chain.has(n.id)).map((n) => (c === 0 || c === 3 ? n.short : n.id.startsWith('M') ? n.title : n.id));
      return `Evidence: ${names(0).join(', ') || '-'}   →   Requirements: ${names(1).join(', ') || '-'}   →   Goal: ${names(3).join(', ') || '-'}`;
    }
    return 'Think in silence: which requirement answers each pain point? Then click a pain point.';
  })();

  const reset = () => {
    setSel(null);
    setOrphans(false);
  };

  const anchor = (n: Node, side: 'l' | 'r') => ({ x: colX(n.col) + (side === 'r' ? COLW : 0), y: n.y + n.h / 2 });

  return (
    <div className="flex-1 min-h-0 relative select-none overflow-hidden">
      <style>{`@keyframes trPulse{0%,100%{box-shadow:0 0 0 0 rgba(229,57,28,.5)}50%{box-shadow:0 0 0 10px rgba(229,57,28,0)}}`}</style>

      {/* column headers */}
      {COL_HEAD.map((h, i) => (
        <div key={h} className={`absolute text-[28px] font-bold ${COL_TONE[i].head}`} style={{ left: colX(i as Col), top: 0, width: COLW }}>
          {h}
        </div>
      ))}

      {/* links */}
      <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 1824 671" preserveAspectRatio="none">
        {EDGES.map(([a, b]) => {
          const s = anchor(byId[a], 'r');
          const t = anchor(byId[b], 'l');
          const lit = !!sel && chain.has(a) && chain.has(b);
          const mid = (s.x + t.x) / 2;
          return (
            <path
              key={a + b}
              d={`M${s.x},${s.y} C${mid},${s.y} ${mid},${t.y} ${t.x},${t.y}`}
              fill="none"
              stroke={lit ? '#E5391C' : '#CFC8BB'}
              strokeWidth={lit ? 5 : 2.5}
              opacity={sel && !lit ? 0.25 : 1}
              style={{ transition: 'all .5s ease' }}
            />
          );
        })}
        {orphans && (
          <g>
            <line x1={colX(1) - 70} y1={byId.R11.y + REQ_H / 2} x2={colX(1)} y2={byId.R11.y + REQ_H / 2} stroke="#DC2626" strokeWidth={4} strokeDasharray="8 7" />
            <line x1={colX(1) - 84} y1={byId.R11.y + REQ_H / 2 - 12} x2={colX(1) - 60} y2={byId.R11.y + REQ_H / 2 + 12} stroke="#DC2626" strokeWidth={5} />
            <line x1={colX(1) - 84} y1={byId.R11.y + REQ_H / 2 + 12} x2={colX(1) - 60} y2={byId.R11.y + REQ_H / 2 - 12} stroke="#DC2626" strokeWidth={5} />
          </g>
        )}
      </svg>

      {/* nodes */}
      {NODES.map((n) => {
        const tone = COL_TONE[n.col];
        const lit = !!sel && chain.has(n.id);
        const dim = !!sel && !lit;
        const orphan = orphans && n.id === 'R11';
        return (
          <button
            key={n.id}
            onClick={() => pick(n.id)}
            className={`absolute text-left rounded-xl border-2 px-4 cursor-pointer flex flex-col justify-center transition-all duration-500 ${
              orphan ? 'border-red-600 bg-red-100' : lit ? tone.lit : tone.box
            } ${lit && n.id === sel ? 'shadow-lg' : ''}`}
            style={{
              left: colX(n.col),
              top: n.y,
              width: COLW,
              height: n.h,
              opacity: dim ? 0.3 : 1,
              animation: orphan ? 'trPulse 1.4s ease-in-out 3' : undefined,
            }}
          >
            <div className={`leading-tight text-[#222222] ${n.col === 0 || n.col === 3 ? 'text-[28px] font-bold' : 'text-[22px] font-semibold'}`}>{n.title}</div>
            {n.sub && <div className="text-[24px] text-[#525254] mt-1">{n.sub}</div>}
            {orphan && (
              <div className="absolute -bottom-5 right-3 z-10 bg-red-600 text-white text-[22px] font-bold rounded-lg px-3 py-0.5 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> no evidence
              </div>
            )}
          </button>
        );
      })}

      {/* ghost measure for the orphan */}
      {orphans && (
        <div
          className="absolute rounded-xl border-2 border-dashed border-red-500 px-4 flex items-center text-[22px] font-semibold text-red-600"
          style={{ left: colX(2), top: byId.R11.y, width: COLW, height: REQ_H }}
        >
          no measure: how would we test it?
        </div>
      )}

      {/* message + buttons */}
      <div className="absolute flex items-center text-[24px] leading-snug text-[#222222]" style={{ left: 0, top: 596, width: 1300, height: 70 }}>
        {message}
      </div>
      <div className="absolute flex gap-4" style={{ left: 1340, top: 600 }}>
        <button
          onClick={() => {
            setSel(null);
            setOrphans(true);
          }}
          disabled={orphans}
          className={btnPrimary}
        >
          <SearchCheck className="w-6 h-6" /> Check for orphans
        </button>
        <button onClick={reset} className={btnSecondary}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
      </div>
    </div>
  );
};
