"use client";

import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { motion, useInView } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  position: [number, number, number];
  size: [number, number, number];
  accent: string;
  featured?: boolean;
};

type BackgroundBuilding = {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  accent: string;
};

const projects: Project[] = [
  {
    id: "djc-solutions",
    number: "01",
    name: "DJC Solutions",
    category: "Web Design & Development",
    description:
      "A modern digital presence engineered for clarity, trust, and growth.",
    url: "https://www.djcsolutions.ca",
    position: [0, 2.05, -0.2],
    size: [1.82, 4.1, 1.82],
    accent: "#8b6cff",
    featured: true,
  },
  {
    id: "project-02",
    number: "02",
    name: "Future Project",
    category: "Coming Soon",
    description: "A new digital experience is currently entering orbit.",
    position: [-2.7, 1.25, 0.55],
    size: [1.35, 2.5, 1.35],
    accent: "#21d7ff",
  },
  {
    id: "project-03",
    number: "03",
    name: "Future Project",
    category: "Coming Soon",
    description: "Reserved for an upcoming website or digital platform.",
    position: [2.75, 1.45, 0.5],
    size: [1.4, 2.9, 1.4],
    accent: "#5794ff",
  },
  {
    id: "project-04",
    number: "04",
    name: "Future Project",
    category: "Coming Soon",
    description: "A future client project will occupy this sector.",
    position: [-4.1, 0.92, -0.75],
    size: [1.08, 1.84, 1.08],
    accent: "#356cff",
  },
  {
    id: "project-05",
    number: "05",
    name: "Future Project",
    category: "Coming Soon",
    description: "Additional work will be transmitted here soon.",
    position: [4.15, 1.02, -0.8],
    size: [1.12, 2.04, 1.12],
    accent: "#bd4fff",
  },
];

const backgroundBuildings: BackgroundBuilding[] = [
  { position: [-5.2, 0.55, -0.1], width: 0.58, height: 1.1, depth: 0.58, accent: "#1a67ff" },
  { position: [-4.8, 0.95, -2.2], width: 0.72, height: 1.9, depth: 0.72, accent: "#205eff" },
  { position: [-3.8, 0.7, -2.8], width: 0.62, height: 1.4, depth: 0.62, accent: "#275ecf" },
  { position: [-2.8, 1.05, -3.15], width: 0.7, height: 2.1, depth: 0.7, accent: "#2f66d4" },
  { position: [-1.7, 0.78, -3.45], width: 0.58, height: 1.56, depth: 0.58, accent: "#4559c5" },
  { position: [-0.75, 1.15, -3.75], width: 0.68, height: 2.3, depth: 0.68, accent: "#5752d6" },
  { position: [0.8, 1.05, -3.75], width: 0.66, height: 2.1, depth: 0.66, accent: "#6848db" },
  { position: [1.75, 0.72, -3.4], width: 0.58, height: 1.44, depth: 0.58, accent: "#7043d8" },
  { position: [2.85, 1.02, -3.05], width: 0.7, height: 2.04, depth: 0.7, accent: "#7b3ee0" },
  { position: [3.9, 0.78, -2.6], width: 0.62, height: 1.56, depth: 0.62, accent: "#8c3ee4" },
  { position: [4.85, 1.02, -2], width: 0.72, height: 2.04, depth: 0.72, accent: "#9b3ce4" },
  { position: [5.25, 0.58, 0.05], width: 0.58, height: 1.16, depth: 0.58, accent: "#8144ec" },
];

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.34 + Math.sin(t * 0.12) * 0.06,
      2.6,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      4.7 + pointer.y * 0.18 + Math.sin(t * 0.2) * 0.05,
      2.6,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      12.75 + Math.cos(t * 0.15) * 0.1,
      2.6,
      delta,
    );
    camera.lookAt(0, 0.75, -0.35);
  });

  return null;
}

function NeonStrip({
  position,
  scale,
  color,
  active,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  active: boolean;
}) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? 0.95 : 0.42}
        toneMapped={false}
      />
    </mesh>
  );
}

