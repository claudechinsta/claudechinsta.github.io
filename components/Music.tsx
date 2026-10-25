"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { albums, music } from "@/lib/data";
import { Magnetic, MaskTitle, Reveal } from "./Reveal";

/** Placement of each cover in the crate: position (%), size (px), tilt (deg), parallax depth (0–1). */
const layout = [
  { x: 2, y: 4, s: 240, r: -14, d: 0.5 },
  { x: 40, y: 2, s: 200, r: 8, d: 0.8 },
  { x: 20, y: 30, s: 260, r: -4, d: 0.3 },
  { x: 60, y: 34, s: 170, r: 16, d: 1.1 },
  { x: 0, y: 58, s: 190, r: 6, d: 0.7 },
  { x: 38, y: 60, s: 230, r: -10, d: 0.4 },
  { x: 68, y: 62, s: 150, r: -20, d: 1.2 },
  { x: 12, y: 80, s: 170, r: 12, d: 0.9 },
  { x: 58, y: 84, s: 160, r: -6, d: 0.6 },
];

function Cover({
  album,
  pos,
  index,
  progress,
}: {
  album: (typeof albums)[number];
  pos: (typeof layout)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [-pos.d * 160, pos.d * 160]);
  return (
    <motion.div
      className="cover"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `calc(${pos.s}px * var(--k))`, y, zIndex: index }}
      initial={{ opacity: 0, rotate: pos.r + 8, scale: 0.9 }}
      whileInView={{ opacity: 1, rotate: pos.r, scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      title={`${album.title} (${album.year})`}
    >
      <img src={album.src} alt={`${album.title} — ${album.year}`} loading="lazy" />
    </motion.div>
  );
}

function Crate() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div className="crate" ref={ref} aria-label="Album covers">
      {albums.map((a, i) => (
        <Cover key={a.src} album={a} pos={layout[i]} index={i} progress={scrollYProgress} />
      ))}
    </div>
  );
}

export default function Music() {
  return (
    <section className="section music" id="music">
      <div className="section-inner music-grid">
        <div>
          <Reveal className="eyebrow">
            Music
          </Reveal>
          <MaskTitle className="section-title" text="Music productions." />
          <Reveal>
            <p className="lede">{music.blurb}</p>
          </Reveal>

          <div className="pill-row">
            {music.links.map((l) => (
              <Magnetic key={l.name}>
                <a className="pill" href={l.href} target="_blank" rel="noreferrer">
                  <span>{l.name}</span>
                  <i>↗</i>
                </a>
              </Magnetic>
            ))}
          </div>

          <Reveal className="player" y={60}>
            <small>Latest — “The Bay”</small>
            <iframe title="The Bay on SoundCloud" width="100%" height="166" scrolling="no" allow="autoplay" src={music.embed} loading="lazy" />
          </Reveal>
        </div>

        <Crate />
      </div>
    </section>
  );
}
