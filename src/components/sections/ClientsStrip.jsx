import { institutions } from '../../data/site.js';

/** "Institutions we've worked with" strip shown under the hero. */
export default function ClientsStrip() {
  return (
    <section className="edt-clients" data-framer-name="Clients">
      <p className="edt-clients__label">Institutions we’ve worked with</p>
      <div className="edt-clients__row">
        {institutions.map((name) => (
          <span key={name} className="edt-client">
            <span className="edt-client__dot" />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
