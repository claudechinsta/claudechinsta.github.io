"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテト<>/{}[]#$%&*+=";
const BOOT_LOG: [number, string][] = [
  [0, "> init kernel ........ ok"],
  [22, "> mounting /portfolio ... ok"],
  [48, "> loading modules ...... ok"],
  [72, "> decrypting profile .... ok"],
  [94, "> access granted"],
];

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Matrix-style rain and a boot log. Lifts away once access is granted. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // digital rain
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const size = 16;
    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(window.innerWidth / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${size}px ui-monospace, Menlo, monospace`;
      for (let i = 0; i < cols; i++) {
        const head = Math.random() > 0.98;
        ctx.fillStyle = head ? "#ffffff" : "rgba(118, 146, 255, 0.55)";
        ctx.fillText(randomGlyph(), i * size, drops[i] * size);
        if (drops[i] * size > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6 + Math.random() * 0.4;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // progress
  useEffect(() => {
    let exit: ReturnType<typeof setTimeout> | undefined;
    const controls = animate(0, 100, {
      duration: 2.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        // let "access granted" register before the curtain goes up
        exit = setTimeout(() => {
          setLeaving(true);
          onDone();
        }, 600);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(exit);
    };
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && document.body.classList.remove("is-loading")}
    >
      <canvas ref={canvasRef} className="rain" aria-hidden />

      <div className="boot-log" aria-hidden>
        {BOOT_LOG.map(([at, line]) => (
          <div key={line} style={{ opacity: progress >= at ? 1 : 0 }}>
            {line}
          </div>
        ))}
        <div className="cursor-blink">_</div>
      </div>
    </motion.div>
  );
}
