"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function BackgroundEffects() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[40%] -right-[10%] w-[700px] h-[700px] rounded-full bg-accent/[0.08] blur-[140px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-secondary/[0.06] blur-[120px]"
        />
      </div>
    </div>
  );
}
