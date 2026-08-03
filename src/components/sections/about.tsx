"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  User,
  Rocket,
  Code2,
  Heart,
  Award,
  Zap,
  Target,
  Lightbulb,
} from "lucide-react";
import { Section, SectionCard } from "@/components/ui/section-wrapper";
import { personalInfo, experiences, projects, certifications } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: Award,
    label: "Years Experience",
    value: "5+",
    color: "from-primary to-blue-400",
  },
  {
    icon: Code2,
    label: "Projects Completed",
    value: projects.length + "+",
    color: "from-secondary to-cyan-400",
  },
  {
    icon: Rocket,
    label: "Happy Clients",
    value: "30+",
    color: "from-accent to-purple-400",
  },
  {
    icon: Zap,
    label: "Certifications",
    value: certifications.length + "+",
    color: "from-amber-500 to-orange-400",
  },
];

const values = [
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Every line of code serves a clear purpose. I align technical decisions with business objectives to deliver measurable impact.",
  },
  {
    icon: Heart,
    title: "Passionate Craft",
    description:
      "I care deeply about the details. From pixel-perfect interfaces to clean architecture, I pour effort into creating products people love to use.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Technology never stands still. I invest daily in learning new tools, patterns, and approaches to stay at the cutting edge.",
  },
];

export default function About() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const yearsExperience = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0);

  return (
    <Section
      id="about"
      eyebrow="Introduction"
      title="About Me"
      description="A passionate developer who transforms ideas into elegant, scalable, and performant digital experiences."
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="relative sticky top-28">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/20 via-card to-accent/20 group">
              <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />

              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl animate-blob" />
              <div
                className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent/30 blur-3xl animate-blob animation-delay-2000"
                aria-hidden
              />

              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-6xl sm:text-7xl font-display font-black text-white">
                    {personalInfo.name.charAt(0)}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2">
                  {personalInfo.name}
                </h3>
                <p className="text-primary font-medium mb-6">
                  {personalInfo.title}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {["Clean Code", "Performance", "UX-First", "Scalable"].map(
                    (tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          inView ? { opacity: 1, scale: 1 } : {}
                        }
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted"
                      >
                        {tag}
                      </motion.span>
                    )
                  )}
                </div>
              </div>

              <div className="absolute -top-1 -left-1 w-24 h-24 border-l-2 border-t-2 border-primary/40 rounded-tl-3xl" />
              <div className="absolute -bottom-1 -right-1 w-24 h-24 border-r-2 border-b-2 border-accent/40 rounded-br-3xl" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 overflow-hidden group"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity",
                        h.color
                      )}
                    />
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                        h.color
                      )}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-black mb-1">
                      {h.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted">
                      {h.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <SectionCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl">
                  Who I Am
                </h3>
              </div>
              <div className="space-y-4 text-muted leading-relaxed">
                <p className="text-base sm:text-lg text-white/90 font-medium">
                  I&apos;m a {personalInfo.title.toLowerCase()} with {yearsExperience}+
                  years of experience building exceptional digital products
                  that combine robust engineering with thoughtful design.
                </p>
                <p>
                  My journey in software development began with a deep
                  curiosity about how things work, and it has evolved into a
                  passion for creating impactful solutions that shape how
                  people interact with technology. I specialize in architecting
                  full-stack systems that are not only performant and scalable
                  but also a joy to use.
                </p>
                <p>
                  Beyond writing code, I believe in lifting teams up through
                  mentorship, knowledge sharing, and fostering a collaborative
                  environment where everyone can do their best work.
                </p>
              </div>
            </SectionCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <SectionCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display font-bold text-2xl">
                  My Philosophy
                </h3>
              </div>
              <div className="space-y-4 text-muted leading-relaxed">
                <p className="text-base sm:text-lg text-white/90 font-medium">
                  Great software is born at the intersection of engineering
                  excellence and empathetic design.
                </p>
                <p>
                  I approach every project with a few core principles in mind:
                  write code that future-you will thank you for, obsess over
                  the details that users never notice but always feel, and
                  remember that behind every screen is a human being whose
                  time and attention deserve respect.
                </p>
                <p>
                  I believe in small, iterative steps toward a grand vision —
                  and in the power of shipping early and often to learn,
                  refine, and ultimately deliver something extraordinary.
                </p>
              </div>
            </SectionCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h3 className="font-display font-bold text-2xl mb-6">
              What Drives Me
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:border-white/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all" />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-display font-semibold text-lg mb-2">
                        {v.title}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
