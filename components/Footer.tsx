"use client";

import { profile } from "@/lib/data";
import { Magnetic, Reveal } from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <Magnetic>
        <a className="pill contact-btn" href={`mailto:${profile.email}`}>
          <span>Contact me</span>
          <i>↗</i>
        </a>
      </Magnetic>
      <div className="footer-meta">
        <span>Claude Chen @ {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
