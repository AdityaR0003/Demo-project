import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function FloatingObject({ position, color, shape, speed = 1, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4 * speed;
      meshRef.current.rotation.y += delta * 0.6 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {shape === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 100]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.9, 32, 32]} />}
        {shape === 'cube' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

const ThreeInteractiveScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-85">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} color="#883ca6" intensity={1} />
        <pointLight position={[5, -5, 5]} color="#a80054" intensity={0.8} />

        <FloatingObject position={[-2.5, 1.8, 0]} color="#0040df" shape="torus" scale={0.7} speed={1.2} />
        <FloatingObject position={[2.8, -1.2, -1]} color="#883ca6" shape="octahedron" scale={0.8} speed={0.9} />
        <FloatingObject position={[2.2, 2.2, -2]} color="#a80054" shape="sphere" scale={0.65} speed={1.4} />
        <FloatingObject position={[-2.2, -2.0, -1.5]} color="#2d5bff" shape="cube" scale={0.6} speed={1.1} />
      </Canvas>
    </div>
  );
};

export default ThreeInteractiveScene;
