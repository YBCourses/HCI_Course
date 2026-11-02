import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, CircleHelp, Eye, Flame, Minus, RotateCcw, Store, Wheat, X } from 'lucide-react';

/*
 * LabelTestDemo (Session 5, slide 23).
 * Step 1: one thing ("what to bake next"), five candidate labels; after silent thinking the bars of 12 bakers appear.
 * Step 2: "Order changes": four candidate labels; the NEW badge reads in every language.
 * Step 3: a sentence vs numbers and icons for people who read little (note 8).
 * AHA: use the words people use on the floor, in their language, and test the labels instead of guessing:
 * the office word ("Production plan") got zero.
 */

interface Label {
  text: string;
  chip: string;
  chipTone: string;
  votes: number; // illustrative scent-test results from 12 bakers (session5-case.md)
  rtl?: boolean;
}

const LABELS: Label[] = [
  { text: 'Next batch', chip: 'English', chipTone: 'bg-blue-100 text-blue-800', votes: 2 },
  { text: 'Production plan', chip: 'Office word', chipTone: 'bg-stone-200 text-stone-700', votes: 0 },
  { text: 'Fournée suivante', chip: 'French', chipTone: 'bg-emerald-100 text-emerald-800', votes: 6 },
  { text: 'الدفعة التالية', chip: 'Arabic', chipTone: 'bg-amber-100 text-amber-800', votes: 3, rtl: true },
  { text: 'Prochaine cuisson', chip: 'French, informal', chipTone: 'bg-emerald-100 text-emerald-800', votes: 1 },
];

type Read = 'ok' | 'half' | 'no';
interface Cand {
  text: string;
  fr: Read;
  ar: Read;
  en: Read;
  badge?: boolean;
}
const CANDS: Cand[] = [
  { text: 'Changes', fr: 'half', ar: 'no', en: 'ok' },
  { text: 'Modifications', fr: 'ok', ar: 'no', en: 'half' },
  { text: 'Update', fr: 'half', ar: 'no', en: 'ok' },
  { text: 'NEW', fr: 'ok', ar: 'ok', en: 'ok', badge: true },
];

const STEPS = ['Name the next batch', 'Name the changes', 'Numbers and icons'];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const ReadIcon: React.FC<{ r: Read }> = ({ r }) =>
  r === 'ok' ? (
    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0"><Check className="w-5 h-5" /></span>
  ) : r === 'half' ? (
    <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"><Minus className="w-5 h-5" /></span>
  ) : (
    <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0"><X className="w-5 h-5" /></span>
  );

