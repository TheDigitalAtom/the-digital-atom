import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const principles = [
  "Premium visual direction",
  "Modern frontend engineering",
  "Brand systems with character",
  "Practical AI integration",
  "Performance-first development",
  "Worldwide collaboration",
] as const;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02030b] text-white">
      <Navbar />

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Lightweight mobile background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(6,182,212,0.08),transparent_30%),radial-gradient(circle_at_85%_55%,rgba(124,58,237,0.05),transparent_28%)] md:hidden" />

        {/* Desktop cinematic glows */}
        <div className="hidden md:block">
          <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[110px]" />

          <div className="absolute -right-40 top-1/3 h-[27rem] w-[27rem] rounded-full bg-violet-600/[0.07] blur-[110px]" />
        </div>

        {/* Lightweight grid */}
        <div
          className="absolute inset-0 opacity-[0.025] sm:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,160,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(90,160,255,0.45) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-[1500px] items-center px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40 lg:px-12">
        <div className="grid w-full gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.035] px-4 py-2 md:backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.65)]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200/80">
                Studio System
              </span>
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/70 sm:mt-10 sm:text-xs sm:tracking-[0.38em]">
              About The Digital Atom
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Built to create digital experiences that feel impossible to ignore.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:mt-8 sm:text-lg sm:leading-8">
              The Digital Atom is a creative technology studio focused on web
              design, web development, branding, and AI-powered digital
              solutions. We build distinctive experiences for businesses that
              want to stand apart instead of blending in.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#contact"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-cyan-300/35 bg-cyan-300/[0.08] px-7 py-3.5 text-sm font-medium text-cyan-100 transition-colors duration-300 hover:border-cyan-200/60 hover:bg-cyan-300/[0.14]"
              >
                Start a project

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-7 py-3.5 text-sm text-white/65 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Return to universe
              </Link>
            </div>
          </div>

          {/* Mission control panel */}
          <div className="relative">
            {/* Desktop-only halo */}
            <div className="pointer-events-none absolute inset-12 hidden rounded-full bg-blue-500/[0.07] blur-[65px] md:block" />

            <div className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#050a18]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:rounded-[32px] sm:p-8 md:bg-[#050a18]/75 md:backdrop-blur-lg">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/35 sm:text-[10px] sm:tracking-[0.3em]">
                    Mission control
                  </p>

                  <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 sm:text-[9px] sm:tracking-[0.25em]">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.7)]" />

                    Online
                  </span>
                </div>

                <div className="mt-7 space-y-2.5 sm:mt-8 sm:space-y-3">
                  {principles.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4 sm:px-5 sm:py-5"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        <span className="shrink-0 font-mono text-[9px] tracking-[0.22em] text-cyan-300/45 sm:tracking-[0.25em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-medium text-white/75 sm:text-base">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/15 px-5 py-4 sm:mt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 sm:tracking-[0.28em]">
                    Studio objective
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Create memorable digital systems that combine strong
                    strategy, cinematic design, and reliable engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}