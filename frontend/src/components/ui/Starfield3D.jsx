import React, { useEffect, useRef } from 'react'

const Starfield3D = ({ speed = 0.5, isZooming = false }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    // Star class for 3D effect
    class Star {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 2
        this.y = (Math.random() - 0.5) * height * 2
        this.z = Math.random() * 1500 + 500
        this.prevZ = this.z
      }

      update(speed) {
        this.prevZ = this.z
        this.z -= speed
        
        if (this.z <= 1) {
          this.reset()
        }
      }

      draw(ctx, width, height) {
        const sx = (this.x / this.z) * 300 + width / 2
        const sy = (this.y / this.z) * 300 + height / 2
        
        const px = (this.x / this.prevZ) * 300 + width / 2
        const py = (this.y / this.prevZ) * 300 + height / 2

        // Calculate size based on depth
        const size = (1 - this.z / 2000) * 2

        // Calculate opacity based on depth
        const opacity = 1 - this.z / 2000

        // Star color with slight variation
        const hue = 200 + Math.random() * 60 // Blue to cyan range
        
        // Draw trail for motion blur
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.5})`
        ctx.lineWidth = size
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()

        // Draw star point
        ctx.beginPath()
        ctx.fillStyle = `hsla(${hue}, 90%, 80%, ${opacity})`
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize stars
    const starCount = window.innerWidth < 768 ? 300 : 600 // Fewer stars on mobile
    starsRef.current = Array.from({ length: starCount }, () => new Star())

    // Animation loop
    let currentSpeed = speed
    const animate = () => {
      // Fade effect instead of clearing
      ctx.fillStyle = 'rgba(10, 10, 15, 0.3)'
      ctx.fillRect(0, 0, width, height)

      // Update and draw stars
      starsRef.current.forEach(star => {
        star.update(currentSpeed)
        star.draw(ctx, width, height)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    // Update speed when zooming changes
    if (isZooming) {
      currentSpeed = 15 // Fast zoom
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed, isZooming])

  // Gradually increase speed when zooming
  useEffect(() => {
    if (!canvasRef.current || !starsRef.current.length) return

    if (isZooming) {
      let zoomSpeed = speed
      const interval = setInterval(() => {
        zoomSpeed += 2
        if (zoomSpeed >= 30) {
          clearInterval(interval)
        }
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isZooming, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0f2e 25%, #0f1b3d 50%, #0d2847 75%, #0a0e1a 100%)' }}
    />
  )
}

export default Starfield3D
