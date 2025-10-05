import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import FoilPack from './FoilPack'
import PackExplosion from './PackExplosion'

export default function FoilPackScene({ onPackClick, isExploding, onExplosionComplete, onFlashTrigger }) {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={75} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            color="#ffffff"
            castShadow
          />
          <pointLight position={[-4, 2, 4]} intensity={1.2} color="#8b5cf6" />
          <pointLight position={[4, -2, 4]} intensity={1.2} color="#3b82f6" />
          
          {!isExploding && <FoilPack onClick={onPackClick} />}
          <PackExplosion 
            isActive={isExploding} 
            onComplete={onExplosionComplete}
            onFlashTrigger={onFlashTrigger}
          />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
