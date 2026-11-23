// Programme content comes from the CMS (admin.edutou.in) through the Edutou API.
// It is fetched once per visit and shared by every component through useSite().
import { useSyncExternalStore } from 'react';

export const API_URL = (import.meta.env.VITE_API_URL || 'https://api.edutou.in').replace(/\/+$/, '');

const EMPTY = { categories: [], domains: [], programmes: [], enrolForm: null };

// The last good copy is kept in the browser, so menus and programmes still show
// instantly on the next visit, and if the API is briefly unreachable.
const CACHE_KEY = 'edt-site-v1';
function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeCache(data) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage full or blocked: nothing to do */
  }
}

const cached = typeof window !== 'undefined' ? readCache() : null;
let state = cached ? { status: 'idle', error: null, stale: true, ...withPaths(cached) } : { status: 'idle', error: null, ...EMPTY };
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function withPaths(data) {
  const categories = data.categories.map((c) => ({ ...c, path: `/programmes/${c.id}` }));
  const programmes = data.programmes.map((p) => ({
    ...p,
    ...p.data,
    // The full page lives under the programme's main category.
    pagePath: p.data.page?.enabled ? `/programmes/${p.data.category}/${p.slug}` : null,
    enrolPath: `/enroll?programme=${encodeURIComponent(p.slug)}`,
  }));
  return { categories, domains: data.domains, programmes, enrolForm: data.enrolForm };
}

export function loadSite() {
  if (state.status === 'loading' || (state.status === 'ready' && !state.stale)) return;
  state = { ...state, status: state.stale ? 'ready' : 'loading', error: null, stale: state.stale, fetching: true };
  emit();
  fetch(`${API_URL}/api/cms/site`)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((body) => {
      writeCache(body.data);
      state = { status: 'ready', error: null, ...withPaths(body.data) };
      emit();
    })
    .catch((err) => {
      // Keep showing the cached copy if there is one.
      state = state.stale
        ? { ...state, status: 'ready', error: err.message }
        : { status: 'error', error: err.message, ...EMPTY };
      emit();
    });
}

export function retrySite() {
  state = { ...state, status: 'idle' };
  loadSite();
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** { status: 'loading' | 'ready' | 'error', categories, domains, programmes, enrolForm } */
export function useSite() {
  const snapshot = useSyncExternalStore(subscribe, () => state);
  if (snapshot.status === 'idle') loadSite();
  return snapshot;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const inCategory = (p, id) => p.category === id || (p.alsoIn ?? []).includes(id);

export const categoryTitle = (site, id) => site.categories.find((c) => c.id === id)?.title ?? id;

export function priceLabel(pricing) {
  if (!pricing || pricing.model === 'hidden') return '';
  if (pricing.model === 'free') return 'Free';
  if (pricing.amount != null) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: pricing.currency || 'INR',
      maximumFractionDigits: 0,
    }).format(pricing.amount);
  }
  return pricing.note || 'Paid';
}

/** "12 Dec 2026 · 7:00 PM IST" from a schedule, or '' when nothing is set. */
export function scheduleLabel(s) {
  if (!s) return '';
  const date = s.startDate
    ? new Date(`${s.startDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
  return [date, s.time].filter(Boolean).join(' · ');
}
