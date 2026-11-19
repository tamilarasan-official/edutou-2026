import { useLayoutEffect } from 'react';
import { animate } from 'framer-motion';
import appearConfig from './appearConfig.json';
import effectsConfig from './effectsConfig.json';

/*
 * Re-creates the motion design of the original Framer page:
 *  - "appear" animations that play once on page load (data-framer-appear-id)
 *  - scroll reveals that play once when an element (or a trigger section) enters the viewport
 *  - looping animations (hero shimmer, intro slider)
 *  - word-by-word text reveals
 * All timings/springs come straight from the Framer project (see effectsConfig.json
 * and appearConfig.json); per-breakpoint overrides are honoured.
 */

const MEDIA = {
  desktop: '(min-width: 1200px)',
  tablet: '(min-width: 810px) and (max-width: 1199.98px)',
  phone: '(max-width: 809.98px)',
};
const APPEAR_HASH = { desktop: '72rtr7', tablet: '19c3vgf', phone: '5qv5n' };

export function currentBreakpoint() {
  if (window.matchMedia(MEDIA.desktop).matches) return 'desktop';
  if (window.matchMedia(MEDIA.tablet).matches) return 'tablet';
  return 'phone';
}

const DEFAULTS = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0 };

// Same ordering/format as Framer Motion's buildTransform.
function transformString(v, template) {
  const parts = [];
  if (v.transformPerspective) parts.push(`perspective(${v.transformPerspective}px)`);
  if (v.x) parts.push(`translateX(${v.x}px)`);
  if (v.y) parts.push(`translateY(${v.y}px)`);
  if (v.scale !== undefined && v.scale !== 1) parts.push(`scale(${v.scale})`);
  if (v.rotate) parts.push(`rotate(${v.rotate}deg)`);
  if (v.rotateX) parts.push(`rotateX(${v.rotateX}deg)`);
  if (v.rotateY) parts.push(`rotateY(${v.rotateY}deg)`);
  if (v.skewX) parts.push(`skewX(${v.skewX}deg)`);
  if (v.skewY) parts.push(`skewY(${v.skewY}deg)`);
  // At rest Framer keeps `perspective(...)` (a 3D layer), so only drop to `none`
  // when there is no perspective either.
  const generated = parts.join(' ');
  if (template) return `${template} ${generated}`.trim();
  return generated || 'none';
}

function blurOf(f) {
  const m = /blur\(([\d.]+)px\)/.exec(f || '');
  return m ? parseFloat(m[1]) : 0;
}

function applyState(el, v, template) {
  if (v.opacity !== undefined) el.style.opacity = String(Math.min(1, Math.max(0, v.opacity)));
  el.style.transform = transformString(v, template);
  // Framer leaves `blur(0px)` (not `none`) once a blur has animated out.
  if (v.blur !== undefined) el.style.filter = `blur(${Math.max(0, v.blur)}px)`;
}

const KEYS = ['opacity', 'x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY', 'skewX', 'skewY', 'blur'];
function normalise(state) {
  const s = { ...DEFAULTS, ...state };
  if (state.filter !== undefined) s.blur = blurOf(state.filter);
  delete s.filter;
  return s;
}

/** Animate `el` from state `from` to state `to` with a Framer transition. */
function tween(el, from, to, transition, { template, perspective, ...extra } = {}) {
  const a = normalise(from);
  const b = normalise(to);
  if (a.blur !== undefined && b.blur === undefined) b.blur = 0;
  if (b.blur !== undefined && a.blur === undefined) a.blur = 0;
  const frame = (p) => {
    const v = { transformPerspective: perspective };
    for (const k of KEYS) {
      if (a[k] === undefined) continue;
      v[k] = a[k] + (b[k] - a[k]) * p;
    }
    applyState(el, v, template);
  };
  // Framer Motion promotes every element it animates.
  el.style.willChange = 'transform';
  frame(0);
  const { type = 'spring', ...rest } = transition || {};
  return animate(0, 1, { type, ...rest, ...extra, onUpdate: frame });
}

const visible = (el) => el.getClientRects().length > 0;

/**
 * Framer keeps an element's stylesheet transform (e.g. `translate(-50%)` used for
 * centring) as a prefix while it animates. Read that base transform with the
 * inline transform removed and express pure translations in % like Framer does.
 */
