import React, { useEffect, useRef, useState } from 'react';
import {
  Accessibility,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  FileText,
  HelpCircle,
  Lightbulb,
  LayoutGrid,
  LogIn,
  LogOut,
  MousePointerClick,
  Palette,
  Play,
  Presentation,
  RotateCcw,
  SearchCheck,
  Smartphone,
  Sparkles,
  Users,
  Brain,
} from 'lucide-react';

/*
 * AHA: every stage's output is the next stage's input. The IN card of a stage is literally the OUT card
 * of the stage before it (the data below only stores OUT; IN is derived), so the chain is visible.
 * Case: Fresh Batch (see teacher/session4-case.md, "Process").
 */

interface Stage {
  name: string;
  session: string;
  icon: React.ComponentType<{ className?: string }>;
  out: string;
  artifact?: string; // finished stages: the Fresh Batch artifact
  question: string; // what the stage will answer (future stages)
}

const STAGES: Stage[] = [
  { name: 'Idea', session: '', icon: Lightbulb, out: 'One sentence: the idea', artifact: 'Fresh Batch Board: a shared board for the night team. Idea only: no screens, no technology chosen.', question: '' },
  { name: 'Humans', session: 'S2', icon: Brain, out: 'A baseline audit and the limits of people', artifact: 'The hall limits: 80 dB noise, people 2 to 4 m from the board, floury or gloved hands.', question: '' },
  { name: 'User', session: 'S3', icon: Users, out: 'A user study report and an audience profile', artifact: '12 observation notes, 5 patterns, 4 insights and a profile of the 8 night-shift staff.', question: '' },
  { name: 'Need', session: 'S4', icon: ClipboardList, out: 'Personas, journeys and prioritised requirements', artifact: 'Hassan and Salma, a journey whose lowest point is 03:30, and 12 requirements (R1 to R5 are Musts, about 1,300 euros in our case).', question: 'What must the system do for these people, and which needs come first?' },
  { name: 'Structure', session: 'S5', icon: LayoutGrid, out: 'Content structure and labels', question: 'What content does the board hold, how is it grouped, and what are the labels?' },
  { name: 'Interaction', session: 'S6', icon: MousePointerClick, out: 'Flows, states and feedback', question: 'What happens when Hassan acts: which flow, which states, which feedback?' },
  { name: 'UI', session: 'S7', icon: Palette, out: 'A visual system', question: 'What does it look like so it can be read from 3 metres?' },
  { name: 'Prototype', session: 'S8', icon: Smartphone, out: 'A prototype people can try', question: 'Can we make a version that people can try before we build it?' },
  { name: 'Evaluate', session: 'S9', icon: SearchCheck, out: 'Test results and the before/after comparison', question: 'Does it beat the whiteboard? Do the requirements pass their measures?' },
  { name: 'Inclusive', session: 'S10', icon: Accessibility, out: 'Fixes for access, fairness and safety', question: 'Who is left out, and is it fair and safe for everyone?' },
  { name: 'Emerging', session: 'S11', icon: Sparkles, out: 'A decision: use new technology or not', question: 'Could voice or sensors help in the hall, and should they?' },
  { name: 'Showcase', session: 'S12', icon: Presentation, out: 'The story: problem, evidence, solution, result', question: 'How do we tell the story so the owner says yes?' },
];

// Geometry of the winding path (two rows joined by a U-turn on the right).
const DX = 300;
const X0 = 150;
const Y1 = 50;
const Y2 = 170;
const R = (Y2 - Y1) / 2;
const TURN = Math.PI * R;
const TOTAL = 5 * DX + TURN + 5 * DX;
const PATH = `M ${X0} ${Y1} H ${X0 + 5 * DX} A ${R} ${R} 0 0 1 ${X0 + 5 * DX} ${Y2} H ${X0}`;
const nodeXY = (i: number) => (i <= 5 ? { x: X0 + i * DX, y: Y1 } : { x: X0 + (11 - i) * DX, y: Y2 });
const nodePos = (i: number) => (i <= 5 ? i * DX : 5 * DX + TURN + (i - 6) * DX);

// Structure mode: S4 and S5 outputs/artifacts as they stand after Session 5.
const STRUCT_OUT: Record<number, string> = {
  3: 'The Requirements Pack: personas, journeys and prioritised requirements',
  4: 'The Structure Pack: content inventory, groups, labels, tree and tree-test results',
};
const STRUCT_ARTIFACT: Record<number, string> = {
  3: 'Requirements Pack: 2 personas, a journey with its low point at 03:30, and 12 requirements (5 Musts, about 1,300 euros in our case).',
  4: 'An inventory of 19 things, 4 groups, labels in French and Arabic, and a tree. Tree test: 7 of 12 found a changed order.',
};

