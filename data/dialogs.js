// ============================================================
// FANTER WORLD - DIALOGS FILE
// All NPC and cutscene dialog goes here
// ============================================================

const DIALOGS = {
    // ============================================================
    // INTRO / TUTORIAL DIALOGS
    // ============================================================
    
    tutorialWizard: {
        speaker: 'Master Wizards',
        text: 'Welcome to the Wizard Program!',
        next: 'tutorialWizard2'
    },
    
    tutorialWizard2: {
        speaker: 'Master Wizards',
        text: 'Your journey begins here. Use WASD or click to move.',
        next: 'tutorialWizard3'
    },
    
    tutorialWizard3: {
        speaker: 'Master Wizards',
        text: 'Touch enemies to battle. Answer math questions to attack!',
        next: 'tutorialWizard4'
    },
    
    tutorialWizard4: {
        speaker: 'Master Wizards',
        text: 'Here is your wand and robe. Good luck, young wizard!',
        next: null,
        onComplete: () => {
            gameState.hasWand = true;
            gameState.hasRobe = true;
            showToast('✨ You received a Wizard Wand and Robe! ✨');
            saveGame();
        }
    },
    
    // ============================================================
    // TOWN NPC DIALOGS
    // ============================================================
    
    townVillager: {
        speaker: 'Villager',
        text: 'Have you heard? Strange things are happening in the Whispering Woods.',
        next: 'townVillager2'
    },
    
    townVillager2: {
        speaker: 'Villager',
        text: 'People say they\'ve seen a dark creature lurking there...',
        next: null
    },
    
    townMerchant: {
        speaker: 'Merchant',
        text: 'Welcome to my shop! I sell potions and supplies.',
        next: 'townMerchant2'
    },
    
    townMerchant2: {
        speaker: 'Merchant',
        text: 'Defeat enemies to earn coins, then come see me!',
        next: null
    },
    
    townGuard: {
        speaker: 'Town Guard',
        text: 'The Fanter? I\'ve heard legends... a creature that devours worlds.',
        next: 'townGuard2'
    },
    
    townGuard2: {
        speaker: 'Town Guard',
        text: 'If you\'re going to fight it, you\'ll need all the help you can get.',
        next: null
    },
    
    // ============================================================
    // FOREST NPC DIALOGS
    // ============================================================
    
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
    },
    
    // ============================================================
    // STORM PEAK DIALOGS
    // ============================================================
    
    stormGirl: {
        speaker: '???',
        text: 'Oh! Another traveler! Please, you have to help me!',
        next: 'stormGirl2'
    },
    
    stormGirl2: {
        speaker: '???',
        text: 'My name is Luna. I\'m studying storm magic, but I\'m trapped here!',
        next: 'stormGirl3'
    },
    
    stormGirl3: {
        speaker: 'Luna',
        text: 'I need rare ingredients to complete my potion. Help me gather them?',
        next: 'stormGirl4'
    },
    
    stormGirl4: {
        speaker: 'You',
        text: 'What kind of ingredients?',
        next: 'stormGirl5'
    },
    
    stormGirl5: {
        speaker: 'Luna',
        text: 'Storm Essence from the cloud elementals, and Lightning Moss from the peaks.',
        next: 'stormGirl6'
    },
    
    stormGirl6: {
        speaker: 'Luna',
        text: 'Collect 3 of each and bring them back to me!',
        next: null,
        onComplete: () => {
            gameState.activeQuest = 'stormGathering';
            updateQuestUI();
            showToast('📜 New Quest: Storm Ingredients - Collect Storm Essence and Lightning Moss');
            saveGame();
        }
    },
    
    stormGirlPostQuest: {
        speaker: 'Luna',
        text: 'You got everything! Thank you so much!',
        next: 'stormGirlPostQuest2'
    },
    
    stormGirlPostQuest2: {
        speaker: 'Luna',
        text: 'Now watch... this potion will reveal the Fanter\'s hiding spot!',
        next: 'stormGirlPostQuest3'
    },
    
    stormGirlPostQuest3: {
        speaker: 'Luna',
        text: 'There! It\'s... IT\'S IN THE CLOUDS!',
        next: null,
        onComplete: () => {
            gameState.activeQuest = 'stormBoss';
            updateQuestUI();
            showToast('⚡ The Storm Fanter appears! Prepare for battle!');
            saveGame();
        }
    },
    
    // ============================================================
    // LAVA CAVERN DIALOGS
    // ============================================================
    
    lavatologist: {
        speaker: 'Dr. Magma',
        text: 'Ah, a wizard! Just who I needed!',
        next: 'lavatologist2'
    },
    
    lavatologist2: {
        speaker: 'Dr. Magma',
        text: 'The volcano is erupting uncontrollably! Something is wrong deep inside.',
        next: 'lavatologist3'
    },
    
    lavatologist3: {
        speaker: 'Dr. Magma',
        text: 'I need you to investigate the caverns and fix the magma valves.',
        next: 'lavatologist4'
    },
    
    lavatologist4: {
        speaker: 'You',
        text: 'What\'s causing the eruptions?',
        next: 'lavatologist5'
    },
    
    lavatologist5: {
        speaker: 'Dr. Magma',
        text: 'I fear... the Fanter may have returned. In LAVA form.',
        next: 'lavatologist6'
    },
    
    lavatologist6: {
        speaker: 'Dr. Magma',
        text: 'Find the source. Stop it. And I\'ll reward you with the Lawvand - our most powerful wand.',
        next: null,
        onComplete: () => {
            gameState.activeQuest = 'lavaCaverns';
            updateQuestUI();
            showToast('📜 New Quest: Volcanic Crisis - Investigate the lava caverns');
            saveGame();
        }
    },
    
    lavatologistPostQuest: {
        speaker: 'Dr. Magma',
        text: 'You... you actually did it! The volcano is stabilizing!',
        next: 'lavatologistPostQuest2'
    },
    
    lavatologistPostQuest2: {
        speaker: 'Dr. Magma',
        text: 'As promised, here is the Lawvand. A lava-infused wand of immense power.',
        next: 'lavatologistPostQuest3'
    },
    
    lavatologistPostQuest3: {
        speaker: 'Dr. Magma',
        text: 'Use it wisely. And thank you for saving our town.',
        next: null,
        onComplete: () => {
            gameState.hasLavaWand = true;
            gameState.storyPoint = 5;
            gameState.activeQuest = 'finalBattle';
            updateQuestUI();
            showToast('🔥 Lawvand obtained! You received a Lava Wand! 🔥');
            saveGame();
        }
    },
    
    // ============================================================
    // ARCADE / TOWN POST-GAME DIALOGS
    // ============================================================
    
    arcadeFriend: {
        speaker: 'Your Friend',
        text: 'Hey! Great to see you!',
        next: 'arcadeFriend2'
    },
    
    arcadeFriend2: {
        speaker: 'Your Friend',
        text: 'You\'ve become a legend around here. "Fanter\'s Demise" they call you!',
        next: null
    },
    
    // ============================================================
    // HEALER / HOSPITAL DIALOGS
    // ============================================================
    
    nurse: {
        speaker: 'Nurse',
        text: 'Welcome to the Healing Ward. How can I help you?',
        next: 'nurse2'
    },
    
    nurse2: {
        speaker: 'Nurse',
        text: 'I can fully heal your pets for 50 coins.',
        next: 'nurse3'
    },
    
    nurse3: {
        speaker: 'You',
        text: 'Please heal them.',
        next: 'nurse4'
    },
    
    nurse4: {
        speaker: 'Nurse',
        text: 'Of course! All healed up. Take care out there!',
        next: null,
        onComplete: () => {
            if (gameState.playerCoins >= 50) {
                gameState.playerCoins -= 50;
                for (let petId in gameState.pets) {
                    if (gameState.pets[petId]) {
                        gameState.pets[petId].hp = gameState.pets[petId].maxHp;
                    }
                }
                showToast('❤️ Your pets have been fully healed!');
                saveGame();
            } else {
                showToast('❌ Not enough coins! Need 50 coins to heal.');
            }
        }
    },
    
    // ============================================================
    // SHOP DIALOGS
    // ============================================================
    
    shopkeeper: {
        speaker: 'Shopkeeper',
        text: 'Welcome to my shop! What would you like to buy?',
        next: null,
        shopItems: [
            { name: 'Health Potion', price: 50, description: 'Restores 30 HP to your active pet' },
            { name: 'XP Boost', price: 100, description: 'Grants 50 XP to Mewt' },
            { name: 'Revive', price: 80, description: 'Revives a fainted pet' }
        ]
    }
};

// ============================================================
// DIALOG SEQUENCE SYSTEM
// ============================================================

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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DIALOGS, startDialogSequence, nextDialogStep };
}
