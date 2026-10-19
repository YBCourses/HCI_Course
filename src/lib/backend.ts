import { BACKEND_ANON_KEY, BACKEND_URL, TEACHER_EMAIL, isBackendConfigured } from '../config/backend';

/**
 * Minimal client for the Supabase backend (plain fetch, no dependency).
 *  - Public, read-only: team members (last names) and progress per project.
 *  - Teacher only (signed in with an e-mail one-time code): the full roster, teams, project assignments
 *    and progress. The database refuses everything else, whatever this file does.
 */

export type ProgressStatus = 'pending' | 'working' | 'sent' | 'reviewed';

export const STATUS_ORDER: ProgressStatus[] = ['pending', 'working', 'sent', 'reviewed'];
export const STATUS_LABEL: Record<ProgressStatus, string> = {
  pending: 'Not started',
  working: 'Working on it',
  sent: 'Report sent',
  reviewed: 'Feedback given',
};

export interface Student {
  id: string;
  last_name: string;
  first_name: string;
  team_id: string | null;
}
export interface Team {
  id: string;
  project_id: number | null;
}
export interface ProgressRow {
  team_id: string;
  session: number;
  status: ProgressStatus;
  note: string;
}
export interface PublicOverview {
  members: { project_id: number; last_name: string }[];
  progress: { project_id: number; session: number; status: ProgressStatus; note: string }[];
}
export interface RosterData {
  students: Student[];
  teams: Team[];
  progress: ProgressRow[];
}

export { isBackendConfigured, TEACHER_EMAIL };

/* ------------------------------------------------------------------ session */

interface StoredSession {
  access_token: string;
  refresh_token: string;
  /** seconds since epoch */
  expires_at: number;
  email: string;
}

const KEY = 'hci.teacher.session';
const listeners = new Set<() => void>();

const readSession = (): StoredSession | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
};
const writeSession = (s: StoredSession | null) => {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable: the session just lasts for this page */
  }
  listeners.forEach((l) => l());
};

let memorySession: StoredSession | null = null;

/** The current teacher session, or null. Only the teacher's e-mail ever counts. */
export const getSession = (): StoredSession | null => {
  const s = memorySession ?? readSession();
  if (!s) return null;
  if (s.email.toLowerCase() !== TEACHER_EMAIL.toLowerCase()) return null;
  return s;
};

