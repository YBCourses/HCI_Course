import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Lightbulb, MessageSquareQuote, RotateCcw, Timer, ThumbsUp, Users } from 'lucide-react';

type TagId = 'observer' | 'leading' | 'expected' | 'none';

interface Tag {
  id: TagId;
  name: string;
  meaning: string;
  icon: React.ReactNode;
}

const ICON = 'w-12 h-12';
const TAGS: Tag[] = [
  { id: 'observer', name: 'Observer effect', meaning: 'People act differently when someone watches.', icon: <Users className={ICON} /> },
  { id: 'leading', name: 'Leading the user', meaning: 'We steer them toward the answer.', icon: <MessageSquareQuote className={ICON} /> },
  { id: 'expected', name: 'Seeing only what we expected', meaning: 'We keep what fits our idea and skip the rest.', icon: <Eye className={ICON} /> },
  { id: 'none', name: 'No bias', meaning: 'A plain fact we saw or counted.', icon: <ThumbsUp className={ICON} /> },
];

interface Statement {
  text: string;
  answer: TagId;
  instead: string;
}

const STATEMENTS: Statement[] = [
  {
    text: 'I told her to click the green button when she paused.',
    answer: 'leading',
    instead: 'Stay quiet when they pause, and write down how long the pause lasts.',
  },
  {
    text: 'They were quick because I was sitting right next to them.',
    answer: 'observer',
    instead: 'Sit a little behind them, say little, and note in your report that you were there.',
  },
  {
    text: 'As we expected, nobody found the search, so the redesign is right.',
    answer: 'expected',
    instead: 'Write what happened first, then look on purpose for something that would surprise you.',
  },
  {
    text: 'Three people paused for more than 5 seconds on the Hold step.',
    answer: 'none',
    instead: 'Keep notes like this one: what you saw and counted, with no guess about why.',
  },
  {
    text: 'She said it was fine, so it must be fine.',
    answer: 'expected',
    instead: 'Check what she did, not only what she said, and ask her what was hard.',
  },
  {
    text: 'He looked annoyed, so he hated it.',
    answer: 'expected',
    instead: 'Write what you saw (he sighed, he frowned), then ask him: how was that step for you?',
  },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white`;

export const SpotTheBiasDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const st = STATEMENTS[idx];

  const go = (n: number) => {
    setIdx(n);
    setShown(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Statement panel */}
      <div className="flex-shrink-0 h-[212px] bg-white border border-[#E8E2D9] rounded-2xl px-6 py-4 flex flex-col">
        <div className="flex items-center gap-4">
          <div className="text-[24px] font-mono text-[#6E6D70] whitespace-nowrap">
            From the observation notes: {idx + 1} of {STATEMENTS.length}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-300 px-4 py-1.5 text-[24px] text-amber-800 font-semibold whitespace-nowrap">
            <Timer className="w-6 h-6" />
            Think in silence: which tag fits?
          </div>
          <div className="flex-1" />
          <button onClick={() => go(idx - 1)} disabled={idx === 0} className={SECONDARY}>
            <ChevronLeft className="w-6 h-6" />
            Previous
          </button>
          <button onClick={() => go(idx + 1)} disabled={idx === STATEMENTS.length - 1} className={SECONDARY}>
            Next
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 flex items-center">
          <div className="text-[34px] leading-[1.3] font-bold text-[#222222] border-l-4 border-[#E5391C] pl-5">
            {'“'}
            {st.text}
            {'”'}
          </div>
        </div>
      </div>

      {/* Four tag cards */}
      <div className="flex-1 min-h-0 grid grid-cols-4 gap-4">
        {TAGS.map((t) => {
          const isAnswer = shown && t.id === st.answer;
          const tone = isAnswer ? 'border-emerald-600 bg-emerald-50 border-[3px] shadow-md' : 'border-[#E8E2D9] bg-white border';
          const dim = shown && !isAnswer ? 'opacity-45' : '';
          return (
            <div key={t.id} className={`rounded-2xl p-4 flex flex-col transition-all ${tone} ${dim}`}>
              <div className="flex items-center gap-3">
                <div className={isAnswer ? 'text-emerald-700' : 'text-[#E5391C]'}>{t.icon}</div>
                <div className="text-[30px] font-bold text-[#222222] leading-tight">{t.name}</div>
              </div>
              <div className="mt-2 text-[24px] leading-[1.3] text-[#525254]">{t.meaning}</div>
              <div className="flex-1" />
              <div className="h-9 flex items-center">
                {isAnswer && (
                  <span className="rounded-full bg-emerald-600 text-white text-[22px] font-bold px-4 py-0.5">This one</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reveal strip */}
      <div className="flex-shrink-0 h-[112px] bg-white border border-[#E8E2D9] rounded-2xl px-5 flex items-center gap-5">
        {shown ? (
          <button onClick={() => setShown(false)} className={`${SECONDARY} w-[280px] flex-shrink-0`}>
            <RotateCcw className="w-6 h-6" />
            Hide
          </button>
        ) : (
          <button onClick={() => setShown(true)} className={`${PRIMARY} w-[280px] flex-shrink-0`}>
            Show answer
          </button>
        )}
        <div className="flex-1 min-w-0">
          {shown ? (
            <div className="flex items-start gap-3">
              <Lightbulb className="w-8 h-8 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="text-[28px] leading-[1.25] font-semibold text-[#222222]">
                <span className="text-emerald-700">Do instead: </span>
                {st.instead}
              </div>
            </div>
          ) : (
            <div className="text-[28px] text-[#6E6D70]">Decide silently, then see the answer.</div>
          )}
        </div>
      </div>
    </div>
  );
};
