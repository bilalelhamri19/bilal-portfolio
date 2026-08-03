"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Award,
  Star,
  CheckCircle2,
  Globe,
  Brain,
  Users,
  MessageSquare,
  Zap,
  Sparkles,
  Clock,
  Handshake,
  Target,
} from "lucide-react";
import { Section } from "@/components/ui/section-wrapper";
import {
  education,
  certifications,
  languages,
  softSkills,
} from "@/data/portfolio";
import { formatDateRange, cn } from "@/lib/utils";

const softSkillIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  brain: Brain,
  users: Users,
  "message-square": MessageSquare,
  zap: Zap,
  sparkles: Sparkles,
  clock: Clock,
  handshake: Handshake,
  target: Target,
};

export function Education() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="education"
      eyebrow="Academic Background"
      title="Education & Certifications"
      description="Formal education and professional certifications that form the foundation of my technical expertise."
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-display font-bold text-xl sm:text-2xl mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            Education
          </h3>

          {education.map((edu, index) => {
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden card-hover"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                          {edu.diploma}
                        </h4>
                        <p className="text-muted">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-muted">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                      {edu.gpa && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed mb-5">
                    {edu.description}
                  </p>
                  {edu.achievements && (
                    <div>
                      <h5 className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                        Highlights
                      </h5>
                      <ul className="space-y-2">
                        {edu.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-white/80">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-6">
          <h3 className="font-display font-bold text-xl sm:text-2xl mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => {
              return (
                <motion.a
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="group block relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 overflow-hidden hover:border-accent/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-transparent group-hover:from-accent/10 transition-opacity" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-white/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="font-semibold text-base leading-snug mb-1 group-hover:text-accent transition-colors">
                        {cert.name}
                      </h5>
                      <p className="text-sm text-muted mb-2">
                        {cert.issuer}
                      </p>
                      <span className="text-xs text-muted font-mono">
                        Issued {formatDateRange(cert.date, cert.date)}
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Languages() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mt-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-sm font-medium mb-4"
          >
            <Globe className="w-4 h-4" />
            Communication
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight"
          >
            <span className="gradient-text">Languages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted max-w-2xl"
          >
            Multilingual capabilities that enable effective collaboration
            across diverse teams and global markets.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {languages.map((lang, index) => {
            return (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {}
                }
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border border-white/10 flex items-center justify-center">
                      <Globe className="w-7 h-7 text-secondary" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80">
                      {lang.level}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4">
                    {lang.name}
                  </h3>
                  <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${lang.proficiency}%` }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + index * 0.1,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                    >
                      <div className="absolute inset-0 bg-shimmer-pattern animate-shimmer opacity-50" />
                    </motion.div>
                  </div>
                  <div className="mt-2 text-right text-xs text-muted font-mono">
                    {lang.proficiency}% proficiency
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SoftSkills() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mt-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Beyond Code
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight"
          >
            <span className="gradient-text">Soft Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            The interpersonal qualities and strengths that make me a
            collaborative, adaptable, and impactful team member.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {softSkills.map((skill, index) => {
            const Icon =
              softSkillIconMap[skill.icon] || Sparkles;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, rotateZ: -2 }}
                animate={
                  inView ? { opacity: 1, y: 0, rotateZ: 0 } : {}
                }
                transition={{
                  delay: 0.1 + index * 0.06,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  y: -10,
                  rotateZ: 2,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 400 },
                }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 overflow-hidden cursor-default"
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from ${index * 45}deg, rgba(37,99,235,0.3), rgba(139,92,246,0.3), rgba(56,189,248,0.3), rgba(37,99,235,0.3))`,
                  }}
                />
                <div className="relative">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center mb-4 shadow-lg shadow-primary/10"
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
