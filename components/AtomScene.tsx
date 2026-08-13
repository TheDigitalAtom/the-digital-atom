"use client";

import { Canvas } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import AtomModel from "./atom/AtomModel";

function MobileAtom() {
  return (
    <div
      className="relative flex h-[350px] w-full items-center justify-center overflow-hidden bg-transparent"
      aria-label="The Digital Atom animated logo"
    >
      {/* Lightweight background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[55px]" />

      {/* Holographic platform */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-20 w-64 -translate-x-1/2 rounded-[50%] border border-cyan-300/15 bg-cyan-300/[0.02]">
        <div className="absolute inset-3 rounded-[50%] border border-violet-400/15" />

        <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      </div>

      {/* Atom */}
      <div className="relative -translate-y-5">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[40px]" />

        {/* Core glass */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-200/20 bg-[#071126]/80 shadow-[0_0_35px_rgba(50,140,255,0.15)]">
          <div className="absolute inset-3 rounded-full border border-white/[0.06]" />

          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-300/25 via-blue-500/20 to-violet-500/25" />

          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-cyan-200 via-blue-400 to-violet-500 shadow-[0_0_25px_rgba(75,160,255,0.6)]">
            <div className="absolute inset-2 rounded-full border border-white/30 bg-white/10" />
          </div>
        </div>

        {/* Orbit 1 */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 animate-[spin_16s_linear_infinite] rounded-[50%] border border-cyan-300/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.75)]" />
        </div>

        {/* Orbit 2 */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 rotate-[60deg] animate-[spin_19s_linear_infinite_reverse] rounded-[50%] border border-blue-400/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.75)]" />
        </div>

        {/* Orbit 3 */}
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[78px] -translate-x-1/2 -translate-y-1/2 -rotate-[60deg] animate-[spin_22s_linear_infinite] rounded-[50%] border border-violet-400/40">
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.75)]" />
        </div>
      </div>
    </div>
  );
}

function DesktopAtom() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [
    isVisible,
    setIsVisible,
  ] = useState(true);

  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsVisible(
            entry.isIntersecting,
          );
        },
        {
          root: null,
          rootMargin: "150px",
          threshold: 0,
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[560px] w-full bg-transparent lg:h-[700px]"
    >
      <Canvas
        frameloop={
          isVisible
            ? "always"
            : "never"
        }
        style={{
          background: "transparent",
        }}
        camera={{
          position: [0, 0, 8.8],
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        dpr={[0.75, 1.1]}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 500,
        }}
        gl={{
          antialias: false,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference:
            "high-performance",
        }}
        onCreated={({
          gl,
          scene,
        }) => {
          gl.setClearColor(
            0x000000,
            0,
          );

          scene.background = null;
        }}
      >
        {/* Cheap global lighting */}
        <ambientLight
          intensity={0.3}
        />

        {/* Main cool key light */}
        <directionalLight
          position={[4, 5, 7]}
          intensity={1.65}
          color="#e8fbff"
        />

        {/* Purple fill light */}
        <directionalLight
          position={[-4, -2, 4]}
          intensity={0.9}
          color="#8b5cf6"
        />

        {/* Cyan energy light */}
        <pointLight
          position={[0, 3, 4]}
          intensity={1.15}
          color="#31d7ff"
          distance={9}
          decay={2}
        />

        <AtomModel />
      </Canvas>
    </div>
  );
}

export default function AtomScene() {
  const [
    isDesktop,
    setIsDesktop,
  ] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(min-width: 768px)",
      );

    const updateDevice = () => {
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

  if (isDesktop === null) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center bg-transparent sm:h-[560px]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300/70" />
      </div>
    );
  }

  if (!isDesktop) {
    return <MobileAtom />;
  }

  return <DesktopAtom />;
}