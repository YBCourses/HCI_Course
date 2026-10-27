import React, { useState } from 'react';
import { ArrowRight, Check, Eye, HelpCircle, ImageOff, RotateCcw, Sparkles, X } from 'lucide-react';

/*
 * AHA: a persona is for deciding. Each detail on the poster faces one test: "would this change a design decision?"
 * Nearly all of them fail. What survives is short, and every kept line points at a decision (no touch, numbers and
 * icons, big text for 3 metres). The usefulness meter rises as noise is removed, then jumps when evidence is added.
 * Case: Fresh Batch (notes 2, 8, 12). The "Karim" poster is a made-up bad example.
 */

interface Detail {
  id: string;
  label: string;
  keep: boolean;
  reason: string;
}

const DETAILS: Detail[] = [
  { id: 'name', label: 'Karim', keep: false, reason: 'A name is a label; no screen depends on it.' },
  { id: 'age', label: '34 years old', keep: false, reason: 'Age alone changes nothing; eyesight and reach do.' },
  { id: 'photo', label: 'Stock photo', keep: false, reason: "A stranger's face says nothing about the work." },
  { id: 'job', label: 'Night-shift baker', keep: true, reason: 'Work and place decide noise, dust and hands.' },
  { id: 'football', label: 'Loves football', keep: false, reason: 'No design choice depends on it.' },
  { id: 'coffee', label: 'Drinks coffee', keep: false, reason: 'Nothing in the hall changes because of it.' },
  { id: 'kids', label: 'Two kids', keep: false, reason: 'Home life does not change the board.' },
  { id: 'suburbs', label: 'Lives in the suburbs', keep: false, reason: 'He works in the hall, not at home.' },
  { id: 'modern', label: 'Wants a modern look', keep: false, reason: 'A taste in style; the need is to read from 3 m.' },
];

