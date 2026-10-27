import React, { useState } from 'react';
import { ClipboardList, ClipboardPen, Flame, PhoneIncoming, Package, Truck, ChevronRight, AlertTriangle, ScanSearch, RotateCcw } from 'lucide-react';

// AHA: a task is a sequence of small steps, and the failure hides in just a few of them (5 of 17 in our case),
// not spread evenly. That is where design effort pays off.

interface Step { id: string; name: string; fail?: string }
interface Task { id: number; name: string; Icon: React.FC<{ className?: string }>; steps: Step[] }

const TASKS: Task[] = [
  { id: 1, name: 'Know today’s orders', Icon: ClipboardList, steps: [
    { id: '1.1', name: 'Read the sheet' },
    { id: '1.2', name: 'Check late changes', fail: 'Shop changes arrive by phone and end up in a corner of the board (note 3).' },
  ] },
  { id: 2, name: 'Plan batches', Icon: ClipboardPen, steps: [
    { id: '2.1', name: 'Group by product' },
    { id: '2.2', name: 'Assign ovens' },
    { id: '2.3', name: 'Write the plan', fail: 'Writing it on the whiteboard takes 8 minutes standing (note 1), and Salma squints from 4 m (note 2).' },
  ] },
  { id: 3, name: 'Bake', Icon: Flame, steps: [
    { id: '3.1', name: 'Load oven' },
    { id: '3.2', name: 'Time 40 minutes' },
    { id: '3.3', name: 'Unload and rack' },
  ] },
  { id: 4, name: 'Handle a change', Icon: PhoneIncoming, steps: [
    { id: '4.1', name: 'Receive' },
    { id: '4.2', name: 'Decide impact' },
    { id: '4.3', name: 'Tell the team', fail: 'Salma keeps baking the old quantity (note 4); a floury sleeve wipes a line off the board (note 6).' },
  ] },
  { id: 5, name: 'Pack', Icon: Package, steps: [
    { id: '5.1', name: 'Find the shop’s crates', fail: '“Which shop first?” asked three times, no answer over the noise (note 7). A shop 22 crate is on the wrong rack (note 10).' },
    { id: '5.2', name: 'Check labels' },
    { id: '5.3', name: 'Stack in route order' },
  ] },
  { id: 6, name: 'Load and hand over', Icon: Truck, steps: [
    { id: '6.1', name: 'Load van' },
    { id: '6.2', name: 'Tell the driver the route', fail: 'Amine waits at the dock, does not know the route order, and calls Hassan (note 9).' },
    { id: '6.3', name: 'Hand over to the next shift' },
  ] },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const TaskBreakdownDemo: React.FC = () => {
  const [sel, setSel] = useState(1);
  const [showFail, setShowFail] = useState(false);
  const task = TASKS[sel - 1];
  const total = TASKS.reduce((n, t) => n + t.steps.length, 0);
  const fails = TASKS.reduce((n, t) => n + t.steps.filter((s) => s.fail).length, 0);

  const reset = () => { setSel(1); setShowFail(false); };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => { setShowFail(true); }} disabled={showFail} className={PRIMARY}>
          <ScanSearch className="w-6 h-6" />
          Show where today fails
        </button>
        <div className="flex-1 text-[26px] text-[#525254] px-2 leading-[1.2]">
          {showFail ? (
            <span>
              <b className="text-[#E5391C]">{fails} of {total} steps fail.</b> Click each red task to see what goes wrong.
            </span>
          ) : (
            <span>Task: <b className="text-[#222222]">Run the night&rsquo;s bake</b>. Click a task to open its steps.</span>
          )}
        </div>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 flex gap-4">
        {/* left: six tasks */}
        <div className="w-[560px] flex-shrink-0 flex flex-col gap-2">
          {TASKS.map((t) => {
            const nFail = t.steps.filter((s) => s.fail).length;
            const active = t.id === sel;
            const bad = showFail && nFail > 0;
            return (
              <button
                key={t.id}
                onClick={() => setSel(t.id)}
                className={`flex-1 min-h-[56px] rounded-xl border-2 px-4 flex items-center gap-3 text-left transition-all duration-300 ${
                  bad ? 'border-[#E5391C] bg-red-50' : active ? 'border-[#222222] bg-white' : 'border-[#E8E2D9] bg-white hover:bg-stone-50'
                } ${active ? 'shadow-md' : ''}`}
              >
                <span className={`w-11 h-11 rounded-full flex items-center justify-center text-[26px] font-bold flex-shrink-0 ${active ? 'bg-[#222222] text-white' : 'bg-[#FAF9F6] text-[#525254] border border-[#E8E2D9]'}`}>
                  {t.id}
                </span>
                <t.Icon className={`w-7 h-7 flex-shrink-0 ${bad ? 'text-[#E5391C]' : 'text-[#525254]'}`} />
                <span className="flex-1 text-[28px] font-bold leading-tight text-[#222222]">{t.name}</span>
                {bad && (
                  <span className="flex items-center gap-1 text-[#E5391C] text-[24px] font-bold">
                    <AlertTriangle className="w-6 h-6" />
                    {nFail}
                  </span>
                )}
                <ChevronRight className={`w-7 h-7 flex-shrink-0 ${active ? 'text-[#222222]' : 'text-[#C9C3B8]'}`} />
              </button>
            );
          })}
        </div>

        {/* right: steps of the selected task */}
        <div key={task.id} className="flex-1 min-w-0 min-h-0 rounded-2xl border-2 border-[#E8E2D9] bg-[#FAF9F6] p-4 flex flex-col gap-3" style={{ animation: 'tbIn 350ms ease-out' }}>
          <div className="flex-shrink-0 flex items-center gap-3 text-[30px] font-bold text-[#222222]">
            <task.Icon className="w-8 h-8 text-[#E5391C]" />
            {task.id}. {task.name}
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {task.steps.map((s, i) => {
              const bad = showFail && !!s.fail;
              return (
                <div
                  key={s.id}
                  className={`flex-1 min-h-0 rounded-xl border-2 px-5 flex items-center gap-5 bg-white transition-all duration-500 ${bad ? 'border-[#E5391C] bg-red-50' : 'border-[#E8E2D9]'}`}
                  style={{ animation: `tbIn 350ms ease-out ${i * 120}ms both` }}
                >
                  <div className={`text-[34px] font-bold w-[72px] flex-shrink-0 ${bad ? 'text-[#E5391C]' : 'text-[#525254]'}`}>{s.id}</div>
                  <div className="w-[330px] flex-shrink-0 text-[30px] font-bold leading-[1.15] text-[#222222]">{s.name}</div>
                  <div className="flex-1 min-w-0 text-[24px] leading-[1.2] text-[#222222]">
                    {bad ? (
                      <span className="flex items-start gap-2">
                        <AlertTriangle className="w-7 h-7 text-[#E5391C] flex-shrink-0 mt-0.5" />
                        <span>{s.fail}</span>
                      </span>
                    ) : showFail ? (
                      <span className="text-emerald-700 font-semibold">No problem noted</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@keyframes tbIn { from { transform: translateY(10px); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>
    </div>
  );
};
