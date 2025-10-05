import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const rarityConfig = {
  Legendary: {
    borderColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.8)',
    bgGradient: 'linear-gradient(135deg, #1a1410 0%, #2d1f10 50%, #1a1410 100%)',
    badgeColor: '#FFD700'
  },
  Epic: {
    borderColor: '#9333ea',
    glowColor: 'rgba(147, 51, 234, 0.8)',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1050 50%, #1a0a2e 100%)',
    badgeColor: '#c084fc'
  },
  Rare: {
    borderColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.8)',
    bgGradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a1628 100%)',
    badgeColor: '#60a5fa'
  },
  Common: {
    borderColor: '#6b7280',
    glowColor: 'rgba(107, 114, 128, 0.6)',
    bgGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
    badgeColor: '#9ca3af'
  }
}

export default function Card({ card, isFlipped, onFlip, delay = 0 }) {
  const [showAura, setShowAura] = useState(false)
  const rarity = card?.rarity || 'Common'
  const config = rarityConfig[rarity]

  const handleFlip = () => {
    if (!isFlipped) {
      onFlip()
      setShowAura(true)
      setTimeout(() => setShowAura(false), 1200)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {showAura && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              background: config.glowColor,
              filter: 'blur(30px)',
              zIndex: -1
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        style={{
          width: '240px',
          height: '360px',
          cursor: 'pointer',
          perspective: '1000px'
        }}
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* CARD FRONT - Mystery Planet (Shows First) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000',
              border: `3px solid ${config.borderColor}`,
              boxShadow: `0 0 20px ${config.glowColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d293444e-93d2-4212-b73c-7dc1849cdf97.png"
              alt="Mystery Card"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* CARD BACK - Planet Details (Revealed on Flip) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '12px',
              overflow: 'hidden',
              background: config.bgGradient,
              border: `3px solid ${config.borderColor}`,
              boxShadow: `0 0 25px ${config.glowColor}, inset 0 0 15px rgba(0,0,0,0.5)`
            }}
          >
            {/* Corner Accents */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '45px', height: '45px', opacity: 0.4 }} viewBox="0 0 45 45">
              <path d="M0,12 L0,0 L12,0 M0,12 L12,12 L12,0" stroke={config.borderColor} strokeWidth="2" fill="none"/>
            </svg>
            <svg style={{ position: 'absolute', top: 0, right: 0, width: '45px', height: '45px', opacity: 0.4 }} viewBox="0 0 45 45">
              <path d="M45,12 L45,0 L33,0 M45,12 L33,12 L33,0" stroke={config.borderColor} strokeWidth="2" fill="none"/>
            </svg>

            {/* Title Section */}
            <div style={{ padding: '10px 10px 6px', background: 'rgba(0,0,0,0.6)', position: 'relative' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '2px'
              }}>
                Exoplanet
              </h3>
              <p style={{
                fontSize: '9px',
                color: '#9ca3af',
                textAlign: 'center',
                letterSpacing: '0.5px'
              }}>
                Planet Card
              </p>

              {/* Rarity Badge */}
              <div style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                padding: '3px 8px',
                background: `linear-gradient(135deg, ${config.borderColor}, ${config.badgeColor})`,
                borderRadius: '10px',
                border: `1px solid ${config.borderColor}`,
                boxShadow: `0 0 8px ${config.glowColor}`
              }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff' }}>
                  {rarity}
                </span>
              </div>
            </div>

            {/* Planet Image */}
            <div style={{ position: 'relative', height: '150px', overflow: 'hidden', background: '#000' }}>
              <img 
                src={card?.planet?.image_url || 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d293444e-93d2-4212-b73c-7dc1849cdf97.png'}
                alt={card?.planet?.name || 'Mystery Planet'}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  opacity: 0.9
                }}
                onError={(e) => {
                  e.target.src = 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d293444e-93d2-4212-b73c-7dc1849cdf97.png'
                }}
              />
            </div>

            {/* Info Section */}
            <div style={{ padding: '10px', background: 'rgba(0,0,0,0.7)' }}>
              <h2 style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: config.badgeColor,
                marginBottom: '8px',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {card?.planet?.name}
              </h2>
              
              <div style={{ fontSize: '10px', color: '#d1d5db' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }}>
                  <span style={{ color: '#9ca3af' }}>Star:</span>
                  <span style={{ color: '#fff', fontWeight: '500', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card?.planet?.host_star}
                  </span>
                </div>
                
                {card?.planet?.radius && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }}>
                    <span style={{ color: '#9ca3af' }}>Radius:</span>
                    <span style={{ color: '#fff', fontWeight: '500' }}>{card.planet.radius} R⊕</span>
                  </div>
                )}
                
                {card?.planet?.discovery_year && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }}>
                    <span style={{ color: '#9ca3af' }}>Discovered:</span>
                    <span style={{ color: '#fff', fontWeight: '500' }}>{card.planet.discovery_year}</span>
                  </div>
                )}

                {card?.planet?.habitable !== undefined && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                    <span style={{ color: '#9ca3af' }}>Habitable:</span>
                    <span style={{ 
                      color: card.planet.habitable ? '#10b981' : '#ef4444', 
                      fontWeight: '600' 
                    }}>
                      {card.planet.habitable ? 'Yes' : 'No'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
