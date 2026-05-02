import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSwarm = (props) => {
  const ref = useRef();
  
  // THE FIX: Reduced from 3000 to 800 particles (2400 array length). 
  // Spread radius increased to 2.5 so it's not a crowded ball of dust.
  const sphere = random.inSphere(new Float32Array(2400), { radius: 2.5 });

  useFrame((state, delta) => {
    // Ultra-smooth, slow drifting rotation
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 40;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        {/* THE FIX: Subtly tinted tech-blue color (#a8c7fa), lowered opacity, slightly larger size */}
        <PointMaterial 
          transparent 
          color="#a8c7fa" 
          size={0.008} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.5} 
        />
      </Points>
    </group>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 1.2] }}>
          <ParticleSwarm />
        </Canvas>
      </Suspense>
    </div>
  );
};