function TowerWindows({
  width,
  height,
  depth,
  accent,
  active,
}: {
  width: number;
  height: number;
  depth: number;
  accent: string;
  active: boolean;
}) {
  const windows = useMemo(() => {
    const rows = Math.max(3, Math.floor(height * 2.05));
    return Array.from({ length: rows * 3 }, (_, index) => {
      const row = Math.floor(index / 3);
      const column = (index % 3) - 1;
      return {
        key: `${row}-${column}`,
        position: [
          column * width * 0.22,
          -height / 2 + 0.42 + row * 0.4,
          depth / 2 + 0.025,
        ] as [number, number, number],
        opacity: index % 5 === 0 ? 0.22 : 0.52,
      };
    });
  }, [depth, height, width]);

  return (
    <>
      {windows.map((item) => (
        <mesh key={item.key} position={item.position}>
          <planeGeometry args={[width * 0.115, 0.105]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={active ? Math.min(item.opacity + 0.32, 0.9) : item.opacity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function GlassFacade({
  width,
  height,
  depth,
  accent,
  active,
}: {
  width: number;
  height: number;
  depth: number;
  accent: string;
  active: boolean;
}) {
  return (
    <mesh position={[0, 0, depth / 2 + 0.032]}>
      <planeGeometry args={[width * 0.76, height * 0.82]} />
      <meshPhysicalMaterial
        color="#07142c"
        transmission={0.18}
        transparent
        opacity={0.34}
        roughness={0.12}
        metalness={0.52}
        clearcoat={1}
        clearcoatRoughness={0.08}
        emissive={accent}
        emissiveIntensity={active ? 0.12 : 0.04}
      />
    </mesh>
  );
}

function EnergyCrown({
  width,
  height,
  accent,
  active,
}: {
  width: number;
  height: number;
  accent: string;
  active: boolean;
}) {
  const crown = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (crown.current) crown.current.rotation.y += delta * (active ? 0.55 : 0.18);
  });

  return (
    <group ref={crown} position={[0, height / 2 + 0.34, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[width * 0.46, 0.021, 10, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={active ? 0.9 : 0.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[width * 0.33, 0.011, 8, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={active ? 0.62 : 0.18} toneMapped={false} />
      </mesh>
      <pointLight color={accent} intensity={active ? 3.8 : 1.2} distance={3.2} />
    </group>
  );
}

function Antenna({ height, accent }: { height: number; accent: string }) {
  const beacon = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!beacon.current) return;
    const material = beacon.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 3.2) * 0.3;
  });

  return (
    <group position={[0, height / 2 + 0.12, 0]}>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.016, 0.035, 0.96, 12]} />
        <meshStandardMaterial
          color="#b9c9ff"
          emissive={accent}
          emissiveIntensity={0.7}
          metalness={0.95}
          roughness={0.16}
        />
      </mesh>
      <mesh ref={beacon} position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshBasicMaterial color={accent} transparent opacity={0.8} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ProjectTower({
  project,
  activeProject,
  hoveredProject,
  setActiveProject,
  setHoveredProject,
}: {
  project: Project;
  activeProject: string;
  hoveredProject: string | null;
  setActiveProject: (id: string) => void;
  setHoveredProject: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const active = activeProject === project.id || hoveredProject === project.id;
  const showLabel = activeProject === project.id || hoveredProject === project.id;
  const [width, height, depth] = project.size;

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    const targetScale = active ? 1.035 : 1;
    group.current.scale.x = THREE.MathUtils.damp(group.current.scale.x, targetScale, 5, delta);
    group.current.scale.y = THREE.MathUtils.damp(group.current.scale.y, targetScale, 5, delta);
    group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, targetScale, 5, delta);
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      project.position[1] + (active ? 0.06 : 0),
      5,
      delta,
    );
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18 + project.position[0]) * 0.008;
    const material = core.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = THREE.MathUtils.damp(
      material.emissiveIntensity,
      active ? 0.42 : 0.12,
      5,
      delta,
    );
  });

  const selectProject = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setActiveProject(project.id);
  };

  return (
    <group
      ref={group}
      position={project.position}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHoveredProject(project.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHoveredProject(null);
        document.body.style.cursor = "default";
      }}
      onClick={selectProject}
    >
      <mesh ref={core} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={project.featured ? "#0d1028" : "#07101f"}
          emissive={project.accent}
          emissiveIntensity={0.12}
          metalness={0.94}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, height * 0.18, 0]} scale={[0.84, 0.32, 0.84]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#111c3d"
          emissive={project.accent}
          emissiveIntensity={active ? 0.32 : 0.08}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, height * 0.38, 0]} scale={[0.66, 0.15, 0.66]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#1c2853"
          emissive={project.accent}
          emissiveIntensity={active ? 0.45 : 0.12}
          metalness={0.9}
          roughness={0.16}
        />
      </mesh>

      <mesh position={[0, -height * 0.31, 0]} scale={[1.08, 0.07, 1.08]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0b1530"
          emissive={project.accent}
          emissiveIntensity={active ? 0.2 : 0.05}
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      <GlassFacade width={width} height={height} depth={depth} accent={project.accent} active={active} />
      <TowerWindows width={width} height={height} depth={depth} accent={project.accent} active={active} />

      <NeonStrip
        position={[-width / 2 - 0.012, 0, depth / 2 + 0.02]}
        scale={[0.022, height * 0.9, 0.022]}
        color={project.accent}
        active={active}
      />
      <NeonStrip
        position={[width / 2 + 0.012, 0, depth / 2 + 0.02]}
        scale={[0.022, height * 0.9, 0.022]}
        color={project.accent}
        active={active}
      />

      <mesh position={[0, height / 2 + 0.055, 0]}>
        <boxGeometry args={[width * 0.7, 0.1, depth * 0.7]} />
        <meshBasicMaterial color={project.accent} transparent opacity={active ? 0.82 : 0.5} toneMapped={false} />
      </mesh>

      <mesh position={[0, -height / 2 + 0.04, 0]}>
        <boxGeometry args={[width * 1.16, 0.08, depth * 1.16]} />
        <meshBasicMaterial color={project.accent} transparent opacity={active ? 0.68 : 0.24} toneMapped={false} />
      </mesh>

      <EnergyCrown width={width} height={height} accent={project.accent} active={active} />
      {project.featured && <Antenna height={height} accent={project.accent} />}

      <pointLight
        position={[0, height / 2, 1.25]}
        color={project.accent}
        intensity={active ? 3.4 : 0.9}
        distance={4.6}
      />

      <Html
        center
        distanceFactor={8}
        position={[0, height / 2 + (project.featured ? 1.48 : 1.02), 0]}
        style={{
          pointerEvents: "none",
          opacity: showLabel ? 1 : 0,
          transform: `scale(${showLabel ? 1 : 0.92})`,
          transition: "opacity 220ms ease, transform 220ms ease",
        }}
      >
        <div className="relative min-w-[150px] whitespace-nowrap rounded-xl border border-cyan-300/20 bg-[#03091c]/85 px-4 py-3 text-center shadow-[0_0_30px_rgba(50,170,255,0.14)] backdrop-blur-xl">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-cyan-300/70">
            Sector {project.number}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            {project.name}
          </p>
        </div>
      </Html>
    </group>
  );
}

