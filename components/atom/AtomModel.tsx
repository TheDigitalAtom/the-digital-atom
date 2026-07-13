"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import EnergyBeam from "./EnergyBeam";
import EnergyCore from "./EnergyCore";
import OrbitRing from "./OrbitRing";
import QuantumPlatform from "./QuantumPlatform";
import type { AtomInteraction } from "./types";

export default function AtomModel() {
  const sceneRef = useRef<THREE.Group>(null);
  const atomRef = useRef<THREE.Group>(null);

  const previousPointer = useRef({
    x: 0,
    y: 0,
  });

  const interaction = useMemo<AtomInteraction>(
    () => ({
      strength: { current: 0 },
      velocity: { current: 0 },
      pointerX: { current: 0 },
      pointerY: { current: 0 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const scene = sceneRef.current;
    const atom = atomRef.current;

    if (!scene || !atom) return;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const pointerDeltaX =
      pointerX - previousPointer.current.x;

    const pointerDeltaY =
      pointerY - previousPointer.current.y;

    const rawVelocity = Math.min(
      Math.sqrt(
        pointerDeltaX * pointerDeltaX +
          pointerDeltaY * pointerDeltaY,
      ) / Math.max(delta, 0.001),
      3,
    );

    previousPointer.current.x = pointerX;
    previousPointer.current.y = pointerY;

    const pointerDistance = Math.min(
      Math.sqrt(
        pointerX * pointerX +
          pointerY * pointerY,
      ),
      1,
    );

    interaction.pointerX.current =
      THREE.MathUtils.damp(
        interaction.pointerX.current,
        pointerX,
        5,
        delta,
      );

    interaction.pointerY.current =
      THREE.MathUtils.damp(
        interaction.pointerY.current,
        pointerY,
        5,
        delta,
      );

    interaction.velocity.current =
      THREE.MathUtils.damp(
        interaction.velocity.current,
        rawVelocity * 0.22,
        7,
        delta,
      );

    interaction.strength.current =
      THREE.MathUtils.damp(
        interaction.strength.current,
        pointerDistance +
          interaction.velocity.current * 0.4,
        4,
        delta,
      );

    atom.rotation.y +=
      delta *
      (0.05 + interaction.velocity.current * 0.035);

    const targetRotationX =
      pointerY *
      (0.11 + interaction.strength.current * 0.025);

    const targetRotationZ =
      -pointerX *
      (0.135 + interaction.strength.current * 0.035);

    atom.rotation.x = THREE.MathUtils.damp(
      atom.rotation.x,
      targetRotationX,
      3.2,
      delta,
    );

    atom.rotation.z = THREE.MathUtils.damp(
      atom.rotation.z,
      targetRotationZ,
      3.2,
      delta,
    );

    scene.position.x = THREE.MathUtils.damp(
      scene.position.x,
      pointerX * 0.055,
      3,
      delta,
    );

    scene.position.y = THREE.MathUtils.damp(
      scene.position.y,
      pointerY * 0.035,
      3,
      delta,
    );
  });

  return (
    <group
      ref={sceneRef}
      position={[0.25, 0.2, 0]}
    >
      <QuantumPlatform interaction={interaction} />

      <EnergyBeam interaction={interaction} />

      <Float
        speed={1.05}
        rotationIntensity={0.025}
        floatIntensity={0.14}
        floatingRange={[-0.05, 0.05]}
      >
        <group
          ref={atomRef}
          position={[0, 0.45, 0]}
          scale={0.7}
        >
          <EnergyCore interaction={interaction} />

          <OrbitRing
            index={0}
            rotation={[0, 0, 0]}
            color="#31d7ff"
            speed={0.55}
            offset={0}
            interaction={interaction}
          />

          <OrbitRing
            index={1}
            rotation={[0, 0, Math.PI / 3]}
            color="#3478ff"
            speed={0.46}
            offset={Math.PI * 0.7}
            interaction={interaction}
          />

          <OrbitRing
            index={2}
            rotation={[0, 0, -Math.PI / 3]}
            color="#c95cff"
            speed={0.39}
            offset={Math.PI * 1.35}
            interaction={interaction}
          />
        </group>
      </Float>
    </group>
  );
}