"use client";

import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Html,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type ProjectVariant =
  | "split"
  | "spire"
  | "stepped"
  | "prism";

type ServiceIcon =
  | "design"
  | "development"
  | "branding"
  | "ai";

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  position: [number, number, number];
  size: [number, number, number];
  accent: string;
  variant: ProjectVariant;
};

type ServiceOrb = {
  id: string;
  number: string;
  name: string;
  accent: string;
  secondary: string;
  position: [number, number, number];
  icon: ServiceIcon;
  href: string;
};

type BackgroundStructure = {
  position: [number, number, number];
  size: [number, number, number];
  accent: string;
  tiered?: boolean;
};

const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    name: "Future Project",
    category: "Coming Soon",
    description:
      "A reserved sector for an upcoming website, platform, or digital experience.",
    position: [-2.65, 1.4, 0.45],
    size: [1.35, 2.8, 1.35],
    accent: "#22d9ff",
    variant: "split",
  },
  {
    id: "project-02",
    number: "02",
    name: "Future Project",
    category: "Coming Soon",
    description:
      "A new digital experience is currently being prepared for deployment.",
    position: [2.7, 1.55, 0.4],
    size: [1.42, 3.1, 1.42],
    accent: "#568fff",
    variant: "spire",
  },
  {
    id: "project-03",
    number: "03",
    name: "Future Project",
    category: "Coming Soon",
    description:
      "A future client project will occupy this connected city district.",
    position: [-4.2, 1.02, -0.9],
    size: [1.08, 2.04, 1.08],
    accent: "#3473ff",
    variant: "stepped",
  },
  {
    id: "project-04",
    number: "04",
    name: "Future Project",
    category: "Coming Soon",
    description:
      "Additional work will be transmitted into this sector soon.",
    position: [4.25, 1.12, -0.95],
    size: [1.15, 2.24, 1.15],
    accent: "#bf4fff",
    variant: "prism",
  },
];

const serviceOrbs: ServiceOrb[] = [
  {
    id: "web-design",
    number: "01",
    name: "Web Design",
    accent: "#22d9ff",
    secondary: "#438cff",
    position: [-4.25, 5.2, -0.65],
    icon: "design",
    href: "/services/web-design",
  },
  {
    id: "web-development",
    number: "02",
    name: "Web Development",
    accent: "#4e8fff",
    secondary: "#6f6bff",
    position: [-1.55, 6.45, -1.25],
    icon: "development",
    href: "/services/web-development",
  },
  {
    id: "branding",
    number: "03",
    name: "Branding",
    accent: "#8a63ff",
    secondary: "#bd50ff",
    position: [1.55, 6.45, -1.25],
    icon: "branding",
    href: "/services/branding",
  },
  {
    id: "ai-solutions",
    number: "04",
    name: "AI Solutions",
    accent: "#c350ff",
    secondary: "#ff5bd7",
    position: [4.25, 5.2, -0.65],
    icon: "ai",
    href: "/services/ai-solutions",
  },
];

const backgroundStructures: BackgroundStructure[] = [
  {
    position: [-5.1, 0.7, -2.15],
    size: [0.55, 1.4, 0.55],
    accent: "#1d64ff",
  },
  {
    position: [-4.2, 1, -2.95],
    size: [0.66, 2, 0.66],
    accent: "#2467ee",
    tiered: true,
  },
  {
    position: [-3.1, 0.68, -3.5],
    size: [0.52, 1.36, 0.52],
    accent: "#315bd8",
  },
  {
    position: [-2, 1, -3.85],
    size: [0.62, 2, 0.62],
    accent: "#3c58d0",
    tiered: true,
  },
  {
    position: [-0.95, 0.76, -4.05],
    size: [0.5, 1.52, 0.5],
    accent: "#5050d8",
  },
  {
    position: [0.95, 0.78, -4.05],
    size: [0.5, 1.56, 0.5],
    accent: "#6847df",
  },
  {
    position: [2, 1, -3.85],
    size: [0.62, 2, 0.62],
    accent: "#7443df",
    tiered: true,
  },
  {
    position: [3.1, 0.68, -3.5],
    size: [0.52, 1.36, 0.52],
    accent: "#823ee4",
  },
  {
    position: [4.2, 1, -2.95],
    size: [0.66, 2, 0.66],
    accent: "#963ee7",
    tiered: true,
  },
  {
    position: [5.1, 0.7, -2.15],
    size: [0.55, 1.4, 0.55],
    accent: "#a744ea",
  },
];

function CameraRig({
  activeProject,
  reducedMotion,
}: {
  activeProject: string;
  reducedMotion: boolean;
}) {
  const { camera, pointer } = useThree();

  const selectedProject =
    projects.find((project) => project.id === activeProject) ?? projects[0];

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    const ambientX = reducedMotion
      ? 0
      : Math.sin(elapsed * 0.1) * 0.07;

    const ambientY = reducedMotion
      ? 0
      : Math.sin(elapsed * 0.18) * 0.04;

    const ambientZ = reducedMotion
      ? 0
      : Math.cos(elapsed * 0.13) * 0.08;

    const targetX =
      selectedProject.position[0] * 0.025 +
      pointer.x * 0.24 +
      ambientX;

    const targetY =
      5.15 +
      pointer.y * 0.14 +
      ambientY;

    const targetZ = 14.3 + ambientZ;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      2.3,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      2.3,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      2.3,
      delta,
    );

    camera.lookAt(0, 1.7, -0.75);
  });

  return null;
}

