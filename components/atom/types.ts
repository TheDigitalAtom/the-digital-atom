import type { MutableRefObject } from "react";

export type Vector3Tuple = [number, number, number];

export type AtomInteraction = {
  strength: MutableRefObject<number>;
  velocity: MutableRefObject<number>;
  pointerX: MutableRefObject<number>;
  pointerY: MutableRefObject<number>;
};

export type ElectronProps = {
  color: string;
  speed: number;
  offset: number;
  interaction: AtomInteraction;
  radiusX?: number;
  radiusY?: number;
  size?: number;
  trailWidth?: number;
  trailLength?: number;
  lightIntensity?: number;
};

export type OrbitRingProps = {
  rotation: Vector3Tuple;
  color: string;
  speed: number;
  offset: number;
  interaction: AtomInteraction;
  index: number;
};

export type LogoOrbitProps = {
  rotation: Vector3Tuple;
  color: string;
  speed: number;
  offset: number;
  interaction: AtomInteraction;
};