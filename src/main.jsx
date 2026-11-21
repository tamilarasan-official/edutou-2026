import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Order matters: mirrors the cascade of the original page.
import './styles/fonts.css';
import './styles/breakpoints.css';
import './styles/framer.css';
import './styles/edutou.css';
import './styles/enhancements.css';
import './styles/responsive.css';
import './styles/layout.css';
import './styles/pages.css';
import './styles/internship.css';
import './styles/theme.css';

// Framer's stylesheet targets #main, so the app mounts there.
createRoot(document.getElementById('main')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
