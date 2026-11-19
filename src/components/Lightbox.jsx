import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const src = (p) => `${import.meta.env.BASE_URL}images/gallery-${p.k}.jpg`;

/** Full-screen photo viewer for the campus gallery. */
export default function Lightbox({ photos, index, onChange, onClose }) {
  const open = index !== null && index !== undefined;
  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const count = photos.length;
  const go = (step) => onChange((i) => (i + step + count) % count);

  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const photo = open ? photos[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="edt-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            className="edt-lightbox__btn edt-lightbox__close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <button
            type="button"
            className="edt-lightbox__btn edt-lightbox__prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="edt-lightbox__btn edt-lightbox__next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={photo.k}
              className="edt-lightbox__figure"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={src(photo)} alt={photo.alt} width={photo.w} height={photo.h} />
              <figcaption>
                <span>{photo.alt}</span>
                <span className="edt-lightbox__count">
                  {index + 1} / {count}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
