"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AISphereMesh({ progress }: { progress: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speed = 0.8 + (progress / 100) * 0.8;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * speed;
      coreRef.current.rotation.x = Math.sin(time * 0.8) * 0.2;
    }
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y -= delta * (speed * 0.65);
      outerCageRef.current.rotation.z += delta * (speed * 0.45);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.7;
      ring1Ref.current.rotation.y = time * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.6;
      ring2Ref.current.rotation.z = time * 0.4;
    }
  });

  const accentColor = progress >= 100 ? "#14B8A6" : "#F97316";

  return (
    <group>
      {/* Inner glowing AI core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color="#0D9488"
          emissive="#0D9488"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Outer geodesic wireframe cage */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.4}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#0D9488" transparent opacity={0.5} />
      </mesh>

      {/* Orbital ring 2 (orange accent) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.018, 16, 64]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export function AISphereCanvas({ progress = 0 }: { progress?: number }) {
  return (
    <div className="relative mx-auto h-28 w-28 cursor-pointer sm:h-32 sm:w-32">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        style={{ pointerEvents: "auto", background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, 2]} intensity={2.5} color="#0D9488" distance={6} />
        <pointLight position={[-2, -2, -1]} intensity={1.8} color="#F97316" distance={5} />

        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <AISphereMesh progress={progress} />
        </Float>
      </Canvas>
    </div>
  );
}