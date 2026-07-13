"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { ElectronProps } from "./types";

export default function Electron({
  color,
  speed,
  offset,
  interaction,
  radiusX = 3.35,
  radiusY = 1.68,
  size = 0.16,
  trailWidth = 0.34,
  trailLength = 5,
  lightIntensity = 2.5,
}: ElectronProps) {
  const electronRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const angleRef = useRef(offset);

  useFrame(({ clock }, delta) => {
    const electron = electronRef.current;

    if (!electron) return;

    const time = clock.getElapsedTime();
    const interactionStrength = interaction.strength.current;
    const pointerVelocity = interaction.velocity.current;

    const speedMultiplier =
      1 +
      interactionStrength * 0.8 +
      pointerVelocity * 1.15;

    angleRef.current += delta * speed * speedMultiplier;

    const angle = angleRef.current;

    const radiusDistortion =
      Math.sin(time * 1.7 + offset) *
      interactionStrength *
      0.08;

    const verticalDistortion =
      Math.cos(time * 2.1 + offset) *
      interactionStrength *
      0.055;

    const currentRadiusX =
      radiusX * (1 + radiusDistortion);

    const currentRadiusY =
      radiusY * (1 - radiusDistortion * 0.7);

    const x = Math.cos(angle) * currentRadiusX;
    const y =
      Math.sin(angle) * currentRadiusY +
      verticalDistortion;

    const z =
      Math.sin(angle * 2 + time) *
      interactionStrength *
      0.08;

    electron.position.set(x, y, z);

    const electronPulse =
      1 +
      Math.sin(time * 4 + offset) * 0.08 +
      pointerVelocity * 0.18;

    electron.scale.setScalar(electronPulse);

    if (lightRef.current) {
      const targetIntensity =
        lightIntensity +
        interactionStrength * 1.5 +
        pointerVelocity * 2.2;

      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        targetIntensity,
        6,
        delta,
      );
    }
  });

  return (
  <>
    <mesh ref={electronRef}>
      <sphereGeometry args={[size, 20, 20]} />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={4}
        metalness={0.35}
        roughness={0.08}
        toneMapped={false}
      />

      <pointLight
        ref={lightRef}
        color={color}
        intensity={lightIntensity}
        distance={size * 14}
        decay={2}
      />
    </mesh>
  </>
);
}