import React from 'react';
import { ArrowRight, Flag, Pause, Play, RotateCcw, Sparkles, Target } from 'lucide-react';
import { MAIN_CLASS, SlideHeading, TakeawayBanner, rich, useCountdown } from '../../session2/primitives';
import type { Content } from '../../../data/session2Types';

/**
 * Session 3 layout "activity": the "mission board".
 * Accent title band, steps as big numbered cards (a row for 2-3 steps, a 2x2 grid for 4),
 * and a bottom strip with a circular countdown ring plus "Why we do this" / "You finish with".
 */
const R = 62;
const CIRC = 2 * Math.PI * R;

export const MissionLayout: React.FC<{ c: Extract<Content, { kind: 'activity' }> }> = ({ c }) => {
  const timer = useCountdown(c.timerSeconds);
  const fresh = timer.seconds === c.timerSeconds;
  const urgent = timer.running && timer.seconds <= 15;
  const done = timer.seconds === 0;
  const n = c.steps.length;
  const grid = n >= 4;
  const frac = c.timerSeconds > 0 ? timer.seconds / c.timerSeconds : 0;
  const textSize = n >= 4 ? 'text-[28px]' : n === 3 ? 'text-[30px]' : 'text-[32px]';
  const ringColor = urgent || done ? '#E5391C' : '#222222';

  return (
    <main className={MAIN_CLASS}>
      <style>{`
        @keyframes missionUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .mission-in { animation: missionUp 500ms ease-out both; }
      `}</style>
      <SlideHeading heading={c.heading} />

      <div className="flex-1 min-h-0 flex flex-col gap-5">
        {/* Title band */}
        <div className="mission-in flex-shrink-0 rounded-2xl bg-[#E5391C] text-white px-7 py-3 flex items-center justify-between gap-6 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -top-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="flex items-center gap-5 min-w-0 relative">
            <span className="flex items-center gap-2 text-[18px] font-mono uppercase tracking-wider font-bold bg-white/20 rounded-full px-4 py-1.5 whitespace-nowrap">
              <Flag className="w-5 h-5" />
              {c.label}
            </span>
            <h3 className="text-[42px] leading-[1.1] font-serif-display font-medium truncate">{c.title}</h3>
          </div>
          <span className="relative px-4 py-1.5 rounded-full text-[18px] font-mono font-bold bg-white text-[#E5391C] whitespace-nowrap">
            {c.chip}
          </span>
        </div>

        {/* Steps */}
        <div
          className={`flex-1 min-h-0 grid gap-x-12 gap-y-4 ${
            grid ? 'grid-cols-2 grid-rows-2' : n === 3 ? 'grid-cols-3 grid-rows-1' : 'grid-cols-2 grid-rows-1'
          }`}
        >
          {c.steps.map((st, i) => {
            const lastInRow = grid ? i % 2 === 1 : i === n - 1;
            return (
              <div
                key={i}
                className={`mission-in relative min-h-0 bg-white border-2 border-[#E8E2D9] rounded-2xl shadow-sm flex ${
                  grid ? 'flex-row items-center gap-5 px-5 py-3' : 'flex-col gap-4 p-6'
                }`}
                style={{ animationDelay: `${120 + i * 110}ms` }}
              >
                <span
                  className={`shrink-0 rounded-full bg-[#222222] text-white flex items-center justify-center font-mono font-bold ring-4 ring-[#FAD6CF] ${
                    grid ? 'w-14 h-14 text-[30px]' : 'w-16 h-16 text-[34px]'
                  }`}
                >
                  {i + 1}
                </span>
                <p className={`${textSize} leading-[1.3] text-[#2D2D2E] min-w-0`}>{rich(st.text)}</p>
                {!lastInRow && (
                  <span className="absolute top-1/2 -right-[39px] -translate-y-1/2 z-10 w-[30px] h-[30px] rounded-full bg-[#E5391C] text-white flex items-center justify-center shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom strip: ring + goal + output */}
        <div className="mission-in flex-shrink-0 flex items-stretch gap-5" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-5 bg-white border-2 border-[#E8E2D9] rounded-2xl shadow-sm pl-4 pr-6 py-3">
            <div className="relative w-[150px] h-[150px] shrink-0">
              <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                <circle cx="75" cy="75" r={R} fill="none" stroke="#E8E2D9" strokeWidth="12" />
                <circle
                  cx="75"
                  cy="75"
                  r={R}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - frac)}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 300ms' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-[34px] leading-none font-mono font-bold tracking-tight ${
                    urgent || done ? 'text-[#E5391C]' : 'text-[#222222]'
                  } ${urgent ? 'animate-pulse' : ''}`}
                >
                  {timer.fmt}
                </span>
                <span className="text-[14px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold pt-1">
                  {c.timerLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => timer.setRunning(!timer.running)}
                disabled={done}
                className={`h-14 px-6 rounded-xl text-[24px] font-bold flex items-center justify-center gap-3 shadow-sm cursor-pointer whitespace-nowrap text-white disabled:opacity-40 disabled:cursor-default transition-colors ${
                  timer.running ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#E5391C] hover:bg-[#C92B10]'
                }`}
              >
                {timer.running ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
                <span>{timer.running ? 'Pause' : fresh ? 'Start' : 'Resume'}</span>
              </button>
              <button
                onClick={timer.reset}
                className="h-14 px-6 rounded-xl text-[24px] font-bold bg-white hover:bg-stone-100 text-[#525254] border-2 border-[#E8E2D9] flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0 rounded-2xl bg-white border-2 border-[#E8E2D9] shadow-sm p-4 flex gap-4 items-start">
            <span className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E8E2D9] text-[#525254] flex items-center justify-center shrink-0">
              <Target className="w-7 h-7" />
            </span>
            <div className="min-w-0">
              <div className="text-[18px] font-mono uppercase tracking-wider text-[#6E6D70] font-bold">Why we do this</div>
              <p className="text-[26px] leading-[1.25] text-[#2D2D2E] pt-1">{rich(c.goal)}</p>
            </div>
          </div>

          <div className="flex-1 min-w-0 rounded-2xl bg-[#FDF5F3] border-2 border-[#FAD6CF] shadow-sm p-4 flex gap-4 items-start">
            <span className="w-12 h-12 rounded-xl bg-white border border-[#FAD6CF] text-[#E5391C] flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7" />
            </span>
            <div className="min-w-0">
              <div className="text-[18px] font-mono uppercase tracking-wider text-[#E5391C] font-bold">You finish with</div>
              <p className="text-[26px] leading-[1.25] text-[#2D2D2E] pt-1">{rich(c.output)}</p>
            </div>
          </div>
        </div>

        {c.takeaway && <TakeawayBanner>{c.takeaway}</TakeawayBanner>}
      </div>
    </main>
  );
};
