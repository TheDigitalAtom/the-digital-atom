"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CircleDashed,
  LockKeyhole,
  Radio,
} from "lucide-react";
import Image from "next/image";

const placeholderProjects = [
  {
    number: "02",
    title: "Transmission Pending",
    description:
      "The next Digital Atom experience is currently being initialized.",
    icon: Radio,
    accent: "blue",
    status: "Awaiting signal",
  },
  {
    number: "03",
    title: "Awaiting Launch",
    description:
      "A new digital project will occupy this space after deployment.",
    icon: CircleDashed,
    accent: "purple",
    status: "Development queue",
  },
  {
    number: "04",
    title: "Classified",
    description:
      "Reserved for a future client collaboration from The Digital Atom.",
    icon: LockKeyhole,
    accent: "cyan",
    status: "Access restricted",
  },
] as const;

const accentStyles = {
  cyan: {
    text: "text-cyan-300",
    border: "group-hover:border-cyan-300/45",
    glow: "bg-cyan-400/15",
    line: "via-cyan-300/75",
    shadow:
      "group-hover:shadow-[0_0_55px_rgba(49,215,255,0.13)]",
  },
  blue: {
    text: "text-blue-400",
    border: "group-hover:border-blue-400/45",
    glow: "bg-blue-500/15",
    line: "via-blue-400/75",
    shadow:
      "group-hover:shadow-[0_0_55px_rgba(52,120,255,0.14)]",
  },
  purple: {
    text: "text-purple-400",
    border: "group-hover:border-purple-400/45",
    glow: "bg-purple-500/15",
    line: "via-purple-400/75",
    shadow:
      "group-hover:shadow-[0_0_55px_rgba(168,85,247,0.14)]",
  },
};

export default function Portfolio() {
  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(59,130,246,0.11),transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-24%] left-1/2 h-[560px] w-[1150px] -translate-x-1/2 rounded-[50%] border-t border-blue-400/15 bg-blue-500/[0.035] blur-[2px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Our work
          </p>

          <h2 className="font-[var(--font-orbitron)] text-4xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
            Projects that
            <span className="gradient-text mt-2 block">
              speak for us
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl font-[var(--font-poppins)] text-base leading-8 text-slate-300 sm:text-lg">
            Real digital work built with care, strategy and modern
            technology. More projects will be added as they enter the
            Digital Atom universe.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.22fr_0.78fr]">
          {/* Featured live project */}
          <motion.article
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8 }}
            className="group relative min-h-[610px] overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#071020]/80 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/50 hover:shadow-[0_0_70px_rgba(49,215,255,0.13)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/15 blur-[105px]"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-600/15 blur-[110px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-[var(--font-orbitron)] text-xs tracking-[0.18em] text-slate-500">
                  PROJECT 01
                </span>

                <div className="flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.06] px-3 py-1.5">
                  <motion.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.85, 1, 0.85],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]"
                  />

                  <span className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    Live project
                  </span>
                </div>
              </div>

              <div className="relative mt-8 flex min-h-[285px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-[#040914]/75 p-8 sm:min-h-[330px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,215,255,0.13),transparent_60%)]"
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-64 w-64 rounded-full border border-dashed border-cyan-300/20"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-48 w-48 rounded-full border border-dashed border-blue-400/25"
                />

                <div
                  aria-hidden="true"
                  className="absolute h-40 w-40 rounded-full bg-cyan-400/10 blur-[45px]"
                />

                <motion.div
                  whileHover={{ scale: 1.045 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.035] p-7 shadow-[0_0_55px_rgba(49,215,255,0.1)] backdrop-blur-xl sm:h-52 sm:w-52 sm:p-9"
                >
                  <Image
                    src="/projects/djc-logo.png"
                    alt="DJC Solutions logo"
                    width={260}
                    height={260}
                    className="h-full w-full object-contain"
                    priority={false}
                  />
                </motion.div>
              </div>

              <div className="mt-8 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Website design & development
                  </p>

                  <h3 className="mt-3 font-[var(--font-orbitron)] text-3xl font-semibold uppercase tracking-[0.04em] text-white sm:text-4xl">
                    DJC Solutions
                  </h3>

                  <p className="mt-5 max-w-2xl font-[var(--font-poppins)] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                    A complete website developed for DJC Solutions,
                    focused on creating a professional digital presence,
                    responsive performance and a clear, modern user
                    experience.
                  </p>
                </div>

                <motion.a
                  href="https://www.djcsolutions.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-fit items-center gap-3 rounded-lg border border-cyan-300/45 bg-cyan-300/[0.06] px-6 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_30px_rgba(49,215,255,0.12)] transition-colors hover:bg-cyan-300/[0.11]"
                >
                  View live site
                  <ArrowUpRight size={17} />
                </motion.a>
              </div>
            </div>
          </motion.article>

          {/* Future projects */}
          <div className="grid gap-6">
            {placeholderProjects.map((project, index) => {
              const Icon = project.icon;
              const styles = accentStyles[project.accent];

              return (
                <motion.article
                  key={project.number}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    x: -5,
                    scale: 1.012,
                  }}
                  className={`group relative min-h-[185px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#071020]/70 p-6 backdrop-blur-xl transition-all duration-500 ${styles.border} ${styles.shadow}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[70px] ${styles.glow}`}
                  />

                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent ${styles.line} to-transparent opacity-65`}
                  />

                  <div className="relative flex h-full gap-5">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.035]">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 16 + index * 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`absolute inset-2 rounded-full border border-dashed opacity-40 ${styles.border}`}
                      />

                      <Icon
                        size={25}
                        strokeWidth={1.4}
                        className={`relative ${styles.text}`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-[var(--font-orbitron)] text-[10px] tracking-[0.18em] text-slate-500">
                            PROJECT {project.number}
                          </p>

                          <h3 className="mt-2 font-[var(--font-orbitron)] text-base font-semibold uppercase tracking-[0.04em] text-white sm:text-lg">
                            {project.title}
                          </h3>
                        </div>

                        <span
                          className={`mt-1 hidden h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_currentColor] sm:block ${styles.text} bg-current`}
                        />
                      </div>

                      <p className="mt-3 font-[var(--font-poppins)] text-sm leading-6 text-slate-400">
                        {project.description}
                      </p>

                      <p
                        className={`mt-4 font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] ${styles.text}`}
                      >
                        {project.status}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}