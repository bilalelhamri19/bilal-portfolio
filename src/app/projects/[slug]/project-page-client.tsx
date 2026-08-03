"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Target,
  CheckSquare,
  Layers,
  Sparkles,
  Home,
} from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import { projects } from "@/data/portfolio";

type Project = typeof projects[0];

export function ProjectPageClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-muted hover:text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <span className="text-muted/50">/</span>
            <Link
              href="/#projects"
              className="text-muted hover:text-white transition-colors"
            >
              Projects
            </Link>
            <span className="text-muted/50">/</span>
            <span className="text-white font-medium truncate">
              {project.title}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl mb-10"
        >
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bgdark via-bgdark/30 to-transparent" />
            <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 mix-blend-overlay" />

            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6 sm:right-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-3 leading-tight">
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                    <span className="inline-flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {project.role}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDateRange(project.startDate, project.endDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all text-sm font-semibold text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display font-bold text-2xl">
                  Project Overview
                </h2>
              </div>
              <p className="text-muted leading-relaxed text-base sm:text-lg">
                {project.overview}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-display font-bold text-2xl">
                  Objectives
                </h2>
              </div>
              <p className="text-muted leading-relaxed text-base sm:text-lg">
                {project.objectives}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display font-bold text-2xl">
                  Key Features
                </h2>
              </div>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckSquare className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white/90 leading-relaxed">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 sticky top-28"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-muted font-semibold">
                  Project Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted">Duration</span>
                    <span className="text-sm font-medium">
                      {formatDateRange(
                        project.startDate,
                        project.endDate
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted">Role</span>
                    <span className="text-sm font-medium text-right max-w-[60%]">
                      {project.role.split(" - ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted">Features</span>
                    <span className="text-sm font-medium">
                      {project.features.length}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted">Technologies</span>
                    <span className="text-sm font-medium">
                      {project.technologies.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
                <Link
                  href="/#projects"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium text-sm"
                >
                  <Home className="w-4 h-4" />
                  More Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
