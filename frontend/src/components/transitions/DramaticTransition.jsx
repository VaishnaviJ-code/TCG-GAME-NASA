import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CosmicBackground from '../ui/CosmicBackground'
import { useAudio } from '../../hooks/useAudio'

const DramaticTransition = () => {
  const { play } = useAudio()

  useEffect(() => {
    // Play wormhole sound when transition starts
    play('wormholeTravel')
  }, [play])

  return (
    <CosmicBackground isZooming={true} speed={2}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Center portal effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 3],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0.2) 30%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Traveling text */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 1.2]
            }}
            transition={{ 
              duration: 2.5,
              times: [0, 0.2, 0.7, 1],
              ease: "easeInOut"
            }}
            className="relative z-10 text-center"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4"
              style={{
                textShadow: '0 0 30px rgba(34, 211, 238, 0.5)',
              }}
            >
              Entering Hyperspace
            </motion.h2>
            
            <motion.div 
              className="flex justify-center space-x-2 text-cyan-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              >
                •
              </motion.span>
              <motion.span 
                className="text-3xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              >
                •
              </motion.span>
              <motion.span 
                className="text-3xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              >
                •
              </motion.span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Circular rings expanding */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-cyan-400/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 3, 6],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.2,
              ease: "easeOut",
              repeat: Infinity
            }}
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        ))}
      </div>
    </CosmicBackground>
  )
}

export default DramaticTransition