function BackgroundTower({ building }: { building: BackgroundBuilding }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y =
      building.position[1] + Math.sin(state.clock.elapsedTime * 0.22 + building.position[0]) * 0.01;
  });

  return (
    <group ref={group} position={building.position}>
      <mesh>
        <boxGeometry args={[building.width, building.height, building.depth]} />
        <meshStandardMaterial
          color="#07101f"
          emissive={building.accent}
          emissiveIntensity={0.08}
          metalness={0.9}
          roughness={0.26}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, building.height / 2 + 0.03, 0]}>
        <boxGeometry args={[building.width * 0.66, 0.055, building.depth * 0.66]} />
        <meshBasicMaterial color={building.accent} transparent opacity={0.34} toneMapped={false} />
      </mesh>
      <NeonStrip
        position={[0, 0, building.depth / 2 + 0.012]}
        scale={[building.width * 0.045, building.height * 0.76, 0.016]}
        color={building.accent}
        active={false}
      />
    </group>
  );
}

function EnergyBridge({
  start,
  end,
  color,
  offset = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  offset?: number;
}) {
  const pulse = useRef<THREE.Mesh>(null);
  const midpoint = useMemo(
    () => new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2),
    [start, end],
  );
  const direction = useMemo(
    () => new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]),
    [start, end],
  );
  const length = direction.length();
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction.clone().normalize()),
    [direction],
  );

  useFrame((state) => {
    if (!pulse.current) return;
    const progress = (state.clock.elapsedTime * 0.2 + offset) % 1;
    pulse.current.position.set(
      THREE.MathUtils.lerp(start[0], end[0], progress),
      THREE.MathUtils.lerp(start[1], end[1], progress),
      THREE.MathUtils.lerp(start[2], end[2], progress),
    );
  });

  return (
    <>
      <mesh position={midpoint} quaternion={quaternion}>
        <boxGeometry args={[length, 0.02, 0.035]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} toneMapped={false} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </>
  );
}

