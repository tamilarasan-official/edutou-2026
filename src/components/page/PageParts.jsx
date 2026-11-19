import ShinyText from '../fx/ShinyText.jsx';
import { ArrowUpRight } from '../layout/icons.jsx';
import { galleryPhotos } from '../../data/site.js';

const photoSrc = (k) => `${import.meta.env.BASE_URL}images/gallery-${k}.jpg`;

/** Top of an inner page: eyebrow pill, big heading, supporting text. */
export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="edt-phero">
      <div className="edt-container edt-phero__inner">
        <span className="edt-eyebrow">
          <ShinyText>{eyebrow}</ShinyText>
        </span>
        <h1 className="edt-phero__title">{title}</h1>
        {children && <p className="edt-phero__sub">{children}</p>}
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
