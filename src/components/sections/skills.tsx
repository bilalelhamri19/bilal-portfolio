"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Monitor,
  Server,
  Code2,
  Database,
  Layers,
  Wrench,
  MonitorPlay,
  FileText,
  ClipboardList,
  Box,
  ChevronRight,
} from "lucide-react";
import { Section } from "@/components/ui/section-wrapper";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  data: { name: string; level: number }[];
}

const categories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Monitor,
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-400",
    data: skills.frontend,
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-400",
    data: skills.backend,
  },
  {
    id: "languages",
    label: "Languages",
    icon: Code2,
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-400",
    data: skills.languages,
  },
  {
    id: "databases",
    label: "Databases",
    icon: Database,
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-400",
    data: skills.databases,
  },
  {
    id: "frameworks",
    label: "Frameworks",
    icon: Layers,
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-400",
    data: skills.frameworks,
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    color: "text-indigo-400",
    gradient: "from-indigo-500 to-blue-400",
    data: skills.tools,
  },
  {
    id: "operatingSystems",
    label: "Operating Systems",
    icon: MonitorPlay,
    color: "text-teal-400",
    gradient: "from-teal-500 to-cyan-400",
    data: skills.operatingSystems,
  },
  {
    id: "office",
    label: "Office",
    icon: FileText,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-400",
    data: skills.office,
  },
  {
    id: "projectManagement",
    label: "Project Management",
    icon: ClipboardList,
    color: "text-sky-400",
    gradient: "from-sky-500 to-blue-400",
    data: skills.projectManagement,
  },
  {
    id: "modeling",
    label: "Modeling & Design",
    icon: Box,
    color: "text-fuchsia-400",
    gradient: "from-fuchsia-500 to-pink-400",
    data: skills.modeling,
  },
];

function SkillBar({
  name,
  level,
  gradient,
  delay = 0,
}: {
  name: string;
  level: number;
  gradient: string;
  delay?: number;
}) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white/90">{name}</span>
        <span className="text-xs text-muted font-mono">{level}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
            gradient
          )}
        >
          <div className="absolute inset-0 bg-shimmer-pattern bg-[length:1000px_100%] animate-shimmer opacity-40" />
        </motion.div>
      </div>
    </div>
  );
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden card-hover"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-opacity" />

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl bg-gradient-to-br",
                category.gradient,
                "bg-opacity-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              )}
              style={{
                boxShadow: `0 10px 40px -10px currentColor`,
              }}
            >
              <Icon className={cn("w-6 h-6", category.color)} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">
                {category.label}
              </h3>
              <p className="text-xs text-muted">
                {category.data.length} skills
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>

        <div className="space-y-4">
          {category.data.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              gradient={category.gradient}
              delay={0.3 + i * 0.08}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          category.gradient
        )}
      />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Expertise"
      title="Skills & Technologies"
      description="A comprehensive toolkit refined through years of building production-ready applications across diverse domains."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((category, index) => (
          <SkillCategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
