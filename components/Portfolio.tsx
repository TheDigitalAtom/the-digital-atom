"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const PortfolioDesktop = dynamic(
  () => import("@/components/PortfolioDesktop"),
  {
    ssr: false,
    loading: () => <PortfolioLoading />,
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
    <section className="relative min-h-[700px] overflow-hidden bg-[#02030b] px-5 py-24 text-white">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[500px] max-w-5xl items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200/50">
            Initializing digital universe
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
      className="relative isolate overflow-hidden bg-[#02030b] px-5 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[120px]" />

        <div className="absolute -left-32 top-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-violet-600/12 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(90,160,255,0.5) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 84%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />

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
            Enter one of The Digital Atom’s service systems or continue into
            the studio network.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[70px]" />

          <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-cyan-300/20 bg-[#071020]/70 shadow-[0_0_70px_rgba(40,150,255,0.16)] backdrop-blur-xl">
            <div className="absolute inset-3 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-cyan-300/20" />

            <div className="absolute inset-7 animate-[spin_12s_linear_infinite_reverse] rounded-full border border-violet-400/20" />

            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-300/50 via-blue-500/40 to-violet-500/50 shadow-[0_0_45px_rgba(80,150,255,0.55)]" />
          </div>

          <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.32em] text-white/35">
            Digital navigation core
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 active:scale-[0.98]"
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${destination.accent}25, transparent 48%)`,
                }}
              />

              <div
                className="absolute inset-y-5 left-0 w-px"
                style={{
                  backgroundColor: destination.accent,
                  boxShadow: `0 0 18px ${destination.accent}`,
                }}
              />

              <div className="relative flex items-center gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-black/20"
                  style={{
                    borderColor: `${destination.accent}45`,
                    boxShadow: `0 0 28px ${destination.accent}18`,
                  }}
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: destination.accent,
                      boxShadow: `0 0 18px ${destination.accent}`,
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-300/55">
                    Service {destination.number}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {destination.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-white/45">
                    {destination.description}
                  </p>
                </div>

                <span className="text-lg text-white/35 transition-transform duration-300 group-active:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <Link
            href="/about"
            className="rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-5 text-center backdrop-blur-xl transition active:scale-[0.98]"
          >
            <span className="text-xl text-cyan-200">✦</span>

            <p className="mt-2 text-sm font-medium text-white">
              About the Studio
            </p>
          </Link>

          <Link
            href="/contact"
            className="rounded-[22px] border border-violet-300/15 bg-violet-300/[0.045] px-4 py-5 text-center backdrop-blur-xl transition active:scale-[0.98]"
          >
            <span className="text-xl text-violet-200">✦</span>

            <p className="mt-2 text-sm font-medium text-white">
              Start a Project
            </p>
          </Link>
        </div>

        <Link
          href="/portfolio"
          className="mt-4 flex items-center justify-between rounded-[22px] border border-white/[0.08] bg-white/[0.035] px-5 py-5 backdrop-blur-xl transition active:scale-[0.98]"
        >
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-300/50">
              City network
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Explore the Portfolio
            </p>
          </div>

          <span className="text-white/35">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [isMobile, setIsMobile] =
    useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)",
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
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