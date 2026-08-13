"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useState,
} from "react";

const DesktopAtomScene =
  dynamic(
    () =>
      import(
        "./DesktopAtomScene"
      ),
    {
      ssr: false,

      loading: () => (
        <div className="flex h-[560px] w-full items-center justify-center bg-transparent lg:h-[700px]">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300/70" />
        </div>
      ),
    },
  );

function MobileAtom() {
  return (
    <div
      className="relative flex h-[350px] w-full items-center justify-center overflow-hidden bg-transparent"
      aria-label="The Digital Atom animated logo"
    >
      {/* Static background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07]" />

      {/* Holographic platform */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-20 w-64 -translate-x-1/2 rounded-[50%] border border-cyan-300/15 bg-cyan-300/[0.02]">
        <div className="absolute inset-3 rounded-[50%] border border-violet-400/15" />

        <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      </div>

      {/* Atom */}
      <div className="relative -translate-y-5">
        {/* Core */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-200/20 bg-[#071126]/90 shadow-[0_0_24px_rgba(50,140,255,0.14)]">
          <div className="absolute inset-3 rounded-full border border-white/[0.06]" />

          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-300/25 via-blue-500/20 to-violet-500/25" />

          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-cyan-200 via-blue-400 to-violet-500 shadow-[0_0_20px_rgba(75,160,255,0.5)]">
            <div className="absolute inset-2 rounded-full border border-white/30 bg-white/10" />
          </div>
        </div>

        {/* Cyan orbit */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite] rounded-[50%] border border-cyan-300/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
        </div>

        {/* Blue orbit */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 rotate-[60deg] animate-[spin_21s_linear_infinite_reverse] rounded-[50%] border border-blue-400/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
        </div>

        {/* Purple orbit */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 -rotate-[60deg] animate-[spin_24s_linear_infinite] rounded-[50%] border border-violet-400/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.7)]" />
        </div>
      </div>
    </div>
  );
}

function AtomPlaceholder() {
  return (
    <div className="flex h-[350px] w-full items-center justify-center bg-transparent sm:h-[560px]">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300/70" />
    </div>
  );
}

export default function AtomScene() {
  const [
    isDesktop,
    setIsDesktop,
  ] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(min-width: 768px)",
      );

    const updateDevice =
      () => {
        setIsDesktop(
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

  if (
    isDesktop === null
  ) {
    return (
      <AtomPlaceholder />
    );
  }

  if (!isDesktop) {
    return <MobileAtom />;
  }

  return (
    <DesktopAtomScene />
  );
}