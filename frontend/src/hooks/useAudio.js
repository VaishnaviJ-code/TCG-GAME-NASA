import { useState, useEffect } from 'react'
import audioManager from '../utils/audioManager'

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('audio-muted')
    return saved === 'true'
  })

  useEffect(() => {
    audioManager.setMuted(isMuted)
    localStorage.setItem('audio-muted', isMuted)
  }, [isMuted])

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    audioManager.setMuted(newMutedState)
    
    // If unmuting, try to play ambient
    if (!newMutedState) {
      audioManager.playAmbient()
    } else {
      audioManager.stopAmbient()
    }
  }

  const play = (soundName) => {
    if (!isMuted) {
      audioManager.play(soundName)
    }
  }

  const playAmbient = () => {
    if (!isMuted) {
      audioManager.playAmbient()
    }
  }

  const stopAmbient = () => {
    audioManager.stopAmbient()
  }

  return {
    isMuted,
    toggleMute,
    play,
    playAmbient,
    stopAmbient
  }
}
