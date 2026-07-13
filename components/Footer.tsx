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
    label: "About",
    href: "#about",
  },
  {
    label: "Work",
    href: "#work",
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

const socialLinks = [
  {
    label: "Instagram",
    shortLabel: "IG",
    href: "https://www.instagram.com/thedigitalatom",
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[45%] left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-[50%] border-t border-cyan-300/15 bg-cyan-500/[0.035] blur-[2px]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-[12%] bottom-[-30%] h-[580px] w-[580px] rounded-full bg-blue-600/[0.07] blur-[190px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-[12%] bottom-[-30%] h-[580px] w-[580px] rounded-full bg-purple-600/[0.07] blur-[190px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-8 pt-20 sm:pt-24 lg:px-12 lg:pt-28">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#06101f]/75 p-6 shadow-[0_0_90px_rgba(30,64,175,0.1)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-purple-500/[0.08] blur-[110px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.035]">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-2 rounded-full border border-dashed border-cyan-300/30"
                  />

                  <Image
                    src="/logo.png"
                    alt="The Digital Atom"
                    width={42}
                    height={42}
                    className="relative h-9 w-9 object-contain"
                  />
                </div>

                <div>
                  <p className="font-[var(--font-orbitron)] text-base font-semibold uppercase tracking-[0.12em] text-white sm:text-lg">
                    The Digital Atom
                  </p>

                  <p className="mt-1 font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Creative technology studio
                  </p>
                </div>
              </div>

              <h2 className="mt-9 max-w-2xl font-[var(--font-orbitron)] text-3xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-4xl lg:text-5xl">
                Ideas become
                <span className="gradient-text mt-2 block">
                  digital realities
                </span>
              </h2>

              <p className="mt-6 max-w-xl font-[var(--font-poppins)] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Premium websites, distinctive brands and intelligent digital
                experiences built for businesses ready to move forward.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href="mailto:thedigitalatom@hotmail.com"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/[0.05] px-5 py-3 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-cyan-300/[0.1]"
                >
                  <Mail
                    size={16}
                    strokeWidth={1.5}
                    className="text-cyan-300"
                  />

                  Email the studio

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.a>

                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{
                      y: -4,
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] font-[var(--font-orbitron)] text-[10px] font-semibold tracking-[0.08em] text-slate-400 transition-all hover:border-cyan-300/30 hover:text-cyan-300"
                  >
                    {social.shortLabel}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid gap-9 sm:grid-cols-2">
              <div>
                <p className="font-[var(--font-orbitron)] text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Navigation
                </p>

                <div className="mt-5 space-y-3">
                  {navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="group flex w-fit items-center gap-3 font-[var(--font-poppins)] text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      <span className="h-px w-4 bg-slate-700 transition-all duration-300 group-hover:w-7 group-hover:bg-cyan-300" />

                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-[var(--font-orbitron)] text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Services
                </p>

                <div className="mt-5 space-y-3">
                  {services.map((service) => (
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
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Studio status
                      </p>

                      <div className="mt-2 flex items-center gap-2">
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

                        <p className="font-[var(--font-poppins)] text-sm text-slate-300">
                          Accepting new projects
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={scrollToTop}
                      aria-label="Scroll back to top"
                      className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.035] text-cyan-300 transition-all hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]"
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
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-[var(--font-poppins)] text-[10px] uppercase tracking-[0.14em] text-slate-600">
            © {currentYear} The Digital Atom. All rights reserved.
          </p>

          <p className="font-[var(--font-poppins)] text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Built in the Digital Atom universe
          </p>
        </div>
      </div>
    </footer>
  );
}