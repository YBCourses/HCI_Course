import React, { useState } from 'react';
import { ChevronRight, RotateCcw, Users, MapPin, Ruler, Brain } from 'lucide-react';

/**
 * Lecturer-run: a vague requirement becomes testable in three questions (Who? Which situation? How measured?).
 * AHA: "measurable" = a person + a place + a number. Each answer rewrites the sentence and fills the "testable" meter;
 * at the end nobody could disagree about pass or fail.
 * Fixed layout for the 1824 x 671 box. Content from the Fresh Batch case (R1, R2, R3, R5, R6).
 */

interface Card {
  id: string;
  vague: string;
  who: string;
  sit: string;
  pv: string; // predicate while still vague
  ps: string; // predicate once sharp
  meas: string;
  ref: string;
}

const CARDS: Card[] = [
  {
    id: 'fast',
    vague: 'The board must be fast.',
    who: 'Night-shift staff',
    sit: 'standing 3 metres from the board with busy hands',
    pv: 'need the board to be fast',
    ps: 'must read the next batch correctly within 3 seconds',
    meas: '6 of 8 staff read it correctly from 3 m within 3 s',
    ref: 'R1',
  },
  {
    id: 'read',
    vague: 'It must be easy to read.',
    who: 'All 8 night staff, including those who read French less easily',
    sit: 'at the ovens and the packing table',
    pv: 'need the labels to be easy to read',
    ps: 'must understand every label with no help',
    meas: '8 of 8 understand all labels without help',
    ref: 'R6',
  },
  {
    id: 'changes',
    vague: 'Changes must reach everyone quickly.',
    who: 'Everyone on shift',
    sit: 'when a shop changes an order before 03:30',
    pv: 'must hear about it quickly',
    ps: 'must see the change at their station within 1 minute',
    meas: 'time from change to seen by all is 60 seconds or less',
    ref: 'R2',
  },
  {
    id: 'reliable',
    vague: 'It must be reliable.',
    who: 'The night team',
    sit: 'over a whole week of shifts, with floury sleeves brushing the board',
    pv: 'need the board to be reliable',
    ps: 'must never lose an order line by accident',
    meas: 'zero lost order lines in a week',
    ref: 'R3',
  },
  {
    id: 'use',
    vague: 'It must be easy to use.',
    who: 'Salma, with floury or gloved hands',
    sit: 'at the oven',
    pv: 'needs the board to be easy to use',
    ps: 'must get all key information without touching anything',
    meas: 'all key information readable with no touch',
    ref: 'R5',
  },
];

type Seg = { t: string; k: 'base' | 'who' | 'sit' | 'meas' };

const sentence = (c: Card, step: number): Seg[] => {
  if (step === 0) return [{ t: c.vague, k: 'base' }];
  const s: Seg[] = [{ t: c.who, k: 'who' }];
  if (step >= 2) s.push({ t: `, ${c.sit},`, k: 'sit' });
  s.push({ t: ` ${step >= 3 ? c.ps : c.pv}.`, k: step >= 3 ? 'meas' : 'base' });
  return s;
};

const SEG_CLS: Record<Seg['k'], string> = {
  base: 'text-[#222222]',
  who: 'text-blue-700 bg-blue-50 rounded-lg',
  sit: 'text-amber-700 bg-amber-50 rounded-lg',
  meas: 'text-emerald-700 bg-emerald-50 rounded-lg',
};

const QUESTIONS = [
  { n: 1, q: 'Who?', Icon: Users, box: 'border-blue-300 bg-blue-50', ic: 'text-blue-600', get: (c: Card) => c.who },
  { n: 2, q: 'In which situation?', Icon: MapPin, box: 'border-amber-300 bg-amber-50', ic: 'text-amber-600', get: (c: Card) => c.sit },
  { n: 3, q: 'How to measure it?', Icon: Ruler, box: 'border-emerald-300 bg-emerald-50', ic: 'text-emerald-600', get: (c: Card) => c.meas },
];

const METER = [
  { label: 'Vague', tone: 'bg-[#E5391C]' },
  { label: 'Getting clearer', tone: 'bg-amber-500' },
  { label: 'Almost testable', tone: 'bg-amber-500' },
  { label: 'Testable', tone: 'bg-emerald-600' },
];

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

