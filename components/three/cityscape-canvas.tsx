"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import {
  Compass,
  ExternalLink,
  Eye,
  MapPin,
  Moon,
  Navigation,
  RefreshCw,
  RotateCcw,
  Sparkles as SparklesIcon,
  Sun,
} from "lucide-react";

// Jodhpur 3D Telemetry Hotspots
const JODHPUR_3D_HOTSPOTS = [
  {
    id: "mehrangarh",
    name: "Mehrangarh Fort & Ridge",
    position: [0, 1.45, 0] as [number, number, number],
    color: "#0d9488",
    status: "Monitored",
    caseTitle: "Citadel Siltation & Rock Massif Telemetry",
    squad: "Architectural Heritage Squad",
  },
  {
    id: "ratanada",
    name: "Ratanada Corridor",
    position: [1.35, 0.45, 1.1] as [number, number, number],
    color: "#f59e0b",
    status: "In Progress",
    caseTitle: "Bridge Deck Acoustic Strain Sensor (CE-401)",
    squad: "Civil Engineering Team",
  },
  {
    id: "kaylana",
    name: "Kaylana Lake Basin",
    position: [-1.85, 0.25, -1.05] as [number, number, number],
    color: "#ef4444",
    status: "Critical",
    caseTitle: "Industrial Effluent & Coliform Spike",
    squad: "Environmental Science Team",
  },
  {
    id: "shastri-nagar",
    name: "Shastri Nagar Ward 12",
    position: [-1.15, 0.35, 1.35] as [number, number, number],
    color: "#0284c7",
    status: "Assigned",
    caseTitle: "Stormwater Drainage Surge Telemetry",
    squad: "Public Health & Drainage Lab",
  },
  {
    id: "iit-campus",
    name: "IIT Jodhpur Hub (Karwar)",
    position: [1.9, 0.45, -1.6] as [number, number, number],
    color: "#6366f1",
    status: "Lead Partner",
    caseTitle: "Central AI Drone & IoT Telemetry Gateway",
    squad: "IIT Jodhpur Lead AI Lab",
  },
];

type Hotspot3D = (typeof JODHPUR_3D_HOTSPOTS)[0];

interface Building3DProps {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  isBlueCity: boolean;
  hasSolarOrAntenna?: boolean;
}

