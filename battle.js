// BATTLE SYSTEM
let inBattle = false;
let currentEnemy = null;
let battlePetHp = 0;
let battleEnemyHp = 0;
let currentMathQuestion = null;
let isBattleAnimating = false;
let currentMathGrade = 1;

function startBattle(enemy) {
  if (inBattle) return;
  
  inBattle = true;
  currentEnemy = { ...ENEMIES[enemy] };
  battleEnemyHp = currentEnemy.hp;
  
  const activePet = gameState.pets[gameState.activePet];
  battlePetHp = activePet.hp;
  
  // Scale difficulty for New Game+
  if (gameState.isNewGamePlus) {
    currentEnemy.hp = Math.floor(currentEnemy.hp * 1.5);
    currentEnemy.attack = Math.floor(currentEnemy.attack * 1.3);
    battleEnemyHp = currentEnemy.hp;
  }
  
  // Set math grade based on player age/story
  currentMathGrade = Math.min(6, Math.floor(gameState.playerAge / 3) + 1);
  currentMathQuestion = getRandomMathQuestion(currentMathGrade);
  
  document.getElementById('battleEnemyName').textContent = currentEnemy.name;
  document.getElementById('battleEnemyHpText').textContent = battleEnemyHp;
  document.getElementById('battleEnemyMaxHp').textContent = currentEnemy.maxHp;
  document.getElementById('battlePetHpText').textContent = battlePetHp;
  document.getElementById('battlePetMaxHp').textContent = activePet.maxHp;
  document.getElementById('mathQuestion').textContent = currentMathQuestion.q;
  document.getElementById('battleMessage').textContent = `Wild ${currentEnemy.name} appeared!`;
  
  updateBattleHpBars();
  renderMathOptions();
  
  document.getElementById('battleUI').style.display = 'flex';
}

function renderMathOptions() {
  const container = document.getElementById('mathOptions');
  container.innerHTML = '';
  currentMathQuestion.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'math-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => handleBattleAnswer(opt);
    container.appendChild(btn);
  });
}

function updateBattleHpBars() {
  const enemyPercent = (battleEnemyHp / currentEnemy.hp) * 100;
  const petPercent = (battlePetHp / gameState.pets[gameState.activePet].maxHp) * 100;
  document.getElementById('battleEnemyHp').style.width = `${Math.max(0, enemyPercent)}%`;
  document.getElementById('battlePetHp').style.width = `${Math.max(0, petPercent)}%`;
  document.getElementById('battleEnemyHpText').textContent = Math.max(0, battleEnemyHp);
  document.getElementById('battlePetHpText').textContent = Math.max(0, battlePetHp);
}

async function handleBattleAnswer(answer) {
  if (isBattleAnimating || !inBattle) return;
  isBattleAnimating = true;
  
  const enemyDiv = document.getElementById('battleUI');
  enemyDiv.classList.add('shake-effect', 'flash-effect');
  setTimeout(() => {
    enemyDiv.classList.remove('shake-effect', 'flash-effect');
  }, 300);
  
  if (answer === currentMathQuestion.a) {
    const damage = Math.floor(Math.random() * 12) + 10;
    battleEnemyHp -= damage;
    document.getElementById('battleMessage').textContent = `Correct! ${damage} damage!`;
    updateBattleHpBars();
    
    if (battleEnemyHp <= 0) {
      setTimeout(() => winBattle(), 800);
      isBattleAnimating = false;
      return;
    }
    setTimeout(() => enemyTurn(), 1000);
  } else {
    document.getElementById('battleMessage').textContent = `Wrong! Answer was ${currentMathQuestion.a}. ${currentEnemy.name} attacks!`;
    const damage = Math.floor(Math.random() * currentEnemy.attack) + 5;
    const reduced = Math.max(1, damage - Math.floor(gameState.pets[gameState.activePet].defense / 3));
    battlePetHp -= reduced;
    updateBattleHpBars();
    
    const petDiv = document.getElementById('battleUI');
    petDiv.classList.add('shake-effect', 'flash-effect');
    setTimeout(() => {
      petDiv.classList.remove('shake-effect', 'flash-effect');
    }, 300);
    
    if (battlePetHp <= 0) {
      setTimeout(() => loseBattle(), 800);
      isBattleAnimating = false;
      return;
    }
    
    currentMathQuestion = getRandomMathQuestion(currentMathGrade);
    document.getElementById('mathQuestion').textContent = currentMathQuestion.q;
    renderMathOptions();
    document.getElementById('battleMessage').textContent = `What will you do?`;
  }
  isBattleAnimating = false;
}

