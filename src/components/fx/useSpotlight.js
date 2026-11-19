import { useEffect } from 'react';

/**
 * Cursor-following glow on cards (React Bits "SpotlightCard" style) without
 * touching the cards' markup: one delegated pointer listener writes the cursor
 * position into CSS variables on the hovered card; the glow itself is drawn by
 * a `::before` rule in enhancements.css for the same selectors.
 */
export default function useSpotlight(rootRef, selector) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frame = 0;
    let last = null;
    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = last.target instanceof Element ? last.target.closest(selector) : null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--edt-mx', `${last.clientX - r.left}px`);
        card.style.setProperty('--edt-my', `${last.clientY - r.top}px`);
      });
    };
    root.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
    };
  }, [rootRef, selector]);
}
