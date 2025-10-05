import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowDown, Rocket } from 'lucide-react'
import CosmicBackground from '../components/ui/CosmicBackground'
import MuteButton from '../components/ui/MuteButton'
import { useAudio } from '../hooks/useAudio'
import audioManager from '../utils/audioManager'

const LandingPage = ({ onStartExploring }) => {
  const { isMuted, toggleMute, playAmbient } = useAudio()
  const [audioInitialized, setAudioInitialized] = useState(false)

  useEffect(() => {
    // Initialize audio on first user interaction
    const initAudio = () => {
      if (!audioInitialized) {
        console.log('🎵 Initializing audio on user interaction...')
        audioManager.init()
        setAudioInitialized(true)
        
        // Try to play ambient music
        setTimeout(() => {
          if (!isMuted) {
            playAmbient()
          }
        }, 500)
      }
    }

    // Listen for ANY user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown']
    events.forEach(event => {
      document.addEventListener(event, initAudio, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, initAudio)
      })
    }
  }, [audioInitialized, isMuted, playAmbient])

  const handleMuteToggle = () => {
    console.log('🔊 Mute button clicked')
    
    // Initialize audio if not already done
    if (!audioInitialized) {
      audioManager.init()
      setAudioInitialized(true)
    }
    
    toggleMute()
  }

  return (
    <CosmicBackground isZooming={false} zoomIntensity="subtle">
      <MuteButton isMuted={isMuted} onToggle={handleMuteToggle} />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Audio Debug Info (remove later) */}
        <div className="fixed top-20 right-4 bg-black/50 text-white text-xs p-2 rounded z-50">
          <div>Audio: {audioInitialized ? '✅ Init' : '❌ Not Init'}</div>
          <div>Muted: {isMuted ? '🔇 Yes' : '🔊 No'}</div>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-12 max-w-4xl"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="mb-8"
          >
            <Rocket className="h-16 w-16 md:h-24 md:w-24 text-cyan-400 mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block mb-2">
              NASA ExoPlanet
            </span>
            <span className="text-white text-3xl md:text-5xl lg:text-6xl">Trading Card Game</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Discover worlds beyond our solar system
          </motion.p>

          <motion.p 
            className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            Each card reveals a real exoplanet discovered by NASA missions like Kepler, TESS, and Hubble Space Telescope
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.button 
              onClick={onStartExploring}
              className="group relative bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-8 py-4 md:px-12 md:py-6 rounded-xl font-bold text-xl md:text-2xl hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7" />
                <span>Start Exploring</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="h-6 w-6 md:h-7 md:w-7" />
                </motion.div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/40 transition-all duration-300"></div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mt-8"
        >
          <StatCard number="5,000+" label="Exoplanets Discovered" delay={0} />
          <StatCard number="5" label="Cards Per Pack" delay={0.1} />
          <StatCard number="∞" label="Cosmic Adventures" delay={0.2} />
        </motion.div>
      </div>
    </CosmicBackground>
  )
}

const StatCard = ({ number, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 2 + delay, duration: 0.5 }}
    className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all duration-300"
  >
    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{number}</div>
    <div className="text-gray-300 text-sm md:text-base">{label}</div>
  </motion.div>
)

export default LandingPage
