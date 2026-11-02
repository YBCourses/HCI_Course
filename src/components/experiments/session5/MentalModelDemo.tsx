import React, { useState } from 'react';
import { Eye, ArrowRight, ArrowLeft, RotateCcw, Sparkles, ChefHat, Flame, Package, Truck, LayoutGrid, Check } from 'lucide-react';

// AHA: a mental model is "where I expect to find it". The same item is expected in different drawers by different
// people. The structure can only put it in ONE place, so we ask people (card sort) and test (tree test) instead of guessing.
// Visual: the future tool is a set of DRAWERS; each person's chip lands in the drawer they would open.

type Role = 'Hassan' | 'Salma' | 'Youssef' | 'Amine';
type Exp = { kind: 'place'; place: string } | { kind: 'unknown' } | { kind: 'none' } | { kind: 'na' };

const ROLES: { key: Role; title: string; Icon: React.FC<{ className?: string }>; chip: string; dot: string }[] = [
  { key: 'Hassan', title: 'Head baker', Icon: ChefHat, chip: 'bg-red-50 border-red-300 text-red-800', dot: 'bg-red-500' },
  { key: 'Salma', title: 'Oven baker', Icon: Flame, chip: 'bg-blue-50 border-blue-300 text-blue-800', dot: 'bg-blue-600' },
  { key: 'Youssef', title: 'Packer', Icon: Package, chip: 'bg-emerald-50 border-emerald-300 text-emerald-800', dot: 'bg-emerald-600' },
  { key: 'Amine', title: 'Driver', Icon: Truck, chip: 'bg-amber-50 border-amber-300 text-amber-800', dot: 'bg-amber-600' },
];

const DRAWERS = ['Now', 'Ovens', 'Orders', 'Packing', 'Route', 'Night record'];
const NOT_SURE = 'Not sure';
const ALL_DRAWERS = [...DRAWERS, NOT_SURE];

const p = (place: string): Exp => ({ kind: 'place', place });
const NONE: Exp = { kind: 'none' };
const NA: Exp = { kind: 'na' };
const UNKNOWN: Exp = { kind: 'unknown' };

// Source: session5-case.md "Mental models" (illustrative, from the interviews, in our case). 'na' = the case does not say.
const ITEMS: { name: string; exp: Record<Role, Exp>; reading: string }[] = [
  { name: 'Packing order', exp: { Hassan: NA, Salma: p('Orders'), Youssef: p('Packing'), Amine: p('Route') },
    reading: 'Three people, three drawers. Wherever we put it, two of them will not find it.' },
  { name: 'Order changes (NEW)', exp: { Hassan: p('Now'), Salma: p('Ovens'), Youssef: p('Orders'), Amine: p('Orders') },
    reading: 'Only two agree (Orders). The person who decides expects it on the main screen: a risk to test.' },
  { name: 'Oven timers', exp: { Hassan: p('Now'), Salma: p('Ovens'), Youssef: NONE, Amine: NONE },
    reading: 'Two people look for it, each in a different drawer. The others never look.' },
  { name: 'Handover notes', exp: { Hassan: p('Night record'), Salma: UNKNOWN, Youssef: UNKNOWN, Amine: UNKNOWN },
    reading: 'Only Hassan has a drawer in mind. The others do not know: they would be lost.' },
  { name: 'Crates per shop', exp: { Hassan: p('Packing'), Salma: p('Orders'), Youssef: p('Packing'), Amine: p('Route') },
    reading: 'Hassan and the packer agree on Packing. The driver and the oven baker look elsewhere.' },
  { name: 'Waste count', exp: { Hassan: p('Night record'), Salma: NONE, Youssef: NONE, Amine: NONE },
    reading: 'Only Hassan looks for it, so it can live in a quiet drawer. Put it where he looks.' },
];