function NeonBox({
  position,
  scale,
  color,
  opacity = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  opacity?: number;
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

function DarkMetalMaterial({
  accent,
  active,
  intensity = 0.1,
}: {
  accent: string;
  active: boolean;
  intensity?: number;
}) {
  return (
    <meshStandardMaterial
      color="#020711"
      emissive={accent}
      emissiveIntensity={
        active ? intensity * 2.5 : intensity
      }
      metalness={0.96}
      roughness={0.17}
    />
  );
}

function WindowGrid({
  width,
  height,
  depth,
  accent,
  active,
  columns = 3,
  yOffset = 0,
}: {
  width: number;
  height: number;
  depth: number;
  accent: string;
  active: boolean;
  columns?: number;
  yOffset?: number;
}) {
  const windows = useMemo(() => {
    const rows = Math.max(
      3,
      Math.floor(height * 1.85),
    );

    return Array.from({
      length: rows * columns,
    }).map((_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;

      const horizontal =
        (column - (columns - 1) / 2) *
        (width / Math.max(columns, 2)) *
        0.72;

      return {
        id: `${row}-${column}`,
        position: [
          horizontal,
          -height / 2 +
            0.42 +
            row * 0.42 +
            yOffset,
          depth / 2 + 0.035,
        ] as [number, number, number],
        opacity:
          (row + column) % 5 === 0
            ? 0.24
            : (row + column) % 3 === 0
              ? 0.48
              : 0.7,
      };
    });
  }, [
    width,
    height,
    depth,
    columns,
    yOffset,
  ]);

  return (
    <>
      {windows.map((buildingWindow) => (
        <mesh
          key={buildingWindow.id}
          position={buildingWindow.position}
        >
          <planeGeometry
            args={[
              (width / columns) * 0.38,
              0.105,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={
              active
                ? Math.min(
                    buildingWindow.opacity +
                      0.24,
                    1,
                  )
                : buildingWindow.opacity
            }
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function VerticalEdges({
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
  const opacity = active ? 0.95 : 0.38;

  return (
    <>
      {([-1, 1] as const).map((side) => (
        <NeonBox
          key={`front-${side}`}
          position={[
            side *
              (width / 2 + 0.014),
            0,
            depth / 2 + 0.024,
          ]}
          scale={[
            0.021,
            height * 0.88,
            0.021,
          ]}
          color={accent}
          opacity={opacity}
        />
      ))}

      {([-1, 1] as const).map((side) => (
        <NeonBox
          key={`back-${side}`}
          position={[
            side *
              (width / 2 + 0.014),
            0,
            -depth / 2 - 0.024,
          ]}
          scale={[
            0.018,
            height * 0.84,
            0.018,
          ]}
          color={accent}
          opacity={opacity * 0.38}
        />
      ))}
    </>
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
    if (!crown.current) {
      return;
    }

    crown.current.rotation.y +=
      delta * (active ? 0.42 : 0.13);
  });

  const outerRadius = width * 0.28;

  return (
    <group
      ref={crown}
      position={[
        0,
        height / 2 + 0.18,
        0,
      ]}
    >
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            outerRadius,
            0.015,
            8,
            56,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={active ? 0.88 : 0.35}
          toneMapped={false}
        />
      </mesh>

      <mesh
        position={[0, 0.055, 0]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            outerRadius * 0.63,
            0.007,
            8,
            40,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={active ? 0.56 : 0.14}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function CityNexus() {
  const core = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.position.y =
        1.65 +
        Math.sin(
          state.clock.elapsedTime * 0.45,
        ) *
          0.025;
    }

    if (crown.current) {
      crown.current.rotation.y +=
        delta * 0.16;

      crown.current.rotation.z -=
        delta * 0.08;
    }

    if (pulse.current) {
      const scale =
        1 +
        Math.sin(
          state.clock.elapsedTime * 1.4,
        ) *
          0.08;

      pulse.current.scale.setScalar(
        scale,
      );
    }
  });

  return (
    <group
      ref={core}
      position={[0, 1.65, -0.65]}
    >
      <mesh
        rotation={[0, Math.PI / 4, 0]}
      >
        <cylinderGeometry
          args={[
            0.48,
            0.75,
            3.3,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#030615"
          emissive="#7558ff"
          emissiveIntensity={0.12}
          metalness={0.97}
          roughness={0.14}
        />
      </mesh>

      <mesh
        position={[0, -1.25, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <cylinderGeometry
          args={[
            0.82,
            1,
            0.55,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#02050f"
          emissive="#536dff"
          emissiveIntensity={0.1}
          metalness={0.97}
          roughness={0.15}
        />
      </mesh>

      <mesh
        position={[0, 1.38, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <cylinderGeometry
          args={[
            0.18,
            0.4,
            0.75,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#080921"
          emissive="#8b6cff"
          emissiveIntensity={0.26}
          metalness={0.95}
          roughness={0.13}
        />
      </mesh>

      <group
        ref={crown}
        position={[0, 1.88, 0]}
      >
        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.38,
              0.014,
              8,
              56,
            ]}
          />

          <meshBasicMaterial
            color="#8b6cff"
            transparent
            opacity={0.48}
            toneMapped={false}
          />
        </mesh>

        <mesh
          position={[0, 0.07, 0]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.22,
              0.007,
              8,
              40,
            ]}
          />

          <meshBasicMaterial
            color="#4fdcff"
            transparent
            opacity={0.32}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh
        ref={pulse}
        position={[0, 0.25, 0.54]}
      >
        <sphereGeometry
          args={[0.055, 16, 16]}
        />

        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0, 0.3, 0.6]}
        color="#7b66ff"
        intensity={2.2}
        distance={3.4}
      />
    </group>
  );
}

function ServiceSymbol({
  icon,
  accent,
  active,
}: {
  icon: ServiceIcon;
  accent: string;
  active: boolean;
}) {
  const symbol = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!symbol.current) {
      return;
    }

    symbol.current.rotation.y +=
      delta * (active ? 0.8 : 0.25);

    symbol.current.rotation.z =
      Math.sin(
        state.clock.elapsedTime * 0.5,
      ) * 0.08;
  });

  if (icon === "design") {
    return (
      <group ref={symbol}>
        <mesh
          rotation={[
            0,
            0,
            Math.PI / 4,
          ]}
        >
          <boxGeometry
            args={[0.28, 0.28, 0.28]}
          />

          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={active ? 1 : 0.65}
            toneMapped={false}
          />
        </mesh>

        <mesh
          rotation={[
            Math.PI / 4,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.24,
              0.012,
              8,
              40,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.75}
            toneMapped={false}
          />
        </mesh>
      </group>
    );
  }

  if (icon === "development") {
    return (
      <group ref={symbol}>
        <NeonBox
          position={[-0.18, 0, 0]}
          scale={[
            0.045,
            0.38,
            0.045,
          ]}
          color={accent}
          rotation={[0, 0, 0.6]}
        />

        <NeonBox
          position={[0.18, 0, 0]}
          scale={[
            0.045,
            0.38,
            0.045,
          ]}
          color={accent}
          rotation={[0, 0, -0.6]}
        />

        <NeonBox
          position={[0, 0, 0]}
          scale={[
            0.04,
            0.48,
            0.04,
          ]}
          color={accent}
          rotation={[0, 0, 0.25]}
          opacity={0.65}
        />
      </group>
    );
  }

  if (icon === "branding") {
    return (
      <group ref={symbol}>
        <mesh>
          <icosahedronGeometry
            args={[0.25, 0]}
          />

          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={active ? 1 : 0.7}
            toneMapped={false}
          />
        </mesh>

        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.34,
              0.012,
              8,
              48,
            ]}
          />

          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={symbol}>
      <mesh>
        <octahedronGeometry
          args={[0.25, 0]}
        />

        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={active ? 1 : 0.72}
          toneMapped={false}
        />
      </mesh>

      {[
        [0.34, 0, 0],
        [-0.34, 0, 0],
        [0, 0.34, 0],
        [0, -0.34, 0],
      ].map((position, index) => (
        <mesh
          key={index}
          position={
            position as [
              number,
              number,
              number,
            ]
          }
        >
          <sphereGeometry
            args={[0.035, 12, 12]}
          />

          <meshBasicMaterial
            color={accent}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbEnergyBeam({
  start,
  end,
  color,
  active,
  offset,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  active: boolean;
  offset: number;
}) {
  const pulse =
    useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const startVector =
      new THREE.Vector3(...start);

    const endVector =
      new THREE.Vector3(...end);

    const middle = new THREE.Vector3(
      (start[0] + end[0]) / 2,
      Math.max(
        start[1],
        end[1],
      ) + 0.3,
      (start[2] + end[2]) / 2,
    );

    return new THREE.QuadraticBezierCurve3(
      startVector,
      middle,
      endVector,
    );
  }, [start, end]);

  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        curve,
        48,
        active ? 0.018 : 0.009,
        6,
        false,
      ),
    [curve, active],
  );

  useFrame((state) => {
    if (!pulse.current) {
      return;
    }

    const progress =
      (state.clock.elapsedTime *
        (active ? 0.22 : 0.1) +
        offset) %
      1;

    pulse.current.position.copy(
      curve.getPoint(progress),
    );
  });

  return (
    <>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.7 : 0.16}
          blending={
            THREE.AdditiveBlending
          }
          toneMapped={false}
        />
      </mesh>

      <mesh ref={pulse}>
        <sphereGeometry
          args={[
            active ? 0.055 : 0.03,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 1 : 0.5}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function FloatingServiceOrb({
  service,
  hoveredService,
  setHoveredService,
  navigateToService,
  reducedMotion,
}: {
  service: ServiceOrb;
  hoveredService: string | null;
  setHoveredService: (
    id: string | null,
  ) => void;
  navigateToService: (
    href: string,
  ) => void;
  reducedMotion: boolean;
}) {
  const group =
    useRef<THREE.Group>(null);

  const outerRing =
    useRef<THREE.Mesh>(null);

  const innerRing =
    useRef<THREE.Mesh>(null);

  const shell =
    useRef<THREE.Mesh>(null);

  const active =
    hoveredService === service.id;

  const index = serviceOrbs.findIndex(
    (item) =>
      item.id === service.id,
  );

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    const elapsed =
      state.clock.elapsedTime;

    const targetScale = active
      ? 1.14
      : 1;

    group.current.scale.x =
      THREE.MathUtils.damp(
        group.current.scale.x,
        targetScale,
        5,
        delta,
      );

    group.current.scale.y =
      THREE.MathUtils.damp(
        group.current.scale.y,
        targetScale,
        5,
        delta,
      );

    group.current.scale.z =
      THREE.MathUtils.damp(
        group.current.scale.z,
        targetScale,
        5,
        delta,
      );

    if (!reducedMotion) {
      group.current.position.y =
        service.position[1] +
        Math.sin(
          elapsed * 0.55 +
            index * 1.4,
        ) *
          0.12;

      group.current.rotation.y =
        Math.sin(
          elapsed * 0.22 + index,
        ) * 0.08;
    }

    if (outerRing.current) {
      outerRing.current.rotation.z +=
        delta *
        (active ? 0.8 : 0.24);
    }

    if (innerRing.current) {
      innerRing.current.rotation.x +=
        delta *
        (active ? -0.55 : -0.16);
    }

    if (shell.current) {
      const material =
        shell.current
          .material as THREE.MeshPhysicalMaterial;

      material.emissiveIntensity =
        THREE.MathUtils.damp(
          material.emissiveIntensity,
          active ? 0.5 : 0.14,
          5,
          delta,
        );
    }
  });

  const openService = (
    event: ThreeEvent<MouseEvent>,
  ) => {
    event.stopPropagation();

    document.body.style.cursor =
      "default";

    navigateToService(
      service.href,
    );
  };

  return (
    <group
      ref={group}
      position={service.position}
      onPointerEnter={(event) => {
        event.stopPropagation();

        setHoveredService(
          service.id,
        );

        document.body.style.cursor =
          "pointer";
      }}
      onPointerLeave={() => {
        setHoveredService(null);

        document.body.style.cursor =
          "default";
      }}
      onClick={openService}
    >
      <mesh ref={shell}>
        <sphereGeometry
          args={[0.58, 48, 48]}
        />

        <meshPhysicalMaterial
          color="#071122"
          emissive={service.accent}
          emissiveIntensity={0.14}
          metalness={0.25}
          roughness={0.08}
          transmission={0.72}
          thickness={0.85}
          transparent
          opacity={0.72}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[0.43, 32, 32]}
        />

        <meshBasicMaterial
          color={service.accent}
          transparent
          opacity={active ? 0.15 : 0.06}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <ServiceSymbol
        icon={service.icon}
        accent={service.accent}
        active={active}
      />

      <mesh
        ref={outerRing}
        rotation={[
          Math.PI / 2.4,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.78,
            0.018,
            8,
            72,
          ]}
        />

        <meshBasicMaterial
          color={service.accent}
          transparent
          opacity={active ? 0.95 : 0.38}
          toneMapped={false}
        />
      </mesh>

      <mesh
        ref={innerRing}
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.69,
            0.01,
            8,
            64,
          ]}
        />

        <meshBasicMaterial
          color={service.secondary}
          transparent
          opacity={active ? 0.7 : 0.24}
          toneMapped={false}
        />
      </mesh>

      {([-1, 1] as const).map(
        (side) => (
          <mesh
            key={side}
            position={[
              side * 0.78,
              0,
              0,
            ]}
          >
            <sphereGeometry
              args={[
                0.045,
                12,
                12,
              ]}
            />

            <meshBasicMaterial
              color={
                service.secondary
              }
              transparent
              opacity={
                active ? 1 : 0.58
              }
              toneMapped={false}
            />
          </mesh>
        ),
      )}

      <pointLight
        color={service.accent}
        intensity={active ? 5 : 1.6}
        distance={4}
      />

      <Html
        center
        distanceFactor={8}
        position={[0, -1.05, 0]}
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className={`min-w-[155px] rounded-xl border px-4 py-3 text-center backdrop-blur-xl transition duration-300 ${
            active
              ? "border-cyan-300/30 bg-[#03091c]/90 shadow-[0_0_40px_rgba(65,200,255,0.18)]"
              : "border-white/10 bg-[#03091c]/60"
          }`}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-cyan-300/65">
            Service {service.number}
          </p>

          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
            {service.name}
          </p>

          <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.22em] text-white/35">
            Click to enter
          </p>
        </div>
      </Html>
    </group>
  );
}

function OrbSystem({
  hoveredService,
  setHoveredService,
  navigateToService,
  reducedMotion,
}: {
  hoveredService: string | null;
  setHoveredService: (
    id: string | null,
  ) => void;
  navigateToService: (
    href: string,
  ) => void;
  reducedMotion: boolean;
}) {
  return (
    <group>
      {serviceOrbs.map(
        (service, index) => {
          const active =
            hoveredService ===
            service.id;

          return (
            <group key={service.id}>
              <FloatingServiceOrb
                service={service}
                hoveredService={
                  hoveredService
                }
                setHoveredService={
                  setHoveredService
                }
                navigateToService={
                  navigateToService
                }
                reducedMotion={
                  reducedMotion
                }
              />

              <OrbEnergyBeam
                start={[
                  0,
                  3.55,
                  -0.65,
                ]}
                end={service.position}
                color={service.accent}
                active={active}
                offset={index * 0.22}
              />
            </group>
          );
        },
      )}

      <mesh
        position={[0, 4.45, -0.65]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            2.1,
            2.12,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#6f78ff"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      <mesh
        position={[0, 4.45, -0.65]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            4.3,
            4.32,
            128,
          ]}
        />

        <meshBasicMaterial
          color="#35dfff"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function SplitTower({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [width, height, depth] =
    project.size;

  return (
    <>
      {([-1, 1] as const).map(
        (side) => (
          <group
            key={side}
            position={[
              side * width * 0.235,
              0,
              0,
            ]}
            rotation={[
              0,
              side * 0.06,
              side * 0.025,
            ]}
          >
            <mesh>
              <boxGeometry
                args={[
                  width * 0.46,
                  height,
                  depth * 0.8,
                ]}
              />

              <DarkMetalMaterial
                accent={
                  project.accent
                }
                active={active}
                intensity={0.1}
              />
            </mesh>

            <NeonBox
              position={[
                side *
                  width *
                  0.225,
                0,
                depth * 0.41,
              ]}
              scale={[
                0.018,
                height * 0.82,
                0.018,
              ]}
              color={project.accent}
              opacity={
                active ? 0.82 : 0.34
              }
            />
          </group>
        ),
      )}

      <mesh
        position={[
          0,
          height * 0.3,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.2,
            width * 0.29,
            height * 0.25,
            4,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.15}
        />
      </mesh>

      <WindowGrid
        width={width * 0.72}
        height={height * 0.78}
        depth={depth * 0.82}
        accent={project.accent}
        active={active}
        columns={3}
      />

      <EnergyCrown
        width={width}
        height={height}
        accent={project.accent}
        active={active}
      />
    </>
  );
}

function SpireTower({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [width, height, depth] =
    project.size;

  return (
    <>
      <mesh
        position={[
          0,
          -height * 0.06,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.34,
            width * 0.54,
            height * 0.82,
            4,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.11}
        />
      </mesh>

      <mesh
        position={[
          0,
          height * 0.38,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.07,
            width * 0.25,
            height * 0.3,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#050c19"
          emissive={project.accent}
          emissiveIntensity={
            active ? 0.56 : 0.16
          }
          metalness={0.96}
          roughness={0.13}
        />
      </mesh>

      <WindowGrid
        width={width * 0.66}
        height={height * 0.64}
        depth={depth * 0.8}
        accent={project.accent}
        active={active}
        columns={3}
        yOffset={-height * 0.06}
      />

      <VerticalEdges
        width={width * 0.74}
        height={height * 0.68}
        depth={depth * 0.8}
        accent={project.accent}
        active={active}
      />

      <EnergyCrown
        width={width * 0.84}
        height={height}
        accent={project.accent}
        active={active}
      />
    </>
  );
}

function SteppedTower({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [width, height, depth] =
    project.size;

  return (
    <>
      <mesh
        position={[
          0,
          -height * 0.28,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width * 1.14,
            height * 0.32,
            depth * 1.1,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.07}
        />
      </mesh>

      <mesh
        position={[
          0,
          height * 0.02,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width * 0.86,
            height * 0.42,
            depth * 0.86,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.11}
        />
      </mesh>

      <mesh
        position={[
          0,
          height * 0.34,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width * 0.56,
            height * 0.18,
            depth * 0.56,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.16}
        />
      </mesh>

      <WindowGrid
        width={width * 0.7}
        height={height * 0.55}
        depth={depth * 0.88}
        accent={project.accent}
        active={active}
        columns={2}
        yOffset={-height * 0.04}
      />

      <EnergyCrown
        width={width * 0.78}
        height={height}
        accent={project.accent}
        active={active}
      />
    </>
  );
}

function PrismTower({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [width, height, depth] =
    project.size;

  return (
    <>
      <mesh
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.4,
            width * 0.54,
            height,
            4,
          ]}
        />

        <DarkMetalMaterial
          accent={project.accent}
          active={active}
          intensity={0.12}
        />
      </mesh>

      <mesh
        position={[
          0,
          height * 0.3,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.2,
            width * 0.33,
            height * 0.22,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#0c0616"
          emissive={project.accent}
          emissiveIntensity={
            active ? 0.52 : 0.15
          }
          metalness={0.95}
          roughness={0.14}
        />
      </mesh>

      <WindowGrid
        width={width * 0.62}
        height={height * 0.68}
        depth={depth * 0.78}
        accent={project.accent}
        active={active}
        columns={2}
      />

      <VerticalEdges
        width={width * 0.7}
        height={height * 0.74}
        depth={depth * 0.78}
        accent={project.accent}
        active={active}
      />

      <EnergyCrown
        width={width * 0.82}
        height={height}
        accent={project.accent}
        active={active}
      />
    </>
  );
}

function ProjectArchitecture({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  switch (project.variant) {
    case "split":
      return (
        <SplitTower
          project={project}
          active={active}
        />
      );

    case "spire":
      return (
        <SpireTower
          project={project}
          active={active}
        />
      );

    case "stepped":
      return (
        <SteppedTower
          project={project}
          active={active}
        />
      );

    case "prism":
      return (
        <PrismTower
          project={project}
          active={active}
        />
      );
  }
}

function ProjectTower({
  project,
  activeProject,
  hoveredProject,
  setActiveProject,
  setHoveredProject,
  cityActivated,
  reducedMotion,
}: {
  project: Project;
  activeProject: string;
  hoveredProject: string | null;
  setActiveProject: (
    id: string,
  ) => void;
  setHoveredProject: (
    id: string | null,
  ) => void;
  cityActivated: boolean;
  reducedMotion: boolean;
}) {
  const group =
    useRef<THREE.Group>(null);

  const active =
    activeProject === project.id ||
    hoveredProject === project.id;

  const showLabel =
    activeProject === project.id ||
    hoveredProject === project.id;

  const projectIndex =
    projects.findIndex(
      (item) =>
        item.id === project.id,
    );

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    const entranceDelay =
      projectIndex * 0.14;

    const entranceProgress =
      reducedMotion
        ? 1
        : THREE.MathUtils.clamp(
            (state.clock.elapsedTime -
              entranceDelay) /
              1.2,
            0,
            1,
          );

    const easedEntrance =
      1 -
      Math.pow(
        1 - entranceProgress,
        3,
      );

    const targetY = cityActivated
      ? project.position[1] +
        (active ? 0.07 : 0)
      : -project.size[1];

    const animatedY =
      cityActivated
        ? THREE.MathUtils.lerp(
            -project.size[1] * 0.45,
            targetY,
            easedEntrance,
          )
        : -project.size[1];

    group.current.position.y =
      THREE.MathUtils.damp(
        group.current.position.y,
        animatedY,
        4.7,
        delta,
      );

    const targetScale = active
      ? 1.035
      : 1;

    group.current.scale.x =
      THREE.MathUtils.damp(
        group.current.scale.x,
        targetScale,
        5,
        delta,
      );

    group.current.scale.y =
      THREE.MathUtils.damp(
        group.current.scale.y,
        targetScale,
        5,
        delta,
      );

    group.current.scale.z =
      THREE.MathUtils.damp(
        group.current.scale.z,
        targetScale,
        5,
        delta,
      );
  });

  return (
    <group
      ref={group}
      position={[
        project.position[0],
        -project.size[1],
        project.position[2],
      ]}
      onPointerEnter={(event) => {
        event.stopPropagation();

        setHoveredProject(
          project.id,
        );

        document.body.style.cursor =
          "pointer";
      }}
      onPointerLeave={() => {
        setHoveredProject(null);

        document.body.style.cursor =
          "default";
      }}
      onClick={(event) => {
        event.stopPropagation();

        setActiveProject(
          project.id,
        );
      }}
    >
      <ProjectArchitecture
        project={project}
        active={active}
      />

      <pointLight
        position={[
          0,
          project.size[1] * 0.25,
          1,
        ]}
        color={project.accent}
        intensity={active ? 4.2 : 1}
        distance={4.2}
      />

      <Html
        center
        distanceFactor={8}
        position={[
          0,
          project.size[1] / 2 +
            0.95,
          0,
        ]}
        style={{
          pointerEvents: "none",
          opacity: showLabel ? 1 : 0,
          transform: `scale(${
            showLabel ? 1 : 0.9
          })`,
          transition:
            "opacity 220ms ease, transform 220ms ease",
        }}
      >
        <div className="relative min-w-[155px] whitespace-nowrap rounded-xl border border-cyan-300/20 bg-[#020718]/90 px-4 py-3 text-center shadow-[0_0_38px_rgba(61,190,255,0.16)] backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-300/70">
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

function BackgroundTower({
  structure,
}: {
  structure: BackgroundStructure;
}) {
  const [width, height] =
    structure.size;

  return (
    <group
      position={structure.position}
    >
      <mesh
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            width * 0.4,
            width * 0.52,
            height,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#01050d"
          emissive={structure.accent}
          emissiveIntensity={0.075}
          metalness={0.93}
          roughness={0.23}
          transparent
          opacity={0.78}
        />
      </mesh>

      {structure.tiered && (
        <mesh
          position={[
            0,
            height * 0.28,
            0,
          ]}
          rotation={[
            0,
            Math.PI / 4,
            0,
          ]}
        >
          <cylinderGeometry
            args={[
              width * 0.18,
              width * 0.29,
              height * 0.27,
              4,
            ]}
          />

          <meshStandardMaterial
            color="#050d1d"
            emissive={
              structure.accent
            }
            emissiveIntensity={0.11}
            metalness={0.91}
            roughness={0.21}
          />
        </mesh>
      )}
    </group>
  );
}

function HolographicPlatform({
  cityActivated,
}: {
  cityActivated: boolean;
}) {
  const platform =
    useRef<THREE.Group>(null);

  const rings =
    useRef<THREE.Group>(null);

  const scanner =
    useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (platform.current) {
      const target =
        cityActivated ? 1 : 0.72;

      platform.current.scale.x =
        THREE.MathUtils.damp(
          platform.current.scale.x,
          target,
          4,
          delta,
        );

      platform.current.scale.y =
        THREE.MathUtils.damp(
          platform.current.scale.y,
          target,
          4,
          delta,
        );

      platform.current.scale.z =
        THREE.MathUtils.damp(
          platform.current.scale.z,
          target,
          4,
          delta,
        );
    }

    if (rings.current) {
      rings.current.rotation.z +=
        delta * 0.05;
    }

    if (scanner.current) {
      scanner.current.rotation.z -=
        delta * 0.16;

      const material =
        scanner.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        cityActivated
          ? 0.038 +
            Math.sin(
              state.clock.elapsedTime *
                1.4,
            ) *
              0.012
          : 0;
    }
  });

  return (
    <group
      ref={platform}
      position={[0, -0.14, 0]}
      scale={[0.72, 0.72, 0.72]}
    >
      <mesh
        position={[0, -0.18, 0]}
        receiveShadow
      >
        <cylinderGeometry
          args={[
            5.9,
            6.3,
            0.36,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#010208"
          emissive="#0b1733"
          emissiveIntensity={0.28}
          metalness={0.98}
          roughness={0.14}
        />
      </mesh>

      <mesh>
        <cylinderGeometry
          args={[
            5.25,
            5.25,
            0.08,
            96,
          ]}
        />

        <MeshTransmissionMaterial
          color="#031027"
          transmission={0.62}
          thickness={0.46}
          roughness={0.15}
          chromaticAberration={0.025}
          anisotropy={0.18}
          distortion={0.035}
          distortionScale={0.12}
          temporalDistortion={0.015}
        />
      </mesh>

      <group
        ref={rings}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        {[2.2, 3.15, 4.15, 5.15].map(
          (radius, index) => (
            <mesh
              key={radius}
              position={[
                0,
                0,
                0.1 +
                  index * 0.004,
              ]}
            >
              <ringGeometry
                args={[
                  radius,
                  radius +
                    (index === 3
                      ? 0.035
                      : 0.01),
                  128,
                ]}
              />

              <meshBasicMaterial
                color={
                  index % 2 === 0
                    ? "#27d9ff"
                    : "#805cff"
                }
                transparent
                opacity={
                  index === 3
                    ? 0.38
                    : 0.13
                }
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
          ),
        )}
      </group>

      <mesh
        ref={scanner}
        position={[0, 0.1, 0]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry
          args={[
            4.7,
            96,
            0,
            Math.PI / 15,
          ]}
        />

        <meshBasicMaterial
          color="#38dfff"
          transparent
          opacity={0.038}
          side={THREE.DoubleSide}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function CinematicEffects() {
  return (
    <EffectComposer
      multisampling={0}
    >
      <Bloom
        intensity={0.92}
        luminanceThreshold={0.48}
        luminanceSmoothing={0.82}
        mipmapBlur
      />

      <Vignette
        eskil={false}
        offset={0.13}
        darkness={0.68}
      />
    </EffectComposer>
  );
}

function CityScene({
  activeProject,
  hoveredProject,
  hoveredService,
  setActiveProject,
  setHoveredProject,
  setHoveredService,
  navigateToService,
  cityActivated,
  reducedMotion,
}: {
  activeProject: string;
  hoveredProject: string | null;
  hoveredService: string | null;
  setActiveProject: (
    id: string,
  ) => void;
  setHoveredProject: (
    id: string | null,
  ) => void;
  setHoveredService: (
    id: string | null,
  ) => void;
  navigateToService: (
    href: string,
  ) => void;
  cityActivated: boolean;
  reducedMotion: boolean;
}) {
  const city =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (
      !city.current ||
      reducedMotion
    ) {
      return;
    }

    city.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime *
          0.085,
      ) * 0.012;
  });

  return (
    <>
      <color
        attach="background"
        args={["#010208"]}
      />

      <fog
        attach="fog"
        args={[
          "#010208",
          11,
          31,
        ]}
      />

      <CameraRig
        activeProject={activeProject}
        reducedMotion={reducedMotion}
      />

      <ambientLight
        intensity={0.22}
      />

      <directionalLight
        position={[4, 10, 7]}
        intensity={1.4}
        color="#aebcff"
        castShadow
      />

      <pointLight
        position={[-5, 5, 4]}
        color="#1474ff"
        intensity={5}
        distance={15}
      />

      <pointLight
        position={[5, 5, 2]}
        color="#a33dff"
        intensity={4.8}
        distance={15}
      />

      <pointLight
        position={[0, 8, -1]}
        color="#49deff"
        intensity={2.8}
        distance={13}
      />

      <Sparkles
        count={150}
        scale={[19, 12, 14]}
        size={1.25}
        speed={0.1}
        opacity={0.45}
        color="#b5d4ff"
      />

      <Sparkles
        count={54}
        scale={[13, 9, 11]}
        size={1.8}
        speed={0.16}
        opacity={0.3}
        color="#7551ff"
      />

      <group
        ref={city}
        position={[0, -2.45, 0]}
        rotation={[
          -0.018,
          -0.006,
          0,
        ]}
      >
        <HolographicPlatform
          cityActivated={
            cityActivated
          }
        />

        <CityNexus />

        {backgroundStructures.map(
          (structure, index) => (
            <BackgroundTower
              key={index}
              structure={structure}
            />
          ),
        )}

        {projects.map((project) => (
          <ProjectTower
            key={project.id}
            project={project}
            activeProject={
              activeProject
            }
            hoveredProject={
              hoveredProject
            }
            setActiveProject={
              setActiveProject
            }
            setHoveredProject={
              setHoveredProject
            }
            cityActivated={
              cityActivated
            }
            reducedMotion={
              reducedMotion
            }
          />
        ))}

        <OrbSystem
          hoveredService={
            hoveredService
          }
          setHoveredService={
            setHoveredService
          }
          navigateToService={
            navigateToService
          }
          reducedMotion={
            reducedMotion
          }
        />
      </group>

      <Environment preset="night" />

      <CinematicEffects />
    </>
  );
}

function ProjectInterface({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.div
      key={project.id}
      initial={{
        opacity: 0,
        y: 16,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.4,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.accent}20, transparent 48%)`,
        }}
      />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">
          Project sector{" "}
          {project.number}
        </p>

        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
          {project.name}
        </h3>

        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-indigo-300/70">
          {project.category}
        </p>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          {project.description}
        </p>

        <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/38">
          Awaiting transmission
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const router = useRouter();

  const sectionRef =
    useRef<HTMLElement>(null);

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      margin: "-15% 0px",
    },
  );

  const prefersReducedMotion =
    useReducedMotion();

  const reducedMotion =
    prefersReducedMotion ?? false;

  const [
    activeProject,
    setActiveProject,
  ] = useState("project-01");

  const [
    hoveredProject,
    setHoveredProject,
  ] = useState<string | null>(
    null,
  );

  const [
    hoveredService,
    setHoveredService,
  ] = useState<string | null>(
    null,
  );

  const selectedProject =
    projects.find(
      (project) =>
        project.id === activeProject,
    ) ?? projects[0];

  const navigateToService = (
    href: string,
  ) => {
    router.push(href);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate overflow-hidden bg-[#02030b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[45rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />

        <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-500/8 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          transition={{
            duration:
              reducedMotion
                ? 0
                : 0.8,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200/80">
              Digital Universe
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
            Choose your{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              destination
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            Select a service orb to
            enter its dedicated system,
            or explore the future project
            districts below.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale:
              reducedMotion
                ? 1
                : 0.96,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  scale:
                    reducedMotion
                      ? 1
                      : 0.96,
                }
          }
          transition={{
            duration:
              reducedMotion
                ? 0
                : 1.1,
            delay:
              reducedMotion
                ? 0
                : 0.15,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="relative mt-12 overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/30 shadow-[0_40px_140px_rgba(17,51,144,0.18)] sm:mt-16 sm:rounded-[44px]"
        >
          <div className="pointer-events-none absolute inset-x-12 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent" />

          <div className="pointer-events-none absolute left-6 top-6 z-10 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />

            Orb network online
          </div>

          <div className="pointer-events-none absolute right-6 top-6 z-10 hidden font-mono text-[9px] uppercase tracking-[0.28em] text-white/30 sm:block">
            Select system to enter
          </div>

          <div className="h-[700px] w-full sm:h-[820px] lg:h-[900px]">
            <Canvas
              dpr={[1, 1.5]}
              shadows
              camera={{
                position: [
                  0,
                  5.15,
                  14.3,
                ],
                fov: 42,
                near: 0.1,
                far: 100,
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference:
                  "high-performance",
              }}
              onPointerMissed={() => {
                setActiveProject(
                  "project-01",
                );

                setHoveredProject(
                  null,
                );

                setHoveredService(
                  null,
                );
              }}
            >
              <Suspense fallback={null}>
                <CityScene
                  activeProject={
                    activeProject
                  }
                  hoveredProject={
                    hoveredProject
                  }
                  hoveredService={
                    hoveredService
                  }
                  setActiveProject={
                    setActiveProject
                  }
                  setHoveredProject={
                    setHoveredProject
                  }
                  setHoveredService={
                    setHoveredService
                  }
                  navigateToService={
                    navigateToService
                  }
                  cityActivated={
                    isInView
                  }
                  reducedMotion={
                    reducedMotion
                  }
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02030b] via-[#02030b]/65 to-transparent" />
        </motion.div>

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-5 py-3 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200/60">
              Select a service orb
              to enter its system
            </span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Web Design, Web
            Development, Branding and
            AI Solutions each lead to a
            dedicated experience.
          </p>
        </div>

        <div className="mt-10">
          <ProjectInterface
            project={
              selectedProject
            }
          />
        </div>
      </div>
    </section>
  );
}