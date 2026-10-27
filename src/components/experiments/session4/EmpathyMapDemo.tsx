import React, { useState } from 'react';
import { MessageSquare, Brain, Hand, HeartPulse, ArrowRight, RotateCcw, Phone, UserRound, Lightbulb, Unlink } from 'lucide-react';

// AHA: what Hassan SAYS ("Everyone look at the board!") is confident; what he THINKS ("Did everyone hear me?") is worry.
// The gap between the two is where the design opportunity hides.

const QUADS = [
  {
    key: 'says', label: 'Says', Icon: MessageSquare, head: 'bg-blue-600 text-white', box: 'border-blue-300',
    lines: ['“Everyone look at the board!”', '“Tell Salma to change Oven 2.”'],
  },
  {
    key: 'thinks', label: 'Thinks', Icon: Brain, head: 'bg-violet-600 text-white', box: 'border-violet-300',
    lines: ['“Did everyone hear me?”', '“Will I lose another order line?”'],
  },
  {
    key: 'does', label: 'Does', Icon: Hand, head: 'bg-emerald-600 text-white', box: 'border-emerald-300',
    lines: ['Writes in a corner of the board', 'Shouts across the hall', 'Walks to each station'],
  },
  {
    key: 'feels', label: 'Feels', Icon: HeartPulse, head: 'bg-rose-600 text-white', box: 'border-rose-300',
    lines: ['Stressed and rushed', 'Worried about 06:00', 'A little proud when it works'],
  },
] as const;

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const HINTS = [
  'Think in silence: a change has just arrived by phone. What is Hassan saying, thinking, doing, feeling?',
  'What Hassan says out loud.',
  'What goes on in his head, unspoken.',
  'What he does with his hands and feet.',
  'What he feels inside.',
  'Compare the first two: look at the gap between what he says and what he thinks.',
  'The gap is where the opportunity hides.',
];
const BUTTONS = ['Reveal Says', 'Reveal Thinks', 'Reveal Does', 'Reveal Feels', 'Show the gap', 'Show the opportunity'];

export const EmpathyMapDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const gap = step >= 5;

  const quad = (i: number) => {
    const q = QUADS[i];
    const shown = step >= i + 1;
    const glow = gap && i < 2;
    return (
      <div
        key={q.key}
        className={`min-h-0 rounded-2xl border-2 bg-white overflow-hidden flex flex-col transition-all duration-500 ${q.box} ${glow ? 'ring-4 ring-[#E5391C] shadow-lg' : ''}`}
        style={{ gridColumn: i % 2 === 0 ? 1 : 3, gridRow: i < 2 ? 1 : 2 }}
      >
        <div className={`h-12 flex-shrink-0 px-4 flex items-center gap-2 text-[28px] font-bold ${q.head}`}>
          <q.Icon className="w-7 h-7" />
          {q.label}
        </div>
        <div className="flex-1 min-h-0 px-5 py-3 flex flex-col justify-center gap-2">
          {q.lines.map((l, j) => (
            <div
              key={l}
              className="text-[26px] leading-[1.2] text-[#222222] font-semibold transition-all duration-500"
              style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(12px)', transitionDelay: `${j * 200}ms` }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={() => setStep((s) => Math.min(6, s + 1))} disabled={step >= 6} className={PRIMARY}>
          <ArrowRight className="w-6 h-6" />
          {BUTTONS[Math.min(step, 5)]}
        </button>
        <div className="flex-1 text-[24px] leading-[1.2] text-[#525254] px-2">{HINTS[step]}</div>
        <button onClick={() => setStep(0)} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-0 grid gap-3" style={{ gridTemplateColumns: '1fr 300px 1fr', gridTemplateRows: '1fr 1fr' }}>
        {[0, 1, 2, 3].map(quad)}

        {/* centre: link slot + Hassan */}
        <div className="flex flex-col items-center justify-between py-1" style={{ gridColumn: 2, gridRow: '1 / span 2' }}>
          <div className="h-[90px] w-full flex flex-col items-center justify-center">
            <div className="flex items-center w-full transition-opacity duration-700" style={{ opacity: gap ? 1 : 0 }}>
              <div className="flex-1 border-t-4 border-dashed border-[#E5391C]" />
              <Unlink className="w-9 h-9 mx-1 text-[#E5391C]" />
              <div className="flex-1 border-t-4 border-dashed border-[#E5391C]" />
            </div>
            <div className="text-[24px] font-bold text-[#E5391C] transition-opacity duration-700" style={{ opacity: gap ? 1 : 0 }}>
              the gap
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="relative w-[150px] h-[150px] rounded-full bg-[#FAF9F6] border-4 border-[#222222] flex items-center justify-center">
              <UserRound className="w-24 h-24 text-[#222222]" />
              <div className="absolute -right-3 -top-1 w-14 h-14 rounded-full bg-[#E5391C] text-white flex items-center justify-center animate-pulse">
                <Phone className="w-7 h-7" />
              </div>
            </div>
            <div className="text-[30px] font-bold text-[#222222] leading-tight">Hassan</div>
            <div className="text-[24px] text-[#525254] leading-tight">03:30, the phone just rang</div>
          </div>
          <div className="h-[90px]" />
        </div>
      </div>

      <div
        className="h-[84px] flex-shrink-0 rounded-2xl bg-[#E5391C] text-white px-6 flex items-center gap-4 transition-all duration-700"
        style={{ opacity: step >= 6 ? 1 : 0 }}
      >
        <Lightbulb className="w-10 h-10 flex-shrink-0" />
        <div className="text-[28px] font-bold leading-[1.2]">
          Design opportunity: Hassan should not have to wonder &ldquo;did they hear me?&rdquo; Everyone should know about a change without shouting.
        </div>
      </div>
    </div>
  );
};
