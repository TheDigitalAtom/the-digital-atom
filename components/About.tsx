"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  Layers3,
  Orbit,
  Sparkles,
} from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Built to stand apart",
    description:
      "Every project is shaped around the identity, goals and audience of the business. No recycled templates or generic experiences.",
    icon: Sparkles,
    accent: "cyan",
  },
  {
    number: "02",
    title: "Strategy meets design",
    description:
      "We combine strong visual direction with clear structure, usability and purpose so every detail supports the bigger objective.",
    icon: Layers3,
    accent: "blue",
  },
  {
    number: "03",
    title: "Engineered for performance",
    description:
      "Modern frameworks, responsive layouts and clean development create digital experiences that feel fast, stable and polished.",
    icon: Gauge,
    accent: "purple",
  },
] as const;

const stats = [
  {
    value: "100%",
    label: "Custom built",
  },
  {
    value: "01",
    label: "Focused studio",
  },
  {
    value: "∞",
    label: "Digital possibilities",
  },
] as const;

const accentStyles = {
  cyan: {
    text: "text-cyan-300",
    border: "group-hover:border-cyan-300/45",
    glow: "bg-cyan-400/15",
    line: "via-cyan-300/75",
  },
  blue: {
    text: "text-blue-400",
    border: "group-hover:border-blue-400/45",
    glow: "bg-blue-500/15",
    line: "via-blue-400/75",
  },
  purple: {
    text: "text-purple-400",
    border: "group-hover:border-purple-400/45",
    glow: "bg-purple-500/15",
    line: "via-purple-400/75",
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(37,99,235,0.12),transparent_40%)]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-12%] top-[8%] h-[620px] w-[620px] rounded-full bg-purple-500/[0.07] blur-[190px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-20%] left-[-10%] h-[620px] w-[620px] rounded-full bg-cyan-500/[0.055] blur-[190px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-5 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              About the studio
            </p>

            <h2 className="font-[var(--font-orbitron)] text-4xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
              Where creativity
              <span className="gradient-text mt-2 block">
                becomes digital
              </span>
            </h2>

            <p className="mt-7 max-w-2xl font-[var(--font-poppins)] text-base leading-8 text-slate-300 sm:text-lg">
              The Digital Atom is a focused creative technology studio
              building modern websites, visual identities and intelligent
              digital experiences for businesses ready to move forward.
            </p>

            <p className="mt-5 max-w-2xl font-[var(--font-poppins)] text-base leading-8 text-slate-400">
              The goal is simple: create work that feels distinctive,
              performs reliably and gives every brand a stronger presence in
              the digital world.
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                  }}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#071020]/70 px-3 py-5 text-center backdrop-blur-xl sm:px-5 sm:py-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
                  />

                  <p className="font-[var(--font-orbitron)] text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 font-[var(--font-poppins)] text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.1] blur-[110px]"
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#06101f]/75 p-6 shadow-[0_0_80px_rgba(30,64,175,0.1)] backdrop-blur-2xl sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent"
              />

              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Studio protocol
                  </p>

                  <p className="mt-2 font-[var(--font-orbitron)] text-sm uppercase tracking-[0.1em] text-slate-500">
                    Core principles
                  </p>
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/[0.035]"
                >
                  <span className="absolute inset-2 rounded-full border border-dashed border-blue-400/35" />

                  <Orbit
                    size={22}
                    strokeWidth={1.4}
                    className="text-cyan-300"
                  />
                </motion.div>
              </div>

              <div className="space-y-5">
                {principles.map((principle, index) => {
                  const Icon = principle.icon;
                  const styles = accentStyles[principle.accent];

                  return (
                    <motion.article
                      key={principle.title}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        x: 6,
                      }}
                      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-500 sm:p-6 ${styles.border}`}
                    >
                      <div
                        aria-hidden="true"
                        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[65px] ${styles.glow}`}
                      />

                      <div
                        aria-hidden="true"
                        className={`absolute inset-y-5 left-0 w-px bg-gradient-to-b from-transparent ${styles.line} to-transparent`}
                      />

                      <div className="relative flex gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.035]">
                          <Icon
                            size={24}
                            strokeWidth={1.4}
                            className={styles.text}
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-[var(--font-orbitron)] text-[9px] tracking-[0.18em] text-slate-600">
                              {principle.number}
                            </span>

                            <h3 className="font-[var(--font-orbitron)] text-sm font-semibold uppercase tracking-[0.05em] text-white sm:text-base">
                              {principle.title}
                            </h3>
                          </div>

                          <p className="mt-3 font-[var(--font-poppins)] text-sm leading-7 text-slate-400">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}