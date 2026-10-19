import React, { useState } from 'react';
import { ArrowRight, Check, RotateCcw, X, ArrowLeft } from 'lucide-react';

/** Lecturer-run: raw notes -> pattern -> weak insight -> builder -> check. Project 11 (Study Room Booking). */

const NOTES = [
  { who: 'Session 1', text: 'Imane clicked Hold, then closed the tab.' },
  { who: 'Session 2', text: 'A second student said "Done!" right after clicking Hold.' },
  { who: 'Session 3', text: 'A third student left, came back 12 minutes later: the room was gone.' },
];

const SLOTS = [
  { tag: 'Who', text: 'Students booking between classes', box: 'bg-blue-50 border-blue-300', tagCls: 'text-blue-700' },
  { tag: 'need', text: 'need to know their room is only held for ten minutes', box: 'bg-emerald-50 border-emerald-300', tagCls: 'text-emerald-700' },
  { tag: 'because', text: 'because they leave right after clicking Hold', box: 'bg-amber-50 border-amber-300', tagCls: 'text-amber-700' },
];

const STEP_TITLES = ['Notes', 'Pattern', 'A weak insight', 'The builder', 'Check it'];
const LAST = STEP_TITLES.length - 1;

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

const Note: React.FC<{ who: string; text: string; big?: boolean }> = ({ who, text, big }) => (
  <div className="bg-[#FFF8DC] border border-amber-300 rounded-xl px-5 py-4 shadow-sm">
    <div className="text-[22px] font-bold text-[#6E6D70] mb-1">{who}</div>
    <div className={big ? 'text-[30px] leading-snug text-[#222222]' : 'text-[26px] leading-snug text-[#222222]'}>{text}</div>
  </div>
);