function baseTransform(el) {
  const inline = el.style.transform;
  // Centre-anchored layers carry Framer's centring prefix inline (no CSS transform).
  const prefix = /^(translate\(-50%, -50%\)|translateX\(-50%\)|translateY\(-50%\))/.exec(inline);
  if (prefix) return prefix[1];
  el.style.transform = '';
  const css = getComputedStyle(el).transform;
  el.style.transform = inline;
  if (!css || css === 'none') return undefined;
  const m = new DOMMatrixReadOnly(css);
  if (!m.is2D || m.a !== 1 || m.b !== 0 || m.c !== 0 || m.d !== 1) return css;
  const pct = (v, size) => (size ? Math.round((v / size) * 10000) / 100 : 0);
  const px = pct(m.e, el.offsetWidth);
  const py = pct(m.f, el.offsetHeight);
  if (px === 0 && py === 0) return undefined;
  return py === 0 ? `translateX(${px}%)` : `translate(${px}%, ${py}%)`;
}

export default function useFramerEffects(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const bp = currentBreakpoint();
    const controls = [];
    const observers = [];
    const stopAll = () => {
      controls.forEach((c) => c.stop());
      observers.forEach((o) => o.disconnect());
    };

    const onceInView = (target, threshold, cb) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            cb();
          }
        },
        { threshold: threshold || 0 },
      );
      io.observe(target);
      observers.push(io);
    };

    // 1) Page-load appear animations
    root.querySelectorAll('[data-framer-appear-id]').forEach((el) => {
      const cfg = appearConfig[el.dataset.framerAppearId];
      if (!cfg) return;
      const variant = cfg[APPEAR_HASH[bp]] || cfg.default;
      const { transition, ...to } = variant.animate;
      const from = variant.initial;
      controls.push(
        tween(el, from, to, transition, {
          perspective: from.transformPerspective || to.transformPerspective,
          template: baseTransform(el),
        }),
      );
    });

    // 2) Scroll reveals
    for (const r of effectsConfig.reveals) {
      const cfg = { ...r, ...(r[bp] || {}) };
      root.querySelectorAll(r.selector).forEach((el) => {
        if (cfg.enabled === false) {
          el.style.opacity = '';
          el.style.transform = '';
          return;
        }
        const enter = cfg.enter;
        const opts = { template: cfg.transformTemplate ?? baseTransform(el), perspective: enter.transformPerspective };
        applyState(el, normalise(enter), opts.template);
        const trigger = cfg.target
          ? [...root.querySelectorAll(cfg.target)].find(visible) || root.querySelector(cfg.target)
          : el;
        if (!trigger) return;
        onceInView(trigger, cfg.threshold, () => {
          controls.push(tween(el, enter, { opacity: cfg.opacity }, cfg.transition, opts));
        });
      });
    }

    // 3) Loops
    for (const l of effectsConfig.loops) {
      root.querySelectorAll(l.selector).forEach((el) => {
        const template = baseTransform(el);
        const make = () =>
          tween(el, {}, l.to, l.transition, {
            template,
            repeat: Infinity,
            repeatType: l.repeatType === 'mirror' ? 'mirror' : 'loop',
            repeatDelay: l.repeatDelay,
          });
        let ctrl = make();
        controls.push({ stop: () => ctrl.stop() });
        if (l.pauseOffscreen) {
          const io = new IntersectionObserver(([e]) => (e.isIntersecting ? ctrl.play() : ctrl.pause()));
          io.observe(el);
          observers.push(io);
        }
      });
    }

    // 4) Word-by-word text reveals
    for (const t of effectsConfig.textEffects) {
      const cfg = { ...t, ...(t[bp] || {}) };
      root.querySelectorAll(t.selector).forEach((host) => {
        const words = [...host.querySelectorAll('p > span')];
        words.forEach((w) => applyState(w, normalise(cfg.from)));
        const run = () =>
          words.forEach((w, i) => {
            const { delay = 0, ...transition } = cfg.transition;
            controls.push(tween(w, cfg.from, {}, { ...transition, delay: cfg.startDelay + i * delay }));
          });
        if (cfg.trigger === 'inView') onceInView(host, 0, run);
        else run();
      });
    }

    return stopAll;
  }, [rootRef]);
}
