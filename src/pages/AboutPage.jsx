import { CtaBand, PageHero, Photos, SectionHead } from '../components/page/PageParts.jsx';
import { mailto } from '../data/navigation.js';
import { about, values } from '../data/pages.js';
import { institutions } from '../data/site.js';
import usePageTitle from './usePageTitle.js';

/** /about: our story, team, mentors and partners. */
export default function AboutPage() {
  usePageTitle('About Us');
  return (
    <>
      <PageHero eyebrow="About Us" title="Helping learners become career-ready">
        Edutou is where learners discover programmes, acquire skills, build real things and step into industry.
      </PageHero>

      <section id="our-story" className="edt-section edt-split-section">
        <div className="edt-container edt-split">
          <div className="edt-split__text">
            <SectionHead no="01" title="Our Story" lead={about.story.lead} />
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
      </section>

      <section id="our-team" className="edt-section edt-split-section">
        <div className="edt-container edt-split edt-split--flip">
          <div className="edt-split__text">
            <SectionHead no="02" title="Our Team" lead={about.team.lead} />
            <p className="edt-body">{about.team.body}</p>
          </div>
          <Photos keys={about.team.photos} />
        </div>
      </section>

      <section id="mentors" className="edt-section">
        <div className="edt-container">
          <SectionHead no="03" title="Mentors & Experts" lead={about.mentors.lead} />
          <p className="edt-body edt-body--narrow">{about.mentors.body}</p>
          <Photos keys={about.mentors.photos} className="edt-photos--row" />
        </div>
      </section>

      <section id="partners" className="edt-section">
        <div className="edt-container">
          <SectionHead no="04" title="Our Partners" lead={about.partners.lead} />
          <div className="edt-partners">
            {institutions.map((name) => (
              <div key={name} className="edt-card edt-partner">
                <span className="edt-pill__dot" />
                {name}
              </div>
            ))}
          </div>
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