export const InsightBuilderDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [sub, setSub] = useState(0); // builder: 0 empty, 1 who, 2 need, 3 because, 4 assembled

  const next = () => {
    if (step === 3 && sub < 4) {
      setSub(sub + 1);
      return;
    }
    if (step < LAST) setStep(step + 1);
  };
  const back = () => {
    if (step === 3 && sub > 0) {
      setSub(sub - 1);
      return;
    }
    if (step > 0) {
      const s = step - 1;
      setStep(s);
      if (s === 3) setSub(4);
    }
  };
  const reset = () => {
    setStep(0);
    setSub(0);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <style>{`@keyframes ibPop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.ib-pop{animation:ibPop .45s ease-out both}`}</style>

      <div className="flex items-baseline gap-4 h-[44px]">
        <span className="text-[28px] font-bold text-[#E5391C]">Step {step + 1} of {STEP_TITLES.length}</span>
        <span className="text-[28px] font-bold text-[#222222]">{STEP_TITLES[step]}</span>
        {step === 0 && <span className="text-[24px] text-[#6E6D70]">Sample notes from three test sessions of Study Room Booking</span>}
      </div>

      <div className="flex-1 min-h-0 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl p-6 overflow-hidden">
        {step === 0 && (
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="grid grid-cols-3 gap-6">
              {NOTES.map((n, i) => (
                <div key={n.who} className="ib-pop" style={{ animationDelay: `${i * 0.15}s` }}>
                  <Note who={n.who} text={n.text} big />
                </div>
              ))}
            </div>
            <div className="text-[32px] text-[#222222] text-center">Three raw observations. Each one is a fact. What do they share?</div>
          </div>
        )}

        {step === 1 && (
          <div className="h-full flex items-center gap-8">
            <div className="flex flex-col gap-3 w-[680px] shrink-0">
              {NOTES.map((n) => (
                <Note key={n.who} who={n.who} text={n.text} />
              ))}
            </div>
            <ArrowRight className="w-14 h-14 text-[#E5391C] shrink-0" />
            <div className="flex-1 ib-pop bg-white border-2 border-[#E5391C] rounded-2xl p-8">
              <div className="text-[28px] font-bold text-[#E5391C] mb-3">The pattern: what repeats</div>
              <div className="text-[34px] leading-snug text-[#222222] font-semibold">Students think Hold finishes the booking.</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="h-full flex flex-col justify-center gap-6">
            <div className="ib-pop relative bg-white border border-[#E8E2D9] rounded-2xl px-8 py-7 flex items-center gap-6">
              <X className="w-12 h-12 text-[#E5391C] shrink-0" />
              <div className="text-[34px] text-[#6E6D70] line-through decoration-[#E5391C] decoration-[4px]">Users find the interface confusing.</div>
              <span className="ml-auto text-[24px] font-bold text-[#E5391C] border-2 border-[#E5391C] rounded-lg px-3 py-1 -rotate-3 whitespace-nowrap">Too weak</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="ib-pop bg-white border border-[#E8E2D9] rounded-2xl p-6" style={{ animationDelay: '0.3s' }}>
                <div className="text-[30px] font-bold text-[#222222] mb-2">Not specific</div>
                <div className="text-[26px] text-[#525254] leading-snug">Which users? Which part of the interface? Confusing how?</div>
              </div>
              <div className="ib-pop bg-white border border-[#E8E2D9] rounded-2xl p-6" style={{ animationDelay: '0.6s' }}>
                <div className="text-[30px] font-bold text-[#222222] mb-2">Nothing to act on</div>
                <div className="text-[26px] text-[#525254] leading-snug">The team still does not know what to change on Monday.</div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="grid grid-cols-3 gap-5">
              {SLOTS.map((s, i) => {
                const filled = sub > i;
                return (
                  <div
                    key={s.tag}
                    className={`rounded-2xl border-2 px-6 py-5 h-[200px] flex flex-col ${filled ? s.box : 'bg-white border-dashed border-[#D8D1C5]'}`}
                  >
                    <div className={`text-[28px] font-bold mb-2 ${filled ? s.tagCls : 'text-[#6E6D70]'}`}>[{s.tag}]</div>
                    {filled ? (
                      <div key={`f${sub}`} className="ib-pop text-[30px] leading-snug text-[#222222]">{s.text}</div>
                    ) : (
                      <div className="text-[26px] text-[#6E6D70]">empty</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="h-[170px]">
              {sub === 4 && (
                <div className="ib-pop h-full bg-white border-2 border-[#E5391C] rounded-2xl px-8 py-5 flex flex-col justify-center">
                  <div className="text-[28px] font-bold text-[#E5391C] mb-2">The insight</div>
                  <div className="text-[34px] leading-snug text-[#222222] font-semibold">
                    <span className="text-blue-700">Students booking between classes</span>{' '}
                    <span className="text-emerald-700">need to know their room is only held for ten minutes</span>,{' '}
                    <span className="text-amber-700">because they leave right after clicking Hold.</span>
                  </div>
                </div>
              )}
              {sub < 4 && (
                <div className="h-full flex items-center justify-center text-[28px] text-[#6E6D70]">
                  {sub === 0 ? 'Three slots, filled one after another.' : `${sub} of 3 slots filled.`}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="h-full flex flex-col justify-center gap-4">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl px-6 py-4 text-[30px] leading-snug text-[#222222]">
              Students booking between classes need to know their room is only held for ten minutes, because they leave right after clicking Hold.
            </div>
            {[
              ['Names who', 'Students booking between classes'],
              ['Says what they need', 'to know the room is only held for ten minutes'],
              ['Says why', 'because they leave right after clicking Hold'],
            ].map(([h, t], i) => (
              <div
                key={h}
                className="ib-pop flex items-center gap-5 bg-white border border-[#E8E2D9] rounded-2xl px-6 py-3"
                style={{ animationDelay: `${0.3 + i * 0.5}s` }}
              >
                <span className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </span>
                <span className="text-[30px] font-bold text-[#222222] w-[400px] shrink-0">{h}</span>
                <span className="text-[26px] text-[#525254]">{t}</span>
              </div>
            ))}
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
        <button onClick={back} disabled={step === 0 && sub === 0} className={btnSecondary}>
          <ArrowLeft className="w-6 h-6" /> Back
        </button>
        <button onClick={next} disabled={step === LAST} className={`${btnPrimary} min-w-[200px] justify-center`}>
          Next <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
