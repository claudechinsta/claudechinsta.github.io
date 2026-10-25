"use client";

import { useCallback, useState } from "react";
import About from "@/components/About";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";
import Work from "@/components/Work";
import { visible } from "@/lib/data";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Preloader onDone={onDone} />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Work />
        {visible.projects && <Projects />}
        <Music />
      </main>
      <Footer />
    </>
  );
}
