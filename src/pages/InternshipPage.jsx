import { Link, useParams } from 'react-router-dom';
import { CtaBand, PageHero, SectionHead } from '../components/page/PageParts.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { mailto } from '../data/navigation.js';
import { internshipCommon as common, internshipPath, internships, outcomes } from '../data/internships.js';
import NotFoundPage from './NotFoundPage.jsx';
import usePageTitle from './usePageTitle.js';

const pad = (n) => String(n).padStart(2, '0');
const telHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`;

/** Numbered card grid used by roles, modules, projects, outcomes and institutions. */
function NumberedGrid({ items, cols = 3, label = '' }) {
  return (
    <ol className={`edt-igrid edt-igrid--${cols}`}>
      {items.map((it, i) => {
        const title = typeof it === 'string' ? it : it.title;
        return (
          <li key={title} className="edt-card edt-icard">
            <span className="edt-icard__no">
              {label}
              {pad(i + 1)}
            </span>
            <strong className="edt-icard__title">{title}</strong>
            {it.desc && <span className="edt-icard__desc">{it.desc}</span>}
          </li>
        );
      })}
    </ol>
  );
}

/** /programmes/internship-programmes/:slug: one page per Industry Internship track. */
export default function InternshipPage() {
  const { format, programme } = useParams();
  const t = format === 'internship-programmes' ? internships.find((x) => x.slug === programme) : undefined;
  usePageTitle(t ? `${t.title} · Industry Internship` : 'Page not found');
  if (!t) return <NotFoundPage />;

  const enquire = mailto(`Enquiry: Industry Internship – ${t.title}`);
  const others = internships.filter((x) => x.slug !== t.slug);
  const facts = [...common.facts, { value: `${t.partners.length} partners`, label: 'Industry collaborators' }];

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Programmes', to: '/programmes' },
          { label: 'Internship Programmes', to: '/programmes/internship-programmes' },
          { label: t.title },
        ]}
        eyebrow="Industry Internship Programme"
        title={t.title}
      >
        {t.tagline}
      </PageHero>

      {/* Key facts + actions */}
      <section className="edt-container edt-ifacts-wrap">
        <ul className="edt-center edt-itopics" aria-label="Topics">
          {t.topics.map((x) => (
            <li key={x} className="edt-tag edt-tag--accent">
              {x}
            </li>
          ))}
        </ul>
        <dl className="edt-ifacts">
          {facts.map((f) => (
            <div key={f.value} className="edt-ifact">
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
        <div className="edt-center">
          <a className="edt-btn edt-btn--primary" href={enquire}>
            Enquire / Enrol <ArrowUpRight />
          </a>
          <a className="edt-btn edt-btn--ghost" href={telHref(common.counsellor.phone)}>
            Call our counsellor <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* Why this track, why now */}
      <section className="edt-section edt-split-section">
        <div className="edt-container edt-split edt-iwhy">
          <div className="edt-split__text">
            <SectionHead no="Why this track, why now" title={t.why.title} />
            {t.why.body.map((p) => (
              <p key={p} className="edt-body">
                {p}
              </p>
            ))}
            <figure className="edt-card edt-istat">
              <span className="edt-istat__label">By the numbers</span>
              {t.why.stat.prefix && <span className="edt-istat__prefix">{t.why.stat.prefix}</span>}
              <strong className="edt-istat__value">{t.why.stat.value}</strong>
              <span className="edt-istat__text">{t.why.stat.label}</span>
              <figcaption className="edt-istat__src">Source: {t.why.stat.source}</figcaption>
            </figure>
          </div>
          <figure className="edt-photo edt-iphoto">
            <img
              src={t.photo.src}
              alt={t.photo.alt}
              width={t.photo.w}
              height={t.photo.h}
              style={{ objectPosition: t.photo.focus }}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* Roles */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="Roles you can grow into" title="Where this track can take you." lead="Six roles this track prepares you to grow into." />
          <NumberedGrid items={t.roles} label="Role " />
        </div>
      </section>

      {/* Who it's for */}
      <section className="edt-section edt-split-section">
        <div className="edt-container edt-split edt-split--top">
          <div className="edt-split__text">
            <SectionHead no="Who it's for" title="Open to every department." />
            <p className="edt-body">{t.audience}</p>
            <p className="edt-ihelpful">
              <span>Helpful, not required</span>
              {t.helpful}
            </p>
          </div>
          <div className="edt-card edt-iwalk">
            <p className="edt-iwalk__title">What you walk away with</p>
            <ol className="edt-steps">
              {t.walkAway.map((w) => (
                <li key={w}>
                  <strong>{w}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Industry partners */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="Industry partners" title={t.partnersTitle} lead="Every project comes from a partner doing this work today." />
          <ul className={`edt-igrid edt-igrid--${t.partners.length > 3 ? 3 : t.partners.length}`}>
            {t.partners.map((p) => (
              <li key={p.name} className="edt-card edt-icard edt-ipartner">
                <strong className="edt-ipartner__name">{p.name}</strong>
                <span className="edt-icard__desc">{p.work}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modules */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="What you'll learn" title={t.modulesTitle} lead="The modules you cover depend on your plan length." />
          <NumberedGrid items={t.modules} cols={4} />
        </div>
      </section>

      {/* Toolkit */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="Your toolkit" title="Work with the tools teams use today." lead="Grouped the way you'll use them on live projects." />
          <div className="edt-card edt-itools">
            {t.toolkit.map((g) => (
              <div key={g.group} className="edt-itools__row">
                <span className="edt-itools__group">{g.group}</span>
                <ul className="edt-itools__items">
                  {g.items.map((x) => (
                    <li key={x} className="edt-tag">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live projects */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead
            no="Live projects"
            title={t.projectsTitle}
            lead="Sample projects. Final briefs come from partners and depend on your plan."
          />
          <NumberedGrid items={t.projects} />
        </div>
      </section>

      {/* How it runs */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead
            no="How the internship runs"
            title="Pick your plan. Work a full industry day, every day."
            lead="Every plan is full-time. Longer plans go deeper."
          />
          <div className="edt-iruns">
            <div className="edt-card edt-iplans">
              <p className="edt-iwalk__title">Choose your plan</p>
              <ul>
                {common.plans.map((p) => (
                  <li key={p.days} className="edt-iplan">
                    <span className="edt-iplan__days">{p.days} days</span>
                    <span className="edt-iplan__bar" style={{ '--w': `${(p.days / 30) * 100}%` }} aria-hidden="true" />
                    <span className="edt-iplan__desc">{p.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="edt-card edt-imodes">
              <p className="edt-iwalk__title">Three ways to join</p>
              {common.modes.map((m) => (
                <p key={m.title} className="edt-imode">
                  <strong>{m.title}</strong>
                  <span>{m.desc}</span>
                </p>
              ))}
            </div>
          </div>
          <h3 className="edt-isub">The roadmap: four stages, whatever your plan length.</h3>
          <NumberedGrid items={common.roadmap} cols={4} />
        </div>
      </section>

      {/* Outcomes */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="Certificate & outcomes" title="Leave with proof, not just a certificate." />
          <NumberedGrid items={outcomes(t.portfolio)} cols={4} />
        </div>
      </section>

      {/* For institutions */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead
            no="For institutions"
            title="Bring industry internships to your campus."
            lead="Edutou runs the whole programme for your students, from the first day to the final showcase."
          />
          <NumberedGrid items={common.institutions} cols={4} />
          <p className="edt-imore">
            <a className="edt-btn edt-btn--ghost" href={mailto(`Institutional enquiry: Industry Internship – ${t.title}`)}>
              Partner with us <ArrowUpRight />
            </a>
            <Link className="edt-btn edt-btn--ghost" to="/about/partners">
              Institutions we've worked with <ArrowUpRight />
            </Link>
          </p>
        </div>
      </section>

      {/* Other tracks */}
      <section className="edt-section">
        <div className="edt-container">
          <SectionHead no="More industry internships" title="Explore the other tracks." />
          <div className="edt-igrid edt-igrid--2">
            {others.map((o) => (
              <Link key={o.slug} to={internshipPath(o.slug)} className="edt-card edt-icard edt-iother">
                <strong className="edt-icard__title">{o.title}</strong>
                <span className="edt-icard__desc">{o.tagline}</span>
                <span className="edt-iother__go">
                  View programme <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Start any time. Admissions are open all year."
        text={`${common.fees} Talk to our counsellor, ${common.counsellor.name} (${common.counsellor.phone}), to find your plan and fee.`}
        actions={[
          { label: 'Enquire / Enrol', href: enquire },
          { label: `Call ${common.counsellor.name}`, href: telHref(common.counsellor.phone) },
        ]}
      />
    </>
  );
}
