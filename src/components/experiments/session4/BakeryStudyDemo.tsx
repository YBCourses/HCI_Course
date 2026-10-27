import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, ChevronRight } from 'lucide-react';

/**
 * Lecturer-run story of the Session 3 study of the Fresh Batch bakery, in 4 steps:
 * 12 notes on the night timeline -> 5 patterns (notes slide into columns) -> 4 insights (one per click) -> the audience profile.
 * AHA: the chain notes -> patterns -> insights -> profile. Nothing is invented: every line is traceable to a note.
 * Source: teacher/session4-case.md ("What the research found").
 */

type NoteT = { n: number; time?: string; full: string; short: string; group: number; mins?: number };

const NOTES: NoteT[] = [
  { n: 1, time: '01:35', mins: 95, full: 'Hassan writes the plan on the whiteboard with a marker, standing; takes 8 minutes.', short: 'Plan written on the board, 8 min', group: 0 },
  { n: 2, time: '02:10', mins: 130, full: 'Salma looks at the whiteboard from the oven, 4 metres away, squints, walks over to read it.', short: 'Squints from 4 m, walks over', group: 0 },
  { n: 3, time: '02:50', mins: 170, full: 'Nadia phones: shop 14 wants 60 more baguettes. Hassan writes it in a corner of the board.', short: 'Change written in a corner', group: 1 },
  { n: 4, time: '03:20', mins: 200, full: 'Salma does not see the new line; she keeps baking the old quantity.', short: 'Keeps baking the old quantity', group: 1 },
  { n: 5, time: '03:45', mins: 225, full: 'Oven 2 waits 6 minutes: nobody knows what comes next.', short: 'Oven 2 idle 6 min: what next?', group: 2 },
  { n: 6, time: '04:00', mins: 240, full: 'Someone wipes part of the board with a floury sleeve; one order line disappears.', short: 'A sleeve wipes a line away', group: 1 },
  { n: 7, time: '04:35', mins: 275, full: 'Youssef asks aloud "which shop first?" three times; no one answers over the noise.', short: '"Which shop first?" x3, no answer', group: 3 },
  { n: 8, time: '04:50', mins: 290, full: 'Youssef: "I read the numbers, the French words I guess."', short: 'Reads numbers, guesses French', group: 3 },
  { n: 9, time: '05:25', mins: 325, full: 'Amine waits at the dock; he does not know the route order, so he calls Hassan.', short: 'Driver waits, calls Hassan', group: 3 },
  { n: 10, time: '05:45', mins: 345, full: 'A crate for shop 22 is missing; found on the wrong rack.', short: 'Shop 22 crate on the wrong rack', group: 3 },
  { n: 11, full: 'Hassan: "I do not need more information. I need to see the next thing, now."', short: '"I need to see the next thing, now"', group: 2 },
  { n: 12, full: 'Salma: "My hands are never clean. I cannot touch anything."', short: '"My hands are never clean"', group: 4 },
];

const PATTERNS = [
  'Cannot see the plan from where I work',
  'Changes get lost',
  'Nobody knows what is next',
  'Packing order is unclear',
  'Hands and noise rule out touch and sound',
];

const INSIGHTS = [
  { text: 'Night bakers need to see the next batch from where they stand, because they work 2 to 4 metres from the board and their hands are busy.', from: 'patterns a, e' },
  { text: 'Order changes must reach everyone at once, because a note in a corner is missed and sometimes erased.', from: 'pattern b' },
  { text: 'Packers and drivers need the shop order first, because they lose minutes asking.', from: 'pattern d' },
  { text: 'Words slow people down; numbers and icons work, because many read French less easily.', from: 'pattern d, note 8' },
];

const PROFILE: [string, string][] = [
  ['Who', 'Night-shift bakery staff: 8 people, aged 25 to 55'],
  ['Situation', 'Standing, moving, hands busy, in a loud, dusty, hot hall'],
  ['They try to', 'Bake, pack and load on time'],
  ['They need', 'To see the next step at a distance and trust that changes reached everyone'],
  ['What hurts', 'Missed changes, idle ovens, asking over the noise'],
];

const STEP_TITLES = ['12 observation notes', '5 patterns', '4 insights', 'The audience profile'];
const CHAIN = ['12 notes', '5 patterns', '4 insights', '1 profile'];
const LAST = 3;

const btnPrimary =
  'bg-[#E5391C] hover:bg-[#C92B10] text-white rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary =
  'bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-3 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

// geometry (stage inner box is about 1790 x 503)
const W1 = 286, H1 = 198, G = 14, TOP1 = 92;
const W2 = 346, H2 = 84, TOP2 = 90;
const AXIS_X0 = 20, AXIS_W = 1750, T0 = 90, T1 = 360; // minutes after 01:00 for 01:30 .. 06:00

