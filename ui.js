// UI FUNCTIONS
function updateUI() {
  document.getElementById('xpCurrent').textContent = gameState.playerExp;
  document.getElementById('xpNeeded').textContent = gameState.playerLevel * 100;
  document.getElementById('coinAmount').textContent = gameState.playerCoins;
  document.getElementById('playerLvBadge').textContent = `Lv ${gameState.playerLevel}`;
}

function showMenu() {
  const menuHtml = `
    <div class="menu-overlay">
      <div class="menu-panel">
        <h2>⚔️ MENU</h2>
        <div class="menu-stats">
          <p>👤 ${gameState.playerName} (Age ${gameState.playerAge})</p>
          <p>⭐ Level ${gameState.playerLevel}</p>
          <p>✨ XP: ${gameState.playerExp}/${gameState.playerLevel * 100}</p>
          <p>🪙 Coins: ${gameState.playerCoins}</p>
        </div>
        <div class="menu-pets">
          <h3>🐱 PETS</h3>
          ${Object.entries(gameState.pets).filter(([id]) => id !== 'mawgma' || gameState.pets[id]).map(([id, pet]) => `
            <div class="pet-card ${gameState.activePet === id ? 'active' : ''}" onclick="switchPet('${id}')">
              <strong>${pet.name}</strong> Lv${pet.level}
              <div class="pet-hp-bar"><div style="width:${(pet.hp/pet.maxHp)*100}%"></div></div>
            </div>
          `).join('')}
        </div>
        ${gameState.isNewGamePlus ? '<div class="ngp-badge">🌟 NEW GAME+ 🌟</div>' : ''}
        <button class="menu-close" onclick="closeMenu()">CLOSE</button>
      </div>
    </div>
  `;
  
  const overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.innerHTML = menuHtml;
  document.body.appendChild(overlay);
}

function closeMenu() {
  document.getElementById('menuOverlay')?.remove();
}

function showBag() {
  alert(`🎒 YOUR BAG\n🪙 ${gameState.playerCoins} coins\n⭐ ${gameState.playerExp} XP\n${gameState.storyFlags.hasWand ? '✨ Wizard Wand' : ''}\n${gameState.storyFlags.hasRobe ? '👘 Wizard Robe' : ''}\n${gameState.storyFlags.hasForestGem ? '💎 Forest Gem' : ''}\n${gameState.storyFlags.hasLavaWand ? '🔥 Lava Wand' : ''}`);
}

function showPets() {
  let message = "🐱 YOUR PETS\n\n";
  for (const [id, pet] of Object.entries(gameState.pets)) {
    if (pet) {
      message += `${pet.name} - Lv${pet.level}\n❤️ HP: ${pet.hp}/${pet.maxHp}\n⚔️ ATK: ${pet.attack}\n🛡️ DEF: ${pet.defense}\n\n`;
    }
  }
  alert(message);
}

function switchPet(petId) {
  if (gameState.pets[petId]) {
    gameState.activePet = petId;
    showToast(`Switched to ${gameState.pets[petId].name}!`);
    closeMenu();
    saveGame();
  }
}
