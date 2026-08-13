"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

import LogoAtom from "./LogoAtom";
import type { AtomInteraction } from "./types";

type EnergyCoreProps = {
  interaction: AtomInteraction;
};

type CoreParticle = {
  position: [
    number,
    number,
    number,
  ];
  scale: number;
  speed: number;
  offset: number;
  color: string;
};

function CoreParticles({
  interaction,
}: EnergyCoreProps) {
  const groupRef =
    useRef<THREE.Group>(null);

  const particleRefs =
    useRef<
      Array<THREE.Mesh | null>
    >([]);

  const elapsedTime =
    useRef(0);

  const particles =
    useMemo<CoreParticle[]>(
      () => {
        const colors = [
          "#31d7ff",
          "#3478ff",
          "#a855f7",
          "#d8fbff",
        ];

        /*
         * Reduced from 22 particles
         * to 10.
         *
         * Visually there is still
         * plenty of energy inside
         * the core without animating
         * 22 individual objects.
         */
        return Array.from(
          {
            length: 10,
          },
          (_, index) => {
            const angle =
              (index / 10) *
              Math.PI *
              2;

            const radius =
              0.42 +
              (index % 4) *
                0.075;

            const verticalOffset =
              Math.sin(
                index * 1.8,
              ) * 0.32;

            return {
              position: [
                Math.cos(
                  angle,
                ) * radius,

                verticalOffset,

                Math.sin(
                  angle,
                ) * radius,
              ],

              scale:
                0.018 +
                (index % 3) *
                  0.005,

              speed:
                0.18 +
                (index % 5) *
                  0.035,

              offset:
                index * 0.8,

              color:
                colors[
                  index %
                    colors.length
                ],
            };
          },
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

    const group =
      groupRef.current;

    if (group) {
      group.rotation.y +=
        delta *
        (0.09 +
          strength * 0.09);

      group.rotation.x =
        Math.sin(
          time * 0.3,
        ) * 0.055;
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

        const angle =
          time *
            data.speed +
          data.offset;

        /*
         * Radius is calculated
         * from our predefined
         * particle position.
         */
        const baseRadius =
          Math.hypot(
            data.position[0],
            data.position[2],
          );

        const radius =
          baseRadius +
          Math.sin(
            time * 1.1 +
              data.offset,
          ) *
            0.02;

        particle.position.x =
          Math.cos(angle) *
          radius;

        particle.position.z =
          Math.sin(angle) *
          radius;

        particle.position.y =
          data.position[1] +
          Math.sin(
            time * 1.5 +
              data.offset,
          ) *
            0.035;

        const pulse =
          1 +
          Math.sin(
            time * 2.4 +
              data.offset,
          ) *
            0.18 +
          strength * 0.12;

        particle.scale.setScalar(
          data.scale * pulse,
        );
      },
    );
  });

  return (
    <group ref={groupRef}>
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
            position={
              particle.position
            }
            scale={
              particle.scale
            }
            renderOrder={4}
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
              opacity={0.8}
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

export default function EnergyCore({
  interaction,
}: EnergyCoreProps) {
  const coreRef =
    useRef<THREE.Group>(null);

  const shellRef =
    useRef<THREE.Mesh>(null);

  const crystalRef =
    useRef<THREE.Mesh>(null);

  const plasmaRef =
    useRef<THREE.Mesh>(null);

  const nucleusRef =
    useRef<THREE.Mesh>(null);

  const haloRef =
    useRef<THREE.Mesh>(null);

  const outerHaloRef =
    useRef<THREE.Mesh>(null);

  const energyRingRef =
    useRef<THREE.Mesh>(null);

  const secondaryRingRef =
    useRef<THREE.Mesh>(null);

  const cyanLightRef =
    useRef<THREE.PointLight>(
      null,
    );

  const purpleLightRef =
    useRef<THREE.PointLight>(
      null,
    );

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

    /*
     * Entire core interaction.
     */
    if (coreRef.current) {
      const targetScale =
        1 +
        strength * 0.018 +
        velocity * 0.012;

      const scale =
        THREE.MathUtils.damp(
          coreRef.current
            .scale.x,
          targetScale,
          3.5,
          delta,
        );

      coreRef.current.scale.setScalar(
        scale,
      );

      coreRef.current.rotation.x =
        THREE.MathUtils.damp(
          coreRef.current
            .rotation.x,
          interaction.pointerY
            .current *
            strength *
            0.025,
          3.5,
          delta,
        );

      coreRef.current.rotation.z =
        THREE.MathUtils.damp(
          coreRef.current
            .rotation.z,
          -interaction.pointerX
            .current *
            strength *
            0.025,
          3.5,
          delta,
        );
    }

    /*
     * Glass shell.
     *
     * Only transform the mesh.
     * We no longer modify the
     * transmission shader itself
     * every frame.
     */
    if (shellRef.current) {
      const shellPulse =
        1 +
        Math.sin(
          time * 1.25,
        ) *
          0.008 +
        strength * 0.005;

      shellRef.current.scale.setScalar(
        shellPulse,
      );

      shellRef.current.rotation.y +=
        delta * 0.018;
    }

    /*
     * Outer crystal.
     */
    if (crystalRef.current) {
      crystalRef.current.rotation.x +=
        delta *
        (0.055 +
          strength * 0.05);

      crystalRef.current.rotation.y -=
        delta *
        (0.075 +
          strength * 0.065);

      const crystalPulse =
        1 +
        Math.sin(
          time * 1.5,
        ) *
          0.018 +
        strength * 0.015;

      crystalRef.current.scale.setScalar(
        crystalPulse,
      );
    }

    /*
     * Plasma structure.
     */
    if (plasmaRef.current) {
      plasmaRef.current.rotation.x -=
        delta *
        (0.08 +
          strength * 0.08);

      plasmaRef.current.rotation.y +=
        delta *
        (0.1 +
          strength * 0.1);

      const plasmaPulse =
        1 +
        Math.sin(
          time * 1.9,
        ) *
          0.03 +
        strength * 0.035 +
        velocity * 0.015;

      plasmaRef.current.scale.setScalar(
        plasmaPulse,
      );
    }

    /*
     * Reactor nucleus.
     */
    if (nucleusRef.current) {
      const nucleusPulse =
        1 +
        Math.sin(
          time * 2.6,
        ) *
          0.065 +
        strength * 0.045;

      nucleusRef.current.scale.setScalar(
        nucleusPulse,
      );
    }

    /*
     * Inner halo.
     */
    if (haloRef.current) {
      const haloPulse =
        1 +
        Math.sin(
          time * 1.7,
        ) *
          0.045 +
        strength * 0.045;

      haloRef.current.scale.setScalar(
        haloPulse,
      );
    }

    /*
     * Outer aura.
     */
    if (
      outerHaloRef.current
    ) {
      const outerPulse =
        1 +
        Math.sin(
          time * 1.1,
        ) *
          0.025 +
        strength * 0.025;

      outerHaloRef.current.scale.setScalar(
        outerPulse,
      );
    }

    /*
     * Internal rings.
     */
    if (
      energyRingRef.current
    ) {
      energyRingRef.current.rotation.z +=
        delta *
        (0.24 +
          strength * 0.16);
    }

    if (
      secondaryRingRef.current
    ) {
      secondaryRingRef.current.rotation.z -=
        delta *
        (0.17 +
          strength * 0.14);
    }

    /*
     * Cyan interaction light.
     */
    if (
      cyanLightRef.current
    ) {
      cyanLightRef.current.position.x =
        interaction.pointerX
          .current * 0.32;

      cyanLightRef.current.position.y =
        interaction.pointerY
          .current * 0.25;

      cyanLightRef.current.intensity =
        THREE.MathUtils.damp(
          cyanLightRef.current
            .intensity,
          3.4 +
            strength * 1.5,
          4,
          delta,
        );
    }

    /*
     * Purple light.
     *
     * Keep the movement subtle
     * to reduce lighting changes.
     */
    if (
      purpleLightRef.current
    ) {
      purpleLightRef.current.position.x =
        -0.55 -
        interaction.pointerX
          .current *
          0.18;

      purpleLightRef.current.position.y =
        -0.25 -
        interaction.pointerY
          .current *
          0.12;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer energy aura */}
      <mesh
        ref={
          outerHaloRef
        }
        renderOrder={0}
      >
        <sphereGeometry
          args={[
            1.08,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color="#246bff"
          transparent
          opacity={0.022}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          side={
            THREE.BackSide
          }
          toneMapped={false}
        />
      </mesh>

      {/* Interior cyan halo */}
      <mesh
        ref={haloRef}
        scale={0.72}
        renderOrder={1}
      >
        <sphereGeometry
          args={[
            0.88,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.065}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          side={
            THREE.BackSide
          }
          toneMapped={false}
        />
      </mesh>

      {/* Rotating crystal structure */}
      <mesh
        ref={
          crystalRef
        }
        scale={0.76}
        renderOrder={2}
      >
        <icosahedronGeometry
          args={[
            0.79,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#79d9ff"
          emissive="#125fe2"
          emissiveIntensity={
            0.65
          }
          metalness={0.18}
          roughness={0.22}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Inner plasma crystal */}
      <mesh
        ref={plasmaRef}
        scale={0.58}
        renderOrder={3}
      >
        <icosahedronGeometry
          args={[
            0.74,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#123b91"
          emissive="#156dff"
          emissiveIntensity={
            1.35
          }
          transparent
          opacity={0.24}
          roughness={0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Cyan energy ring */}
      <mesh
        ref={
          energyRingRef
        }
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        renderOrder={4}
      >
        <torusGeometry
          args={[
            0.55,
            0.018,
            6,
            48,
          ]}
        />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.68}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Purple energy ring */}
      <mesh
        ref={
          secondaryRingRef
        }
        rotation={[
          Math.PI / 2.9,
          Math.PI / 5,
          Math.PI / 3,
        ]}
        renderOrder={4}
      >
        <torusGeometry
          args={[
            0.49,
            0.014,
            6,
            48,
          ]}
        />

        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.58}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Core sparks */}
      <CoreParticles
        interaction={
          interaction
        }
      />

      {/* Branded atom logo */}
      <group scale={1.08}>
        <LogoAtom
          interaction={
            interaction
          }
        />
      </group>

      {/* Reactor nucleus */}
      <mesh
        ref={
          nucleusRef
        }
        scale={0.42}
        renderOrder={5}
      >
        <icosahedronGeometry
          args={[
            0.48,
            1,
          ]}
        />

        <meshBasicMaterial
          color="#effeff"
          transparent
          opacity={0.82}
          toneMapped={false}
        />
      </mesh>

      {/* Glass shell */}
      <mesh
        ref={shellRef}
        renderOrder={8}
      >
        <icosahedronGeometry
          args={[
            1.02,
            2,
          ]}
        />

        <MeshTransmissionMaterial
          color="#d6f8ff"
          transmission={1}
          thickness={0.1}
          roughness={0.06}
          chromaticAberration={
            0.006
          }
          distortion={0.008}
          distortionScale={
            0.018
          }
          ior={1.06}
          clearcoat={0.6}
          clearcoatRoughness={
            0.08
          }
          samples={1}
          resolution={128}
          depthWrite={false}
        />
      </mesh>

      {/* Crystal wireframe */}
      <mesh
        scale={1.006}
        renderOrder={9}
      >
        <icosahedronGeometry
          args={[
            1.02,
            1,
          ]}
        />

        <meshBasicMaterial
          color="#9feaff"
          wireframe
          transparent
          opacity={0.04}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Primary core light */}
      <pointLight
        ref={
          cyanLightRef
        }
        color="#31d7ff"
        intensity={3.4}
        distance={3.6}
        decay={2}
      />

      {/* Purple fill */}
      <pointLight
        ref={
          purpleLightRef
        }
        position={[
          -0.55,
          -0.25,
          0.85,
        ]}
        color="#a855f7"
        intensity={1.75}
        distance={3}
        decay={2}
      />

      {/* Static white highlight */}
      <pointLight
        position={[
          0.45,
          0.55,
          0.65,
        ]}
        color="#e7fcff"
        intensity={0.8}
        distance={2.4}
        decay={2}
      />
    </group>
  );
}