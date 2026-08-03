"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-32",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {eyebrow}
            </motion.div>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight"
          >
            <span className="gradient-text">{title}</span>
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-muted leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function SectionCard({
  children,
  className,
  glass = true,
  ...props
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 p-6 sm:p-8 card-hover",
        glass ? "bg-white/5 backdrop-blur-xl" : "bg-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
