"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const leftMarkers = [
  { top: "18%", label: "01" },
  { top: "39%", label: "02" },
  { top: "60%", label: "03" },
  { top: "81%", label: "04" },
] as const;

const rightMarkers = [
  { top: "27%", label: "SYS" },
  { top: "52%", label: "TDA" },
  { top: "76%", label: "LIVE" },
] as const;

function CornerBracket({
  position,
}: {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "left-7 top-28 border-l border-t",
    "top-right": "right-7 top-28 border-r border-t",
    "bottom-left": "bottom-7 left-7 border-b border-l",
    "bottom-right": "bottom-7 right-7 border-b border-r",
  };

  return (
    <div
      className={`fixed z-20 hidden h-12 w-12 border-cyan-300/20 xl:block ${positionClasses[position]}`}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/60 shadow-[0_0_9px_rgba(125,240,255,0.8)]" />
    </div>
  );
}

export default function WorldHUD() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const percentage = useTransform(
    progress,
    [0, 1],
    [0, 100],
  );

  const scanY = useTransform(
    progress,
    [0, 1],
    ["8%", "92%"],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden xl:block"
    >
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      {/* Left vertical interface rail */}
      <div className="fixed bottom-24 left-7 top-40 w-px bg-gradient-to-b from-transparent via-cyan-300/15 to-transparent">
        <motion.div
          style={{ top: scanY }}
          className="absolute left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-200/80 to-transparent shadow-[0_0_14px_rgba(49,215,255,0.8)]"
        />

        {leftMarkers.map((marker) => (
          <div
            key={marker.label}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: marker.top }}
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/15 bg-[#020714]/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60 shadow-[0_0_8px_rgba(49,215,255,0.8)]" />

              <span className="absolute left-9 font-[var(--font-orbitron)] text-[8px] tracking-[0.18em] text-cyan-300/35">
                {marker.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right vertical interface rail */}
      <div className="fixed bottom-24 right-7 top-40 w-px bg-gradient-to-b from-transparent via-purple-400/15 to-transparent">
        {rightMarkers.map((marker, index) => (
          <motion.div
            key={marker.label}
            animate={{
              opacity: [0.25, 0.75, 0.25],
            }}
            transition={{
              duration: 3.5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 flex translate-x-1/2 items-center"
            style={{ top: marker.top }}
          >
            <span className="absolute right-7 whitespace-nowrap font-[var(--font-orbitron)] text-[8px] tracking-[0.16em] text-purple-300/35">
              {marker.label}
            </span>

            <span className="h-2 w-2 rounded-full border border-purple-300/35 bg-[#020714] shadow-[0_0_9px_rgba(168,85,247,0.5)]" />
          </motion.div>
        ))}
      </div>

      {/* Top system readout */}
      <div className="fixed left-8 top-32 flex items-center gap-3">
        <motion.span
          animate={{
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]"
        />

        <span className="font-[var(--font-orbitron)] text-[8px] uppercase tracking-[0.2em] text-slate-600">
          Universe online
        </span>
      </div>

      <div className="fixed right-8 top-32 flex items-center gap-3">
        <span className="font-[var(--font-orbitron)] text-[8px] uppercase tracking-[0.2em] text-slate-600">
          TDA / Interface
        </span>

        <span className="h-px w-12 bg-gradient-to-r from-purple-400/40 to-transparent" />
      </div>

      {/* Scroll-progress module */}
      <div className="fixed bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/[0.07] bg-[#020714]/65 px-4 py-2 backdrop-blur-xl">
        <span className="font-[var(--font-orbitron)] text-[8px] uppercase tracking-[0.18em] text-slate-600">
          Transmission
        </span>

        <div className="relative h-px w-28 overflow-hidden bg-white/[0.07]">
          <motion.div
            style={{
              scaleX: progress,
              transformOrigin: "left",
            }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 shadow-[0_0_12px_rgba(49,215,255,0.55)]"
          />
        </div>

        <motion.span className="min-w-7 font-[var(--font-orbitron)] text-[8px] tracking-[0.12em] text-cyan-300/70">
          {percentage}
        </motion.span>
      </div>

      {/* Faint top and bottom rails */}
      <div className="fixed left-24 right-24 top-28 h-px bg-gradient-to-r from-transparent via-cyan-300/[0.09] to-transparent" />

      <div className="fixed bottom-7 left-24 right-24 h-px bg-gradient-to-r from-transparent via-purple-400/[0.09] to-transparent" />
    </div>
  );
}