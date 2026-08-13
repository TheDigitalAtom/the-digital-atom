"use client";

import { useFrame } from "@react-three/fiber";
import {
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

import EnergyBeam from "./EnergyBeam";
import EnergyCore from "./EnergyCore";
import OrbitRing from "./OrbitRing";
import QuantumPlatform from "./QuantumPlatform";
import type { AtomInteraction } from "./types";

type AtomModelProps = {
  reducedMotion?: boolean;
};

export default function AtomModel({
  reducedMotion = false,
}: AtomModelProps) {
  const sceneRef =
    useRef<THREE.Group>(null);

  const atomRef =
    useRef<THREE.Group>(null);

  const previousPointerX =
    useRef(0);

  const previousPointerY =
    useRef(0);

  const elapsedTime =
    useRef(0);

  const interaction =
    useMemo<AtomInteraction>(
      () => ({
        strength: {
          current: 0,
        },
        velocity: {
          current: 0,
        },
        pointerX: {
          current: 0,
        },
        pointerY: {
          current: 0,
        },
      }),
      [],
    );

  useFrame((state, delta) => {
    const scene =
      sceneRef.current;

    const atom =
      atomRef.current;

    if (!scene || !atom) {
      return;
    }

    elapsedTime.current +=
      delta;

    if (reducedMotion) {
      atom.rotation.y +=
        delta * 0.025;

      atom.position.y =
        0.45;

      return;
    }

    const pointerX =
      state.pointer.x;

    const pointerY =
      state.pointer.y;

    const deltaX =
      pointerX -
      previousPointerX.current;

    const deltaY =
      pointerY -
      previousPointerY.current;

    previousPointerX.current =
      pointerX;

    previousPointerY.current =
      pointerY;

    const pointerVelocity =
      Math.min(
        Math.hypot(
          deltaX,
          deltaY,
        ) /
          Math.max(
            delta,
            0.016,
          ),
        3,
      );

    const pointerDistance =
      Math.min(
        Math.hypot(
          pointerX,
          pointerY,
        ),
        1,
      );

    interaction.pointerX.current =
      THREE.MathUtils.damp(
        interaction.pointerX.current,
        pointerX,
        4,
        delta,
      );

    interaction.pointerY.current =
      THREE.MathUtils.damp(
        interaction.pointerY.current,
        pointerY,
        4,
        delta,
      );

    interaction.velocity.current =
      THREE.MathUtils.damp(
        interaction.velocity.current,
        pointerVelocity *
          0.18,
        6,
        delta,
      );

    interaction.strength.current =
      THREE.MathUtils.damp(
        interaction.strength.current,
        pointerDistance +
          interaction.velocity.current *
            0.35,
        3.5,
        delta,
      );

    /*
     * Slow base rotation.
     */
    atom.rotation.y +=
      delta *
      (0.045 +
        interaction.velocity.current *
          0.025);

    /*
     * Mouse tilt.
     */
    const targetRotationX =
      pointerY *
      (0.1 +
        interaction.strength.current *
          0.02);

    const targetRotationZ =
      -pointerX *
      (0.12 +
        interaction.strength.current *
          0.025);

    atom.rotation.x =
      THREE.MathUtils.damp(
        atom.rotation.x,
        targetRotationX,
        3,
        delta,
      );

    atom.rotation.z =
      THREE.MathUtils.damp(
        atom.rotation.z,
        targetRotationZ,
        3,
        delta,
      );

    /*
     * Very subtle floating motion.
     *
     * This replaces Drei's <Float>,
     * which means we no longer need a
     * separate animation controller.
     */
    atom.position.y =
      0.45 +
      Math.sin(
        elapsedTime.current *
          0.85,
      ) *
        0.035;

    /*
     * Small pointer parallax.
     */
    scene.position.x =
      THREE.MathUtils.damp(
        scene.position.x,
        0.25 +
          pointerX * 0.045,
        2.5,
        delta,
      );

    scene.position.y =
      THREE.MathUtils.damp(
        scene.position.y,
        0.2 +
          pointerY * 0.025,
        2.5,
        delta,
      );
  });

  return (
    <group
      ref={sceneRef}
      position={[
        0.25,
        0.2,
        0,
      ]}
    >
      <QuantumPlatform
        interaction={interaction}
      />

      <EnergyBeam
        interaction={interaction}
      />

      <group
        ref={atomRef}
        position={[
          0,
          0.45,
          0,
        ]}
        scale={0.7}
      >
        <EnergyCore
          interaction={interaction}
        />

        <OrbitRing
          index={0}
          rotation={[
            0,
            0,
            0,
          ]}
          color="#31d7ff"
          speed={0.55}
          offset={0}
          interaction={interaction}
        />

        <OrbitRing
          index={1}
          rotation={[
            0,
            0,
            Math.PI / 3,
          ]}
          color="#3478ff"
          speed={0.46}
          offset={
            Math.PI * 0.7
          }
          interaction={interaction}
        />

        <OrbitRing
          index={2}
          rotation={[
            0,
            0,
            -Math.PI / 3,
          ]}
          color="#c95cff"
          speed={0.39}
          offset={
            Math.PI * 1.35
          }
          interaction={interaction}
        />
      </group>
    </group>
  );
}