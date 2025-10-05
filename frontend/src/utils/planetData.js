export const PLANET_DATABASE = [
  {
    id: 1,
    name: 'Kepler-452b',
    type: 'Super-Earth',
    distance: '1,400 light-years',
    radius: '1.6 Earth radii',
    mass: '5 Earth masses',
    temperature: '265 K (-8°C)',
    habitability: 'high',
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    telescope: 'Kepler Space Telescope',
    hostStar: 'Kepler-452',
    orbitalPeriod: '385 days',
    starType: 'G-type (Sun-like)',
    description: 'Often called "Earth\'s cousin," this planet orbits in the habitable zone of a Sun-like star. It has the potential for liquid water on its surface.',
    earthComparison: {
      size: '60% larger than Earth',
      gravity: '2x Earth gravity',
      year: 'Similar to Earth (385 days)',
      temperature: 'Slightly warmer than Earth'
    },
    funFact: 'First near-Earth-size planet found in the habitable zone of a Sun-like star',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/kepler452b-1041.jpg'
  },
  {
    id: 2,
    name: 'TRAPPIST-1e',
    type: 'Rocky Planet',
    distance: '40 light-years',
    radius: '0.92 Earth radii',
    mass: '0.77 Earth masses',
    temperature: '246 K (-27°C)',
    habitability: 'high',
    discoveryYear: 2017,
    discoveryMethod: 'Transit',
    telescope: 'Spitzer Space Telescope',
    hostStar: 'TRAPPIST-1',
    orbitalPeriod: '6.1 days',
    starType: 'Ultra-cool dwarf star',
    description: 'One of seven Earth-sized planets orbiting TRAPPIST-1. It is the most likely to have liquid water and potentially harbor life.',
    earthComparison: {
      size: 'Similar to Earth',
      gravity: 'Similar to Earth',
      year: 'Much shorter (6 days)',
      temperature: 'Cooler than Earth'
    },
    funFact: 'Part of the most Earth-sized planets found in a single system',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/06/trappist1e-pia21421-1041.jpg'
  },
  {
    id: 3,
    name: 'Proxima Centauri b',
    type: 'Rocky Planet',
    distance: '4.24 light-years',
    radius: '1.07 Earth radii',
    mass: '1.27 Earth masses',
    temperature: '234 K (-39°C)',
    habitability: 'medium',
    discoveryYear: 2016,
    discoveryMethod: 'Radial Velocity',
    telescope: 'European Southern Observatory',
    hostStar: 'Proxima Centauri',
    orbitalPeriod: '11.2 days',
    starType: 'Red dwarf',
    description: 'The closest known exoplanet to Earth! It orbits in the habitable zone of Proxima Centauri, our nearest stellar neighbor.',
    earthComparison: {
      size: 'Slightly larger than Earth',
      gravity: 'Slightly stronger',
      year: 'Very short (11 days)',
      temperature: 'Much colder than Earth'
    },
    funFact: 'The closest exoplanet to our solar system - just 4.24 light-years away!',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/06/proxima-b-1041.jpg'
  },
  {
    id: 4,
    name: 'TOI-715 b',
    type: 'Super-Earth',
    distance: '137 light-years',
    radius: '1.55 Earth radii',
    mass: '3.02 Earth masses',
    temperature: '280 K (7°C)',
    habitability: 'high',
    discoveryYear: 2024,
    discoveryMethod: 'Transit',
    telescope: 'TESS (Transiting Exoplanet Survey Satellite)',
    hostStar: 'TOI-715',
    orbitalPeriod: '19.3 days',
    starType: 'Red dwarf',
    description: 'A newly discovered super-Earth in the conservative habitable zone. One of the most promising candidates for follow-up observations.',
    earthComparison: {
      size: '55% larger than Earth',
      gravity: 'Stronger than Earth',
      year: 'Short (19 days)',
      temperature: 'Similar to Earth\'s temperate zones'
    },
    funFact: 'One of the newest habitable zone discoveries by TESS',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/01/toi-700-e-1041.jpg'
  },
  {
    id: 5,
    name: 'K2-18 b',
    type: 'Sub-Neptune',
    distance: '124 light-years',
    radius: '2.6 Earth radii',
    mass: '8.6 Earth masses',
    temperature: '279 K (6°C)',
    habitability: 'medium',
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    telescope: 'Kepler Space Telescope (K2)',
    hostStar: 'K2-18',
    orbitalPeriod: '33 days',
    starType: 'Red dwarf',
    description: 'Water vapor detected in its atmosphere! This mini-Neptune orbits in the habitable zone and could have liquid water clouds.',
    earthComparison: {
      size: 'Much larger than Earth',
      gravity: 'Much stronger',
      year: 'About 1 month',
      temperature: 'Similar to Earth'
    },
    funFact: 'First planet with confirmed water vapor in the habitable zone',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/k2-18b-1041.jpg'
  },
  {
    id: 6,
    name: 'HD 40307 g',
    type: 'Super-Earth',
    distance: '42 light-years',
    radius: '2.4 Earth radii',
    mass: '7.1 Earth masses',
    temperature: '260 K (-13°C)',
    habitability: 'high',
    discoveryYear: 2012,
    discoveryMethod: 'Radial Velocity',
    telescope: 'HARPS Spectrograph',
    hostStar: 'HD 40307',
    orbitalPeriod: '197 days',
    starType: 'K-type dwarf',
    description: 'A potentially habitable super-Earth with a relatively long orbital period, allowing for stable seasons.',
    earthComparison: {
      size: 'More than twice Earth\'s size',
      gravity: 'Much stronger',
      year: 'About half Earth\'s year',
      temperature: 'Slightly colder than Earth'
    },
    funFact: 'Located in a system with 6 planets',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/superearth-1041.jpg'
  },
  {
    id: 7,
    name: 'Gliese 667 Cc',
    type: 'Super-Earth',
    distance: '24 light-years',
    radius: '1.54 Earth radii',
    mass: '3.8 Earth masses',
    temperature: '277 K (4°C)',
    habitability: 'high',
    discoveryYear: 2011,
    discoveryMethod: 'Radial Velocity',
    telescope: 'HARPS Spectrograph',
    hostStar: 'Gliese 667 C',
    orbitalPeriod: '28 days',
    starType: 'Red dwarf',
    description: 'Receives about 90% of the light Earth gets from the Sun, making it a strong candidate for habitability.',
    earthComparison: {
      size: '54% larger than Earth',
      gravity: 'Stronger than Earth',
      year: 'About 1 month',
      temperature: 'Cool but potentially habitable'
    },
    funFact: 'Orbits a red dwarf in a triple star system',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/gliese-667cc-1041.jpg'
  },
  {
    id: 8,
    name: 'Kepler-438b',
    type: 'Rocky Planet',
    distance: '470 light-years',
    radius: '1.12 Earth radii',
    mass: '1.46 Earth masses',
    temperature: '276 K (3°C)',
    habitability: 'high',
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    telescope: 'Kepler Space Telescope',
    hostStar: 'Kepler-438',
    orbitalPeriod: '35.2 days',
    starType: 'Red dwarf',
    description: 'Has an 88% Earth Similarity Index - one of the most Earth-like planets discovered.',
    earthComparison: {
      size: 'Slightly larger than Earth',
      gravity: 'Similar to Earth',
      year: 'About 1 month',
      temperature: 'Similar to Earth\'s cool zones'
    },
    funFact: 'One of the highest Earth Similarity Index scores',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/kepler438b-1041.jpg'
  },
  {
    id: 9,
    name: 'LHS 1140 b',
    type: 'Super-Earth',
    distance: '40 light-years',
    radius: '1.7 Earth radii',
    mass: '6.6 Earth masses',
    temperature: '230 K (-43°C)',
    habitability: 'high',
    discoveryYear: 2017,
    discoveryMethod: 'Transit',
    telescope: 'MEarth Project',
    hostStar: 'LHS 1140',
    orbitalPeriod: '24.7 days',
    starType: 'Red dwarf',
    description: 'Considered one of the best candidates for atmospheric study. May be a water world.',
    earthComparison: {
      size: '70% larger than Earth',
      gravity: 'Much stronger',
      year: 'About 25 days',
      temperature: 'Much colder than Earth'
    },
    funFact: 'Top priority target for James Webb Space Telescope',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/ocean-planet-1041.jpg'
  },
  {
    id: 10,
    name: 'Kepler-62f',
    type: 'Super-Earth',
    distance: '1,200 light-years',
    radius: '1.41 Earth radii',
    mass: '2.8 Earth masses',
    temperature: '208 K (-65°C)',
    habitability: 'medium',
    discoveryYear: 2013,
    discoveryMethod: 'Transit',
    telescope: 'Kepler Space Telescope',
    hostStar: 'Kepler-62',
    orbitalPeriod: '267 days',
    starType: 'K-type dwarf',
    description: 'Orbits at the outer edge of the habitable zone. Could be covered in ice or have a thick atmosphere keeping it warm.',
    earthComparison: {
      size: '41% larger than Earth',
      gravity: 'Stronger than Earth',
      year: 'About 9 months',
      temperature: 'Much colder than Earth'
    },
    funFact: 'Part of a 5-planet system with two habitable zone planets',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/09/kepler62f-1041.jpg'
  }
]

// Function to get random planets for a deck
export const getRandomDeck = (count = 5) => {
  const shuffled = [...PLANET_DATABASE].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((planet, index) => ({
    ...planet,
    deckPosition: index + 1,
    isRevealed: false
  }))
}

// Function to get planet by ID
export const getPlanetById = (id) => {
  return PLANET_DATABASE.find(planet => planet.id === id)
}
