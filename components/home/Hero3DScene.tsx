"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/living-room.glb");

  // Auto-fit: normalize the model to a known size and recenter it at origin
  useEffect(() => {
    if (!innerRef.current) return;
    const box = new THREE.Box3().setFromObject(innerRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 5;
    const scale = targetSize / maxDim;
    innerRef.current.scale.setScalar(scale);
    innerRef.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    const targetRotY = pointer.x * 0.4;
    const targetRotX = -pointer.y * 0.15;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 9], fov: 35 }}
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
