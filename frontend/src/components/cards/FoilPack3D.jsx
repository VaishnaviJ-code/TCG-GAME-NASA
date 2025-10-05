import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshStandardMaterial, DoubleSide } from 'three'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

function FoilPackMesh({ onClick }) {
  const meshRef = useRef()

  // Animate rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Holographic iridescent material
  const holographicMaterial = new MeshStandardMaterial({
    color: '#ffffff',
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2,
    side: DoubleSide
  })

  return (
    <group ref={meshRef} onClick={onClick}>
      {/* Main pack body */}
      <mesh position={[0, 0, 0.15]}>
        <boxGeometry args={[2.8, 4.2, 0.3]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={3}
        />
      </mesh>

      {/* Front foil layer with serrated edges */}
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[2.7, 4.1]} />
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={1}
          roughness={0.02}
          envMapIntensity={5}
          side={DoubleSide}
        >
          <primitive 
            attach="map" 
            object={createHolographicTexture()} 
          />
        </meshStandardMaterial>
      </mesh>

      {/* Back layer */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.7, 4.1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Serrated top edge */}
      {createSerratedEdge(2.7, 0.15, [0, 2.05, 0.15], 'horizontal')}
      
      {/* Serrated bottom edge */}
      {createSerratedEdge(2.7, 0.15, [0, -2.05, 0.15], 'horizontal')}
    </group>
  )
}

// Create serrated edge geometry
function createSerratedEdge(width, height, position, orientation) {
  const points = []
  const segments = 30
  const amplitude = 0.05

  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width - width / 2
    const y = i % 2 === 0 ? 0 : amplitude
    points.push(new THREE.Vector3(x, y, 0))
  }

  return (
    <mesh position={position} rotation={orientation === 'vertical' ? [0, 0, Math.PI / 2] : [0, 0, 0]}>
      <extrudeGeometry args={[new THREE.Shape(points), { depth: 0.3, bevelEnabled: false }]} />
      <meshStandardMaterial
        color="#6b21a8"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Create holographic texture
function createHolographicTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Rainbow gradient
  const gradient = ctx.createLinearGradient(0, 0, 512, 512)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(0.2, '#764ba2')
  gradient.addColorStop(0.4, '#f093fb')
  gradient.addColorStop(0.6, '#4facfe')
  gradient.addColorStop(0.8, '#00f2fe')
  gradient.addColorStop(1, '#667eea')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)

  // Add noise/sparkle
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const size = Math.random() * 3
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8})`
    ctx.fillRect(x, y, size, size)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function FoilPack3D({ onOpen }) {
  return (
    <div className="w-full h-[500px] cursor-pointer" onClick={onOpen}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d9ff" />
        
        <FoilPackMesh onClick={onOpen} />
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
