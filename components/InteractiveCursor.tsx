"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] =
    useState(false);
  const [pressed, setPressed] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const smoothX = useSpring(pointerX, {
    stiffness: 520,
    damping: 42,
    mass: 0.45,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 520,
    damping: 42,
    mass: 0.45,
  });

  const glowX = useSpring(pointerX, {
    stiffness: 110,
    damping: 24,
    mass: 0.8,
  });

  const glowY = useSpring(pointerY, {
    stiffness: 110,
    damping: 24,
    mass: 0.8,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)",
    );

    function updateEnabled() {
      setEnabled(mediaQuery.matches);
    }

    updateEnabled();

    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateEnabled,
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = event.target;

      if (!(target instanceof Element)) {
        setHoveringInteractive(false);
        return;
      }

      const interactiveElement = target.closest(
        [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "[role='button']",
          "[data-cursor='interactive']",
        ].join(","),
      );

      setHoveringInteractive(Boolean(interactiveElement));
    }

    function handlePointerLeave() {
      setVisible(false);
      setHoveringInteractive(false);
      setPressed(false);
    }

    function handlePointerEnter() {
      setVisible(true);
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    document.documentElement.addEventListener(
      "mouseleave",
      handlePointerLeave,
    );

    document.documentElement.addEventListener(
      "mouseenter",
      handlePointerEnter,
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        handlePointerEnter,
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp,
      );
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100]"
        >
          {/* Slow atmospheric glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: hoveringInteractive ? 0.46 : 0.28,
              scale: hoveringInteractive ? 1.2 : 1,
            }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
              scale: {
                type: "spring",
                stiffness: 180,
                damping: 24,
              },
            }}
            style={{
              x: glowX,
              y: glowY,
            }}
            className="absolute left-0 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,215,255,0.18),rgba(52,120,255,0.08)_36%,rgba(168,85,247,0.035)_60%,transparent_74%)] blur-xl"
          />

          {/* Outer holographic reticle */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.4,
              rotate: -40,
            }}
            animate={{
              opacity: 1,
              scale: pressed
                ? 0.72
                : hoveringInteractive
                  ? 1.55
                  : 1,
              rotate: hoveringInteractive ? 90 : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.4,
            }}
            transition={{
              opacity: {
                duration: 0.18,
              },
              scale: {
                type: "spring",
                stiffness: 350,
                damping: 25,
              },
              rotate: {
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/55 shadow-[0_0_18px_rgba(49,215,255,0.28)]"
          >
            <span className="absolute left-1/2 top-[-5px] h-[7px] w-px -translate-x-1/2 bg-cyan-200/70" />

            <span className="absolute bottom-[-5px] left-1/2 h-[7px] w-px -translate-x-1/2 bg-cyan-200/70" />

            <span className="absolute left-[-5px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-cyan-200/70" />

            <span className="absolute right-[-5px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-cyan-200/70" />

            <motion.span
              animate={{
                opacity: hoveringInteractive
                  ? [0.3, 1, 0.3]
                  : 0.5,
                scale: hoveringInteractive
                  ? [0.7, 1.15, 0.7]
                  : 1,
              }}
              transition={{
                duration: 1.25,
                repeat: hoveringInteractive
                  ? Infinity
                  : 0,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(125,240,255,1)]"
            />
          </motion.div>

          {/* Fast central pointer */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: pressed ? 1.7 : 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            style={{
              x: pointerX,
              y: pointerY,
            }}
            className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_9px_rgba(255,255,255,0.95)]"
          />
        </div>
      )}
    </AnimatePresence>
  );
}