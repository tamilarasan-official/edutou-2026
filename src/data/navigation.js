// Site navigation: single source for the navbar, mobile menu and footer.
import { CONTACT_EMAIL } from './site.js';

/** mailto link with a pre-filled subject */
export const mailto = (subject) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/** Enrol page; pass ?programme=<slug> to pre-select a programme. */
export const ENROL_HREF = '/enroll';

// Programme categories ("learning formats") and domain filters are managed in
// the CMS (admin.edutou.in); see data/cms.js and useSite().

export const careerLinks = [
  { id: 'live-projects', title: 'Live Projects', desc: 'Build real products with mentor guidance' },
  { id: 'industry-exposure', title: 'Industry Exposure', desc: 'See how technology teams really work' },
  { id: 'career-development', title: 'Career Development', desc: 'Get ready for interviews and your first role' },
];

export const aboutLinks = [
  { id: 'our-story', title: 'Our Story', desc: 'Why Edutou exists' },
  { id: 'ceo', title: 'Our CEO', desc: 'Dr. Annie Grace Vimala, Co-Founder & CEO' },
  { id: 'our-team', title: 'Our Team', desc: 'The people behind Edutou' },
  { id: 'mentors', title: 'Mentors & Experts', desc: 'Practitioners who teach and guide' },
  { id: 'partners', title: 'Our Partners', desc: 'Institutions we work with' },
];

// Every category item has its own page: /programmes/<id>, /career/<id>, /about/<id>
careerLinks.forEach((c) => (c.path = `/career/${c.id}`));
aboutLinks.forEach((a) => (a.path = `/about/${a.id}`));

/** Section metadata, used for breadcrumbs and "more in this section" links. */
export const sections = {
  career: { label: 'Career', path: '/career', items: careerLinks },
  about: { label: 'About Us', path: '/about', items: aboutLinks },
};

/** Main menu, in order. `menu` items open a dropdown. */
export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Programmes', to: '/programmes', menu: 'programmes' },
  { label: 'Career', to: '/career', menu: 'career' },
  { label: 'About Us', to: '/about', menu: 'about' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
];

export const utilityNav = [
  { label: 'Verify Certificate', to: '/verify-certificate' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
];
