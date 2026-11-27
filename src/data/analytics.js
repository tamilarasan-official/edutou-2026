// Website analytics, managed in admin.edutou.in > Analytics & Event Tracking:
// Microsoft Clarity (recordings, heatmaps) and the Google tag (Tag Manager /
// Google Analytics). IDs arrive with the site content; an empty ID means off.

let loadedId = null;

export function initClarity(projectId) {
  if (typeof window === 'undefined' || !projectId || loadedId) return;
  if (!/^[a-z0-9]{4,40}$/i.test(projectId)) return;
  loadedId = projectId;
  // Official Clarity snippet: a queueing stub, then the tag script.
  (function (c, l, a, r, i) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    t.src = `https://www.clarity.ms/tag/${i}`;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', projectId);
}

let googleId = null;

/** Google tag, as in Google's install snippet (GTM-… container, or G-… / AW-… directly). */
export function initGoogleTag(tagId) {
  if (typeof window === 'undefined' || !tagId || googleId) return;
  if (!/^(GTM|G|AW)-[A-Z0-9]{4,16}$/.test(tagId)) return;
  googleId = tagId;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  const isContainer = tagId.startsWith('GTM-');
  if (!isContainer) window.gtag('config', tagId);
  const s = document.createElement('script');
  s.async = true;
  s.src = isContainer
    ? `https://www.googletagmanager.com/gtm.js?id=${tagId}`
    : `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  document.head.appendChild(s);
}

/**
 * Custom event, e.g. track('enrol_completed', { programme: slug }).
 * Clarity: tags make recordings filterable by programme. Google: pushed to the
 * dataLayer as { event, programme }, usable as a Tag Manager trigger or a GA4
 * event. Calls before either script loads are queued.
 */
export function track(event, tags = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.clarity === 'function') {
    for (const [key, value] of Object.entries(tags)) {
      if (value) window.clarity('set', key, String(value).slice(0, 255));
    }
    window.clarity('event', event);
  }
  if (googleId && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...tags });
  }
}
