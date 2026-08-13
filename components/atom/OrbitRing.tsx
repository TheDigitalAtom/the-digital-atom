"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Electron from "./Electron";
import type { OrbitRingProps } from "./types";

export default function OrbitRing({
  rotation,
  color,
  speed,
  offset,
  interaction,
  index,
}: OrbitRingProps) {
  const orbitRef =
    useRef<THREE.Group>(null);

  const glowRef =
    useRef<THREE.Mesh>(null);

  const elapsedTime =
    useRef(0);

  useFrame((_, delta) => {
    const orbit =
      orbitRef.current;

    if (!orbit) {
      return;
    }

    /*
     * Maintain our own lightweight
     * animation timer instead of
     * requesting THREE.Clock time.
     */
    elapsedTime.current += delta;

    const time =
      elapsedTime.current;

    const strength =
      interaction.strength.current;

    const velocity =
      interaction.velocity.current;

    const direction =
      index % 2 === 0
        ? 1
        : -1;

    const phase =
      index * 1.7;

    /*
     * Keep the organic orbital motion,
     * but reduce how much geometry is
     * constantly being transformed.
     */
    const flexX =
      Math.sin(
        time * 0.7 +
          phase,
      ) *
      strength *
      0.035;

    const flexY =
      Math.cos(
        time * 0.6 +
          phase,
      ) *
      strength *
      0.03;

    const pointerTiltX =
      interaction.pointerY.current *
      strength *
      0.045 *
      direction;

    const pointerTiltY =
      interaction.pointerX.current *
      strength *
      0.06 *
      direction;

    orbit.rotation.x =
      THREE.MathUtils.damp(
        orbit.rotation.x,
        rotation[0] +
          flexX +
          pointerTiltX,
        3.5,
        delta,
      );

    orbit.rotation.y =
      THREE.MathUtils.damp(
        orbit.rotation.y,
        rotation[1] +
          flexY +
          pointerTiltY,
        3.5,
        delta,
      );

    orbit.rotation.z =
      THREE.MathUtils.damp(
        orbit.rotation.z,
        rotation[2] +
          Math.sin(
            time * 0.45 +
              phase,
          ) *
            strength *
            0.025,
        3.5,
        delta,
      );

    /*
     * Very small interaction scaling.
     */
    const targetScale =
      1 +
      strength * 0.012 +
      velocity * 0.015;

    const nextScale =
      THREE.MathUtils.damp(
        orbit.scale.x,
        targetScale,
        4,
        delta,
      );

    orbit.scale.setScalar(
      nextScale,
    );

    /*
     * Gentle glow pulse.
     */
    if (glowRef.current) {
      const pulse =
        1 +
        strength * 0.035 +
        Math.sin(
          time * 1.8 +
            phase,
        ) *
          0.01;

      glowRef.current.scale.set(
        1.55 * pulse,
        0.78 * pulse,
        1,
      );
    }
  });

  return (
    <group
      ref={orbitRef}
      rotation={rotation}
    >
      {/* Main metallic orbit */}
      <mesh
        scale={[
          1.55,
          0.78,
          1,
        ]}
      >
        <torusGeometry
          args={[
            2.15,
            0.058,
            10,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#b8d9ff"
          emissive={color}
          emissiveIntensity={0.28}
          metalness={0.82}
          roughness={0.22}
        />
      </mesh>

      {/* Neon energy line */}
      <mesh
        scale={[
          1.55,
          0.78,
          1.001,
        ]}
      >
        <torusGeometry
          args={[
            2.15,
            0.025,
            8,
            64,
          ]}
        />

        <meshBasicMaterial
          color={color}
          toneMapped={false}
        />
      </mesh>

      {/* Lightweight atmospheric glow */}
      <mesh
        ref={glowRef}
        scale={[
          1.55,
          0.78,
          1.002,
        ]}
      >
        <torusGeometry
          args={[
            2.15,
            0.075,
            6,
            48,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.045}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <Electron
        color={color}
        speed={speed}
        offset={offset}
        interaction={interaction}
      />
    </group>
  );
}