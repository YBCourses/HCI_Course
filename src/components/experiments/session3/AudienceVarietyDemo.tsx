import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap, KeyRound, Users, Glasses, UserRound } from 'lucide-react';

interface Person {
  name: string;
  role: string;
  icon: React.ReactNode;
  goal: string;
  abilities: string;
  context: string;
  blocker: string;
}

const ICON = 'w-16 h-16';
const PEOPLE: Person[] = [
  {
    name: 'Sara',
    role: 'First-week student',
    icon: <GraduationCap className={ICON} />,
    goal: 'Find any free room in the next hour.',
    abilities: 'Does not know the building codes.',
    context: 'Standing in a corridor, phone, slow wifi.',
    blocker: 'The form asks for a room code, and codes are only shown on the Rooms tab.',
  },
  {
    name: 'Karim',
    role: 'Library staff, manages rooms',
    icon: <KeyRound className={ICON} />,
    goal: 'Keep bookings correct all day.',
    abilities: 'Knows every room code by heart.',
    context: 'At the desk, big screen, many bookings.',
    blocker: 'There is no confirmation, so he cannot tell whether a booking went through.',
  },
  {
    name: 'Nadia',
    role: 'Final-year student, study group',
    icon: <Users className={ICON} />,
    goal: 'Book a room for six people.',
    abilities: 'Confident with apps.',
    context: 'Between lectures, laptop, in a rush.',
    blocker: 'The date must be typed in one strict format; a slip gives a vague error.',
  },
  {
    name: 'Youssef',
    role: 'Student with low vision',
    icon: <Glasses className={ICON} />,
    goal: 'Reserve a quiet room for tomorrow.',
    abilities: 'Reads large text only, zooms the page.',
    context: 'At home, laptop, screen magnifier on.',
    blocker: 'The Reserve button is tiny, while the big Hold button looks like the main one.',
  },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const Part: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div>
    <div className="text-[22px] font-bold uppercase tracking-wide text-[#E5391C] leading-tight">{label}</div>
    <div className="text-[24px] leading-[1.25] text-[#222222]">{text}</div>
  </div>
);

export const AudienceVarietyDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="text-[28px] font-semibold text-[#222222] flex-1 min-w-0 truncate">
          Study Room Booking: who really uses it?
        </div>
        <div className="text-[24px] font-mono text-[#6E6D70] whitespace-nowrap">{count} of 4 revealed</div>
        <button onClick={() => setCount(0)} disabled={count === 0} className={SECONDARY}>
          <EyeOff className="w-6 h-6" />
          Hide all
        </button>
        <button onClick={() => setCount((c) => Math.min(4, c + 1))} disabled={count === 4} className={PRIMARY}>
          <Eye className="w-6 h-6" />
          Reveal next user
        </button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-4 gap-4">
        {PEOPLE.map((p, i) => {
          const open = i < count;
          return (
            <div
              key={p.name}
              className={`min-h-0 rounded-2xl bg-white p-4 flex flex-col transition-all ${
                open ? 'border-[3px] border-[#E5391C] shadow-md' : 'border border-[#E8E2D9]'
              }`}
            >
              <div className={`flex items-center gap-4 ${open ? '' : 'flex-1 flex-col justify-center text-center'}`}>
                <div className={`flex-shrink-0 rounded-full flex items-center justify-center ${open ? 'w-[76px] h-[76px] bg-[#FDECE8] text-[#E5391C]' : 'w-[120px] h-[120px] bg-stone-100 text-[#6E6D70]'}`}>
                  {open ? p.icon : <UserRound className="w-16 h-16" />}
                </div>
                <div className="min-w-0">
                  <div className="text-[30px] font-bold text-[#222222] leading-tight">{p.name}</div>
                  <div className="text-[24px] text-[#525254] leading-tight">{p.role}</div>
                </div>
              </div>
              {open && (
                <div className="mt-2 flex-1 min-h-0 flex flex-col justify-between">
                  <div className="flex flex-col gap-1.5">
                    <Part label="Goal" text={p.goal} />
                    <Part label="Abilities" text={p.abilities} />
                    <Part label="Context" text={p.context} />
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-300 px-3 py-2 mt-2">
                    <div className="text-[22px] font-bold text-amber-800 leading-tight">What gets in the way in this app</div>
                    <div className="text-[24px] leading-[1.2] text-[#222222]">{p.blocker}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`flex-shrink-0 h-[68px] rounded-2xl flex items-center justify-center text-[34px] font-bold transition-all ${
          count === 4 ? 'bg-[#E5391C] text-white' : 'bg-transparent text-transparent'
        }`}
      >
        {count === 4 && 'Same app, four different people. “Everyone” is nobody.'}
      </div>
    </div>
  );
};