// Interaction mode: S4, S5 and S6 outputs/artifacts as they stand after Session 6.
const INTER_OUT: Record<number, string> = {
  3: 'The Requirements Pack: personas, journeys and prioritised requirements',
  4: 'The Structure Pack: content inventory, groups, labels, tree and tree-test results',
  5: 'The Interaction Pack: flows, a state table, feedback rules and an error plan',
};
const INTER_ARTIFACT: Record<number, string> = {
  3: 'Requirements Pack: 2 personas, a journey with its low point at 03:30, and 12 requirements (5 Musts, about 1,300 euros in our case).',
  4: 'Structure Pack: an inventory of 19 things, 4 groups (NOW, ORDERS, PACKING AND LOADING, NIGHT RECORD), labels in French and Arabic, and a tree-tested tree.',
  5: 'A flow "Handle a late change" (9 steps today, 4 proposed), 6 states of "I saw it", feedback rules and an error plan.',
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const ProcessMapDemo: React.FC<{ here: 'user' | 'need' | 'structure' | 'interaction' }> = ({ here }) => {
  const hereIdx = here === 'user' ? 2 : here === 'need' ? 3 : here === 'structure' ? 4 : 5;
  const struct = here === 'structure';
  const inter = here === 'interaction';
  const outOf = (i: number) => (struct && STRUCT_OUT[i]) || (inter && INTER_OUT[i]) || STAGES[i].out;
  const doneCount = hereIdx + 1;
  const [shown, setShown] = useState(doneCount);
  const [selected, setSelected] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => stop, []);

  const replay = () => {
    stop();
    setShown(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= doneCount) stop();
    }, 600);
  };
  const reset = () => {
    stop();
    setShown(doneCount);
    setSelected(null);
  };

  const gapIdx = here === 'user' ? 3 : -1;
  const lineLen = shown > 0 ? nodePos(Math.min(shown, doneCount) - 1) : 0;
  const sel = selected !== null ? STAGES[selected] : null;
  const status = (i: number) => (i < hereIdx ? 'done' : i === hereIdx ? 'here' : i === gapIdx ? 'gap' : i === hereIdx + 1 ? 'next' : 'later');
  const STATUS_LABEL: Record<string, string> = { done: 'Done', here: 'You are here', gap: 'Missing: the need', next: 'Next', later: 'Later' };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center gap-3">
        <button onClick={replay} className={PRIMARY}>
          <Play className="w-6 h-6" />
          Replay the journey
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1" />
        <div className="text-[28px] text-[#525254]">
          {here === 'user' ? 'After Session 3: ' : here === 'need' ? 'After Session 4: ' : struct ? 'After Session 5: ' : 'After Session 6: '}
          <b className="text-[#222222]">{doneCount} of 12 stages done</b>. Click any stage.
        </div>
      </div>

      {/* the winding path */}
      <div className="relative flex-shrink-0 w-full" style={{ height: 240 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1824 240" fill="none">
          <path d={PATH} stroke="#D9D3C8" strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
          <path
            d={PATH}
            stroke="#E5391C"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={TOTAL}
            strokeDashoffset={TOTAL - lineLen}
            style={{ transition: 'stroke-dashoffset 0.55s linear' }}
          />
        </svg>
        {STAGES.map((s, i) => {
          const { x, y } = nodeXY(i);
          const st = status(i);
          const lit = i < shown && i < doneCount;
          const isHere = i === hereIdx && shown >= doneCount;
          const Icon = s.icon;
          const isSel = selected === i;
          let cls = 'bg-white border-[#D9D3C8] text-[#6E6D70]';
          if (lit) cls = 'bg-[#E5391C] border-[#E5391C] text-white';
          else if (st === 'gap') cls = 'bg-[#FFF3EF] border-[#E5391C] border-dashed text-[#E5391C]';
          return (
            <button
              key={s.name}
              onClick={() => setSelected(i)}
              className="absolute flex flex-col items-center"
              style={{ left: x - 100, top: y - 32, width: 200 }}
              aria-label={s.name}
            >
              <span className="relative w-16 h-16">
                {isHere && <span className="absolute inset-0 rounded-full bg-[#E5391C] opacity-40 animate-ping" />}
                {st === 'gap' && shown >= doneCount && <span className="absolute -inset-2 rounded-full border-4 border-dashed border-[#E5391C] animate-pulse" />}
                <span
                  className={`relative w-16 h-16 rounded-full border-[3px] flex items-center justify-center transition-colors duration-500 ${cls}`}
                  style={isSel ? { boxShadow: '0 0 0 5px #222222' } : undefined}
                >
                  <Icon className="w-8 h-8" />
                </span>
              </span>
              <span className={`mt-1 text-[24px] leading-[28px] font-bold whitespace-nowrap ${lit || isHere ? 'text-[#222222]' : st === 'gap' ? 'text-[#E5391C]' : 'text-[#6E6D70]'}`}>
                {s.name} <span className="font-medium text-[22px] text-[#6E6D70]">{s.session}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* banner: the gap (bridge) or the pack (end) */}
      <div
        className={`flex-shrink-0 rounded-2xl border-2 px-6 py-3 flex items-center gap-4 text-[26px] leading-[1.25] ${
          here === 'user' ? 'border-[#E5391C] bg-[#FFF3EF]' : 'border-emerald-600 bg-emerald-50'
        }`}
        style={{ height: 88 }}
      >
        {here === 'user' ? (
          <>
            <AlertTriangle className="w-9 h-9 text-[#E5391C] flex-shrink-0" />
            <span>
              <b className="text-[#E5391C]">What is missing: the need.</b> We know the people and what the hall does to them. We still must say what the system has to do for them.
            </span>
          </>
        ) : inter ? (
          <>
            <ArrowRight className="w-9 h-9 text-emerald-700 flex-shrink-0" />
            <span>
              <b className="text-emerald-700">Out of Session 6:</b> the Interaction Pack goes to Session 7, where UI design gives it a look: type, space, colour and grids.
            </span>
          </>
        ) : struct ? (
          <>
            <ArrowRight className="w-9 h-9 text-emerald-700 flex-shrink-0" />
            <span>
              <b className="text-emerald-700">Out of Session 5:</b> the Structure Pack goes to Session 6, where Interaction design gives every path flows, states and feedback.
            </span>
          </>
        ) : (
          <>
            <ArrowRight className="w-9 h-9 text-emerald-700 flex-shrink-0" />
            <span>
              <b className="text-emerald-700">Requirements Pack:</b> 2 personas, a journey, 12 requirements. <b>Session 5 takes</b> the 5 Musts and the number-and-icon rule (R1 to R6) to decide what the board shows and how it is grouped.
            </span>
          </>
        )}
      </div>

      {/* detail */}
      <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] p-4 flex flex-col gap-3 overflow-hidden">
        {sel === null || selected === null ? (
          <div className="flex-1 flex items-center justify-center text-[28px] text-[#6E6D70] text-center">
            Click a stage to see what goes IN, what comes OUT, and what Fresh Batch has at that stage.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-[30px] font-bold text-[#222222]">
                {sel.name} {sel.session && <span className="text-[#6E6D70] font-medium">({sel.session})</span>}
              </div>
              <span
                className={`rounded-full px-4 py-1 text-[22px] font-bold ${
                  status(selected) === 'done' || status(selected) === 'here'
                    ? 'bg-[#E5391C] text-white'
                    : status(selected) === 'gap'
                      ? 'bg-[#FFF3EF] border border-[#E5391C] text-[#E5391C]'
                      : 'bg-white border border-[#E8E2D9] text-[#525254]'
                }`}
              >
                {STATUS_LABEL[status(selected)]}
              </span>
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white border border-[#E8E2D9] p-3 flex flex-col gap-1 min-h-0">
                <div className="flex items-center gap-2 text-[26px] font-bold text-blue-600">
                  <LogIn className="w-6 h-6" />
                  IN {selected > 0 && <span className="text-[22px] font-medium text-[#6E6D70]">from {STAGES[selected - 1].name}</span>}
                </div>
                <div className="text-[24px] leading-[1.25] text-[#222222]">{selected === 0 ? 'A problem seen in the real world' : outOf(selected - 1)}</div>
              </div>
              <div className="rounded-xl bg-white border border-[#E8E2D9] p-3 flex flex-col gap-1 min-h-0">
                <div className="flex items-center gap-2 text-[26px] font-bold text-emerald-600">
                  <LogOut className="w-6 h-6" />
                  OUT {selected < 11 && <span className="text-[22px] font-medium text-[#6E6D70]">goes to {STAGES[selected + 1].name}</span>}
                </div>
                <div className="text-[24px] leading-[1.25] text-[#222222]">{outOf(selected)}</div>
              </div>
              <div className="rounded-xl bg-white border-2 border-[#E5391C] p-3 flex flex-col gap-1 min-h-0">
                <div className="flex items-center gap-2 text-[26px] font-bold text-[#E5391C]">
                  {selected < doneCount ? <FileText className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                  {selected < doneCount ? 'Fresh Batch artifact' : 'The question it answers'}
                </div>
                <div className="text-[24px] leading-[1.25] text-[#222222]">{selected < doneCount ? (struct && STRUCT_ARTIFACT[selected]) || (inter && INTER_ARTIFACT[selected]) || sel.artifact || sel.question : sel.question}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
