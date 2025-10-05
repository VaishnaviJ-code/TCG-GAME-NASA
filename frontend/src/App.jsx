import { useState } from 'react'
import CardPackage from './components/cards/CardPackage'
import CardDeck from './components/cards/CardDeck'

const mockCards = [
  {
    id: 1,
    rarity: 'Legendary',
    attack_power: 18,
    defense_power: 15,
    planet: { 
      name: 'Kepler-22b', 
      host_star: 'Kepler-22', 
      radius: 2.4, 
      discovery_year: 2011,
      habitable: true,
      image_url: 'https://exoplanets.nasa.gov/system/resources/detail_files/326_26_kepler22b_update.jpg'
    }
  },
  {
    id: 2,
    rarity: 'Epic',
    attack_power: 14,
    defense_power: 12,
    planet: { 
      name: 'Proxima Centauri b', 
      host_star: 'Proxima Centauri', 
      radius: 1.07, 
      discovery_year: 2016,
      habitable: true,
      image_url: 'https://exoplanets.nasa.gov/system/resources/detail_files/1348_PIA19832.jpg'
    }
  },
  {
    id: 3,
    rarity: 'Rare',
    attack_power: 11,
    defense_power: 10,
    planet: { 
      name: 'TRAPPIST-1e', 
      host_star: 'TRAPPIST-1', 
      radius: 0.92, 
      discovery_year: 2017,
      habitable: true,
      image_url: 'https://exoplanets.nasa.gov/system/resources/detail_files/1576_PIA21422.jpg'
    }
  },
  {
    id: 4,
    rarity: 'Rare',
    attack_power: 12,
    defense_power: 9,
    planet: { 
      name: 'HD 189733 b', 
      host_star: 'HD 189733', 
      radius: 1.138, 
      discovery_year: 2005,
      habitable: false,
      image_url: 'https://exoplanets.nasa.gov/system/resources/detail_files/280_blue_marble_01.jpg'
    }
  },
  {
    id: 5,
    rarity: 'Common',
    attack_power: 8,
    defense_power: 7,
    planet: { 
      name: '51 Pegasi b', 
      host_star: '51 Pegasi', 
      radius: 1.9, 
      discovery_year: 1995,
      habitable: false,
      image_url: 'https://exoplanets.nasa.gov/system/resources/detail_files/1354_PIA20482.jpg'
    }
  }
]


function App() {
  const [showDeck, setShowDeck] = useState(false)

  console.log('App rendering, showDeck:', showDeck)

  if (showDeck) {
    return <CardDeck cards={mockCards} />
  }

  return <CardPackage onOpen={() => {
    console.log('Open button clicked!')
    setShowDeck(true)
  }} />
}

export default App
