"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-10">
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(3, 7, 18, 0.9)"
            : "rgba(3, 7, 18, 0.7)",
          borderColor: scrolled
            ? "rgba(103, 232, 249, 0.18)"
            : "rgba(255, 255, 255, 0.1)",
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative mx-auto max-w-[1480px] rounded-2xl border shadow-[0_12px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
      >
        <div className="flex min-h-[70px] items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#home"
            aria-label="The Digital Atom home"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
              <div
                aria-hidden="true"
                className="absolute inset-1 rounded-full bg-cyan-400/10 blur-lg transition-opacity duration-300 group-hover:opacity-100"
              />

              <Image
                src="/atom-logo.png"
                alt=""
                width={54}
                height={54}
                priority
                className="relative h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(49,215,255,0.45)] sm:h-12 sm:w-12"
              />
            </div>

            <div className="block">
              <p className="font-[var(--font-orbitron)] text-[10px] font-semibold uppercase leading-tight tracking-[0.18em] text-white sm:text-xs">
                The Digital
              </p>

              <p className="gradient-text font-[var(--font-orbitron)] text-xs font-bold uppercase leading-tight tracking-[0.16em] sm:text-sm">
                Atom
              </p>
            </div>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 font-[var(--font-poppins)] text-sm text-slate-300 lg:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link relative py-2 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href="#contact"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="nav-cta hidden rounded-xl border border-cyan-300/40 bg-cyan-300/5 px-4 py-3 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-cyan-200 hover:bg-cyan-300/10 sm:inline-flex sm:px-5"
            >
              Let&apos;s Talk

              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </motion.a>

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.11] bg-white/[0.035] text-white transition-all hover:border-cyan-300/35 hover:bg-cyan-300/[0.06] lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <X size={20} strokeWidth={1.7} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu size={21} strokeWidth={1.7} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-white/[0.08] px-4 pb-5 pt-4 sm:px-6">
                <nav
                  aria-label="Mobile navigation"
                  className="grid gap-2"
                >
                  {links.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{
                        opacity: 0,
                        x: -18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.045,
                        duration: 0.32,
                      }}
                      className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 font-[var(--font-poppins)] text-sm text-slate-300 transition-all hover:border-cyan-300/20 hover:bg-cyan-300/[0.035] hover:text-white"
                    >
                      <span>{link.label}</span>

                      <span className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/[0.06] px-5 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_30px_rgba(49,215,255,0.08)] transition-colors hover:bg-cyan-300/[0.11]"
                  >
                    Start a project
                    <span aria-hidden="true" className="ml-3">
                      →
                    </span>
                  </a>

                  <a
                    href="https://www.instagram.com/thedigitalatom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-5 py-4 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition-all hover:border-purple-300/30 hover:text-purple-200"
                  >
                    Instagram
                    <span
                      aria-hidden="true"
                      className="ml-3 text-purple-300"
                    >
                      ↗
                    </span>
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="font-[var(--font-poppins)] text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      Studio status
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">
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

                      <p className="font-[var(--font-poppins)] text-xs text-slate-400">
                        Accepting new projects
                      </p>
                    </div>
                  </div>

                  <a
                    href="mailto:thedigitalatom@hotmail.com"
                    aria-label="Email The Digital Atom"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.035] text-sm text-cyan-300 transition-colors hover:bg-cyan-300/[0.08]"
                  >
                    @
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 -z-10 bg-[#01040c]/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
}