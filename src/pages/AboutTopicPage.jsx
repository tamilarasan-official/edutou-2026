import { Link, useParams } from 'react-router-dom';
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

function FounderProfile() {
  const f = about.founder;
  return (
    <article className="edt-founder" aria-labelledby="founder-name">
      <div className="edt-founder__top">
        <figure className="edt-founder__photo">
          <img src={f.photo} alt={f.name} width="453" height="507" decoding="async" />
        </figure>
        <div className="edt-founder__head">
          <p className="edt-founder__role">{f.role}</p>
          <h2 id="founder-name" className="edt-founder__name">
            {f.name}
          </h2>
          <p className="edt-founder__tagline">
            {f.tagline}{' '}
            <br className="edt-founder__br" />
            <span className="edt-founder__grad">{f.highlight}</span>
          </p>
          <dl className="edt-founder__stats">
            {f.stats.map((s) => (
              <div key={s.value} className="edt-founder__stat">
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="edt-founder__story">
        {f.columns.map((col, i) => (
          <div key={i} className="edt-founder__col">
            {col.map((p) => (
              <p key={p.text} className={p.kind ? `edt-founder__${p.kind}` : undefined}>
                {p.text}
              </p>
            ))}
          </div>
        ))}
      </div>
      {f.closing && (
        <p className="edt-founder__closing">
          {f.closing.text} <span className="edt-founder__grad">{f.closing.highlight}</span>
        </p>
      )}
    </article>
  );
}

function Ceo() {
  return (
    <div className="edt-container">
      <FounderProfile />
    </div>
  );
}

/** Small card on Our Team linking to the CEO page. */
function CeoTeaser() {
  const f = about.founder;
  return (
    <Link to="/about/ceo" className="edt-card edt-ceo-teaser">
      <img src={f.photo} alt="" width="453" height="507" loading="lazy" decoding="async" />
      <span className="edt-ceo-teaser__body">
        <span className="edt-founder__role">{f.role}</span>
        <span className="edt-ceo-teaser__name">{f.name}</span>
        <span className="edt-ceo-teaser__tag">
          {f.tagline} <span className="edt-founder__grad">{f.highlight}</span>
        </span>
        <span className="edt-hub__more">
          Read her story <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

function Team() {
  return (
    <>
      <div className="edt-container">
        <CeoTeaser />
      </div>
      <div className="edt-container edt-split edt-team-split">
        <div className="edt-split__text">
          <SectionHead title={about.team.lead} />
          <p className="edt-body">{about.team.body}</p>
        </div>
        <Photos keys={about.team.photos} />
      </div>
    </>
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

const CONTENT = { 'our-story': Story, ceo: Ceo, 'our-team': Team, mentors: Mentors, partners: Partners };

/** /about/:topic: Our Story, Our Team, Mentors & Experts, Our Partners. */
export default function AboutTopicPage() {
  const { topic = '' } = useParams();
  // Case-insensitive, so /about/CEO and /about/ceo both work.
  const index = aboutLinks.findIndex((a) => a.id === topic.toLowerCase());
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
