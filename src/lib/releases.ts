import { useEffect, useSyncExternalStore } from 'react';
import { fetchReleases } from './backend';

/** Sessions that have slides in the app. */
export const BUILT_SESSIONS = [1, 2, 3, 4];
/** Used until the database answers (or when it cannot): the two finished sessions stay open. */
const DEFAULT_RELEASED: Record<number, boolean> = { 1: true, 2: true };

let state: Record<number, boolean> = DEFAULT_RELEASED;
/** True once the database answered (or failed, or took too long): until then nothing is shown to students. */
let ready = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const refreshReleases = async () => {
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
  const next = await Promise.race([fetchReleases(), timeout]);
  if (next) state = next;
  ready = true;
  emit();
};
export const setReleasesLocal = (next: Record<number, boolean>) => {
  state = next;
  emit();
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

/** The release map, kept fresh (reloaded on start and whenever the tab becomes visible again). */
export const useReleases = (): Record<number, boolean> => {
  useEffect(() => {
    refreshReleases();
    const onVis = () => document.visibilityState === 'visible' && refreshReleases();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => DEFAULT_RELEASED,
  );
};

/** Can this session be opened? Teachers (signed in) can open every built session. */
export const canOpenSession = (id: number, releases: Record<number, boolean>, teacher: boolean): boolean =>
  BUILT_SESSIONS.includes(id) && (teacher || releases[id] === true);

/** False until the first answer about which sessions are open has arrived. */
export const useReleasesReady = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
