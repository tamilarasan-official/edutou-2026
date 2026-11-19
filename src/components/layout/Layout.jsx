import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import SiteFooter from './SiteFooter.jsx';
import ScrollManager from './ScrollManager.jsx';
import ScrollProgress from '../fx/ScrollProgress.jsx';
import BackToTop from '../fx/BackToTop.jsx';
import ClickSpark from '../fx/ClickSpark.jsx';
import useSpotlight from '../fx/useSpotlight.js';

// Cards that get the cursor spotlight: homepage bento / benefit / FAQ cards and
// the cards on the inner pages.
const SPOTLIGHT_CARDS =
  '.framer-64b7uw, .framer-x161et, .framer-5hufie, .framer-f6d2y6, .framer-GeYn9, .framer-cfihB, .edt-card';

/** Shared page shell: header, page content, footer and global effects. */
export default function Layout() {
  const rootRef = useRef(null);
  useSpotlight(rootRef, SPOTLIGHT_CARDS);

  return (
    <div ref={rootRef} className="edt-app">
      <ScrollManager />
      <Navbar />
      <main id="content">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollProgress />
      <BackToTop />
      <ClickSpark />
    </div>
  );
}