export const RequirementTesterDemo: React.FC = () => {
  const [sel, setSel] = useState(0);
  const [step, setStep] = useState(0);
  const card = CARDS[sel];
  const next = ['Ask: Who?', 'Ask: In which situation?', 'Ask: How will we measure it?', 'Done'][step];

  return (
    <div className="flex-1 min-h-0 relative select-none overflow-hidden">
      <style>{`@keyframes rbFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

      {/* left: vague cards */}
      <div className="absolute text-[28px] font-bold text-[#222222]" style={{ left: 0, top: 0, width: 560 }}>
        Vague requirements <span className="text-[22px] font-normal text-[#6E6D70]">(pick one)</span>
      </div>
      {CARDS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => {
            setSel(i);
            setStep(0);
          }}
          className={`absolute text-left rounded-xl border-2 px-5 flex items-center gap-3 text-[26px] cursor-pointer transition-colors ${
            i === sel ? 'border-[#E5391C] bg-red-50 text-[#222222] font-bold' : 'border-[#E8E2D9] bg-white text-[#525254] hover:bg-stone-50'
          }`}
          style={{ left: 0, top: 50 + i * 104, width: 560, height: 92 }}
        >
          <span className="text-[22px] text-[#6E6D70] font-bold w-8">{i + 1}</span>
          {c.vague}
        </button>
      ))}

      {/* right: the requirement being rewritten */}
      <div className="absolute rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] px-6 py-4 overflow-hidden" style={{ left: 590, top: 0, width: 1234, height: 270 }}>
        <div className="text-[22px] text-[#6E6D70] font-bold">THE REQUIREMENT, NOW</div>
        <div key={`${sel}-${step}`} className="text-[34px] leading-[1.3] mt-1" style={{ animation: 'rbFade .5s ease' }}>
          {sentence(card, step).map((s, i) => (
            <span key={i} className={SEG_CLS[s.k]}>
              {s.t}
            </span>
          ))}
        </div>
        {step >= 3 && (
          <div className="mt-2 text-[28px] text-emerald-700 font-bold" style={{ animation: 'rbFade .5s ease' }}>
            Test: {card.meas} <span className="text-[22px] font-normal text-[#6E6D70]">(matches {card.ref} in our case)</span>
          </div>
        )}
        {step === 0 && (
          <div className="mt-3 text-[26px] text-[#525254] flex items-center gap-3">
            <Brain className="w-7 h-7 text-[#E5391C]" /> Think in silence: how would you check this on the night?
          </div>
        )}
      </div>

      {/* three questions */}
      {QUESTIONS.map((q, i) => {
        const done = step >= q.n;
        const upNext = step === q.n - 1;
        return (
          <div
            key={q.n}
            className={`absolute rounded-2xl border-2 px-5 py-3 overflow-hidden transition-colors ${done ? q.box : upNext ? 'border-dashed border-[#E5391C] bg-white' : 'border-dashed border-[#E8E2D9] bg-white'}`}
            style={{ left: 590 + i * 420, top: 286, width: 394, height: 176 }}
          >
            <div className="flex items-center gap-3 text-[28px] font-bold text-[#222222]">
              <q.Icon className={`w-8 h-8 ${done ? q.ic : 'text-[#6E6D70]'}`} /> {q.n} {q.q}
            </div>
            {done ? (
              <div key={`${sel}-${q.n}`} className="mt-2 text-[24px] leading-snug text-[#222222]" style={{ animation: 'rbFade .5s ease' }}>
                {q.get(card)}
              </div>
            ) : (
              <div className="mt-3 text-[26px] text-[#6E6D70]">{upNext ? 'Next question' : '...'}</div>
            )}
          </div>
        );
      })}

      {/* meter */}
      <div className="absolute flex items-center gap-5" style={{ left: 590, top: 482, width: 1234, height: 56 }}>
        <div className="text-[26px] font-bold text-[#222222] w-[170px]">Testable?</div>
        <div className="flex gap-2 flex-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-8 rounded-lg bg-stone-200 overflow-hidden">
              <div className={`h-full ${METER[step].tone} transition-all duration-700`} style={{ width: step > i ? '100%' : '0%' }} />
            </div>
          ))}
        </div>
        <div className="text-[26px] font-bold w-[240px] text-right" style={{ color: step === 3 ? '#059669' : step === 0 ? '#E5391C' : '#B45309' }}>
          {METER[step].label}
        </div>
      </div>
      <div className="absolute flex items-center text-[26px] leading-snug text-[#222222]" style={{ left: 590, top: 546, width: 1234, height: 48 }}>
        {step < 3 ? (
          <span>Could two people disagree about pass or fail? <b className="text-[#E5391C]">Yes.</b></span>
        ) : (
          <span>
            <b className="text-emerald-700">No.</b> Measurable means a person, a place and a number.
          </span>
        )}
      </div>

      <div className="absolute flex gap-4" style={{ left: 590, top: 604 }}>
        <button onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step >= 3} className={btnPrimary}>
          {next} <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            setStep(0);
            setSel(0);
          }}
          className={btnSecondary}
        >
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
      </div>
    </div>
  );
};
