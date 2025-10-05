import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'

export default function CardDeck({ cards = [] }) {
  const [flippedCards, setFlippedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [saved, setSaved] = useState(false)
  const [showLegendary, setShowLegendary] = useState(false)

  const playFlipSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDt3')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }

  const handleFlipCard = (index) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index])
      playFlipSound()
      
      if (cards[index].rarity === 'Legendary') {
        setShowLegendary(true)
        setTimeout(() => setShowLegendary(false), 3000)
      }
    }
  }

  const handleFlipAll = () => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        setFlippedCards(prev => {
          if (!prev.includes(index)) {
            playFlipSound()
            if (card.rarity === 'Legendary') {
              setTimeout(() => {
                setShowLegendary(true)
                setTimeout(() => setShowLegendary(false), 3000)
              }, 500)
            }
            return [...prev, index]
          }
          return prev
        })
      }, index * 250)
    })
  }

  const handleSaveCollection = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #000000, #1a0a2e, #000000)',
      overflow: 'auto'
    }}>
      {/* Stars Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: 'white',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '15px',
          background: 'linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          Your ExoPlanet Cards
        </h1>
        
        <p style={{
          color: '#9ca3af',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Click each card to reveal your discoveries
        </p>

        {/* Horizontal Scrollable Cards */}
        <div style={{
          width: '100%',
          maxWidth: '1300px',
          overflowX: 'auto',
          overflowY: 'hidden',
          marginBottom: '30px',
          padding: '10px 0'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            minWidth: 'fit-content',
            paddingLeft: '10px',
            paddingRight: '10px'
          }}>
            {cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                isFlipped={flippedCards.includes(index)}
                onFlip={() => handleFlipCard(index)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleFlipAll}
            disabled={flippedCards.length === cards.length}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              background: flippedCards.length === cards.length ? '#4b5563' : 'linear-gradient(to right, #2563eb, #9333ea)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: flippedCards.length === cards.length ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.5)'
            }}
          >
            {flippedCards.length === cards.length ? 'All Revealed' : 'Flip All Cards'}
          </button>

          <button
            onClick={handleSaveCollection}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #059669, #10b981)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.5)'
            }}
          >
            {saved ? 'Saved!' : 'Save to Collection'}
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ea580c, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.5)'
            }}
          >
            Open Another Pack
          </button>
        </div>

        <p style={{ color: '#6b7280', marginTop: '20px', fontSize: '14px' }}>
          {flippedCards.length} / {cards.length} cards revealed
        </p>
      </div>

      {/* LEGENDARY ANIMATION */}
      <AnimatePresence>
        {showLegendary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              pointerEvents: 'none'
            }}
          >
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #fbbf24, #f97316, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(251, 191, 36, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: '6px'
              }}
            >
              LEGENDARY
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
