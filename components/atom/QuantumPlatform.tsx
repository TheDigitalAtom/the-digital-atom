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
  const platformRef =
    useRef<THREE.Group>(null);

  const outerRingRef =
    useRef<THREE.Mesh>(null);

  const segmentedRingRef =
    useRef<THREE.Mesh>(null);

  const middleRingRef =
    useRef<THREE.Mesh>(null);

  const innerRingRef =
    useRef<THREE.Mesh>(null);

  const pulseRingRef =
    useRef<THREE.Mesh>(null);

  const centreRef =
    useRef<THREE.Mesh>(null);

  const elapsedTime =
    useRef(0);

  useFrame((_, delta) => {
    elapsedTime.current +=
      delta;

    const time =
      elapsedTime.current;

    const strength =
      interaction.strength.current;

    const velocity =
      interaction.velocity.current;

    if (platformRef.current) {
      const targetScale =
        1 +
        strength * 0.012 +
        velocity * 0.008;

      const nextScale =
        THREE.MathUtils.damp(
          platformRef.current.scale.x,
          targetScale,
          3.5,
          delta,
        );

      platformRef.current.scale.setScalar(
        nextScale,
      );
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta *
        (0.045 +
          strength * 0.045);
    }

    if (segmentedRingRef.current) {
      segmentedRingRef.current.rotation.z -=
        delta *
        (0.065 +
          strength * 0.055);
    }

    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -=
        delta *
        (0.09 +
          strength * 0.075);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z +=
        delta *
        (0.13 +
          strength * 0.09);
    }

    if (pulseRingRef.current) {
      const pulse =
        1 +
        Math.sin(
          time * 1.8,
        ) *
          0.04 +
        strength * 0.025;

      pulseRingRef.current.scale.setScalar(
        pulse,
      );
    }

    if (centreRef.current) {
      const centrePulse =
        1 +
        Math.sin(
          time * 2.2,
        ) *
          0.05 +
        strength * 0.03;

      centreRef.current.scale.setScalar(
        centrePulse,
      );
    }
  });

  return (
    <group
      position={[
        0,
        -2.35,
        0,
      ]}
    >
      <group
        ref={platformRef}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={[
          1.55,
          1.55,
          1.55,
        ]}
      >
        {/* Atmospheric base */}
        <mesh
          position={[
            0,
            0,
            -0.02,
          ]}
        >
          <circleGeometry
            args={[
              2.25,
              48,
            ]}
          />

          <meshBasicMaterial
            color="#0b3ea8"
            transparent
            opacity={0.022}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer glow disc */}
        <mesh
          position={[
            0,
            0,
            -0.015,
          ]}
        >
          <ringGeometry
            args={[
              1.85,
              2.22,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#2563eb"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer structural ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry
            args={[
              2.05,
              0.022,
              6,
              72,
            ]}
          />

          <meshBasicMaterial
            color="#3478ff"
            transparent
            opacity={0.52}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Outer secondary ring */}
        <mesh scale={0.91}>
          <torusGeometry
            args={[
              2.05,
              0.014,
              6,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.26}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Rotating segmented ring */}
        <mesh
          ref={
            segmentedRingRef
          }
        >
          <ringGeometry
            args={[
              1.58,
              1.67,
              64,
              1,
              0.18,
              5.72,
            ]}
          />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Purple middle ring */}
        <mesh ref={middleRingRef}>
          <torusGeometry
            args={[
              1.28,
              0.024,
              6,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.66}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Cyan middle ring */}
        <mesh scale={0.78}>
          <torusGeometry
            args={[
              1.28,
              0.018,
              6,
              56,
            ]}
          />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.44}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Inner rotating ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry
            args={[
              0.72,
              0.032,
              6,
              48,
            ]}
          />

          <meshBasicMaterial
            color="#31d7ff"
            transparent
            opacity={0.86}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Inner purple accent */}
        <mesh scale={0.67}>
          <torusGeometry
            args={[
              0.72,
              0.023,
              6,
              48,
            ]}
          />

          <meshBasicMaterial
            color="#d55cff"
            transparent
            opacity={0.74}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Pulsing reactor ring */}
        <mesh ref={pulseRingRef}>
          <torusGeometry
            args={[
              0.38,
              0.05,
              8,
              48,
            ]}
          />

          <meshBasicMaterial
            color="#d8fbff"
            transparent
            opacity={0.9}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Bright centre */}
        <mesh ref={centreRef}>
          <circleGeometry
            args={[
              0.2,
              32,
            ]}
          />

          <meshBasicMaterial
            color="#effeff"
            transparent
            opacity={0.92}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}