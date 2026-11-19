import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CtaBand, PageHero, SectionHead } from '../components/page/PageParts.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { ENROL_HREF, domains, mailto, programmeFormats } from '../data/navigation.js';
import { programmes } from '../data/programmes.js';
import usePageTitle from './usePageTitle.js';

const formatTitle = (id) => programmeFormats.find((f) => f.id === id)?.title ?? id;

function ProgrammeCard({ p }) {
  return (
    <article className="edt-card edt-prog">
      <div className="edt-prog__top">
        <span className="edt-tag edt-tag--accent">{formatTitle(p.format)}</span>
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
      <a className="edt-btn edt-btn--primary edt-prog__cta" href={mailto(`Enquiry: ${p.title}`)}>
        Enquire / Enrol <ArrowUpRight />
      </a>
    </article>
  );
}

/** /programmes: one catalogue for everything learners can enrol in. */
export default function ProgrammesPage() {
  usePageTitle('Programmes');
  const [params, setParams] = useSearchParams();
  const format = programmeFormats.some((f) => f.id === params.get('format')) ? params.get('format') : 'all';
  const domain = domains.includes(params.get('domain')) ? params.get('domain') : 'all';
  const catalogueRef = useRef(null);
  const firstRender = useRef(true);

  const results = useMemo(
    () =>
      programmes.filter(
        (p) => (format === 'all' || p.format === format) && (domain === 'all' || p.domains.includes(domain)),
      ),
    [format, domain],
  );
  const countFor = (id) => programmes.filter((p) => p.format === id).length;

  // Arriving from a navbar filter link: jump to the catalogue.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (format === 'all' && domain === 'all') return;
    }
    const el = catalogueRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top, behavior: 'smooth' });
  }, [format, domain]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHero eyebrow="Programmes" title="Explore by learning format">
        One catalogue for everything you can enrol in at Edutou. Pick a format, then narrow it down by technology
        domain.
      </PageHero>

      <section className="edt-section">
        <div className="edt-container">
          <div className="edt-formats">
            {programmeFormats.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`edt-card edt-format${format === f.id ? ' is-selected' : ''}`}
                onClick={() => setFilter('format', format === f.id ? 'all' : f.id)}
                aria-pressed={format === f.id}
              >
                <span className="edt-format__no">{f.no}</span>
                <span className="edt-format__title">{f.title}</span>
                <span className="edt-format__desc">{f.desc}</span>
                <span className="edt-format__count">
                  {countFor(f.id) ? `${countFor(f.id)} programme${countFor(f.id) > 1 ? 's' : ''}` : 'Coming soon'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="edt-section" id="catalogue" ref={catalogueRef}>
        <div className="edt-container">
          <SectionHead title="Programme catalogue" lead="Filter by format and by technology domain." />

          <div className="edt-filters" role="group" aria-label="Filter programmes">
            <div className="edt-filters__row">
              <span className="edt-filters__label">Format</span>
              <div className="edt-chips">
                <button
                  type="button"
                  className={`edt-chip${format === 'all' ? ' is-active' : ''}`}
                  onClick={() => setFilter('format', 'all')}
                  aria-pressed={format === 'all'}
                >
                  All formats
                </button>
                {programmeFormats.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`edt-chip${format === f.id ? ' is-active' : ''}`}
                    onClick={() => setFilter('format', f.id)}
                    aria-pressed={format === f.id}
                  >
                    {f.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="edt-filters__row">
              <span className="edt-filters__label">Domain</span>
              <div className="edt-chips">
                <button
                  type="button"
                  className={`edt-chip${domain === 'all' ? ' is-active' : ''}`}
                  onClick={() => setFilter('domain', 'all')}
                  aria-pressed={domain === 'all'}
                >
                  All domains
                </button>
                {domains.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`edt-chip${domain === d ? ' is-active' : ''}`}
                    onClick={() => setFilter('domain', d)}
                    aria-pressed={domain === d}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
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
              <h3>No programmes listed here yet</h3>
              <p>
                New {format !== 'all' ? formatTitle(format).toLowerCase() : 'programmes'}
                {domain !== 'all' ? ` in ${domain}` : ''} are on the way. Tell us what you are looking for and we will
                get back to you.
              </p>
              <a
                className="edt-btn edt-btn--primary"
                href={mailto(
                  `Programme enquiry${format !== 'all' ? `: ${formatTitle(format)}` : ''}${domain !== 'all' ? ` (${domain})` : ''}`,
                )}
              >
                Ask about upcoming programmes <ArrowUpRight />
              </a>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        text="Tell us your goals and background, and we will suggest the right programme."
        actions={[
          { label: 'Enrol Now', href: ENROL_HREF },
          { label: 'For institutions', href: mailto('Institutional programme enquiry') },
        ]}
      />
    </>
  );
}
