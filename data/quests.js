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
    nextQuest: 'forestWelcome',
    isComplete: false
  },
  forestWelcome: {
    id: 'forestWelcome',
    name: 'Into the Woods',
    description: 'Enter the Whispering Woods and find Elder Oak',
    storyPoint: 2,
    nextQuest: 'forestSlimeHunt',
    isComplete: false,
    rewards: { exp: 50, coins: 40 }
  },
  forestSlimeHunt: {
    id: 'forestSlimeHunt',
    name: 'Forest Pests',
    description: 'Defeat 3 Forest Slimes',
    storyPoint: 2,
    nextQuest: 'forestBoss',
    isComplete: false,
    requiredKills: { forestSlime: 3 },
    rewards: { exp: 100, coins: 80, item: 'healthPotion' }
  },
  forestBoss: {
    id: 'forestBoss',
    name: 'The Heart of Darkness',
    description: 'Defeat the Forest Fanter and claim the Forest Gem',
    storyPoint: 2,
    nextQuest: 'stormArea',
    isComplete: false,
    isBossQuest: true,
    rewards: { exp: 300, coins: 250, item: 'forestGem' }
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
  defeatedForestFanter: false,
  defeatedStormFanter: false,
  defeatedLavaFanter: false,
  defeatedFinalFanter: false,
  newGamePlus: false
};

// Track kill counts for quests
let questKillCounts = {
  forestSlime: 0
};

function updateQuestKills(enemyId) {
  if (questKillCounts.hasOwnProperty(enemyId)) {
    questKillCounts[enemyId]++;
    updateQuestUI();
    
    const quest = QUESTS.forestSlimeHunt;
    if (!quest.isComplete && questKillCounts.forestSlime >= quest.requiredKills.forestSlime) {
      completeQuest('forestSlimeHunt');
    }
  }
}

function completeQuest(questId) {
  const quest = QUESTS[questId];
  if (quest.isComplete) return;
  
  quest.isComplete = true;
  gameState.completedQuests.push(questId);
  
  gameState.playerExp += quest.rewards.exp;
  gameState.playerCoins += quest.rewards.coins;
  
  if (quest.rewards.item === 'healthPotion') {
    gameState.items = gameState.items || [];
    gameState.items.push('healthPotion');
  }
  
  if (quest.rewards.item === 'forestGem') {
    gameState.hasForestGem = true;
  }
  
  showToast(`✅ Quest Complete: ${quest.name}! +${quest.rewards.exp} XP, +${quest.rewards.coins} coins`);
  
  if (quest.nextQuest) {
    gameState.activeQuest = quest.nextQuest;
    updateQuestUI();
  }
  
  saveGame();
}
