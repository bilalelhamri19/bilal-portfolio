"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mobile";

export function ThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme || "system");
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const Icon = !mounted
    ? Moon
    : theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun;

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10 border border-white/10",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mounted ? theme || "dark" : "dark"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-white/5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200",
            theme === value
              ? "text-white"
              : "text-muted hover:text-white hover:bg-white/5"
          )}
          aria-label={`${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <Icon className="w-4 h-4 relative z-10" />
          <span className="text-xs font-medium relative z-10 hidden sm:inline">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
