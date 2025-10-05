import * as THREE from 'three'

// Create a 4-pointed star shape
export function createStarGeometry(size = 1) {
  const shape = new THREE.Shape()
  const points = []
  const spikes = 4
  const outerRadius = size
  const innerRadius = size * 0.4
  
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (Math.PI / spikes) * i
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    
    if (i === 0) {
      shape.moveTo(x, y)
    } else {
      shape.lineTo(x, y)
    }
  }
  shape.closePath()
  
  const extrudeSettings = {
    depth: size * 0.2,
    bevelEnabled: false
  }
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}
