import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 96; // keep anchored sections clear of the fixed header

function scrollToHash(hash, smooth) {
  const id = decodeURIComponent(hash.slice(1));
  const el = id && document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

/**
 * Scroll behaviour for client-side navigation: new pages start at the top,
 * links with a #hash land on that section (waiting briefly for it to render).
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tries = 0;
    let timer;
    const attempt = () => {
      if (scrollToHash(hash, smooth) || ++tries > 20) return;
      timer = setTimeout(attempt, 50);
    };
    attempt();
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