function HolographicPlatform() {
  const rings = useRef<THREE.Group>(null);
  const floatingRing = useRef<THREE.Mesh>(null);
  const scanner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (rings.current) rings.current.rotation.z += delta * 0.06;
    if (floatingRing.current) {
      floatingRing.current.rotation.z -= delta * 0.09;
      floatingRing.current.position.y = 0.24 + Math.sin(state.clock.elapsedTime * 0.8) * 0.018;
    }
    if (scanner.current) {
      scanner.current.rotation.z -= delta * 0.2;
      const material = scanner.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.045 + Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
    }
  });

  return (
    <group position={[0, -0.12, 0]}>
      <mesh receiveShadow position={[0, -0.16, 0]}>
        <cylinderGeometry args={[5.8, 6.2, 0.34, 96]} />
        <meshStandardMaterial
          color="#020611"
          emissive="#0d173b"
          emissiveIntensity={0.2}
          metalness={0.97}
          roughness={0.16}
        />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[5.25, 5.25, 0.08, 96]} />
        <MeshTransmissionMaterial
          color="#05152f"
          transmission={0.58}
          thickness={0.5}
          roughness={0.16}
          chromaticAberration={0.025}
          anisotropy={0.18}
          distortion={0.04}
          distortionScale={0.12}
          temporalDistortion={0.025}
        />
      </mesh>
      <group ref={rings} rotation={[-Math.PI / 2, 0, 0]}>
        {[2.2, 3.05, 3.9, 4.72, 5.36].map((radius, index) => (
          <mesh key={radius} position={[0, 0, 0.09 + index * 0.004]}>
            <ringGeometry args={[radius, radius + (index === 4 ? 0.036 : 0.012), 128]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#25d7ff" : "#7a5cff"}
              transparent
              opacity={index === 4 ? 0.36 : 0.14}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <mesh ref={floatingRing} position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.235, 128]} />
        <meshBasicMaterial color="#3bdcff" transparent opacity={0.2} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh ref={scanner} position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.9, 96, 0, Math.PI / 11]} />
        <meshBasicMaterial
          color="#32d6ff"
          transparent
          opacity={0.045}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function AerialTraffic({
  radius,
  height,
  speed,
  color,
  offset,
}: {
  radius: number;
  height: number;
  speed: number;
  color: string;
  offset: number;
}) {
  const traffic = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!traffic.current) return;
    const angle = state.clock.elapsedTime * speed + offset;
    traffic.current.position.set(
      Math.cos(angle) * radius,
      height + Math.sin(angle * 1.5) * 0.14,
      Math.sin(angle) * radius,
    );
    traffic.current.rotation.y = -angle;
  });

  return (
    <group ref={traffic}>
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.009, 0.009, 0.3, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.34} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CinematicEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.82} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur />
      <Vignette eskil={false} offset={0.14} darkness={0.7} />
    </EffectComposer>
  );
}

function CityScene({
  activeProject,
  hoveredProject,
  setActiveProject,
  setHoveredProject,
}: {
  activeProject: string;
  hoveredProject: string | null;
  setActiveProject: (id: string) => void;
  setHoveredProject: (id: string | null) => void;
}) {
  const city = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (city.current) city.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.018;
  });

  return (
    <>
      <color attach="background" args={["#01030a"]} />
      <fog attach="fog" args={["#01030a", 10, 25]} />
      <CameraRig />

      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#6b8cff", "#050712", 0.55]} />
      <directionalLight position={[4, 8, 6]} intensity={1.8} color="#bfd0ff" castShadow />
      <directionalLight position={[-5, 3, 4]} intensity={0.75} color="#2edcff" />
      <directionalLight position={[5, 3, -2]} intensity={0.65} color="#a45cff" />
      <pointLight position={[-5, 3.5, 3]} color="#176cff" intensity={4.5} distance={12} />
      <pointLight position={[5, 3.5, 1]} color="#a13dff" intensity={4} distance={12} />
      <pointLight position={[0, 6.5, -2]} color="#3de0ff" intensity={2.2} distance={10} />

      <Sparkles count={130} scale={[17, 10, 12]} size={1.2} speed={0.12} opacity={0.5} color="#b3d2ff" />
      <Sparkles count={50} scale={[11, 7, 9]} size={1.8} speed={0.18} opacity={0.34} color="#714dff" />

      <group ref={city} position={[0, -2.05, 0]} rotation={[-0.03, -0.015, 0]}>
        <HolographicPlatform />

        {backgroundBuildings.map((building, index) => (
          <BackgroundTower key={index} building={building} />
        ))}

        {projects.map((project) => (
          <ProjectTower
            key={project.id}
            project={project}
            activeProject={activeProject}
            hoveredProject={hoveredProject}
            setActiveProject={setActiveProject}
            setHoveredProject={setHoveredProject}
          />
        ))}

        <EnergyBridge start={[-1.85, 0.82, 0.34]} end={[-0.82, 1.05, 0.04]} color="#31dfff" />
        <EnergyBridge start={[0.82, 1.08, 0.04]} end={[1.95, 0.9, 0.28]} color="#678cff" offset={0.3} />
        <EnergyBridge start={[-3.45, 0.56, -0.5]} end={[-3.05, 0.76, 0.24]} color="#286cff" offset={0.5} />
        <EnergyBridge start={[3.08, 0.8, 0.22]} end={[3.55, 0.6, -0.52]} color="#b24cff" offset={0.7} />

        <AerialTraffic radius={3.25} height={3} speed={0.32} color="#33e2ff" offset={0} />
        <AerialTraffic radius={4.1} height={2.4} speed={-0.2} color="#9a62ff" offset={2.1} />
        <AerialTraffic radius={4.75} height={3.6} speed={0.14} color="#4e8fff" offset={4} />

        <Float speed={0.9} rotationIntensity={0.04} floatIntensity={0.1}>
          <mesh position={[0, 5.8, -3]}>
            <planeGeometry args={[12, 4]} />
            <meshBasicMaterial
              color="#17389f"
              transparent
              opacity={0.018}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Float>
      </group>

      <Environment preset="night" />
      <CinematicEffects />
    </>
  );
}

