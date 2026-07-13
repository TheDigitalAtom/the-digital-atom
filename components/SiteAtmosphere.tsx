"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const nearStars = [
  { left: "6%", top: "9%", size: 2, duration: 5.8, delay: 0.2 },
  { left: "14%", top: "24%", size: 1, duration: 7.1, delay: 1.4 },
  { left: "23%", top: "12%", size: 2, duration: 6.4, delay: 2.1 },
  { left: "33%", top: "38%", size: 1, duration: 8.2, delay: 0.8 },
  { left: "44%", top: "18%", size: 2, duration: 6.8, delay: 1.7 },
  { left: "57%", top: "32%", size: 1, duration: 7.6, delay: 0.4 },
  { left: "69%", top: "11%", size: 2, duration: 5.9, delay: 2.5 },
  { left: "81%", top: "29%", size: 1, duration: 8.4, delay: 1.1 },
  { left: "93%", top: "15%", size: 2, duration: 6.2, delay: 1.9 },
  { left: "10%", top: "57%", size: 1, duration: 7.8, delay: 2.2 },
  { left: "20%", top: "76%", size: 2, duration: 6.7, delay: 0.7 },
  { left: "36%", top: "62%", size: 1, duration: 8.8, delay: 1.6 },
  { left: "49%", top: "84%", size: 2, duration: 6.1, delay: 0.3 },
  { left: "62%", top: "70%", size: 1, duration: 7.5, delay: 2.7 },
  { left: "75%", top: "89%", size: 2, duration: 8.1, delay: 1.3 },
  { left: "87%", top: "60%", size: 1, duration: 6.5, delay: 0.9 },
  { left: "95%", top: "82%", size: 2, duration: 7.2, delay: 2.3 },
] as const;

const farStars = [
  { left: "4%", top: "44%" },
  { left: "11%", top: "83%" },
  { left: "17%", top: "6%" },
  { left: "26%", top: "51%" },
  { left: "31%", top: "92%" },
  { left: "39%", top: "27%" },
  { left: "47%", top: "73%" },
  { left: "54%", top: "7%" },
  { left: "61%", top: "46%" },
  { left: "67%", top: "95%" },
  { left: "73%", top: "22%" },
  { left: "79%", top: "54%" },
  { left: "85%", top: "5%" },
  { left: "90%", top: "37%" },
  { left: "97%", top: "68%" },
] as const;

export default function SiteAtmosphere() {
  const { scrollYProgress } = useScroll();

  const farLayerY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "8%"],
  );

  const nearLayerY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"],
  );

  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-10%"],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020714]"
    >
      {/* Deep-space base */}
      <div className="absolute inset-0 bg-[#020714]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(30,80,190,0.2),transparent_42%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,5,18,0.1),rgba(1,4,14,0.82))]" />

      {/* Slow upper blue nebula */}
      <motion.div
        animate={{
          x: [0, -55, 15, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.08, 1.03, 1],
          opacity: [0.72, 0.92, 0.78, 0.72],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-[18%] -top-[10%] h-[900px] w-[900px] rounded-full bg-blue-600/[0.12] blur-[210px]"
      />

      {/* Central cyan nebula */}
      <motion.div
        animate={{
          x: [0, 45, -20, 0],
          y: [0, -25, 20, 0],
          scale: [1, 1.1, 1.04, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[2%] top-[25%] h-[720px] w-[720px] rounded-full bg-cyan-500/[0.065] blur-[210px]"
      />

      {/* Mid-page purple atmosphere */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 35, -20, 0],
          scale: [1, 1.07, 1.12, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-10%] top-[43%] h-[820px] w-[820px] rounded-full bg-purple-600/[0.095] blur-[230px]"
      />

      {/* Lower blue atmosphere */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -35, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[18%] left-[10%] h-[850px] w-[850px] rounded-full bg-blue-700/[0.08] blur-[230px]"
      />

      {/* Distant star layer */}
      <motion.div
        style={{ y: farLayerY }}
        className="absolute inset-0"
      >
        {farStars.map((star, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.12, 0.38, 0.12],
            }}
            transition={{
              duration: 7 + (index % 5),
              delay: index * 0.32,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-px w-px rounded-full bg-blue-100"
            style={{
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </motion.div>

      {/* Brighter foreground star layer */}
      <motion.div
        style={{ y: nearLayerY }}
        className="absolute inset-0"
      >
        {nearStars.map((star, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.15, 0.95, 0.15],
              scale: [0.7, 1.5, 0.7],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(125,230,255,0.9)]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </motion.div>

      {/* Perspective grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute bottom-[-30%] left-[-15%] h-[78%] w-[130%] origin-bottom opacity-[0.075]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(67, 139, 255, 0.34) 1px, transparent 1px),
              linear-gradient(90deg, rgba(67, 139, 255, 0.34) 1px, transparent 1px)
            `,
            backgroundSize: "86px 86px",
            transform: "perspective(680px) rotateX(64deg)",
            transformOrigin: "bottom center",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent 74%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent 74%)",
          }}
        />
      </motion.div>

      {/* Central page energy axis */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/[0.055] to-transparent" />

      {/* Moving vertical scanner */}
      <motion.div
        animate={{
          top: ["-10%", "110%"],
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.08, 0.92, 1],
        }}
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/[0.16] to-transparent shadow-[0_0_26px_rgba(49,215,255,0.14)]"
      />

      {/* Faint holographic vertical columns */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div className="absolute bottom-0 left-[9%] h-[38%] w-px bg-gradient-to-t from-blue-400 to-transparent" />
        <div className="absolute bottom-0 left-[28%] h-[22%] w-px bg-gradient-to-t from-cyan-300 to-transparent" />
        <div className="absolute bottom-0 right-[31%] h-[29%] w-px bg-gradient-to-t from-purple-400 to-transparent" />
        <div className="absolute bottom-0 right-[12%] h-[43%] w-px bg-gradient-to-t from-blue-400 to-transparent" />
      </div>

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(1,4,15,0.76)_100%)]" />

      {/* Subtle grain without an image asset */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}