"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import LogoAtom from "./LogoAtom";
import type { AtomInteraction } from "./types";

type EnergyCoreProps = {
  interaction: AtomInteraction;
};

type CoreParticle = {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  color: string;
};

function CoreParticles({
  interaction,
}: EnergyCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleRefs = useRef<Array<THREE.Mesh | null>>([]);

  const particles = useMemo<CoreParticle[]>(() => {
    const colors = [
      "#31d7ff",
      "#3478ff",
      "#a855f7",
      "#d8fbff",
    ];

    return Array.from({ length: 22 }, (_, index) => {
      const angle = (index / 22) * Math.PI * 2;
      const radius = 0.42 + (index % 5) * 0.07;
      const verticalOffset =
        Math.sin(index * 1.8) * 0.35;

      return {
        position: [
          Math.cos(angle) * radius,
          verticalOffset,
          Math.sin(angle) * radius,
        ],
        scale: 0.014 + (index % 4) * 0.005,
        speed: 0.18 + (index % 6) * 0.035,
        offset: index * 0.7,
        color: colors[index % colors.length],
      };
    });
  }, []);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        delta * (0.11 + strength * 0.13);

      groupRef.current.rotation.x =
        Math.sin(time * 0.35) * 0.08;
    }

    particleRefs.current.forEach((particle, index) => {
      if (!particle) return;

      const data = particles[index];
      const angle =
        time * data.speed +
        data.offset;

      const radius =
        Math.sqrt(
          data.position[0] * data.position[0] +
            data.position[2] * data.position[2],
        ) +
        Math.sin(time * 1.4 + data.offset) * 0.025;

      particle.position.x =
        Math.cos(angle) * radius;

      particle.position.z =
        Math.sin(angle) * radius;

      particle.position.y =
        data.position[1] +
        Math.sin(time * 1.8 + data.offset) * 0.045;

      const pulse =
        1 +
        Math.sin(time * 3 + data.offset) * 0.25 +
        strength * 0.2;

      particle.scale.setScalar(
        data.scale * pulse,
      );
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            particleRefs.current[index] = mesh;
          }}
          position={particle.position}
          scale={particle.scale}
          renderOrder={4}
        >
          <sphereGeometry args={[1, 8, 8]} />

          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function EnergyCore({
  interaction,
}: EnergyCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const energyRingRef = useRef<THREE.Mesh>(null);
  const secondaryRingRef = useRef<THREE.Mesh>(null);

  const transmissionRef = useRef<any>(null);

  const cyanLightRef =
    useRef<THREE.PointLight>(null);

  const purpleLightRef =
    useRef<THREE.PointLight>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();
    const strength = interaction.strength.current;
    const velocity = interaction.velocity.current;

    if (coreRef.current) {
      const targetScale =
        1 +
        strength * 0.025 +
        velocity * 0.018;

      const scale = THREE.MathUtils.damp(
        coreRef.current.scale.x,
        targetScale,
        4,
        delta,
      );

      coreRef.current.scale.setScalar(scale);

      coreRef.current.rotation.x =
        THREE.MathUtils.damp(
          coreRef.current.rotation.x,
          interaction.pointerY.current *
            strength *
            0.035,
          4,
          delta,
        );

      coreRef.current.rotation.z =
        THREE.MathUtils.damp(
          coreRef.current.rotation.z,
          -interaction.pointerX.current *
            strength *
            0.035,
          4,
          delta,
        );
    }

    if (shellRef.current) {
      const shellPulse =
        1 +
        Math.sin(time * 1.5) * 0.012 +
        strength * 0.008;

      shellRef.current.scale.setScalar(shellPulse);
      shellRef.current.rotation.y +=
        delta * (0.025 + strength * 0.035);
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.x +=
        delta * (0.08 + strength * 0.09);

      crystalRef.current.rotation.y -=
        delta * (0.12 + strength * 0.13);

      const crystalPulse =
        1 +
        Math.sin(time * 1.9) * 0.025 +
        strength * 0.025;

      crystalRef.current.scale.setScalar(
        crystalPulse,
      );
    }

    if (plasmaRef.current) {
      plasmaRef.current.rotation.x -=
        delta * (0.12 + strength * 0.15);

      plasmaRef.current.rotation.y +=
        delta * (0.17 + strength * 0.2);

      const plasmaPulse =
        1 +
        Math.sin(time * 2.4) * 0.045 +
        strength * 0.055 +
        velocity * 0.025;

      plasmaRef.current.scale.setScalar(
        plasmaPulse,
      );
    }

    if (nucleusRef.current) {
      const nucleusPulse =
        1 +
        Math.sin(time * 3.2) * 0.09 +
        strength * 0.07 +
        velocity * 0.035;

      nucleusRef.current.scale.setScalar(
        nucleusPulse,
      );
    }

    if (haloRef.current) {
      const haloPulse =
        1 +
        Math.sin(time * 2.1) * 0.065 +
        strength * 0.08;

      haloRef.current.scale.setScalar(
        haloPulse,
      );
    }

    if (outerHaloRef.current) {
      const outerPulse =
        1 +
        Math.sin(time * 1.35) * 0.035 +
        strength * 0.045;

      outerHaloRef.current.scale.setScalar(
        outerPulse,
      );
    }

    if (energyRingRef.current) {
      energyRingRef.current.rotation.z +=
        delta * (0.32 + strength * 0.3);
    }

    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.z -=
        delta * (0.22 + strength * 0.24);
    }

    if (transmissionRef.current) {
      transmissionRef.current.distortion =
        THREE.MathUtils.damp(
          transmissionRef.current.distortion ?? 0.015,
          0.015 +
            strength * 0.055 +
            velocity * 0.025,
          4,
          delta,
        );

      transmissionRef.current.chromaticAberration =
        THREE.MathUtils.damp(
          transmissionRef.current
            .chromaticAberration ?? 0.012,
          0.012 + strength * 0.022,
          4,
          delta,
        );

      transmissionRef.current.thickness =
        THREE.MathUtils.damp(
          transmissionRef.current.thickness ?? 0.14,
          0.14 + strength * 0.045,
          4,
          delta,
        );
    }

    if (cyanLightRef.current) {
      cyanLightRef.current.position.x =
        interaction.pointerX.current * 0.45;

      cyanLightRef.current.position.y =
        interaction.pointerY.current * 0.35;

      cyanLightRef.current.intensity =
        THREE.MathUtils.damp(
          cyanLightRef.current.intensity,
          4.8 +
            strength * 3.4 +
            velocity * 1.8,
          5,
          delta,
        );
    }

    if (purpleLightRef.current) {
      purpleLightRef.current.position.x =
        -0.55 -
        interaction.pointerX.current * 0.3;

      purpleLightRef.current.position.y =
        -0.25 -
        interaction.pointerY.current * 0.2;

      purpleLightRef.current.intensity =
        THREE.MathUtils.damp(
          purpleLightRef.current.intensity,
          2.7 + strength * 2.2,
          5,
          delta,
        );
    }
  });

  return (
    <group ref={coreRef}>
      {/* Controlled outer energy aura */}
      <mesh
        ref={outerHaloRef}
        renderOrder={0}
      >
        <sphereGeometry args={[1.08, 32, 32]} />

        <meshBasicMaterial
          color="#246bff"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* Interior cyan halo */}
      <mesh
        ref={haloRef}
        scale={0.72}
        renderOrder={1}
      >
        <sphereGeometry args={[0.88, 32, 32]} />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.075}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* Rotating crystalline structure */}
      <mesh
        ref={crystalRef}
        scale={0.76}
        renderOrder={2}
      >
        <icosahedronGeometry args={[0.79, 2]} />

        <meshPhysicalMaterial
          color="#79d9ff"
          emissive="#125fe2"
          emissiveIntensity={0.55}
          metalness={0.15}
          roughness={0.18}
          transparent
          opacity={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Inner plasma crystal */}
      <mesh
        ref={plasmaRef}
        scale={0.58}
        renderOrder={3}
      >
        <icosahedronGeometry args={[0.74, 3]} />

        <meshStandardMaterial
          color="#123b91"
          emissive="#156dff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.22}
          roughness={0.22}
          depthWrite={false}
        />
      </mesh>

      {/* Horizontal internal energy ring */}
      <mesh
        ref={energyRingRef}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={4}
      >
        <torusGeometry args={[0.55, 0.018, 10, 96]} />

        <meshBasicMaterial
          color="#31d7ff"
          transparent
          opacity={0.72}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Angled purple energy ring */}
      <mesh
        ref={secondaryRingRef}
        rotation={[
          Math.PI / 2.9,
          Math.PI / 5,
          Math.PI / 3,
        ]}
        renderOrder={4}
      >
        <torusGeometry args={[0.49, 0.014, 10, 96]} />

        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.62}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Core sparks */}
      <CoreParticles interaction={interaction} />

      {/* Branded geometric logo */}
      <group scale={1.08}>
        <LogoAtom interaction={interaction} />
      </group>

      {/* Bright reactor nucleus behind the logo */}
      <mesh
        ref={nucleusRef}
        scale={0.42}
        renderOrder={5}
      >
        <icosahedronGeometry args={[0.48, 3]} />

        <meshStandardMaterial
          color="#effeff"
          emissive="#31d7ff"
          emissiveIntensity={5.8}
          roughness={0.05}
          metalness={0.08}
          transparent
          opacity={0.78}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Crystal glass shell */}
      <mesh
        ref={shellRef}
        renderOrder={8}
      >
        <icosahedronGeometry args={[1.02, 5]} />

        <MeshTransmissionMaterial
          ref={transmissionRef}
          color="#d6f8ff"
          transmission={1}
          thickness={0.14}
          roughness={0.035}
          chromaticAberration={0.012}
          anisotropicBlur={0.025}
          distortion={0.015}
          distortionScale={0.035}
          temporalDistortion={0.006}
          ior={1.08}
          clearcoat={1}
          clearcoatRoughness={0.035}
          backside
          samples={3}
          resolution={256}
          depthWrite={false}
        />
      </mesh>

      {/* Fine crystal edge structure */}
      <mesh
        scale={1.006}
        renderOrder={9}
      >
        <icosahedronGeometry args={[1.02, 2]} />

        <meshBasicMaterial
          color="#9feaff"
          wireframe
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        ref={cyanLightRef}
        color="#31d7ff"
        intensity={4.8}
        distance={4.2}
        decay={2}
      />

      <pointLight
        ref={purpleLightRef}
        position={[-0.55, -0.25, 0.85]}
        color="#a855f7"
        intensity={2.7}
        distance={3.5}
        decay={2}
      />

      <pointLight
        position={[0.45, 0.55, 0.65]}
        color="#e7fcff"
        intensity={1.5}
        distance={2.8}
        decay={2}
      />
    </group>
  );
}