function BuildingMesh({
  position,
  height,
  width,
  depth,
  color,
  isBlueCity,
  hasSolarOrAntenna,
}: Building3DProps) {
  return (
    <group position={[position[0], height / 2 + position[1], position[2]]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={isBlueCity ? 0.2 : 0.6}
          emissive={isBlueCity ? "#1e3a8a" : "#0f172a"}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Emissive architectural window glow band */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width * 1.01, height * 0.18, depth * 1.01]} />
        <meshStandardMaterial
          color={isBlueCity ? "#38bdf8" : "#2dd4bf"}
          emissive={isBlueCity ? "#38bdf8" : "#2dd4bf"}
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Rooftop details: solar panel or antenna spire */}
      {hasSolarOrAntenna && (
        <mesh position={[0, height / 2 + 0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.25, 8]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

// Interactive Holographic Issue Beacon with Vertical Light Shaft
function HolographicBeacon({
  hotspot,
  isSelected,
  onClick,
}: {
  hotspot: Hotspot3D;
  isSelected: boolean;
  onClick: () => void;
}) {
  const beaconRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2;
    if (ringRef.current) {
      const scale = 1 + (Math.sin(t * 2) + 1) * 0.35;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      ref={beaconRef}
      position={hotspot.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Ground pulsating radar ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshBasicMaterial
          color={hotspot.color}
          transparent
          opacity={isSelected ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical Holographic Light Shaft */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 1.5, 16]} />
        <meshBasicMaterial
          color={hotspot.color}
          transparent
          opacity={isSelected ? 0.75 : 0.45}
        />
      </mesh>

      {/* Glowing Floating Beacon Sphere */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[isSelected ? 0.12 : 0.09, 16, 16]} />
        <meshStandardMaterial
          color={hotspot.color}
          emissive={hotspot.color}
          emissiveIntensity={isSelected ? 1.5 : 0.9}
        />
      </mesh>
    </group>
  );
}

// 3D Jodhpur Topology Model
function JodhpurDigitalTwinMesh({
  selectedHotspot,
  onSelectHotspot,
  autoRotate,
}: {
  selectedHotspot: Hotspot3D | null;
  onSelectHotspot: (h: Hotspot3D) => void;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radarSweepRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.y += delta * 0.9;
    }
  });

  // Generate Jodhpur city topology: central Mehrangarh citadel + blue city cascade + municipal zone
  const { blueCityBuildings, municipalTowers } = useMemo(() => {
    const blueCity: Building3DProps[] = [];
    const municipal: Building3DProps[] = [];

    const bluePalette = [
      "#1e40af", // Indigo Blue
      "#2563eb", // Royal Cobalt
      "#0284c7", // Sky Azure
      "#0369a1", // Deep Blue
      "#38bdf8", // Cyan Tint
      "#f8fafc", // White Limestone Haveli
    ];

    // Surrounding Blue City blocks cascading down the hill
    for (let i = 0; i < 75; i++) {
      const angle = (i / 75) * Math.PI * 2 + Math.sin(i) * 0.3;
      const radius = 1.3 + (i % 7) * 0.32;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Skip corners outside circular boundary
      if (radius > 3.6) continue;

      const seed = Math.sin(i * 12.9898) * 43758.5453;
      const rand = seed - Math.floor(seed);
      const height = 0.35 + rand * 0.75;
      const width = 0.32 + rand * 0.18;
      const depth = 0.32 + rand * 0.18;

      blueCity.push({
        position: [x, 0, z],
        height,
        width,
        depth,
        color: bluePalette[Math.floor(rand * bluePalette.length)],
        isBlueCity: true,
        hasSolarOrAntenna: rand > 0.7,
      });
    }

    // Modern Research District / Innovation Towers (Perimeter)
    const modernCoords: [number, number][] = [
      [2.2, -1.6],
      [2.6, -1.1],
      [2.5, -2.0],
      [-2.4, 1.8],
      [-2.7, 1.3],
      [-1.9, 2.3],
    ];

    modernCoords.forEach(([x, z], idx) => {
      const height = 1.2 + (idx % 3) * 0.5;
      municipal.push({
        position: [x, 0, z],
        height,
        width: 0.55,
        depth: 0.55,
        color: "#0f766e",
        isBlueCity: false,
        hasSolarOrAntenna: true,
      });
    });

    return { blueCityBuildings: blueCity, municipalTowers: municipal };
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* 1. Base Pedestal: High-Tech Municipal Foundation Disc */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.35, 0.2, 64]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Cybernetic glowing coordinate rings */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.9, 4.05, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 2.76, 48]} />
        <meshBasicMaterial color="#0d9488" transparent opacity={0.4} />
      </mesh>

      {/* 2. Rotating Holographic Radar Sweep Beam */}
      <group ref={radarSweepRef} position={[0, 0.02, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.8, 0, 0]}>
          <planeGeometry args={[3.6, 0.06]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 3. Central Mehrangarh Sandstone Citadel Plateau (Terracotta Ridge) */}
      <group position={[0, 0, 0]}>
        {/* Tier 1: Rocky Sandstone Foothill Massif */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.6, 0.7, 10]} />
          <meshStandardMaterial
            color="#b45309"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Tier 2: Citadel Ramparts & Fort Walls */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.95, 1.15, 0.6, 8]} />
          <meshStandardMaterial
            color="#d97706"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Tier 3: Iconic Fort Palace & Turret Bastions */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.55, 0.85]} />
          <meshStandardMaterial
            color="#92400e"
            roughness={0.65}
            metalness={0.2}
          />
        </mesh>

        {/* Crown Spire & Heritage Beacon */}
        <mesh position={[0, 1.65, 0]}>
          <coneGeometry args={[0.15, 0.35, 8]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* 4. Surrounding Jodhpur Blue City Haveli Clusters */}
      {blueCityBuildings.map((b, i) => (
        <BuildingMesh key={`blue-${i}`} {...b} />
      ))}

      {/* 5. Modern Municipal / Research District Towers */}
      {municipalTowers.map((b, i) => (
        <BuildingMesh key={`modern-${i}`} {...b} />
      ))}

      {/* 6. Interactive 3D Civic Hotspot Beacons */}
      {JODHPUR_3D_HOTSPOTS.map((hotspot) => (
        <HolographicBeacon
          key={hotspot.id}
          hotspot={hotspot}
          isSelected={selectedHotspot?.id === hotspot.id}
          onClick={() => onSelectHotspot(hotspot)}
        />
      ))}
    </group>
  );
}

