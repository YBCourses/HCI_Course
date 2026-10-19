import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Lightbulb, AlertTriangle, Eye } from 'lucide-react';

interface Assumption {
  text: string;
  matters: 1 | 2 | 3;
  sure: 1 | 2 | 3;
}

const ASSUMPTIONS: Assumption[] = [
  { text: 'They know which room they want.', matters: 3, sure: 1 },
  { text: 'They book from a laptop.', matters: 2, sure: 2 },
  { text: 'They book days ahead.', matters: 2, sure: 1 },
  { text: 'They know the booking rules.', matters: 2, sure: 2 },
  { text: 'They notice the confirmation.', matters: 3, sure: 3 },
  { text: 'They book alone.', matters: 1, sure: 1 },
];

const IDEA = 'A page where students book a study room quickly.';
const RISKY = 0;
// 0 idea · 1..6 assumptions · 7 markers · 8 riskiest · 9 research question
const LAST = 9;
const STAGES = [
  { label: 'The idea', from: 0 },
  { label: 'Hidden assumptions', from: 1 },
  { label: 'Matters and certainty', from: 7 },
  { label: 'Research question', from: 9 },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const Dots: React.FC<{ label: string; level: number; tone: string }> = ({ label, level, tone }) => (
  <div className="flex items-center gap-3">
    <div className="text-[22px] text-[#525254] whitespace-nowrap w-[222px]">{label}</div>
    <div className="flex gap-2">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`w-[22px] h-[22px] rounded-full border-2 ${n <= level ? `${tone} border-transparent` : 'bg-white border-[#CFC8BC]'}`} />
      ))}
    </div>
  </div>
);

export const AssumptionsDemo: React.FC = () => {
  const [s, setS] = useState(0);
  const stage = STAGES.reduce((acc, st, i) => (s >= st.from ? i : acc), 0);
  const marks = s >= 7;
  const risky = s >= 8;
  const question = s >= 9;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Controls */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {STAGES.map((st, i) => (
            <div key={st.label} className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full ${i === stage ? 'bg-[#E5391C]' : i < stage ? 'bg-[#E5391C]/40' : 'bg-[#E8E2D9]'}`} />
              <span className={`text-[24px] whitespace-nowrap ${i === stage ? 'font-bold text-[#222222]' : 'text-[#6E6D70]'}`}>
                {i + 1}. {st.label}
              </span>
              {i < STAGES.length - 1 && <span className="w-6 border-t-2 border-[#E8E2D9]" />}
            </div>
          ))}
        </div>
        <button onClick={() => setS(0)} disabled={s === 0} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <button onClick={() => setS((v) => Math.max(0, v - 1))} disabled={s === 0} className={SECONDARY}>
          <ChevronLeft className="w-6 h-6" />
          Back
        </button>
        <button onClick={() => setS((v) => Math.min(LAST, v + 1))} disabled={s === LAST} className={`${PRIMARY} min-w-[200px]`}>
          Next
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Idea */}
      <div className="flex-shrink-0 bg-white border-2 border-[#E8E2D9] rounded-2xl px-6 py-3 flex items-center gap-4">
        <Lightbulb className="w-10 h-10 text-amber-500 flex-shrink-0" />
        <div className="text-[24px] font-mono text-[#6E6D70] whitespace-nowrap">The idea</div>
        <div className="text-[34px] leading-[1.25] font-bold text-[#222222]">{IDEA}</div>
      </div>

      {/* Assumptions */}
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-3">
        {ASSUMPTIONS.map((a, i) => {
          const visible = s >= i + 1;
          const isRisky = risky && i === RISKY;
          const tone = isRisky
            ? 'border-[3px] border-[#E5391C] bg-[#FDECE8] shadow-md'
            : 'border border-[#E8E2D9] bg-white';
          return (
            <div
              key={a.text}
              className={`min-h-0 rounded-2xl px-4 py-2 flex flex-col justify-center gap-1 transition-all ${tone} ${visible ? '' : 'invisible'} ${risky && !isRisky ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-[#6E6D70] flex-shrink-0" />
                <div className="text-[26px] leading-[1.2] font-semibold text-[#222222]">{a.text}</div>
              </div>
              <div className={`flex flex-col gap-1 ${marks ? '' : 'invisible'}`}>
                <Dots label="How much it matters" level={a.matters} tone="bg-[#E5391C]" />
                <Dots label="How sure are we" level={a.sure} tone="bg-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom panel */}
      <div className="flex-shrink-0 h-[136px] rounded-2xl border border-[#E8E2D9] bg-white px-6 py-3 flex flex-col justify-center">
        {question ? (
          <div className="flex items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="text-[22px] font-mono text-[#6E6D70]">Research question</div>
              <div className="text-[34px] leading-[1.2] font-bold text-[#222222]">How do students choose a room when they book?</div>
              <div className="text-[24px] leading-tight text-emerald-700 font-semibold mt-1">
                A question you can answer with people, not with opinions.
              </div>
            </div>
            <div className="flex-shrink-0 text-center rounded-xl bg-emerald-50 border-2 border-emerald-600 px-5 py-3">
              <div className="text-[22px] text-emerald-800">Method suggestion</div>
              <div className="text-[30px] font-bold text-emerald-800 leading-tight">Observe + interview</div>
            </div>
          </div>
        ) : risky ? (
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-10 h-10 text-[#E5391C] flex-shrink-0 mt-1" />
            <div>
              <div className="text-[30px] leading-[1.2] font-bold text-[#222222]">Riskiest: “They know which room they want.”</div>
              <div className="text-[24px] leading-[1.25] text-[#525254]">
                It matters a lot, and we are not sure: if students do not know, the first step of the page stops them.
              </div>
            </div>
          </div>
        ) : marks ? (
          <div className="text-[28px] text-[#525254]">Matters a lot and we are not sure: that is where to look first.</div>
        ) : s >= 1 ? (
          <div className="text-[28px] text-[#525254]">Things we quietly take for granted about the students.</div>
        ) : (
          <div className="text-[28px] text-[#6E6D70]">Press Next: what does this idea quietly assume?</div>
        )}
      </div>
    </div>
  );
};
