import { useParams } from 'react-router-dom';
import { CtaBand, PageHero, SiblingNav } from '../components/page/PageParts.jsx';
import Catalogue from '../components/page/Catalogue.jsx';
import { ENROL_HREF, mailto } from '../data/navigation.js';
import { useSite } from '../data/cms.js';
import NotFoundPage from './NotFoundPage.jsx';
import usePageTitle from './usePageTitle.js';

/** /programmes/:format: one page per learning format (Courses, Workshops, ...). */
export default function ProgrammeFormatPage() {
  const { format: id } = useParams();
  const site = useSite();
  const format = site.categories.find((f) => f.id === id);
  usePageTitle(format ? format.title : site.status === 'ready' ? 'Page not found' : 'Programmes');
  if (!format) return site.status === 'ready' ? <NotFoundPage /> : <div className="edt-section" aria-busy="true" />;
  const section = { label: 'Programmes', path: '/programmes', items: site.categories };

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Programmes', to: '/programmes' }, { label: format.title }]}
        eyebrow={`Programmes · ${format.no}`}
        title={format.title}
      >
        {format.description}
      </PageHero>

      <Catalogue
        key={format.id}
        fixedFormat={format.id}
        title={`${format.title} at Edutou`}
        lead="Filter by technology domain."
      />

      <SiblingNav section={section} />

      <CtaBand
        title={`Interested in ${format.title.toLowerCase()}?`}
        text="Tell us your goals and background, and we will suggest the right programme."
        actions={[
          { label: 'Enrol Now', href: ENROL_HREF },
          { label: 'For institutions', href: mailto(`Institutional enquiry: ${format.title}`) },
        ]}
      />
    </>
  );
}
