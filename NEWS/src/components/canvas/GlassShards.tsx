'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';

interface ShardData {
  // Chaotic state
  chaosPosition: THREE.Vector3;
  chaosRotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: THREE.Vector3;

  // Assembled crystal state (forming a unified faceted truth lens)
  assembledPosition: THREE.Vector3;
  assembledRotation: THREE.Euler;

  // Color & ideological tint
  color: THREE.Color;
}

interface GlassShardsProps {
  count?: number;
}

export const GlassShards: React.FC<GlassShardsProps> = ({ count = 36 }) => {
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const shardFormation = useAppStore((state) => state.shardFormation);
  const groupRef = useRef<THREE.Group>(null);

  // Precompute shard positions and target crystalline formation
  const shards = useMemo<ShardData[]>(() => {
    const data: ShardData[] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio for crystalline dodecahedron/icosahedron lattice

    for (let i = 0; i < count; i++) {
      // 1. Chaotic scattered positions in a wide sphere (echo chamber noise)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const r = 4.5 + Math.random() * 5.5; // Radius 4.5 to 10
      const phiAngle = Math.acos(2.0 * v - 1.0);

      const chaosX = r * Math.sin(phiAngle) * Math.cos(theta);
      const chaosY = r * Math.sin(phiAngle) * Math.sin(theta);
      const chaosZ = r * Math.cos(phiAngle) - 1.5;

      // 2. Assembled crystalline geometric lens (symmetrical polyhedron ring / truth crystal)
      const layer = i % 3; // 3 concentric crystal rings
      const angle = (i / (count / 3)) * Math.PI * 2;
      const crystalRadius = layer === 0 ? 1.4 : layer === 1 ? 2.2 : 2.8;
      const crystalZ = (layer - 1) * 0.45;

      const assembledX = Math.cos(angle) * crystalRadius;
      const assembledY = Math.sin(angle) * crystalRadius;
      const assembledZ = crystalZ + Math.sin(angle * 3) * 0.2;

      // Ideological bias coloring: alternate between cyan (left), magenta (right), and emerald (truth)
      let shardColor: THREE.Color;
      if (i % 3 === 0) {
        shardColor = new THREE.Color('#00f0ff'); // Cyan
      } else if (i % 3 === 1) {
        shardColor = new THREE.Color('#ff2a6d'); // Magenta
      } else {
        shardColor = new THREE.Color('#05ffa1'); // Emerald Neutral
      }

      data.push({
        chaosPosition: new THREE.Vector3(chaosX, chaosY, chaosZ),
        chaosRotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        scale: new THREE.Vector3(
          0.3 + Math.random() * 0.35,
          0.4 + Math.random() * 0.5,
          0.2 + Math.random() * 0.3
        ),
        assembledPosition: new THREE.Vector3(assembledX, assembledY, assembledZ),
        assembledRotation: new THREE.Euler(
          angle * 0.5,
          angle,
          Math.PI / 4
        ),
        color: shardColor,
      });
    }
    return data;
  }, [count]);

  // Mesh references for per-frame animation
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slowly rotate entire assembly for dynamic kinetic feel
    const isConverged = isAnalyzing || shardFormation === 'assembled' || shardFormation === 'converging';
    const rotationMultiplier = isConverged ? 0.35 : 0.08;
    groupRef.current.rotation.y += delta * rotationMultiplier;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;

    // Interpolation factor: snappy kinetic lerp
    const lerpSpeed = isAnalyzing ? 3.5 * delta : 2.0 * delta;

    shards.forEach((shard, idx) => {
      const mesh = meshRefs.current[idx];
      if (!mesh) return;

      const targetPos = isConverged ? shard.assembledPosition : shard.chaosPosition;
      const targetRot = isConverged ? shard.assembledRotation : shard.chaosRotation;

      // Lerp position toward target
      mesh.position.lerp(targetPos, Math.min(lerpSpeed, 1.0));

      // Organic tumbling in chaotic mode
      if (!isConverged) {
        mesh.rotation.x += shard.rotationSpeed.x;
        mesh.rotation.y += shard.rotationSpeed.y;
        mesh.rotation.z += shard.rotationSpeed.z;
      } else {
        // Forcefully snap to crystal rotation alignment
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRot.x, Math.min(lerpSpeed, 1.0));
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRot.y, Math.min(lerpSpeed, 1.0));
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, targetRot.z, Math.min(lerpSpeed, 1.0));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            meshRefs.current[idx] = el;
          }}
          position={shard.chaosPosition.clone()}
          rotation={shard.chaosRotation.clone()}
          scale={shard.scale.toArray()}
        >
          {/* Faceted sharp glass geometry: Octahedron / Tetrahedron */}
          {idx % 2 === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <tetrahedronGeometry args={[1.1, 0]} />
          )}
          <meshPhysicalMaterial
            color={shard.color}
            emissive={shard.color}
            emissiveIntensity={isAnalyzing ? 0.5 : 0.15}
            roughness={0.12}
            metalness={0.1}
            transmission={0.88}
            ior={1.52}
            thickness={1.2}
            transparent={true}
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
};
