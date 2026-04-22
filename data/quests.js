// QUEST DATA
const QUESTS = {
  wakeUp: {
    id: 'wakeUp',
    name: 'Awakening',
    description: 'Wake up and find Mewt',
    storyPoint: 0,
    nextQuest: 'firstBattle',
    isComplete: false
  },
  firstBattle: {
    id: 'firstBattle',
    name: 'First Battle',
    description: 'Defeat the mysterious attacker',
    storyPoint: 1,
    nextQuest: 'wizardSchool',
    isComplete: false
  },
  wizardSchool: {
    id: 'wizardSchool',
    name: 'Wizard\'s Path',
    description: 'Join the Wizard Program and get your wand',
    storyPoint: 2,
    nextQuest: 'forestQuest',
    isComplete: false
  },
  forestQuest: {
    id: 'forestQuest',
    name: 'Forest Menace',
    description: 'Defeat the Forest Fanter',
    storyPoint: 3,
    nextQuest: 'stormArea',
    isComplete: false
  },
  stormArea: {
    id: 'stormArea',
    name: 'Stormy Skies',
    description: 'Help the mysterious girl collect ingredients',
    storyPoint: 4,
    nextQuest: 'lavaArea',
    isComplete: false
  },
  lavaArea: {
    id: 'lavaArea',
    name: 'Volcanic Crisis',
    description: 'Fix the magma valves and confront the Lava Fanter',
    storyPoint: 5,
    nextQuest: 'finalBattle',
    isComplete: false
  },
  finalBattle: {
    id: 'finalBattle',
    name: 'Fanter\'s World',
    description: 'Defeat the Fanter once and for all',
    storyPoint: 6,
    nextQuest: null,
    isComplete: false
  }
};

// Story progression flags
const STORY_FLAGS = {
  hasWand: false,
  hasRobe: false,
  hasForestGem: false,
  hasStormGem: false,
  hasLavaWand: false,
  hasFanterBlood: false,
  mewtEvolved: false,
  hasMawgma: false,
  newGamePlus: false
};
