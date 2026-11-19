import { useRef } from 'react';
import Header from './components/header/Header.jsx';
import HeroBackground from './components/sections/HeroBackground.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ClientsStrip from './components/sections/ClientsStrip.jsx';
import IntroSection from './components/sections/IntroSection.jsx';
import BentoSection from './components/sections/BentoSection.jsx';
import FeatureSection from './components/sections/FeatureSection.jsx';
import BenefitSection from './components/sections/BenefitSection.jsx';
import ProgramsMarquee from './components/sections/ProgramsMarquee.jsx';
import CampusGallery from './components/sections/CampusGallery.jsx';
import FaqSection from './components/sections/FaqSection.jsx';
import Footer from './components/Footer.jsx';
import DotPattern from './components/DotPattern.jsx';
import SvgTemplates from './components/SvgTemplates.jsx';
import ScrollProgress from './components/fx/ScrollProgress.jsx';
import ClickSpark from './components/fx/ClickSpark.jsx';
import BackToTop from './components/fx/BackToTop.jsx';
import useSpotlight from './components/fx/useSpotlight.js';
import useFramerEffects from './effects/useFramerEffects.js';

// Cards that get the cursor spotlight (bento cards, benefit cards, FAQ rows)
const SPOTLIGHT_CARDS = '.framer-64b7uw, .framer-x161et, .framer-5hufie, .framer-f6d2y6, .framer-GeYn9, .framer-cfihB';

export default function App() {
  const rootRef = useRef(null);
  useFramerEffects(rootRef);
  useSpotlight(rootRef, SPOTLIGHT_CARDS);

  return (
    <>
      {/* Page wrapper + layout classes from the Framer design */}
      <div
        ref={rootRef}
        className="framer-0Hn7k framer-1rjbxzi"
        data-layout-template="true"
        style={{ minHeight: '100vh', width: 'auto' }}
      >
        <Header />
        <div
          data-framer-root=""
          className="framer-FwoPK framer-cfhJf framer-2VydA framer-FhOEs framer-woUJV framer-n1hRo framer-GiAC3 framer-zhPc1 framer-72rtr7"
          style={{ minHeight: '100vh', width: 'auto', display: 'contents' }}
        >
          <HeroBackground />
          <HeroSection />
          <ClientsStrip />
          <IntroSection />
          <BentoSection />
          <FeatureSection />
          <BenefitSection />
          <ProgramsMarquee />
          <CampusGallery />
          <FaqSection />
        </div>
        <div id="overlay" />
        <div className="framer-s988te" />
        <Footer />
        <DotPattern />
      </div>
      <SvgTemplates />
      <ScrollProgress />
      <BackToTop />
      <ClickSpark />
    </>
  );
}
