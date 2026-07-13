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
  const orbitRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const orbit = orbitRef.current;

    if (!orbit) return;

    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;
    const velocity = interaction.velocity.current;

    const direction = index % 2 === 0 ? 1 : -1;
    const phase = index * 1.7;

    const flexX =
      Math.sin(time * 0.75 + phase) *
      strength *
      0.045;

    const flexY =
      Math.cos(time * 0.62 + phase) *
      strength *
      0.04;

    const pointerTiltX =
      interaction.pointerY.current *
      strength *
      0.055 *
      direction;

    const pointerTiltY =
      interaction.pointerX.current *
      strength *
      0.075 *
      direction;

    orbit.rotation.x = THREE.MathUtils.damp(
      orbit.rotation.x,
      rotation[0] + flexX + pointerTiltX,
      4,
      delta,
    );

    orbit.rotation.y = THREE.MathUtils.damp(
      orbit.rotation.y,
      rotation[1] + flexY + pointerTiltY,
      4,
      delta,
    );

    orbit.rotation.z = THREE.MathUtils.damp(
      orbit.rotation.z,
      rotation[2] +
        Math.sin(time * 0.5 + phase) *
          strength *
          0.035,
      4,
      delta,
    );

    const targetScale =
      1 + strength * 0.018 + velocity * 0.025;

    orbit.scale.setScalar(
      THREE.MathUtils.damp(
        orbit.scale.x,
        targetScale,
        5,
        delta,
      ),
    );

    if (glowRef.current) {
      const glowPulse =
        1 +
        strength * 0.06 +
        Math.sin(time * 2.4 + phase) * 0.015;

      glowRef.current.scale.set(
        1.55 * glowPulse,
        0.78 * glowPulse,
        1,
      );
    }
  });

  return (
    <group ref={orbitRef} rotation={rotation}>
      {/* Structural chrome ring */}
      <mesh scale={[1.55, 0.78, 1]}>
        <torusGeometry args={[2.15, 0.062, 18, 128]} />

        <meshPhysicalMaterial
          color="#b8d9ff"
          emissive={color}
          emissiveIntensity={0.18}
          metalness={0.88}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Main illuminated ring */}
      <mesh scale={[1.55, 0.78, 1.001]}>
        <torusGeometry args={[2.15, 0.035, 14, 128]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}
          metalness={0.3}
          roughness={0.12}
          toneMapped={false}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh
        ref={glowRef}
        scale={[1.55, 0.78, 1.002]}
      >
        <torusGeometry args={[2.15, 0.09, 12, 96]} />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.055}
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