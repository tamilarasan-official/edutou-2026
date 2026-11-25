import { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SectionHead } from './PageParts.jsx';
import { ArrowUpRight } from '../layout/icons.jsx';
import { categoryTitle, inCategory, priceParts, retrySite, scheduleLabel, useSite } from '../../data/cms.js';

/** Type + price badges (e.g. "Webinar", "Free" / "₹4,999"). */
/** Price as shown to visitors: "₹99", or "₹99 ~~₹199~~ 50% off" for an offer. */
export function Price({ pricing, className = '' }) {
  const p = priceParts(pricing);
  if (!p) return null;
  return (
    <span className={`edt-price ${className}`}>
      <span className={`edt-badge ${p.free ? 'edt-badge--free' : 'edt-badge--paid'}`}>{p.now}</span>
      {p.was && (
        <>
          <s className="edt-price__was" aria-label={`was ${p.was}`}>
            {p.was}
          </s>
          {p.off > 0 && <span className="edt-badge edt-badge--free">{p.off}% off</span>}
        </>
      )}
    </span>
  );
}

/** Type + price badges (e.g. "Webinar", "Free" / "₹99 ~~₹199~~"). */
export function ProgrammeBadges({ p, className = '' }) {
  return (
    <span className={`edt-prog__badges ${className}`}>
      {p.type && <span className="edt-badge edt-badge--type">{p.type}</span>}
      <Price pricing={p.pricing} />
    </span>
  );
}

