"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, personalInfo } from "@/data/portfolio";

import CommandPalette from "@/components/ui/command-palette";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 0.8]);
  const backdropBlur = useTransform(scrollYProgress, [0, 0.08], [0, 16]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 0.1]);
  const paddingY = useTransform(scrollYProgress, [0, 0.08], [16, 10]);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        style={{
          backdropFilter: `blur(${backdropBlur}px)`,
          WebkitBackdropFilter: `blur(${backdropBlur}px)`,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className="fixed top-0 inset-x-0 z-50 w-full"
      >
        <motion.div
          className="absolute inset-0 bg-bgdark"
          style={{ opacity: backgroundOpacity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-white"
          style={{ opacity: borderOpacity }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  boxShadow:
                    "0 0 30px rgba(37, 99, 235, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent text-sm font-bold text-white shadow-lg shadow-primary/25"
              >
                {personalInfo.name.charAt(0)}
              </motion.div>
              <motion.span
                className="font-display font-bold text-lg tracking-tight hidden sm:block"
                whileHover={{ x: 2 }}
              >
                {personalInfo.name}
                <span className="text-primary">.</span>
              </motion.span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-white transition-colors group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <CommandPalette />



              <motion.a
                href="/cv.pdf"
                download={`${personalInfo.name}-CV.pdf`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Download CV</span>
                <span className="md:hidden">CV</span>
              </motion.a>

              <button
                onClick={() => setOpen(true)}
                className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-bgdark border-l border-white/10 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent text-sm font-bold text-white">
                    {personalInfo.name.charAt(0)}
                  </div>
                  <span className="font-display font-bold text-lg">
                    {personalInfo.name}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                        <span className="font-mono text-xs font-bold">
                          0{index + 1}
                        </span>
                      </div>
                      <span className="font-medium">{link.name}</span>
                    </motion.button>
                  ))}
                </div>
              </nav>

              <div className="p-4 border-t border-white/10 space-y-3">
                <a
                  href="/cv.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
