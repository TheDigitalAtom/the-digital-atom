"use client";

import { Canvas } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import AtomModel from "./atom/AtomModel";

export default function DesktopAtomScene() {
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
          background:
            "transparent",
        }}
        camera={{
          position: [
            0,
            0,
            8.8,
          ],
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        dpr={[
          0.75,
          1.1,
        ]}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 500,
        }}
        gl={{
          antialias: false,
          alpha: true,
          premultipliedAlpha:
            false,
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

          scene.background =
            null;
        }}
      >
        <ambientLight
          intensity={0.3}
        />

        <directionalLight
          position={[
            4,
            5,
            7,
          ]}
          intensity={1.65}
          color="#e8fbff"
        />

        <directionalLight
          position={[
            -4,
            -2,
            4,
          ]}
          intensity={0.9}
          color="#8b5cf6"
        />

        <pointLight
          position={[
            0,
            3,
            4,
          ]}
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