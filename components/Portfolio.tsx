"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

const PortfolioDesktop = dynamic(
  () =>
    import(
      "@/components/PortfolioDesktop"
    ),
  {
    ssr: false,
    loading: () => (
      <PortfolioLoading />
    ),
  },
);

const destinations = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Immersive digital interfaces designed around your brand and audience.",
    href: "/services/web-design",
    accent: "#22d9ff",
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Fast and scalable digital platforms engineered with modern technology.",
    href: "/services/web-development",
    accent: "#4e8fff",
  },
  {
    number: "03",
    title: "Branding",
    description:
      "Distinct visual identities designed to make businesses memorable.",
    href: "/services/branding",
    accent: "#8a63ff",
  },
  {
    number: "04",
    title: "AI Solutions",
    description:
      "Intelligent systems created to automate, assist, and accelerate growth.",
    href: "/services/ai-solutions",
    accent: "#c350ff",
  },
];

function PortfolioLoading() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#02030b] px-5 py-20 text-white">
      <div className="relative mx-auto flex min-h-[460px] max-w-5xl items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200/45">
            Initializing digital
            universe
          </p>
        </div>
      </div>
    </section>
  );
}

function MobilePortfolio() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#02030b] px-5 py-20 text-white"
    >
      {/* Lightweight mobile background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_15%_55%,rgba(6,182,212,0.06),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(124,58,237,0.07),transparent_28%)]" />

        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,160,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(90,160,255,0.45) 1px, transparent 1px)",
            backgroundSize:
              "58px 58px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 84%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-xl">
        {/* Section heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.035] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.65)]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200/70">
              Mobile Universe
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] text-white">
            Choose your{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              destination
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50">
            Enter one of The
            Digital Atom&apos;s
            service systems or
            continue into the studio
            network.
          </p>
        </div>

        {/* Lightweight navigation core */}
        <div className="relative mt-11">
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-cyan-300/18 bg-[#071020]/90 shadow-[0_0_28px_rgba(40,150,255,0.12)]">
            <div className="absolute inset-3 rounded-full border border-dashed border-cyan-300/15" />

            <div className="absolute inset-7 rounded-full border border-violet-400/15" />

            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-300/45 via-blue-500/35 to-violet-500/45 shadow-[0_0_22px_rgba(80,150,255,0.38)]" />
          </div>

          <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.32em] text-white/35">
            Digital navigation core
          </p>
        </div>

        {/* Service destinations */}
        <div className="mt-11 grid gap-3">
          {destinations.map(
            (destination) => (
              <Link
                key={
                  destination.href
                }
                href={
                  destination.href
                }
                className="group relative overflow-hidden rounded-[22px] border border-white/[0.075] bg-[#07101d]/88 p-5 transition-transform duration-200 active:scale-[0.985]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-35"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${destination.accent}20, transparent 46%)`,
                  }}
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-y-5 left-0 w-px"
                  style={{
                    backgroundColor:
                      destination.accent,
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-black/15"
                    style={{
                      borderColor: `${destination.accent}38`,
                    }}
                  >
                    <div
                      className="h-3.5 w-3.5 rounded-full"
                      style={{
                        backgroundColor:
                          destination.accent,
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-cyan-300/50">
                      Service{" "}
                      {
                        destination.number
                      }
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {
                        destination.title
                      }
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/45">
                      {
                        destination.description
                      }
                    </p>
                  </div>

                  <span className="text-lg text-white/30 transition-transform duration-200 group-active:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* Secondary links */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/about"
            className="rounded-[20px] border border-cyan-300/12 bg-[#07101d]/84 px-4 py-5 text-center transition-transform duration-200 active:scale-[0.985]"
          >
            <span className="text-lg text-cyan-200">
              ✦
            </span>

            <p className="mt-2 text-sm font-medium text-white">
              About the Studio
            </p>
          </Link>

          <Link
            href="/contact"
            className="rounded-[20px] border border-violet-300/12 bg-[#07101d]/84 px-4 py-5 text-center transition-transform duration-200 active:scale-[0.985]"
          >
            <span className="text-lg text-violet-200">
              ✦
            </span>

            <p className="mt-2 text-sm font-medium text-white">
              Start a Project
            </p>
          </Link>
        </div>

        <Link
          href="/portfolio"
          className="mt-3 flex items-center justify-between rounded-[20px] border border-white/[0.075] bg-[#07101d]/84 px-5 py-5 transition-transform duration-200 active:scale-[0.985]"
        >
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-cyan-300/45">
              City network
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Explore the
              Portfolio
            </p>
          </div>

          <span className="text-white/30">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [
    isMobile,
    setIsMobile,
  ] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(max-width: 767px)",
      );

    const updateDevice = () => {
      setIsMobile(
        mediaQuery.matches,
      );
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice,
      );
    };
  }, []);

  if (isMobile === null) {
    return <PortfolioLoading />;
  }

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <PortfolioDesktop />;
}