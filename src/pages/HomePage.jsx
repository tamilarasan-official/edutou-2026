import { useRef } from 'react';
import HeroBackground from '../components/sections/HeroBackground.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import ClientsStrip from '../components/sections/ClientsStrip.jsx';
import IntroSection from '../components/sections/IntroSection.jsx';
import BentoSection from '../components/sections/BentoSection.jsx';
import FeatureSection from '../components/sections/FeatureSection.jsx';
import BenefitSection from '../components/sections/BenefitSection.jsx';
import ProgramsMarquee from '../components/sections/ProgramsMarquee.jsx';
import CampusGallery from '../components/sections/CampusGallery.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import DotPattern from '../components/DotPattern.jsx';
import SvgTemplates from '../components/SvgTemplates.jsx';
import useFramerEffects from '../effects/useFramerEffects.js';
import usePageTitle from './usePageTitle.js';

/** Landing page: the original Framer design plus the Edutou sections. */
export default function HomePage() {
  const rootRef = useRef(null);
  useFramerEffects(rootRef);
  usePageTitle(null);

  return (
    <>
      {/* Page wrapper + layout classes from the Framer design */}
      <div
        ref={rootRef}
        className="framer-0Hn7k framer-1rjbxzi"
        data-layout-template="true"
        style={{ minHeight: '100vh', width: 'auto' }}
      >
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
        <DotPattern />
      </div>
      <SvgTemplates />
    </>
  );
}
