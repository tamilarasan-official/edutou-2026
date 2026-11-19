// Site navigation: single source for the navbar, mobile menu and footer.
import { CONTACT_EMAIL } from './site.js';

/** mailto link with a pre-filled subject */
export const mailto = (subject) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const ENROL_HREF = mailto('Enrolment enquiry');

// Programmes → explore by learning format
export const programmeFormats = [
  { id: 'courses', no: '01', title: 'Courses', desc: 'Structured, domain-specific learning programmes' },
  { id: 'workshops', no: '02', title: 'Workshops', desc: 'Short-duration, practical learning experiences' },
  { id: 'bootcamps', no: '03', title: 'Bootcamps', desc: 'Intensive, hands-on skill development' },
  { id: 'masterclasses', no: '04', title: 'Masterclasses', desc: 'Expert-led advanced learning sessions' },
  {
    id: 'internship-programmes',
    no: '05',
    title: 'Internship Programmes',
    desc: 'Industry exposure and practical experience',
  },
  {
    id: 'specialised-programmes',
    no: '06',
    title: 'Specialised Programmes',
    desc: 'Customised and interdisciplinary learning',
  },
];

// Technology domains are filters inside the catalogue, not navbar items.
export const domains = ['AI', 'CSE', 'ECE', 'EEE', 'Robotics', 'Drone', 'AMR', 'VLSI', 'PCB'];

export const careerLinks = [
  { id: 'internships', title: 'Internships', desc: 'Apply your skills in real roles' },
  { id: 'live-projects', title: 'Live Projects', desc: 'Build real products with mentor guidance' },
  { id: 'industry-exposure', title: 'Industry Exposure', desc: 'See how technology teams really work' },
  { id: 'career-development', title: 'Career Development', desc: 'Get ready for interviews and your first role' },
];

export const aboutLinks = [
  { id: 'our-story', title: 'Our Story', desc: 'Why Edutou exists' },
  { id: 'our-team', title: 'Our Team', desc: 'The people behind Edutou' },
  { id: 'mentors', title: 'Mentors & Experts', desc: 'Practitioners who teach and guide' },
  { id: 'partners', title: 'Our Partners', desc: 'Institutions we work with' },
];

// Every category item has its own page: /programmes/<id>, /career/<id>, /about/<id>
programmeFormats.forEach((f) => (f.path = `/programmes/${f.id}`));
careerLinks.forEach((c) => (c.path = `/career/${c.id}`));
aboutLinks.forEach((a) => (a.path = `/about/${a.id}`));

/** Section metadata, used for breadcrumbs and "more in this section" links. */
export const sections = {
  programmes: { label: 'Programmes', path: '/programmes', items: programmeFormats },
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
