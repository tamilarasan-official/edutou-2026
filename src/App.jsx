import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProgrammesPage from './pages/ProgrammesPage.jsx';
import ProgrammeFormatPage from './pages/ProgrammeFormatPage.jsx';
import ProgrammePage from './pages/ProgrammePage.jsx';
import EnrollPage from './pages/EnrollPage.jsx';
import CareerPage from './pages/CareerPage.jsx';
import CareerTopicPage from './pages/CareerTopicPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AboutTopicPage from './pages/AboutTopicPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import VerifyCertificatePage from './pages/VerifyCertificatePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="programmes" element={<ProgrammesPage />} />
        <Route path="programmes/:format" element={<ProgrammeFormatPage />} />
        <Route path="programmes/:format/:programme" element={<ProgrammePage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="career/:topic" element={<CareerTopicPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="about/:topic" element={<AboutTopicPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="enroll" element={<EnrollPage />} />
        <Route path="enrol" element={<EnrollPage />} />
        <Route path="verify-certificate" element={<VerifyCertificatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
