// DIALOGS FILE
const DIALOGS = {
  elderOakIntro: {
    speaker: 'Elder Oak',
    text: 'Welcome, young wizard. I see the darkness in your aura.',
    next: 'elderOakIntro2'
  },
  elderOakIntro2: {
    speaker: 'Elder Oak',
    text: 'The Fanter stirs in these woods. Its corruption spreads.',
    next: 'elderOakIntro3'
  },
  elderOakIntro3: {
    speaker: 'Elder Oak',
    text: 'Before you face it, prove yourself. Clear the forest of corrupted slimes.',
    next: 'elderOakIntro4'
  },
  elderOakIntro4: {
    speaker: 'You',
    text: 'I\'ll handle it. Where can I find them?',
    next: 'elderOakIntro5'
  },
  elderOakIntro5: {
    speaker: 'Elder Oak',
    text: 'They lurk near the old ruins. Be careful... the Fanter watches.',
    next: null,
    onComplete: () => {
      gameState.activeQuest = 'forestSlimeHunt';
      updateQuestUI();
      showToast('📜 New Quest: Forest Pests - Defeat 3 Forest Slimes');
      saveGame();
    }
  },
  elderOakPostSlimes: {
    speaker: 'Elder Oak',
    text: 'You\'ve done well. The forest breathes easier.',
    next: 'elderOakPostSlimes2'
  },
  elderOakPostSlimes2: {
    speaker: 'Elder Oak',
    text: 'Now, face the Fanter. It waits at the Forest Heart.',
    next: 'elderOakPostSlimes3'
  },
  elderOakPostSlimes3: {
    speaker: 'Elder Oak',
    text: 'Take this blessing. May it protect you.',
    next: null,
    onComplete: () => {
      gameState.activeQuest = 'forestBoss';
      updateQuestUI();
      showToast('📜 New Quest: The Heart of Darkness - Defeat Forest Fanter');
      saveGame();
    }
  },
  elderOakAfterBoss: {
    speaker: 'Elder Oak',
    text: 'Incredible... You\'ve done what I could not.',
    next: 'elderOakAfterBoss2'
  },
  elderOakAfterBoss2: {
    speaker: 'Elder Oak',
    text: 'The Forest Gem is yours. Take it. You\'ll need its power.',
    next: 'elderOakAfterBoss3'
  },
  elderOakAfterBoss3: {
    speaker: 'Elder Oak',
    text: 'Go now. The Fanter fled... but it will return, stronger.',
    next: null,
    onComplete: () => {
      gameState.hasForestGem = true;
      gameState.storyPoint = 3;
      gameState.activeQuest = 'stormArea';
      updateQuestUI();
      showToast('💎 Forest Gem obtained!');
      saveGame();
    }
  }
};

let currentDialogSequence = null;
let currentDialogStep = null;

function startDialogSequence(dialogId) {
  if (inBattle || inCutscene) return;
  
  inCutscene = true;
  currentDialogSequence = dialogId;
  currentDialogStep = DIALOGS[dialogId];
  
  if (!currentDialogStep) {
    console.error('Dialog not found:', dialogId);
    endDialogSequence();
    return;
  }
  
  showDialogStep();
}

function showDialogStep() {
  if (!currentDialogStep) {
    endDialogSequence();
    return;
  }
  
  document.getElementById('dialogName').textContent = currentDialogStep.speaker;
  document.getElementById('dialogText').textContent = currentDialogStep.text;
  document.getElementById('dialogBox').classList.remove('dialog-hidden');
}

function nextDialogStep() {
  if (!inCutscene) return;
  
  if (currentDialogStep.next) {
    currentDialogStep = DIALOGS[currentDialogStep.next];
    showDialogStep();
  } else {
    endDialogSequence();
  }
}

function endDialogSequence() {
  inCutscene = false;
  document.getElementById('dialogBox').classList.add('dialog-hidden');
  
  if (currentDialogStep && currentDialogStep.onComplete) {
    currentDialogStep.onComplete();
  }
  
  currentDialogSequence = null;
  currentDialogStep = null;
}
