"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Shared gold material props ── */
const GOLD_MAT = {
  color:       new THREE.Color("#C9A96E"),
  roughness:   0.1,
  metalness:   0.9,
  transparent: true,
} as const;

/* ────────────────────────────────────────────────────────
   PointLight that interpolates towards the current pointer
   ──────────────────────────────────────────────────────── */
function MouseLight() {
  const lightRef  = useRef<THREE.PointLight>(null);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    const tx = pointer.x * viewport.width  * 0.45;
    const ty = pointer.y * viewport.height * 0.45;
    /* smooth lerp at 7 % per frame → silky follow */
    lightRef.current.position.x +=
      (tx - lightRef.current.position.x) * 0.07;
    lightRef.current.position.y +=
      (ty - lightRef.current.position.y) * 0.07;
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={120}
      color="#f5c870"
      position={[0, 0, 4]}
      decay={2}
    />
  );
}

/* ────────────────────────────────────────────────────────
   Notifies parent when the scene has been set up
   ──────────────────────────────────────────────────────── */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

/* ────────────────────────────────────────────────────────
   5 floating architectural solids
   ──────────────────────────────────────────────────────── */
function Scene({ onReady }: { onReady: () => void }) {
  return (
    <>
      {/* Ambient + directional fill */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={0.5} color="#fff8e7" />

      {/* Mouse-tracking key light */}
      <MouseLight />

      {/* ── Solid 1 — large box, far back-left ── */}
      <Float speed={0.75} rotationIntensity={0.55} floatIntensity={0.9}>
        <mesh position={[-2.7, 1.1, -2.8]} rotation={[0.4, 0.6, 0.15]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshPhysicalMaterial {...GOLD_MAT} opacity={0.72} />
        </mesh>
      </Float>

      {/* ── Solid 2 — torus, lower-left foreground ── */}
      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={2.1}>
        <mesh position={[-1.3, -1.9, -0.7]} rotation={[1.1, 0.4, 0.7]}>
          <torusGeometry args={[0.85, 0.26, 20, 64]} />
          <meshPhysicalMaterial {...GOLD_MAT} opacity={0.80} />
        </mesh>
      </Float>

      {/* ── Solid 3 — small box, top-right ── */}
      <Float speed={1.45} rotationIntensity={0.85} floatIntensity={1.6}>
        <mesh position={[2.5, 1.7, -1.4]} rotation={[0.7, 1.1, 0.25]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshPhysicalMaterial {...GOLD_MAT} opacity={0.62} />
        </mesh>
      </Float>

      {/* ── Solid 4 — torus, right mid ── */}
      <Float speed={0.95} rotationIntensity={1.05} floatIntensity={1.9}>
        <mesh position={[2.3, -0.7, -0.3]} rotation={[0.9, 1.7, 0.35]}>
          <torusGeometry args={[0.65, 0.19, 16, 52]} />
          <meshPhysicalMaterial {...GOLD_MAT} opacity={0.68} />
        </mesh>
      </Float>

      {/* ── Solid 5 — giant ghost box, centred deep ── */}
      <Float speed={0.50} rotationIntensity={0.28} floatIntensity={0.55}>
        <mesh position={[0.2, 0.1, -4.5]} rotation={[0.25, 0.45, 0.18]}>
          <boxGeometry args={[2.6, 2.6, 2.6]} />
          <meshPhysicalMaterial {...GOLD_MAT} opacity={0.10} />
        </mesh>
      </Float>

      <ReadySignal onReady={onReady} />
    </>
  );
}

/* ────────────────────────────────────────────────────────
   Default export — the Canvas wrapper
   ──────────────────────────────────────────────────────── */
export default function HeroCanvas3D({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      camera={{ fov: 35, position: [0, 0, 8] }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",   /* let mouse events pass through to HTML layer */
      }}
    >
      <Scene onReady={onReady} />
    </Canvas>
  );
}
