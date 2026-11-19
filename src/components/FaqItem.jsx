import { useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

// Transition used by the Framer FAQ component when switching Open <-> Closed.
const TRANSITION = { type: 'spring', bounce: 0.1, duration: 0.4 };

const ORANGE = 'var(--token-83878271-40bd-4314-b766-4d665555aa78, rgb(255, 77, 0))';
const BAR_STYLE = {
  backgroundColor: ORANGE,
  borderBottomLeftRadius: '1px',
  borderBottomRightRadius: '1px',
  borderTopLeftRadius: '1px',
  borderTopRightRadius: '1px',
};
const CARD_STYLE = {
  '--border-bottom-width': '1px',
  '--border-color': 'var(--token-18d2a01a-9676-41c1-bf6d-4772415cc68b, rgb(62, 32, 19))',
  '--border-left-width': '1px',
  '--border-right-width': '1px',
  '--border-style': 'solid',
  '--border-top-width': '1px',
  backgroundColor: 'var(--token-b9018599-27d5-4611-a33e-8b2f64661ff4, rgb(28, 28, 28))',
  width: '100%',
  borderBottomLeftRadius: '15px',
  borderBottomRightRadius: '15px',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
};

/**
 * One FAQ accordion row. Markup mirrors the Framer component's "Open" and
 * "Closed" variants exactly; `container` is the Framer layout wrapper class.
 */
export default function FaqItem({ container, question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const cardRef = useRef(null);
  const plusRef = useRef(null);
  const fromHeight = useRef(null);

  const toggle = () => {
    fromHeight.current = cardRef.current.offsetHeight;
    setOpen((o) => !o);
  };

  // Smoothly animate the height change and the +/− icon rotation.
  useLayoutEffect(() => {
    const card = cardRef.current;
    const from = fromHeight.current;
    if (from == null) return undefined;
    fromHeight.current = null;
    const controls = [];
    const release = () => {
      card.style.height = '';
      card.style.overflow = '';
    };
    const to = card.offsetHeight;
    if (from !== to) {
      card.style.overflow = 'hidden';
      const heightAnim = animate(card, { height: [`${from}px`, `${to}px`] }, TRANSITION);
      heightAnim.then(release); // hand height back to CSS so text can reflow
      controls.push(heightAnim);
    }
    controls.push(animate(plusRef.current, { rotate: open ? [90, 0] : [0, 90] }, TRANSITION));
    return () => {
      controls.forEach((c) => c.stop());
      release();
    };
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={container} style={{ willChange: 'transform', opacity: '0', transform: 'translateY(50px)' }}>
      <div
        ref={cardRef}
        className={`framer-cfihB framer-VgD3q framer-GiAC3 framer-msoe5i ${open ? 'framer-v-msoe5i' : 'framer-v-z77vuo'}`}
        data-border="true"
        data-framer-name={open ? 'Open' : 'Closed'}
        data-highlight="true"
        style={CARD_STYLE}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <div className="framer-ydzaqy" data-framer-name="Container">
          <div className="framer-19ou2ru" data-framer-name="Content">
            <div className="framer-1l8f05v" data-framer-name="Heading">
              <div className="framer-1apfewt" style={{ '--extracted-1lwpl3i': ORANGE, transform: 'none' }}>
                <h5
                  className="framer-text framer-styles-preset-1xzp3bx"
                  data-styles-preset="doBuay73R"
                  style={open ? { '--framer-text-color': `var(--extracted-1lwpl3i, ${ORANGE})` } : undefined}
                >
                  {question}
                </h5>
              </div>
              <div className="framer-1e45t5w" data-framer-name="Icon">
                <div
                  ref={plusRef}
                  className="framer-1dnucf6"
                  data-framer-name="Plus"
                  style={{ transform: open ? 'none' : 'rotate(90deg)' }}
                >
                  <div className="framer-1xuhs5x" style={BAR_STYLE} />
                  {!open && <div className="framer-1jeieso" style={{ ...BAR_STYLE, transform: 'rotate(90deg)' }} />}
                </div>
              </div>
            </div>
            {open && (
              <div className="framer-1rfnxys" style={{ opacity: '0.8', transform: 'none' }}>
                <p className="framer-text framer-styles-preset-4mzurx" data-styles-preset="C5Bqm4Y89">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