export function CityscapeCanvas({ className = "" }: { className?: string }) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot3D>(JODHPUR_3D_HOTSPOTS[1]); // Default Ratanada
  const [autoRotate, setAutoRotate] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className={`relative h-[380px] w-full cursor-grab overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b ${
        nightMode ? "from-slate-950 via-slate-900 to-indigo-950" : "from-slate-900 via-slate-800 to-teal-950"
      } shadow-md active:cursor-grabbing sm:h-[440px] ${className}`}
    >
      <Canvas
        camera={{ position: [5.8, 5.0, 5.8], fov: 40 }}
        style={{ pointerEvents: "auto" }}
      >
        {/* Atmosphere & Lighting */}
        <ambientLight intensity={nightMode ? 0.35 : 0.85} color={nightMode ? "#1e1b4b" : "#e0f2fe"} />
        <directionalLight
          position={[7, 10, 5]}
          intensity={nightMode ? 0.8 : 1.8}
          color={nightMode ? "#93c5fd" : "#fef3c7"}
          castShadow
        />
        {/* Cybernetic Accent Rim Lights */}
        <pointLight position={[-4, 3, -4]} intensity={2.5} color="#06b6d4" distance={12} />
        <pointLight position={[0, 4, 0]} intensity={2.2} color="#0d9488" distance={9} />
        <pointLight position={[3, 2, 3]} intensity={1.8} color="#f59e0b" distance={8} />

        {/* Ambient floating data motes */}
        <Sparkles count={45} scale={8} size={2.5} speed={0.4} opacity={0.65} color="#38bdf8" />

        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
          <JodhpurDigitalTwinMesh
            selectedHotspot={selectedHotspot}
            onSelectHotspot={(h) => setSelectedHotspot(h)}
            autoRotate={autoRotate}
          />
        </Float>

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={4.5}
          maxDistance={13.5}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 6}
          enableDamping={true}
          dampingFactor={0.08}
        />
      </Canvas>

      {/* Top Floating HUD Badges */}
      <div className="pointer-events-auto absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/85 px-3 py-1.5 shadow-lg backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-black tracking-wide text-white">Jodhpur 3D Civic Twin</span>
          <span className="rounded-md bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300 ring-1 ring-cyan-500/30">
            Lidar Mesh Online
          </span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="pointer-events-auto absolute right-3 top-3 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          className={`flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 shadow-md backdrop-blur-md transition ${
            autoRotate ? "bg-cyan-600 text-white" : "bg-slate-900/80 text-slate-300 hover:text-white"
          }`}
          title={autoRotate ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
        >
          <RotateCcw size={15} className={autoRotate ? "animate-spin" : ""} />
        </button>
        <button
          type="button"
          onClick={() => setNightMode((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-slate-900/80 text-slate-300 shadow-md backdrop-blur-md transition hover:text-white"
          title={nightMode ? "Switch to Day Lighting" : "Switch to Night Cyber Lighting"}
        >
          {nightMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-cyan-300" />}
        </button>
        <button
          type="button"
          onClick={resetCamera}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-slate-900/80 text-slate-300 shadow-md backdrop-blur-md transition hover:text-white"
          title="Reset Camera Angle"
        >
          <Compass size={15} />
        </button>
      </div>

      {/* Bottom Floating Hotspot Info Overlay */}
      <div className="pointer-events-auto absolute bottom-3 left-3 right-3 z-10 space-y-2">
        {selectedHotspot && (
          <div className="rounded-2xl border border-white/20 bg-slate-900/90 p-3 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md ring-1 ring-white/20"
                  style={{ backgroundColor: selectedHotspot.color }}
                >
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="truncate text-xs sm:text-sm font-extrabold text-white">
                      {selectedHotspot.name}
                    </p>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
                      style={{ backgroundColor: selectedHotspot.color }}
                    >
                      {selectedHotspot.status}
                    </span>
                    <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-300">
                      3D Beacon Active
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1 mt-0.5">
                    {selectedHotspot.caseTitle}
                  </p>
                  <p className="text-[11px] text-teal-300 font-medium line-clamp-1">
                    Squad: <strong>{selectedHotspot.squad}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Link
                  href="/university/reports"
                  className="inline-flex items-center gap-1 rounded-xl bg-teal-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-teal-400"
                >
                  View Case Report →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3D Hotspot Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/15 bg-slate-900/80 p-1.5 shadow-lg backdrop-blur-md scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 pl-1 text-[11px] font-bold text-slate-300">
            <Navigation size={12} className="text-cyan-400" /> 3D Landmarks:
          </span>
          {JODHPUR_3D_HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setSelectedHotspot(hotspot)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-white text-slate-950 shadow-sm font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: hotspot.color }}
                />
                <span className="truncate max-w-[130px] sm:max-w-none">{hotspot.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}