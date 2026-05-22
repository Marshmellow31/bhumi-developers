"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ArchitecturalStructure() {
  const outerCubeRef = useRef<THREE.Mesh>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Extremely slow, delicate rotations
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y = time * 0.03;
      outerCubeRef.current.rotation.x = time * 0.015;
    }
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y = -time * 0.04;
      innerCubeRef.current.rotation.z = time * 0.02;
    }
    if (gridRef.current) {
      // Soft blueprint float
      gridRef.current.position.y = -3.5 + Math.sin(time * 0.4) * 0.1;
      gridRef.current.rotation.y = time * 0.008;
    }

    // Gentle camera parallax using pointer position
    const targetX = state.pointer.x * 2.5;
    const targetY = state.pointer.y * 2.0;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* ── Floor Blueprint Grid ── */}
      <gridHelper
        ref={gridRef}
        args={[55, 36, "#FFFFFF", "#FFFFFF"]}
        position={[0, -3.5, 0]}
        rotation={[0.08, 0, 0]}
      >
        <lineBasicMaterial attach="material" color="#ffffff" opacity={0.05} transparent />
      </gridHelper>

      {/* ── Outer Architectural Wireframe Structure ── */}
      <mesh ref={outerCubeRef}>
        <boxGeometry args={[6.2, 6.2, 6.2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Inner Accent Architectural Core ── */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[4.0, 4.0, 4.0]} />
        <meshBasicMaterial
          color="#F59E0B" // Minimal amber accent line
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Core Solid Ambient Block ── */}
      <mesh>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.018}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroBackground3D() {
  return (
    <div className="w-full h-full opacity-65">
      <Canvas
        camera={{ position: [0, 1.0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <ArchitecturalStructure />
      </Canvas>
    </div>
  );
}
