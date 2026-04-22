// MAIN GAME ENGINE
let canvas;
let ctx;

// Wait for DOM to load before accessing canvas
document.addEventListener('DOMContentLoaded', function() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  // Now initialize the game
  initGame();
});

const VIEW_W = 1200;
const VIEW_H = 700;

let camX = 0;
let camY = 0;

let player = {
  x: 500,
  y: 500,
  targetX: 500,
  targetY: 500,
  speed: 3.5,
  walkCycle: 0
};

let pet = {
  x: 450,
  y: 500,
  walkCycle: 0
};

const keys = { w: false, s: false, a: false, d: false };

// Initialize game
function initGame() {
  canvas.width = VIEW_W;
  canvas.height = VIEW_H;
  
  const loaded = loadGame();
  if (!loaded) {
    // Start fresh
    startCutscene(CUTSCENES.wakeUp);
  }
  
  loadArea(gameState.currentArea);
  player.x = gameState.playerX;
  player.y = gameState.playerY;
  updateUI();
  updateQuestTracker();
  
  // Event listeners
  document.getElementById('menuBtn').onclick = showMenu;
  document.getElementById('bagBtn').onclick = showBag;
  document.getElementById('petsBtn').onclick = showPets;
  document.getElementById('saveBtn').onclick = saveGame;
  document.getElementById('runBtn').onclick = runFromBattle;
  document.getElementById('dialogBox').onclick = nextDialog;
  
  canvas.addEventListener('click', handleCanvasClick);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  animate();
}



function handleCanvasClick(e) {
  if (isInCutscene || inBattle) return;
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (VIEW_W / rect.width);
  const my = (e.clientY - rect.top) * (VIEW_H / rect.height);
  player.targetX = camX + mx;
  player.targetY = camY + my;
}

function handleKeyDown(e) {
  if (isInCutscene || inBattle) return;
  const k = e.key.toLowerCase();
  if (k === 'w') keys.w = true;
  if (k === 's') keys.s = true;
  if (k === 'a') keys.a = true;
  if (k === 'd') keys.d = true;
  if (['w','s','a','d'].includes(k)) {
    player.targetX = player.x;
    player.targetY = player.y;
  }
}

function handleKeyUp(e) {
  const k = e.key.toLowerCase();
  if (k === 'w') keys.w = false;
  if (k === 's') keys.s = false;
  if (k === 'a') keys.a = false;
  if (k === 'd') keys.d = false;
}

function updateMovement() {
  if (isInCutscene || inBattle) return;
  
  let mx = 0, my = 0;
  if (keys.w) my -= 1;
  if (keys.s) my += 1;
  if (keys.a) mx -= 1;
  if (keys.d) mx += 1;
  
  if (mx !== 0 || my !== 0) {
    const len = Math.hypot(mx, my);
    mx /= len;
    my /= len;
    
    player.x += mx * player.speed;
    player.y += my * player.speed;
    player.walkCycle += 0.18;
    
    // Boundary
    player.x = Math.max(50, Math.min(player.x, WORLD_W - 50));
    player.y = Math.max(50, Math.min(player.y, WORLD_H - 50));
  } else {
    player.walkCycle = 0;
  }
  
  // Pet follows
  const angle = Math.atan2(player.y - pet.y, player.x - pet.x);
  pet.x += Math.cos(angle) * 2.8;
  pet.y += Math.sin(angle) * 2.8;
  pet.walkCycle += 0.1;
  
  // Camera
  camX = player.x - VIEW_W/2;
  camY = player.y - VIEW_H/2;
  camX = Math.max(0, Math.min(camX, WORLD_W - VIEW_W));
  camY = Math.max(0, Math.min(camY, WORLD_H - VIEW_H));
  
  // Check enemy collision
  for (const enemy of currentAreaEnemies) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    if (Math.hypot(dx, dy) < 40 && !inBattle && !isInCutscene) {
      startBattle(enemy.id);
      break;
    }
  }
}

function drawPlayer() {
  const x = player.x - camX;
  const y = player.y - camY;
  const bob = Math.sin(Date.now() / 180) * 1.5;
  const legSwing = Math.sin(player.walkCycle * Math.PI) * 4;
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 3, y + 30, 15, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Cape
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(x - 12, y - 2 + bob);
  ctx.quadraticCurveTo(x - 5, y + 18 + bob, x, y + 22 + bob);
  ctx.quadraticCurveTo(x + 5, y + 18 + bob, x + 12, y - 2 + bob);
  ctx.fill();
  
  // Body
  ctx.fillStyle = gameState.storyFlags.hasRobe ? '#8b5cf6' : '#3b82f6';
  ctx.fillRect(x - 12, y - 8 + bob, 24, 30);
  
  // Legs
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(x - 9 + legSwing * 0.4, y + 18 + bob, 7, 14);
  ctx.fillRect(x + 2 - legSwing * 0.4, y + 18 + bob, 7, 14);
  
  // Head
  ctx.fillStyle = '#fcd34d';
  ctx.beginPath();
  ctx.ellipse(x, y - 14 + bob, 14, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Hair
  ctx.fillStyle = '#d97706';
  ctx.fillRect(x - 10, y - 26 + bob, 20, 8);
  
  // Eyes
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(x - 6, y - 18 + bob, 4, 5);
  ctx.fillRect(x + 2, y - 18 + bob, 4, 5);
  
  // Wand
  if (gameState.storyFlags.hasWand) {
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(x + 14, y - 6 + bob, 4, 35);
    ctx.fillStyle = gameState.storyFlags.hasLavaWand ? '#f97316' : '#60a5fa';
    ctx.beginPath();
    ctx.ellipse(x + 16, y - 9 + bob, 5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPet() {
  const x = pet.x - camX;
  const y = pet.y - camY;
  const activePet = gameState.pets[gameState.activePet];
  const bob = Math.sin(Date.now() / 160) * 1.5;
  const runCycle = Math.sin(pet.walkCycle * Math.PI * 2) * 4;
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 22, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Body
  ctx.fillStyle = activePet.color;
  ctx.fillRect(x - 10, y - 3 + bob, 20, 22);
  
  // Tail
  ctx.fillStyle = activePet.darkColor;
  ctx.fillRect(x + 11, y + 5 + bob, 10 + runCycle * 0.5, 5);
  
  // Head
  ctx.fillStyle = activePet.color;
  ctx.beginPath();
  ctx.ellipse(x, y - 10 + bob, 11, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Ears
  ctx.fillStyle = activePet.darkColor;
  ctx.fillRect(x - 8, y - 18 + bob, 5, 8);
  ctx.fillRect(x + 3, y - 18 + bob, 5, 8);
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.fillRect(x - 5, y - 13 + bob, 3, 4);
  ctx.fillRect(x + 2, y - 13 + bob, 3, 4);
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(x - 4, y - 12 + bob, 2, 3);
  ctx.fillRect(x + 3, y - 12 + bob, 2, 3);
  
  // Nose
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x - 1, y - 7 + bob, 2, 2);
}

function animate() {
  updateMovement();
  
  ctx.clearRect(0, 0, VIEW_W, VIEW_H);
  
  // Sky
  const grad = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  grad.addColorStop(0, '#87CEEB');
  grad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  
  drawWorld();
  
  requestAnimationFrame(animate);
}

// Start the game
initGame();
