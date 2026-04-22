// ENEMY DATA
const ENEMIES = {
  slime: {
    id: 'slime',
    name: 'SLIME',
    hp: 30,
    maxHp: 30,
    attack: 7,
    defense: 3,
    exp: 35,
    coins: 25,
    color: '#86efac',
    level: 2
  },
  goblin: {
    id: 'goblin',
    name: 'GOBLIN',
    hp: 40,
    maxHp: 40,
    attack: 9,
    defense: 4,
    exp: 50,
    coins: 35,
    color: '#fbbf24',
    level: 3
  },
  shadowpaw: {
    id: 'shadowpaw',
    name: 'SHADOWPAW',
    hp: 50,
    maxHp: 50,
    attack: 12,
    defense: 5,
    exp: 70,
    coins: 50,
    color: '#a855f7',
    level: 4
  },
  frostbite: {
    id: 'frostbite',
    name: 'FROSTBITE',
    hp: 45,
    maxHp: 45,
    attack: 10,
    defense: 6,
    exp: 60,
    coins: 45,
    color: '#06b6d4',
    level: 3
  },
  emberfang: {
    id: 'emberfang',
    name: 'EMBERFANG',
    hp: 60,
    maxHp: 60,
    attack: 15,
    defense: 4,
    exp: 90,
    coins: 65,
    color: '#f97316',
    level: 5
  },
  // BOSSES
  fanterForest: {
    id: 'fanterForest',
    name: 'FANTER (Forest)',
    hp: 120,
    maxHp: 120,
    attack: 20,
    defense: 10,
    exp: 200,
    coins: 150,
    color: '#2d6e2d',
    isBoss: true,
    level: 8,
    storyFlag: 'defeatedForestFanter'
  },
  fanterStorm: {
    id: 'fanterStorm',
    name: 'STORM FANTER',
    hp: 180,
    maxHp: 180,
    attack: 25,
    defense: 12,
    exp: 300,
    coins: 250,
    color: '#60a5fa',
    isBoss: true,
    level: 12,
    storyFlag: 'defeatedStormFanter',
    phases: 2
  },
  fanterLava: {
    id: 'fanterLava',
    name: 'LAVA FANTER',
    hp: 250,
    maxHp: 250,
    attack: 30,
    defense: 15,
    exp: 500,
    coins: 400,
    color: '#f97316',
    isBoss: true,
    level: 16,
    storyFlag: 'defeatedLavaFanter'
  },
  fanterFinal: {
    id: 'fanterFinal',
    name: 'FANTER (Final Form)',
    hp: 500,
    maxHp: 500,
    attack: 45,
    defense: 25,
    exp: 1000,
    coins: 800,
    color: '#1a1a2e',
    isBoss: true,
    isFinal: true,
    level: 25,
    storyFlag: 'defeatedFinalFanter',
    phases: 3
  }
};
// ============================================================
// FOREST ENEMIES - Add to bottom of enemies.js
// ============================================================

ENEMIES.forestSlime = {
    id: 'forestSlime',
    name: 'FOREST SLIME',
    hp: 35,
    maxHp: 35,
    attack: 8,
    defense: 4,
    exp: 45,
    coins: 30,
    color: '#4ade80',
    level: 3,
    description: 'A slime that absorbed forest energy. Bouncy and persistent.'
};

ENEMIES.forestGoblin = {
    id: 'forestGoblin',
    name: 'FOREST GOBLIN',
    hp: 45,
    maxHp: 45,
    attack: 10,
    defense: 5,
    exp: 60,
    coins: 45,
    color: '#fbbf24',
    level: 4,
    description: 'A sneaky goblin that ambushes travelers.'
};

ENEMIES.forestWolf = {
    id: 'forestWolf',
    name: 'FOREST WOLF',
    hp: 50,
    maxHp: 50,
    attack: 12,
    defense: 5,
    exp: 75,
    coins: 55,
    color: '#a8a29e',
    level: 5,
    description: 'A swift predator that hunts in packs.'
};

ENEMIES.fanterForest = {
    id: 'fanterForest',
    name: 'FANTER (Forest Form)',
    hp: 120,
    maxHp: 120,
    attack: 18,
    defense: 10,
    exp: 250,
    coins: 200,
    color: '#2d6e2d',
    isBoss: true,
    level: 8,
    storyFlag: 'defeatedForestFanter',
    description: 'The Fanter in its forest manifestation. Dark green, root-like tendrils.'
};
