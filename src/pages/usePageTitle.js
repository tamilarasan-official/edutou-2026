import { useEffect } from 'react';

const SITE = 'Edutou';

/** Sets the browser tab title for a page ("Programmes · Edutou"). */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE;
  }, [title]);
}