export const BakeryStudyDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [sub, setSub] = useState(0); // step 2: insights shown

  const next = () => {
    if (step === 2 && sub < INSIGHTS.length) {
      setSub(sub + 1);
      return;
    }
    if (step < LAST) setStep(step + 1);
  };
  const back = () => {
    if (step === 2 && sub > 0) {
      setSub(sub - 1);
      return;
    }
    if (step > 0) {
      const s = step - 1;
      setStep(s);
      if (s === 2) setSub(INSIGHTS.length);
    }
  };
  const reset = () => {
    setStep(0);
    setSub(0);
  };

  // slot index of each note inside its pattern column
  const slotOf = (note: NoteT) => NOTES.filter((x) => x.group === note.group && x.n < note.n).length;
  const axisX = (mins: number) => AXIS_X0 + ((mins - T0) / (T1 - T0)) * AXIS_W;

  const grouped = step === 1;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4">
      <style>{`@keyframes bsPop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.bs-pop{animation:bsPop .45s ease-out both}
@keyframes bsDot{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:none}}
.bs-dot{animation:bsDot .4s ease-out both}`}</style>

      <div className="flex items-center gap-4 h-[44px] shrink-0">
        <span className="text-[28px] font-bold text-[#E5391C]">Step {step + 1} of 4</span>
        <span className="text-[28px] font-bold text-[#222222]">{STEP_TITLES[step]}</span>
        <div className="ml-auto flex items-center gap-2 text-[24px] font-bold">
          {CHAIN.map((c, i) => (
            <React.Fragment key={c}>
              <span className={`rounded-lg px-3 py-0.5 ${i === step ? 'bg-[#E5391C] text-white' : i < step ? 'bg-[#E5391C]/15 text-[#E5391C]' : 'bg-stone-200 text-[#6E6D70]'}`}>{c}</span>
              {i < CHAIN.length - 1 && <ChevronRight className="w-6 h-6 text-[#6E6D70]" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative flex-1 min-h-0 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl p-4 overflow-hidden">
        {step <= 1 && (
          <div className="relative w-full h-full">
            {/* night timeline axis (step 1) */}
            <div className="absolute left-0 top-0 w-full transition-opacity duration-700" style={{ height: 90, opacity: grouped ? 0 : 1 }}>
              <div className="absolute h-[4px] bg-[#D8D1C5] rounded" style={{ left: AXIS_X0, width: AXIS_W, top: 30 }} />
              {[120, 180, 240, 300, 360].map((m) => (
                <div key={m} className="absolute text-[22px] text-[#6E6D70] font-bold -translate-x-1/2" style={{ left: axisX(m), top: 54 }}>
                  {String(Math.floor(m / 60)).padStart(2, '0')}:00
                </div>
              ))}
              {NOTES.filter((x) => x.mins).map((x, i) => (
                <div
                  key={x.n}
                  className="bs-dot absolute w-[36px] h-[36px] -ml-[18px] rounded-full bg-amber-400 border-2 border-amber-600 text-[#222222] text-[22px] font-bold flex items-center justify-center"
                  style={{ left: axisX(x.mins as number), top: 14, animationDelay: `${i * 0.12}s` }}
                >
                  {x.n}
                </div>
              ))}
            </div>

            {/* pattern headers (step 2) */}
            {PATTERNS.map((p, g) => (
              <div
                key={p}
                className="absolute rounded-xl border-2 border-[#E5391C] bg-white px-3 flex items-center text-[24px] font-bold text-[#222222] leading-tight transition-opacity duration-700"
                style={{ left: g * (W2 + G), top: 0, width: W2, height: 76, opacity: grouped ? 1 : 0, transitionDelay: grouped ? '.6s' : '0s' }}
              >
                <span className="text-[#E5391C] mr-2">{String.fromCharCode(97 + g)}</span>
                {p}
              </div>
            ))}

            {NOTES.map((x, i) => {
              const quote = !x.time;
              const left = grouped ? x.group * (W2 + G) : (i % 6) * (W1 + G);
              const top = grouped ? TOP2 + slotOf(x) * (H2 + 8) : TOP1 + Math.floor(i / 6) * (H1 + 8);
              return (
                <div
                  key={x.n}
                  className={`absolute rounded-xl border shadow-sm overflow-hidden ${quote ? 'bg-blue-50 border-blue-300' : 'bg-[#FFF8DC] border-amber-300'}`}
                  style={{
                    left,
                    top,
                    width: grouped ? W2 : W1,
                    height: grouped ? H2 : H1,
                    transition: 'left .9s cubic-bezier(.4,.1,.2,1), top .9s cubic-bezier(.4,.1,.2,1), width .9s, height .9s',
                    transitionDelay: grouped ? `${(i % 6) * 0.07 + (i > 5 ? 0.1 : 0)}s` : '0s',
                  }}
                >
                  {grouped ? (
                    <div className="h-full flex items-center gap-3 px-3">
                      <span className={`w-[36px] h-[36px] shrink-0 rounded-full text-[22px] font-bold flex items-center justify-center ${quote ? 'bg-blue-600 text-white' : 'bg-amber-400 text-[#222222]'}`}>{x.n}</span>
                      <span className="text-[22px] leading-tight text-[#222222]">{x.short}</span>
                    </div>
                  ) : (
                    <div className="px-4 py-2">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`w-[36px] h-[36px] rounded-full text-[22px] font-bold flex items-center justify-center ${quote ? 'bg-blue-600 text-white' : 'bg-amber-400 text-[#222222]'}`}>{x.n}</span>
                        <span className="text-[22px] font-bold text-[#6E6D70]">{quote ? 'Quote' : x.time}</span>
                      </div>
                      <div className="text-[22px] leading-[1.22] text-[#222222]">{x.full}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="h-full flex flex-col justify-center gap-3">
            {INSIGHTS.map((ins, i) => {
              const shown = sub > i;
              return shown ? (
                <div key={i} className="bs-pop flex items-center gap-5 bg-white border-2 border-[#E5391C] rounded-2xl px-6 py-3 min-h-[100px]">
                  <span className="w-[48px] h-[48px] shrink-0 rounded-full bg-[#E5391C] text-white text-[28px] font-bold flex items-center justify-center">{i + 1}</span>
                  <div className="flex-1 text-[28px] leading-snug text-[#222222] font-semibold">{ins.text}</div>
                  <div className="w-[190px] shrink-0 text-[22px] text-[#6E6D70] leading-tight">Built from {ins.from}</div>
                </div>
              ) : (
                <div key={i} className="flex items-center gap-5 border-2 border-dashed border-[#D8D1C5] rounded-2xl px-6 min-h-[100px]">
                  <span className="w-[48px] h-[48px] shrink-0 rounded-full bg-stone-200 text-[#6E6D70] text-[28px] font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-[26px] text-[#6E6D70]">{i === sub ? 'Next insight: from a pattern to a sentence' : 'empty'}</span>
                </div>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="h-full flex flex-col gap-3">
            <div className="flex-1 bg-white border-2 border-[#E5391C] rounded-2xl p-5 flex flex-col gap-2 min-h-0">
              <div className="text-[30px] font-bold text-[#E5391C]">Audience profile: the night shift (a group, not one person)</div>
              {PROFILE.map(([k, v], i) => (
                <div key={k} className="bs-pop flex items-center gap-5 border-t border-[#E8E2D9] pt-2 flex-1" style={{ animationDelay: `${0.2 + i * 0.5}s` }}>
                  <span className="w-[190px] shrink-0 text-[28px] font-bold text-[#222222]">{k}</span>
                  <span className="text-[28px] text-[#222222] leading-snug">{v}</span>
                </div>
              ))}
            </div>
            <div className="bs-pop shrink-0 flex items-center justify-center gap-4 text-[28px] font-bold text-[#222222]" style={{ animationDelay: '3s' }}>
              {CHAIN.map((c, i) => (
                <React.Fragment key={c}>
                  <span className="rounded-lg bg-[#E5391C]/15 text-[#E5391C] px-3 py-0.5">{c}</span>
                  {i < CHAIN.length - 1 && <ArrowRight className="w-7 h-7 text-[#6E6D70]" />}
                </React.Fragment>
              ))}
              <span className="font-normal text-[#525254] ml-2">Each step is built from the one before.</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 mr-auto" aria-label="Steps">
          {STEP_TITLES.map((t, i) => (
            <span
              key={t}
              className={`rounded-full transition-all ${i === step ? 'w-[44px] h-[18px] bg-[#E5391C]' : i < step ? 'w-[18px] h-[18px] bg-[#E5391C]/50' : 'w-[18px] h-[18px] bg-[#D8D1C5]'}`}
            />
          ))}
        </div>
        <button onClick={reset} className={btnSecondary}>
          <RotateCcw className="w-6 h-6" /> Reset
        </button>
        <button onClick={back} disabled={step === 0} className={btnSecondary}>
          <ArrowLeft className="w-6 h-6" /> Back
        </button>
        <button onClick={next} disabled={step === LAST} className={`${btnPrimary} min-w-[200px] justify-center`}>
          Next <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
