import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FoilPack({ onClick, isExploding }) {
  const packRef = useRef()
  const materialRef = useRef()
  
  // Rotation animation
  useFrame((state) => {
    if (!packRef.current || isExploding) return
    
    packRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
    packRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06
    packRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  
  // Explosion animation
  useFrame(() => {
    if (!packRef.current || !isExploding) return
    
    // Shake and scale down rapidly
    packRef.current.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), 0.1)
    packRef.current.rotation.x += 0.3
    packRef.current.rotation.y += 0.4
  })
  
  const shaderMaterial = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
        
        float wave1 = sin(vUv.x * 8.0 + uTime * 0.5) * 0.5 + 0.5;
        float wave2 = sin(vUv.y * 12.0 - uTime * 0.3) * 0.5 + 0.5;
        
        vec3 color1 = vec3(0.545, 0.361, 0.961);
        vec3 color2 = vec3(0.231, 0.510, 0.961);
        vec3 color3 = vec3(0.129, 0.831, 0.988);
        vec3 color4 = vec3(0.925, 0.282, 0.573);
        
        vec3 color = mix(color1, color2, wave1);
        color = mix(color, color3, wave2);
        color = mix(color, color4, sin(vUv.x * vUv.y * 20.0 + uTime) * 0.5 + 0.5);
        
        float wrinkle = sin(vUv.x * 40.0) * sin(vUv.y * 40.0) * 0.15 + 0.85;
        color *= wrinkle;
        
        float shimmer = sin(vUv.x * 25.0 + vUv.y * 25.0 + uTime * 2.0) * 0.3 + 0.7;
        color *= shimmer;
        
        float highlight = pow(max(dot(viewDir, vNormal), 0.0), 8.0);
        color += vec3(1.0) * highlight * 0.6;
        
        color += vec3(0.8, 0.9, 1.0) * fresnel * 0.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [])
  
  if (isExploding) {
    return null // Hide pack when exploding
  }
  
  return (
    <group ref={packRef} onClick={onClick}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.8, 4.2, 0.8]} />
        <shaderMaterial
          ref={materialRef}
          {...shaderMaterial}
          side={THREE.FrontSide}
        />
      </mesh>
      
      <mesh position={[0, 0, -0.41]} receiveShadow>
        <planeGeometry args={[2.8, 4.2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.3}
          side={THREE.FrontSide}
        />
      </mesh>
      
      {[...Array(14)].map((_, i) => (
        <mesh
          key={`top-${i}`}
          position={[-1.4 + (i * 0.2), 2.15, 0]}
        >
          <coneGeometry args={[0.08, 0.15, 4]} />
          <meshStandardMaterial
            color="#6b21a8"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
      
      {[...Array(14)].map((_, i) => (
        <mesh
          key={`bottom-${i}`}
          position={[-1.4 + (i * 0.2), -2.15, 0]}
          rotation={[0, 0, Math.PI]}
        >
          <coneGeometry args={[0.08, 0.15, 4]} />
          <meshStandardMaterial
            color="#6b21a8"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}
