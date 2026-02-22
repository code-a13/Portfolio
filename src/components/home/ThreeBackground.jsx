import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSwarm = (props) => {
  const ref = useRef();
  
  const sphere = random.inSphere(new Float32Array(6000), { radius: 1.5 });
  // Rotate the sphere automatically
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};