'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { GlassShards } from './GlassShards';
import { MediaNoiseParticles } from './MediaNoiseParticles';
import styles from './Scene.module.scss';

// Camera controller that performs the kinetic zoom sequence on isAnalyzing state change
const KineticCameraRig: React.FC = () => {
  const { camera } = useThree();
  const cameraZoom = useAppStore((state) => state.cameraZoom);
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);

  const targetZ = useRef(7);

  useFrame((state, delta) => {
    // When analyzing, zoom in dynamically; otherwise remain at base distance
    const desiredZ = isAnalyzing ? 7 / Math.max(cameraZoom, 1.2) : 7;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, desiredZ, delta * 3.5);
    camera.position.z = targetZ.current;

    // Subtle breathing / organic drift
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.25;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const Scene: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const [particleMultiplier, setParticleMultiplier] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.canvasContainer} />;
  }

  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* PerformanceMonitor to gracefully scale down fidelity on low-end devices */}
        <PerformanceMonitor
          onIncline={() => {
            setDpr(2);
            setParticleMultiplier(1.2);
          }}
          onDecline={() => {
            setDpr(1);
            setParticleMultiplier(0.5);
          }}
        >
          {/* Kinetic Camera Rig */}
          <KineticCameraRig />

          {/* Opposing Ideological Lighting: Cyan (Left) vs Magenta (Right) */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 10, 5]} intensity={1.2} />

          {/* Left bias light (Electric Cyan) */}
          <pointLight
            position={[-5, 2, 2]}
            color="#00f0ff"
            intensity={2.5}
            distance={15}
          />

          {/* Right bias light (Acid Magenta) */}
          <pointLight
            position={[5, -2, 2]}
            color="#ff2a6d"
            intensity={2.5}
            distance={15}
          />

          {/* Center consensus clarifying light */}
          <pointLight
            position={[0, 0, 3]}
            color="#05ffa1"
            intensity={1.0}
            distance={10}
          />

          {/* Fractured Echo-Chamber Glass Shards */}
          <GlassShards count={Math.round(36 * particleMultiplier)} />

          {/* Floating Media Noise Cloud */}
          <MediaNoiseParticles count={Math.round(250 * particleMultiplier)} />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};
