import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { ArrowUpRight, Chevron } from './icons.jsx';
import { ENROL_HREF, aboutLinks, careerLinks, mainNav } from '../../data/navigation.js';
import { useSite } from '../../data/cms.js';

const CLOSE_DELAY = 140;

function ProgrammesPanel({ onNavigate }) {
  const { categories, domains } = useSite();
  return (
    <div className="edt-mega">
      <div className="edt-mega__main">
        <p className="edt-mega__label">Explore by learning format</p>
        <div className="edt-mega__grid">
          {categories.map((f) => (
            <Link key={f.id} to={f.path} className="edt-mega__item" onClick={onNavigate}>
              <span className="edt-mega__no">{f.no}</span>
              <span>
                <strong>{f.title}</strong>
                <small>{f.description}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="edt-mega__side">
        <p className="edt-mega__label">Browse by domain</p>
        <div className="edt-chips">
          {domains.map((d) => (
            <Link key={d} to={`/programmes?domain=${encodeURIComponent(d)}`} className="edt-chip" onClick={onNavigate}>
              {d}
            </Link>
          ))}
        </div>
        <Link to="/programmes" className="edt-mega__all" onClick={onNavigate}>
          Explore all programmes <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function ListPanel({ base, items, allLabel, onNavigate }) {
  return (
    <div className="edt-drop">
      {items.map((it) => (
        <Link key={it.id} to={it.path} className="edt-drop__item" onClick={onNavigate}>
          <strong>{it.title}</strong>
          <small>{it.desc}</small>
        </Link>
      ))}
      <Link to={base} className="edt-drop__all" onClick={onNavigate}>
        {allLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

const PANELS = {
  programmes: (close) => <ProgrammesPanel onNavigate={close} />,
  career: (close) => <ListPanel base="/career" items={careerLinks} allLabel="Career overview" onNavigate={close} />,
  about: (close) => <ListPanel base="/about" items={aboutLinks} allLabel="About Edutou" onNavigate={close} />,
};

function useMobileGroups() {
  const { categories } = useSite();
  return {
    programmes: [...categories.map((f) => ({ label: f.title, to: f.path })), { label: 'All programmes', to: '/programmes' }],
    career: [...careerLinks.map((c) => ({ label: c.title, to: c.path })), { label: 'Career overview', to: '/career' }],
    about: [...aboutLinks.map((a) => ({ label: a.title, to: a.path })), { label: 'About Edutou', to: '/about' }],
  };
}

/** Site header: utility bar, main navigation with dropdowns, mobile menu. */
export default function Navbar() {
  const MOBILE_GROUPS = useMobileGroups();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown id
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const closeTimer = useRef(0);
  const headerRef = useRef(null);
  const panelId = useId();

  // Glass header once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, []);

  // Close menus on navigation
  useEffect(closeAll, [location.pathname, location.search, location.hash, closeAll]);

  // Escape / outside click
  useEffect(() => {
    if (!openMenu && !mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeAll();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [openMenu, mobileOpen, closeAll]);

  // Lock page scroll behind the mobile menu; close it if the viewport grows
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && closeAll();
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener('change', onMq);
    };
  }, [mobileOpen, closeAll]);

  // Mouse: hover opens a dropdown and clicking the label goes to its overview
  // page. Keyboard / touch (no hover): click toggles the dropdown.
  const hoveredMenu = useRef(null);
  const hoverOpen = (e, id) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(closeTimer.current);
    hoveredMenu.current = id;
    setOpenMenu(id);
  };
  const hoverClose = (e) => {
    if (e.pointerType !== 'mouse') return;
    hoveredMenu.current = null;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };
  const onTriggerClick = (e, item) => {
    const mouseClick = e.detail > 0 && hoveredMenu.current === item.menu;
    if (mouseClick) {
      navigate(item.to);
      closeAll();
      return;
    }
    setOpenMenu((m) => (m === item.menu ? null : item.menu));
  };
  const closeMenu = () => setOpenMenu(null);

  const isActive = (item) => {
    if (item.to === '/') return location.pathname === '/' && !location.hash;
    if (item.to.startsWith('/#')) return location.pathname === '/' && location.hash === item.to.slice(1);
    return location.pathname.startsWith(item.to);
  };

  return (
    <header
      ref={headerRef}
      className={`edt-nav${scrolled ? ' is-scrolled' : ''}${mobileOpen ? ' is-mobile-open' : ''}${openMenu ? ' has-panel' : ''}`}
    >
      <div className="edt-nav__utility">
        <div className="edt-nav__inner">
          <span>For learners, institutions and industry</span>
          <Link to="/verify-certificate" className="edt-nav__utility-link">
            Verify Certificate <ArrowUpRight />
          </Link>
        </div>
      </div>

      <div className="edt-nav__bar">
        <div className="edt-nav__inner">
          <Logo />

          <nav className="edt-nav__links" aria-label="Main">
            <ul>
              {mainNav.map((item) =>
                item.menu ? (
                  <li
                    key={item.label}
                    className={`edt-nav__item edt-nav__item--${item.menu}`}
                    onPointerEnter={(e) => hoverOpen(e, item.menu)}
                    onPointerLeave={hoverClose}
                  >
                    <button
                      type="button"
                      className={`edt-nav__link${isActive(item) ? ' is-active' : ''}${openMenu === item.menu ? ' is-open' : ''}`}
                      aria-expanded={openMenu === item.menu}
                      aria-controls={`${panelId}-${item.menu}`}
                      onClick={(e) => onTriggerClick(e, item)}
                    >
                      {item.label}
                      <Chevron />
                    </button>
                    <div
                      id={`${panelId}-${item.menu}`}
                      className={`edt-nav__panel edt-nav__panel--${item.menu}${openMenu === item.menu ? ' is-open' : ''}`}
                      hidden={openMenu !== item.menu}
                    >
                      {PANELS[item.menu](closeMenu)}
                    </div>
                  </li>
                ) : (
                  <li key={item.label} className="edt-nav__item">
                    <NavLink to={item.to} className={() => `edt-nav__link${isActive(item) ? ' is-active' : ''}`} end>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <Link className="edt-btn edt-btn--primary edt-nav__cta" to={ENROL_HREF}>
            Enrol Now <ArrowUpRight />
          </Link>

          <button
            type="button"
            className="edt-nav__burger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={`${panelId}-mobile`}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Tablet / phone menu */}
      <div id={`${panelId}-mobile`} className="edt-mnav" hidden={!mobileOpen}>
        <nav aria-label="Mobile">
          <ul className="edt-mnav__list">
            {mainNav.map((item) =>
              item.menu ? (
                <li key={item.label} className={`edt-mnav__group${mobileGroup === item.menu ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="edt-mnav__link"
                    aria-expanded={mobileGroup === item.menu}
                    onClick={() => setMobileGroup((g) => (g === item.menu ? null : item.menu))}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <ul className="edt-mnav__sub" hidden={mobileGroup !== item.menu}>
                    {MOBILE_GROUPS[item.menu].map((s) => (
                      <li key={s.label}>
                        <Link to={s.to} onClick={closeAll}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`edt-mnav__link${isActive(item) ? ' is-active' : ''}`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="edt-mnav__footer">
            <Link className="edt-btn edt-btn--primary edt-btn--block" to={ENROL_HREF} onClick={closeAll}>
              Enrol Now <ArrowUpRight />
            </Link>
            <Link to="/verify-certificate" className="edt-mnav__utility" onClick={closeAll}>
              Verify Certificate <ArrowUpRight />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
