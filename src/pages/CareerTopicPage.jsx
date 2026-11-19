import { useParams } from 'react-router-dom';
import { CtaBand, PageHero, Photos, SectionHead, SiblingNav } from '../components/page/PageParts.jsx';
import { ArrowUpRight } from '../components/layout/icons.jsx';
import { ENROL_HREF, mailto, sections } from '../data/navigation.js';
import { career } from '../data/pages.js';
import NotFoundPage from './NotFoundPage.jsx';
import usePageTitle from './usePageTitle.js';

/** /career/:topic: Internships, Live Projects, Industry Exposure, Career Development. */
export default function CareerTopicPage() {
  const { topic } = useParams();
  const index = career.findIndex((c) => c.id === topic);
  const item = career[index];
  usePageTitle(item ? item.title : 'Page not found');
  if (!item) return <NotFoundPage />;
  const no = String(index + 1).padStart(2, '0');

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Career', to: '/career' }, { label: item.title }]}
        eyebrow={`Career · ${no}`}
        title={item.title}
      >
        {item.lead}
      </PageHero>

      <section className="edt-section edt-split-section">
        <div className="edt-container edt-split">
          <div className="edt-split__text">
            <SectionHead title={`About ${item.title.toLowerCase()}`} />
            <p className="edt-body">{item.body}</p>
            <a className="edt-btn edt-btn--ghost" href={mailto(item.cta)}>
              {item.cta} <ArrowUpRight />
            </a>
          </div>
          <Photos keys={item.photos} />
        </div>
      </section>

      <SiblingNav section={sections.career} />

      <CtaBand
        title="Ready to get practical experience?"
        text="Tell us what you want to build and which domain interests you."
        actions={[
          { label: 'Enrol Now', href: ENROL_HREF },
          { label: 'Industry partnerships', href: mailto('Industry partnership enquiry') },
        ]}
      />
    </>
  );
}
