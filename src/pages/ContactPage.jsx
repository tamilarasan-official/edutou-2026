import { PageHero } from '../components/page/PageParts.jsx';
import { ArrowUpRight, Mail } from '../components/layout/icons.jsx';
import { mailto } from '../data/navigation.js';
import { CONTACT_EMAIL } from '../data/site.js';
import usePageTitle from './usePageTitle.js';

const AUDIENCES = [
  {
    title: 'Learners',
    text: 'Questions about programmes, enrolment, schedules or certificates.',
    action: 'Enrolment enquiry',
    subject: 'Enrolment enquiry',
  },
  {
    title: 'Institutions',
    text: 'Bring workshops, bootcamps and campus programmes to your college or university.',
    action: 'Partner with us',
    subject: 'Institutional partnership enquiry',
  },
  {
    title: 'Industry',
    text: 'Offer internships and live projects, or collaborate on industry exposure sessions.',
    action: 'Collaborate with us',
    subject: 'Industry partnership enquiry',
  },
];

/** /contact: enquiries and institutional partnerships. */
export default function ContactPage() {
  usePageTitle('Contact');
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk">
        Enquiries from learners, institutions and industry partners are all welcome.
      </PageHero>
      <section className="edt-section">
        <div className="edt-container">
          <div className="edt-audiences">
            {AUDIENCES.map((a) => (
              <article key={a.title} className="edt-card edt-audience">
                <h2>{a.title}</h2>
                <p>{a.text}</p>
                <a className="edt-btn edt-btn--ghost" href={mailto(a.subject)}>
                  {a.action} <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
          {CONTACT_EMAIL && (
            <a className="edt-card edt-mailcard" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="edt-mailcard__icon">
                <Mail />
              </span>
              <span>
                <small>Email us directly</small>
                <strong>{CONTACT_EMAIL}</strong>
              </span>
            </a>
          )}
        </div>
      </section>
    </>
  );
}
