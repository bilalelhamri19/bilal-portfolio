"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Code2 } from "lucide-react";
import { personalInfo, navLinks, socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 mt-32">
      <div
        className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />

      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-2.5 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent text-base font-bold text-white shadow-lg shadow-primary/25">
                {personalInfo.name.charAt(0)}
              </div>
              <div>
                <div className="font-display font-bold text-xl tracking-tight">
                  {personalInfo.name}
                </div>
                <div className="text-xs text-muted">{personalInfo.title}</div>
              </div>
            </Link>

            <p className="mt-6 text-muted leading-relaxed max-w-md">
              {personalInfo.summary}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.slice(0, 4).map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border transition-all",
                      "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20",
                      "hover:text-white text-muted"
                    )}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-muted group-hover:bg-primary group-hover:w-3 transition-all" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Get in touch
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-start gap-3 text-sm text-muted hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <span className="break-all">{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="group flex items-start gap-3 text-sm text-muted hover:text-white transition-colors"
                >
                  <Code2 className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <span>{personalInfo.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{personalInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-2">
            &copy; {currentYear} {personalInfo.name}. Crafted with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            and
            <Code2 className="w-4 h-4 text-primary" />
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Terms
            </Link>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-sm transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
