import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { X, RefreshCw, LogOut, Plus, Trash2, Users, ListChecks, TriangleAlert, Pencil, Eye, Lock } from 'lucide-react';
import { UM6PLogo } from '../brand/UM6PLogo';
import { STATUS_STYLE } from '../projects/ProgressStrip';
import { PROJECTS } from '../../data/projects';
import { BUILT_SESSIONS, refreshReleases, setReleasesLocal, useReleases } from '../../lib/releases';
import { COURSE_SESSIONS } from '../../data/sessions';
import {
  STATUS_LABEL,
  STATUS_ORDER,
  addStudent,
  addTeam,
  deleteStudent,
  deleteTeam,
  fetchRoster,
  saveProgress,
  saveRelease,
  signOut,
  updateStudent,
  updateTeam,
  type ProgressStatus,
  type RosterData,
  type Student,
  type Team,
} from '../../lib/backend';

const SESSIONS = COURSE_SESSIONS.filter((s) => s.id >= 2);

const fullName = (s: Student) => `${s.last_name}${s.first_name ? ' ' + s.first_name : ''}`;
const projectLabel = (id: number | null) => {
  if (id === null) return 'No project';
  const p = PROJECTS.find((x) => x.id === id);
  return p ? `P${p.id} · ${p.title}` : `P${id}`;
};

interface Props {
  onClose: () => void;
}

