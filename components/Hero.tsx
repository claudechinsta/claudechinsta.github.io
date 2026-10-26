"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ text, ready, delay = 0 }: { text: string; ready: boolean; delay?: number }) {
  return (
    <span className="hero-line" aria-hidden>
      {text.split("").map((ch, i) => (
        <span className="mask" key={i}>
          <motion.span
            className="mask-inner hero-letter"
            initial={{ y: "115%", rotate: 8 }}
            animate={ready ? { y: 0, rotate: 0 } : {}}
            transition={{ duration: 1.3, ease, delay: delay + i * 0.05 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-orbs" aria-hidden>
        <div className="cell cell-1" />
        <div className="cell cell-2" />
        <div className="cell cell-3" />
        <div className="cell cell-4" />
        <div className="cell cell-5" />
      </div>

      <motion.h1 className="hero-title" style={{ y: titleY, scale: titleScale, opacity: fade }} aria-label={profile.name}>
        <Line text="CLAUDE" ready={ready} delay={0.1} />
        <Line text="CHEN" ready={ready} delay={0.35} />
      </motion.h1>

      <motion.div className="hero-bottom" style={{ opacity: fade }}>
        <div className="hero-role reveal-up">
          <span className="hero-role-prefix">I am a</span>
          <span className="hero-role-window">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="hero-role-text"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                {profile.roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span>Scroll</span>
          <motion.i animate={{ scaleY: [0.2, 1, 0.2], originY: [0, 0, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
