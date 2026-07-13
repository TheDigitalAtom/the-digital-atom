"use client";

import { motion } from "framer-motion";
import {
  Atom,
  BrushCleaning,
  CodeXml,
  Gem,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Modern, immersive and conversion-focused websites designed to make your brand stand out and create unforgettable first impressions.",
    icon: BrushCleaning,
    accent: "cyan",
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Fast, scalable and future-ready websites engineered with clean architecture, modern frameworks and exceptional performance.",
    icon: CodeXml,
    accent: "blue",
  },
  {
    number: "03",
    title: "Branding",
    description:
      "Premium brand identities, logo design and visual systems that give businesses a unique and memorable digital presence.",
    icon: Gem,
    accent: "purple",
  },
  {
    number: "04",
    title: "AI Solutions",
    description:
      "Intelligent automations, AI integrations and custom digital experiences that help businesses work smarter and grow faster.",
    icon: Atom,
    accent: "cyan",
  },
] as const;

const accentStyles = {
  cyan: {
    icon: "text-cyan-300",
    glow: "bg-cyan-400/15",
    border: "group-hover:border-cyan-300/45",
    shadow:
      "group-hover:shadow-[0_0_45px_rgba(49,215,255,0.12)]",
    line:
      "from-transparent via-cyan-300/70 to-transparent",
  },
  blue: {
    icon: "text-blue-400",
    glow: "bg-blue-500/15",
    border: "group-hover:border-blue-400/45",
    shadow:
      "group-hover:shadow-[0_0_45px_rgba(52,120,255,0.14)]",
    line:
      "from-transparent via-blue-400/70 to-transparent",
  },
  purple: {
    icon: "text-purple-400",
    glow: "bg-purple-500/15",
    border: "group-hover:border-purple-400/45",
    shadow:
      "group-hover:shadow-[0_0_45px_rgba(168,85,247,0.14)]",
    line:
      "from-transparent via-purple-400/70 to-transparent",
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(30,64,175,0.1),transparent_45%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[540px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.035] blur-[160px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300"
          >
            What we do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-orbitron)] text-4xl font-bold uppercase sm:text-5xl lg:text-6xl"
          >
            Premium Digital
            <span className="gradient-text mt-2 block">
              Experiences
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl font-[var(--font-poppins)] text-lg leading-8 text-slate-300"
          >
            Four core services built around creating premium digital
            experiences that elevate brands, engage audiences and
            deliver measurable results.
          </motion.p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const styles = accentStyles[service.accent];

            return (
              <motion.article
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#071020]/75 p-8 backdrop-blur-xl transition-all duration-500 ${styles.border} ${styles.shadow}`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-[80px] ${styles.glow}`}
                />

                <div
                  className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r ${styles.line}`}
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon
                      size={34}
                      className={styles.icon}
                    />
                  </div>

                  <span className="font-[var(--font-orbitron)] text-sm tracking-[0.2em] text-slate-500">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-10 font-[var(--font-orbitron)] text-2xl font-semibold uppercase text-white">
                  {service.title}
                </h3>

                <p className="mt-5 font-[var(--font-poppins)] leading-8 text-slate-400">
                  {service.description}
                </p>

                <motion.div
                  whileHover={{
                    x: 6,
                  }}
                  className={`mt-10 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] ${styles.icon}`}
                >
                  Learn More →
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}