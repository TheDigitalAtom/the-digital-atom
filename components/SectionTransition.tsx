"use client";

import { motion } from "framer-motion";

type SectionTransitionProps = {
  label?: string;
};

export default function SectionTransition({
  label = "Digital transmission",
}: SectionTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mx-auto flex h-28 w-full max-w-[1400px] items-center justify-center px-6 lg:px-12"
    >
      <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent lg:left-12 lg:right-12" />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 h-px w-[42%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/75 to-transparent shadow-[0_0_18px_rgba(49,215,255,0.45)]"
      />

      <div className="relative flex items-center gap-5">
        <motion.span
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-[#051020]/80 shadow-[0_0_30px_rgba(49,215,255,0.12)] backdrop-blur-xl"
        >
          <span className="absolute inset-1.5 rounded-full border border-dashed border-blue-400/30" />

          <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(125,240,255,1)]" />
        </motion.span>

        <div className="rounded-full border border-white/[0.08] bg-[#051020]/75 px-4 py-2 backdrop-blur-xl">
          <p className="font-[var(--font-poppins)] text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {label}
          </p>
        </div>

        <motion.span
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/25 bg-[#051020]/80 shadow-[0_0_30px_rgba(168,85,247,0.1)] backdrop-blur-xl"
        >
          <span className="absolute inset-1.5 rounded-full border border-dashed border-purple-400/30" />

          <span className="h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(192,132,252,1)]" />
        </motion.span>
      </div>
    </div>
  );
}