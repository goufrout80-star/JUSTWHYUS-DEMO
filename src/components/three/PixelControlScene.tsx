'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function PixelCore() {
  const groupRef = useRef<THREE.Group>(null);
  
  const blocks = useMemo(() => {
    const positions: [number, number, number, number][] = [];
    const gridSize = 3;
    const spacing = 0.5;
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        for (let z = -gridSize; z <= gridSize; z++) {
          const dist = Math.sqrt(x * x + y * y + z * z);
          if (dist <= gridSize && Math.random() > 0.6) {
            const scale = 0.15 + Math.random() * 0.15;
            positions.push([x * spacing, y * spacing, z * spacing, scale]);
          }
        }
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {blocks.map((pos, i) => (
          <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
            <boxGeometry args={[pos[3], pos[3], pos[3]]} />
            <meshStandardMaterial
              color={i % 7 === 0 ? '#4ade80' : '#fafafa'}
              metalness={0.3}
              roughness={0.4}
              emissive={i % 7 === 0 ? '#4ade80' : '#000000'}
              emissiveIntensity={i % 7 === 0 ? 0.3 : 0}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4ade80" />
      
      <PixelCore />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      <Environment preset="city" />
    </>
  );
}

interface PixelControlSceneProps {
  className?: string;
}

export function PixelControlScene({ className }: PixelControlSceneProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isDesktop && !prefersReducedMotion) {
      setShouldRender(true);
      setShowFallback(false);
    }

    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      const nowPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldRender(isNowDesktop && !nowPrefersReducedMotion);
      setShowFallback(!isNowDesktop || nowPrefersReducedMotion);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={className}>
      {showFallback && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[var(--jwus-surface)] to-[var(--jwus-bg)] rounded-[var(--radius-panel)]"
          style={{
            backgroundImage: 'url(/posters/pixel-core.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[var(--jwus-bg)]/60" />
        </div>
      )}
      
      {shouldRender && (
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
