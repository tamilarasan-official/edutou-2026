import { institutions } from '../../data/site.js';
import ShinyText from '../fx/ShinyText.jsx';

/** "Institutions we've worked with" strip shown under the hero. */
export default function ClientsStrip() {
  return (
    <section className="edt-clients" data-framer-name="Clients">
      <ShinyText as="p" className="edt-clients__label">
        Institutions we’ve worked with
      </ShinyText>
      <div className="edt-clients__row">
        {institutions.map((name, i) => (
          <span key={name} className="edt-client edt-beam" style={{ '--edt-beam-delay': `${-i * 2}s` }}>
            <span className="edt-client__dot" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