export function ProgrammeCard({ p }) {
  const site = useSite();
  const card = p.card;
  const when = scheduleLabel(p.schedule);
  const meta = [when, ...card.meta].filter(Boolean);
  return (
    <article className="edt-card edt-prog">
      {p.image?.url && (
        <figure className="edt-prog__image">
          <img src={p.image.url} alt={p.image.alt || ''} loading="lazy" decoding="async" style={p.image.focus ? { objectPosition: p.image.focus } : undefined} />
        </figure>
      )}
      <div className="edt-prog__top">
        <ProgrammeBadges p={p} />
        {[p.category, ...(p.alsoIn ?? [])].map((f) => (
          <span key={f} className="edt-tag edt-tag--accent">
            {categoryTitle(site, f)}
          </span>
        ))}
        {p.domains.map((d) => (
          <span key={d} className="edt-tag">
            {d}
          </span>
        ))}
      </div>
      <h3 className="edt-prog__title">{p.title}</h3>
      {meta.length > 0 && <p className="edt-prog__meta">{meta.join(' · ')}</p>}
      {card.summary && <p className="edt-prog__summary">{card.summary}</p>}
      {card.highlights.length > 0 && (
        <ul className="edt-prog__list">
          {card.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {card.tools.length > 0 && (
        <p className="edt-prog__tools">
          Tools: <span>{card.tools.join(', ')}</span>
        </p>
      )}
      {card.details?.enabled && (
        <details className="edt-prog__more">
          <summary>Roles &amp; live projects</summary>
          {card.details.roles.length > 0 && (
            <>
              <p className="edt-prog__sub">Roles you can grow into</p>
              <ul className="edt-prog__list">
                {card.details.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {card.details.projects.length > 0 && (
            <>
              <p className="edt-prog__sub">Sample live projects</p>
              <ul className="edt-prog__list">
                {card.details.projects.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {card.details.note && <p className="edt-prog__note">{card.details.note}</p>}
        </details>
      )}
      <div className="edt-prog__actions">
        <Link className="edt-btn edt-btn--primary edt-prog__cta" to={p.enrolPath}>
          Enquire / Enrol <ArrowUpRight />
        </Link>
        {p.pagePath && (
          <Link className="edt-btn edt-btn--ghost edt-prog__cta" to={p.pagePath}>
            View full programme <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

/** Shown while the catalogue loads, or if the API cannot be reached. */
export function SiteStatus({ site }) {
  if (site.status === 'error') {
    return (
      <div className="edt-card edt-empty">
        <h3>Programmes could not be loaded</h3>
        <p>Please check your connection and try again.</p>
        <button type="button" className="edt-btn edt-btn--primary" onClick={retrySite}>
          Try again
        </button>
      </div>
    );
  }
  return (
    <div className="edt-progs" aria-busy="true" aria-label="Loading programmes">
      {[0, 1].map((i) => (
        <div key={i} className="edt-card edt-prog edt-prog--skeleton" />
      ))}
    </div>
  );
}

function FilterRow({ label, value, options, onChange, allLabel }) {
  return (
    <div className="edt-filters__row">
      <span className="edt-filters__label">{label}</span>
      <div className="edt-chips">
        <button
          type="button"
          className={`edt-chip${value === 'all' ? ' is-active' : ''}`}
          onClick={() => onChange('all')}
          aria-pressed={value === 'all'}
        >
          {allLabel}
        </button>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`edt-chip${value === o.id ? ' is-active' : ''}`}
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Programme list with domain (and optionally format) filters kept in the URL
 * (?domain=AI&format=bootcamps). Pass `fixedFormat` on a format's own page.
 */
export default function Catalogue({ fixedFormat, title = 'Programme catalogue', lead }) {
  const site = useSite();
  const { categories, domains, programmes } = site;
  const [params, setParams] = useSearchParams();
  const format = fixedFormat ?? (categories.some((f) => f.id === params.get('format')) ? params.get('format') : 'all');
  const domain = domains.includes(params.get('domain')) ? params.get('domain') : 'all';
  const formatTitle = (id) => categoryTitle(site, id);
  const ref = useRef(null);
  const lastFilter = useRef(null);

  const results = useMemo(
    () =>
      programmes.filter(
        (p) => (format === 'all' || inCategory(p, format)) && (domain === 'all' || p.domains.includes(domain)),
      ),
    [programmes, format, domain],
  );

  // Jump to the list when a filter changes, or when the page opens with a filter
  // in the URL (e.g. a domain link in the menu). Plain page visits start at the top.
  useEffect(() => {
    const key = `${format}|${domain}`;
    const previous = lastFilter.current;
    lastFilter.current = key;
    if (previous === key) return; // same filter (e.g. effect re-run): don't move the page
    const filtered = (!fixedFormat && format !== 'all') || domain !== 'all';
    if (previous === null && !filtered) return; // first visit without a filter
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: 'smooth' });
  }, [format, domain, fixedFormat]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const what = format !== 'all' ? formatTitle(format).toLowerCase() : 'programmes';

  return (
    <section className="edt-section" id="catalogue" ref={ref}>
      <div className="edt-container">
        <SectionHead title={title} lead={lead ?? 'Filter by format and by technology domain.'} />

        <div className="edt-filters" role="group" aria-label="Filter programmes">
          {!fixedFormat && (
            <FilterRow
              label="Format"
              value={format}
              allLabel="All formats"
              options={categories.map((f) => ({ id: f.id, label: f.title }))}
              onChange={(v) => setFilter('format', v)}
            />
          )}
          <FilterRow
            label="Domain"
            value={domain}
            allLabel="All domains"
            options={domains.map((d) => ({ id: d, label: d }))}
            onChange={(v) => setFilter('domain', v)}
          />
        </div>

        <p className="edt-results" aria-live="polite">
          {results.length} programme{results.length === 1 ? '' : 's'}
          {format !== 'all' && ` · ${formatTitle(format)}`}
          {domain !== 'all' && ` · ${domain}`}
        </p>

        {site.status !== 'ready' ? (
          <SiteStatus site={site} />
        ) : results.length > 0 ? (
          <div className="edt-progs">
            {results.map((p) => (
              <ProgrammeCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="edt-card edt-empty">
            <h3>No {what} listed here yet</h3>
            <p>
              New {what}
              {domain !== 'all' ? ` in ${domain}` : ''} are on the way. Tell us what you are looking for and we will get
              back to you.
            </p>
            <Link className="edt-btn edt-btn--primary" to="/enroll">
              Ask about upcoming {what} <ArrowUpRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
