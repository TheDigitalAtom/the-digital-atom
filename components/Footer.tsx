"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  Orbit,
} from "lucide-react";
import Image from "next/image";

const navigation = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Portfolio",
    href: "#work",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
] as const;

const services = [
  "Web Design",
  "Web Development",
  "Branding",
  "AI Solutions",
] as const;

export default function Footer() {
  const currentYear =
    new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.11),transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[52%] left-1/2 h-[650px] w-[1150px] -translate-x-1/2 rounded-[50%] border-t border-cyan-300/10 bg-cyan-500/[0.025]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[14%] bottom-[-35%] h-[520px] w-[520px] rounded-full bg-blue-600/[0.05] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[14%] bottom-[-35%] h-[520px] w-[520px] rounded-full bg-purple-600/[0.05] blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-8 pt-20 sm:pt-24 lg:px-12 lg:pt-28">
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
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
            duration: 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#050b16]/80 shadow-[0_0_80px_rgba(30,64,175,0.08)]"
        >
          {/* Top glow line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
          />

          {/* Hero area */}
          <div className="relative border-b border-white/[0.07] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[35%] h-56 w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[85px]"
            />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.05,
                }}
                className="w-full max-w-[520px]"
              >
                <Image
                  src="/the-digital-atom-logo.png"
                  alt="The Digital Atom"
                  width={1954}
                  height={828}
                  sizes="(max-width: 640px) 88vw, 520px"
                  className="mx-auto h-auto w-full select-none object-contain drop-shadow-[0_0_22px_rgba(49,215,255,0.16)]"
                />
              </motion.div>

              <p className="mt-7 max-w-2xl font-[var(--font-poppins)] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Premium websites,
                distinctive brands and
                intelligent digital
                experiences built for
                businesses ready to stand
                apart.
              </p>

              <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                <motion.a
                  href="#contact"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group inline-flex min-h-14 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/[0.055] px-6 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-cyan-300/[0.1]"
                >
                  Start a project

                  <ArrowUpRight
                    size={16}
                    className="ml-3 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.a>

                <motion.a
                  href="mailto:thedigitalatom@hotmail.com"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-6 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-colors hover:border-white/[0.16] hover:text-white"
                >
                  <Mail
                    size={16}
                    strokeWidth={1.5}
                    className="mr-3 text-cyan-300"
                  />

                  Email the studio
                </motion.a>
              </div>
            </div>
          </div>

          {/* Navigation + Services */}
          <div className="grid gap-12 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-[0.85fr_0.85fr_1.3fr] lg:px-14 lg:py-12">
            <div>
              <p className="font-[var(--font-orbitron)] text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Navigation
              </p>

              <div className="mt-5 space-y-3">
                {navigation.map(
                  (item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="group flex w-fit items-center gap-3 font-[var(--font-poppins)] text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      <span className="h-px w-4 bg-slate-700 transition-all duration-300 group-hover:w-7 group-hover:bg-cyan-300" />

                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </div>

            <div>
              <p className="font-[var(--font-orbitron)] text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Services
              </p>

              <div className="mt-5 space-y-3">
                {services.map(
                  (service) => (
                    <a
                      key={service}
                      href="#services"
                      className="group flex w-fit items-center gap-3 font-[var(--font-poppins)] text-sm text-slate-400 transition-colors hover:text-purple-300"
                    >
                      <Orbit
                        size={14}
                        strokeWidth={1.4}
                        className="text-slate-600 transition-colors group-hover:text-purple-300"
                      />

                      {service}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Studio status */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Studio status
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <motion.span
                    animate={{
                      opacity: [
                        0.45,
                        1,
                        0.45,
                      ],
                      scale: [
                        0.9,
                        1,
                        0.9,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.75)]"
                  />

                  <p className="font-[var(--font-poppins)] text-sm text-slate-300">
                    Accepting new
                    projects
                  </p>
                </div>

                <p className="mt-4 max-w-sm font-[var(--font-poppins)] text-xs leading-6 text-slate-500">
                  Have a project in
                  mind? Tell us what
                  you&apos;re building
                  and we&apos;ll help
                  turn it into a
                  digital experience
                  that stands apart.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/thedigitalatom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 font-[var(--font-orbitron)] text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 transition-all hover:border-purple-300/30 hover:text-purple-300"
                  >
                    Instagram
                  </a>

                  <button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Scroll back to top"
                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.035] text-cyan-300 transition-all hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]"
                  >
                    <ArrowUp
                      size={18}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom copyright */}
        <div className="flex flex-col gap-3 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-[var(--font-poppins)] text-[10px] uppercase tracking-[0.14em] text-slate-600">
            © {currentYear} The Digital
            Atom. All rights reserved.
          </p>

          <p className="font-[var(--font-poppins)] text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Built in the Digital Atom
            universe
          </p>
        </div>
      </div>
    </footer>
  );
}