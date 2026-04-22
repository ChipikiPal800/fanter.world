// STORY SYSTEM - Cutscenes and Dialog
let isInCutscene = false;
let currentDialogIndex = 0;
let currentDialogSet = [];

function startCutscene(dialogSet) {
  isInCutscene = true;
  currentDialogIndex = 0;
  currentDialogSet = dialogSet;
  showDialog();
}

function showDialog() {
  if (currentDialogIndex >= currentDialogSet.length) {
    endCutscene();
    return;
  }
  
  const dialog = currentDialogSet[currentDialogIndex];
  document.getElementById('dialogName').textContent = dialog.speaker;
  document.getElementById('dialogText').textContent = dialog.text;
  document.getElementById('dialogBox').classList.remove('dialog-hidden');
}

function nextDialog() {
  if (!isInCutscene) return;
  currentDialogIndex++;
  showDialog();
}

function endCutscene() {
  isInCutscene = false;
  document.getElementById('dialogBox').classList.add('dialog-hidden');
  
  // Trigger next story action
  if (currentDialogSet.onComplete) {
    currentDialogSet.onComplete();
  }
}

// Story cutscenes
const CUTSCENES = {
  wakeUp: {
    onComplete: () => {
      gameState.storyPoint = 1;
      gameState.activeQuest = 'firstBattle';
      updateQuestTracker();
      saveGame();
    },
    dialogs: [
      { speaker: '???', text: '...' },
      { speaker: '???', text: 'Your vision slowly returns...' },
      { speaker: 'MEWT', text: 'Meow! Meow!' },
      { speaker: 'MEWT', text: 'Wake up! Something\'s wrong!' },
      { speaker: 'You', text: 'Ugh... my head... What happened?' },
      { speaker: 'MEWT', text: 'A dark figure attacked us! It\'s still out there!' }
    ]
  },
  
  firstBattleEnd: {
    onComplete: () => {
      gameState.storyPoint = 2;
      gameState.activeQuest = 'wizardSchool';
      updateQuestTracker();
      saveGame();
      showToast('✨ Mewt showed you its true power! ✨');
    },
    dialogs: [
      { speaker: '???', text: 'Impressive... That cat of yours has potential.' },
      { speaker: 'You', text: 'Who are you? Why did you attack us?' },
      { speaker: '???', text: 'I was testing you. The Fanter is coming.' },
      { speaker: '???', text: 'Go to Emberfall Town. Join the Wizard Program.' },
      { speaker: '???', text: 'You\'ll need training if you want to survive.' },
      { speaker: 'MEWT', text: 'Meow! (determined)' }
    ]
  },
  
  wizardWelcome: {
    onComplete: () => {
      gameState.storyFlags.hasWand = true;
      gameState.storyFlags.hasRobe = true;
      saveGame();
    },
    dialogs: [
      { speaker: 'Headmaster', text: 'Welcome, young wizard!' },
      { speaker: 'Headmaster', text: 'Here is your wand and robe.' },
      { speaker: 'Headmaster', text: 'Your journey starts now.' },
      { speaker: 'You', text: 'Thank you, Headmaster!' },
      { speaker: 'Headmaster', text: 'Go to the Whispering Woods. A great evil lurks there.' }
    ]
  }
};

function advanceStory() {
  const nextQuest = QUESTS[gameState.activeQuest].nextQuest;
  if (nextQuest) {
    gameState.activeQuest = nextQuest;
    updateQuestTracker();
  }
}

function updateQuestTracker() {
  const quest = QUESTS[gameState.activeQuest];
  if (quest) {
    document.getElementById('questText').textContent = quest.description;
  }
}
// ============================================================
// FOREST CUTSCENES - Add to bottom of story.js
// ============================================================

CUTSCENES.enterForest = {
    dialogs: [
        { speaker: 'You', text: 'The Whispering Woods... feels different than I remember.' },
        { speaker: 'MEWT', text: 'Meow... (ears twitching nervously)' },
        { speaker: 'You', text: 'Something\'s wrong here. Let\'s find Elder Oak.' }
    ],
    onComplete: () => {
        gameState.inForest = true;
        showToast('🌲 Entered the Whispering Woods');
    }
};

CUTSCENES.forestBossIntro = {
    dialogs: [
        { speaker: '???', text: 'So... you\'ve come.' },
        { speaker: 'You', text: 'Who\'s there?! Show yourself!' },
        { speaker: 'FANTER', text: 'I am the heart of this forest. The darkness you feel... is me.' },
        { speaker: 'FANTER', text: 'You cannot defeat me, child.' },
        { speaker: 'MEWT', text: 'Meow! (stands protectively in front of you)' },
        { speaker: 'You', text: 'We\'ll see about that!' }
    ],
    onComplete: () => {
        // Start boss battle
        startBattle('fanterForest');
    }
};

CUTSCENES.forestBossVictory = {
    dialogs: [
        { speaker: 'FANTER', text: 'NO! This cannot be!' },
        { speaker: 'FANTER', text: 'You... you are stronger than I anticipated.' },
        { speaker: 'FANTER', text: 'But this is not over. I will return.' },
        { speaker: 'FANTER', text: 'Take the Forest Gem... for now.' },
        { speaker: 'FANTER', text: 'But know this - we will meet again.' }
    ],
    onComplete: () => {
        gameState.hasForestGem = true;
        gameState.storyFlags.defeatedForestFanter = true;
        saveGame();
        showToast('💎 Forest Gem obtained! +300 XP, +250 coins');
    }
};
