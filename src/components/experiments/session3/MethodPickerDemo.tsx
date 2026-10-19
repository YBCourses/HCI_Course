import React, { useState } from 'react';
import { BarChart3, Brain, ChevronLeft, ChevronRight, ClipboardList, Eye, MessageCircle, RotateCcw, Timer } from 'lucide-react';

type MethodId = 'observe' | 'interview' | 'think' | 'survey' | 'usage';

interface Method {
  id: MethodId;
  name: string;
  tells: string;
  icon: React.ReactNode;
}

const ICON = 'w-14 h-14';
const METHODS: Method[] = [
  { id: 'observe', name: 'Observe', tells: 'what people really do, step by step', icon: <Eye className={ICON} /> },
  { id: 'interview', name: 'Interview', tells: 'why they do it, in their own words', icon: <MessageCircle className={ICON} /> },
  { id: 'think', name: 'Think aloud', tells: 'what they are thinking at each step', icon: <Brain className={ICON} /> },
  { id: 'survey', name: 'Survey', tells: 'what many people say they prefer', icon: <ClipboardList className={ICON} /> },
  { id: 'usage', name: 'Usage data', tells: 'how many, how often, and when', icon: <BarChart3 className={ICON} /> },
];

interface Scenario {
  question: string;
  best: MethodId;
  also: MethodId | null;
  why: string;
  note?: string;
}

const SCENARIOS: Scenario[] = [
  {
    question: 'Where do students hesitate while booking a study room?',
    best: 'observe',
    also: 'think',
    why: 'Watching someone book a room shows exactly where they stop, go back or look around.',
  },
  {
    question: 'How many rooms are booked each week?',
    best: 'usage',
    also: null,
    why: 'This is a count, and the booking system already records it, so no one needs to be asked.',
  },
  {
    question: 'How do students decide where to study?',
    best: 'interview',
    also: 'observe',
    why: 'A decision happens in someone’s head, so ask for the story of the last time they chose a place.',
  },
  {
    question: 'Do students prefer the new colours?',
    best: 'survey',
    also: 'interview',
    why: 'Preference is an opinion, and a short survey can collect the opinions of many students.',
    note: 'Opinions are not behaviour: what people say they like is not always what they do.',
  },
  {
    question: 'Why do students leave the booking before confirming?',
    best: 'think',
    also: 'interview',
    why: 'Hearing their thoughts while they book shows the reason at the very moment they give up.',
  },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white`;

export const MethodPickerDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const sc = SCENARIOS[idx];

  const go = (next: number) => {
    setIdx(next);
    setShown(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Scenario panel */}
      <div className="flex-shrink-0 h-[186px] bg-white border border-[#E8E2D9] rounded-2xl px-6 py-4 flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[24px] font-mono text-[#6E6D70] whitespace-nowrap">
            Research question {idx + 1} of {SCENARIOS.length}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-300 px-4 py-1.5 text-[24px] text-amber-800 font-semibold whitespace-nowrap">
            <Timer className="w-6 h-6" />
            Think in silence: which method fits best?
          </div>
          <div className="flex-1" />
          <button onClick={() => go(idx - 1)} disabled={idx === 0} className={SECONDARY}>
            <ChevronLeft className="w-6 h-6" />
            Previous
          </button>
          <button onClick={() => go(idx + 1)} disabled={idx === SCENARIOS.length - 1} className={SECONDARY}>
            Next
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="text-[34px] leading-[1.25] font-bold text-[#222222]">{sc.question}</div>
      </div>

      {/* Five method cards */}
      <div className="flex-1 min-h-0 grid grid-cols-5 gap-4">
        {METHODS.map((m) => {
          const isBest = shown && m.id === sc.best;
          const isAlso = shown && m.id === sc.also;
          const tone = isBest
            ? 'border-emerald-600 bg-emerald-50 border-[3px] shadow-md'
            : isAlso
              ? 'border-emerald-300 bg-emerald-50/50 border-2'
              : 'border-[#E8E2D9] bg-white border';
          const dim = shown && !isBest && !isAlso ? 'opacity-50' : '';
          return (
            <div key={m.id} className={`rounded-2xl p-4 flex flex-col items-center text-center transition-all ${tone} ${dim}`}>
              <div className={`mt-1 ${isBest ? 'text-emerald-700' : isAlso ? 'text-emerald-600' : 'text-[#E5391C]'}`}>{m.icon}</div>
              <div className="mt-2 text-[30px] font-bold text-[#222222] leading-tight">{m.name}</div>
              <div className="mt-2 text-[24px] leading-[1.3] text-[#525254]">
                <span className="font-semibold text-[#222222]">Tells you </span>
                {m.tells}
              </div>
              <div className="flex-1" />
              <div className="h-10 flex items-center">
                {isBest && (
                  <span className="rounded-full bg-emerald-600 text-white text-[22px] font-bold px-4 py-0.5">Best method</span>
                )}
                {isAlso && (
                  <span className="rounded-full bg-white border border-emerald-400 text-emerald-700 text-[22px] font-bold px-4 py-0.5">
                    Also useful
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reveal strip */}
      <div className="flex-shrink-0 h-[112px] bg-white border border-[#E8E2D9] rounded-2xl px-5 flex items-center gap-5">
        {shown ? (
          <button onClick={() => setShown(false)} className={`${SECONDARY} w-[320px] flex-shrink-0`}>
            <RotateCcw className="w-6 h-6" />
            Hide
          </button>
        ) : (
          <button onClick={() => setShown(true)} className={`${PRIMARY} w-[320px] flex-shrink-0`}>
            Show the best method
          </button>
        )}
        <div className="flex-1 min-w-0">
          {shown ? (
            <>
              <div className="text-[28px] leading-[1.25] font-semibold text-[#222222]">{sc.why}</div>
              {sc.note && <div className="mt-1 text-[24px] leading-tight text-amber-800">{sc.note}</div>}
            </>
          ) : (
            <div className="text-[28px] text-[#6E6D70]">Think first, then see.</div>
          )}
        </div>
      </div>
    </div>
  );
};
