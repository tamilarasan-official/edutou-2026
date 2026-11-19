import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Order matters: mirrors the cascade of the original page.
import './styles/fonts.css';
import './styles/breakpoints.css';
import './styles/framer.css';
import './styles/edutou.css';

// Framer's stylesheet targets #main, so the app mounts there.
createRoot(document.getElementById('main')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
