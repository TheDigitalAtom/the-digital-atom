"use client";

import AtomScene from "@/components/AtomScene";
import Background from "@/components/Background";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [
        0.22,
        1,
        0.36,
        1,
      ] as const,
    },
  },
};

export default function Hero() {
  const prefersReducedMotion =
    useReducedMotion();

  const reducedMotion =
    prefersReducedMotion ?? false;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <Background />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-20 lg:pt-32">
        <motion.div
          variants={containerVariants}
          initial={
            reducedMotion
              ? false
              : "hidden"
          }
          animate="visible"
          className="relative z-20 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />

            <span className="font-[var(--font-poppins)] text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75 sm:text-[10px]">
              Welcome to our universe
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-orbitron)] text-[2.75rem] font-bold uppercase leading-[0.94] tracking-[0.015em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block sm:whitespace-nowrap">
              The Digital
            </span>

            <span className="gradient-text mt-2 block text-[1.12em]">
              Atom
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-lg font-[var(--font-poppins)] text-base leading-7 text-slate-300/85 sm:text-lg sm:leading-8 lg:mx-0"
          >
            Building immersive websites,
            memorable brands and intelligent
            digital systems for businesses
            ready to stand apart.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <Link
              href="#work"
              className="cta-button inline-flex min-h-14 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-300/[0.07] px-7 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] shadow-[0_0_28px_rgba(49,215,255,0.18)] transition active:scale-[0.98] sm:text-sm"
            >
              Enter the Universe

              <span className="cta-arrow ml-3">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="glass inline-flex min-h-14 items-center justify-center rounded-xl px-7 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] transition active:scale-[0.98] sm:text-sm"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion
              ? 0
              : 1,
            delay: reducedMotion
              ? 0
              : 0.2,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="relative mt-2 flex min-h-[350px] items-center justify-center sm:min-h-[560px] lg:mt-0 lg:min-h-[700px]"
        >
          <div className="relative z-10 w-full max-w-[760px]">
            <AtomScene />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: reducedMotion
            ? 0
            : 1.2,
          duration: reducedMotion
            ? 0
            : 0.7,
        }}
        className="absolute bottom-6 left-12 z-20 hidden items-center gap-3 font-[var(--font-poppins)] text-xs uppercase tracking-[0.18em] text-slate-400 lg:flex"
      >
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <motion.span
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, 12, 0],
                  }
            }
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