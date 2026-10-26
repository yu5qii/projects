'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';

interface MediaNoiseParticlesProps {
  count?: number;
}

export const MediaNoiseParticles: React.FC<MediaNoiseParticlesProps> = ({ count = 300 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f0ff');
    const magenta = new THREE.Color('#ff2a6d');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Scatter randomly across a 3D volume
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      // Color selection
      const rand = Math.random();
      const chosenColor = rand < 0.45 ? cyan : rand < 0.9 ? magenta : white;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Faster swirl and drift during kinetic analysis
    const speed = isAnalyzing ? 0.3 : 0.05;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.z += delta * (speed * 0.5);

    // Subtle breathing displacement
    const time = state.clock.elapsedTime;
    pointsRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={isAnalyzing ? 0.85 : 0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
