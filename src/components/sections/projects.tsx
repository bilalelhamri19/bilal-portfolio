"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Calendar,
  User,
  CheckSquare,
  Target,
  Layers,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section-wrapper";
import { projects } from "@/data/portfolio";
import { cn, formatDateRange } from "@/lib/utils";

export default function Projects() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Featured Work"
      title="Projects"
      description="A selection of projects that showcase my technical expertise, creative problem-solving, and passion for building exceptional digital products."
    >
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => {
          const projectRef = React.useRef(null);
          const projectInView = useInView(projectRef, {
            once: true,
            margin: "-50px",
          });

          return (
            <motion.article
              key={project.id}
              ref={projectRef}
              initial={{ opacity: 0, y: 60 }}
              animate={
                projectInView ? { opacity: 1, y: 0 } : {}
              }
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl card-hover"
              style={{
                perspective: "1000px",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-opacity duration-500 pointer-events-none"
                aria-hidden
              />

              <div className="relative">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority={index < 2}
                    className={cn(
                      "object-cover transition-all duration-700",
                      hoveredId === project.id &&
                        "scale-110 brightness-75"
                    )}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-bgdark via-bgdark/40 to-transparent" />
                  <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-0 group-hover:opacity-30 transition-opacity mix-blend-overlay" />

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-xl bg-bgdark/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        aria-label="View source code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-xl bg-primary/90 backdrop-blur-xl border border-primary/30 flex items-center justify-center text-white hover:bg-primary transition-colors shadow-lg shadow-primary/30"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bgdark/80 backdrop-blur-xl border border-white/10 text-xs text-muted">
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(
                          project.startDate,
                          project.endDate
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl group-hover:text-primary transition-colors mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <User className="w-3.5 h-3.5" />
                        <span>{project.role}</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <p className="text-muted leading-relaxed mb-6 line-clamp-3">
                    {project.overview}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-wider text-muted font-semibold mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-muted">
                          +{project.technologies.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-primary hover:border-primary hover:text-white transition-all w-full sm:w-auto justify-center"
                  >
                    View Project Details
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