/** Teacher-only: roster, teams, project assignments and progress per session. */
const TeacherPanel: React.FC<Props> = ({ onClose }) => {
  const [data, setData] = useState<RosterData | null>(null);
  const [tab, setTab] = useState<'teams' | 'progress' | 'sessions'>('teams');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      setData(await fetchRoster());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the class.');
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** Run a change, then reload so the screen always shows what is really stored. */
  const act = useCallback(
    async (fn: () => Promise<unknown>) => {
      setBusy(true);
      setError('');
      try {
        await fn();
        setData(await fetchRoster());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'The change was not saved.');
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[65] bg-[#FAF9F6] text-[#222222] flex flex-col select-text">
      <header className="flex items-center justify-between gap-4 px-5 sm:px-8 h-16 border-b border-[#E8E2D9] bg-white flex-shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <UM6PLogo variant="compact" theme="color" className="h-8 w-auto hidden sm:inline-flex" />
          <div className="h-6 w-px bg-[#E8E2D9] hidden sm:block" />
          <span className="text-sm font-mono uppercase tracking-wider text-[#E5391C] font-bold truncate">Teacher · Class</span>
          <div className="flex items-center bg-[#FAF9F6] p-0.5 rounded-lg border border-[#E8E2D9]">
            {(
              [
                ['teams', 'Teams & projects', Users],
                ['progress', 'Progress', ListChecks],
                ['sessions', 'Sessions', Eye],
              ] as const
            ).map(([id, label, Ico]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold cursor-pointer ${
                  tab === id ? 'bg-[#E5391C] text-white' : 'text-[#525254] hover:text-[#222222]'
                }`}
              >
                <Ico className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {busy && <span className="text-xs font-mono text-[#6E6D70]">working…</span>}
          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-[#FAF9F6] hover:bg-[#F5F2ED] text-sm font-semibold cursor-pointer"
            title="Reload from the database"
          >
            <RefreshCw className="w-4 h-4" /> Reload
          </button>
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-[#FAF9F6] hover:bg-[#F5F2ED] text-sm font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E2D9] bg-[#FAF9F6] hover:bg-[#F5F2ED] text-sm font-semibold cursor-pointer"
          >
            <X className="w-4 h-4" /> Close
          </button>
        </div>
      </header>

      {error && (
        <div className="mx-5 sm:mx-8 mt-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <TriangleAlert className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-5">
        {!data ? (
          <p className="text-sm text-[#6E6D70]">{busy ? 'Loading…' : 'No data.'}</p>
        ) : tab === 'teams' ? (
          <TeamsTab data={data} act={act} />
        ) : tab === 'sessions' ? (
          <SessionsTab act={act} />
        ) : (
          <ProgressTab data={data} act={act} />
        )}
      </div>
    </div>
  );
};

type Act = (fn: () => Promise<unknown>) => Promise<void>;

/* --------------------------------------------------------- sessions tab */

/** The teacher decides which sessions students can open. Teachers always see everything. */
const SessionsTab: React.FC<{ act: Act }> = ({ act }) => {
  const releases = useReleases();
  const toggle = (id: number) => {
    const next = !releases[id];
    setReleasesLocal({ ...releases, [id]: next });
    act(async () => {
      try {
        await saveRelease(id, next);
      } finally {
        await refreshReleases();
      }
    });
  };
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <p className="text-sm text-[#525254]">
        Switch a session on to let students open it; switch it off to hide it again. You always see every session. Changes reach
        students within seconds (when they reload or come back to the tab).
      </p>
      <div className="bg-white border border-[#E8E2D9] rounded-2xl divide-y divide-[#F0EBE3] shadow-xs">
        {COURSE_SESSIONS.map((s) => {
          const built = BUILT_SESSIONS.includes(s.id);
          const on = releases[s.id] === true;
          return (
            <div key={s.id} className="flex items-center gap-4 px-4 py-3">
              <span className="text-xs font-mono font-bold text-[#E5391C] w-10">S{String(s.id).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{s.title}</div>
                <div className="text-xs text-[#6E6D70]">
                  {built ? (on ? 'Open to students' : 'Hidden from students') : 'Slides not built yet'}
                </div>
              </div>
              <button
                role="switch"
                aria-checked={on}
                disabled={!built}
                onClick={() => toggle(s.id)}
                title={built ? (on ? 'Hide from students' : 'Open to students') : 'Not built yet'}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  !built ? 'bg-[#E8E2D9] cursor-not-allowed opacity-60' : on ? 'bg-emerald-500 cursor-pointer' : 'bg-[#B0AEB2] cursor-pointer'
                }`}
              >
                <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
                {!built && <Lock className="absolute inset-0 m-auto w-3 h-3 text-[#6E6D70]" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------ teams tab */

const teamLabel = (team: Team, students: Student[]) => {
  const names = students.filter((s) => s.team_id === team.id).map((s) => s.last_name);
  return `${projectLabel(team.project_id).split(' · ')[0]} · ${names.length ? names.join(', ') : 'empty team'}`;
};

/** Click a name to edit it in place: Enter saves, Escape cancels. */
const EditableName: React.FC<{ student: Student; act: Act }> = ({ student, act }) => {
  const [editing, setEditing] = useState(false);
  const [last, setLast] = useState(student.last_name);
  const [first, setFirst] = useState(student.first_name);
  const start = () => {
    setLast(student.last_name);
    setFirst(student.first_name);
    setEditing(true);
  };
  const save = () => {
    setEditing(false);
    if (last.trim() && (last.trim() !== student.last_name || first.trim() !== student.first_name)) {
      act(() => updateStudent(student.id, { last_name: last.trim(), first_name: first.trim() }));
    }
  };
  if (!editing) {
    return (
      <button onClick={start} title="Click to edit the name" className="group flex-1 min-w-0 flex items-center gap-1.5 text-left cursor-pointer">
        <span className="text-sm font-semibold truncate">{fullName(student)}</span>
        <Pencil className="w-3 h-3 text-[#B0AEB2] group-hover:text-[#E5391C] shrink-0" />
      </button>
    );
  }
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      e.stopPropagation();
      setEditing(false);
    }
  };
  return (
    <div className="flex-1 min-w-0 flex items-center gap-1.5" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) save(); }}>
      <input autoFocus value={last} onChange={(e) => setLast(e.target.value)} onKeyDown={keys} placeholder="Last name" className="min-w-0 flex-1 border border-[#E5391C] rounded-md px-2 py-1 text-sm bg-white" />
      <input value={first} onChange={(e) => setFirst(e.target.value)} onKeyDown={keys} placeholder="First name" className="min-w-0 flex-1 border border-[#E8E2D9] rounded-md px-2 py-1 text-sm bg-white" />
    </div>
  );
};

/** Paste a whole list (one student per line, "Last name, First name" or "Last name First name"). */
const BulkAdd: React.FC<{ act: Act }> = ({ act }) => {
  const [text, setText] = useState('');
  const rows = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [a, ...rest] = l.includes(',') || l.includes('\t') ? l.split(/[,\t]/) : l.split(/\s+/);
      return { last_name: a.trim(), first_name: rest.join(' ').trim(), team_id: null as string | null };
    })
    .filter((r) => r.last_name);
  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder={'Paste several students, one per line:\nBenali, Sara\nAlaoui Omar'}
        className="w-full border border-[#E8E2D9] rounded-lg px-2.5 py-2 text-sm bg-[#FAF9F6]"
      />
      <button
        disabled={!rows.length}
        onClick={() => {
          const batch = rows;
          setText('');
          act(async () => {
            for (const r of batch) await addStudent(r);
          });
        }}
        className="w-full px-2.5 py-1.5 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] disabled:opacity-40 text-white text-sm font-semibold cursor-pointer"
      >
        Add {rows.length || ''} student{rows.length === 1 ? '' : 's'} to the unassigned list
      </button>
    </div>
  );
};

