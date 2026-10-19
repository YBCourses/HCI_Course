import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { PROJECT_COMPONENTS } from '../../projects/registry';

/**
 * Scripted replay of Imane doing the Project 11 task on the REAL Study Room Booking interface.
 * A fake cursor moves to real elements and calls element.click() / sets input values, so the interface really reacts.
 * Only things the interface really does are scripted: Hold with a badly typed date shows "Invalid input.",
 * Hold with valid data adds a held item and shows nothing else on the Book screen.
 * mode "watch": plain replay. mode "timeline": same replay + a timeline of pauses, backtracks and wrong clicks.
 */

const DW = 1280;
const DH = 800;
const END = 40500;
const STRIP_H = 100;
const GAP = 10;

const Interface = memo(PROJECT_COMPONENTS[11]);

type XY = { x: number; y: number };

/* ----- finders (real DOM) ----- */
const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
const findBtn = (root: HTMLElement, text: string) =>
  Array.from(root.querySelectorAll('button')).find((b) => norm(b.textContent) === text) as HTMLElement | undefined;
const findInput = (root: HTMLElement, label: string) => {
  const l = Array.from(root.querySelectorAll('label')).find((x) => norm(x.firstElementChild?.textContent) === label);
  return l?.querySelector('input') ?? undefined;
};
const findLeaf = (root: HTMLElement, text: string) =>
  Array.from(root.querySelectorAll('div')).find((d) => d.children.length === 0 && norm(d.textContent) === text) as HTMLElement | undefined;

/* ----- cursor targets ----- */
type Tgt =
  | { k: 'xy'; x: number; y: number }
  | { k: 'btn'; text: string; fx: number; fy: number; dx?: number; dy?: number }
  | { k: 'input'; label: string; fx: number; fy: number; dx?: number }
  | { k: 'leaf'; text: string; fx: number; fy: number };

const xy = (x: number, y: number): Tgt => ({ k: 'xy', x, y });
const btn = (text: string, fx: number, fy: number, dx = 0, dy = 0): Tgt => ({ k: 'btn', text, fx, fy, dx, dy });
const inp = (label: string, fx: number, fy: number, dx = 0): Tgt => ({ k: 'input', label, fx, fy, dx });

const T_ROOMS = btn('Rooms', 190, 26);
const T_BOOK = btn('Book', 105, 26);
const T_HOLD = btn('Hold', 105, 582);
const T_ERR = btn('Hold', 140, 626, 30, 46);
const F_ROOM = inp('Room', 260, 222, -100);
const F_DATE = inp('Date', 260, 284, -100);
const F_START = inp('Start', 260, 346, -100);
const F_END = inp('End', 260, 408, -100);
const F_PEOPLE = inp('People', 260, 470, -100);
const T_BANNER: Tgt = { k: 'leaf', text: 'Learn more', fx: 1150, fy: 84 };

interface Wp {
  at: number;
  t: Tgt;
}
const WP: Wp[] = [];
const P = (s: number, t: Tgt) => WP.push({ at: s * 1000, t });
const visit = (arrive: number, clickAt: number, t: Tgt) => {
  P(arrive, t);
  P(clickAt + 0.25, t);
};
const jitter = (from: number, to: number, base: Tgt, step = 0.9, amp = 5) => {
  let i = 0;
  for (let s = from; s <= to; s += step) {
    const d = i % 2 === 0 ? amp : -amp;
    P(s, base.k === 'xy' ? xy(base.x + d, base.y - d) : { ...base, ...(base.k === 'btn' ? { dx: (base.dx ?? 0) + d, dy: (base.dy ?? 0) - d } : {}) });
    i++;
  }
};

P(0, xy(1340, 430));
P(1.0, xy(800, 210));
P(1.8, xy(830, 330));
P(2.6, xy(790, 470));
P(3.4, xy(850, 600));
P(4.3, xy(780, 300));
visit(5.2, 5.6, T_ROOMS);
P(6.3, xy(380, 200));
P(7.1, xy(330, 330));
P(7.9, xy(350, 450));
P(8.7, xy(320, 540));
visit(9.4, 9.8, T_BOOK);
visit(10.6, 11.0, F_ROOM);
visit(12.3, 12.8, F_DATE);
visit(14.3, 14.7, F_START);
visit(15.6, 16.0, F_END);
visit(16.9, 17.3, F_PEOPLE);
visit(18.0, 19.0, T_BANNER);
visit(20.2, 21.0, T_HOLD);
P(21.6, T_ERR);
jitter(22.5, 26.1, T_ERR, 0.9, 5);
visit(26.8, 27.2, F_DATE);
P(29.0, T_HOLD);
jitter(30.0, 34.0, T_HOLD, 1.0, 4);
P(35.0, T_HOLD);
P(35.8, btn('Hold', 105, 582, 4, -3));
P(37.0, btn('Hold', 105, 582, -3, 2));
P(38.4, T_HOLD);
P(40.2, xy(1340, 500));
P(END / 1000, xy(1340, 500));

