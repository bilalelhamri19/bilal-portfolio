"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/section-wrapper";
import { experiences } from "@/data/portfolio";
import { formatDateRange, cn } from "@/lib/utils";

export default function Experience() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="experience"
      eyebrow="Career Journey"
      title="Professional Experience"
      description="A timeline of my professional growth, impactful projects, and the teams I've had the pleasure of building with."
    >
      <div ref={ref} className="relative">
        <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className={cn(
                  "relative flex items-start sm:items-stretch",
                  isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                )}
              >
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 items-center justify-center z-10 top-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="relative"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
                    <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                  </motion.div>
                </div>

                <div className="flex sm:hidden absolute left-4 -translate-x-1/2 w-3 items-center justify-center z-10 top-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.7)]"
                  />
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                    y: 30,
                  }}
                  animate={
                    inView
                      ? { opacity: 1, x: 0, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="w-full sm:w-[calc(50%-2rem)] ml-10 sm:ml-0 sm:mr-auto sm:pr-0"
                >
                  <div className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-opacity duration-500" />

                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative p-6 sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                              <Briefcase className="w-3 h-3" />
                              {exp.role}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-xl sm:text-2xl mb-1 group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-muted">
                            <Calendar className="w-3 h-3" />
                            {formatDateRange(
                              exp.startDate,
                              exp.endDate
                            )}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2.5">
                          {exp.achievements.map(
                            (achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={
                                  inView
                                    ? { opacity: 1, x: 0 }
                                    : {}
                                }
                                transition={{
                                  delay:
                                    0.5 +
                                    index * 0.1 +
                                    i * 0.05,
                                }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-white/80">
                                  {achievement}
                                </span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={
                                inView
                                  ? { opacity: 1, scale: 1 }
                                  : {}
                              }
                              transition={{
                                delay:
                                  0.6 +
                                  index * 0.1 +
                                  i * 0.03,
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 hover:border-primary/30 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
