import { useParams } from 'react-router-dom';
import { CtaBand, PageHero, SiblingNav } from '../components/page/PageParts.jsx';
import Catalogue from '../components/page/Catalogue.jsx';
import { ENROL_HREF, mailto, programmeFormats, sections } from '../data/navigation.js';
import NotFoundPage from './NotFoundPage.jsx';
import usePageTitle from './usePageTitle.js';

/** /programmes/:format: one page per learning format (Courses, Workshops, ...). */
export default function ProgrammeFormatPage() {
  const { format: id } = useParams();
  const format = programmeFormats.find((f) => f.id === id);
  usePageTitle(format ? format.title : 'Page not found');
  if (!format) return <NotFoundPage />;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Programmes', to: '/programmes' }, { label: format.title }]}
        eyebrow={`Programmes · ${format.no}`}
        title={format.title}
      >
        {format.desc}.
      </PageHero>

      <Catalogue
        key={format.id}
        fixedFormat={format.id}
        title={`${format.title} at Edutou`}
        lead="Filter by technology domain."
      />

      <SiblingNav section={sections.programmes} />

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