/* ----- scripted actions on the real interface ----- */
type Target = { k: 'btn' | 'leaf' | 'input'; text: string };
interface Ev {
  at: number;
  kind: 'click' | 'type' | 'read';
  target?: Target;
  label?: string;
  value?: (c: Ctx) => string;
}
interface Ctx {
  room: string;
}

const EVENTS: Ev[] = [];
const click = (s: number, target: Target) => EVENTS.push({ at: s * 1000, kind: 'click', target });
const typeText = (s: number, label: string, get: (c: Ctx) => string, len: number) => {
  for (let i = 1; i <= len; i++) EVENTS.push({ at: s * 1000 + i * 90, kind: 'type', label, value: (c) => get(c).slice(0, i) });
};

click(5.6, { k: 'btn', text: 'Rooms' });
EVENTS.push({ at: 6000, kind: 'read' });
click(9.8, { k: 'btn', text: 'Book' });
click(11.0, { k: 'input', text: 'Room' });
typeText(11.1, 'Room', (c) => c.room, 9);
click(12.8, { k: 'input', text: 'Date' });
typeText(13.0, 'Date', () => '13/10/2026', 10);
click(14.7, { k: 'input', text: 'Start' });
typeText(14.9, 'Start', () => '14:00', 5);
click(16.0, { k: 'input', text: 'End' });
typeText(16.2, 'End', () => '16:00', 5);
click(17.3, { k: 'input', text: 'People' });
typeText(17.5, 'People', () => '4', 1);
click(19.0, { k: 'leaf', text: 'Learn more' });
click(21.0, { k: 'btn', text: 'Hold' });
click(27.2, { k: 'input', text: 'Date' });
EVENTS.push({ at: 27300, kind: 'type', label: 'Date', value: () => '' });
typeText(27.5, 'Date', () => '2026-10-13', 10);
click(35.0, { k: 'btn', text: 'Hold' });
EVENTS.sort((a, b) => a.at - b.at);

const RIPPLES = EVENTS.filter((e) => e.kind === 'click').map((e) => e.at);

/* ----- timeline markers: one factual sentence each, no interpretation ----- */
type MType = 'dwell' | 'back' | 'wrong';
interface Marker {
  at: number;
  dur?: number;
  type: MType;
  text: string;
}
const MARKERS: Marker[] = [
  { at: 1.0, dur: 4.2, type: 'dwell', text: 'The cursor moves over the room list for 4 seconds before any click.' },
  { at: 6.3, dur: 3.1, type: 'dwell', text: 'The cursor moves down the Rooms table for 3 seconds.' },
  { at: 9.8, type: 'back', text: 'She clicks the Book tab again, after the Rooms tab.' },
  { at: 19.0, type: 'wrong', text: 'She clicks the orange banner. Nothing on the page changes.' },
  { at: 21.0, type: 'wrong', text: 'She clicks Hold. The page shows the message "Invalid input."' },
  { at: 21.6, dur: 4.6, type: 'dwell', text: 'The cursor stays near the message "Invalid input." for 5 seconds.' },
  { at: 27.2, type: 'back', text: 'She goes back to the Date box and types the date again.' },
  { at: 29.0, dur: 6, type: 'dwell', text: 'The cursor stays on Hold for 6 seconds.' },
  { at: 35.5, dur: 3, type: 'dwell', text: 'After Hold, the message disappears and nothing else changes on the page. The cursor rests for 3 seconds.' },
];
const MTYPE: Record<MType, { name: string; color: string }> = {
  dwell: { name: 'Pause', color: '#D97706' },
  back: { name: 'Went back', color: '#2563EB' },
  wrong: { name: 'Wrong click', color: '#E5391C' },
};
const mSize = (m: Marker) => (m.type === 'dwell' ? 16 + (m.dur ?? 0) * 3 : 26);

