import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHead } from './PageParts.jsx';
import { ArrowUpRight } from '../layout/icons.jsx';
import { domains, mailto, programmeFormats } from '../../data/navigation.js';
import { programmes } from '../../data/programmes.js';

export const formatTitle = (id) => programmeFormats.find((f) => f.id === id)?.title ?? id;
export const inFormat = (p, formatId) => p.format === formatId || (p.alsoIn ?? []).includes(formatId);
export const programmeCount = (formatId) => programmes.filter((p) => inFormat(p, formatId)).length;

export function ProgrammeCard({ p }) {
  return (
    <article className="edt-card edt-prog">
      <div className="edt-prog__top">
        {[p.format, ...(p.alsoIn ?? [])].map((f) => (
          <span key={f} className="edt-tag edt-tag--accent">
            {formatTitle(f)}
          </span>
        ))}
        {p.domains.map((d) => (
          <span key={d} className="edt-tag">
            {d}
          </span>
        ))}
      </div>
      <h3 className="edt-prog__title">{p.title}</h3>
      <p className="edt-prog__meta">{p.meta.join(' · ')}</p>
      <p className="edt-prog__summary">{p.summary}</p>
      <ul className="edt-prog__list">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      {p.tools.length > 0 && (
        <p className="edt-prog__tools">
          Tools: <span>{p.tools.join(', ')}</span>
        </p>
      )}
      {p.details && (
        <details className="edt-prog__more">
          <summary>Roles &amp; live projects</summary>
          <p className="edt-prog__sub">Roles you can grow into</p>
          <ul className="edt-prog__list">
            {p.details.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="edt-prog__sub">Sample live projects</p>
          <ul className="edt-prog__list">
            {p.details.projects.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {p.details.note && <p className="edt-prog__note">{p.details.note}</p>}
        </details>
      )}
      <a className="edt-btn edt-btn--primary edt-prog__cta" href={mailto(`Enquiry: ${p.title}`)}>
        Enquire / Enrol <ArrowUpRight />
      </a>
    </article>
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
  const [params, setParams] = useSearchParams();
  const format =
    fixedFormat ?? (programmeFormats.some((f) => f.id === params.get('format')) ? params.get('format') : 'all');
  const domain = domains.includes(params.get('domain')) ? params.get('domain') : 'all';
  const ref = useRef(null);
  const lastFilter = useRef(null);

  const results = useMemo(
    () =>
      programmes.filter(
        (p) => (format === 'all' || inFormat(p, format)) && (domain === 'all' || p.domains.includes(domain)),
      ),
    [format, domain],
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
              options={programmeFormats.map((f) => ({ id: f.id, label: f.title }))}
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

        {results.length > 0 ? (
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
            <a
              className="edt-btn edt-btn--primary"
              href={mailto(
                `Programme enquiry${format !== 'all' ? `: ${formatTitle(format)}` : ''}${domain !== 'all' ? ` (${domain})` : ''}`,
              )}
            >
              Ask about upcoming {what} <ArrowUpRight />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