function enemyTurn() {
  if (!inBattle || battleEnemyHp <= 0) return;
  
  const damage = Math.floor(Math.random() * currentEnemy.attack) + 5;
  const reduced = Math.max(1, damage - Math.floor(gameState.pets[gameState.activePet].defense / 3));
  battlePetHp -= reduced;
  document.getElementById('battleMessage').textContent = `${currentEnemy.name} dealt ${reduced} damage!`;
  updateBattleHpBars();
  
  const petDiv = document.getElementById('battleUI');
  petDiv.classList.add('shake-effect', 'flash-effect');
  setTimeout(() => {
    petDiv.classList.remove('shake-effect', 'flash-effect');
  }, 300);
  
  if (battlePetHp <= 0) {
    setTimeout(() => loseBattle(), 800);
    return;
  }
  
  currentMathQuestion = getRandomMathQuestion(currentMathGrade);
  document.getElementById('mathQuestion').textContent = currentMathQuestion.q;
  renderMathOptions();
  document.getElementById('battleMessage').textContent = `What will you do?`;
}

function winBattle() {
  const expGain = currentEnemy.exp;
  const coinGain = currentEnemy.coins;
  
  gameState.playerExp += expGain;
  gameState.playerCoins += coinGain;
  
  const activePet = gameState.pets[gameState.activePet];
  activePet.exp += expGain;
  
  let message = `Victory! +${expGain} XP, +${coinGain} coins!`;
  
  // Level up pet
  if (activePet.exp >= activePet.expNeeded) {
    activePet.level++;
    activePet.exp -= activePet.expNeeded;
    activePet.expNeeded = Math.floor(activePet.expNeeded * 1.3);
    activePet.maxHp += 8;
    activePet.hp = activePet.maxHp;
    activePet.attack += 3;
    activePet.defense += 2;
    message += `\n🌟 ${activePet.name} grew to Lv${activePet.level}! 🌟`;
    
    // Check evolution
    if (activePet.id === 'mewt' && activePet.level >= PETS.mewt.evolutionLevel && !gameState.storyFlags.mewtEvolved) {
      message += `\n✨ WHAT? MEWT is evolving! ✨`;
      setTimeout(() => {
        evolvePet('mewt', 'meowt');
      }, 2000);
    }
  }
  
  document.getElementById('battleMessage').textContent = message;
  updateUI();
  saveGame();
  
  // Remove enemy from world if not a boss respawn
  if (!currentEnemy.isBoss) {
    const enemyIndex = currentAreaEnemies.findIndex(e => e.id === currentEnemy.id);
    if (enemyIndex !== -1) currentAreaEnemies.splice(enemyIndex, 1);
  }
  
  setTimeout(() => {
    document.getElementById('battleUI').style.display = 'none';
    inBattle = false;
    currentEnemy = null;
    isBattleAnimating = false;
    
    // Check for story triggers after battle
    if (currentEnemy.storyFlag) {
      gameState.storyFlags[currentEnemy.storyFlag] = true;
      advanceStory();
    }
  }, 3000);
}

function loseBattle() {
  document.getElementById('battleMessage').textContent = `You fainted... Running to heal!`;
  const activePet = gameState.pets[gameState.activePet];
  activePet.hp = activePet.maxHp;
  battlePetHp = activePet.hp;
  updateUI();
  
  setTimeout(() => {
    document.getElementById('battleUI').style.display = 'none';
    inBattle = false;
    currentEnemy = null;
    isBattleAnimating = false;
    // Return to town
    gameState.currentArea = 'town';
    gameState.playerX = 500;
    gameState.playerY = 500;
    saveGame();
  }, 2000);
}

function runFromBattle() {
  document.getElementById('battleMessage').textContent = `Got away safely!`;
  setTimeout(() => {
    document.getElementById('battleUI').style.display = 'none';
    inBattle = false;
    currentEnemy = null;
    isBattleAnimating = false;
  }, 800);
}

function evolvePet(from, to) {
  gameState.pets[to] = { ...PETS[to] };
  gameState.pets[to].level = gameState.pets[from].level;
  gameState.pets[to].exp = gameState.pets[from].exp;
  gameState.activePet = to;
  delete gameState.pets[from];
  gameState.storyFlags.mewtEvolved = true;
  saveGame();
  showToast(`✨ MEWT evolved into MEOWT! ✨`);
}
