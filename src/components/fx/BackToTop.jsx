import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const R = 21;
const PHONE = '(max-width: 809.98px)';

/**
 * Floating "back to top" button with a ring that fills as the page scrolls.
 * On phones there is no free corner (cards and FAQ toggles reach the screen
 * edge), so it only appears once the footer is on screen.
 */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolledDown, setScrolledDown] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [isPhone, setIsPhone] = useState(() => window.matchMedia(PHONE).matches);

  useEffect(() => scrollY.on('change', (y) => setScrolledDown(y > 700)), [scrollY]);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const onChange = () => setIsPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isPhone) return undefined;
    const footer = [...document.querySelectorAll('footer')].find((f) => f.getClientRects().length);
    if (!footer) return undefined;
    const io = new IntersectionObserver(([e]) => setFooterInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(footer);
    return () => io.disconnect();
  }, [isPhone]);

  const visible = isPhone ? footerInView : scrolledDown;

  const toTop = () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <button
      type="button"
      className={`edt-to-top${visible ? ' is-visible' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle className="edt-to-top__track" cx="24" cy="24" r={R} />
        <motion.circle
          className="edt-to-top__ring"
          cx="24"
          cy="24"
          r={R}
          transform="rotate(-90 24 24)"
          style={{ pathLength: scrollYProgress }}
        />
        <path className="edt-to-top__arrow" d="M24 31V17m0 0-6 6m6-6 6 6" />
      </svg>
    </button>
  );
}
