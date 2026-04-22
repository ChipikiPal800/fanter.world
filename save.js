// SAVE SYSTEM - Define gameState FIRST
let gameState = {
  // Player
  playerName: 'Hero',
  playerAge: 13,
  playerLevel: 1,
  playerExp: 0,
  playerCoins: 150,
  
  // Pets
  activePet: 'mewt',
  pets: {
    mewt: {
      id: 'mewt',
      name: 'MEWT',
      hp: 45,
      maxHp: 45,
      attack: 12,
      defense: 8,
      level: 1,
      exp: 0,
      expNeeded: 100,
      color: '#22c55e',
      darkColor: '#16a34a'
    },
    mawgma: null
  },
  
  // Story
  storyPoint: 0,
  completedQuests: [],
  activeQuest: 'wakeUp',
  storyFlags: {
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
  },
  
  // World
  currentArea: 'town',
  playerX: 500,
  playerY: 500,
  
  // Items
  items: [],
  hasForestGem: false,
  hasWand: false,
  hasRobe: false,
  hasLavaWand: false,
  
  // New Game Plus
  isNewGamePlus: false,
  playTime: 0
};

function saveGame() {
  // Save current position
  if (typeof player !== 'undefined') {
    gameState.playerX = player.x;
    gameState.playerY = player.y;
  }
  
  localStorage.setItem('fanterWorldSave', JSON.stringify({
    gameState: gameState,
    version: '1.0.0',
    timestamp: Date.now()
  }));
  showToast('✅ Game saved!');
}

function loadGame() {
  const saved = localStorage.getItem('fanterWorldSave');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      const loadedState = data.gameState;
      
      // Merge loaded state with current defaults
      gameState.playerName = loadedState.playerName || 'Hero';
      gameState.playerAge = loadedState.playerAge || 13;
      gameState.playerLevel = loadedState.playerLevel || 1;
      gameState.playerExp = loadedState.playerExp || 0;
      gameState.playerCoins = loadedState.playerCoins || 150;
      gameState.activePet = loadedState.activePet || 'mewt';
      gameState.storyPoint = loadedState.storyPoint || 0;
      gameState.completedQuests = loadedState.completedQuests || [];
      gameState.activeQuest = loadedState.activeQuest || 'wakeUp';
      gameState.storyFlags = { ...gameState.storyFlags, ...loadedState.storyFlags };
      gameState.currentArea = loadedState.currentArea || 'town';
      gameState.playerX = loadedState.playerX || 500;
      gameState.playerY = loadedState.playerY || 500;
      gameState.hasForestGem = loadedState.hasForestGem || false;
      gameState.hasWand = loadedState.hasWand || false;
      gameState.hasRobe = loadedState.hasRobe || false;
      gameState.hasLavaWand = loadedState.hasLavaWand || false;
      gameState.items = loadedState.items || [];
      gameState.isNewGamePlus = loadedState.isNewGamePlus || false;
      
      // Load pet data
      if (loadedState.pets) {
        if (loadedState.pets.mewt) {
          gameState.pets.mewt = { ...gameState.pets.mewt, ...loadedState.pets.mewt };
        }
        if (loadedState.pets.mawgma) {
          gameState.pets.mawgma = loadedState.pets.mawgma;
        }
      }
      
      showToast('✅ Game loaded!');
      return true;
    } catch(e) {
      console.error('Failed to load save', e);
      return false;
    }
  }
  return false;
}

function newGamePlus() {
  // Preserve pet levels and evolutions
  const savedPetLevel = gameState.pets.mewt.level;
  const savedPetExp = gameState.pets.mewt.exp;
  const savedMewtEvolved = gameState.storyFlags.mewtEvolved;
  
  // Reset story but keep pet progress
  gameState.storyPoint = 0;
  gameState.completedQuests = [];
  gameState.activeQuest = 'wakeUp';
  gameState.storyFlags = {
    hasWand: false,
    hasRobe: false,
    hasForestGem: false,
    hasStormGem: false,
    hasLavaWand: false,
    hasFanterBlood: false,
    mewtEvolved: savedMewtEvolved,
    hasMawgma: false,
    defeatedForestFanter: false,
    defeatedStormFanter: false,
    defeatedLavaFanter: false,
    defeatedFinalFanter: false,
    newGamePlus: true
  };
  gameState.playerAge = 13;
  gameState.currentArea = 'town';
  gameState.playerX = 500;
  gameState.playerY = 500;
  gameState.hasForestGem = false;
  gameState.hasWand = false;
  gameState.hasRobe = false;
  gameState.hasLavaWand = false;
  gameState.items = [];
  gameState.isNewGamePlus = true;
  
  // Restore pet progress
  gameState.pets.mewt.level = savedPetLevel;
  gameState.pets.mewt.exp = savedPetExp;
  gameState.storyFlags.mewtEvolved = savedMewtEvolved;
  
  if (savedMewtEvolved) {
    gameState.pets.mewt = { 
      id: 'meowt',
      name: 'MEOWT',
      hp: 85,
      maxHp: 85,
      attack: 28,
      defense: 18,
      level: savedPetLevel,
      exp: savedPetExp,
      expNeeded: 200,
      color: '#a855f7',
      darkColor: '#7e22ce'
    };
  }
  
  saveGame();
  location.reload();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '100px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(0,0,0,0.8)';
  toast.style.color = '#fbbf24';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '30px';
  toast.style.fontSize = '12px';
  toast.style.zIndex = '1000';
  toast.style.border = '1px solid #fbbf24';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}
