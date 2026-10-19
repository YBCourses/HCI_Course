import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface Q {
  question: string;
  tag: string;
  tone: 'red' | 'amber' | 'blue' | 'emerald';
  problem: string;
  better: string[];
  betterNote?: string;
}

/** Interview questions about the Study Room Booking app (class example). */
const QUESTIONS: Q[] = [
  {
    question: "Don't you think the booking button is hard to find?",
    tag: 'Leading',
    tone: 'red',
    problem: 'It puts the answer in the person’s mouth, so they will probably just agree.',
    better: ['Can you show me how you book a room? Tell me what you notice as you go.'],
  },
  {
    question: 'Do you like the app?',
    tag: 'Closed and vague',
    tone: 'amber',
    problem: 'It can be answered with one word, and "like" could mean anything.',
    better: ['What is the first thing you do when you open the app?'],
  },
  {
    question: 'How often do you book a room and what would make it better?',
    tag: 'Two questions in one',
    tone: 'amber',
    problem: 'The person answers only the part they remember, and you cannot tell which one.',
    better: ['How often do you book a room?', 'What is the hardest part when you do?'],
  },
  {
    question: 'Would you use a feature that shows free rooms on a map?',
    tag: 'Hypothetical',
    tone: 'blue',
    problem: 'People say yes to ideas they would never use. It asks about the future, not real life.',
    better: ['How do you find a free room today?'],
  },
  {
    question: 'Tell me about the last time you booked a room.',
    tag: 'Already good',
    tone: 'emerald',
    problem: 'It asks for a real story, it is open, and it does not suggest any answer.',
    better: ['Keep it as it is. This is the model to copy.'],
  },
];

const TONE: Record<Q['tone'], { chip: string; text: string }> = {
  red: { chip: 'bg-red-100 text-red-800 border-red-300', text: 'text-red-700' },
  amber: { chip: 'bg-amber-100 text-amber-900 border-amber-400', text: 'text-amber-800' },
  blue: { chip: 'bg-blue-100 text-blue-800 border-blue-300', text: 'text-blue-700' },
  emerald: { chip: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'text-emerald-700' },
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const QuestionRewriterDemo: React.FC = () => {
  const [i, setI] = useState(0);
  const [steps, setSteps] = useState<number[]>(QUESTIONS.map(() => 0));
  const q = QUESTIONS[i];
  const step = steps[i];
  const good = q.tone === 'emerald';
  const setStep = (s: number) => setSteps((p) => p.map((v, k) => (k === i ? s : v)));

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-12 flex items-center justify-between flex-shrink-0">
        <div className="text-[28px] font-bold text-[#222222]">
          Interview question {i + 1} of {QUESTIONS.length}
        </div>
        {step === 0 && (
          <div className="flex items-center gap-2 text-[28px] text-[#525254]">
            <Lightbulb className="w-7 h-7 text-amber-500" />
            Think in silence: what is wrong with it? How would you ask it?
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 flex gap-6">
        {/* The question */}
        <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-8 py-6 flex flex-col">
          <div className="text-[28px] font-bold text-[#6E6D70]">The question</div>
          <div className="text-[34px] leading-[1.3] font-bold text-[#222222] mt-2">&ldquo;{q.question}&rdquo;</div>
          <div className="flex-1 min-h-0 mt-4">
            {step >= 1 && (
              <div className="flex flex-col gap-3">
                <span className={`self-start flex items-center gap-2 rounded-full border px-4 py-1.5 text-[28px] font-bold ${TONE[q.tone].chip}`}>
                  {good ? <CheckCircle2 className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
                  {q.tag}
                </span>
                <div className="text-[30px] leading-[1.3] text-[#222222]">{q.problem}</div>
              </div>
            )}
          </div>
        </div>

        {/* The rewrite */}
        <div
          className={`flex-1 min-w-0 rounded-3xl px-8 py-6 flex flex-col border-2 ${
            step >= 2 ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-[#FAF9F6] border-dashed border-[#E8E2D9]'
          }`}
        >
          {step >= 2 ? (
            <>
              <div className="text-[28px] font-bold text-emerald-700">{good ? 'The model' : 'A better question'}</div>
              <div className="flex flex-col gap-3 mt-2">
                {q.better.map((b) => (
                  <div key={b} className="text-[34px] leading-[1.3] font-bold text-[#222222]">
                    {good ? b : `“${b}”`}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <div className="h-16 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => setI(i - 1)} disabled={i === 0} className={SECONDARY}>
          <ChevronLeft className="w-6 h-6" />
          Previous
        </button>
        <button onClick={() => setI(i + 1)} disabled={i === QUESTIONS.length - 1} className={SECONDARY}>
          Next
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="flex-1" />
        <button onClick={() => setStep(1)} disabled={step >= 1} className={PRIMARY}>
          Show the problem
        </button>
        <button onClick={() => setStep(2)} disabled={step !== 1} className={PRIMARY}>
          Show a better question
        </button>
        <button onClick={() => { setSteps(QUESTIONS.map(() => 0)); setI(0); }} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>
    </div>
  );
};
