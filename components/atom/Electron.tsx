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
}: ElectronProps) {
  const electronRef =
    useRef<THREE.Mesh>(null);

  const angleRef =
    useRef(offset);

  const elapsedTime =
    useRef(0);

  useFrame((_, delta) => {
    const electron =
      electronRef.current;

    if (!electron) {
      return;
    }

    elapsedTime.current +=
      delta;

    const time =
      elapsedTime.current;

    const interactionStrength =
      interaction.strength.current;

    const pointerVelocity =
      interaction.velocity.current;

    /*
     * Interaction still speeds
     * the electron up slightly,
     * but less aggressively than
     * before.
     */
    const speedMultiplier =
      1 +
      interactionStrength *
        0.5 +
      pointerVelocity * 0.65;

    angleRef.current +=
      delta *
      speed *
      speedMultiplier;

    const angle =
      angleRef.current;

    /*
     * Keep a subtle organic
     * distortion without making
     * the orbit move too wildly.
     */
    const radiusDistortion =
      Math.sin(
        time * 1.35 +
          offset,
      ) *
      interactionStrength *
      0.045;

    const verticalDistortion =
      Math.cos(
        time * 1.65 +
          offset,
      ) *
      interactionStrength *
      0.03;

    const currentRadiusX =
      radiusX *
      (1 +
        radiusDistortion);

    const currentRadiusY =
      radiusY *
      (1 -
        radiusDistortion *
          0.6);

    const x =
      Math.cos(angle) *
      currentRadiusX;

    const y =
      Math.sin(angle) *
        currentRadiusY +
      verticalDistortion;

    const z =
      Math.sin(
        angle * 2 +
          time * 0.7,
      ) *
      interactionStrength *
      0.045;

    electron.position.set(
      x,
      y,
      z,
    );

    /*
     * Small pulse gives the
     * electron life without
     * needing a dynamic light.
     */
    const pulse =
      1 +
      Math.sin(
        time * 3 +
          offset,
      ) *
        0.055 +
      pointerVelocity * 0.08;

    electron.scale.setScalar(
      pulse,
    );
  });

  return (
    <mesh
      ref={electronRef}
      renderOrder={6}
    >
      <sphereGeometry
        args={[
          size,
          10,
          10,
        ]}
      />

      <meshBasicMaterial
        color={color}
        toneMapped={false}
      />
    </mesh>
  );
}