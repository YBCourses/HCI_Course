import React, { useEffect, useState } from 'react';
import { Eye, MessageSquare, MousePointer2, Pause, Play, RotateCcw, Sparkles, VolumeX } from 'lucide-react';

const TOTAL = 30;

type Kind = 'user' | 'pause' | 'speak' | 'quiet' | 'click';
interface Ev {
  t: number;
  kind: Kind;
  text: string;
}
type Key = [number, number, number]; // time, x%, y%

interface Script {
  id: 'A' | 'B';
  title: string;
  pause: [number, number];
  clickAt: number;
  cursor: Key[];
  events: Ev[];
  result: { head: string; body: string };
}

const OPEN: Ev[] = [
  { t: 0, kind: 'user', text: 'Imane opens the room list' },
  { t: 5, kind: 'user', text: 'She picks Room 2' },
];

const SCRIPTS: Script[] = [
  {
    id: 'A',
    title: 'Observer A: helps and talks',
    pause: [8, 12],
    clickAt: 15,
    cursor: [
      [0, 50, 6], [4, 40, 47], [5, 40, 47], [8, 45, 66], [10, 30, 73], [12, 50, 66], [14.5, 80, 86], [15, 80, 86],
    ],
    events: [
      ...OPEN,
      { t: 8, kind: 'pause', text: 'She pauses and looks around' },
      { t: 12, kind: 'speak', text: 'Observer: “Click the green Hold button.”' },
      { t: 15, kind: 'click', text: 'She clicks Hold' },
      { t: 16, kind: 'user', text: 'Room held. Done at 0:16' },
    ],
    result: {
      head: 'A finished faster, but we learned nothing.',
      body: 'The observer gave the answer: “click the green Hold button”. We never saw what Imane would have done alone.',
    },
  },
  {
    id: 'B',
    title: 'Observer B: stays silent',
    pause: [8, 16],
    clickAt: 19,
    cursor: [
      [0, 50, 6], [4, 40, 47], [5, 40, 47], [8, 45, 66], [10.5, 25, 75], [13, 55, 30], [15.5, 40, 68], [18.5, 80, 86], [19, 80, 86],
      [23, 70, 60], [26, 60, 50],
    ],
    events: [
      ...OPEN,
      { t: 8, kind: 'pause', text: 'She pauses and looks around' },
      { t: 11, kind: 'quiet', text: 'Observer stays quiet' },
      { t: 14, kind: 'quiet', text: 'Observer stays quiet' },
      { t: 16, kind: 'user', text: 'She sees the Hold button (8 s)' },
      { t: 19, kind: 'click', text: 'She clicks Hold' },
      { t: 23, kind: 'user', text: 'She leans back: “I think I’m done.”' },
    ],
    result: {
      head: 'B took longer, and we discovered two things.',
      body: 'Imane did not see the Hold button for 8 seconds. After clicking it, she thought she was done.',
    },
  },
];

