import { Link } from 'react-router-dom';
import { CtaBand, PageHero } from '../components/page/PageParts.jsx';
import Catalogue, { programmeCount } from '../components/page/Catalogue.jsx';
import { ENROL_HREF, mailto, programmeFormats } from '../data/navigation.js';
import usePageTitle from './usePageTitle.js';

/** /programmes: overview of the six learning formats + the full catalogue. */
export default function ProgrammesPage() {
  usePageTitle('Programmes');
  return (
    <>
      <PageHero eyebrow="Programmes" title="Explore by learning format">
        One catalogue for everything you can enrol in at Edutou. Pick a format, then narrow it down by technology
        domain.
      </PageHero>

      <section className="edt-section">
        <div className="edt-container">
          <div className="edt-formats">
            {programmeFormats.map((f) => {
              const n = programmeCount(f.id);
              return (
                <Link key={f.id} to={f.path} className="edt-card edt-format">
                  <span className="edt-format__no">{f.no}</span>
                  <span className="edt-format__title">{f.title}</span>
                  <span className="edt-format__desc">{f.desc}</span>
                  <span className="edt-format__foot">
                    <span className="edt-format__count">{n ? `${n} programme${n > 1 ? 's' : ''}` : 'Coming soon'}</span>
                    <span className="edt-format__go">
                      View <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Catalogue />

      <CtaBand
        title="Not sure where to start?"
        text="Tell us your goals and background, and we will suggest the right programme."
        actions={[
          { label: 'Enrol Now', href: ENROL_HREF },
          { label: 'For institutions', href: mailto('Institutional programme enquiry') },
        ]}
      />
    </>
  );
}
