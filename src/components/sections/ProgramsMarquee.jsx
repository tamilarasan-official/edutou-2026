import ShinyText from '../fx/ShinyText.jsx';
import { programSessions, programTracks } from '../../data/site.js';

function Row({ items, reverse, duration }) {
  // Items are rendered twice; the track slides by one copy for a seamless loop.
  return (
    <div className="edt-programs__row">
      <div
        className={`edt-programs__track${reverse ? ' is-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) =>
          items.map((label) => (
            <span key={`${copy}-${label}`} className="edt-pill" aria-hidden={copy === 1 || undefined}>
              <span className="edt-pill__dot" />
              {label}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

/** "What we teach" band: two rows of program topics drifting in opposite directions. */
export default function ProgramsMarquee() {
  return (
    <section className="edt-programs" data-framer-name="Programs">
      <div className="edt-gallery__head">
        <span className="edt-eyebrow">
          <ShinyText>What we teach</ShinyText>
        </span>
        <h2 className="edt-gallery__title">Learn by building</h2>
        <p className="edt-gallery__sub">
          From our 3-day Vibe Coding bootcamp to Data Science &amp; Generative AI, every track is hands-on and
          project-first.
        </p>
      </div>
      <div className="edt-programs__rows">
        <Row items={programTracks} duration={46} />
        <Row items={programSessions} duration={52} reverse />
      </div>
    </section>
  );
}
