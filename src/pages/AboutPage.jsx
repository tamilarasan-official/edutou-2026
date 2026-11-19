import { CtaBand, HubCards, PageHero } from '../components/page/PageParts.jsx';
import { aboutLinks, mailto } from '../data/navigation.js';
import { about } from '../data/pages.js';
import usePageTitle from './usePageTitle.js';

const PHOTOS = {
  'our-story': about.story.photo,
  'our-team': about.team.photos[0],
  mentors: about.mentors.photos[0],
  partners: about.partners.photo,
};

/** /about: overview linking to each About Us page. */
export default function AboutPage() {
  usePageTitle('About Us');
  return (
    <>
      <PageHero eyebrow="About Us" title="Helping learners become career-ready">
        Edutou is where learners discover programmes, acquire skills, build real things and step into industry.
      </PageHero>

      <section className="edt-section">
        <div className="edt-container">
          <HubCards items={aboutLinks} photos={PHOTOS} />
        </div>
      </section>

      <CtaBand
        title="Bring Edutou to your institution"
        text={about.partners.body}
        actions={[
          { label: 'Partner with us', href: mailto('Institutional partnership enquiry') },
          { label: 'Join as a mentor', href: mailto('Mentor enquiry') },
        ]}
      />
    </>
  );
}
