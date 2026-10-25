"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft glow that trails the pointer, plus a small dot. Hidden on touch devices. */
export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glowX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 40 });
  const dotY = useSpring(y, { stiffness: 600, damping: 40 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="cursor-layer" aria-hidden>
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} />
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
    </div>
  );
}
