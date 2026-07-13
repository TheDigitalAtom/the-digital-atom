"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { AtomInteraction } from "./types";

type QuantumPlatformProps = {
  interaction: AtomInteraction;
};

export default function QuantumPlatform({
  interaction,
}: QuantumPlatformProps) {
  const platformRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const segmentedRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const centreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;
    const velocity = interaction.velocity.current;

    if (platformRef.current) {
      const targetScale =
        1 + strength * 0.018 + velocity * 0.012;

      const nextScale = THREE.MathUtils.damp(
        platformRef.current.scale.x,
        targetScale,
        4,
        delta,
      );

      platformRef.current.scale.setScalar(nextScale);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta * (0.06 + strength * 0.08);
    }

    if (segmentedRingRef.current) {
      segmentedRingRef.current.rotation.z -=
        delta * (0.09 + strength * 0.1);
    }

    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -=
        delta * (0.13 + strength * 0.14);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z +=
        delta * (0.2 + strength * 0.18);
    }

    if (pulseRingRef.current) {
      const pulse =
        1 +
        Math.sin(time * 2.3) * 0.06 +
        strength * 0.04 +
        velocity * 0.02;

      pulseRingRef.current.scale.setScalar(pulse);
    }

    if (centreRef.current) {
      const centrePulse =
        1 +
        Math.sin(time * 3.1) * 0.08 +
        strength * 0.05;

      centreRef.current.scale.setScalar(centrePulse);
    }

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity,
        2.4 + strength * 2.8 + velocity * 1.4,
        5,
        delta,
      );
    }
  });

  return (
    <group position={[0, -2.35, 0]}>
      <group
        ref={platformRef}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.55, 1.55, 1.55]}
      >
        {/* Atmospheric base */}
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[2.25, 96]} />

          <meshBasicMaterial
            color="#0b3ea8"
            transparent
            opacity={0.028}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer glow disc */}
        <mesh position={[0, 0, -0.015]}>
          <ringGeometry args={[1.85, 2.22, 128]} />

          <meshBasicMaterial
            color="#2563eb"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer structural ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.05, 0.022, 12, 160]} />

          <meshBasicMaterial
            color="#3478ff"
            transparent
            opacity={0.56}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer secondary ring */}
        <mesh scale={0.91}>
          <torusGeometry args={[2.05, 0.014, 10, 144]} />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Rotating segmented ring */}
        <mesh ref={segmentedRingRef}>
          <ringGeometry
            args={[1.58, 1.67, 128, 1, 0.18, 5.72]}
          />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.34}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Purple middle ring */}
        <mesh ref={middleRingRef}>
          <torusGeometry args={[1.28, 0.024, 12, 128]} />

          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.72}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Cyan middle ring */}
        <mesh scale={0.78}>
          <torusGeometry args={[1.28, 0.018, 10, 120]} />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Inner rotating ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[0.72, 0.032, 12, 96]} />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.92}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Inner purple accent */}
        <mesh scale={0.67}>
          <torusGeometry args={[0.72, 0.023, 12, 96]} />

          <meshBasicMaterial
            color="#d55cff"
            transparent
            opacity={0.82}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Pulsing reactor ring */}
        <mesh ref={pulseRingRef}>
          <torusGeometry args={[0.38, 0.05, 14, 96]} />

          <meshBasicMaterial
            color="#d8fbff"
            transparent
            opacity={0.96}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Bright centre */}
        <mesh ref={centreRef}>
          <circleGeometry args={[0.2, 64]} />

          <meshBasicMaterial
            color="#effeff"
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <pointLight
        ref={lightRef}
        position={[0, 0.35, 0]}
        color="#31d7ff"
        intensity={2.4}
        distance={5}
        decay={2}
      />
    </group>
  );
}