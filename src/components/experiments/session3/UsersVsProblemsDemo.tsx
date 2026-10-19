import React, { useState } from 'react';
import { Plus, RotateCcw, TrendingUp, Eye } from 'lucide-react';

/** Lecturer-run: private guess -> scripted users reveal hidden problems -> curve 1-(1-0.31)^n after a click. */

const PROBLEMS = [
  'Hold looks like the main button',
  'Reserve is tiny, in a far corner',
  'Errors only say "Invalid input."',
  'Clear erases the form, no question',
  'Nothing changes after Reserve',
  'The room must be typed as a code',
  'Date format is not shown',
  'Ten-minute limit in tiny print',
  'Room codes are on another tab',
  'Loud promo banner steals the eye',
  'Tiny text in the room list',
  'Booking rules in small print',
  '"Too long." gives no limit',
  'Tiny status dots',
  'Rooms listed in no order',
];

// What each scripted user runs into (indices into PROBLEMS). Repeats are on purpose.
const USERS: number[][] = [
  [0, 1, 2, 3, 4], //            U1: 5 new (about 31% of 15, like the classic model)
  [0, 2, 5, 6, 7], //            U2: 3 new
  [1, 5, 8, 9], //               U3: 2 new
  [0, 4, 10, 11], //             U4: 2 new
  [6, 3, 12], //                 U5: 1 new
  [0, 2, 5], //                  U6: 0 new
  [1, 7, 9], //                  U7: 0 new
  [8, 3, 13], //                 U8: 1 new
  [0, 4, 5], //                  U9: 0 new
  [1, 6, 10], //                 U10: 0 new (one problem is never found)
];

const RATE = 0.31;
const pct = (n: number) => 1 - Math.pow(1 - RATE, n);

type Phase = 'ask' | 'grid';

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

const Curve: React.FC = () => {
  const W = 760;
  const H = 296;
  const L = 74;
  const R = 22;
  const T = 24;
  const B = 62;
  const maxN = 15;
  const x = (n: number) => L + ((W - L - R) * n) / maxN;
  const y = (p: number) => T + (H - T - B) * (1 - p);
  const pts = Array.from({ length: maxN * 4 + 1 }, (_, i) => {
    const n = i / 4;
    return `${x(n).toFixed(1)},${y(pct(n)).toFixed(1)}`;
  }).join(' ');
  const marks = [1, 3, 5, 10];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block">
      <style>{`@keyframes uvDraw{from{stroke-dashoffset:1600}to{stroke-dashoffset:0}}
@keyframes uvFade{from{opacity:0}to{opacity:1}}`}</style>
      {[0, 0.5, 1].map((p) => (
        <g key={p}>
          <line x1={L} x2={W - R} y1={y(p)} y2={y(p)} stroke="#E8E2D9" strokeWidth={1.5} />
          <text x={L - 10} y={y(p) + 8} textAnchor="end" fontSize={22} fill="#525254">{Math.round(p * 100)}%</text>
        </g>
      ))}
      {[0, 5, 10, 15].map((n) => (
        <text key={n} x={x(n)} y={H - B + 26} textAnchor="middle" fontSize={22} fill="#525254">{n}</text>
      ))}
      <text x={(L + W - R) / 2} y={H - 4} textAnchor="middle" fontSize={22} fill="#6E6D70">Number of users</text>
      <polyline
        points={pts}
        fill="none"
        stroke="#E5391C"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1600}
        style={{ animation: 'uvDraw 1.6s ease-out both' }}
      />
      <g style={{ animation: 'uvFade .6s 1.4s both' }}>
        {marks.map((n) => (
          <g key={n}>
            <circle cx={x(n)} cy={y(pct(n))} r={n === 5 ? 11 : 7} fill={n === 5 ? '#E5391C' : '#fff'} stroke="#E5391C" strokeWidth={4} />
            {n !== 5 && (
              <text
                x={x(n) + (n === 10 ? 0 : 14)}
                y={y(pct(n)) + (n === 10 ? 34 : 30)}
                textAnchor={n === 10 ? 'middle' : 'start'}
                fontSize={22}
                fontWeight={700}
                fill="#222222"
              >
                {Math.round(pct(n) * 100)}%
              </text>
            )}
          </g>
        ))}
        <line x1={x(5)} x2={x(5)} y1={y(pct(5))} y2={H - B} stroke="#E5391C" strokeWidth={2.5} strokeDasharray="6 6" />
        <rect x={x(5) + 18} y={y(pct(5)) + 30} width={218} height={36} rx={8} fill="#E5391C" />
        <text x={x(5) + 127} y={y(pct(5)) + 55} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff">5 users: about 85%</text>
      </g>
    </svg>
  );
};

