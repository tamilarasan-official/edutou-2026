import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const R = 21;

/** Floating "back to top" button with a ring that fills as the page scrolls. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => scrollY.on('change', (y) => setVisible(y > 700)), [scrollY]);

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
