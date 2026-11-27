// Programme content comes from the CMS (admin.edutou.in) through the Edutou API.
// It is fetched once per visit and shared by every component through useSite().
import { useSyncExternalStore } from 'react';
import { initClarity, initGoogleTag } from './analytics.js';

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
  initClarity(data.analytics?.clarityProjectId);
  initGoogleTag(data.analytics?.googleTagId);
  return { categories, domains: data.domains, programmes, enrolForm: data.enrolForm, paymentsOnline: Boolean(data.paymentsOnline) };
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

export function formatMoney(amount, currency = 'INR') {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
    style: 'currency',
    currency: currency || 'INR',
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

/**
 * Price parts for display: { now: '₹99', was: '₹199', off: 50 } for an offer,
 * { now: '₹99' } normally, { now: 'Free' }, or null when the price is hidden.
 */
export function priceParts(pricing) {
  if (!pricing || pricing.model === 'hidden') return null;
  if (pricing.model === 'free') return { now: 'Free', free: true };
  if (pricing.amount == null) return { now: pricing.note || 'Paid' };
  const now = formatMoney(pricing.amount, pricing.currency);
  if (pricing.showCompareAt && pricing.compareAtAmount != null && pricing.compareAtAmount > pricing.amount) {
    return {
      now,
      was: formatMoney(pricing.compareAtAmount, pricing.currency),
      off: Math.round((1 - pricing.amount / pricing.compareAtAmount) * 100),
    };
  }
  return { now };
}

/** Plain text, e.g. "₹99" (used where markup is not wanted). */
export function priceLabel(pricing) {
  return priceParts(pricing)?.now ?? '';
}

/** True when the enrol page should take payment with Razorpay. */
export const paysOnline = (p) =>
  Boolean(state.paymentsOnline) && p?.pricing?.model === 'paid' && p.pricing.amount > 0 && Boolean(p.payment?.collectOnline);

/** "12 Dec 2026 · 7:00 PM IST" from a schedule, or '' when nothing is set. */
export function scheduleLabel(s) {
  if (!s) return '';
  const date = s.startDate
    ? new Date(`${s.startDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
  return [date, s.time].filter(Boolean).join(' · ');
}