/* ----- helpers ----- */
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const settle = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const setValue = (el: HTMLInputElement, v: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(el, v);
  el.dispatchEvent(new Event('input', { bubbles: true }));
};

interface View {
  cx: number;
  cy: number;
  trail: { a: XY; b: XY; o: number }[];
  ripples: { x: number; y: number; f: number }[];
}
const EMPTY_VIEW: View = { cx: 1340, cy: 430, trail: [], ripples: [] };

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center justify-center gap-2 whitespace-nowrap';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white`;

export const SessionReplay: React.FC<{ mode: 'watch' | 'timeline' }> = ({ mode }) => {
  const timeline = mode === 'timeline';
  const rootRef = useRef<HTMLDivElement>(null);
  const ifaceRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1824, h: 671 });
  const [epoch, setEpoch] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [view, setView] = useState<View>(EMPTY_VIEW);
  const [sel, setSel] = useState<number | null>(null);

  const tRef = useRef(0);
  const playRef = useRef(false);
  const busy = useRef(false);
  const evIdx = useRef(0);
  const ctx = useRef<Ctx>({ room: 'LIB-2F-07' });
  const lastNow = useRef(0);
  const seekToken = useRef(0);
  const cache = useRef<(XY | null)[]>([]);

  const availH = size.h - (timeline ? STRIP_H + GAP : 0);
  const scale = Math.max(0.2, Math.min((availH - 2) / DH, (size.w * 0.62) / DW));
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Position of waypoint i in interface coordinates: real element when it exists, known layout otherwise. */
  const resolve = useCallback((i: number): XY => {
    const c = cache.current[i];
    if (c) return c;
    const tg = WP[i].t;
    const root = ifaceRef.current;
    if (tg.k === 'xy') {
      const p = { x: tg.x, y: tg.y };
      cache.current[i] = p;
      return p;
    }
    if (root) {
      let el: HTMLElement | undefined;
      if (tg.k === 'btn') el = findBtn(root, tg.text);
      else if (tg.k === 'input') el = findInput(root, tg.label);
      else el = findLeaf(root, tg.text);
      if (el) {
        const r = el.getBoundingClientRect();
        const rr = root.getBoundingClientRect();
        const s = scaleRef.current;
        let x = (r.left + r.width / 2 - rr.left) / s;
        let y = (r.top + r.height / 2 - rr.top) / s;
        if (tg.k === 'btn') {
          x += tg.dx ?? 0;
          y += tg.dy ?? 0;
        } else if (tg.k === 'input') {
          x += tg.dx ?? 0;
        }
        const p = { x, y };
        cache.current[i] = p;
        return p;
      }
    }
    if (tg.k === 'btn') return { x: tg.fx + (tg.dx ?? 0), y: tg.fy + (tg.dy ?? 0) };
    if (tg.k === 'input') return { x: tg.fx + (tg.dx ?? 0), y: tg.fy };
    return { x: tg.fx, y: tg.fy };
  }, []);

  const posAt = useCallback(
    (ms: number): XY => {
      if (ms <= WP[0].at) return resolve(0);
      for (let i = 0; i < WP.length - 1; i++) {
        if (ms < WP[i + 1].at) {
          const a = resolve(i);
          const b = resolve(i + 1);
          const f = ease((ms - WP[i].at) / (WP[i + 1].at - WP[i].at));
          return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
        }
      }
      return resolve(WP.length - 1);
    },
    [resolve],
  );

  const computeView = useCallback(
    (ms: number): View => {
      const p = posAt(ms);
      const trail: View['trail'] = [];
      if (timeline) {
        const N = 28;
        let prev = p;
        for (let k = 1; k <= N; k++) {
          const tt = ms - k * 90;
          if (tt < 0) break;
          const q = posAt(tt);
          trail.push({ a: prev, b: q, o: 0.75 * (1 - k / N) });
          prev = q;
        }
      }
      const ripples = RIPPLES.filter((r) => ms >= r && ms - r < 550).map((r) => {
        const q = posAt(r);
        return { x: q.x, y: q.y, f: (ms - r) / 550 };
      });
      return { cx: p.x, cy: p.y, trail, ripples };
    },
    [posAt, timeline],
  );

  const refresh = useCallback(() => {
    setT(tRef.current);
    setView(computeView(tRef.current));
  }, [computeView]);

  const runEv = (e: Ev) => {
    const root = ifaceRef.current;
    if (!root) return;
    if (e.kind === 'click' && e.target) {
      const el =
        e.target.k === 'btn' ? findBtn(root, e.target.text) : e.target.k === 'leaf' ? findLeaf(root, e.target.text) : findInput(root, e.target.text);
      el?.click();
    } else if (e.kind === 'type' && e.label && e.value) {
      const el = findInput(root, e.label);
      if (el) setValue(el, e.value(ctx.current));
    } else if (e.kind === 'read') {
      // Read the real Rooms table: first room that is Free and has at least 4 seats.
      const rows = Array.from(root.querySelectorAll('div')).filter((d) => /^LIB-\dF-\d\d$/.test(norm(d.textContent)) && d.children.length === 0);
      for (const code of rows) {
        const row = code.parentElement;
        if (!row) continue;
        const cells = Array.from(row.children).map((c) => norm(c.textContent));
        if (cells[5] === 'Free' && Number(cells[3]) >= 4) {
          ctx.current.room = cells[0];
          break;
        }
      }
    }
  };

  const advance = (to: number) => {
    while (evIdx.current < EVENTS.length && EVENTS[evIdx.current].at <= to) {
      runEv(EVENTS[evIdx.current]);
      evIdx.current++;
    }
  };

  const seek = useCallback(
    async (target: number, resume: boolean) => {
      const token = ++seekToken.current;
      busy.current = true;
      playRef.current = false;
      setPlaying(false);
      if (target < tRef.current || evIdx.current > 0 && target === 0) {
        evIdx.current = 0;
        ctx.current = { room: ctx.current.room };
        setEpoch((e) => e + 1);
        await settle();
        if (token !== seekToken.current) return;
      }
      tRef.current = target;
      advance(target);
      await settle();
      if (token !== seekToken.current) return;
      busy.current = false;
      refresh();
      if (resume) {
        lastNow.current = performance.now();
        playRef.current = true;
        setPlaying(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refresh],
  );

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!playRef.current || busy.current) {
        lastNow.current = now;
        return;
      }
      const dt = Math.min(100, now - lastNow.current);
      lastNow.current = now;
      tRef.current = Math.min(END, tRef.current + dt);
      advance(tRef.current);
      if (tRef.current >= END) {
        playRef.current = false;
        setPlaying(false);
      }
      refresh();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  // keep the cursor glued to real elements when the scale changes
  useEffect(() => {
    cache.current = [];
    refresh();
  }, [scale, refresh]);

  const play = () => {
    if (tRef.current >= END) {
      void seek(0, true);
      return;
    }
    lastNow.current = performance.now();
    playRef.current = true;
    setPlaying(true);
  };
  const pause = () => {
    playRef.current = false;
    setPlaying(false);
  };
  const restart = () => {
    setSel(null);
    void seek(0, true);
  };
  const jump = (i: number) => {
    setSel(i);
    void seek(MARKERS[i].at * 1000 + 80, false);
  };

  const pct = (t / END) * 100;
  const stageW = DW * scale + 2;
  const stageH = DH * scale + 2;
  const k = 1.3 / scale;

  const playBtn = (
    <button onClick={playing ? pause : play} className={PRIMARY}>
      {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      {playing ? 'Pause' : 'Play'}
    </button>
  );
  const restartBtn = (
    <button onClick={restart} className={SECONDARY}>
      <RotateCcw className="w-6 h-6" />
      Restart
    </button>
  );

  return (
    <div ref={rootRef} className="flex-1 min-h-0 flex flex-col overflow-hidden" style={{ gap: GAP }}>
      <div className="flex-1 min-h-0 flex gap-6">
        {/* Real interface, scaled, not clickable by the audience */}
        <div
          className="relative flex-shrink-0 rounded-lg border border-[#D5CFC7] bg-white overflow-hidden shadow-sm"
          style={{ width: stageW, height: stageH }}
        >
          <div
            ref={ifaceRef}
            className="absolute left-0 top-0 pointer-events-none select-none"
            style={{ width: DW, height: DH, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            <Interface key={epoch} />
            <svg className="absolute left-0 top-0" width={DW} height={DH} style={{ overflow: 'visible' }}>
              {view.trail.map((s, i) => (
                <line
                  key={i}
                  x1={s.a.x}
                  y1={s.a.y}
                  x2={s.b.x}
                  y2={s.b.y}
                  stroke="#E5391C"
                  strokeOpacity={s.o}
                  strokeWidth={5 / scale}
                  strokeLinecap="round"
                />
              ))}
              {view.ripples.map((r, i) => (
                <circle
                  key={i}
                  cx={r.x}
                  cy={r.y}
                  r={(10 + 34 * r.f) / scale}
                  fill="none"
                  stroke="#E5391C"
                  strokeOpacity={1 - r.f}
                  strokeWidth={4 / scale}
                />
              ))}
              <g transform={`translate(${view.cx} ${view.cy}) scale(${k})`}>
                <path
                  d="M0 0 L0 22 L5.5 17 L9.5 26 L13.5 24.2 L9.6 15.4 L17 15.4 Z"
                  fill="#222222"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Right side */}
        {!timeline ? (
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-5">
            <div className="flex gap-4 w-full max-w-[560px]">
              <div className="flex-1 [&>button]:w-full [&>button]:py-5">{playBtn}</div>
              <div className="flex-1 [&>button]:w-full [&>button]:py-5">{restartBtn}</div>
            </div>
            <div className="w-full max-w-[560px] h-2 rounded-full bg-[#E8E2D9] overflow-hidden">
              <div className="h-full bg-[#E5391C]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-5 flex flex-col">
            <div className="text-[30px] font-bold text-[#222222] leading-tight">What happened at this moment</div>
            <div className="flex-1 min-h-0 flex flex-col justify-center">
              {sel === null ? (
                <div className="text-[32px] leading-[1.35] text-[#6E6D70]">Click a dot on the timeline.</div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-5 h-5 rounded-full" style={{ background: MTYPE[MARKERS[sel].type].color }} />
                    <span className="text-[28px] font-bold" style={{ color: MTYPE[MARKERS[sel].type].color }}>
                      {MTYPE[MARKERS[sel].type].name}
                    </span>
                    <span className="text-[26px] text-[#6E6D70]">at {Math.round(MARKERS[sel].at)} s</span>
                  </div>
                  <div className="text-[34px] leading-[1.3] text-[#222222] font-semibold">{MARKERS[sel].text}</div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 border-t border-[#E8E2D9] pt-3">
              {(Object.keys(MTYPE) as MType[]).map((ty) => (
                <div key={ty} className="flex items-center gap-3 text-[26px] text-[#525254] leading-tight">
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{ width: ty === 'dwell' ? 30 : 22, height: ty === 'dwell' ? 30 : 22, background: MTYPE[ty].color }}
                  />
                  {MTYPE[ty].name}
                  {ty === 'dwell' && ' (a bigger dot is a longer pause)'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {timeline && (
        <div
          className="flex-shrink-0 flex items-center gap-4 bg-white border border-[#E8E2D9] rounded-2xl px-4"
          style={{ height: STRIP_H }}
        >
          {playBtn}
          {restartBtn}
          <div className="relative flex-1 h-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[22px] text-[#6E6D70]">0 s</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22px] text-[#6E6D70]">40 s</div>
            <div className="absolute left-[56px] right-[64px] top-0 bottom-0">
              <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded bg-[#E8E2D9]" />
              <div className="absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded bg-[#C9C2B8]" style={{ width: `${pct}%` }} />
              <div className="absolute top-[6px] bottom-[6px] w-[3px] -translate-x-1/2 rounded bg-[#222222]" style={{ left: `${pct}%` }} />
              {MARKERS.map((m, i) => {
                const s = mSize(m);
                const row = m.type === 'wrong' ? 22 : m.type === 'dwell' ? 50 : 78;
                return (
                  <button
                    key={i}
                    onClick={() => jump(i)}
                    aria-label={`${MTYPE[m.type].name} at ${m.at} seconds`}
                    className="absolute flex items-center justify-center"
                    style={{ left: `${((m.at * 1000) / END) * 100}%`, top: row, width: 36, height: 36, transform: 'translate(-50%,-50%)' }}
                  >
                    <span
                      className="rounded-full block"
                      style={{
                        width: s,
                        height: s,
                        background: MTYPE[m.type].color,
                        outline: sel === i ? '3px solid #222222' : 'none',
                        outlineOffset: 2,
                        opacity: sel === null || sel === i ? 1 : 0.7,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
