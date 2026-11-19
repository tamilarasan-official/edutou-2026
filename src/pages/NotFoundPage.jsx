import { Link } from 'react-router-dom';
import { PageHero } from '../components/page/PageParts.jsx';
import usePageTitle from './usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHero eyebrow="404" title="This page doesn’t exist">
        The link may be broken or the page may have moved.
      </PageHero>
      <section className="edt-section">
        <div className="edt-container edt-center">
          <Link className="edt-btn edt-btn--primary" to="/">
            Back to home
          </Link>
          <Link className="edt-btn edt-btn--ghost" to="/programmes">
            Explore programmes
          </Link>
        </div>
      </section>
    </>
  );
}
