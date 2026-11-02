import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Sparkles, Merge, Info, Zap, Ban, ListChecks } from 'lucide-react';

// AHA: every requirement hides several things (information to show, actions to allow). Without this inventory,
// nothing has a home in the structure: 19 things come out of just six requirements. Duplicates merge.

type Kind = 'info' | 'action';
interface Req { id: string; short: string; line: string; items: { name: string; kind: Kind; dup?: boolean }[]; note?: string }

// Source: session5-case.md "Content inventory" (19 distinct items). Items the case does not tie to a
// requirement are shown as "also hiding" behind the closest requirement.
const STEPS: Req[] = [
  { id: 'R1', short: 'Next batch readable at 3 m', line: 'Read the next batch from 3 metres in 3 seconds',
    items: [
      { name: 'Next batch per oven', kind: 'info' }, { name: 'Oven timers (40-minute cycles)', kind: 'info' }, { name: 'Quantities per product', kind: 'info' },
      { name: 'Oven status (free / baking)', kind: 'info' }, { name: 'Product list', kind: 'info' }, { name: 'Mark a batch as done', kind: 'action' },
    ] },
  { id: 'R2', short: 'Changes reach all in 1 min', line: 'Every order change reaches all stations in 1 minute',
    items: [
      { name: 'Order changes (NEW)', kind: 'info' }, { name: 'Late-change deadline (03:30)', kind: 'info' }, { name: 'Shop contacts', kind: 'info' },
      { name: 'Confirm a change was seen', kind: 'action' },
    ] },
  { id: 'R3', short: 'Nothing erased by accident', line: 'Nothing important is erased by accident',
    items: [{ name: 'Order changes (NEW)', kind: 'info', dup: true }, { name: 'Today’s orders by shop', kind: 'info' }] },
  { id: 'R4', short: 'Packing order visible', line: 'The packing order is visible at the table and the dock',
    items: [{ name: 'Packing order (which shop first)', kind: 'info' }, { name: 'Crates per shop', kind: 'info' }, { name: 'Route order for the driver', kind: 'info' }] },
  { id: 'R5', short: 'Usable without touching', line: 'Usable with floury or gloved hands, without touching',
    items: [], note: 'No new thing: it is a rule for every thing above. All of it must be readable with no touch.' },
  { id: 'R10', short: 'Record for next shift', line: 'A record of the night for the next shift',
    items: [
      { name: 'Handover notes', kind: 'info' }, { name: 'Waste count', kind: 'info' }, { name: 'Late deliveries log', kind: 'info' },
      { name: 'Shift schedule', kind: 'info' }, { name: 'Add a handover note', kind: 'action' },
    ] },
];
const WONT = [{ id: 'R11', short: 'Sales charts' }, { id: 'R12', short: 'Weather forecast' }];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const ContentInventoryDemo: React.FC = () => {
  const [step, setStep] = useState(0); // number of requirements opened

  const shown = STEPS.slice(0, step);
  const board: { name: string; kind: Kind; req: string[]; fresh: boolean }[] = [];
  shown.forEach((r, ri) => {
    r.items.forEach((it) => {
      const ex = board.find((b) => b.name === it.name);
      if (ex) { ex.req.push(r.id); if (ri === step - 1) ex.fresh = true; }
      else board.push({ name: it.name, kind: it.kind, req: [r.id], fresh: ri === step - 1 });
    });
  });
  // fresh flag only for items touched by the latest step
  const current = step > 0 ? STEPS[step - 1] : null;
  const done = step >= STEPS.length;
  const info = board.filter((b) => b.kind === 'info');
  const act = board.filter((b) => b.kind === 'action');

  const chip = (b: { name: string; req: string[]; fresh: boolean }) => (
    <div
      key={b.name}
      className={`rounded-xl border-2 px-3 py-2 text-[22px] font-semibold leading-[1.2] text-[#222222] bg-white flex items-center gap-2 ${b.fresh ? 'border-[#E5391C]' : 'border-[#E8E2D9]'}`}
      style={b.fresh ? { animation: 'ciFly 700ms cubic-bezier(.2,.7,.3,1)' } : undefined}
    >
      <span>{b.name}</span>
      <span className="flex gap-1">
        {b.req.map((r) => (
          <span key={r} className={`rounded-md px-1.5 text-[22px] font-bold ${r === 'R10' ? 'bg-stone-200 text-stone-700' : 'bg-red-50 text-[#E5391C]'}`}>{r}</span>
        ))}
      </span>
    </div>
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))} disabled={done} className={PRIMARY}>
          <ArrowRight className="w-6 h-6" />
          Show next requirement
        </button>
        <div className="flex-1" />
        <div className="text-[28px] font-bold text-[#222222]">
          {board.length} <span className="text-[#6E6D70] font-normal">{board.length === 1 ? 'thing' : 'things'}</span>
        </div>
        <button onClick={() => setStep(0)} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 flex gap-4">
        {/* requirement chips */}
        <div className="w-[470px] flex-shrink-0 flex flex-col gap-2">
          {STEPS.map((r, i) => {
            const opened = i < step, isCur = i === step - 1;
            return (
              <div
                key={r.id}
                className={`flex-1 min-h-0 rounded-xl border-2 px-4 flex items-center gap-3 text-[24px] transition-colors duration-500 ${
                  isCur ? 'border-[#E5391C] bg-red-50 font-bold' : opened ? 'border-[#E8E2D9] bg-white' : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#525254]'
                }`}
              >
                <span className={`rounded-lg px-2 font-bold ${opened ? 'bg-[#E5391C] text-white' : 'bg-stone-200 text-stone-600'}`}>{r.id}</span>
                <span className="text-[#222222] leading-[1.15] flex-1 min-w-0 truncate">{r.short}</span>
                {opened && <span className="font-bold text-[#E5391C]">{r.items.length === 0 ? '0' : `+${r.items.length}`}</span>}
              </div>
            );
          })}
          {WONT.map((r) => (
            <div key={r.id} className="flex-1 min-h-0 rounded-xl border-2 border-dashed border-[#E8E2D9] px-4 flex items-center gap-3 text-[24px] opacity-45">
              <span className="rounded-lg px-2 font-bold bg-stone-200 text-stone-600">{r.id}</span>
              <span className="flex-1 min-w-0 truncate text-[#525254] line-through">{r.short}</span>
              <span className="flex items-center gap-1 font-bold text-[#525254]"><Ban className="w-5 h-5" />Won’t</span>
            </div>
          ))}
        </div>

        {/* board */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="h-[84px] flex-shrink-0 rounded-2xl border-2 border-[#E8E2D9] bg-[#FAF9F6] px-5 flex items-center gap-3">
            {done ? (
              <>
                <ListChecks className="w-8 h-8 text-[#E5391C] flex-shrink-0" />
                <div className="text-[28px] leading-[1.2] font-bold text-[#222222]">Every requirement hid several things: 6 requirements, {board.length} things.</div>
              </>
            ) : current ? (
              <>
                <Info className="w-8 h-8 text-[#E5391C] flex-shrink-0" />
                <div className="text-[26px] leading-[1.2] text-[#222222]">
                  <b>{current.id}</b>: {current.line}.{' '}
                  {current.note ? <span className="text-[#525254]">{current.note}</span> : null}
                  {current.items.some((x) => x.dup) && (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700"> <Merge className="w-6 h-6" /> Order changes is already on the board: merged.</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <Sparkles className="w-8 h-8 text-[#E5391C] flex-shrink-0" />
                <div className="text-[26px] leading-[1.2] text-[#525254]">Think in silence: what must the tool hold or do for just the first requirement?</div>
              </>
            )}
          </div>

          <div className="flex-1 min-h-0 flex gap-3">
            <div className="flex-1 min-w-0 rounded-2xl border-2 border-blue-300 bg-blue-50/40 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 px-4 py-2.5 bg-blue-600 text-white flex items-center gap-2 text-[30px] font-bold leading-tight">
                Information <span className="ml-auto text-[28px]">{info.length}</span>
              </div>
              <div className="flex-1 min-h-0 p-3 flex flex-wrap content-start gap-2 overflow-hidden">{info.map(chip)}</div>
            </div>
            <div className="w-[400px] flex-shrink-0 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 px-4 py-2.5 bg-emerald-600 text-white flex items-center gap-2 text-[30px] font-bold leading-tight">
                <Zap className="w-7 h-7" /> Actions <span className="ml-auto text-[28px]">{act.length}</span>
              </div>
              <div className="flex-1 min-h-0 p-3 flex flex-wrap content-start gap-2 overflow-hidden">{act.map(chip)}</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes ciFly { from { transform: translateX(-340px) scale(0.7); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>
    </div>
  );
};
