import { useParams } from 'react-router-dom';
import { CtaBand, PageHero, Photos, SectionHead, SiblingNav } from '../components/page/PageParts.jsx';
import { aboutLinks, mailto, sections } from '../data/navigation.js';
import { about, values } from '../data/pages.js';
import { institutions } from '../data/site.js';
import NotFoundPage from './NotFoundPage.jsx';
import usePageTitle from './usePageTitle.js';

function Story() {
  return (
    <div className="edt-container edt-split">
      <div className="edt-split__text">
        <SectionHead title={about.story.lead} />
        {about.story.body.map((t) => (
          <p key={t} className="edt-body">
            {t}
          </p>
        ))}
        <ul className="edt-values" aria-label="Our values">
          {values.map((v) => (
            <li key={v} className="edt-pill">
              <span className="edt-pill__dot" />
              {v}
            </li>
          ))}
        </ul>
      </div>
      <Photos keys={[about.story.photo]} />
    </div>
  );
}

function Team() {
  return (
    <div className="edt-container edt-split">
      <div className="edt-split__text">
        <SectionHead title={about.team.lead} />
        <p className="edt-body">{about.team.body}</p>
      </div>
      <Photos keys={about.team.photos} />
    </div>
  );
}

function Mentors() {
  return (
    <div className="edt-container">
      <SectionHead title={about.mentors.lead} />
      <p className="edt-body edt-body--narrow">{about.mentors.body}</p>
      <Photos keys={about.mentors.photos} className="edt-photos--row" />
    </div>
  );
}

function Partners() {
  return (
    <div className="edt-container">
      <SectionHead title="On campus with colleges and universities" />
      <div className="edt-partners">
        {institutions.map((name) => (
          <div key={name} className="edt-card edt-partner">
            <span className="edt-pill__dot" />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

const CONTENT = { 'our-story': Story, 'our-team': Team, mentors: Mentors, partners: Partners };

/** /about/:topic: Our Story, Our Team, Mentors & Experts, Our Partners. */
export default function AboutTopicPage() {
  const { topic } = useParams();
  const index = aboutLinks.findIndex((a) => a.id === topic);
  const item = aboutLinks[index];
  usePageTitle(item ? item.title : 'Page not found');
  if (!item) return <NotFoundPage />;
  const Content = CONTENT[item.id];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us', to: '/about' }, { label: item.title }]}
        eyebrow={`About Us · ${String(index + 1).padStart(2, '0')}`}
        title={item.title}
      >
        {item.desc}.
      </PageHero>

      <section className="edt-section edt-split-section">
        <Content />
      </section>

      <SiblingNav section={sections.about} />

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
