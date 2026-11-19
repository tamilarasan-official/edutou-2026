import { Link } from 'react-router-dom';
import { CtaBand, PageHero, Photos, SectionHead } from '../components/page/PageParts.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { ENROL_HREF, mailto } from '../data/navigation.js';
import { career } from '../data/pages.js';
import usePageTitle from './usePageTitle.js';

/** /career: internships, live projects, industry exposure, career development. */
export default function CareerPage() {
  usePageTitle('Career');
  return (
    <>
      <PageHero eyebrow="Career" title="Build your career while you learn">
        Practical experience is part of every Edutou journey: internships, live projects, industry exposure and career
        development.
      </PageHero>

      <section className="edt-section">
        <div className="edt-container">
          <nav className="edt-jump" aria-label="On this page">
            {career.map((c, i) => (
              <Link key={c.id} to={`/career#${c.id}`} className="edt-card edt-jump__item">
                <span className="edt-jump__no">{String(i + 1).padStart(2, '0')}</span>
                <span>{c.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {career.map((c, i) => (
        <section key={c.id} id={c.id} className="edt-section edt-split-section">
          <div className={`edt-container edt-split${i % 2 ? ' edt-split--flip' : ''}`}>
            <div className="edt-split__text">
              <SectionHead no={String(i + 1).padStart(2, '0')} title={c.title} lead={c.lead} />
              <p className="edt-body">{c.body}</p>
              <a className="edt-btn edt-btn--ghost" href={mailto(c.cta)}>
                {c.cta} <ArrowUpRight />
              </a>
            </div>
            <Photos keys={c.photos} />
          </div>
        </section>
      ))}

      <CtaBand
        title="Ready to get practical experience?"
        text="Tell us what you want to build and which domain interests you."
        actions={[
          { label: 'Enrol Now', href: ENROL_HREF },
          { label: 'Industry partnerships', href: mailto('Industry partnership enquiry') },
        ]}
      />
    </>
  );
}
