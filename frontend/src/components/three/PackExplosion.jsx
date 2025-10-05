import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createStarGeometry } from './StarGeometry'

export default function PackExplosion({ isActive, onComplete, onFlashTrigger }) {
  const groupRef = useRef()
  const particlesRef = useRef([])
  const startTime = useRef(0)
  const flashTriggered = useRef(false)
  
  // MASSIVE 3000 STAR EXPLOSION
  const particles = useMemo(() => {
    const temp = []
    const starGeometry = createStarGeometry(0.15)
    
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = Math.random() * 2.5 + 1.0
      
      temp.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        size: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.3 
          ? new THREE.Color(0xffd700)
          : new THREE.Color(0xffffff),
        life: 1.0,
        delay: Math.random() * 0.08,
        geometry: starGeometry
      })
    }
    return temp
  }, [])
  
  useEffect(() => {
    if (isActive) {
      startTime.current = Date.now()
      flashTriggered.current = false
      console.log('⭐ 3000 STAR EXPLOSION!')
    }
  }, [isActive])
  
  useFrame(() => {
    if (!isActive || !groupRef.current) return
    
    const elapsed = (Date.now() - startTime.current) / 1000
    
    // Trigger flash IMMEDIATELY at 0.1 seconds (pack just exploded)
    if (elapsed > 0.1 && !flashTriggered.current && onFlashTrigger) {
      flashTriggered.current = true
      onFlashTrigger()
      console.log('💥 IMMEDIATE FLASH!')
    }
    
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return
      
      const particle = particles[i]
      
      if (elapsed < particle.delay) return
      
      // Move particles
      particle.position.add(particle.velocity)
      mesh.position.copy(particle.position)
      
      // Gravity
      particle.velocity.y -= 0.015
      
      // Slight drag
      particle.velocity.multiplyScalar(0.98)
      
      // 3D Rotation
      mesh.rotation.x += particle.rotationSpeed.x * 0.1
      mesh.rotation.y += particle.rotationSpeed.y * 0.1
      mesh.rotation.z += particle.rotationSpeed.z * 0.1
      
      // Fade out
      particle.life -= 0.004
      mesh.material.opacity = Math.max(0, particle.life)
      
      // Scale
      const scale = particle.size * Math.pow(particle.life, 0.5)
      mesh.scale.setScalar(scale)
    })
    
    // Complete after 2.5 seconds
    if (elapsed > 2.5 && onComplete) {
      console.log('✅ Explosion complete!')
      onComplete()
    }
  })
  
  if (!isActive) return null
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          position={particle.position}
          geometry={particle.geometry}
        >
          <meshStandardMaterial
            color={particle.color}
            transparent
            opacity={1}
            emissive={particle.color}
            emissiveIntensity={2.0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}
