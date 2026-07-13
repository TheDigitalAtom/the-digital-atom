"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import type { AtomInteraction } from "./types";

type EnergyBeamProps = {
  interaction: AtomInteraction;
};

type BeamParticle = {
  radius: number;
  angle: number;
  height: number;
  speed: number;
  size: number;
  color: string;
};

export default function EnergyBeam({
  interaction,
}: EnergyBeamProps) {
  const beamRef = useRef<THREE.Group>(null);
  const mainBeamRef = useRef<THREE.Mesh>(null);
  const innerBeamRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const particleRefs = useRef<Array<THREE.Mesh | null>>([]);

  const particles = useMemo<BeamParticle[]>(() => {
    const colors = [
      "#31d7ff",
      "#3478ff",
      "#a855f7",
      "#e8fbff",
    ];

    return Array.from({ length: 18 }, (_, index) => ({
      radius: 0.12 + (index % 5) * 0.035,
      angle: (index / 18) * Math.PI * 2,
      height: -0.9 + (index / 17) * 1.8,
      speed: 0.7 + (index % 4) * 0.16,
      size: 0.018 + (index % 3) * 0.006,
      color: colors[index % colors.length],
    }));
  }, []);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;
    const velocity = interaction.velocity.current;

    if (beamRef.current) {
      beamRef.current.rotation.y +=
        delta * (0.08 + strength * 0.12);
    }

    if (mainBeamRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2.3) * 0.06 +
        strength * 0.08 +
        velocity * 0.04;

      mainBeamRef.current.scale.x =
        THREE.MathUtils.damp(
          mainBeamRef.current.scale.x,
          pulse,
          5,
          delta,
        );

      mainBeamRef.current.scale.z =
        THREE.MathUtils.damp(
          mainBeamRef.current.scale.z,
          pulse,
          5,
          delta,
        );
    }

    if (innerBeamRef.current) {
      const innerPulse =
        1 +
        Math.sin(time * 3.8) * 0.08 +
        strength * 0.1;

      innerBeamRef.current.scale.x = innerPulse;
      innerBeamRef.current.scale.z = innerPulse;
    }

    if (pulseRingRef.current) {
      const ringPulse =
        1 +
        Math.sin(time * 2.8) * 0.12 +
        strength * 0.08;

      pulseRingRef.current.scale.setScalar(ringPulse);
      pulseRingRef.current.rotation.z +=
        delta * (0.45 + strength * 0.35);
    }

    particleRefs.current.forEach((particle, index) => {
      if (!particle) return;

      const data = particles[index];

      const animatedHeight =
        ((data.height +
          time * data.speed +
          index * 0.09) %
          1.8) -
        0.9;

      const angle =
        data.angle +
        time * (0.7 + index * 0.012);

      const radius =
        data.radius +
        Math.sin(time * 2 + index) * 0.018;

      particle.position.set(
        Math.cos(angle) * radius,
        animatedHeight,
        Math.sin(angle) * radius,
      );

      const particlePulse =
        1 +
        Math.sin(time * 4 + index) * 0.25 +
        strength * 0.2;

      particle.scale.setScalar(
        data.size * particlePulse,
      );
    });
  });

  return (
    <group
      ref={beamRef}
      position={[0, -0.95, 0]}
    >
      {/* Wide atmospheric beam */}
      <mesh ref={mainBeamRef}>
        <cylinderGeometry args={[0.34, 0.56, 1.9, 32, 1, true]} />

        <meshBasicMaterial
          color="#1267ff"
          transparent
          opacity={0.055}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Bright inner beam */}
      <mesh ref={innerBeamRef}>
        <cylinderGeometry args={[0.1, 0.2, 1.86, 24, 1, true]} />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* White-hot central filament */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.055, 1.82, 16]} />

        <meshBasicMaterial
          color="#e9feff"
          transparent
          opacity={0.68}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Energy pulse ring near the core */}
      <mesh
        ref={pulseRingRef}
        position={[0, 0.78, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.28, 0.018, 10, 72]} />

        <meshBasicMaterial
          color="#9defff"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Rising energy particles */}
      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            particleRefs.current[index] = mesh;
          }}
        >
          <sphereGeometry args={[1, 8, 8]} />

          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}

      <pointLight
        position={[0, 0.4, 0]}
        color="#31d7ff"
        intensity={1.7}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}