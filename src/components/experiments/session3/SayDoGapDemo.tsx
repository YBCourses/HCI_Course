import React, { useState } from 'react';
import { Eye, RotateCcw } from 'lucide-react';

interface Row {
  question: string;
  say: { value: number; text: string; tag: string };
  doo: { value: number; text: string; tag: string };
  note: string;
}

const ROWS: Row[] = [
  {
    question: 'Do you read the terms and conditions?',
    say: { value: 75, text: '75%', tag: 'illustrative' },
    doo: { value: 2, text: '2%', tag: 'real: one famous study' },
    note: 'Do bar: refused the clause giving away their first-born child. 98% agreed (Obar and Oeldorf-Hirsch).',
  },
  {
    question: 'Do you notice online ads?',
    say: { value: 70, text: '70%', tag: 'typical illustration' },
    doo: { value: 15, text: '15%', tag: 'typical illustration' },
    note: 'Say bar: "I notice them". Do bar: can name an ad they just saw.',
  },
  {
    question: 'How often do you really use the features you ask for?',
    say: { value: 80, text: '80%', tag: 'illustrative' },
    doo: { value: 25, text: '25%', tag: 'illustrative' },
    note: 'Say bar: "I will use them". Do bar: actually used later.',
  },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2 whitespace-nowrap';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white`;

export const SayDoGapDemo: React.FC = () => {
  const [shown, setShown] = useState(0);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex items-center gap-4 flex-shrink-0">
        <div className="text-[32px] text-[#525254] leading-tight">Answer each question on paper first. Then see what people do.</div>
        <div className="flex-1" />
        <button onClick={() => setShown(0)} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
      </div>

      {ROWS.map((r, i) => {
        const open = i < shown;
        const next = i === shown;
        return (
          <div
            key={r.question}
            className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-2xl shadow-xs px-6 py-3 flex items-center gap-8"
          >
            <div className="w-[520px] flex-shrink-0 text-[30px] font-bold text-[#222222] leading-[1.25]">
              {i + 1}. {r.question}
            </div>
            <div className="flex-1 min-w-0 h-full flex flex-col justify-center">
              {open ? (
                <div className="flex flex-col gap-2">
                  <BarLine label="What people say" item={r.say} color="#2563EB" open={open} />
                  <BarLine label="What people do" item={r.doo} color="#E5391C" open={open} />
                  <div className="text-[22px] text-[#6E6D70] leading-tight">{r.note}</div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button onClick={() => setShown(i + 1)} disabled={!next} className={`${PRIMARY} disabled:opacity-30 disabled:hover:bg-[#E5391C]`}>
                    <Eye className="w-6 h-6" />
                    Reveal
                  </button>
                  {!next && <div className="text-[26px] text-[#6E6D70]">Reveal the rows in order.</div>}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BarLine: React.FC<{ label: string; item: { value: number; text: string; tag: string }; color: string; open: boolean }> = ({
  label,
  item,
  color,
  open,
}) => (
  <div className="flex items-center gap-4">
    <div className="w-[250px] flex-shrink-0 text-[28px] font-semibold text-[#222222] leading-tight">{label}</div>
    <div className="w-[560px] flex-shrink-0 h-[44px] rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] overflow-hidden">
      <div
        className="h-full rounded-r-md transition-[width] duration-700 ease-out"
        style={{ width: open ? `${item.value}%` : 0, background: color }}
      />
    </div>
    <div className="text-[28px] font-bold leading-tight w-[90px] flex-shrink-0" style={{ color }}>{item.text}</div>
    <div className="text-[22px] text-[#6E6D70] leading-tight">{item.tag}</div>
  </div>
);
