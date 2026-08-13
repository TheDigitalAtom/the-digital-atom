"use client";

import { useFrame } from "@react-three/fiber";
import {
  useMemo,
  useRef,
} from "react";
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
  const beamRef =
    useRef<THREE.Group>(null);

  const mainBeamRef =
    useRef<THREE.Mesh>(null);

  const innerBeamRef =
    useRef<THREE.Mesh>(null);

  const pulseRingRef =
    useRef<THREE.Mesh>(null);

  const particleRefs =
    useRef<
      Array<THREE.Mesh | null>
    >([]);

  const elapsedTime =
    useRef(0);

  const particles =
    useMemo<BeamParticle[]>(
      () => {
        const colors = [
          "#31d7ff",
          "#3478ff",
          "#a855f7",
          "#e8fbff",
        ];

        /*
         * Reduced from 18 particles
         * to 8.
         */
        return Array.from(
          {
            length: 8,
          },
          (_, index) => ({
            radius:
              0.12 +
              (index % 4) *
                0.035,

            angle:
              (index / 8) *
              Math.PI *
              2,

            height:
              -0.9 +
              (index / 7) *
                1.8,

            speed:
              0.65 +
              (index % 4) *
                0.14,

            size:
              0.02 +
              (index % 3) *
                0.005,

            color:
              colors[
                index %
                  colors.length
              ],
          }),
        );
      },
      [],
    );

  useFrame((_, delta) => {
    elapsedTime.current +=
      delta;

    const time =
      elapsedTime.current;

    const strength =
      interaction.strength.current;

    const velocity =
      interaction.velocity.current;

    if (beamRef.current) {
      beamRef.current.rotation.y +=
        delta *
        (0.05 +
          strength * 0.06);
    }

    if (mainBeamRef.current) {
      const pulse =
        1 +
        Math.sin(
          time * 1.8,
        ) *
          0.04 +
        strength * 0.045 +
        velocity * 0.02;

      const nextScale =
        THREE.MathUtils.damp(
          mainBeamRef.current
            .scale.x,
          pulse,
          4,
          delta,
        );

      mainBeamRef.current.scale.x =
        nextScale;

      mainBeamRef.current.scale.z =
        nextScale;
    }

    if (innerBeamRef.current) {
      const pulse =
        1 +
        Math.sin(
          time * 2.4,
        ) *
          0.055 +
        strength * 0.06;

      innerBeamRef.current.scale.x =
        pulse;

      innerBeamRef.current.scale.z =
        pulse;
    }

    if (pulseRingRef.current) {
      const ringPulse =
        1 +
        Math.sin(
          time * 2,
        ) *
          0.075 +
        strength * 0.045;

      pulseRingRef.current.scale.setScalar(
        ringPulse,
      );

      pulseRingRef.current.rotation.z +=
        delta *
        (0.28 +
          strength * 0.18);
    }

    particleRefs.current.forEach(
      (
        particle,
        index,
      ) => {
        if (!particle) {
          return;
        }

        const data =
          particles[index];

        if (!data) {
          return;
        }

        const animatedHeight =
          ((data.height +
            time *
              data.speed +
            index * 0.12) %
            1.8) -
          0.9;

        const angle =
          data.angle +
          time *
            (0.55 +
              index *
                0.01);

        const radius =
          data.radius +
          Math.sin(
            time * 1.6 +
              index,
          ) *
            0.012;

        particle.position.set(
          Math.cos(angle) *
            radius,
          animatedHeight,
          Math.sin(angle) *
            radius,
        );

        const particlePulse =
          1 +
          Math.sin(
            time * 2.8 +
              index,
          ) *
            0.16 +
          strength * 0.1;

        particle.scale.setScalar(
          data.size *
            particlePulse,
        );
      },
    );
  });

  return (
    <group
      ref={beamRef}
      position={[
        0,
        -0.95,
        0,
      ]}
    >
      {/* Wide atmospheric beam */}
      <mesh
        ref={
          mainBeamRef
        }
      >
        <cylinderGeometry
          args={[
            0.34,
            0.56,
            1.9,
            16,
            1,
            true,
          ]}
        />

        <meshBasicMaterial
          color="#1267ff"
          transparent
          opacity={0.045}
          side={THREE.DoubleSide}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Bright inner beam */}
      <mesh
        ref={
          innerBeamRef
        }
      >
        <cylinderGeometry
          args={[
            0.1,
            0.2,
            1.86,
            12,
            1,
            true,
          ]}
        />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Central filament */}
      <mesh>
        <cylinderGeometry
          args={[
            0.025,
            0.055,
            1.82,
            8,
          ]}
        />

        <meshBasicMaterial
          color="#e9feff"
          transparent
          opacity={0.58}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Energy pulse ring */}
      <mesh
        ref={
          pulseRingRef
        }
        position={[
          0,
          0.78,
          0,
        ]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.28,
            0.018,
            6,
            36,
          ]}
        />

        <meshBasicMaterial
          color="#9defff"
          transparent
          opacity={0.56}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Rising energy particles */}
      {particles.map(
        (
          particle,
          index,
        ) => (
          <mesh
            key={index}
            ref={(mesh) => {
              particleRefs.current[
                index
              ] = mesh;
            }}
          >
            <sphereGeometry
              args={[
                1,
                6,
                6,
              ]}
            />

            <meshBasicMaterial
              color={
                particle.color
              }
              transparent
              opacity={0.78}
              blending={
                THREE.AdditiveBlending
              }
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ),
      )}
    </group>
  );
}