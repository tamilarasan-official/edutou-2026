import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Mail } from './icons.jsx';
import { CONTACT_EMAIL } from '../../data/site.js';
import { aboutLinks, careerLinks, programmeFormats, utilityNav } from '../../data/navigation.js';

const COLUMNS = [
  {
    title: 'Programmes',
    links: [
      ...programmeFormats.map((f) => ({ label: f.title, to: `/programmes?format=${f.id}` })),
      { label: 'All programmes', to: '/programmes' },
    ],
  },
  { title: 'Career', links: careerLinks.map((c) => ({ label: c.title, to: `/career#${c.id}` })) },
  { title: 'About Us', links: aboutLinks.map((a) => ({ label: a.title, to: `/about#${a.id}` })) },
];

/** Site-wide footer. */
export default function SiteFooter() {
  return (
    <footer className="edt-footer">
      <div className="edt-footer__inner">
        <div className="edt-footer__brand">
          <Logo />
          <p>AI-powered, hands-on learning that turns skills into careers. For learners, institutions and industry.</p>
          {CONTACT_EMAIL && (
            <a className="edt-footer__mail" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail /> {CONTACT_EMAIL}
            </a>
          )}
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} className="edt-footer__col" aria-label={col.title}>
            <p className="edt-footer__title">{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="edt-footer__bottom">
        <div className="edt-footer__inner edt-footer__inner--bottom">
          <p>© 2026 Edutou. All rights reserved.</p>
          <nav aria-label="Utility">
            <ul className="edt-footer__utility">
              {utilityNav.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
