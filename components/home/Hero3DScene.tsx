"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/living-room.glb");

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    const targetRotY = pointer.x * 0.6;
    const targetRotX = -pointer.y * 0.25;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.2} position={[0, -1, 0]} />
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#f59e0b" />
        <Environment preset="apartment" />
        <Model />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/living-room.glb");
