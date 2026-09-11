import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  height: number;
  width?: number;
  depth?: number;
  color: string;
  accent?: boolean;
}

const Building: React.FC<BuildingProps> = ({ position, height, width = 0.5, depth = 0.5, color, accent }) => {
  return (
    <group position={[position[0], height / 2, position[2]]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.25} 
          metalness={0.15}
        />
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
};

const CityscapeMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  const buildings = useMemo(() => {
    const items: Array<{
      id: string;
      position: [number, number, number];
      height: number;
      width: number;
      depth: number;
      color: string;
      accent?: boolean;
    }> = [];

    // Modern light palette: Deep teal (#0D9488), mint teal, pure slate accents, warm orange highlights
    const palette = ['#0D9488', '#14B8A6', '#0F766E', '#0284C7', '#CBD5E1', '#E2E8F0', '#0D9488'];

    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        // Center landmark tower
        if (x === 0 && z === 0) {
          items.push({
            id: 'center-spire',
            position: [0, 0, 0],
            height: 2.7,
            width: 0.65,
            depth: 0.65,
            color: '#0D9488',
            accent: true,
          });
          continue;
        }

        const dist = Math.sqrt(x * x + z * z);
        if (dist > 3.2) continue;

        // Skip random spots for open city squares / plazas
        const hash = Math.sin(x * 17.13 + z * 37.77) * 43758.5453;
        const rand = hash - Math.floor(hash);
        if (rand > 0.82) continue;

        const height = 0.5 + rand * 1.8;
        const color = palette[Math.floor(rand * palette.length)];

        items.push({
          id: `${x}_${z}`,
          position: [x * 0.72, 0, z * 0.72],
          height,
          width: 0.46 + (rand * 0.12),
          depth: 0.46 + (rand * 0.12),
          color,
          accent: rand > 0.65,
        });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.9, 3.0, 0.1, 40]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Soft teal glowing ring around foundation */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.65, 48]} />
        <meshBasicMaterial color="#0D9488" transparent opacity={0.55} />
      </mesh>

      {/* Buildings */}
      {buildings.map((b) => (
        <Building
          key={b.id}
          position={b.position}
          height={b.height}
          width={b.width}
          depth={b.depth}
          color={b.color}
          accent={b.accent}
        />
      ))}
    </group>
  );
};

export const CityscapeCanvas: React.FC = () => {
  return (
    <div className="w-full h-44 sm:h-52 relative cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden mb-4">
      <Canvas
        camera={{ position: [4.2, 3.8, 4.2], fov: 40 }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Soft teal ambient and point-lights */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
        
        {/* Soft Teal ambient point-light */}
        <pointLight position={[0, 3.5, 0]} intensity={3.5} color="#0D9488" distance={9} decay={2} />
        {/* Subtle Warm Orange contrast light */}
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

      <div className="absolute bottom-1 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] text-teal-800 font-mono pointer-events-none select-none border border-teal-100/60 shadow-xs">
        3D Interactive City
      </div>
    </div>
  );
};