// Added from evidence in the pruned version.
const ADDED = [
  { label: 'Hands busy: floury or gloved', note: 12, decision: 'Decision: no touch needed' },
  { label: 'Reads French less easily', note: 8, decision: 'Decision: numbers and icons' },
  { label: 'Stands 2 to 4 m from the board', note: 2, decision: 'Decision: text big enough for 3 m' },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const BadPersonaDemo: React.FC = () => {
  const [revealed, setRevealed] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [pruned, setPruned] = useState(false);

  const allDone = revealed.length === DETAILS.length;
  const asking = current !== null && !revealed.includes(current);

  // illustrative score: removing noise helps a little, adding evidence-based lines makes it truly useful
  const score = pruned ? 100 : 5 + revealed.reduce((n, id) => n + (DETAILS.find((d) => d.id === id)!.keep ? 10 : 6), 0);

  const pickNext = () => {
    const d = DETAILS.find((x) => !revealed.includes(x.id));
    if (d) setCurrent(d.id);
  };
  const primary = () => {
    if (pruned) return;
    if (asking && current) setRevealed((r) => [...r, current]);
    else if (allDone) setPruned(true);
    else pickNext();
  };
  const reset = () => {
    setRevealed([]);
    setCurrent(null);
    setPruned(false);
  };
  const clickChip = (id: string) => {
    if (pruned || revealed.includes(id)) return;
    if (asking) return;
    setCurrent(id);
  };

  const cur = current ? DETAILS.find((d) => d.id === current)! : null;
  const curDone = current !== null && revealed.includes(current);

  const label = pruned ? 'Done' : asking ? 'Reveal verdict' : allDone ? 'Show the useful persona' : 'Test next detail';
  const Icon = asking ? Eye : allDone ? Sparkles : ArrowRight;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={primary} disabled={pruned} className={PRIMARY}>
          <Icon className="w-6 h-6" />
          {label}
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1" />
        <div className="text-[28px] text-[#525254]">
          Test: <b className="text-[#222222]">would this change a design decision?</b>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-5">
        {/* poster */}
        <div className="w-[760px] flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white flex flex-col overflow-hidden">
          <div className="h-14 flex-shrink-0 px-5 flex items-center bg-[#222222] text-white text-[28px] font-bold">
            {pruned ? 'The same persona, pruned' : 'Persona poster'}
          </div>
          <div className="flex-1 min-h-0 p-5 flex flex-col gap-4">
            {!pruned ? (
              <div className="flex flex-wrap gap-3 content-start">
                {DETAILS.map((d) => {
                  const isRev = revealed.includes(d.id);
                  const isCur = current === d.id && !isRev;
                  return (
                    <button
                      key={d.id}
                      onClick={() => clickChip(d.id)}
                      className={`rounded-xl border-2 px-4 min-h-[64px] flex items-center gap-2 text-[26px] font-bold transition-all duration-500 ${
                        isRev
                          ? d.keep
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                            : 'border-[#E8E2D9] bg-[#FAF9F6] text-[#B8B3AA] line-through'
                          : isCur
                            ? 'border-[#E5391C] bg-[#FFF3EF] text-[#222222] animate-pulse'
                            : 'border-[#E8E2D9] bg-white text-[#222222] hover:bg-stone-50'
                      }`}
                    >
                      {d.id === 'photo' && <ImageOff className="w-7 h-7" />}
                      {d.label}
                      {isRev && (d.keep ? <Check className="w-7 h-7" /> : <X className="w-7 h-7 text-[#E5391C]" />)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 min-h-[64px] flex items-center gap-2 text-[26px] font-bold text-emerald-700">
                  <Check className="w-7 h-7" />
                  Night-shift baker
                </div>
                {ADDED.map((a) => (
                  <div key={a.label} className="rounded-xl border-2 border-[#E8E2D9] bg-white px-4 py-2 flex items-center gap-3">
                    <span className="text-[26px] font-bold text-[#222222] flex-1">{a.label}</span>
                    <span className="rounded-full bg-[#E5391C] text-white text-[22px] font-bold px-3 leading-[30px]">#{a.note}</span>
                    <span className="text-[22px] font-bold text-emerald-700 w-[230px] leading-[1.15]">{a.decision}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* test panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] px-5 py-3">
            <div className="flex items-center gap-4">
              <div className="text-[28px] font-bold text-[#222222] w-[230px]">Usefulness</div>
              <div className="flex-1 h-8 rounded-full bg-[#E8E2D9] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: score >= 100 ? '#059669' : '#E5391C' }} />
              </div>
              <div className="text-[28px] font-bold text-[#222222] w-[90px] text-right">{score}%</div>
            </div>
            <div className="text-[22px] text-[#6E6D70] mt-1">illustrative score</div>
          </div>

          <div className="flex-shrink-0 rounded-2xl border-2 border-[#E5391C] bg-white px-5 flex items-center gap-4" style={{ height: 112 }}>
            {pruned ? (
              <div className="text-[28px] font-bold text-[#222222] leading-[1.2]">
                Short, and every line points at a decision. <span className="text-[#E5391C]">A persona is for deciding.</span>
              </div>
            ) : cur === null ? (
              <div className="text-[28px] text-[#525254] leading-[1.2]">Think in silence. Then the lecturer tests each detail of the poster.</div>
            ) : !curDone ? (
              <>
                <HelpCircle className="w-10 h-10 text-[#E5391C] flex-shrink-0" />
                <div className="text-[28px] leading-[1.2] text-[#222222]">
                  <b>{cur.label}</b>: would this change a design decision? <span className="text-[#6E6D70]">Think in silence.</span>
                </div>
              </>
            ) : (
              <>
                {cur.keep ? <Check className="w-10 h-10 text-emerald-600 flex-shrink-0" /> : <X className="w-10 h-10 text-[#E5391C] flex-shrink-0" />}
                <div className="text-[28px] leading-[1.2] text-[#222222]">
                  <b className={cur.keep ? 'text-emerald-700' : 'text-[#E5391C]'}>{cur.keep ? 'KEEP' : 'DROP'}</b> {cur.label}: {cur.reason}
                </div>
              </>
            )}
          </div>

          <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white px-4 py-2 flex flex-col justify-around overflow-hidden">
            {DETAILS.map((d) => {
              const r = revealed.includes(d.id);
              return (
                <div key={d.id} className="flex items-center gap-3 text-[22px] leading-[1.15]" style={{ opacity: r ? 1 : 0.35, transition: 'opacity 0.5s' }}>
                  <span className="w-[280px] font-bold text-[#222222] truncate">{d.label}</span>
                  <span className={`w-[80px] font-bold ${r ? (d.keep ? 'text-emerald-700' : 'text-[#E5391C]') : 'text-[#B8B3AA]'}`}>{r ? (d.keep ? 'KEEP' : 'DROP') : '?'}</span>
                  <span className="flex-1 text-[#525254] truncate">{r ? d.reason : ''}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