const NameForm: React.FC<{ onAdd: (last: string, first: string) => void; label: string }> = ({ onAdd, label }) => {
  const [last, setLast] = useState('');
  const [first, setFirst] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!last.trim()) return;
        onAdd(last.trim(), first.trim());
        setLast('');
        setFirst('');
      }}
      className="flex items-center gap-2"
    >
      <input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" className="min-w-0 flex-1 border border-[#E8E2D9] rounded-lg px-2.5 py-1.5 text-sm bg-white" />
      <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" className="min-w-0 flex-1 border border-[#E8E2D9] rounded-lg px-2.5 py-1.5 text-sm bg-white" />
      <button type="submit" disabled={!last.trim()} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] disabled:opacity-40 text-white text-sm font-semibold cursor-pointer whitespace-nowrap">
        <Plus className="w-4 h-4" /> {label}
      </button>
    </form>
  );
};

const TeamsTab: React.FC<{ data: RosterData; act: Act }> = ({ data, act }) => {
  const { students, teams } = data;
  const unassigned = students.filter((s) => !s.team_id);
  const byProject = useMemo(() => {
    const m = new Map<number, number>();
    teams.forEach((t) => t.project_id !== null && m.set(t.project_id, (m.get(t.project_id) ?? 0) + 1));
    return m;
  }, [teams]);
  const sortedTeams = [...teams].sort((a, b) => (a.project_id ?? 99) - (b.project_id ?? 99));
  const free = PROJECTS.filter((p) => p.id !== 11 && !byProject.has(p.id)).map((p) => `P${p.id}`);

  const moveOptions = (current: string | null) => (
    <>
      <option value="">Move to…</option>
      {current && <option value="__none">Unassign</option>}
      {teams
        .filter((t) => t.id !== current)
        .map((t) => (
          <option key={t.id} value={t.id}>
            {teamLabel(t, students)}
          </option>
        ))}
    </>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 max-w-[1500px] mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-[#525254]">
            {teams.length} teams · {students.length} students · projects without a team:{' '}
            <strong className="text-[#222222]">{free.length ? free.join(', ') : 'none'}</strong>
          </p>
          <button
            onClick={() => act(() => addTeam(null))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] text-white text-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New team
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedTeams.map((t) => {
            const members = students.filter((s) => s.team_id === t.id);
            const shared = t.project_id !== null && (byProject.get(t.project_id) ?? 0) > 1;
            return (
              <div key={t.id} className="bg-white border border-[#E8E2D9] rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <select
                    value={t.project_id ?? ''}
                    onChange={(e) => act(() => updateTeam(t.id, { project_id: e.target.value ? Number(e.target.value) : null }))}
                    className="flex-1 min-w-0 border border-[#E8E2D9] rounded-lg px-2 py-1.5 text-sm font-semibold bg-[#FDF5F3]"
                  >
                    <option value="">No project</option>
                    {PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {projectLabel(p.id)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this team? Its students become unassigned and its progress is removed.')) act(() => deleteTeam(t.id));
                    }}
                    className="p-1.5 rounded-lg text-[#6E6D70] hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    title="Delete team"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {shared && <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">Another team has this project too.</p>}

                <ul className="space-y-1.5">
                  {members.length === 0 && <li className="text-sm text-[#6E6D70] italic">No students yet.</li>}
                  {members.map((s) => (
                    <li key={s.id} className="flex items-center gap-2">
                      <EditableName student={s} act={act} />
                      <select
                        value=""
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v) act(() => updateStudent(s.id, { team_id: v === '__none' ? null : v }));
                        }}
                        className="max-w-[170px] border border-[#E8E2D9] rounded-md px-1.5 py-1 text-xs bg-white"
                      >
                        {moveOptions(t.id)}
                      </select>
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove ${fullName(s)} from the class list?`)) act(() => deleteStudent(s.id));
                        }}
                        className="p-1 rounded text-[#6E6D70] hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        title="Delete student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <NameForm label="Add" onAdd={(last, first) => act(() => addStudent({ last_name: last, first_name: first, team_id: t.id }))} />
              </div>
            );
          })}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 space-y-3 shadow-xs">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#E5391C] font-bold">Unassigned students ({unassigned.length})</h2>
          <ul className="space-y-1.5">
            {unassigned.length === 0 && <li className="text-sm text-[#6E6D70] italic">Everyone has a team.</li>}
            {unassigned.map((s) => (
              <li key={s.id} className="flex items-center gap-2">
                <EditableName student={s} act={act} />
                <select
                  value=""
                  onChange={(e) => e.target.value && act(() => updateStudent(s.id, { team_id: e.target.value }))}
                  className="max-w-[170px] border border-[#E8E2D9] rounded-md px-1.5 py-1 text-xs bg-white"
                >
                  <option value="">Assign to…</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {teamLabel(t, students)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (window.confirm(`Remove ${fullName(s)} from the class list?`)) act(() => deleteStudent(s.id));
                  }}
                  className="p-1 rounded text-[#6E6D70] hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  title="Delete student"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 space-y-3 shadow-xs">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#E5391C] font-bold">Add students</h2>
          <NameForm label="Add" onAdd={(last, first) => act(() => addStudent({ last_name: last, first_name: first, team_id: null }))} />
          <BulkAdd act={act} />
          <p className="text-xs text-[#6E6D70]">Click any name to edit it. Students see only the last names of their team, next to the project.</p>
        </div>
      </aside>
    </div>
  );
};

/* --------------------------------------------------------- progress tab */

const ProgressTab: React.FC<{ data: RosterData; act: Act }> = ({ data, act }) => {
  const { teams, students, progress } = data;
  const [sel, setSel] = useState<{ teamId: string; session: number } | null>(null);
  const [note, setNote] = useState('');

  const sortedTeams = [...teams].sort((a, b) => (a.project_id ?? 99) - (b.project_id ?? 99));
  const cell = (teamId: string, session: number) => progress.find((p) => p.team_id === teamId && p.session === session);

  useEffect(() => {
    if (sel) setNote(cell(sel.teamId, sel.session)?.note ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel?.teamId, sel?.session]);

  const selTeam = sel ? teams.find((t) => t.id === sel.teamId) : null;
  const selRow = sel ? cell(sel.teamId, sel.session) : undefined;
  const selStatus: ProgressStatus = selRow?.status ?? 'pending';

  const next = (st: ProgressStatus): ProgressStatus => STATUS_ORDER[(STATUS_ORDER.indexOf(st) + 1) % STATUS_ORDER.length];
  const setAll = (session: number, status: ProgressStatus) =>
    act(async () => {
      for (const t of teams) await saveProgress({ team_id: t.id, session, status, note: cell(t.id, session)?.note ?? '' });
    });

  const save = (status: ProgressStatus, n: string) => {
    if (!sel) return;
    act(() => saveProgress({ team_id: sel.teamId, session: sel.session, status, note: n }));
  };

  return (
    <div className="max-w-[1500px] mx-auto space-y-5">
      <div className="flex items-center gap-4 flex-wrap text-sm">
        {STATUS_ORDER.map((s) => (
          <span key={s} className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${STATUS_STYLE[s].chip}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${STATUS_STYLE[s].dot}`} /> {STATUS_LABEL[s]}
          </span>
        ))}
        <span className="text-[#6E6D70]">Click a cell to move it to the next status; use the menu under S2, S3… to set a whole session at once. Students see this next to each project.</span>
      </div>

      <div className="bg-white border border-[#E8E2D9] rounded-2xl overflow-x-auto shadow-xs">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8E2D9] text-left">
              <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-[#6E6D70] font-bold">Project and team</th>
              {SESSIONS.map((s) => (
                <th key={s.id} className="px-2 py-3 text-center text-xs font-mono font-bold text-[#6E6D70]" title={`Session ${s.id}: ${s.title}`}>
                  S{s.id}
                  <select
                    value=""
                    onChange={(e) => e.target.value && setAll(s.id, e.target.value as ProgressStatus)}
                    title={`Set Session ${s.id} for every team`}
                    className="block mt-1 w-14 mx-auto border border-[#E8E2D9] rounded px-0.5 py-0.5 text-[10px] font-sans font-normal bg-white"
                  >
                    <option value="">all…</option>
                    {STATUS_ORDER.map((o) => (
                      <option key={o} value={o}>
                        {STATUS_LABEL[o]}
                      </option>
                    ))}
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((t) => (
              <tr key={t.id} className="border-b border-[#F0EBE3] last:border-0">
                <td className="px-4 py-2.5">
                  <div className="font-semibold">{projectLabel(t.project_id)}</div>
                  <div className="text-xs text-[#6E6D70]">
                    {students.filter((s) => s.team_id === t.id).map((s) => s.last_name).join(', ') || 'empty team'}
                  </div>
                </td>
                {SESSIONS.map((s) => {
                  const row = cell(t.id, s.id);
                  const st: ProgressStatus = row?.status ?? 'pending';
                  const active = sel?.teamId === t.id && sel.session === s.id;
                  return (
                    <td key={s.id} className="px-1.5 py-2 text-center">
                      <button
                        onClick={() => {
                          setSel({ teamId: t.id, session: s.id });
                          act(() => saveProgress({ team_id: t.id, session: s.id, status: next(st), note: row?.note ?? '' }));
                        }}
                        title={`${STATUS_LABEL[st]}${row?.note ? ': ' + row.note : ''} (click for next status)`}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer ${STATUS_STYLE[st].chip} ${
                          active ? 'ring-2 ring-[#E5391C]' : ''
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${STATUS_STYLE[st].dot}`} />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel && selTeam && (
        <div className="bg-white border-2 border-[#FAD6CF] rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="text-sm">
            <strong>{projectLabel(selTeam.project_id)}</strong> · Session {sel.session}: {SESSIONS.find((s) => s.id === sel.session)?.title}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => save(s, note)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold cursor-pointer ${STATUS_STYLE[s].chip} ${
                  selStatus === s ? 'ring-2 ring-[#E5391C]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${STATUS_STYLE[s].dot}`} /> {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
          <div className="flex items-start gap-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Note shown to students (optional), e.g. “Audit report received, good findings on grouping.”"
              className="flex-1 border border-[#E8E2D9] rounded-lg px-3 py-2 text-sm bg-[#FAF9F6]"
            />
            <button
              onClick={() => save(selStatus, note)}
              className="px-4 py-2 rounded-lg bg-[#E5391C] hover:bg-[#C92B10] text-white text-sm font-bold cursor-pointer"
            >
              Save note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