const drawerOf = (e: Exp) => (e.kind === 'place' ? e.place : NOT_SURE);
const statusOf = (e: Exp) => (e.kind === 'none' ? 'would not look' : e.kind === 'unknown' ? 'does not know' : e.kind === 'na' ? 'not asked' : '');

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const css = `
@keyframes mmPop { 0% { opacity: 0; transform: translateY(-26px) scale(.7); } 70% { transform: translateY(3px) scale(1.04); } 100% { opacity: 1; transform: none; } }
.mm-pop { animation: mmPop 520ms cubic-bezier(.2,.9,.3,1.2) both; }
`;

export const MentalModelDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [summary, setSummary] = useState(false);
  const item = ITEMS[idx];

  const go = (d: number) => { setIdx((i) => Math.min(ITEMS.length - 1, Math.max(0, i + d))); setRevealed(false); setSummary(false); };
  const reset = () => { setIdx(0); setRevealed(false); setSummary(false); };

  // who sits in which drawer for the current item (in reveal order)
  const byDrawer: Record<string, { role: (typeof ROLES)[number]; exp: Exp; order: number }[]> = {};
  ROLES.forEach((r, order) => { const e = item.exp[r.key]; (byDrawer[drawerOf(e)] ||= []).push({ role: r, exp: e, order }); });
  const agreeIn = (name: string) => (byDrawer[name] || []).filter((c) => c.exp.kind === 'place').length >= 2;

  const agreeCount = ITEMS.filter((it) => {
    const c: Record<string, number> = {};
    ROLES.forEach((r) => { const e = it.exp[r.key]; if (e.kind === 'place') c[e.place] = (c[e.place] || 0) + 1; });
    return Math.max(0, ...Object.values(c)) >= 2;
  }).length;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <style>{css}</style>
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => (summary ? setSummary(false) : go(-1))} disabled={idx === 0 && !summary} className={SECONDARY}><ArrowLeft className="w-6 h-6" />Previous</button>
        <button onClick={() => setRevealed(true)} disabled={revealed || summary} className={PRIMARY}><Eye className="w-6 h-6" />Reveal</button>
        <button onClick={() => go(1)} disabled={idx === ITEMS.length - 1 || summary} className={PRIMARY}><ArrowRight className="w-6 h-6" />Next item</button>
        <button onClick={() => setSummary(true)} disabled={summary} className={SECONDARY}><LayoutGrid className="w-6 h-6" />All six</button>
        <div className="flex-1" />
        {!summary && <div className="text-[28px] font-bold text-[#222222]">{idx + 1} <span className="text-[#6E6D70] font-normal">of {ITEMS.length}</span></div>}
        <button onClick={reset} className={SECONDARY}><RotateCcw className="w-6 h-6" />Reset</button>
      </div>

      {!summary ? (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {/* the item + the question */}
          <div className="h-[104px] flex-shrink-0 flex items-stretch gap-4">
            <div className="w-[520px] flex-shrink-0 rounded-2xl border-2 border-[#E5391C] bg-white shadow-md px-6 flex flex-col justify-center">
              <div className="text-[22px] text-[#525254]">Where does this belong?</div>
              <div className="text-[34px] font-bold leading-[1.15] text-[#222222]">{item.name}</div>
            </div>
            <div className="flex-1 rounded-2xl border border-dashed border-[#E8E2D9] bg-[#FAF9F6] px-6 flex items-center gap-4 text-[26px] leading-[1.25] text-[#525254]">
              <Sparkles className="w-8 h-8 text-[#E5391C] flex-shrink-0" />
              <span>
                Each drawer is a place in the future tool. A <b className="text-[#222222]">mental model</b> is the drawer a person expects to open.{' '}
                {!revealed && <b className="text-[#E5391C]">Think in silence: which drawer would you open?</b>}
              </span>
            </div>
          </div>

          {/* the drawers */}
          <div className="flex-1 min-h-0 grid grid-cols-7 gap-3">
            {ALL_DRAWERS.map((d) => {
              const here = revealed ? byDrawer[d] || [] : [];
              const agree = revealed && agreeIn(d);
              const isNS = d === NOT_SURE;
              return (
                <div
                  key={d}
                  className={`rounded-2xl flex flex-col min-h-0 overflow-hidden transition-all duration-300 ${
                    isNS ? 'border-2 border-dashed border-[#C9C3B8] bg-[#FAF9F6]' : 'border-2 bg-white'
                  } ${agree ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.18)]' : isNS ? '' : 'border-[#E8E2D9]'}`}
                >
                  <div className={`px-3 py-2.5 border-b ${isNS ? 'border-dashed border-[#C9C3B8]' : 'border-[#E8E2D9] bg-[#F5F2ED]'} flex items-center justify-between gap-2`}>
                    <div className="text-[26px] font-bold leading-tight text-[#222222]">{d}</div>
                    {agree && <span className="rounded-full bg-emerald-600 text-white p-1"><Check className="w-5 h-5" /></span>}
                  </div>
                  <div className="flex-1 min-h-0 p-2.5 flex flex-col gap-2">
                    {here.map((c) => {
                      const Ico = c.role.Icon; const st = statusOf(c.exp);
                      return (
                        <div
                          key={c.role.key}
                          className={`mm-pop rounded-xl border-2 px-2.5 py-1.5 ${c.role.chip} ${c.exp.kind !== 'place' ? 'opacity-70 border-dashed' : ''}`}
                          style={{ animationDelay: `${c.order * 260}ms` }}
                        >
                          <div className="flex items-center gap-2 text-[26px] font-bold leading-tight"><Ico className="w-6 h-6 flex-shrink-0" />{c.role.key}</div>
                          {st && <div className="text-[22px] leading-tight">{st}</div>}
                        </div>
                      );
                    })}
                    {!revealed && <div className="m-auto text-[#D5CFC4] text-[40px] font-bold">?</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* the reading */}
          <div className={`h-[64px] flex-shrink-0 rounded-2xl border px-6 flex items-center text-[28px] leading-[1.2] ${revealed ? 'border-[#FAD6CF] bg-[#FDF5F3] text-[#222222]' : 'border-[#E8E2D9] bg-white text-[#6E6D70]'}`}>
            {revealed ? item.reading : 'Then the lecturer reveals the drawer each person would open.'}
          </div>
        </div>
      ) : (
        /* summary of the six items */
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden">
            <div className="grid" style={{ gridTemplateColumns: '300px repeat(7, 1fr)' }}>
              <div className="px-4 py-2 text-[22px] text-[#6E6D70] bg-[#F5F2ED]">Item</div>
              {ALL_DRAWERS.map((d) => <div key={d} className="px-2 py-2 text-[22px] font-bold text-[#222222] bg-[#F5F2ED] text-center leading-tight">{d}</div>)}
              {ITEMS.map((it) => (
                <React.Fragment key={it.name}>
                  <div className="px-4 py-2 text-[26px] font-bold text-[#222222] border-t border-[#E8E2D9] flex items-center">{it.name}</div>
                  {ALL_DRAWERS.map((d) => {
                    const here = ROLES.filter((r) => drawerOf(it.exp[r.key]) === d);
                    return (
                      <div key={d} className="border-t border-l border-[#F0EBE3] px-1 py-2 flex flex-wrap items-center justify-center gap-1.5 min-h-[62px]">
                        {here.map((r) => (
                          <span key={r.key} title={r.key} className={`w-9 h-9 rounded-full text-white text-[22px] font-bold flex items-center justify-center ${r.dot} ${it.exp[r.key].kind !== 'place' ? 'opacity-45' : ''}`}>{r.key[0]}</span>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="h-[64px] flex-shrink-0 rounded-2xl border border-[#FAD6CF] bg-[#FDF5F3] px-6 flex items-center gap-6 text-[28px] leading-[1.2] text-[#222222]">
            <span>Only <b>{agreeCount} of {ITEMS.length}</b> items have two people who agree. So we ask people to sort, and we test the result.</span>
            <span className="ml-auto flex items-center gap-3 text-[22px]">
              {ROLES.map((r) => <span key={r.key} className="flex items-center gap-1.5"><span className={`w-6 h-6 rounded-full ${r.dot}`} />{r.key}</span>)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
