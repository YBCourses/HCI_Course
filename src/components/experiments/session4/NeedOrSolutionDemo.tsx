import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowDown, CircleHelp, Eye, HelpCircle, RotateCcw, SkipForward, Target, Wrench } from 'lucide-react';

/*
 * NeedOrSolutionDemo (Session 4, slide 40).
 * Eight sentences from the Fresh Batch case. The lecturer reveals Need or Solution; for each solution,
 * "Ask why" plays a small chain: solution -> why? -> the need underneath -> other ways to meet it.
 * AHA: ask "why" to find the need under a solution. One need opens many solutions; one solution hides a need
 * (and often a catch in this hall).
 */

interface Item {
  text: string;
  kind: 'need' | 'solution';
  reason?: string; // for needs
  why?: string; // for solutions
  catchLine?: string;
  need?: string;
  others?: string[];
}

const ITEMS: Item[] = [
  {
    text: 'We need a big screen.',
    kind: 'solution',
    why: 'So Salma can read the next batch from where she stands, 2 to 4 metres from the board (note 2).',
    need: 'Night bakers can see the next batch from 3 metres.',
    others: ['a big screen', 'a wall projection', 'a big light per oven'],
  },
  {
    text: 'Salma must see the next batch from 3 metres.',
    kind: 'need',
    reason: 'It says who must do what, and from how far. It says nothing about what to build.',
  },
  {
    text: 'A mobile app.',
    kind: 'solution',
    why: 'So people hear about a change. Today a note in a corner is missed (notes 3, 4).',
    catchLine: 'Catch: hands are never clean (note 12) and the network is weak near the ovens.',
    need: 'Changes reach everyone within a minute.',
    others: ['a shared plan everyone sees', 'a light signal', 'a person who walks the change round'],
  },
  {
    text: 'Changes reach everyone within a minute.',
    kind: 'need',
    reason: 'It names the result users need (everyone, one minute). Many solutions could deliver it.',
  },
  {
    text: 'Voice commands.',
    kind: 'solution',
    why: 'So nobody has to touch anything: “My hands are never clean” (note 12).',
    catchLine: 'Catch: in a hall of about 80 dB, a voice may not be heard.',
    need: 'Key information can be used with floury or gloved hands, without touching.',
    others: ['nothing to touch at all', 'a foot switch', 'a big wipe-clean button'],
  },
  {
    text: 'Packers know the shop order.',
    kind: 'need',
    reason: 'It says who must know what. How they learn it stays open.',
  },
  {
    text: 'A touchscreen.',
    kind: 'solution',
    why: 'So Hassan can change the plan in one place. Today he writes it on the board, then shouts.',
    catchLine: 'Catch: floury hands and hygiene rules make touch hard.',
    need: 'The plan is written once and appears everywhere.',
    others: ['enter it once in the office', 'a keyboard', 'a keypad by the board'],
  },
  {
    text: 'Alerts without sound.',
    kind: 'need',
    reason: 'It says what must hold in this hall (no sound) and leaves the way open: a light, a visible change.',
  },
];

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const NeedOrSolutionDemo: React.FC = () => {
  const [cur, setCur] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(() => ITEMS.map(() => false));
  const [steps, setSteps] = useState<number[]>(() => ITEMS.map(() => 0)); // 0 = not asked, 1..4 = chain progress

  const curStep = cur === null ? 0 : steps[cur];
  useEffect(() => {
    if (cur === null || curStep < 1 || curStep >= 4) return;
    const id = window.setTimeout(() => {
      setSteps((s) => s.map((v, i) => (i === cur ? v + 1 : v)));
    }, 900);
    return () => window.clearTimeout(id);
  }, [cur, curStep]);

  const item = cur === null ? null : ITEMS[cur];
  const isRev = cur !== null && revealed[cur];

  const reveal = () => {
    if (cur === null) return;
    setRevealed((r) => r.map((v, i) => (i === cur ? true : v)));
  };
  const ask = () => {
    if (cur === null) return;
    setSteps((s) => s.map((v, i) => (i === cur ? 1 : v)));
  };
  const next = () => setCur(cur === null ? 0 : Math.min(ITEMS.length - 1, cur + 1));
  const reset = () => {
    setCur(null);
    setRevealed(ITEMS.map(() => false));
    setSteps(ITEMS.map(() => 0));
  };

  const nNeeds = ITEMS.filter((it, i) => revealed[i] && it.kind === 'need').length;
  const nSols = ITEMS.filter((it, i) => revealed[i] && it.kind === 'solution').length;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      <style>{`@keyframes ns-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Controls */}
      <div className="flex-shrink-0 h-[64px] flex items-center gap-3">
        <button onClick={next} disabled={cur !== null && (cur >= ITEMS.length - 1 || !revealed[cur])} className={PRIMARY}>
          <SkipForward className="w-6 h-6" />
          {cur === null ? 'First statement' : 'Next statement'}
        </button>
        <button onClick={reveal} disabled={cur === null || isRev} className={PRIMARY}>
          <Eye className="w-6 h-6" />
          Reveal: need or solution?
        </button>
        <button onClick={ask} disabled={!item || !isRev || item.kind !== 'solution' || curStep > 0} className={PRIMARY}>
          <HelpCircle className="w-6 h-6" />
          Ask why
        </button>
        <button onClick={reset} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Reset
        </button>
        <div className="flex-1 min-w-0 text-right text-[24px] text-[#525254] whitespace-nowrap">
          Needs {nNeeds} · Solutions {nSols}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-3">
        {/* List */}
        <div className="w-[860px] flex-shrink-0 min-h-0 flex flex-col gap-[6px]">
          {ITEMS.map((it, i) => {
            const rev = revealed[i];
            const active = cur === i;
            return (
              <button
                key={it.text}
                onClick={() => setCur(i)}
                className={`flex-1 min-h-0 rounded-xl border-2 px-3 flex items-center gap-3 text-left transition-colors ${
                  active ? 'border-[#E5391C] bg-white' : 'border-[#E8E2D9] bg-white hover:bg-stone-50'
                }`}
              >
                <span className="w-9 h-9 rounded-full bg-stone-100 text-[#525254] flex items-center justify-center text-[24px] font-bold flex-shrink-0">{i + 1}</span>
                <span className="flex-1 min-w-0 text-[26px] font-semibold text-[#222222] truncate">{it.text}</span>
                {rev && (
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 text-[22px] font-bold leading-[34px] flex-shrink-0 ${
                      it.kind === 'need' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {it.kind === 'need' ? <Target className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                    {it.kind === 'need' ? 'Need' : 'Solution'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Focus */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-3 overflow-hidden">
          {!item ? (
            <div className="flex-1 rounded-2xl border border-[#E8E2D9] bg-white p-6 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3 text-[32px] font-bold text-[#222222]">
                <CircleHelp className="w-9 h-9 text-[#E5391C]" />
                Think in silence
              </div>
              <div className="text-[28px] leading-[1.25] text-[#525254]">
                For each sentence, decide privately: is it a need or a solution?
              </div>
              <div className="flex flex-col gap-2 text-[26px] text-[#222222]">
                <div className="flex items-center gap-2">
                  <Target className="w-7 h-7 text-emerald-700" />
                  <b>Need:</b> what the user must be able to do.
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-7 h-7 text-amber-700" />
                  <b>Solution:</b> a thing we could build.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`flex-shrink-0 rounded-2xl border-2 p-4 flex items-center gap-4 ${
                  !isRev ? 'border-[#E8E2D9] bg-white' : item.kind === 'need' ? 'border-emerald-500 bg-emerald-50' : 'border-amber-500 bg-amber-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[34px] font-bold leading-[1.15] text-[#222222]">{'“'}{item.text}{'”'}</div>
                  {!isRev && <div className="text-[26px] text-[#525254] mt-1">Need or solution? Think in silence.</div>}
                </div>
                {isRev && (
                  <div
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[28px] font-bold text-white flex-shrink-0 ${
                      item.kind === 'need' ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                    style={{ animation: 'ns-in 0.4s both' }}
                  >
                    {item.kind === 'need' ? <Target className="w-7 h-7" /> : <Wrench className="w-7 h-7" />}
                    {item.kind === 'need' ? 'Need' : 'Solution'}
                  </div>
                )}
              </div>

              {isRev && item.kind === 'need' && (
                <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white p-5 flex flex-col justify-center gap-2" style={{ animation: 'ns-in 0.4s both' }}>
                  <div className="text-[30px] font-bold text-emerald-700">Why it is a need</div>
                  <div className="text-[28px] leading-[1.25] text-[#222222]">{item.reason}</div>
                </div>
              )}

              {isRev && item.kind === 'solution' && curStep === 0 && (
                <div className="flex-1 min-h-0 rounded-2xl border border-[#E8E2D9] bg-white p-5 flex flex-col justify-center gap-2" style={{ animation: 'ns-in 0.4s both' }}>
                  <div className="text-[30px] font-bold text-amber-700">It names a thing to build.</div>
                  <div className="text-[28px] leading-[1.25] text-[#222222]">What is the need underneath? Press Ask why.</div>
                </div>
              )}

              {isRev && item.kind === 'solution' && curStep >= 1 && (
                <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
                  <div className="flex-shrink-0 rounded-xl border border-[#E8E2D9] bg-white px-4 py-2" style={{ animation: 'ns-in 0.4s both' }}>
                    <div className="flex items-center gap-2 text-[26px] font-bold text-[#525254]">
                      <ArrowDown className="w-6 h-6 text-[#E5391C]" />
                      Why do we want it?
                    </div>
                    {curStep >= 2 && (
                      <div className="text-[26px] leading-[1.2] text-[#222222]" style={{ animation: 'ns-in 0.4s both' }}>
                        {item.why}
                        {item.catchLine && (
                          <span className="flex items-start gap-2 text-[24px] text-[#C92B10] mt-1">
                            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                            {item.catchLine}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {curStep >= 3 && (
                    <div className="flex-shrink-0 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-2" style={{ animation: 'ns-in 0.4s both' }}>
                      <div className="flex items-center gap-2 text-[26px] font-bold text-emerald-700">
                        <Target className="w-6 h-6" />
                        The need underneath, rewritten
                      </div>
                      <div className="text-[28px] font-bold leading-[1.2] text-[#222222]">{item.need}</div>
                    </div>
                  )}
                  {curStep >= 4 && (
                    <div className="flex-shrink-0 px-1" style={{ animation: 'ns-in 0.4s both' }}>
                      <div className="text-[24px] font-semibold text-[#525254] mb-1">Many solutions can meet it:</div>
                      <div className="flex flex-wrap gap-2">
                        {item.others!.map((o) => (
                          <span key={o} className="rounded-full bg-white border border-[#E8E2D9] text-[#222222] text-[24px] px-3.5 py-1">
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
