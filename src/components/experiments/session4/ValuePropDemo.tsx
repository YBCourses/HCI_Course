import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, Check, X, Users, Target, Package, Sparkles, History } from 'lucide-react';

/**
 * Lecturer-run sentence builder for the Fresh Batch value proposition:
 * For [who] who [need], [name] is [category] that [benefit], unlike [today].
 * Then weak vs strong, then a 3-tick check.
 * AHA: value is a promise to a specific person. The strong sentence is built only from evidence we already have.
 * Source: teacher/session4-case.md ("Value proposition").
 */

type PieceKey = 'who' | 'need' | 'name' | 'category' | 'benefit' | 'today';

const PIECES: Record<PieceKey, { tag: string; text: string; cls: string; tagCls: string }> = {
  who: { tag: 'who', text: 'night-shift bakery staff', cls: 'bg-blue-50 border-blue-300', tagCls: 'text-blue-700' },
  need: { tag: 'need', text: 'must get every van out at 06:00', cls: 'bg-emerald-50 border-emerald-300', tagCls: 'text-emerald-700' },
  name: { tag: 'name', text: 'Fresh Batch Board', cls: 'bg-[#FDECE8] border-[#E5391C]', tagCls: 'text-[#E5391C]' },
  category: { tag: 'category', text: 'a shared plan', cls: 'bg-[#FDECE8] border-[#E5391C]', tagCls: 'text-[#E5391C]' },
  benefit: { tag: 'benefit', text: 'can be read from across the hall and updates for everyone at once', cls: 'bg-amber-50 border-amber-300', tagCls: 'text-amber-700' },
  today: { tag: 'today', text: 'the whiteboard and shouting, where changes get lost', cls: 'bg-stone-100 border-stone-300', tagCls: 'text-[#525254]' },
};

// the sentence as ordered parts: literal words or a piece, with the step at which the piece appears
const SENTENCE: ({ w: string } | { p: PieceKey; at: number })[] = [
  { w: 'For' }, { p: 'who', at: 1 }, { w: 'who' }, { p: 'need', at: 2 }, { w: ',' },
  { p: 'name', at: 3 }, { w: 'is' }, { p: 'category', at: 3 }, { w: 'that' }, { p: 'benefit', at: 4 },
  { w: ', unlike' }, { p: 'today', at: 5 }, { w: '.' },
];

const SOURCES: { at: number; tag: string; Icon: React.ElementType; text: string; cls: string }[] = [
  { at: 1, tag: 'Who', Icon: Users, text: 'The Session 3 audience profile: 8 people on the night shift', cls: 'border-blue-300 text-blue-700' },
  { at: 2, tag: 'Need', Icon: Target, text: 'The case: every van out by 06:00', cls: 'border-emerald-300 text-emerald-700' },
  { at: 3, tag: 'The idea', Icon: Package, text: 'Fresh Batch Board: an idea only, nothing built yet', cls: 'border-[#E5391C] text-[#E5391C]' },
  { at: 4, tag: 'Benefit', Icon: Sparkles, text: 'From R1 (read from 3 m) and R2 (changes reach all within 1 minute)', cls: 'border-amber-300 text-amber-700' },
  { at: 5, tag: 'Today', Icon: History, text: 'From notes 3, 4 and 6: changes written in a corner, missed, erased', cls: 'border-stone-300 text-[#525254]' },
];

const CHECKS = ['Names the user', 'Names the need', 'Says what is different from today'];