function ProjectInterface({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 22, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at 80% 0%, ${project.accent}20, transparent 42%)` }}
      />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300">
            Project {project.number}
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            {project.url ? "Online" : "Reserved"}
          </span>
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{project.name}</h3>
        <p className="mt-2 text-sm uppercase tracking-[0.16em] text-indigo-300/75">{project.category}</p>
        <p className="mt-5 max-w-md text-sm leading-7 text-white/60 sm:text-base">{project.description}</p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            ["Status", project.url ? "Deployed" : "Pending"],
            ["Sector", project.number],
            ["System", "Digital"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">{label}</p>
              <p className="mt-2 text-xs font-medium text-white/80">{value}</p>
            </div>
          ))}
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-medium text-cyan-100 transition duration-300 hover:border-cyan-200/65 hover:bg-cyan-300/20 hover:shadow-[0_0_35px_rgba(44,204,255,0.22)]"
          >
            Enter project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        ) : (
          <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            Awaiting transmission
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });
  const [activeProject, setActiveProject] = useState("djc-solutions");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === activeProject) ?? projects[0];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative isolate overflow-hidden bg-[#02030b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-500/8 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-violet-600/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(90,160,255,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, transparent, black 25%, black 80%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200/80">
              Digital City // Portfolio
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
            Explore our{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              digital universe
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            Each structure represents a digital experience engineered by The Digital Atom. Select a sector to inspect the project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/30 shadow-[0_40px_140px_rgba(17,51,144,0.18)] sm:mt-16 sm:rounded-[44px]"
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent" />
          <div className="pointer-events-none absolute left-6 top-6 z-10 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            City systems online
          </div>
          <div className="pointer-events-none absolute right-6 top-6 z-10 hidden font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 sm:block">
            Portfolio network active
          </div>

          <div className="h-[540px] w-full sm:h-[650px] lg:h-[760px]">
            <Canvas
              dpr={[1, 1.55]}
              shadows
              camera={{ position: [0, 4.7, 12.75], fov: 42, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              onPointerMissed={() => {
                setActiveProject("djc-solutions");
                setHoveredProject(null);
              }}
            >
              <Suspense fallback={null}>
                <CityScene
                  activeProject={activeProject}
                  hoveredProject={hoveredProject}
                  setActiveProject={setActiveProject}
                  setHoveredProject={setHoveredProject}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02030b] via-[#02030b]/65 to-transparent" />
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {projects.map((project) => {
              const selected = selectedProject.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project.id)}
                  className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                    selected
                      ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_35px_rgba(40,190,255,0.12)]"
                      : "border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className="absolute inset-x-4 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300/65">{project.number}</span>
                  <span className="mt-2 block truncate text-xs font-medium text-white/75">{project.name}</span>
                </button>
              );
            })}
          </div>
          <ProjectInterface project={selectedProject} />
        </div>
      </div>
    </section>
  );
}