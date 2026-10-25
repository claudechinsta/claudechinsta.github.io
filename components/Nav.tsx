"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { profile, visible } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  ...(visible.projects ? [{ href: "#projects", label: "Projects" }] : []),
  { href: "#music", label: "Music" },
];

export default function Nav({ ready }: { ready: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <a href="#top" className="nav-logo">
          {profile.nickname}<span>.</span>
        </a>
        <nav>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>
      </motion.header>
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
