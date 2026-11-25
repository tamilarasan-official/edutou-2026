import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/page/PageParts.jsx';
import { ProgrammeBadges, SiteStatus } from '../components/page/Catalogue.jsx';
import { API_URL, categoryTitle, scheduleLabel, useSite } from '../data/cms.js';
import usePageTitle from './usePageTitle.js';

const GENERAL = '';

function Field({ id, label, error, children }) {
  return (
    <div className={`edt-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id} className="edt-field__label">
        {label}
      </label>
      {children}
      {error && (
        <p className="edt-field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

/** /enroll?programme=<slug>: enrolment form, saved to the admin's Enrolments list. */
export default function EnrollPage() {
  usePageTitle('Enrol');
  const site = useSite();
  const [params, setParams] = useSearchParams();
  const requested = params.get('programme') ?? GENERAL;
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const programmes = site.programmes;
  const selected = useMemo(() => programmes.find((p) => p.slug === requested) ?? null, [programmes, requested]);
  const choice = selected ? selected.slug : GENERAL;
  const form = site.enrolForm;

  const choose = (slug) => {
    const next = new URLSearchParams(params);
    if (slug) next.set('programme', slug);
    else next.delete('programme');
    setParams(next, { replace: true });
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) data[key] = params.get(key) ?? '';
    data.programme = choice;

    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch(`${API_URL}/api/cms/enrol`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setDone({
          programme: body.data?.programme ?? null,
          whatsapp: body.data?.whatsappGroupUrl || form?.whatsappGroupUrl || '',
          email: body.data?.confirmationEmail ? data.email : '',
        });
        setStatus('done');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setErrors(body.error?.errors ?? { form: body.error?.message ?? 'Something went wrong. Please try again.' });
    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' });
    }
    setStatus('idle');
  }

  const describe = (field) => (errors[field] ? { 'aria-invalid': true, 'aria-describedby': `enrol-${field}-error` } : {});

  return (
    <>
      <PageHero crumbs={[{ label: 'Enrol' }]} eyebrow="Enrol" title={form?.title || 'Enrol with Edutou'}>
        {form?.intro}
      </PageHero>

      <section className="edt-section">
        <div className="edt-container edt-enrol">
          {site.status !== 'ready' ? (
            <SiteStatus site={site} />
          ) : status === 'done' ? (
            <div className="edt-card edt-enrol__done" role="status">
              <span className="edt-enrol__tick" aria-hidden="true">
                ✓
              </span>
              <h2>{form.successTitle}</h2>
              {done?.programme && done.programme !== 'General enquiry' && <p className="edt-enrol__for">{done.programme}</p>}
              <p>{form.successMessage}</p>
              {done?.email && (
                <p>
                  A confirmation email is on its way to <strong>{done.email}</strong>.
                </p>
              )}
              <div className="edt-enrol__done-actions">
                {done?.whatsapp && (
                  <a className="edt-btn edt-btn--primary" href={done.whatsapp} target="_blank" rel="noreferrer">
                    Join the WhatsApp group
                  </a>
                )}
                <Link className="edt-btn edt-btn--ghost" to="/programmes">
                  Explore more programmes
                </Link>
              </div>
            </div>
          ) : (
            <div className="edt-enrol__grid">
              <form className="edt-card edt-enrol__form" onSubmit={onSubmit} noValidate>
                {/* Honeypot for bots: hidden from people and screen readers. */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="edt-hp" />

                <Field id="enrol-programme" label="Programme" error={errors.programme}>
                  <select id="enrol-programme" className="edt-input" value={choice} onChange={(e) => choose(e.target.value)} {...describe('programme')}>
                    <option value={GENERAL}>Not sure yet / general enquiry</option>
                    {programmes.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title}
                        {p.type ? ` (${p.type})` : ''}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="enrol-name" label="Full name" error={errors.name}>
                  <input id="enrol-name" name="name" className="edt-input" autoComplete="name" required {...describe('name')} />
                </Field>

                <Field id="enrol-email" label="Email" error={errors.email}>
                  <input id="enrol-email" name="email" type="email" inputMode="email" className="edt-input" autoComplete="email" required {...describe('email')} />
                </Field>

                <Field id="enrol-phone" label="WhatsApp number" error={errors.phone}>
                  <div className="edt-input edt-input--prefixed">
                    <span className="edt-input__prefix" aria-hidden="true">
                      🇮🇳 +91
                    </span>
                    <input
                      id="enrol-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={14}
                      autoComplete="tel-national"
                      required
                      aria-label="WhatsApp number (India, +91)"
                      {...describe('phone')}
                    />
                  </div>
                </Field>

                <div className="edt-enrol__row">
                  <Field id="enrol-profession" label="Profession" error={errors.profession}>
                    <select id="enrol-profession" name="profession" className="edt-input" defaultValue="" required {...describe('profession')}>
                      <option value="" disabled>
                        Choose one
                      </option>
                      {form.professions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="enrol-city" label="City" error={errors.city}>
                    <input id="enrol-city" name="city" className="edt-input" autoComplete="address-level2" required {...describe('city')} />
                  </Field>
                </div>

                {errors.form && (
                  <p className="edt-field__error" role="alert">
                    {errors.form}
                  </p>
                )}

                <button type="submit" className="edt-btn edt-btn--primary edt-btn--block" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting…' : form.buttonText}
                </button>
                {form.privacyNote && <p className="edt-enrol__privacy">{form.privacyNote}</p>}
              </form>

              <aside className="edt-card edt-enrol__summary" aria-label="Selected programme">
                {selected ? (
                  <>
                    <div className="edt-enrol__head">
                      {selected.image?.url && (
                        <img
                          className="edt-enrol__img"
                          src={selected.image.url}
                          alt={selected.image.alt || ''}
                          style={selected.image.focus ? { objectPosition: selected.image.focus } : undefined}
                        />
                      )}
                      <div className="edt-enrol__headtext">
                        <ProgrammeBadges p={selected} />
                        <p className="edt-enrol__cat">{categoryTitle(site, selected.category)}</p>
                        <h2 className="edt-enrol__title">{selected.title}</h2>
                      </div>
                    </div>
                    {(() => {
                      const meta = [
                        scheduleLabel(selected.schedule),
                        selected.schedule?.duration,
                        selected.schedule?.mode,
                        selected.schedule?.language,
                      ].filter(Boolean);
                      return meta.length > 0 && <p className="edt-enrol__meta">{meta.join(' · ')}</p>;
                    })()}
                    {selected.card.summary && <p className="edt-enrol__text">{selected.card.summary}</p>}
                    {selected.pricing?.model === 'paid' && selected.pricing.note && <p className="edt-enrol__meta">{selected.pricing.note}</p>}
                    {selected.pagePath && (
                      <Link to={selected.pagePath} className="edt-enrol__more">
                        View full programme →
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="edt-enrol__title">Not sure which programme?</h2>
                    <p className="edt-enrol__text">
                      Send your details and our team will suggest the right course, webinar or workshop for you.
                    </p>
                    <Link to="/programmes" className="edt-enrol__more">
                      Browse all programmes →
                    </Link>
                  </>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
