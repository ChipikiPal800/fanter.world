// AREA DATA
const AREAS = {
  bedroom: {
    id: 'bedroom',
    name: 'Your Bedroom',
    description: 'A cozy room with a bed and window. Sunlight streams in.',
    background: '#2d5a3a',
    music: 'peaceful',
    isTown: false
  },
  town: {
    id: 'town',
    name: 'Emberfall Town',
    description: 'A bustling town with friendly faces and a wizard school.',
    background: '#3a6b33',
    music: 'town',
    isTown: true
  },
  forest: {
    id: 'forest',
    name: 'Whispering Woods',
    description: 'A dense forest filled with ancient trees and wild creatures. Something dark lurks deeper in...',
    background: '#2d5a2a',
    music: 'forest',
    isTown: false,
    map: [
      ['T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','T','T','G','G','G','G','G','G','G','G','T','T','G','G','G','G','T'],
      ['T','G','G','T','T','G','G','G','G','G','G','G','G','T','T','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','T','T','T','T','G','G','T','T','T','T','G','G','G','G','T'],
      ['T','G','G','G','G','T','T','T','T','G','G','T','T','T','T','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','T','T','T','T','G','G','G','G','G','G','T','T','T','T','G','G','T'],
      ['T','G','G','T','T','T','T','G','G','G','G','G','G','T','T','T','T','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','T'],
      ['T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T','T']
    ],
    npcs: [
      { id: 'elderOak', name: 'Elder Oak', x: 900, y: 700, dialogId: 'elderOakIntro' }
    ],
    spawnPoints: {
      entrance: { x: 600, y: 600 },
      boss: { x: 1800, y: 1400 }
    }
  },
  stormPeak: {
    id: 'stormPeak',
    name: 'Stormy Peak',
    description: 'A floating mountain shrouded in eternal storm clouds.',
    background: '#4a4a6a',
    music: 'storm',
    isTown: false
  },
  lavaCaverns: {
    id: 'lavaCaverns',
    name: 'Molten Caverns',
    description: 'Deep underground tunnels filled with flowing lava.',
    background: '#6a2a1a',
    music: 'cavern',
    isTown: false
  },
  fanterWorld: {
    id: 'fanterWorld',
    name: 'Fanter\'s Domain',
    description: 'A twisted dimension created by the Fanter.',
    background: '#1a0a2a',
    music: 'boss',
    isTown: false
  }
};
