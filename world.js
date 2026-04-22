// WORLD RENDERING
let currentAreaEnemies = [];

function loadArea(areaId) {
  gameState.currentArea = areaId;
  const area = AREAS[areaId];
  
  // Load enemies for this area
  if (areaId === 'forest') {
    currentAreaEnemies = [
      { ...ENEMIES.forestSlime, x: 800, y: 600 },
      { ...ENEMIES.forestSlime, x: 1100, y: 800 },
      { ...ENEMIES.forestSlime, x: 1400, y: 700 },
      { ...ENEMIES.forestGoblin, x: 1700, y: 900 }
    ];
    if (!gameState.storyFlags.defeatedForestFanter) {
      currentAreaEnemies.push({ ...ENEMIES.fanterForest, x: 2000, y: 1100 });
    }
  } else if (areaId === 'stormPeak') {
    currentAreaEnemies = [
      { ...ENEMIES.frostbite, x: 500, y: 300 },
      { ...ENEMIES.frostbite, x: 700, y: 500 }
    ];
  } else if (areaId === 'lavaCaverns') {
    currentAreaEnemies = [
      { ...ENEMIES.emberfang, x: 600, y: 400 },
      { ...ENEMIES.emberfang, x: 800, y: 600 }
    ];
  } else {
    currentAreaEnemies = [
      { ...ENEMIES.slime, x: 600, y: 400 },
      { ...ENEMIES.slime, x: 900, y: 600 },
      { ...ENEMIES.goblin, x: 1200, y: 800 }
    ];
  }
}

function drawWorld() {
  // Draw ground
  ctx.fillStyle = AREAS[gameState.currentArea].background;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  
  // Draw grass texture
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = '#4ade80';
    ctx.fillRect((i * 131) % VIEW_W, (i * 253) % VIEW_H, 2, 2);
  }
  
  // Draw enemies
  for (const enemy of currentAreaEnemies) {
    drawMapEnemy(enemy);
  }
  
  // Draw NPCs if in forest
  if (gameState.currentArea === 'forest') {
    drawNPCs();
  }
}

function drawMapEnemy(enemy) {
  const x = enemy.x - camX;
  const y = enemy.y - camY;
  if (x < -50 || x > VIEW_W + 50) return;
  
  const bounce = Math.sin(Date.now() / 200) * 3;
  
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(x + 2, y + 22 + bounce, 15, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = enemy.color;
  ctx.beginPath();
  ctx.ellipse(x, y + 8 + bounce, 17, 19, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(x - 7, y + 3 + bounce, 4, 5);
  ctx.fillRect(x + 3, y + 3 + bounce, 4, 5);
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(x - 6, y + 4 + bounce, 2, 3);
  ctx.fillRect(x + 4, y + 4 + bounce, 2, 3);
  
  if (enemy.isBoss) {
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('BOSS', x - 15, y - 10);
  }
}

function drawNPCs() {
  const npcs = [
    { id: 'elderOak', name: 'Elder Oak', x: 900, y: 700 }
  ];
  
  for (const npc of npcs) {
    const x = npc.x - camX;
    const y = npc.y - camY;
    if (x > -50 && x < VIEW_W + 50 && y > -60 && y < VIEW_H + 60) {
      ctx.fillStyle = '#fcd34d';
      ctx.fillRect(x - 8, y - 15, 16, 20);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x - 6, y - 22, 12, 8);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(x - 3, y - 12, 2, 3);
      ctx.fillRect(x + 1, y - 12, 2, 3);
      
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(x - 25, y - 32, 50, 15);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '8px monospace';
      ctx.fillText(npc.name, x - 20, y - 22);
      
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('?', x - 3, y - 28);
      
      // Check collision with NPC
      const playerX = player.x - camX;
      const playerY = player.y - camY;
      if (Math.hypot(playerX - x, playerY - y) < 30 && !inBattle && !inCutscene) {
        startDialogSequence('elderOakIntro');
      }
    }
  }
}
