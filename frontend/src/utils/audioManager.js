class AudioManager {
  constructor() {
    this.sounds = {}
    this.isMuted = false
    this.ambientMusic = null
    this.initialized = false
  }

  // Initialize audio context on user interaction
  init() {
    if (this.initialized) return
    
    console.log('🔊 Initializing Audio Manager...')
    
    // Space-themed sound effects
    this.loadSound('packageUnwrap', 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3') // Whoosh
    this.loadSound('cardFlip', 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3') // Sci-fi card flip
    this.loadSound('wormholeTravel', 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3') // Space travel
    this.loadSound('collectSuccess', 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3') // Success chime
    
    // Cosmic ambient - deep space drone
    this.loadAmbientMusic('https://assets.mixkit.co/active_storage/sfx/2997/2997-preview.mp3')

    // Inside the init() function, add:
  this.loadSound('explosion', 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')

    
    this.initialized = true
  }

  loadSound(name, url) {
    try {
      const audio = new Audio()
      audio.src = url
      audio.preload = 'auto'
      audio.volume = 0.4
      audio.crossOrigin = 'anonymous'
      
      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ Loaded: ${name}`)
      })
      
      audio.addEventListener('error', (e) => {
        console.error(`❌ Failed to load ${name}:`, e)
      })
      
      this.sounds[name] = audio
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error)
    }
  }

  loadAmbientMusic(url) {
    try {
      this.ambientMusic = new Audio()
      this.ambientMusic.src = url
      this.ambientMusic.loop = true
      this.ambientMusic.volume = 0.15 // Very subtle ambient
      this.ambientMusic.preload = 'auto'
      this.ambientMusic.crossOrigin = 'anonymous'
      
      this.ambientMusic.addEventListener('canplaythrough', () => {
        console.log('✅ Ambient music loaded')
      })
      
      this.ambientMusic.addEventListener('error', (e) => {
        console.error('❌ Failed to load ambient music:', e)
      })
    } catch (error) {
      console.error('Error loading ambient music:', error)
    }
  }

  play(soundName) {
    if (this.isMuted || !this.sounds[soundName]) {
      console.log(`🔇 Muted or sound not found: ${soundName}`)
      return
    }
    
    try {
      const sound = this.sounds[soundName]
      sound.currentTime = 0
      sound.play()
        .then(() => console.log(`🔊 Playing: ${soundName}`))
        .catch(err => console.error(`Failed to play ${soundName}:`, err))
    } catch (error) {
      console.error(`Error playing sound ${soundName}:`, error)
    }
  }

  playAmbient() {
    if (this.isMuted || !this.ambientMusic) {
      console.log('🔇 Ambient music muted or not loaded')
      return
    }
    
    try {
      this.ambientMusic.play()
        .then(() => console.log('🔊 Ambient music playing'))
        .catch(err => {
          console.error('Failed to play ambient music:', err)
          // Retry once after a short delay
          setTimeout(() => {
            this.ambientMusic.play().catch(e => console.error('Retry failed:', e))
          }, 1000)
        })
    } catch (error) {
      console.error('Error playing ambient music:', error)
    }
  }

  stopAmbient() {
    if (this.ambientMusic) {
      this.ambientMusic.pause()
      this.ambientMusic.currentTime = 0
      console.log('⏹️ Ambient music stopped')
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    console.log(`🔊 Mute toggled: ${this.isMuted ? 'MUTED' : 'UNMUTED'}`)
    
    if (this.isMuted) {
      this.stopAmbient()
      Object.values(this.sounds).forEach(sound => {
        sound.pause()
      })
    }
    
    return this.isMuted
  }

  setMuted(muted) {
    this.isMuted = muted
    console.log(`🔊 Set muted: ${muted}`)
    if (muted) {
      this.stopAmbient()
    }
  }
}

// Singleton instance
const audioManager = new AudioManager()

export default audioManager