export const subscribeSession = (cb: () => void): (() => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const toStored = (j: any): StoredSession => ({
  access_token: j.access_token,
  refresh_token: j.refresh_token,
  expires_at: j.expires_at ?? Math.floor(Date.now() / 1000) + (j.expires_in ?? 3600),
  email: String(j.user?.email ?? ''),
});

const authFetch = async (path: string, body: unknown): Promise<any> => {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { apikey: BACKEND_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* not json */
  }
  if (!res.ok) {
    const msg = json?.msg || json?.error_description || json?.message || json?.error || `Request failed (${res.status})`;
    throw new Error(String(msg));
  }
  return json;
};

/** Step 1: ask for a 6-digit code by e-mail. Never creates accounts. */
export const requestOtp = async (email: string): Promise<void> => {
  if (email.trim().toLowerCase() !== TEACHER_EMAIL.toLowerCase()) {
    throw new Error('This e-mail address is not authorized.');
  }
  // The e-mail contains a code and/or a link. The link returns to this page (it must be allowed in the
  // backend's redirect URL settings); both ways of signing in end in the same session.
  const back = encodeURIComponent(window.location.origin + window.location.pathname + '?teacher');
  await authFetch(`/auth/v1/otp?redirect_to=${back}`, { email: TEACHER_EMAIL, create_user: false });
};

/** Step 2: exchange the code for a session. */
export const verifyOtp = async (email: string, code: string): Promise<void> => {
  const json = await authFetch('/auth/v1/verify', { type: 'email', email: email.trim(), token: code.trim() });
  const s = toStored(json);
  if (s.email.toLowerCase() !== TEACHER_EMAIL.toLowerCase()) {
    writeSession(null);
    throw new Error('This e-mail address is not authorized.');
  }
  memorySession = s;
  writeSession(s);
};

const emailFromJwt = (jwt: string): string => {
  try {
    const part = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(decodeURIComponent(escape(atob(part + '='.repeat((4 - (part.length % 4)) % 4)))));
    return String(json.email ?? '');
  } catch {
    return '';
  }
};

/**
 * When the teacher clicks the link in the sign-in e-mail, the backend sends the browser back here with the
 * session in the URL fragment. Store it (teacher e-mail only) and clean the address bar.
 */
export const consumeAuthRedirect = (): void => {
  if (typeof window === 'undefined' || !window.location.hash.includes('access_token=')) return;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const access = params.get('access_token');
  const refresh = params.get('refresh_token');
  if (access && refresh) {
    const email = emailFromJwt(access);
    const expiresIn = Number(params.get('expires_in') ?? 3600);
    if (email.toLowerCase() === TEACHER_EMAIL.toLowerCase()) {
      const s: StoredSession = {
        access_token: access,
        refresh_token: refresh,
        expires_at: Number(params.get('expires_at')) || Math.floor(Date.now() / 1000) + expiresIn,
        email,
      };
      memorySession = s;
      writeSession(s);
    }
  }
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
};

export const signOut = (): void => {
  memorySession = null;
  writeSession(null);
};

const ensureFreshToken = async (): Promise<string | null> => {
  const s = getSession();
  if (!s) return null;
  if (s.expires_at - 60 > Date.now() / 1000) return s.access_token;
  try {
    const json = await authFetch('/auth/v1/token?grant_type=refresh_token', { refresh_token: s.refresh_token });
    const next = toStored(json);
    memorySession = next;
    writeSession(next);
    return next.access_token;
  } catch {
    signOut();
    return null;
  }
};

/* --------------------------------------------------------------------- data */

const rest = async (path: string, init: RequestInit & { admin?: boolean } = {}): Promise<any> => {
  const { admin, ...rest } = init;
  let token = BACKEND_ANON_KEY;
  if (admin) {
    const t = await ensureFreshToken();
    if (!t) throw new Error('Not signed in.');
    token = t;
  }
  const res = await fetch(`${BACKEND_URL}/rest/v1/${path}`, {
    ...rest,
    headers: {
      apikey: BACKEND_ANON_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(rest.headers ?? {}),
    },
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
  return json;
};

/** Public read-only overview (last names and progress per project). Returns null when not configured/unreachable. */
export const fetchPublicOverview = async (): Promise<PublicOverview | null> => {
  if (!isBackendConfigured()) return null;
  try {
    const [members, progress] = await Promise.all([
      rest('public_team_members?select=project_id,last_name&order=last_name'),
      rest('public_team_progress?select=project_id,session,status,note&order=session'),
    ]);
    return { members: members ?? [], progress: progress ?? [] };
  } catch {
    return null;
  }
};

/** Teacher: everything. */
export const fetchRoster = async (): Promise<RosterData> => {
  const [students, teams, progress] = await Promise.all([
    rest('students?select=*&order=last_name', { admin: true }),
    rest('teams?select=*&order=created_at', { admin: true }),
    rest('progress?select=*', { admin: true }),
  ]);
  return { students: students ?? [], teams: teams ?? [], progress: progress ?? [] };
};

const json = (o: unknown) => JSON.stringify(o);

export const addStudent = (s: { last_name: string; first_name: string; team_id: string | null }): Promise<Student[]> =>
  rest('students', { method: 'POST', admin: true, headers: { Prefer: 'return=representation' }, body: json(s) });

export const updateStudent = (id: string, patch: Partial<Omit<Student, 'id'>>): Promise<void> =>
  rest(`students?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', admin: true, body: json(patch) });

export const deleteStudent = (id: string): Promise<void> =>
  rest(`students?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', admin: true });

export const addTeam = (project_id: number | null): Promise<Team[]> =>
  rest('teams', { method: 'POST', admin: true, headers: { Prefer: 'return=representation' }, body: json({ project_id }) });

export const updateTeam = (id: string, patch: { project_id: number | null }): Promise<void> =>
  rest(`teams?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', admin: true, body: json(patch) });

export const deleteTeam = (id: string): Promise<void> =>
  rest(`teams?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', admin: true });

export const saveProgress = (row: ProgressRow): Promise<void> =>
  rest('progress?on_conflict=team_id,session', {
    method: 'POST',
    admin: true,
    headers: { Prefer: 'resolution=merge-duplicates' },
    body: json({ ...row, updated_at: new Date().toISOString() }),
  });

/** Best status for a project/session when several rows exist (reviewed > sent > working > pending). */
export const bestStatus = (rows: { status: ProgressStatus }[]): ProgressStatus | null => {
  if (!rows.length) return null;
  return rows.reduce((a, b) => (STATUS_ORDER.indexOf(b.status) > STATUS_ORDER.indexOf(a.status) ? b : a)).status;
};

/* ------------------------------------------------------------ session release */

/** Which sessions students may open. Null when the backend is not configured or unreachable. */
export const fetchReleases = async (): Promise<Record<number, boolean> | null> => {
  if (!isBackendConfigured()) return null;
  try {
    const rows: { session: number; released: boolean }[] = await rest('session_release?select=session,released');
    if (!Array.isArray(rows) || rows.length === 0) return null;
    return Object.fromEntries(rows.map((r) => [r.session, !!r.released]));
  } catch {
    return null;
  }
};

export const saveRelease = (session: number, released: boolean): Promise<void> =>
  rest('session_release?on_conflict=session', {
    method: 'POST',
    admin: true,
    headers: { Prefer: 'resolution=merge-duplicates' },
    body: json({ session, released, updated_at: new Date().toISOString() }),
  });
