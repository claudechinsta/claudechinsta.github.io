"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/lib/data";
import { MaskTitle, Reveal, ScrubText } from "./Reveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="section about" id="about">
      <Reveal className="eyebrow">
        About
      </Reveal>
      <div className="about-grid">
        <motion.div
          ref={ref}
          className="about-photo"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img src="/assets/img/claude_profile.jpg" alt="Claude Chen" style={{ y: imgY }} />
        </motion.div>
        <div className="about-copy">
          <MaskTitle className="section-title" text="Engineer by trade, beatmaker by heart." />
          <ScrubText className="about-statement" text={profile.statement} />
        </div>
      </div>
    </section>
  );
}
