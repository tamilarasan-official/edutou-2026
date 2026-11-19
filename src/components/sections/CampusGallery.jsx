import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { galleryPhotos } from '../../data/site.js';
import ShinyText from '../fx/ShinyText.jsx';
import Lightbox from '../Lightbox.jsx';

const columnsFor = (width) => (width >= 1000 ? 3 : 2);

// Upward scroll speed (px per second) for each column; slightly different so
// the columns don't move in lock-step.
const SPEEDS = [50, 58, 54];

/** Masonry split: each photo goes into the currently shortest column. */
function distribute(photos, count) {
  const cols = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  for (const p of photos) {
    let idx = 0;
    for (let j = 1; j < count; j++) if (heights[j] < heights[idx]) idx = j;
    cols[idx].push(p);
    heights[idx] += p.h / p.w;
  }
  return cols;
}

function useColumnCount() {
  const [count, setCount] = useState(() => columnsFor(window.innerWidth));
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setCount(columnsFor(window.innerWidth)), 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return count;
}

function Photo({ p, hidden, onOpen }) {
  const open = () => onOpen(p);
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };
  return (
    <figure
      aria-hidden={hidden || undefined}
      role={hidden ? undefined : 'button'}
      tabIndex={hidden ? -1 : 0}
      aria-label={hidden ? undefined : `View photo: ${p.alt}`}
      onClick={open}
      onKeyDown={hidden ? undefined : onKeyDown}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/gallery-${p.k}.jpg`}
        alt={hidden ? '' : p.alt}
        width={p.w}
        height={p.h}
        decoding="async"
        fetchPriority="low"
      />
    </figure>
  );
}

/**
 * One endlessly scrolling column. The photos are rendered twice and the track
 * moves up by exactly one copy, so the loop is seamless.
 */
function ScrollingColumn({ photos, speed, onOpen }) {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const measure = () => setDuration(track.scrollHeight / 2 / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [speed, photos]);

  return (
    <div className="edt-col">
      <div className="edt-track" ref={trackRef} style={duration ? { animationDuration: `${duration}s` } : undefined}>
        {photos.map((p) => (
          <Photo key={p.k} p={p} onOpen={onOpen} />
        ))}
        {photos.map((p) => (
          <Photo key={`${p.k}-loop`} p={p} hidden onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

/** "Inside the Edutou classroom" photo wall: columns that scroll upwards. */
export default function CampusGallery() {
  const count = useColumnCount();
  const columns = useMemo(() => distribute(galleryPhotos, count), [count]);
  const [openIndex, setOpenIndex] = useState(null);
  const onOpen = (p) => setOpenIndex(galleryPhotos.indexOf(p));

  return (
    <section className="edt-gallery" data-framer-name="Campus Gallery">
      <div className="edt-gallery__inner">
        <div className="edt-gallery__head">
          <span className="edt-eyebrow">
            <ShinyText>On the ground</ShinyText>
          </span>
          <h2 className="edt-gallery__title">Inside the Edutou classroom</h2>
          <p className="edt-gallery__sub">
            Real students, real campuses. Hands-on AI learning with our teams at Saveetha University, Madras Engineering
            College and beyond.
          </p>
        </div>
        <div className="edt-cols edt-marquee">
          {columns.map((col, i) => (
            <ScrollingColumn key={`${count}-${i}`} photos={col} speed={SPEEDS[i % SPEEDS.length]} onOpen={onOpen} />
          ))}
        </div>
      </div>
      <Lightbox photos={galleryPhotos} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
