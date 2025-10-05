import React from 'react'
import Starfield3D from './Starfield3D'
import './CosmicBackground.css'

const CosmicBackground = ({ children, isZooming = false, speed = 0.5 }) => {
  return (
    <div className="cosmic-container">
      <Starfield3D speed={speed} isZooming={isZooming} />
      
      {/* Nebula effects */}
      <div className="nebula-overlay">
        <div className="nebula-1"></div>
        <div className="nebula-2"></div>
      </div>

      {/* Content */}
      <div className="cosmic-content">
        {children}
      </div>
    </div>
  )
}

export default CosmicBackground
