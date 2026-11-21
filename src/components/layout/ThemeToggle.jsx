import { useEffect, useState } from 'react';

const KEY = 'edt-theme';

const currentTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** Light / dark switch. The theme lives on <html data-theme> and is remembered in localStorage. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.dataset.theme = 'light';
    else delete root.dataset.theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage blocked: the choice just won't persist */
    }
  }, [theme]);

  const isLight = theme === 'light';
  return (
    <div className="edt-theme" role="group" aria-label="Colour theme">
      <button
        type="button"
        className={`edt-theme__opt${!isLight ? ' is-active' : ''}`}
        aria-pressed={!isLight}
        onClick={() => setTheme('dark')}
      >
        <svg viewBox="0 0 24 24" className="edt-icon" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
        Dark
      </button>
      <button
        type="button"
        className={`edt-theme__opt${isLight ? ' is-active' : ''}`}
        aria-pressed={isLight}
        onClick={() => setTheme('light')}
      >
        <svg viewBox="0 0 24 24" className="edt-icon" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        Light
      </button>
    </div>
  );
}
