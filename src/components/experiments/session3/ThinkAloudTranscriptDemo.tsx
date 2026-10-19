import React, { useState } from 'react';
import { Eye, EyeOff, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type Marker = 'Expectation' | 'Confusion' | 'Workaround' | 'Success';

interface Line {
  t: string;
  text: string;
  marker: Marker;
  expected: string;
  happened: string;
  gap: string;
}

/** Scripted think-aloud of Imane booking a room on the Study Room Booking interface (class example). */
const LINES: Line[] = [
  {
    t: '0:12',
    text: 'Okay, I want a room for 4 for tomorrow afternoon. Let me see what is free.',
    marker: 'Expectation',
    expected: 'A list or search that shows free rooms for 4 people, tomorrow.',
    happened: 'The page opens on a plain grey form and a very long list of rooms.',
    gap: 'The page does not start from her goal: it starts from the system.',
  },
  {
    t: '0:30',
    text: 'There is a big orange banner about coffee... that is not what I need. Where do I start?',
    marker: 'Confusion',
    expected: 'The main booking action to be the most visible thing.',
    happened: 'The loudest thing on the page is a coffee offer.',
    gap: 'The eye goes to the banner, so she loses time finding the start.',
  },
  {
    t: '0:52',
    text: 'It asks for a room code? I do not know any codes. Is it written somewhere?',
    marker: 'Confusion',
    expected: 'To pick a room by name or from a list.',
    happened: 'The Room box is empty: she must type a code like LIB-2F-07.',
    gap: 'She has to know something the screen does not tell her.',
  },
  {
    t: '1:10',
    text: 'Maybe the Rooms tab has them. I will write one down and come back.',
    marker: 'Workaround',
    expected: 'To stay on the Book page and choose a room there.',
    happened: 'She leaves the page, finds the codes on Rooms, and notes one down.',
    gap: 'She invents her own method: memory and paper replace the interface.',
  },
  {
    t: '1:48',
    text: 'This one seats 4 and the dot is green, so it is free. Good, I have my room.',
    marker: 'Success',
    expected: 'To find a free room that fits 4 people.',
    happened: 'After scanning many rows, she finds a free room for 4.',
    gap: 'No gap here, but it cost her almost a minute of scanning.',
  },
  {
    t: '2:05',
    text: 'Date... do I type slashes or dashes? I will try 2026-10-13. Start 14:00.',
    marker: 'Confusion',
    expected: 'A calendar and time choices to click.',
    happened: 'Blank boxes with no example of the format required.',
    gap: 'She must guess the exact format, and a wrong guess gives a vague error.',
  },
  {
    t: '2:40',
    text: 'Hold is the big button, so that must be the one that books it. Click.',
    marker: 'Expectation',
    expected: 'The biggest button to confirm the booking.',
    happened: 'Hold only keeps the room for 10 minutes. It does not book it.',
    gap: 'The look of the button promises something its label does not do.',
  },
  {
    t: '2:58',
    text: 'Nothing happened? Is it booked? My items says "Held, 10 min". Only ten minutes?',
    marker: 'Confusion',
    expected: 'A clear message: "Your room is booked".',
    happened: 'The screen does not change. The word Held appears on another tab.',
    gap: 'She cannot tell what state she is in, and the clock is now running.',
  },
  {
    t: '3:30',
    text: 'There is a tiny Reserve at the bottom corner. I almost missed it. Click.',
    marker: 'Workaround',
    expected: 'The real booking button to be near the form.',
    happened: 'She scans the whole screen and finds a tiny button in a far corner.',
    gap: 'She found it by searching, not because the screen guided her.',
  },
  {
    t: '3:52',
    text: 'I check My items: it says Reserved. Okay, done. I am not sure it had to be this hard.',
    marker: 'Success',
    expected: 'A confirmation with the room, day and time.',
    happened: 'No confirmation: she checks another tab to be sure it worked.',
    gap: 'She finished the task, but only by verifying it herself.',
  },
];

const MARKER_STYLE: Record<Marker, { chip: string; bar: string }> = {
  Expectation: { chip: 'bg-blue-100 text-blue-800 border-blue-300', bar: 'bg-blue-500' },
  Confusion: { chip: 'bg-red-100 text-red-800 border-red-300', bar: 'bg-red-500' },
  Workaround: { chip: 'bg-amber-100 text-amber-900 border-amber-400', bar: 'bg-amber-500' },
  Success: { chip: 'bg-emerald-100 text-emerald-800 border-emerald-300', bar: 'bg-emerald-600' },
};
const MARKERS = Object.keys(MARKER_STYLE) as Marker[];

const PER_PAGE = 5;
const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white`;

export const ThinkAloudTranscriptDemo: React.FC = () => {
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [shown, setShown] = useState(false);

  const reset = () => {
    setPage(0);
    setSel(null);
    setShown(false);
  };
  const line = sel === null ? null : LINES[sel];
  const pageLines = LINES.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
      {/* Transcript */}
      <div className="w-[1090px] flex-shrink-0 flex flex-col gap-3 min-h-0">
        <div className="h-16 flex items-center gap-3 flex-shrink-0">
          <div className="text-[28px] font-bold text-[#222222] mr-2 whitespace-nowrap">Imane thinks aloud</div>
          <button onClick={() => setPage(0)} disabled={page === 0} className={SECONDARY}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-[24px] font-mono text-[#525254] whitespace-nowrap">Page {page + 1}/2</div>
          <button onClick={() => setPage(1)} disabled={page === 1} className={SECONDARY}>
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <button onClick={() => setShown((s) => !s)} className={PRIMARY}>
            {shown ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            {shown ? 'Hide markers' : 'Show markers'}
          </button>
          <button onClick={reset} className={SECONDARY}>
            <RotateCcw className="w-6 h-6" />
            Reset
          </button>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-2">
          {pageLines.map((l, i) => {
            const idx = page * PER_PAGE + i;
            const active = sel === idx;
            return (
              <button
                key={idx}
                onClick={() => setSel(idx)}
                className={`flex-1 min-h-0 flex items-center gap-4 text-left rounded-xl border-2 px-4 ${
                  active ? 'border-[#E5391C] bg-[#FDF5F3]' : 'border-[#E8E2D9] bg-white hover:bg-stone-50'
                }`}
              >
                <span className="w-[72px] flex-shrink-0 text-[26px] font-mono font-bold text-[#6E6D70]">{l.t}</span>
                <span className="flex-1 text-[28px] leading-[1.25] text-[#222222]">{l.text}</span>
                <span className="w-[200px] flex-shrink-0 flex justify-end">
                  {shown && (
                    <span className={`rounded-full border px-3 py-1 text-[22px] font-bold ${MARKER_STYLE[l.marker].chip}`}>
                      {l.marker}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side card */}
      <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-4 flex flex-col min-h-0">
        {line ? (
          <>
            <div className="text-[30px] font-bold text-[#222222] leading-tight flex-shrink-0">
              <span className="font-mono text-[#6E6D70]">{line.t}</span> · Imane
            </div>
            <div className="flex-1 min-h-0 flex flex-col justify-between mt-2">
              <Section label="What she expected" color="text-blue-700" body={line.expected} />
              <Section label="What happened" color="text-[#525254]" body={line.happened} />
              <Section label="The gap" color="text-[#E5391C]" body={line.gap} strong />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-[32px] leading-[1.35] text-[#6E6D70]">
            Click a line to see the moment her expectation met the screen.
          </div>
        )}
        {shown && (
          <div className="flex-shrink-0 flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#E8E2D9]">
            {MARKERS.map((m) => (
              <span key={m} className={`rounded-full border px-3 py-1 text-[22px] font-bold ${MARKER_STYLE[m].chip}`}>
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{ label: string; color: string; body: string; strong?: boolean }> = ({ label, color, body, strong }) => (
  <div>
    <div className={`text-[28px] font-bold ${color}`}>{label}</div>
    <div className={`text-[26px] leading-[1.3] ${strong ? 'font-semibold text-[#222222]' : 'text-[#222222]'}`}>{body}</div>
  </div>
);
