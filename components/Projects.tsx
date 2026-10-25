"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "@/lib/data";
import { MaskTitle, Reveal } from "./Reveal";

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 20 });
  const y = useSpring(my, { stiffness: 140, damping: 20 });

  return (
    <section
      className="section projects"
      id="projects"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="section-inner">
        <Reveal className="eyebrow">
          Selected work
        </Reveal>
        <MaskTitle className="section-title" text="Project showcase." />
        <Reveal>
          <p className="lede">Full-stack development across web, visualisation, data management and devops.</p>
        </Reveal>

        <ul className="project-list" onMouseLeave={() => setActive(null)}>
          {projects.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className={active !== null && active !== i ? "dim" : ""}
              onMouseEnter={() => setActive(i)}
            >
              <a href={p.href} target="_blank" rel="noreferrer">
                <span className="project-index">0{i + 1}</span>
                <span className="project-main">
                  <span className="project-name">{p.name}</span>
                  <span className="project-cn">{p.nameCN}</span>
                  <img className="project-thumb" src={p.img} alt="" />
                </span>
                <span className="project-year">{p.year}</span>
                <span className="project-arrow">↗</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div className="project-preview" style={{ x, y }}>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="project-preview-card"
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={projects[active].img} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
