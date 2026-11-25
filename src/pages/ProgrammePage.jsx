import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CtaBand, PageHero, SectionHead } from '../components/page/PageParts.jsx';
import { ProgrammeBadges } from '../components/page/Catalogue.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { categoryTitle, inCategory, scheduleLabel, useSite } from '../data/cms.js';
import NotFoundPage from './NotFoundPage.jsx';
import { track } from '../data/analytics.js';
import usePageTitle from './usePageTitle.js';

const pad = (n) => String(n).padStart(2, '0');
const telHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`;
const isInternal = (href) => href.startsWith('/') && !href.startsWith('//');

function Action({ href, className, children }) {
  return isInternal(href) ? (
    <Link className={className} to={href}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

/** Numbered (or plain) card grid: roles, modules, projects, partners, outcomes... */
function CardGrid({ items, cols = 3, numbered = true, label = '' }) {
  return (
    <ol className={`edt-igrid edt-igrid--${cols}`}>
      {items.map((it, i) => (
        <li key={`${it.title}-${i}`} className={`edt-card edt-icard${numbered ? '' : ' edt-ipartner'}`}>
          {numbered ? (
            <span className="edt-icard__no">
              {label}
              {pad(i + 1)}
            </span>
          ) : null}
          <strong className={numbered ? 'edt-icard__title' : 'edt-ipartner__name'}>{it.title}</strong>
          {it.desc && <span className="edt-icard__desc">{it.desc}</span>}
        </li>
      ))}
    </ol>
  );
}

function TextMedia({ b }) {
  const hasImage = Boolean(b.image?.url);
  return (
    <section className="edt-section edt-split-section">
      <div className={`edt-container edt-split edt-iwhy${hasImage ? '' : ' edt-split--single'}`}>
        <div className="edt-split__text">
          <SectionHead no={b.label} title={b.title} lead={b.lead} />
          {b.paragraphs.map((p, i) => (
            <p key={i} className="edt-body">
              {p}
            </p>
          ))}
          {b.stat?.value && (
            <figure className="edt-card edt-istat">
              <span className="edt-istat__label">By the numbers</span>
              {b.stat.prefix && <span className="edt-istat__prefix">{b.stat.prefix}</span>}
              <strong className="edt-istat__value">{b.stat.value}</strong>
              <span className="edt-istat__text">{b.stat.label}</span>
              {b.stat.source && <figcaption className="edt-istat__src">Source: {b.stat.source}</figcaption>}
            </figure>
          )}
        </div>
        {hasImage && (
          <figure className="edt-photo edt-iphoto">
            <img
              src={b.image.url}
              alt={b.image.alt}
              style={b.image.focus ? { objectPosition: b.image.focus } : undefined}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
      </div>
    </section>
  );
}

function Cards({ b }) {
  const cols = b.numbered ? b.columns : Math.min(b.columns, Math.max(1, b.items.length));
  return (
    <section className="edt-section">
      <div className="edt-container">
        <SectionHead no={b.label} title={b.title} lead={b.lead} />
        <CardGrid items={b.items} cols={cols} numbered={b.numbered} label={b.numberPrefix} />
        {b.buttons.length > 0 && (
          <p className="edt-imore">
            {b.buttons.map((btn) => (
              <Action key={btn.label} href={btn.href} className="edt-btn edt-btn--ghost">
                {btn.label} <ArrowUpRight />
              </Action>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

function SplitList({ b }) {
  return (
    <section className="edt-section edt-split-section">
      <div className="edt-container edt-split edt-split--top">
        <div className="edt-split__text">
          <SectionHead no={b.label} title={b.title} lead={b.lead} />
          {b.body && <p className="edt-body">{b.body}</p>}
          {b.note && (
            <p className="edt-ihelpful">
              {b.noteLabel && <span>{b.noteLabel}</span>}
              {b.note}
            </p>
          )}
        </div>
        {b.list.length > 0 && (
          <div className="edt-card edt-iwalk">
            {b.listTitle && <p className="edt-iwalk__title">{b.listTitle}</p>}
            <ol className="edt-steps">
              {b.list.map((w, i) => (
                <li key={i}>
                  <strong>{w}</strong>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

function TagGroups({ b }) {
  return (
    <section className="edt-section">
      <div className="edt-container">
        <SectionHead no={b.label} title={b.title} lead={b.lead} />
        <div className="edt-card edt-itools">
          {b.groups.map((g) => (
            <div key={g.name} className="edt-itools__row">
              <span className="edt-itools__group">{g.name}</span>
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
  );
}

function Plans({ b }) {
  return (
    <section className="edt-section">
      <div className="edt-container">
        <SectionHead no={b.label} title={b.title} lead={b.lead} />
        {(b.plans.length > 0 || b.modes.length > 0) && (
          <div className="edt-iruns">
            {b.plans.length > 0 && (
              <div className="edt-card edt-iplans">
                {b.plansTitle && <p className="edt-iwalk__title">{b.plansTitle}</p>}
                <ul>
                  {b.plans.map((p) => (
                    <li key={p.name} className="edt-iplan">
                      <span className="edt-iplan__days">{p.name}</span>
                      <span className="edt-iplan__bar" style={{ '--w': `${p.weight}%` }} aria-hidden="true" />
                      <span className="edt-iplan__desc">{p.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {b.modes.length > 0 && (
              <div className="edt-card edt-imodes">
                {b.modesTitle && <p className="edt-iwalk__title">{b.modesTitle}</p>}
                {b.modes.map((m) => (
                  <p key={m.title} className="edt-imode">
                    <strong>{m.title}</strong>
                    <span>{m.desc}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
        {b.steps.length > 0 && (
          <>
            {b.stepsTitle && <h3 className="edt-isub">{b.stepsTitle}</h3>}
            <CardGrid items={b.steps} cols={4} />
          </>
        )}
      </div>
    </section>
  );
}

const BLOCKS = { text_media: TextMedia, cards: Cards, split_list: SplitList, tag_groups: TagGroups, plans: Plans };

/** /programmes/:format/:programme: a programme's full page, built from its CMS blocks. */
export default function ProgrammePage() {
  const { format, programme } = useParams();
  const site = useSite();
  const p = site.programmes.find((x) => x.slug === programme && x.page?.enabled && inCategory(x, format));
  usePageTitle(p ? p.title : site.status === 'ready' ? 'Page not found' : 'Programmes');
  useEffect(() => {
    if (p) track('programme_viewed', { programme: p.slug });
  }, [p?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) return site.status === 'ready' || site.status === 'error' ? <NotFoundPage /> : <div className="edt-section" aria-busy="true" />;

  const page = p.page;
  const when = scheduleLabel(p.schedule);
  const facts = [
    ...(when ? [{ value: when, label: p.schedule.mode || 'Starts' }] : []),
    ...page.facts,
  ];
  const others = page.related?.enabled
    ? site.programmes.filter((x) => x.slug !== p.slug && x.pagePath && inCategory(x, format))
    : [];
  const counsellor = page.counsellor?.phone ? page.counsellor : null;
  const enrolLabel = page.primaryButton || 'Enquire / Enrol';

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Programmes', to: '/programmes' },
          { label: categoryTitle(site, format), to: `/programmes/${format}` },
          { label: p.title },
        ]}
        eyebrow={page.eyebrow || p.type}
        title={p.title}
      >
        {page.tagline}
      </PageHero>

      <section className="edt-container edt-ifacts-wrap">
        <div className="edt-center">
          <ProgrammeBadges p={p} className="edt-prog__badges--center" />
        </div>
        {page.topics.length > 0 && (
          <ul className="edt-center edt-itopics" aria-label="Topics">
            {page.topics.map((x) => (
              <li key={x} className="edt-tag edt-tag--accent">
                {x}
              </li>
            ))}
          </ul>
        )}
        {facts.length > 0 && (
          <dl className="edt-ifacts">
            {facts.map((f) => (
              <div key={`${f.value}-${f.label}`} className="edt-ifact">
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="edt-center">
          <Link className="edt-btn edt-btn--primary" to={p.enrolPath}>
            {enrolLabel} <ArrowUpRight />
          </Link>
          {counsellor && (
            <a className="edt-btn edt-btn--ghost" href={telHref(counsellor.phone)}>
              Call our counsellor <ArrowUpRight />
            </a>
          )}
        </div>
      </section>

      {page.blocks.map((b) => {
        const Block = BLOCKS[b.type];
        return Block ? <Block key={b.id} b={b} /> : null;
      })}

      {others.length > 0 && (
        <section className="edt-section">
          <div className="edt-container">
            <SectionHead no={page.related.label} title={page.related.title || 'Explore more programmes.'} />
            <div className="edt-igrid edt-igrid--2">
              {others.map((o) => (
                <Link key={o.slug} to={o.pagePath} className="edt-card edt-icard edt-iother">
                  <strong className="edt-icard__title">{o.title}</strong>
                  <span className="edt-icard__desc">{o.page.tagline || o.card.summary}</span>
                  <span className="edt-iother__go">
                    View programme <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(page.cta?.title || page.cta?.text) && (
        <CtaBand
          title={page.cta.title}
          text={page.cta.text}
          actions={[
            { label: enrolLabel, href: p.enrolPath },
            ...(counsellor ? [{ label: `Call ${counsellor.name || 'our counsellor'}`, href: telHref(counsellor.phone) }] : []),
          ]}
        />
      )}
    </>
  );
}
