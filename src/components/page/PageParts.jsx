import { Link, NavLink } from 'react-router-dom';
import ShinyText from '../fx/ShinyText.jsx';
import { ArrowUpRight } from '../layout/icons.jsx';
import { galleryPhotos } from '../../data/site.js';

const photoSrc = (k) => `${import.meta.env.BASE_URL}images/gallery-${k}.jpg`;

/** "Home / About Us / Our Team" trail. `crumbs` = [{ label, to? }] (last one is the current page). */
export function Breadcrumbs({ crumbs }) {
  return (
    <nav className="edt-crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.label}>
            {c.to && i < crumbs.length - 1 ? (
              <Link to={c.to}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Top of an inner page: optional breadcrumbs, eyebrow pill, big heading, supporting text. */
export function PageHero({ eyebrow, title, crumbs, children }) {
  return (
    <section className="edt-phero">
      <div className="edt-container edt-phero__inner">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <span className="edt-eyebrow">
          <ShinyText>{eyebrow}</ShinyText>
        </span>
        <h1 className="edt-phero__title">{title}</h1>
        {children && <p className="edt-phero__sub">{children}</p>}
      </div>
    </section>
  );
}

/** Cards linking to every page of a section (used on the overview pages). */
export function HubCards({ items, photos = {} }) {
  return (
    <div className="edt-hub">
      {items.map((it, i) => (
        <Link key={it.id} to={it.path} className="edt-card edt-hub__card">
          {photos[it.id] && (
            <span className="edt-hub__media">
              <img src={photoSrc(photos[it.id])} alt="" loading="lazy" decoding="async" />
            </span>
          )}
          <span className="edt-hub__body">
            <span className="edt-hub__no">{it.no ?? String(i + 1).padStart(2, '0')}</span>
            <span className="edt-hub__title">{it.title}</span>
            <span className="edt-hub__desc">{it.desc}</span>
            <span className="edt-hub__more">
              Explore <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** "More in <section>" links to the sibling pages, current one highlighted. */
export function SiblingNav({ section }) {
  return (
    <section className="edt-section">
      <div className="edt-container">
        <nav className="edt-siblings" aria-label={`More in ${section.label}`}>
          <p className="edt-siblings__label">More in {section.label}</p>
          <div className="edt-chips">
            {section.items.map((it) => (
              <NavLink key={it.id} to={it.path} className={({ isActive }) => `edt-chip${isActive ? ' is-active' : ''}`}>
                {it.title}
              </NavLink>
            ))}
            <Link to={section.path} className="edt-chip edt-chip--ghost">
              {section.label} overview <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </section>
  );
}

/** Section heading block used inside pages. */
export function SectionHead({ no, title, lead, align = 'left' }) {
  return (
    <div className={`edt-shead edt-shead--${align}`}>
      {no && <span className="edt-shead__no">{no}</span>}
      <h2 className="edt-shead__title">{title}</h2>
      {lead && <p className="edt-shead__lead">{lead}</p>}
    </div>
  );
}

/** One or more real campus photos with their alt text. */
export function Photos({ keys, className = '' }) {
  return (
    <div className={`edt-photos edt-photos--${keys.length} ${className}`.trim()}>
      {keys.map((k) => {
        const p = galleryPhotos.find((g) => g.k === k);
        return (
          <figure key={k} className="edt-photo">
            <img src={photoSrc(k)} alt={p?.alt ?? ''} width={p?.w} height={p?.h} loading="lazy" decoding="async" />
          </figure>
        );
      })}
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({ title, text, actions }) {
  return (
    <section className="edt-cta">
      <div className="edt-container">
        <div className="edt-cta__box edt-card">
          <div>
            <h2 className="edt-cta__title">{title}</h2>
            {text && <p className="edt-cta__text">{text}</p>}
          </div>
          <div className="edt-cta__actions">
            {actions.map((a, i) => (
              <a key={a.label} className={`edt-btn ${i === 0 ? 'edt-btn--primary' : 'edt-btn--ghost'}`} href={a.href}>
                {a.label} <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
