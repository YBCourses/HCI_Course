import React, { useState } from 'react';
import { HelpCircle, Tags, Users, RotateCcw } from 'lucide-react';

type TagKey = 'fits' | 'extreme' | 'proxy' | 'not' | 'close';

interface Candidate {
  name: string;
  line: string;
  answer: string;
  tag: TagKey;
  picked: boolean;
  reason: string;
}

const TAGS: Record<TagKey, { label: string; bg: string; border: string; strip: string }> = {
  fits: { label: 'Fits', bg: 'bg-emerald-50', border: 'border-emerald-500', strip: 'bg-emerald-600 text-white' },
  extreme: { label: 'Extreme', bg: 'bg-amber-50', border: 'border-amber-500', strip: 'bg-amber-500 text-white' },
  proxy: { label: 'Proxy', bg: 'bg-blue-50', border: 'border-blue-500', strip: 'bg-blue-600 text-white' },
  not: { label: 'Not our target', bg: 'bg-stone-100', border: 'border-stone-300', strip: 'bg-stone-500 text-white' },
  close: { label: 'Too close to the project', bg: 'bg-rose-50', border: 'border-rose-400', strip: 'bg-rose-600 text-white' },
};

const CANDIDATES: Candidate[] = [
  { name: 'Sara', line: 'First-year, booked 3 times last month', answer: '"3 times"', tag: 'fits', picked: true, reason: 'Core user: books often, fits our target exactly.' },
  { name: 'Omar', line: 'Fourth-year, books twice a week', answer: '"About 8 times"', tag: 'fits', picked: true, reason: 'Core user: a heavy user whose habits are very clear.' },
  { name: 'Lina', line: 'Never booked a room', answer: '"Never"', tag: 'not', picked: false, reason: '' },
  { name: 'Prof. Alami', line: 'A teacher', answer: '"None, I teach"', tag: 'not', picked: false, reason: '' },
  { name: 'Karim', line: 'Library staff, manages rooms', answer: '"Many, but for others"', tag: 'proxy', picked: true, reason: 'Proxy: knows the rooms well, close enough if students are out of reach.' },
  { name: 'Hind', line: 'Student who uses a screen reader, booked once', answer: '"Once"', tag: 'extreme', picked: true, reason: 'Extreme: if it works for her, it works better for everyone.' },
  { name: 'Yassir', line: 'A friend of the team, helped build the app', answer: '"Often, I built it"', tag: 'close', picked: false, reason: '' },
  { name: 'Salma', line: 'Second-year, books for study groups weekly', answer: '"4 times"', tag: 'fits', picked: true, reason: 'Core user: books for groups, a real everyday need.' },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const RecruitScreenerDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-10 flex-shrink-0 flex items-center gap-3 text-[28px] text-[#222222]">
        <span className="text-[#525254]">Target group:</span>
        <span className="font-bold">Students who book study rooms at least once a month.</span>
      </div>

      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => setStep(1)} disabled={step !== 0} className={PRIMARY}>
          <HelpCircle className="w-6 h-6" />
          Ask the screening question
        </button>
        <button onClick={() => setStep(2)} disabled={step !== 1} className={PRIMARY}>
          <Tags className="w-6 h-6" />
          Show who fits
        </button>
        <button onClick={() => setStep(3)} disabled={step !== 2} className={PRIMARY}>
          <Users className="w-6 h-6" />
          Build the group of five
        </button>
        <div className="flex-1" />
        <button onClick={() => setStep(0)} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="h-[56px] flex-shrink-0 flex items-center text-[24px] leading-[1.2] text-[#525254]">
        {step === 0 && <span>Think first, in silence: who from these eight would you invite, and what one question would you ask?</span>}
        {step === 1 && (
          <span>
            Screening question: <b className="text-[#222222]">How many times did you book a study room last month?</b>
          </span>
        )}
        {step === 2 && (
          <span>
            <b className="text-[#222222]">Extreme</b>: very useful, pushes the app hardest. <b className="text-[#222222]">Proxy</b>: close enough when the real user is out of reach.{' '}
            <b className="text-[#222222]">Too close</b>: tells you what you want to hear.
          </span>
        )}
        {step === 3 && <b className="text-[#E5391C] text-[28px]">Three core users, one extreme, one proxy.</b>}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-4 grid-rows-2 gap-3">
        {CANDIDATES.map((c) => {
          const t = TAGS[c.tag];
          const tagged = step >= 2;
          const dim = step === 3 && !c.picked;
          const ring = step === 3 && c.picked;
          return (
            <div
              key={c.name}
              className={`min-h-0 rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-500 ${
                tagged ? `${t.bg} ${t.border}` : 'bg-white border-[#E8E2D9]'
              } ${dim ? 'opacity-35' : ''} ${ring ? 'shadow-lg' : ''}`}
            >
              <div className={`h-9 flex-shrink-0 px-4 flex items-center text-[22px] font-bold transition-opacity duration-500 ${tagged ? t.strip : 'bg-transparent text-transparent'}`}>
                {tagged ? t.label : '.'}
              </div>
              <div className="flex-1 min-h-0 px-4 py-2 flex flex-col justify-between">
                <div>
                  <div className="text-[28px] font-bold leading-tight text-[#222222]">{c.name}</div>
                  <div className="text-[22px] leading-[1.2] text-[#525254]">{c.line}</div>
                </div>
                <div className="min-h-[52px] flex items-end text-[22px] leading-[1.2]">
                  {step === 3 && c.picked ? (
                    <span className="font-semibold text-[#222222]">{c.reason}</span>
                  ) : step >= 1 ? (
                    <span className="text-[#222222]">
                      <span className="text-[#6E6D70]">Answer: </span>
                      <b>{c.answer}</b>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