export const UsersVsProblemsDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('ask');
  const [n, setN] = useState(0);
  const [curve, setCurve] = useState(false);

  // first user who found each problem (-1 = not yet)
  const firstBy: number[] = PROBLEMS.map(() => -1);
  for (let u = 0; u < n; u++) for (const p of USERS[u]) if (firstBy[p] < 0) firstBy[p] = u;
  const found = firstBy.filter((v) => v >= 0).length;
  const cur = n > 0 ? USERS[n - 1] : [];
  const curNew = cur.filter((p) => firstBy[p] === n - 1).length;

  const reset = () => {
    setN(0);
    setCurve(false);
    setPhase('ask');
  };

  if (phase === 'ask') {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-7">
        <div className="text-[34px] font-bold text-[#222222] text-center">How many users do you need to find most of the problems?</div>
        <div className="flex gap-6">
          {[1, 3, 5, 10, 15].map((v) => (
            <div key={v} className="w-[170px] h-[130px] rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[58px] font-bold text-[#525254]">
              {v}
            </div>
          ))}
        </div>
        <div className="text-[32px] text-[#222222] text-center">Think in silence. Write your own number on paper. Nobody votes.</div>
        <button onClick={() => setPhase('grid')} className={`${btnPrimary} text-[28px]`}>
          <Eye className="w-7 h-7" /> Show how it works
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <div className="flex items-center gap-6 h-[48px]">
        <div className="text-[30px] font-bold text-[#222222]">
          Users: <span className="text-[#E5391C]">{n}</span> / Problems found: <span className="text-[#E5391C]">{found}</span> of 15
        </div>
        <div className="text-[24px] text-[#6E6D70]">Study Room Booking. A typical, scripted run for illustration.</div>
      </div>

      <div className="flex-1 min-h-0 flex gap-5">
        <div className="w-[1000px] shrink-0 flex flex-col gap-3">
          <div className="grid grid-cols-5 gap-2.5">
            {PROBLEMS.map((p, i) => {
              const by = firstBy[i];
              const isNew = by >= 0 && by === n - 1;
              const seenAgain = cur.includes(i) && !isNew;
              const cls =
                by < 0
                  ? 'bg-stone-200 border-stone-300 text-[#6E6D70]'
                  : isNew
                    ? 'bg-emerald-100 border-emerald-500 text-[#222222]'
                    : 'bg-white border-[#E8E2D9] text-[#222222]';
              return (
                <div
                  key={p}
                  className={`relative h-[118px] rounded-xl border-2 px-3 py-2 flex items-center transition-colors duration-500 ${cls} ${seenAgain ? 'ring-4 ring-blue-500' : ''}`}
                >
                  {by < 0 ? (
                    <span className="text-[34px] font-bold mx-auto">?</span>
                  ) : (
                    <span className="text-[22px] leading-tight">{p}</span>
                  )}
                  {by >= 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#222222] text-white text-[16px] font-bold rounded-full px-2 py-0.5">U{by + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-[26px] text-[#525254] min-h-[72px]">
            {n === 0 && 'Fifteen problems are hiding in this interface. Each user will run into only some of them.'}
            {n > 0 && (
              <>
                User {n} ran into {cur.length} problems: <b className="text-emerald-700">{curNew} new</b> (green), {cur.length - curNew} already known (blue ring).
                {n === 10 && found < 15 && ' Even after 10 users, one problem is still hidden.'}
              </>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-3">
          {!curve ? (
            <div className="flex-1 min-h-0 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl px-5 py-4 overflow-hidden">
              <div className="text-[28px] font-bold text-[#222222] mb-2">New problems per user</div>
              {n === 0 && <div className="text-[26px] text-[#6E6D70]">Add a user to start.</div>}
              <div className="flex flex-col gap-1.5">
                {USERS.slice(0, n).map((u, i) => {
                  const newCount = u.filter((p) => firstBy[p] === i).length;
                  return (
                    <div key={i} className="flex items-center gap-4 text-[24px] text-[#222222]">
                      <span className="w-[120px] font-bold">User {i + 1}</span>
                      <span className="flex gap-1.5">
                        {Array.from({ length: Math.max(newCount, 0) }, (_, k) => (
                          <span key={k} className="w-[26px] h-[26px] rounded-md bg-emerald-500" />
                        ))}
                        {newCount === 0 && <span className="text-[#6E6D70]">no new problem</span>}
                      </span>
                      <span className="text-[#6E6D70]">{newCount > 0 ? `${newCount} new` : ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="h-[330px] shrink-0 bg-white border border-[#E8E2D9] rounded-2xl px-2 pt-2">
                <div className="text-[24px] font-bold text-[#222222] px-3 -mb-1">Share of problems found: 1 - (1 - 0.31)<sup>n</sup></div>
                <div className="h-[290px]"><Curve /></div>
              </div>
              <div className="flex-1 min-h-0 bg-amber-50 border border-amber-400 rounded-2xl px-5 py-3 text-[22px] leading-snug text-[#222222] overflow-hidden flex items-center">
                <span>
                  <b>Honest caveat.</b> A rule of thumb (Nielsen and Landauer) for one round of tests with one kind of user. Different users find different problems, so test again after each fix.
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button onClick={() => setN(Math.min(10, n + 1))} disabled={n >= 10} className={btnPrimary}>
          <Plus className="w-6 h-6" /> Add a user
        </button>
        <button onClick={() => setCurve(true)} disabled={curve || n < 1} className={btnPrimary}>
          <TrendingUp className="w-6 h-6" /> Show the curve
        </button>
        <button onClick={reset} className={`${btnSecondary} ml-auto`}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
      </div>
    </div>
  );
};
