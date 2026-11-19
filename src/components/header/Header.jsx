import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { DesktopNav, PhoneNavClosed, PhoneNavOpen, TabletNavClosed, TabletNavOpen } from './NavVariants.jsx';

// Framer nav component: opening uses this spring, closing is instant.
const OPEN_TRANSITION = { type: 'spring', bounce: 0.1, duration: 0.6 };

// Only one breakpoint variant is displayed at a time; find the one on screen.
const visibleNav = (root) => [...(root?.querySelectorAll('nav') ?? [])].find((n) => n.offsetHeight > 0);

/**
 * Fixed site header. Desktop shows the inline menu; tablet and phone show a
 * hamburger that expands into the full menu (tap anywhere on it to close).
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const closedHeight = useRef(null);

  const toggle = useCallback((e) => {
    e.stopPropagation();
    closedHeight.current = visibleNav(rootRef.current)?.offsetHeight ?? null;
    setOpen((o) => !o);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // Scrolled state: lets the collapsed mobile/tablet nav get a backdrop (responsive.css).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Expand animation when the menu opens.
  useLayoutEffect(() => {
    if (!open || closedHeight.current == null) return undefined;
    const nav = visibleNav(rootRef.current);
    const from = closedHeight.current;
    closedHeight.current = null;
    if (!nav) return undefined;
    const to = nav.offsetHeight;
    const release = () => {
      nav.style.height = '';
      nav.style.overflow = '';
    };
    nav.style.overflow = 'hidden';
    const ctrl = animate(nav, { height: [`${from}px`, `${to}px`] }, OPEN_TRANSITION);
    ctrl.then(release);
    return () => {
      ctrl.stop();
      release();
    };
  }, [open]);

  // Close on Escape, and if the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1200px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`framer-173048b-container${scrolled ? ' is-scrolled' : ''}`}
      data-framer-layout-hint-center-x="true"
    >
      <div className="ssr-variant hidden-s11egd hidden-10qoyt0">
        <DesktopNav />
      </div>
      <div className="ssr-variant hidden-10qoyt0 hidden-1rjbxzi">
        {open ? <PhoneNavOpen onClose={close} /> : <PhoneNavClosed onToggle={toggle} />}
      </div>
      <div className="ssr-variant hidden-s11egd hidden-1rjbxzi">
        {open ? <TabletNavOpen onClose={close} /> : <TabletNavClosed onToggle={toggle} />}
      </div>
    </div>
  );
}