const STEP_TITLES = ['The template', 'Who', 'The need', 'Name and category', 'The benefit', 'Unlike today', 'Weak or strong?', 'The 3-tick check'];
const LAST = STEP_TITLES.length - 1;

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const ValuePropDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(LAST, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => setStep(0);

  const building = step <= 5;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <style>{`@keyframes vpPop{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}
.vp-pop{animation:vpPop .5s ease-out both}`}</style>

      <div className="flex items-baseline gap-4 h-[44px] shrink-0">
        <span className="text-[28px] font-bold text-[#E5391C]">Step {step + 1} of {STEP_TITLES.length}</span>
        <span className="text-[28px] font-bold text-[#222222]">{STEP_TITLES[step]}</span>
        {step === 0 && <span className="text-[24px] text-[#6E6D70]">Think in silence: who is it for, and what changes for them?</span>}
        {step === 6 && <span className="text-[24px] text-[#6E6D70]">Think in silence: which sentence would Hassan believe?</span>}
      </div>

      <div className="flex-1 min-h-0 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl p-6 overflow-hidden">
        {building && (
          <div className="h-full flex flex-col gap-5">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl px-8 py-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-[34px] text-[#222222] leading-snug min-h-[250px] content-center">
              {SENTENCE.map((part, i) => {
                if ('w' in part) return <span key={i} className={part.w === ',' || part.w === '.' ? '-ml-2' : ''}>{part.w}</span>;
                const meta = PIECES[part.p];
                const filled = step >= part.at;
                return filled ? (
                  <span key={`${part.p}${step >= part.at}`} className={`vp-pop rounded-xl border-2 px-4 py-1.5 font-semibold ${meta.cls}`}>
                    {meta.text}
                  </span>
                ) : (
                  <span key={part.p} className="rounded-xl border-2 border-dashed border-[#D8D1C5] px-4 py-1.5 text-[28px] text-[#6E6D70]">
                    [{meta.tag}]
                  </span>
                );
              })}
            </div>

            <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
              {SOURCES.map((s) => {
                const shown = step >= s.at;
                return (
                  <div key={s.tag} className={`rounded-2xl border-2 bg-white px-4 py-3 ${shown ? `vp-pop ${s.cls}` : 'invisible border-transparent'}`}>
                    <div className="flex items-center gap-2 text-[26px] font-bold mb-1">
                      <s.Icon className="w-7 h-7" /> {s.tag}
                    </div>
                    <div className="text-[22px] leading-snug text-[#525254]">{s.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!building && (
          <div className="h-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
              {/* weak */}
              <div className="vp-pop bg-white border-2 border-stone-300 rounded-2xl p-5 flex flex-col gap-3">
                <div className="text-[28px] font-bold text-[#6E6D70]">Weak</div>
                <div className="text-[34px] leading-snug text-[#525254] font-semibold">A great app for bakeries.</div>
                <div className="mt-auto flex flex-col gap-2">
                  {CHECKS.map((c, i) =>
                    step === 7 ? (
                      <div key={c} className="vp-pop flex items-center gap-3 text-[26px] text-[#525254]" style={{ animationDelay: `${i * 0.4}s` }}>
                        <span className="w-9 h-9 rounded-full bg-[#E5391C] flex items-center justify-center shrink-0"><X className="w-6 h-6 text-white" strokeWidth={3} /></span>
                        {c}
                      </div>
                    ) : null,
                  )}
                  {step === 6 && <div className="text-[26px] text-[#6E6D70]">Which people? Which problem? Different from what?</div>}
                </div>
              </div>
              {/* strong */}
              <div className="vp-pop bg-white border-2 border-[#E5391C] rounded-2xl p-5 flex flex-col gap-3" style={{ animationDelay: '0.2s' }}>
                <div className="text-[28px] font-bold text-[#E5391C]">Strong: built from evidence</div>
                <div className="text-[28px] leading-snug text-[#222222] font-semibold">
                  For <span className="text-blue-700">night-shift bakery staff</span> who <span className="text-emerald-700">must get every van out at 06:00</span>,{' '}
                  <span className="text-[#E5391C]">Fresh Batch Board</span> is <span className="text-[#E5391C]">a shared plan</span> that{' '}
                  <span className="text-amber-700">can be read from across the hall and updates for everyone at once</span>, unlike{' '}
                  <span className="text-[#525254]">the whiteboard and shouting, where changes get lost</span>.
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  {CHECKS.map((c, i) =>
                    step === 7 ? (
                      <div key={c} className="vp-pop flex items-center gap-3 text-[26px] text-[#222222]" style={{ animationDelay: `${i * 0.4}s` }}>
                        <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0"><Check className="w-6 h-6 text-white" strokeWidth={3} /></span>
                        {c}
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
            <div className="h-[56px] shrink-0 flex items-center justify-center">
              {step === 7 && (
                <div className="vp-pop text-[32px] font-bold text-[#222222]" style={{ animationDelay: '1.4s' }}>
                  Value is a promise to a <span className="text-[#E5391C]">specific person</span>.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 mr-auto" aria-label="Steps">
          {STEP_TITLES.map((t, i) => (
            <span
              key={t}
              className={`rounded-full transition-all ${i === step ? 'w-[44px] h-[18px] bg-[#E5391C]' : i < step ? 'w-[18px] h-[18px] bg-[#E5391C]/50' : 'w-[18px] h-[18px] bg-[#D8D1C5]'}`}
            />
          ))}
        </div>
        <button onClick={reset} className={btnSecondary}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
        <button onClick={back} disabled={step === 0} className={btnSecondary}>
          <ArrowLeft className="w-6 h-6" /> Back
        </button>
        <button onClick={next} disabled={step === LAST} className={`${btnPrimary} min-w-[200px] justify-center`}>
          Next <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
