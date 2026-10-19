import React, { useEffect, useRef, useState } from 'react';
import { Eye, Music, Play, RotateCcw, Volume2 } from 'lucide-react';

/** One note: pitch in semitones above middle C, length in beats, word/syllable sung on it. */
interface Note {
  p: number;
  d: number;
  w: string;
}

interface Song {
  id: number;
  title: string;
  beatMs: number;
  notes: Note[];
}

const mk = (pitches: number[], durs: number[], words: string[]): Note[] =>
  pitches.map((p, i) => ({ p, d: durs[i], w: words[i] }));

// Traditional songs (public domain). First two lines only.
const SONGS: Song[] = [
  {
    id: 1,
    title: 'Happy Birthday',
    beatMs: 700,
    notes: mk(
      [7, 7, 9, 7, 12, 11, 7, 7, 9, 7, 14, 12],
      [0.75, 0.25, 1, 1, 1, 2, 0.75, 0.25, 1, 1, 1, 2],
      ['Hap', 'py', 'birth', 'day', 'to', 'you', 'Hap', 'py', 'birth', 'day', 'to', 'you'],
    ),
  },
  {
    id: 2,
    title: 'Twinkle, Twinkle, Little Star',
    beatMs: 600,
    notes: mk(
      [0, 0, 7, 7, 9, 9, 7, 5, 5, 4, 4, 2, 2, 0],
      [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      ['Twin', 'kle', 'twin', 'kle', 'lit', 'tle', 'star', 'how', 'I', 'won', 'der', 'what', 'you', 'are'],
    ),
  },
  {
    id: 3,
    title: 'Jingle Bells',
    beatMs: 480,
    notes: mk(
      [4, 4, 4, 4, 4, 4, 4, 7, 0, 2, 4],
      [1, 1, 2, 1, 1, 2, 1, 1, 1.5, 0.5, 4],
      ['Jin', 'gle', 'bells', 'jin', 'gle', 'bells', 'jin', 'gle', 'all', 'the', 'way'],
    ),
  },
];

const onsets = (s: Song) => {
  let beat = 0;
  return s.notes.map((n) => {
    const at = beat * s.beatMs;
    beat += n.d;
    return at;
  });
};
const totalMs = (s: Song) => s.notes.reduce((a, n) => a + n.d, 0) * s.beatMs;

type Stage = 'idle' | 'tapping' | 'tapped' | 'revealed';

const BTN = 'rounded-xl px-5 py-3.5 text-[24px] font-bold flex items-center gap-2 whitespace-nowrap';
const SECONDARY = `${BTN} bg-white border border-[#E8E2D9] text-[#525254] hover:bg-stone-100`;
const PRIMARY = `${BTN} bg-[#E5391C] hover:bg-[#C92B10] text-white disabled:opacity-40 disabled:hover:bg-[#E5391C]`;

const LANE_W = 1080;

export const TapSongDemo: React.FC = () => {
  const [songId, setSongId] = useState<number | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [tapIdx, setTapIdx] = useState(-1); // last knock played
  const [pulse, setPulse] = useState(0); // changes on every knock to restart the animation
  const [noteIdx, setNoteIdx] = useState(-1); // note lit while the melody plays
  const [singing, setSinging] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timers = useRef<number[]>([]);

  const song = SONGS.find((s) => s.id === songId) ?? null;

  const stopAudio = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (gainRef.current) {
      try {
        gainRef.current.gain.value = 0;
        gainRef.current.disconnect();
      } catch {
        /* ignore */
      }
      gainRef.current = null;
    }
  };
  useEffect(() => stopAudio, []);

  const getAudio = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') void ctx.resume();
    const gain = ctx.createGain();
    gain.gain.value = 0.9;
    gain.connect(ctx.destination);
    gainRef.current = gain;
    return { ctx, gain };
  };

  const knock = (ctx: AudioContext, out: AudioNode, when: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(900, when);
    o.frequency.exponentialRampToValueAtTime(380, when + 0.07);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(0.9, when + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.12);
    o.connect(g);
    g.connect(out);
    o.start(when);
    o.stop(when + 0.14);
  };

  const tone = (ctx: AudioContext, out: AudioNode, when: number, semis: number, dur: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(261.63 * Math.pow(2, semis / 12), when);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(0.5, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(0.12, dur * 0.92));
    o.connect(g);
    g.connect(out);
    o.start(when);
    o.stop(when + dur);
  };

  const playTaps = () => {
    if (!song) return;
    stopAudio();
    setSinging(false);
    setNoteIdx(-1);
    const { ctx, gain } = getAudio();
    const start = ctx.currentTime + 0.15;
    const ons = onsets(song);
    setTapIdx(-1);
    setStage('tapping');
    ons.forEach((ms, i) => {
      knock(ctx, gain, start + ms / 1000);
      timers.current.push(
        window.setTimeout(() => {
          setTapIdx(i);
          setPulse((p) => p + 1);
        }, 150 + ms),
      );
    });
    timers.current.push(window.setTimeout(() => setStage((s) => (s === 'tapping' ? 'tapped' : s)), 150 + totalMs(song) + 300));
  };

  const playSong = () => {
    if (!song) return;
    stopAudio();
    const { ctx, gain } = getAudio();
    const start = ctx.currentTime + 0.15;
    const ons = onsets(song);
    setSinging(true);
    song.notes.forEach((n, i) => {
      tone(ctx, gain, start + ons[i] / 1000, n.p, (n.d * song.beatMs) / 1000);
      timers.current.push(window.setTimeout(() => setNoteIdx(i), 150 + ons[i]));
    });
    timers.current.push(
      window.setTimeout(() => {
        setNoteIdx(-1);
        setSinging(false);
      }, 150 + totalMs(song) + 200),
    );
  };

  const pick = (id: number) => {
    stopAudio();
    setSongId(id);
    setStage('idle');
    setTapIdx(-1);
    setNoteIdx(-1);
    setSinging(false);
  };

  const reset = () => {
    stopAudio();
    setSongId(null);
    setStage('idle');
    setTapIdx(-1);
    setNoteIdx(-1);
    setSinging(false);
  };

  const revealed = stage === 'revealed';
  const tapping = stage === 'tapping';

  return (
    <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
      {/* Left: controls and stage */}
      <div className="w-[1200px] flex-shrink-0 flex flex-col gap-3 min-h-0">
        <div className="h-16 flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center rounded-xl border border-[#E8E2D9] bg-white overflow-hidden">
            {SONGS.map((s) => (
              <button
                key={s.id}
                onClick={() => pick(s.id)}
                disabled={tapping}
                className={`h-16 px-5 text-[24px] font-bold ${
                  s.id === songId ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:bg-stone-100'
                }`}
              >
                Song {s.id}
              </button>
            ))}
          </div>
          <button onClick={playTaps} disabled={!song || tapping} className={PRIMARY}>
            <Play className="w-6 h-6" />
            {stage === 'tapped' || revealed ? 'Play the taps again' : 'Play the taps'}
          </button>
          <button
            onClick={() => {
              stopAudio();
              setStage('revealed');
            }}
            disabled={!song || stage === 'idle' || tapping || revealed}
            className={PRIMARY}
          >
            <Eye className="w-6 h-6" />
            Reveal the song
          </button>
          <div className="flex-1" />
          <button onClick={reset} className={SECONDARY}>
            <RotateCcw className="w-6 h-6" />
            Reset
          </button>
        </div>

        <div className="flex-1 min-h-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-4 flex flex-col">
          {/* Listener lane */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Volume2 className="w-7 h-7 text-blue-600" />
            <div className="text-[28px] font-bold text-[#222222] leading-tight">What the listener hears: only knocks</div>
          </div>
          <div className={`relative flex-shrink-0 mx-auto ${revealed ? 'h-[120px]' : 'h-[200px]'}`} style={{ width: LANE_W }}>
            <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-[#E8E2D9] -translate-y-1/2" />
            {song &&
              onsets(song).map((ms, i) => {
                const x = (ms / (totalMs(song) - song.notes[song.notes.length - 1].d * song.beatMs + 1)) * (LANE_W - 60) + 30;
                const on = i <= tapIdx;
                const now = i === tapIdx;
                return (
                  <div key={i} className="absolute top-1/2" style={{ left: x, transform: 'translate(-50%, -50%)' }}>
                    {now && (
                      <span
                        key={pulse}
                        className="absolute left-1/2 top-1/2 w-[56px] h-[56px] rounded-full border-4 border-blue-600"
                        style={{ transform: 'translate(-50%, -50%)', animation: 'tapRing 520ms ease-out forwards' }}
                      />
                    )}
                    <div
                      className="rounded-full transition-all duration-150"
                      style={{
                        width: now ? 52 : 40,
                        height: now ? 52 : 40,
                        background: on ? '#2563EB' : 'transparent',
                        opacity: on ? 1 : 0,
                      }}
                    />
                  </div>
                );
              })}
          </div>
          <style>{`@keyframes tapRing { from { opacity: 0.9; transform: translate(-50%,-50%) scale(0.7); } to { opacity: 0; transform: translate(-50%,-50%) scale(2.1); } }`}</style>

          {/* Status line or tapper lane */}
          {!revealed ? (
            <div className="flex-1 min-h-0 flex items-center justify-center text-center text-[32px] leading-[1.35] text-[#525254] px-10">
              {stage === 'idle' && (song ? 'Write your guess on paper. Then listen.' : 'Pick a song. Only the lecturer knows which one.')}
              {stage === 'tapping' && 'Listen...'}
              {stage === 'tapped' && 'Which song was it? Write it on paper. Then see the answer.'}
            </div>
          ) : (
            song && (
              <>
                <div className="flex items-center gap-3 flex-shrink-0 mt-2">
                  <Music className="w-7 h-7 text-[#E5391C]" />
                  <div className="text-[28px] font-bold text-[#222222] leading-tight">
                    What the tapper hears in their head: {song.title}
                  </div>
                  <div className="flex-1" />
                  <button onClick={playSong} disabled={singing} className={`${SECONDARY} disabled:opacity-50`}>
                    <Play className="w-6 h-6" />
                    Play the song
                  </button>
                </div>
                <Melody song={song} active={noteIdx} />
              </>
            )
          )}
        </div>
      </div>

      {/* Right: comparison */}
      <div className="flex-1 min-w-0 bg-white border border-[#E8E2D9] rounded-3xl shadow-xs px-6 py-5 flex flex-col">
        {!revealed ? (
          <>
            <div className="text-[30px] font-bold text-[#222222] leading-tight">Tappers and listeners</div>
            <div className="mt-4 flex flex-col gap-3 text-[28px] leading-[1.35] text-[#525254]">
              <div>1. A famous song is tapped, only the rhythm.</div>
              <div>2. You write your guess in private.</div>
              <div>3. Then the answer appears.</div>
            </div>
          </>
        ) : (
          <>
            <div className="text-[30px] font-bold text-[#222222] leading-tight">The tapper's blind spot</div>
            <div className="text-[24px] text-[#6E6D70] mt-1 leading-snug">In a classic experiment (Newton, 1990)</div>
            <div className="mt-5 flex flex-col gap-5">
              <Bar label="What tappers expect" sub="said listeners would find the song" value={50} text="about 50%" color="#2563EB" />
              <Bar label="What listeners achieve" sub="songs actually identified" value={2.5} text="about 2.5%" color="#E5391C" />
            </div>
            <div className="mt-auto pt-3 text-[28px] leading-[1.35] text-[#222222] font-semibold">
              The tapper hears the whole song in their head. The listener hears only knocks.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Bar: React.FC<{ label: string; sub: string; value: number; text: string; color: string }> = ({ label, sub, value, text, color }) => (
  <div>
    <div className="flex items-baseline justify-between gap-3">
      <div className="text-[28px] font-bold text-[#222222] leading-tight">{label}</div>
      <div className="text-[28px] font-bold leading-tight" style={{ color }}>{text}</div>
    </div>
    <div className="text-[22px] text-[#6E6D70] leading-tight mb-2">{sub}</div>
    <div className="h-[44px] rounded-lg bg-[#FAF9F6] border border-[#E8E2D9] overflow-hidden">
      <div className="h-full rounded-r-md" style={{ width: `${value}%`, minWidth: 6, background: color }} />
    </div>
  </div>
);

const Melody: React.FC<{ song: Song; active: number }> = ({ song, active }) => {
  const n = song.notes.length;
  const min = Math.min(...song.notes.map((x) => x.p));
  const max = Math.max(...song.notes.map((x) => x.p));
  const H = 150;
  const barH = 22;
  const y = (p: number) => (max === min ? H / 2 - barH / 2 : (1 - (p - min) / (max - min)) * (H - barH));
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center">
      <div className="relative mx-auto flex" style={{ width: LANE_W + 20, height: H }}>
        {song.notes.map((nt, i) => (
          <div key={i} className="relative flex-1">
            <div
              className="absolute left-[8%] right-[8%] rounded-md"
              style={{ top: y(nt.p), height: barH, background: i === active ? '#E5391C' : '#F2A394' }}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto flex" style={{ width: LANE_W + 20 }}>
        {song.notes.map((nt, i) => (
          <div
            key={i}
            className="flex-1 text-center text-[24px] leading-tight font-semibold"
            style={{ color: i === active ? '#E5391C' : '#222222' }}
          >
            {nt.w}
          </div>
        ))}
      </div>
      <div className="sr-only">{n} notes</div>
    </div>
  );
};
