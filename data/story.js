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
