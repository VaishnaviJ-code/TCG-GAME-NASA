import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

const MuteButton = ({ isMuted, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 bg-black/30 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-black/50 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6 text-gray-400" />
      ) : (
        <Volume2 className="h-6 w-6 text-cyan-400" />
      )}
    </motion.button>
  )
}

export default MuteButton
