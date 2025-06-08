// This is a temporary file containing our new movePlayer function
// After examining the existing code, we'll use this to help us implement it properly

// Spieler bewegen
function movePlayer() {
    if (gamePaused) return;
    
    const prevX = player.x;
    const prevY = player.y;
    player.isMoving = false;
    
    // Diagonale Bewegung normalisieren, damit der Spieler nicht schneller diagonal läuft
    let dx = 0;
    let dy = 0;
    
    if (keys['w'] || keys['ArrowUp']) {
        dy -= 1;
        player.direction = 'up';
        player.isMoving = true;
    }
    if (keys['s'] || keys['ArrowDown']) {
        dy += 1;
        player.direction = 'down';
        player.isMoving = true;
    }
    if (keys['a'] || keys['ArrowLeft']) {
        dx -= 1;
        player.direction = 'left';
        player.isMoving = true;
    }
    if (keys['d'] || keys['ArrowRight']) {
        dx += 1;
        player.direction = 'right';
        player.isMoving = true;
    }
    
    // Normalisieren, damit diagonale Bewegung nicht schneller ist
    if (dx !== 0 && dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        dx = dx / length;
        dy = dy / length;
    }
    
    // Bewege den Spieler
    player.x += dx * player.speed;
    player.y += dy * player.speed;
    
    // Animation aktualisieren
    player.updateAnimation();
    
    // Spieler innerhalb der Welt halten
    player.x = Math.max(0, Math.min(player.x, WORLD_SIZE - player.width));
    player.y = Math.max(0, Math.min(player.y, WORLD_SIZE - player.height));
    
    // Kollisionen mit Objekten prüfen
    checkCollisions(prevX, prevY);
    
    // Kamera dem Spieler folgen lassen
    camera.follow(player);
    
    // HUD aktualisieren
    updateHUD();
}
