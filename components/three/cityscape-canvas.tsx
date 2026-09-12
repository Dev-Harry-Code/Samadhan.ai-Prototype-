"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  accent: boolean;
}

function Building({ position, height, width, depth, color, accent }: BuildingProps) {
  return (
    <group position={[position[0], height / 2, position[2]]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
      </mesh>
      {accent && (
        <mesh position={[0, height / 2 + 0.05, 0]}>
          <boxGeometry args={[width * 0.7, 0.1, depth * 0.7]} />
          <meshStandardMaterial
            color="#F97316"
            emissive="#F97316"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

function CityscapeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const buildings = useMemo(() => {
    const items: BuildingProps[] = [];
    const palette = ["#0D9488", "#14B8A6", "#0F766E", "#0284C7", "#CBD5E1", "#E2E8F0", "#0D9488"];

    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        if (x === 0 && z === 0) {
          items.push({
            position: [0, 0, 0],
            height: 2.7,
            width: 0.65,
            depth: 0.65,
            color: "#0D9488",
            accent: true,
          });
          continue;
        }
        const dist = Math.sqrt(x * x + z * z);
        if (dist > 3.2) continue;
        const hash = Math.sin(x * 17.13 + z * 37.77) * 43758.5453;
        const rand = hash - Math.floor(hash);
        if (rand > 0.82) continue;
        const height = 0.5 + rand * 1.8;
        items.push({
          position: [x * 0.72, 0, z * 0.72],
          height,
          width: 0.46 + rand * 0.12,
          depth: 0.46 + rand * 0.12,
          color: palette[Math.floor(rand * palette.length)],
          accent: rand > 0.65,
        });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.9, 3.0, 0.1, 40]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.65, 48]} />
        <meshBasicMaterial color="#0D9488" transparent opacity={0.55} />
      </mesh>
      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
    </group>
  );
}

export function CityscapeCanvas({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-44 w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing sm:h-52 ${className}`}
    >
      <Canvas
        camera={{ position: [4.2, 3.8, 4.2], fov: 40 }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
        <pointLight position={[0, 3.5, 0]} intensity={3.5} color="#0D9488" distance={9} decay={2} />
        <pointLight position={[-3, 2, -2]} intensity={1.5} color="#F97316" distance={7} decay={2} />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
          <CityscapeMesh />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-1 right-2 select-none rounded border border-teal-100/60 bg-white/80 px-2 py-0.5 font-mono text-[9px] text-teal-800 shadow-xs backdrop-blur-xs">
        3D Interactive City
      </div>
    </div>
  );
}