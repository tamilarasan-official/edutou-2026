import { useEffect, useRef } from 'react';

const COLOR = 'rgb(255, 94, 0)';
const COUNT = 8;
const DURATION = 420; // ms
const RADIUS = 18;
const LENGTH = 9;

/** Small burst of orange sparks wherever the visitor clicks (canvas overlay). */
export default function ClickSpark() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sparks = [];
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const t = (now - s.start) / DURATION;
        if (t >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        const eased = 1 - (1 - t) * (1 - t); // ease-out
        const dist = eased * RADIUS;
        const len = LENGTH * (1 - eased);
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x + dist * Math.cos(s.angle), s.y + dist * Math.sin(s.angle));
        ctx.lineTo(s.x + (dist + len) * Math.cos(s.angle), s.y + (dist + len) * Math.sin(s.angle));
        ctx.stroke();
      }
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e) => {
      const start = performance.now();
      for (let i = 0; i < COUNT; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, angle: (2 * Math.PI * i) / COUNT, start });
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="edt-click-spark" aria-hidden="true" />;
}
