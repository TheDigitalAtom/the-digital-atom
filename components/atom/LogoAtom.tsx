"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Electron from "./Electron";
import type {
  AtomInteraction,
  LogoOrbitProps,
} from "./types";

type LogoAtomProps = {
  interaction: AtomInteraction;
};

function LogoOrbit({
  rotation,
  color,
  speed,
  offset,
  interaction,
}: LogoOrbitProps) {
  return (
    <group rotation={rotation}>
      <mesh
        scale={[1.55, 0.78, 1]}
        renderOrder={5}
      >
        <torusGeometry args={[0.5, 0.025, 12, 72]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3.5}
          metalness={0.48}
          roughness={0.1}
          transparent
          opacity={0.96}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <Electron
        color={color}
        speed={speed}
        offset={offset}
        interaction={interaction}
        radiusX={0.775}
        radiusY={0.39}
        size={0.04}
        trailWidth={0.12}
        trailLength={2.4}
        lightIntensity={0.5}
      />
    </group>
  );
}

export default function LogoAtom({
  interaction,
}: LogoAtomProps) {
  const logoRef = useRef<THREE.Group>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;
    const velocity = interaction.velocity.current;

    if (logoRef.current) {
      logoRef.current.rotation.y -=
        delta * (0.36 + strength * 0.18);

      const targetX =
        Math.sin(time * 0.45) * 0.08 +
        interaction.pointerY.current *
          strength *
          0.05;

      const targetZ =
        Math.sin(time * 0.7) * 0.05 -
        interaction.pointerX.current *
          strength *
          0.05;

      logoRef.current.rotation.x = THREE.MathUtils.damp(
        logoRef.current.rotation.x,
        targetX,
        4,
        delta,
      );

      logoRef.current.rotation.z = THREE.MathUtils.damp(
        logoRef.current.rotation.z,
        targetZ,
        4,
        delta,
      );
    }

    if (nucleusRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2.8) * 0.08 +
        strength * 0.055 +
        velocity * 0.04;

      nucleusRef.current.scale.setScalar(pulse);
    }

    if (haloRef.current) {
      const haloPulse =
        1 +
        Math.sin(time * 2) * 0.06 +
        strength * 0.08;

      haloRef.current.scale.setScalar(haloPulse);
      haloRef.current.rotation.x +=
        delta * (0.12 + strength * 0.12);
      haloRef.current.rotation.y -=
        delta * (0.16 + strength * 0.14);
    }
  });

  return (
    <group
      ref={logoRef}
      scale={0.96}
      renderOrder={5}
    >
      <mesh
        ref={nucleusRef}
        renderOrder={7}
      >
        <icosahedronGeometry args={[0.17, 3]} />

        <meshStandardMaterial
          color="#e5fcff"
          emissive="#31d7ff"
          emissiveIntensity={5.5}
          metalness={0.15}
          roughness={0.06}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={haloRef}
        renderOrder={4}
      >
        <icosahedronGeometry args={[0.27, 2]} />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <LogoOrbit
        rotation={[0, 0, 0]}
        color="#31d7ff"
        speed={1.15}
        offset={0}
        interaction={interaction}
      />

      <LogoOrbit
        rotation={[0, 0, Math.PI / 3]}
        color="#3478ff"
        speed={0.98}
        offset={Math.PI * 0.66}
        interaction={interaction}
      />

      <LogoOrbit
        rotation={[0, 0, -Math.PI / 3]}
        color="#d55cff"
        speed={0.84}
        offset={Math.PI * 1.32}
        interaction={interaction}
      />
    </group>
  );
}