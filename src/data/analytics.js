// Microsoft Clarity (session recordings, heatmaps, insights). The project id is
// managed in admin.edutou.in > Analytics & Event Tracking and arrives with the
// site content; nothing loads when it is empty (switched off).

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

/**
 * Custom event for Clarity, e.g. track('enrol_completed', { programme: slug }).
 * Tags make recordings filterable by programme; calls before Clarity loads are queued.
 */
export function track(event, tags = {}) {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  for (const [key, value] of Object.entries(tags)) {
    if (value) window.clarity('set', key, String(value).slice(0, 255));
  }
  window.clarity('event', event);
}
