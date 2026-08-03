"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import {
  Education,
  Languages,
  SoftSkills,
} from "@/components/sections/education-languages";
import Contact from "@/components/sections/contact";
import { Toaster } from "sonner";

const BackgroundEffects = dynamic(
  () => import("@/components/ui/background-effects"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            backdropFilter: "blur(16px)",
          },
          className: "",
        }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Languages />
      <SoftSkills />
      <Contact />
    </>
  );
}
