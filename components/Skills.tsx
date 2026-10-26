"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillRows } from "@/lib/data";
import { MaskTitle, Reveal } from "./Reveal";

function Row({ items, dir, duration }: { items: (typeof skillRows)[number]; dir: 1 | -1; duration: number }) {
  const [paused, setPaused] = useState(false);
  const loop = Array.from({ length: 8 }, () => items).flat();
  return (
    <div className="marquee" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div
        className={`marquee-track${paused ? " is-paused" : ""}`}
        style={{ animationDuration: `${duration}s`, animationDirection: dir === 1 ? "normal" : "reverse" }}
      >
        {loop.map((s, i) => (
          <div className="skill" key={i} title={s.name}>
            <div className="skill-icon">
              <img src={s.img} alt={s.name} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const words = ["Full-stack", "Machine learning", "Artificial intelligence", "Data Visualisation", "DevOps", "Cloud", "Digital transformation", "SaaS platform", "Fintech"];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 4]);

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="section-inner">
        <Reveal className="eyebrow">
          Skill set
        </Reveal>
        <MaskTitle className="section-title" text="Tools I reach for." />
        <ul className="skill-words">
          {words.map((w, i) => (
            <motion.li
              key={w}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              {w}
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.div className="marquee-stack" style={{ rotate: tilt }}>
        <Row items={skillRows.flat()} dir={1} duration={60} />
      </motion.div>
    </section>
  );
}
