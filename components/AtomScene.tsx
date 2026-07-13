"use client";

import {
  AdaptiveDpr,
  Environment,
  PerformanceMonitor,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import AtomModel from "./atom/AtomModel";

export default function AtomScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    function updateDeviceType() {
      setIsMobile(mediaQuery.matches);
    }

    updateDeviceType();

    mediaQuery.addEventListener("change", updateDeviceType);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDeviceType,
      );
    };
  }, []);

  const maximumDpr = isMobile ? 1.15 : 1.5;
  const minimumDpr = isMobile ? 0.75 : 0.9;

  return (
    <div className="relative h-[430px] w-full bg-transparent sm:h-[560px] lg:h-[700px]">
      <Canvas
        style={{
          background: "transparent",
        }}
        camera={{
          position: [0, 0, 8.8],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        dpr={[
          minimumDpr,
          maximumDpr * performanceLevel,
        ]}
        performance={{
          min: 0.55,
          max: 1,
          debounce: 200,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <PerformanceMonitor
          bounds={(refreshRate) =>
            refreshRate > 90
              ? [50, 80]
              : [42, 58]
          }
          flipflops={3}
          onIncline={() => {
            setPerformanceLevel((current) =>
              Math.min(current + 0.1, 1),
            );
          }}
          onDecline={() => {
            setPerformanceLevel((current) =>
              Math.max(current - 0.15, 0.65),
            );
          }}
          onFallback={() => {
            setPerformanceLevel(0.65);
          }}
        />

        <AdaptiveDpr />

        <ambientLight intensity={0.18} />

        <directionalLight
          position={[4, 5, 7]}
          intensity={1.7}
          color="#e8fbff"
        />

        <directionalLight
          position={[-4, -2, 4]}
          intensity={1.1}
          color="#8b5cf6"
        />

        <pointLight
          position={[0, 3, 4]}
          intensity={1.4}
          color="#31d7ff"
          distance={10}
          decay={2}
        />

        <Environment
          preset="city"
          resolution={isMobile ? 64 : 128}
        />

        <AtomModel />
      </Canvas>
    </div>
  );
}