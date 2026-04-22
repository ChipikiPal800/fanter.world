// SAVE SYSTEM
let gameState = {
  // Player
  playerName: 'Hero',
  playerAge: 13,
  playerLevel: 1,
  playerExp: 0,
  playerCoins: 100,
  
  // Pets
  activePet: 'mewt',
  pets: {
    mewt: { ...PETS.mewt },
    mawgma: null
  },
  
  // Story
  storyPoint: 0,
  completedQuests: [],
  activeQuest: 'wakeUp',
  storyFlags: { ...STORY_FLAGS },
  
  // World
  currentArea: 'bedroom',
  playerX: 500,
  playerY: 500,
  
  // New Game Plus
  isNewGamePlus: false,
  playTime: 0
};

function saveGame() {
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
      gameState = data.gameState;
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
  gameState = {
    ...gameState,
    storyPoint: 0,
    completedQuests: [],
    activeQuest: 'wakeUp',
    storyFlags: { ...STORY_FLAGS },
    playerAge: 13,
    currentArea: 'bedroom',
    isNewGamePlus: true
  };
  
  // Restore pet progress
  gameState.pets.mewt.level = savedPetLevel;
  gameState.pets.mewt.exp = savedPetExp;
  gameState.storyFlags.mewtEvolved = savedMewtEvolved;
  
  if (savedMewtEvolved) {
    gameState.pets.mewt = { ...PETS.meowt };
    gameState.pets.mewt.level = savedPetLevel;
    gameState.pets.mewt.exp = savedPetExp;
  }
  
  saveGame();
  showToast('🌟 New Game+ Started! Harder enemies await! 🌟');
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
