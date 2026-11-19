import { CtaBand, HubCards, PageHero } from '../components/page/PageParts.jsx';
import { ENROL_HREF, careerLinks, mailto } from '../data/navigation.js';
import { career } from '../data/pages.js';
import usePageTitle from './usePageTitle.js';

const PHOTOS = Object.fromEntries(career.map((c) => [c.id, c.photos[0]]));

/** /career: overview linking to each career page. */
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
          <HubCards items={careerLinks} photos={PHOTOS} />
        </div>
      </section>

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
