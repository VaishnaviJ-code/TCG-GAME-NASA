import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CosmicBackground from '../ui/CosmicBackground'
import FoilPackScene from '../three/FoilPackScene'
import { useAudio } from '../../hooks/useAudio'

const CardPackage = ({ onOpen }) => {
  const [isExploding, setIsExploding] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const { play } = useAudio()

  const handleOpen = () => {
    console.log('🎴 Opening pack...')
    setIsExploding(true)
    play('packageUnwrap')
  }

  const handleFlashTrigger = () => {
    console.log('💥 INSTANT FLASH!')
    setShowFlash(true)
  }

  const handleExplosionComplete = () => {
    console.log('✅ Transitioning to deck...')
    setTimeout(() => {
      onOpen()
    }, 300)
  }

  return (
    <CosmicBackground speed={0.5}>
      <div className="fixed inset-0 z-20">
        <AnimatePresence>
          <>
            {/* QUICK BRIGHT FLASH - happens immediately */}
            {showFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 0] }}
                transition={{ 
                  duration: 0.6, 
                  times: [0, 0.15, 0.4, 1],
                  ease: "easeOut"
                }}
                className="fixed inset-0 bg-white z-50 pointer-events-none"
              />
            )}

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-12 left-0 right-0 z-30 text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ExoPlanet Card Pack
                </span>
              </h1>
            </motion.div>

            {/* FULL SCREEN 3D Canvas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <FoilPackScene 
                onPackClick={isExploding ? null : handleOpen}
                isExploding={isExploding}
                onExplosionComplete={handleExplosionComplete}
                onFlashTrigger={handleFlashTrigger}
              />
            </motion.div>

            {/* Open Pack Button */}
            {!isExploding && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 left-0 right-0 z-30 flex flex-col items-center"
              >
                <motion.button
                  onClick={handleOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(59, 130, 246, 0.6)',
                        '0 0 50px rgba(147, 51, 234, 0.7)',
                        '0 0 30px rgba(59, 130, 246, 0.6)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white text-2xl md:text-3xl font-bold px-12 py-5 rounded-full border-4 border-cyan-400/50"
                  >
                    Open Pack
                  </motion.div>
                </motion.button>

                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-gray-400 text-sm mt-4"
                >
                  Click the pack or button to open
                </motion.p>
              </motion.div>
            )}
          </>
        </AnimatePresence>
      </div>
    </CosmicBackground>
  )
}

export default CardPackage
