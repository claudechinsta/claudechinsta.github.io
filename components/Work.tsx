"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { work } from "@/lib/data";
import { Reveal } from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 7000;

function Media({ src, title }: { src: string; title: string }) {
  if (!src) return <div className="work-placeholder" role="img" aria-label={`${title} preview placeholder`}><span>Preview GIF</span></div>;
  if (/\.(mp4|webm)$/i.test(src)) return <video src={src} autoPlay muted loop playsInline aria-label={title} />;
  return <img src={src} alt={title} />;
}

export default function Work() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = work.length;
  const item = work[index];

  const go = (next: number, d: number) => {
    setDir(d);
    setIndex((next + count) % count);
  };
  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);

  // auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) next();
    else if (info.offset.x > 80) prev();
  };

  return (
    <section className="section work" id="work">
      <div className="section-inner">
        <Reveal className="eyebrow">
          Previous work
        </Reveal>
      </div>

      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            className="carousel-slide"
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: dir * 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -120 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="carousel-text">
              <h3 className="carousel-title">
                {item.title.split(" ").map((w, i) => (
                  <span className="mask" key={i}>
                    <motion.span
                      className="mask-inner"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease, delay: 0.15 + i * 0.07 }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </h3>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }}>
                {item.summary}
              </motion.p>
            </div>

            <motion.div
              className="carousel-media"
              initial={{ clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: dir > 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" }}
              transition={{ duration: 1, ease }}
            >
              <motion.div className="carousel-media-inner" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
                <Media src={item.media} title={item.title} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-controls" style={{ ["--n" as string]: count }}>
          <button aria-label="Previous project" onClick={prev} className="arrow">←</button>
          <div className="carousel-bars">
            {work.map((w, i) => (
              <button key={w.title} aria-label={`Go to ${w.title}`} onClick={() => go(i, i > index ? 1 : -1)} className={i === index ? "bar active" : "bar"}>
                <motion.i
                  key={`${i}-${index}-${paused}`}
                  initial={{ scaleX: i < index ? 1 : 0 }}
                  animate={{ scaleX: i < index ? 1 : i === index ? 1 : 0 }}
                  transition={i === index && !paused ? { duration: AUTOPLAY_MS / 1000, ease: "linear" } : { duration: 0.4 }}
                />
              </button>
            ))}
          </div>
          <button aria-label="Next project" onClick={next} className="arrow">→</button>
        </div>
      </div>
    </section>
  );
}