export const LabelTestDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [rev, setRev] = useState<boolean[]>([false, false, false]);
  const r = rev[step];

  const reveal = () => setRev((v) => v.map((x, i) => (i === step ? true : x)));
  const reset = () => {
    setStep(0);
    setRev([false, false, false]);
  };
  const maxVotes = Math.max(...LABELS.map((l) => l.votes));

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <style>{`@keyframes lt-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="flex-shrink-0 h-[64px] flex items-center gap-3">
        <button onClick={() => setStep(step - 1)} disabled={step === 0} className={SECONDARY}>
          <ChevronLeft className="w-6 h-6" />
          Previous
        </button>
        <button onClick={reveal} disabled={r} className={PRIMARY}>
          <Eye className="w-6 h-6" />
          Reveal
        </button>
        <button onClick={() => setStep(step + 1)} disabled={step === 2} className={PRIMARY}>
          Next step
          <ChevronRight className="w-6 h-6" />
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1 min-w-0 flex justify-end gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`rounded-full px-4 min-h-[56px] text-[24px] font-bold border-2 whitespace-nowrap ${
                i === step ? 'border-[#E5391C] bg-white text-[#E5391C]' : 'border-[#E8E2D9] bg-white text-[#525254] hover:bg-stone-50'
              }`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white px-5 py-3 flex items-center gap-4">
            <Flame className="w-10 h-10 text-[#E5391C] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[32px] font-bold text-[#222222] leading-tight">The thing: “what do I bake next?”</div>
              <div className="text-[26px] text-[#525254] leading-tight">
                {r ? 'Illustrative scent test: 12 bakers each picked the one label they would click.' : 'Which label would a baker click? Think in silence.'}
              </div>
            </div>
            {!r && <CircleHelp className="w-10 h-10 text-[#E5391C] flex-shrink-0" />}
          </div>
          <div className="flex-1 min-h-0 flex gap-3">
            {LABELS.map((l) => {
              const top = r && l.votes === maxVotes;
              return (
                <div
                  key={l.text}
                  className={`flex-1 min-w-0 rounded-2xl border-2 bg-white p-3 flex flex-col gap-2 transition-colors ${top ? 'border-emerald-500' : 'border-[#E8E2D9]'}`}
                >
                  <span className={`self-start rounded-full px-3 text-[22px] font-bold leading-[32px] ${l.chipTone}`}>{l.chip}</span>
                  <div
                    dir={l.rtl ? 'rtl' : 'ltr'}
                    lang={l.rtl ? 'ar' : undefined}
                    className="rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] px-3 py-3 text-center text-[30px] font-bold text-[#222222] leading-tight min-h-[64px] flex items-center justify-center"
                  >
                    {l.text}
                  </div>
                  <div className="flex-1 min-h-0 flex flex-col justify-end items-center">
                    <div className="text-[34px] font-bold text-[#222222] leading-none mb-1 h-[36px]">{r ? l.votes : ''}</div>
                    <div className="w-full flex-1 min-h-0 flex items-end justify-center">
                      <div
                        className={`w-[60%] rounded-t-lg transition-all duration-[1000ms] ease-out ${top ? 'bg-emerald-600' : 'bg-[#E5391C]/70'}`}
                        style={{ height: r ? `${Math.max(l.votes === 0 ? 2 : 6, (l.votes / 12) * 100)}%` : '0%' }}
                      />
                    </div>
                    <div className="w-full border-t border-[#E8E2D9] mt-0 text-center text-[22px] text-[#6E6D70] pt-1">of 12 bakers</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-shrink-0 h-[72px]">
            {r && (
              <div className="h-full rounded-xl bg-emerald-50 border border-emerald-500 px-5 flex items-center text-[28px] leading-[1.15] text-[#222222]" style={{ animation: 'lt-in 0.5s both' }}>
                <span>
                  <b>10 of 12</b> chose a French or Arabic label. The office word got <b>0</b>. Use the words people use on the floor.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white px-5 py-3">
            <div className="text-[32px] font-bold text-[#222222] leading-tight">The item: “Order changes”</div>
            <div className="text-[26px] text-[#525254] leading-tight">
              {r ? 'Who can read it? An illustrative reading, not a measurement.' : 'Which label works for a baker who reads French, Arabic or English? Think in silence.'}
            </div>
          </div>
          <div className="flex-1 min-h-0 flex gap-3">
            {CANDS.map((c) => (
              <div key={c.text} className={`flex-1 min-w-0 rounded-2xl border-2 bg-white p-4 flex flex-col gap-3 ${r && c.badge ? 'border-emerald-500' : 'border-[#E8E2D9]'}`}>
                <div className="rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] min-h-[96px] flex items-center justify-center">
                  {c.badge ? (
                    <span className="rounded-lg bg-[#E5391C] text-white text-[34px] font-bold px-5 py-1 tracking-wide">NEW</span>
                  ) : (
                    <span className="text-[34px] font-bold text-[#222222]">{c.text}</span>
                  )}
                </div>
                <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
                  {r &&
                    ([
                      ['French reader', c.fr],
                      ['Arabic reader', c.ar],
                      ['English reader', c.en],
                    ] as [string, Read][]).map(([who, v], i) => (
                      <div key={who} className="flex items-center gap-3 text-[26px] text-[#222222]" style={{ animation: `lt-in 0.4s ${i * 0.15}s both` }}>
                        <ReadIcon r={v} />
                        {who}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-shrink-0 h-[72px]">
            {r && (
              <div className="h-full rounded-xl bg-emerald-50 border border-emerald-500 px-5 flex items-center text-[28px] leading-[1.15] text-[#222222]" style={{ animation: 'lt-in 0.5s both' }}>
                <span>
                  A red <b>NEW</b> badge is read in every language. Words differ; a badge, a number or an icon does not.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="flex-shrink-0 rounded-2xl border border-[#E8E2D9] bg-white px-5 py-3">
            <div className="text-[32px] font-bold text-[#222222] leading-tight">For people who read little: numbers and icons</div>
            <div className="text-[26px] text-[#525254] leading-tight">
              {r ? 'Youssef: “I read the numbers, the French words I guess.” (note 8)' : 'Read this line as Youssef would, from a distance. Think in silence.'}
            </div>
          </div>
          <div className="flex-1 min-h-0 flex gap-3">
            <div className="flex-1 min-w-0 rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 flex flex-col gap-3">
              <div className="text-[30px] font-bold text-[#525254]">A sentence</div>
              <div className="flex-1 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] px-5 flex items-center text-[34px] leading-[1.2] text-[#222222]">
                Please prepare an additional sixty baguettes for shop 14 in Oven 2.
              </div>
              <div className="text-[26px] text-[#525254]">Many words, to be read one by one.</div>
            </div>
            <div className={`flex-1 min-w-0 rounded-2xl border-2 bg-white p-4 flex flex-col gap-3 ${r ? 'border-emerald-500' : 'border-dashed border-[#E8E2D9]'}`}>
              <div className="text-[30px] font-bold text-emerald-700">Numbers and icons</div>
              {r ? (
                <>
                  <div className="flex-1 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] px-4 flex items-center justify-around gap-2" style={{ animation: 'lt-in 0.5s both' }}>
                    <span className="flex items-center gap-2 text-[34px] font-bold text-[#222222]">
                      <Flame className="w-10 h-10 text-[#E5391C]" /> 2
                    </span>
                    <span className="flex items-center gap-2 text-[34px] font-bold text-[#222222]">
                      <Wheat className="w-10 h-10 text-amber-600" /> +60
                    </span>
                    <span className="flex items-center gap-2 text-[34px] font-bold text-[#222222]">
                      <Store className="w-10 h-10 text-blue-600" /> 14
                    </span>
                    <span className="rounded-lg bg-[#E5391C] text-white text-[30px] font-bold px-4 py-1">NEW</span>
                  </div>
                  <div className="text-[26px] text-emerald-800" style={{ animation: 'lt-in 0.5s 0.3s both' }}>
                    Oven 2, baguettes, +60, shop 14, new: readable in one glance, no language needed.
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[28px] text-[#6E6D70]">Press Reveal</div>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 h-[72px]">
            {r && (
              <div className="h-full rounded-xl bg-emerald-50 border border-emerald-500 px-5 flex items-center text-[28px] leading-[1.15] text-[#222222]" style={{ animation: 'lt-in 0.6s both' }}>
                <span>
                  Do not guess the words: <b>test the labels</b> with the people who will use them, in their language.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
