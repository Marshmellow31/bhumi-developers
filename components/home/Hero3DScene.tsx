"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/living-room.glb");
  const { camera } = useThree();

  // Auto-fit: normalize the model and position the camera based on its actual size
  useEffect(() => {
    if (!innerRef.current) return;

    const box = new THREE.Box3().setFromObject(innerRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Scale so the longest side is 6 units
    const targetSize = 6;
    const scale = targetSize / maxDim;

    innerRef.current.scale.setScalar(scale);
    innerRef.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    // Compute a good camera distance based on FOV and model size
    const persp = camera as THREE.PerspectiveCamera;
    const fov = (persp.fov * Math.PI) / 180;
    const fitDistance = targetSize / (2 * Math.tan(fov / 2));

    // Place camera centered, slightly elevated, looking straight at the room
    camera.position.set(0, fitDistance * 0.35, fitDistance * 1.0);
    camera.lookAt(0, 0, 0);
    persp.updateProjectionMatrix();

    // Rotate the room itself so we see it at a 3/4 angle (the view you liked)
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.6;
    }
  }, [scene, camera]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    const targetRotY = pointer.x * 0.35;
    const targetRotX = -pointer.y * 0.12;
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
      camera={{ position: [0, 0, 10], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, 4, -5]} intensity={0.6} color="#f59e0b" />
        <Environment preset="apartment" />
        <Model />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/living-room.glb");
