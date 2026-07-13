"use client";

import AtomScene from "@/components/AtomScene";
import { motion } from "framer-motion";
import Background from "@/components/Background";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden"
    >
      <Background />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 pb-20 pt-36 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={itemVariants}
            className="mb-5 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300"
          >
            Welcome to our universe
          </motion.p>

          <motion.h1
  variants={itemVariants}
  className="font-[var(--font-orbitron)] text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] sm:text-6xl lg:text-7xl xl:text-8xl"
>
  <span className="block whitespace-nowrap">The Digital</span>
  <span className="gradient-text mt-2 block text-[1.12em]">
    Atom
  </span>
</motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-lg font-[var(--font-poppins)] text-lg leading-8 text-slate-300"
          >
            Building digital experiences that move businesses forward.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap gap-4"
          >
            <motion.a
              href="#services"
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="cta-button rounded-lg border border-cyan-300/50 bg-cyan-300/5 px-7 py-4 font-[var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.1em] shadow-[0_0_28px_rgba(49,215,255,0.2)] transition-colors hover:bg-cyan-300/10"
            >
              Enter the Experience
              <span className="cta-arrow">→</span>
            </motion.a>

            <motion.a
              href="#work"
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-lg px-7 py-4 font-[var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.1em]"
            >
              View Our Work
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, scale: 0.86, x: 40 }}
  animate={{ opacity: 1, scale: 1, x: 0 }}
  transition={{
    duration: 1.1,
    delay: 0.25,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative flex min-h-[480px] items-center justify-center lg:min-h-[700px]"
>
  <div className="relative z-10 w-full max-w-[760px]">
    <AtomScene />
  </div>
</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-6 z-20 hidden items-center gap-3 font-[var(--font-poppins)] text-xs uppercase tracking-[0.18em] text-slate-400 sm:flex lg:left-12"
      >
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          />
        </span>

        Scroll or drag to explore
      </motion.div>
    </section>
  );
}