import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface AISphereMeshProps {
  progress: number;
}

const AISphereMesh: React.FC<AISphereMeshProps> = ({ progress }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotation speed slightly dynamically influenced by progress
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

  const isCompleted = progress >= 100;
  const coreColor = isCompleted ? '#0D9488' : '#0D9488';
  const accentColor = isCompleted ? '#14B8A6' : '#F97316';

  return (
    <group>
      {/* Inner Glowing AI Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.4}
          wireframe={false}
        />
      </mesh>

      {/* Outer Geodesic Tech Wireframe Cage */}
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

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#0D9488" transparent opacity={0.5} />
      </mesh>

      {/* Orbital Ring 2 (Orange accent) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.018, 16, 64]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};

export const AISphereCanvas: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        style={{ pointerEvents: 'auto', background: 'transparent' }}
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
};