const fmt = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`;

const cursorAt = (keys: Key[], t: number) => {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] };
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, x0, y0] = keys[i - 1];
      const [t1, x1, y1] = keys[i];
      const k = (t - t0) / (t1 - t0);
      return { x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last[1], y: last[2] };
};

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 min-h-[56px]';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

export const ObserverCompareDemo: React.FC = () => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const ended = t >= TOTAL;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setT((v) => {
        const n = Math.min(TOTAL, v + 0.1);
        return n;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (ended && playing) setPlaying(false);
  }, [ended, playing]);

  const restart = () => {
    setT(0);
    setPlaying(false);
    setRevealed(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Controls */}
      <div className="flex-shrink-0 h-[64px] flex items-center gap-4">
        <button
          onClick={() => {
            if (ended) {
              setT(0);
              setRevealed(false);
              setPlaying(true);
            } else {
              setPlaying((p) => !p);
            }
          }}
          className={`${PRIMARY} w-[180px]`}
        >
          {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {playing ? 'Pause' : ended ? 'Replay' : t > 0 ? 'Resume' : 'Play'}
        </button>
        <button onClick={restart} className={SECONDARY}>
          <RotateCcw className="w-6 h-6" />
          Restart
        </button>
        <div className="text-[24px] font-mono text-[#525254] whitespace-nowrap w-[170px]">
          {fmt(t)} / {fmt(TOTAL)}
        </div>
        <div className="flex-1 min-w-0 text-[24px] text-[#525254] truncate">Same user, same task: Imane tries to hold a study room.</div>
        <button onClick={() => setRevealed((r) => !r)} disabled={!ended} className={revealed ? SECONDARY : PRIMARY}>
          <Sparkles className="w-6 h-6" />
          {revealed ? 'Back to the recordings' : 'What we learned'}
        </button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
        {SCRIPTS.map((s) => (
          <Panel key={s.id} s={s} t={t} revealed={revealed} />
        ))}
      </div>
    </div>
  );
};

const KIND_COLOR: Record<Kind, string> = {
  user: 'text-[#222222]',
  pause: 'text-amber-700',
  speak: 'text-blue-700',
  quiet: 'text-[#6E6D70]',
  click: 'text-emerald-700',
};

const Panel: React.FC<{ s: Script; t: number; revealed: boolean }> = ({ s, t, revealed }) => {
  const isA = s.id === 'A';
  const visible = s.events.filter((e) => e.t <= t);
  const speak = s.events.find((e) => e.kind === 'speak' && t >= e.t && t < e.t + 3.5);
  const quiet = s.events.find((e) => e.kind === 'quiet' && t >= e.t && t < e.t + 2.5);
  return (
    <div className="min-h-0 bg-white border border-[#E8E2D9] rounded-2xl p-3.5 flex flex-col gap-2 overflow-hidden">
      <div className={`text-[30px] font-bold leading-none ${isA ? 'text-blue-700' : 'text-emerald-700'}`}>{s.title}</div>

      <div className="flex-1 min-h-0 flex gap-4">
        <MiniScreen s={s} t={t} />

        <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2">
          {revealed ? (
            <div className={`flex-1 rounded-xl border-2 p-4 flex flex-col justify-center gap-3 ${isA ? 'border-blue-300 bg-blue-50' : 'border-emerald-400 bg-emerald-50'}`}>
              <div className="text-[30px] font-bold leading-[1.2] text-[#222222]">{s.result.head}</div>
              <div className="text-[26px] leading-[1.3] text-[#222222]">{s.result.body}</div>
            </div>
          ) : (
            <>
              {/* Observer */}
              <div className="flex-shrink-0 h-[112px] rounded-xl bg-[#FAF9F6] border border-[#E8E2D9] px-3 flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white border border-[#E8E2D9] flex items-center justify-center flex-shrink-0 text-[#525254]">
                  <Eye className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  {speak ? (
                    <div className="rounded-xl bg-blue-600 text-white text-[24px] leading-[1.2] font-semibold px-3 py-2">
                      {'“'}Click the green Hold button.{'”'}
                    </div>
                  ) : quiet ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-stone-200 text-[#525254] text-[24px] font-semibold px-4 py-1.5">
                      <VolumeX className="w-6 h-6" />
                      quiet
                    </div>
                  ) : (
                    <div className="text-[24px] text-[#6E6D70]">Observer watching</div>
                  )}
                </div>
              </div>
              {/* Log */}
              <div className="flex-1 min-h-0 flex flex-col justify-end gap-1 overflow-hidden">
                {visible.map((e) => (
                  <div key={e.t + e.kind} className={`flex gap-2 text-[24px] leading-[1.15] ${KIND_COLOR[e.kind]}`}>
                    <span className="font-mono text-[#6E6D70] flex-shrink-0">{fmt(e.t)}</span>
                    <span className="min-w-0">{e.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Timeline s={s} t={t} />
    </div>
  );
};

const MiniScreen: React.FC<{ s: Script; t: number }> = ({ s, t }) => {
  const c = cursorAt(s.cursor, t);
  const picked = t >= 5;
  const held = t >= s.clickAt;
  const ROWS = ['Room 1', 'Room 2', 'Room 3'];
  return (
    <div className="relative w-[400px] flex-shrink-0 rounded-xl bg-[#FAF9F6] border-2 border-[#E8E2D9] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[11%] bg-stone-300" />
      <div className="absolute left-[6%] top-[3.5%] h-[4%] w-[30%] rounded bg-white/80" />
      {ROWS.map((r, i) => {
        const sel = picked && i === 1;
        return (
          <div
            key={r}
            className={`absolute left-[6%] w-[88%] h-[14%] rounded-lg flex items-center px-4 text-[22px] font-semibold ${
              sel ? 'bg-white border-[3px] border-[#E5391C] text-[#222222]' : 'bg-white border border-[#E8E2D9] text-[#525254]'
            }`}
            style={{ top: `${20 + i * 18}%` }}
          >
            {r}
          </div>
        );
      })}
      <div
        className={`absolute right-[6%] top-[78%] h-[14%] w-[34%] rounded-lg flex items-center justify-center text-[22px] font-bold ${
          held ? 'bg-emerald-800 text-white' : 'bg-emerald-600 text-white'
        }`}
      >
        {held ? 'Held' : 'Hold'}
      </div>
      {held && (
        <div className="absolute left-[6%] top-[80%] text-[22px] font-semibold text-emerald-800">Hold started</div>
      )}
      <MousePointer2
        className="absolute w-9 h-9 text-[#222222] fill-white"
        style={{ left: `${c.x}%`, top: `${c.y}%`, transition: 'none' }}
      />
    </div>
  );
};

const pct = (v: number) => `${(v / TOTAL) * 100}%`;

const Timeline: React.FC<{ s: Script; t: number }> = ({ s, t }) => {
  const [p0, p1] = s.pause;
  const pauseEnd = Math.min(Math.max(t, p0), p1);
  const marks = s.events.filter((e) => (e.kind === 'speak' || e.kind === 'quiet') && e.t <= t);
  return (
    <div className="flex-shrink-0 px-3">
      <div className="relative h-[30px] bg-stone-100 rounded">
        {t > p0 && (
          <div
            className="absolute top-0 h-full bg-amber-200 border border-amber-400 rounded overflow-hidden text-[22px] leading-[28px] px-1.5 text-amber-900 whitespace-nowrap"
            style={{ left: pct(p0), width: pct(pauseEnd - p0) }}
          >
            pause {Math.round(p1 - p0)} s
          </div>
        )}
        <div className="absolute top-[-3px] h-[36px] w-[3px] bg-[#E5391C]" style={{ left: `calc(${pct(t)} - ${(t / TOTAL) * 3}px)` }} />
      </div>
      <div className="relative h-[34px] mt-1">
        {marks.map((m) => (
          <div
            key={m.t}
            className="absolute -translate-x-1/2 flex items-center gap-1"
            style={{ left: pct(m.t) }}
          >
            {m.kind === 'speak' ? (
              <span className="flex items-center gap-1 rounded-full bg-blue-600 text-white text-[22px] font-semibold px-2.5 leading-[30px]">
                <MessageSquare className="w-5 h-5" />
                speaks
              </span>
            ) : (
              <span
                title="quiet"
                className="flex items-center justify-center rounded-full bg-stone-200 border border-stone-400 text-[#525254] w-[34px] h-[30px]"
              >
                <VolumeX className="w-5 h-5" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="relative h-[28px] text-[22px] text-[#6E6D70] font-mono">
        <span className="absolute left-0">0 s</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(10) }}>10 s</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(20) }}>20 s</span>
        <span className="absolute right-0">30 s</span>
      </div>
    </div>
  );
};
