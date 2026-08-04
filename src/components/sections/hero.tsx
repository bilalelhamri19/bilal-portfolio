"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import {
  Download,
  FolderKanban,
  Mail,
  Sparkles,
} from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

function generateInSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function Particles() {
  const ref = React.useRef<THREE.Points>(null);
  const [sphere] = React.useState(() => generateInSphere(5000, 1.5));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function ParticleCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <React.Suspense fallback={null}>
          <Particles />
        </React.Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

function AnimatedTitle() {
  const text = personalInfo.name;
  const letters = text.split("");

  return (
    <div className="inline-flex flex-wrap">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: 100, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            delay: 0.5 + index * 0.06,
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className={`font-display font-black tracking-tight ${
            letter === " " ? "mr-4 sm:mr-8" : ""
          }`}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

function TypewriterTitle() {
  const [titleIndex, setTitleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const titles = [
      personalInfo.title,
      "Full Stack Developer",
    ];
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentTitle.length) {
            setDisplayText(
              currentTitle.substring(0, displayText.length + 1)
            );
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(
              currentTitle.substring(0, displayText.length - 1)
            );
          } else {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <div className="inline-flex items-center gap-2">
      <span className="gradient-text font-display font-bold tracking-tight">
        {displayText}
      </span>
      <span className="w-1 h-8 sm:h-10 bg-primary animate-pulse rounded-full" />
    </div>
  );
}



export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const circle1X = useTransform(mouseX, [-1, 1], [-50, 50]);
  const circle1Y = useTransform(mouseY, [-1, 1], [-50, 50]);
  const circle2X = useTransform(mouseX, [-1, 1], [40, -40]);
  const circle2Y = useTransform(mouseY, [-1, 1], [-30, 30]);
  const circle3X = useTransform(mouseX, [-1, 1], [-30, 30]);
  const circle3Y = useTransform(mouseY, [-1, 1], [40, -40]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] mask-fade-b animate-grid opacity-40" />

      <motion.div
        style={{ x: circle1X, y: circle1Y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: circle2X, y: circle2Y }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: circle3X, y: circle3Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl pointer-events-none"
      />

      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bgdark/50 to-bgdark z-10 pointer-events-none" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">
                Available for new opportunities
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg sm:text-xl text-muted mb-4 font-mono"
          >
            Hi there, I&apos;m
          </motion.p>

          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 leading-none">
            <AnimatedTitle />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-10"
          >
            <TypewriterTitle />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="max-w-2xl text-sm sm:text-lg md:text-xl text-muted leading-relaxed mb-8 sm:mb-12 text-balance px-2 sm:px-0"
          >
            {personalInfo.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 sm:mb-12 w-full max-w-sm sm:max-w-none"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary sm:min-w-[180px] justify-center"
            >
              <FolderKanban className="w-5 h-5" />
              View Projects
            </motion.a>

            <motion.a
              href="/cv.pdf"
              download={`${personalInfo.name}-CV.pdf`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary sm:min-w-[180px] justify-center"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline sm:min-w-[180px] justify-center"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex items-center gap-4"
          >
            {socialLinks.slice(0, 4).map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={
                    social.url.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 2 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.15,
                    boxShadow: "0 10px 40px rgba(37, 99, 235, 0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all group"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
