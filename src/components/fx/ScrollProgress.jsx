import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin orange bar at the very top showing how far the page is scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  return <motion.div className="edt-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
