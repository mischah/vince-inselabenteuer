// Verschiedene Item-Typen für die Welt
const itemTypes = [
    { name: 'Heiltrank', type: 'potion', effect: { health: 30 } },
    { name: 'Mana-Trank', type: 'potion', effect: { mana: 20 } },
    { name: 'Holz', type: 'material', value: 2 },
    { name: 'Stein', type: 'material', value: 3 },
    { name: 'Eisen', type: 'material', value: 5 },
    { name: 'Schwert', type: 'weapon', attackBonus: 5, value: 20 },
    { name: 'Schild', type: 'armor', defenseBonus: 3, value: 15 },
    { name: 'Goldmünze', type: 'gold', value: 10 }
];

// Game Constants
const WORLD_SIZE = 4000; // Größe der Spielwelt (erhöht)
const TILE_SIZE = 50;    // Größe eines Tiles
const PLAYER_SPEED = 5;  // Bewegungsgeschwindigkeit des Spielers
const DAY_LENGTH = 600;  // Länge eines Tages in Frames (ca. 10 Sekunden)

// Bild-Assets laden
const images = {};
const imageUrls = {
    player_down: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF/SURBVFhH7ZU7TsNAEIZnvRt7sUgRgkSFBBdIkyNwgpy6RIo6DZwAKiooOAUVNGmgP82ueAuzG0jAT/pp5z/vzXpniKH+qSpLNWJWqzW6KtFTkuVWpYvPJ2znYnyHdVle4+huvlCz4vwsdef30LSPcDzEGgcPHdrGIjo0R91B0zaq7uj4U+03W3W+XMlouJVk8k3XND1QG6ff+XxAeQcOrtY6vSSayM+a+TW1nZ4KtIOE+3Pjm3TKWKyPsQ/ioqixvFR2voZuZqa2r+h6Xf86YJInhH/F9IQOU0SKqKVL73r3CAJCEdYy/n4E1yIgDBGkDxHUvReoHUsEhCOoexs0jBG+CONR00tXt+v9BwyLSzUMkzGUziP8Yt//mLrMHEqGdf7oHuFhTN2weiSgarMPR1W68d9EXB5bXz+C8U/wsQyPY+waMI6pM6Zsy6OvX1L3NFZL39uYuiGH8NHUL6l7ivW4WC60tI+pG7YKsu+BCDL0Z+IuvJq6dUZ6p/+SjL4BcZiaSm4RzfsAAAAASUVORK5CYII=',
    player_up: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGASURBVFhH7ZVNTsJQFIXfK1VLR0xMHOjEuROduAE34M6cugF34A7cgTtwDa7AuXHiwKEDEwPUCIXHPa+paUtIoQMGJpzkpO/+nK/3vVYsu/I3eq9KanNzcy2mpadEzpvWHYYFzGSiD9+/5hYDIm7C3ML9twaXVWkbVrIqn0xuWPCXYbqlkZdrZ1w1xJhLcD2NcQfFE6RXO2H7pPqI6k+HBXMlYRhqkqZmTyGZZmmeL036/OK2IwgH1rG31+wfOJeZcBilEkVB865xZm0QF9B4a3KJ4T0M5zKn2h1mNuMmjIY4GchhYPramMTZZQ4t6TO9FVz3RxzT3WelLiKao9NXdZaXm9UkJEDOrFt/R8gVdLDZ1GE0zWFesNpnWLXwx8eiTuRXBP8bygDxpGZIM+BkD6A9Ex01jXpRUelw74ad6evRQCerK71cLeU8W5hM1r18cIncWAxwaRYPL+jT6vu9uJ72pNvJbQBZPDJVGWinSXif47voOCME8/3/hGMx+QHZ7IbE5UOzQAAAAABJRU5ErkJggg==',
    player_left: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGDSURBVFhH7ZQ9TsNAEIVnNo4dLCIkJBoc0VChQYKGgorT0HGCcAJOwp3oOAFH4AA0aehSOFSICIlYYZON7eyQWVnWxkps8CYNYj/pafbPszOz646kf2p9lCIPj+8KG10F2ji9qpTOHz4NnUwVLj5F55FS0YkcjE90+/qls/OJ9DtVCUI7g9RqU5i1excMt/zefXs+YYiBzmbVzr0GYa4whCwCN1fC9u7l25aLozcq+TSApSDDRTqCU0HCJLDZkCDszm5PCDK4bgb3FsEBeZQ7kT1JlNpJWPBv3YUQVrMUySXFDfr1G5+Leuurbb5FvBSmQ/N+EyGEN74YoJMYO4mJRQG5D5fbrmMel8K+EcLYIeCTkWhlKZzvFG6uOXQDLGtofR4ihBtuQyq+kIM4BWoVWVsDk2NhPw/hfWBVXnjgmWzIXH3GP7IQrrbY+lYI6IQcJbkxWqYQrPbaRUph7OVFSrG5roS18y+lSP17KVx7o1KUiC9cHIystc79j+Vw7N3/LIe7C0qxkVLkkLvfYP6G65VnkqgAAAAASUVORK5CYII=',
    player_right: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGGSURBVFhH7ZRBTsJAFIbfzLQDLYkhMSHRuHHpysQLcAPvgBs3HsEjuPcKegSP4AHcuHLlwqUbEhJijEnBdlra6fhHOtA61IhL4Ev+zPv75s+8Ny2xpX9qDFRyef0goNXzjjZOL/PK5Yf3QaeLSiPfon1IWdq+7A9PdHPzppM4kV7wJKHtB8yrRWEWzF1wru8YrtwfJsCQg9E42/damNUxNGURuLrgbOH27aS5OHyWgk8DWFJkuPgiOBWsKRJs1SUIu7W7lYMM7mcoxw2Cw3KXOzd2FEsaiRs/S2ccQzVNpc5SWI87Q8s3Llt766PNvkE8FaKF+X7JQgjvA11AIzEyCTGrAvIDLl9z5sbh2KctwsUhYD0RaZZScL5VsFnhEIa6TU3n4xb8gYswKL4QwrgCuYq0rYHRIc9+GEXm/QybrYII/Wy++QX/iKdg65ytbzzCvylOkt5oLWOI6ba7iiWMowiLWEK7LQXTnX9hCfF3lsCNN2oJT3jDhcEo107nv8thWUf/sxz2/JZQawtLSCLf4vw52TVwgx0AAAAASUVORK5CYII=',
    tree: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVFhH7ZVNS8NAEMW3SdPUtrSCBz+OHjwKHvwK/gNP/kJP/hE9iR70JHjwIAji2Y/SllabNBm3k7ihJilNPQgdeMy+2eyb2c1uEqb+KJPJ/Ij9wSCN6V+SyOxaHb7iOKZt5/Los9/c8rSbOzy+049lSY5OyzJfeE2mpfQPDxw2LO7QvwZvN730AmKVY5yIaLD1OC+4tl4tI2m1YUpoWp8SLlarNYN9wJe9Pc1OCf8RTasE0YDaEc5AF5ORmJQAP9UbDUXN5mQHvAWHsbAR8FZaraFweBYnAvJ+tKCilz9NkwmlqP+Idh4sXvK8r7TywiQgT0EMCqWinAQeu1WHCYRCVDp514vV0i3ZcaXO4O7xQRgLzloMMQhiYQJqIMO3oNNppxeT4AI48j4h0LEjFWxLu5Gw3AjgomuBIA2BmHycJiCBXo5aA2ECodjTcB/AAVqr0wREAJ4j1MLHsRF2/yImKeBrvtCTawGFH5cziSqGJLFuCyLHeXJt4gRcuHO7o9ZKFaVYWBWgCwC6CwGP9/eP2rOFRXp0Xcpbu4YzqIT8TZwsYKvbGa2g/H9+x5n6JQzzE10aYANITq9IAAAAAElFTkSuQmCC',
    rock: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD/SURBVFhH7ZTRCcIwFEXTRKNVcALdwBF0FEdwAkfRCZxAcQBXcANdwBWqIKn3kQeGkMQ09IOCBy7N63v3JSFJlP5CXk9JpvS9RlA1WS4+FT/CvL+27XfO/Z7MTs+FLI+nMl4sVzKdH7Ctg8nWSBUn7fqGdsTiPY5tN3RdJbulvFp0k+M96/Ve3bEQB5YlmF+zcNyY5QFEVMUTCJCCg8A7wgAW1ATqigOvgIMAbQAL8QmCAs1h0F+HUxBAQ6bdWKy/CVxor0EIdZC0Ee4PQWgNeguw2Fp6LYTfwC/g9QZaH9B8iH5VACKCgIimUxygPUSfO0DnN+CoYPpHSfQBDKKlXjMOH5gAAAAASUVORK5CYII=',
    house: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFHSURBVFhH7ZVBCsIwEEWTpGmt4sIDeBO9/xHcegYXLlzUhRsXIlUs2qZpnJFBCilpky7UhfPgE5L5M/8naUuU/olUin8it+ss5j+lN7JCT+U6BeKo05V8mUq+3x3V5uyCYwl+2wMxRSACQaE3ByLWYtkJV6w/eNAy9s0cM0E6o24lW21ImBlF+cGAGWriAcNCBlmtgJszzDn2F2tRNdEV1JoTh1jbePrGqcTJcJsMfT1ookw1ERECKCj7MPaVRLCWxoBXgz8sKnFAmABuFyKgCPCQigaGuFhfkQA2mJZsuhwBlDA/L1dKGGuagXUO2BMwcyXLtK+uwN+IoO4J8DiZMl83dS4gyALmKVgvDwizADfQGNvH/YCdcC5twlBhweNgO+JkK/CwUXyQsQLcnJvOCHPztkMz+I54C/4X7L+Cod9xovQTRPQAFj+wsNMpetsAAAAASUVORK5CYII=',
    enemy: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFDSURBVFhH7ZVNTsMwEIVnnGTipPwUCQnYsGDFkiVn4BAcgkNwBo7AEVhzANiw4BQsEEgUChoIadMk48HTyJYaV07TBSx4n/TkzLz5xpmxU6n0RxQq+xM+HC0ZxwPJVkW1nq25GcWTt+HNvr9m1Pv8KXQudTi5eVwVOVE1s+3jQ5HZlHS2luvnkaj7xxDxPCLs2hVdW39SeF5EDz0p92+HFt8sjSYgUoF3dvYkcVxzbM1FVLUkpGcLN6+5PKNqTUBUzq/KU44OxFvYRTyG2UMfnlYOQKCX4ffzs3Y02gTzmPZJkM0+XgbitD2W5nrPxDcbkq7WMWXqL3jJz864MOw5FpfDvky/Ph3jnD8iE48J8E+ttPxUAHP8wLSyxNlsgsduJb/a8YZnXzc2wbwTB4E4iodoUmDk/if420epVPoDKpVvn81aV+FHrIYAAAAASUVORK5CYII=',
};

// Lade alle Bilder
function loadImages() {
    const promises = [];
    for (let key in imageUrls) {
        promises.push(new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.src = imageUrls[key];
            images[key] = img;
        }));
    }
    return Promise.all(promises);
}

// Spieler-Objekt
const player = {
    x: WORLD_SIZE / 2,
    y: WORLD_SIZE / 2,
    width: 30,
    height: 30,
    color: 'red',
    health: 100,
    maxHealth: 100,
    speed: PLAYER_SPEED,
    attackPower: 20,
    direction: 'down', // down, up, left, right
    animationFrame: 0,
    animationCounter: 0,
    animationSpeed: 6, // Lower number = faster animation
    isMoving: false,  // Flag to track if player is moving
    inventory: [],
    maxInventorySize: 12,
    activeQuests: [],
    completedQuests: [],
    experience: 0,
    level: 1,
    gold: 50,
    
    // Animation Method
    updateAnimation: function() {
        if (this.isMoving) {
            this.animationCounter = (this.animationCounter + 1) % this.animationSpeed;
            if (this.animationCounter === 0) {
                // Wechsel zwischen Frame 0 und 1 für Laufanimation
                this.animationFrame = (this.animationFrame + 1) % 2;
            }
        } else {
            // Im Stand immer Frame 0 verwenden
            this.animationFrame = 0;
            this.animationCounter = 0;
        }
    },
    
    // Spieler heilen
    heal: function(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        updateHUD();
    },
    
    // Schaden nehmen
    takeDamage: function(amount) {
        this.health = Math.max(0, this.health - amount);
        updateHUD();
        
        if (this.health <= 0) {
            alert("Du wurdest besiegt! Das Spiel wird neu gestartet.");
            this.respawn();
        }
    },
    
    // Respawn nach dem Tod
    respawn: function() {
        this.x = WORLD_SIZE / 2;
        this.y = WORLD_SIZE / 2;
        this.health = this.maxHealth;
        updateHUD();
    },
    
    // Item zum Inventar hinzufügen
    addItem: function(item) {
        if (this.inventory.length < this.maxInventorySize) {
            this.inventory.push(item);
            return true;
        }
        return false;
    },
    
    // Item aus dem Inventar entfernen
    removeItem: function(itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.inventory.length) {
            return this.inventory.splice(itemIndex, 1)[0];
        }
        return null;
    },
    
    // Quest annehmen
    acceptQuest: function(quest) {
        if (!this.activeQuests.find(q => q.id === quest.id) && 
            !this.completedQuests.find(q => q.id === quest.id)) {
            this.activeQuests.push(quest);
            return true;
        }
        return false;
    },
    
    // Quest-Status prüfen und abschließen
    checkQuestCompletion: function() {
        this.activeQuests.forEach((quest, index) => {
            // Spezielle Behandlung basierend auf dem Quest-Typ
            if (quest.objective.type === 'kill' && quest.objective.target === 'monster') {
                // Kill-Quests werden im attack() bereits behandelt
            } 
            else if (quest.objective.type === 'gather') {
                // Für Sammel-Quests überprüfen wir, ob die erforderlichen Gegenstände im Inventar sind
                let count = 0;
                this.inventory.forEach(item => {
                    if (item.name === quest.objective.target) {
                        count++;
                    }
                });
                
                quest.objective.current = count;
            }
            else if (quest.objective.type === 'explore') {
                // Erkundungs-Quests werden an anderen Stellen aktualisiert
            }
            
            // Überprüfen, ob die Quest abgeschlossen ist
            if (quest.checkCompletion(this)) {
                // Quest abschließen und Belohnungen vergeben
                this.completeQuest(index);
            }
        });
    },
    
    // Quest abschließen
    completeQuest: function(questIndex) {
        if (questIndex >= 0 && questIndex < this.activeQuests.length) {
            const quest = this.activeQuests[questIndex];
            
            // Belohnungen hinzufügen
            this.experience += quest.rewards.exp || 0;
            this.gold += quest.rewards.gold || 0;
            
            if (quest.rewards.items) {
                quest.rewards.items.forEach(item => this.addItem(item));
            }
            
            // Quest von aktiv zu abgeschlossen verschieben
            this.completedQuests.push(quest);
            this.activeQuests.splice(questIndex, 1);
            
            // Leveling prüfen
            this.checkLevelUp();
            
            // UI aktualisieren
            updateQuestPanel();
            
            alert(`Quest abgeschlossen: ${quest.name}\nDu erhältst: ${quest.rewards.gold} Gold, ${quest.rewards.exp} Erfahrung`);
        }
    },
    
    // Level erhöhen
    checkLevelUp: function() {
        const expNeeded = this.level * 100;
        
        if (this.experience >= expNeeded) {
            this.level++;
            this.experience -= expNeeded;
            this.maxHealth += 10;
            this.heal(this.maxHealth);
            this.attackPower += 5;
            
            alert(`Glückwunsch! Du bist aufgestiegen auf Level ${this.level}!`);
        }
    },
    
    // Angreifen
    attack: function() {
        const range = 50;
        // Berechne Angriffskraft mit Waffe
        let attackPower = this.attackPower;
        if (equipmentSlots.weapon && equipmentSlots.weapon.attackBonus) {
            attackPower += equipmentSlots.weapon.attackBonus;
        }
        // Prüfe Gegner in der Nähe
        for (let i = 0; i < world.enemies.length; i++) {
            const enemy = world.enemies[i];
            const distance = Math.sqrt(
                Math.pow(enemy.x - this.x, 2) + 
                Math.pow(enemy.y - this.y, 2)
            );
            if (distance < range) {
                // Schaden am Gegner verursachen
                enemy.health -= attackPower;
                if (enemy.health <= 0) {
                    // Gegner besiegt, Belohnungen erhalten
                    this.gold += enemy.gold;
                    this.experience += enemy.exp;
                    if (enemy.drops && Math.random() < enemy.dropChance) {
                        const dropIndex = Math.floor(Math.random() * enemy.drops.length);
                        const item = enemy.drops[dropIndex];
                        world.items.push({
                            x: enemy.x,
                            y: enemy.y,
                            width: 15,
                            height: 15,
                            item: item
                        });
                    }
                    world.enemies.splice(i, 1);
                    i--;
                    this.activeQuests.forEach(quest => {
                        if (quest.objective.type === 'kill' && quest.objective.target === 'monster') {
                            if (quest.objective.nightOnly) {
                                if (dayNightCycle.isNight) {
                                    quest.objective.current++;
                                }
                            } else {
                                quest.objective.current++;
                            }
                        }
                    });
                    this.checkQuestCompletion();
                    this.checkLevelUp();
                }
                return true;
            }
        }
        // Prüfe Dorfbewohner in der Nähe
        for (const village of world.villages) {
            if (!village.npcs) continue;
            for (const npc of village.npcs) {
                const distance = Math.sqrt(
                    Math.pow(npc.x - this.x, 2) + 
                    Math.pow(npc.y - this.y, 2)
                );
                if (distance < range) {
                    attackNPC(npc);
                    return true;
                }
            }
        }
        return false;
    }
};

// Kamera-Objekt (anpassen, damit Kamera nicht über den Rand hinausgeht)
const camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    follow: function(target) {
        this.x = target.x - this.width / 2;
        this.y = target.y - this.height / 2;
        // Begrenzungen der Kamera
        this.x = Math.max(0, Math.min(this.x, WORLD_SIZE - this.width));
        this.y = Math.max(0, Math.min(this.y, WORLD_SIZE - this.height));
    }
};

// Tag-/Nacht-Zyklus
const DAY_FRAMES = 60 * 60 * 7; // 7 Minuten bei 60 FPS
const NIGHT_FRAMES = 60 * 60 * 5; // 5 Minuten bei 60 FPS
const TOTAL_FRAMES = DAY_FRAMES + NIGHT_FRAMES;

const dayNightCycle = {
    time: 0,
    isNight: false,
    overlayAlpha: 0, // Für sanftes Fading
    update: function() {
        this.time = (this.time + 1) % TOTAL_FRAMES;
        this.isNight = this.time >= DAY_FRAMES;

        // Fading berechnen
        let targetAlpha = this.isNight ? 0.6 : 0;
        // Sanftes Annähern an Zielwert
        this.overlayAlpha += (targetAlpha - this.overlayAlpha) * 0.02;
        if (Math.abs(targetAlpha - this.overlayAlpha) < 0.01) this.overlayAlpha = targetAlpha;

        document.getElementById('time').textContent = `Zeit: ${this.isNight ? 'Nacht' : 'Tag'}`;

        // Overlay-Element holen oder erzeugen
        let nightOverlay = document.querySelector('.night-overlay');
        if (!nightOverlay) {
            nightOverlay = document.createElement('div');
            nightOverlay.className = 'night-overlay';
            document.querySelector('.game-container').appendChild(nightOverlay);
        }
        nightOverlay.style.opacity = this.overlayAlpha;
        nightOverlay.style.display = (this.overlayAlpha > 0.01) ? 'block' : 'none';

        // Nachts werden Gegner stärker und aggressiver
        world.enemies.forEach(enemy => {
            enemy.strength = this.isNight ? enemy.baseStrength * 1.5 : enemy.baseStrength;
        });
    }
};

// Welt erstellen
const world = {
    map: [],
    trees: [],
    rocks: [],
    buildings: [],
    npcs: [],
    enemies: [],
    items: [],
    villages: [], // Dörfer hinzufügen
    
    // Zufällige Welt generieren
    generate: function() {
        // Grundfläche generieren
        for (let y = 0; y < WORLD_SIZE / TILE_SIZE; y++) {
            this.map[y] = [];
            for (let x = 0; x < WORLD_SIZE / TILE_SIZE; x++) {
                // 0 = Gras, 1 = Wasser, 2 = Sand
                let tile = 0;
                
                // Erzeuge ein einfaches zufälliges Terrain
                const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) + Math.random() * 0.2;
                
                if (noise < -0.2) {
                    tile = 1; // Wasser
                } else if (noise < 0) {
                    tile = 2; // Sand
                }
                
                this.map[y][x] = tile;
            }
        }
        
        // Bäume und Felsen generieren
        this.trees = [];
        this.rocks = [];
        for (let i = 0; i < 300; i++) { // Mehr Bäume und Felsen für größere Welt
            this.trees.push({
                x: Math.random() * WORLD_SIZE,
                y: Math.random() * WORLD_SIZE,
                width: 30,
                height: 40
            });
            this.rocks.push({
                x: Math.random() * WORLD_SIZE,
                y: Math.random() * WORLD_SIZE,
                width: 20,
                height: 20
            });
        }
        
        // Gebäude generieren
        this.buildings = [];
        this.npcs = [];
        for (let i = 0; i < 16; i++) { // Mehr Gebäude für größere Welt
            const buildingSize = 80 + Math.random() * 40;
            let validPosition = false;
            let x, y;
            
            // Stelle sicher, dass Gebäude nicht im Wasser oder zu nah beieinander sind
            while (!validPosition) {
                x = Math.random() * (WORLD_SIZE - buildingSize);
                y = Math.random() * (WORLD_SIZE - buildingSize);
                
                const tileX = Math.floor(x / TILE_SIZE);
                const tileY = Math.floor(y / TILE_SIZE);
                
                if (this.map[tileY][tileX] !== 1) {
                    validPosition = true;
                    
                    // Prüfe Abstand zu anderen Gebäuden
                    for (const building of this.buildings) {
                        const dist = Math.sqrt(
                            Math.pow(building.x - x, 2) + 
                            Math.pow(building.y - y, 2)
                        );
                        
                        if (dist < 200) {
                            validPosition = false;
                            break;
                        }
                    }
                }
            }
            
            // Gebäude der Welt hinzufügen
            const building = {
                x: x,
                y: y,
                width: buildingSize,
                height: buildingSize,
                id: `building_${i}`,
                type: i === 0 ? 'shop' : 'house'
            };
            
            this.buildings.push(building);
            
            // NPCs in der Nähe von Gebäuden platzieren
            if (i === 0) {
                // Händler beim ersten Gebäude
                this.npcs.push({
                    x: x + buildingSize + 20,
                    y: y + buildingSize / 2,
                    width: 25,
                    height: 30,
                    color: '#FFD700',
                    name: 'Händler',
                    dialogue: {
                        greeting: 'Willkommen im Laden!',
                        options: [
                            {
                                text: 'Waren kaufen',
                                response: 'Ich habe viele nützliche Dinge!',
                                action: 'openShop'
                            },
                            {
                                text: 'Auf Wiedersehen',
                                response: 'Bis zum nächsten Mal!',
                                action: 'close'
                            }
                        ]
                    }
                });
            } else if (i < questGivers.length + 1) {
                // Quest-Geber aus der quests.js-Datei
                const questGiver = questGivers[i - 1];
                const npcX = i % 2 === 0 ? x + buildingSize + 20 : x - 40;
                const npcY = i % 2 === 0 ? y + buildingSize / 2 : y + buildingSize / 3;
                
                this.npcs.push({
                    x: npcX,
                    y: npcY,
                    width: 25,
                    height: 30,
                    color: questGiver.color || '#FFD700',
                    name: questGiver.name,
                    dialogue: questGiver.dialogue
                });
            }
        }
        
        // Gegner generieren
        this.enemies = [];
        for (let i = 0; i < 40; i++) { // Mehr Gegner für größere Welt
            let validPosition = false;
            let x, y;
            
            // Stelle sicher, dass Gegner nicht im Wasser oder zu nah am Spieler sind
            while (!validPosition) {
                x = Math.random() * WORLD_SIZE;
                y = Math.random() * WORLD_SIZE;
                
                const tileX = Math.floor(x / TILE_SIZE);
                const tileY = Math.floor(y / TILE_SIZE);
                
                if (tileY < this.map.length && tileX < this.map[tileY].length && 
                    this.map[tileY][tileX] !== 1) {
                    
                    // Abstand zum Spieler prüfen
                    const distToPlayer = Math.sqrt(
                        Math.pow(player.x - x, 2) + 
                        Math.pow(player.y - y, 2)
                    );
                    
                    if (distToPlayer > 300) {
                        validPosition = true;
                    }
                }
            }
            
            this.enemies.push({
                x: x,
                y: y,
                width: 25,
                height: 25,
                speed: 1 + Math.random() * 2,
                baseStrength: 5 + Math.floor(Math.random() * 10),
                strength: 5 + Math.floor(Math.random() * 10),
                health: 50,
                maxHealth: 50,
                type: 'monster',
                gold: 5 + Math.floor(Math.random() * 10),
                exp: 20 + Math.floor(Math.random() * 20),
                aggroRange: 150,
                active: false,
                dropChance: 0.3,
                drops: [
                    { name: 'Heiltrank', type: 'potion', effect: { health: 50 } },
                    { name: 'Monster-Klaue', type: 'material', value: 5 }
                ]
            });
        }
        
        // Zufällige Items in der Welt platzieren
        this.items = [];
        for (let i = 0; i < 60; i++) { // Mehr Items für größere Welt
            let validPosition = false;
            let x, y;
            
            while (!validPosition) {
                x = Math.random() * WORLD_SIZE;
                y = Math.random() * WORLD_SIZE;
                
                const tileX = Math.floor(x / TILE_SIZE);
                const tileY = Math.floor(y / TILE_SIZE);
                
                if (tileY < this.map.length && tileX < this.map[tileY].length && 
                    this.map[tileY][tileX] !== 1) {
                    validPosition = true;
                }
            }
            
            const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            
            this.items.push({
                x: x,
                y: y,
                width: 15,
                height: 15,
                item: randomItem
            });
        }
        
        // Dörfer generieren
        this.villages = [];
        for (let i = 0; i < 6; i++) { // Mehr Dörfer für größere Welt
            let validPosition = false;
            let x, y;
            
            // Stelle sicher, dass Dörfer nicht im Wasser oder zu nah beieinander sind
            while (!validPosition) {
                x = Math.random() * (WORLD_SIZE - 200) + 100;
                y = Math.random() * (WORLD_SIZE - 200) + 100;
                
                const tileX = Math.floor(x / TILE_SIZE);
                const tileY = Math.floor(y / TILE_SIZE);
                
                if (this.map[tileY][tileX] !== 1) {
                    validPosition = true;
                    
                    // Prüfe Abstand zu anderen Dörfern
                    for (const village of this.villages) {
                        const dist = Math.sqrt(
                            Math.pow(village.x - x, 2) + 
                            Math.pow(village.y - y, 2)
                        );
                        
                        if (dist < 400) {
                            validPosition = false;
                            break;
                        }
                    }
                }
            }
            
            // Dorf zur Welt hinzufügen
            const village = {
                x: x,
                y: y,
                radius: 200,
                buildings: [],
                name: `Dorf ${i + 1}`
            };
            
            this.villages.push(village);
            
            // Gebäude im Dorf hinzufügen
            for (let j = 0; j < 5; j++) {
                const buildingSize = 40 + Math.random() * 40;
                
                const building = {
                    x: x + Math.cos((j / 5) * 2 * Math.PI) * 70 - buildingSize / 2,
                    y: y + Math.sin((j / 5) * 2 * Math.PI) * 70 - buildingSize / 2,
                    width: buildingSize,
                    height: buildingSize,
                    color: '#795548'
                };
                
                village.buildings.push(building);
            }
        }
    }
};

// Hilfsfunktion: Erzeuge zufällige Dorfbewohner für jedes Dorf
function spawnVillageNPCs() {
    for (const village of world.villages) {
        if (!village.npcs) village.npcs = [];
        const npcCount = 2 + Math.floor(Math.random() * 2); // 2-3 NPCs
        for (let i = 0; i < npcCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 60 + Math.random() * 80;
            village.npcs.push({
                x: village.x + Math.cos(angle) * radius,
                y: village.y + Math.sin(angle) * radius,
                width: 22,
                height: 28,
                color: '#FFB74D',
                name: 'Dorfbewohner',
                moveAngle: angle,
                moveSpeed: 0.003 + Math.random() * 0.002,
                homeVillage: village
            });
        }
    }
}

// Hilfsfunktion: Erzeuge weltweite Dorfbewohner mit Heimatdorf
function spawnGlobalVillagers() {
    if (!world.globalVillagers) world.globalVillagers = [];
    const npcCount = 8; // z.B. 8 Dorfbewohner in der Welt
    for (let i = 0; i < npcCount; i++) {
        // Zufälliges Dorf als Heimat
        const homeVillage = world.villages[Math.floor(Math.random() * world.villages.length)];
        // Zufälliges Haus im Dorf
        const homeBuilding = homeVillage.buildings[Math.floor(Math.random() * homeVillage.buildings.length)];
        let valid = false, x, y;
        while (!valid) {
            x = Math.random() * (WORLD_SIZE - 40);
            y = Math.random() * (WORLD_SIZE - 40);
            const tileX = Math.floor(x / TILE_SIZE);
            const tileY = Math.floor(y / TILE_SIZE);
            if (world.map[tileY] && world.map[tileY][tileX] !== 1) valid = true;
        }
        world.globalVillagers.push({
            x, y,
            width: 22,
            height: 28,
            color: '#FFB74D',
            name: 'Dorfbewohner',
            dir: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.5,
            wanderTimer: 0,
            homeVillage,
            homeBuilding,
            atHome: false
        });
    }
}

// Nach dem Generieren der Welt-Dörfer aufrufen
const originalWorldGenerate = world.generate;
world.generate = function() {
    originalWorldGenerate.call(this);
    spawnVillageNPCs();
    spawnGlobalVillagers();
};

// NPCs im Dorf bewegen (Kreisbewegung um das Dorfzentrum)
function updateVillageNPCs() {
    for (const village of world.villages) {
        if (!village.npcs) continue;
        for (const npc of village.npcs) {
            if (npc.aggressive) {
                // Aggressiv: Auf Spieler zulaufen
                const dx = player.x - npc.x;
                const dy = player.y - npc.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist > 2) {
                    npc.x += (dx/dist) * 1.2;
                    npc.y += (dy/dist) * 1.2;
                }
                npc.aggressiveTimer--;
                if (npc.aggressiveTimer <= 0) {
                    npc.aggressive = false;
                }
            } else {
                // Im Normalfall: Kreisbewegung um das Dorfzentrum
                npc.moveAngle += npc.moveSpeed;
                const r = 60 + Math.abs(Math.sin(npc.moveAngle * 0.7)) * 80;
                npc.x = village.x + Math.cos(npc.moveAngle) * r;
                npc.y = village.y + Math.sin(npc.moveAngle) * r;
            }
        }
    }
}

function updateGlobalVillagers() {
    for (const npc of world.globalVillagers || []) {
        if (npc.aggressive) {
            // Aggressiv: Auf Spieler zulaufen
            const dx = player.x - npc.x;
            const dy = player.y - npc.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > 2) {
                npc.x += (dx/dist) * 1.2;
                npc.y += (dy/dist) * 1.2;
            }
            npc.aggressiveTimer--;
            if (npc.aggressiveTimer <= 0) {
                npc.aggressive = false;
            }
            continue;
        }
        // Normalverhalten
        if (dayNightCycle.isNight) {
            // Nachts: Gehe zum Haus
            const target = npc.homeBuilding;
            const dx = target.x + target.width/2 - (npc.x + npc.width/2);
            const dy = target.y + target.height/2 - (npc.y + npc.height/2);
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > 2) {
                npc.x += (dx/dist) * npc.speed;
                npc.y += (dy/dist) * npc.speed;
                npc.atHome = false;
            } else {
                npc.atHome = true;
                // Bleibe im Haus
                npc.x = target.x + target.width/2 - npc.width/2;
                npc.y = target.y + target.height/2 - npc.height/2;
            }
        } else {
            // Tag: Herumlaufen, aber nicht im Wasser oder in Häusern
            if (npc.atHome) {
                // Starte am Haus
                npc.x = npc.homeBuilding.x + npc.homeBuilding.width/2 - npc.width/2;
                npc.y = npc.homeBuilding.y + npc.homeBuilding.height/2 - npc.height/2;
                npc.atHome = false;
            }
            // Pausen-Logik
            if (npc.pauseTimer && npc.pauseTimer > 0) {
                npc.pauseTimer--;
                continue;
            }
            npc.wanderTimer--;
            if (npc.wanderTimer <= 0) {
                npc.dir += (Math.random() - 0.5) * 1.8; // Häufigere Richtungswechsel
                npc.wanderTimer = 30 + Math.random() * 80; // Kürzere Wanderphasen
                // Gelegentlich Pause machen
                if (Math.random() < 0.2) {
                    npc.pauseTimer = 20 + Math.random() * 40;
                }
            }
            const dx = Math.cos(npc.dir) * npc.speed;
            const dy = Math.sin(npc.dir) * npc.speed;
            const newX = npc.x + dx;
            const newY = npc.y + dy;
            const tileX = Math.floor(newX / TILE_SIZE);
            const tileY = Math.floor(newY / TILE_SIZE);
            // Prüfe auf Wasser und Häuser
            let inBuilding = false;
            for (const village of world.villages) {
                for (const building of village.buildings) {
                    if (
                        newX + npc.width > building.x &&
                        newX < building.x + building.width &&
                        newY + npc.height > building.y &&
                        newY < building.y + building.height
                    ) {
                        inBuilding = true;
                        break;
                    }
                }
                if (inBuilding) break;
            }
            if (
                tileX >= 0 && tileY >= 0 &&
                tileX < WORLD_SIZE / TILE_SIZE &&
                tileY < WORLD_SIZE / TILE_SIZE &&
                world.map[tileY][tileX] !== 1 &&
                !inBuilding
            ) {
                npc.x = newX;
                npc.y = newY;
            } else {
                npc.dir += Math.PI; // Drehen
            }
        }
    }
}

// Im Spiel-Loop aufrufen
const originalGameLoop = gameLoop;
gameLoop = function() {
    originalGameLoop();
    renderEquipmentBar();
};

// Dialog-System
const dialogueManager = {
    currentNPC: null,
    
    // Dialog mit NPC starten
    startDialogue: function(npc) {
        this.currentNPC = npc;
        
        // Dialog-Panel anzeigen
        const dialoguePanel = document.getElementById('dialogue-panel');
        dialoguePanel.classList.remove('hidden');
        
        // NPC-Namen anzeigen
        document.getElementById('npc-name').textContent = npc.name;
        
        // Begrüßungstext anzeigen
        document.getElementById('dialogue-text').textContent = npc.dialogue.greeting;
        
        // Dialogoptionen anzeigen
        const optionsElement = document.getElementById('dialogue-options');
        optionsElement.innerHTML = '';
        
        npc.dialogue.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'dialogue-option';
            optionElement.textContent = option.text;
            optionElement.addEventListener('click', () => this.selectOption(index));
            optionsElement.appendChild(optionElement);
        });
        
        // Spiel pausieren
        gamePaused = true;
    },
    
    // Option auswählen
    selectOption: function(optionIndex) {
        const option = this.currentNPC.dialogue.options[optionIndex];
        
        // Antwort anzeigen
        document.getElementById('dialogue-text').textContent = option.response;
        
        // Wenn die Option eine Aktion hat, diese ausführen
        if (option.action === 'giveQuest' && this.currentNPC.dialogue.quest) {
            const accepted = player.acceptQuest(this.currentNPC.dialogue.quest);
            
            if (accepted) {
                setTimeout(() => {
                    alert(`Neue Quest angenommen: ${this.currentNPC.dialogue.quest.name}`);
                    updateQuestPanel();
                }, 500);
            } else {
                setTimeout(() => {
                    alert('Du hast diese Quest bereits angenommen oder abgeschlossen.');
                }, 500);
            }
        } else if (option.action === 'openShop') {
            setTimeout(() => {
                this.closeDialogue();
                shop.open();
            }, 500);
        } else if (option.action === 'close') {
            this.closeDialogue();
        }
    },
    
    // Dialog beenden
    closeDialogue: function() {
        document.getElementById('dialogue-panel').classList.add('hidden');
        this.currentNPC = null;
        gamePaused = false;
    }
};

// Quest-Management
function updateQuestPanel() {
    const questList = document.getElementById('quest-list');
    questList.innerHTML = '';
    
    if (player.activeQuests.length === 0) {
        const noQuestElement = document.createElement('div');
        noQuestElement.textContent = 'Keine aktiven Quests';
        questList.appendChild(noQuestElement);
        return;
    }
    
    player.activeQuests.forEach((quest, index) => {
        const questElement = document.createElement('div');
        questElement.className = 'quest-item';
        
        const progress = quest.objective.current + '/' + quest.objective.count;
        
        questElement.innerHTML = `
            <h3>${quest.name}</h3>
            <p>${quest.description}</p>
            <p>Fortschritt: ${progress}</p>
            <p>Belohnungen: ${quest.rewards.gold} Gold, ${quest.rewards.exp} EP</p>
        `;
        
        questList.appendChild(questElement);
    });
}

// --- Ausrüstungsleiste (Equipment Bar) ---
const equipmentSlots = {
    weapon: null,
    armor: null
};

function renderEquipmentBar() {
    const bar = document.getElementById('equipment-bar');
    if (!bar) return;
    bar.innerHTML = `
        <div class="eq-slot"><span class="eq-label">Waffe:</span> <span class="eq-item">${equipmentSlots.weapon ? equipmentSlots.weapon.name : '-'}</span></div>
        <div class="eq-slot"><span class="eq-label">Rüstung:</span> <span class="eq-item">${equipmentSlots.armor ? equipmentSlots.armor.name : '-'}</span></div>
    `;
}

function equipItem(itemIndex) {
    const item = player.inventory[itemIndex];
    if (!item) return;
    if (item.type === 'weapon') {
        // Wenn bereits ausgerüstet, ablegen
        if (equipmentSlots.weapon === item) {
            equipmentSlots.weapon = null;
        } else {
            equipmentSlots.weapon = item;
        }
    } else if (item.type === 'armor') {
        if (equipmentSlots.armor === item) {
            equipmentSlots.armor = null;
        } else {
            equipmentSlots.armor = item;
        }
    } else {
        return;
    }
    renderEquipmentBar();
}

// --- Inventory Panel ---
function updateInventoryPanel() {
    const inventoryItems = document.getElementById('inventory-items');
    if (!inventoryItems) return;
    inventoryItems.innerHTML = '';
    player.inventory.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = 'inventory-item';
        el.textContent = item.name;
        // Ausrüsten-Button für Waffen und Rüstung
        if (item.type === 'weapon' || item.type === 'armor') {
            const btn = document.createElement('button');
            btn.textContent = (equipmentSlots[item.type] === item) ? 'Ablegen' : 'Ausrüsten';
            btn.style.marginLeft = '8px';
            btn.onclick = (e) => {
                e.stopPropagation();
                equipItem(idx);
                updateInventoryPanel();
            };
            el.appendChild(btn);
        }
        inventoryItems.appendChild(el);
    });
}

// updateInventoryPanel erweitern, nicht überschreiben
if (typeof updateInventoryPanel === 'function') {
    const origUpdateInventoryPanel = updateInventoryPanel;
    updateInventoryPanel = function() {
        origUpdateInventoryPanel();
        // Buttons für Ausrüsten ergänzen
        const inventoryItems = document.getElementById('inventory-items');
        Array.from(inventoryItems.children).forEach((el, idx) => {
            const item = player.inventory[idx];
            if (item && (item.type === 'weapon' || item.type === 'armor')) {
                const btn = document.createElement('button');
                btn.textContent = 'Ausrüsten';
                btn.style.marginLeft = '8px';
                btn.onclick = (e) => {
                    e.stopPropagation();
                    equipItem(idx);
                };
                el.appendChild(btn);
            }
        });
    };
}

document.addEventListener('DOMContentLoaded', renderEquipmentBar);

// Tastatur-Eingaben
const keys = {};
let gamePaused = false;

// Canvas und Kontext
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Event-Listener für Tastatureingaben
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // Inventar mit 'I' öffnen/schließen
    if (e.key === 'i' || e.key === 'I') {
        toggleInventory();
    }
    
    // Quest-Panel mit 'Q' öffnen/schließen
    if (e.key === 'q' || e.key === 'Q') {
        toggleQuestPanel();
    }
    
    // Angriff mit Space
    if (e.key === ' ' && !gamePaused) {
        player.attack();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

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
    
    // Überprüfen, ob Spieler Gebäude für Quests entdeckt
    checkBuildingDiscovery();
    
    // Kamera dem Spieler folgen lassen
    camera.follow(player);
    
    // HUD aktualisieren
    updateHUD();
}

// Kollisionen prüfen
function checkCollisions(prevX, prevY) {
    // Kollision mit Wasser
    const tileX = Math.floor(player.x / TILE_SIZE);
    const tileY = Math.floor(player.y / TILE_SIZE);
    
    if (tileX >= 0 && tileY >= 0 && tileX < WORLD_SIZE / TILE_SIZE && tileY < WORLD_SIZE / TILE_SIZE) {
        if (world.map[tileY][tileX] === 1) {
            // Wasser-Kollision, Bewegung zurücksetzen
            player.x = prevX;
            player.y = prevY;
        }
    }
    
    // Kollisionen mit Bäumen
    for (const tree of world.trees) {
        if (player.x < tree.x + tree.width &&
            player.x + player.width > tree.x &&
            player.y < tree.y + tree.height &&
            player.y + player.height > tree.y) {
            player.x = prevX;
            player.y = prevY;
            break;
        }
    }
    
    // Kollisionen mit Felsen
    for (const rock of world.rocks) {
        if (player.x < rock.x + rock.width &&
            player.x + player.width > rock.x &&
            player.y < rock.y + rock.height &&
            player.y + player.height > rock.y) {
            player.x = prevX;
            player.y = prevY;
            break;
        }
    }
    
    // Kollisionen mit Gebäuden
    for (const building of world.buildings) {
        if (player.x < building.x + building.width &&
            player.x + player.width > building.x &&
            player.y < building.y + building.height &&
            player.y + player.height > building.y) {
            player.x = prevX;
            player.y = prevY;
            break;
        }
    }
    
    // Interaktionen mit NPCs
    for (const npc of world.npcs) {
        const distance = Math.sqrt(
            Math.pow(npc.x - player.x, 2) + 
            Math.pow(npc.y - player.y, 2)
        );
        
        if (distance < 50 && keys['e'] && !gamePaused) {
            dialogueManager.startDialogue(npc);
            break;
        }
    }
    
    // Gegenstände aufsammeln
    for (let i = 0; i < world.items.length; i++) {
        const item = world.items[i];
        
        if (player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y) {
            
            // Item zum Inventar hinzufügen
            if (player.addItem(item.item)) {
                // Item aus der Welt entfernen
                world.items.splice(i, 1);
                i--;
                
                // Meldung anzeigen
                const itemName = item.item.name;
                alert(`${itemName} aufgesammelt!`);
                
                // Inventar aktualisieren
                updateInventoryPanel();
            } else {
                alert('Inventar voll!');
            }
        }
    }
}

// Prüft, ob Spieler ein Gebäude für Erkundungs-Quests entdeckt hat
function checkBuildingDiscovery() {
    if (gamePaused) return;
    
    // Überprüfen, ob Spieler in der Nähe eines Gebäudes ist
    for (const building of world.buildings) {
        // Abstand zum Gebäude berechnen (nimm die Mitte des Gebäudes)
        const distance = Math.sqrt(
            Math.pow((building.x + building.width/2) - (player.x + player.width/2), 2) + 
            Math.pow((building.y + building.height/2) - (player.y + player.height/2), 2)
        );
        
        // Wenn Spieler nahe genug ist, gilt das Gebäude als entdeckt
        const discoveryRange = 100; // Entdeckungsradius
        
        if (distance < discoveryRange) {
            // Überprüfen, ob der Spieler Erkundungs-Quests hat
            player.activeQuests.forEach(quest => {
                if (quest.objective.type === 'explore') {
                    // Wenn es eine Gebäude-Erkundungsquest ist
                    if (quest.objective.target === 'house' && quest.registerLocation) {
                        const isNew = quest.registerLocation(building.id);
                        if (isNew) {
                            alert(`Du hast ein neues Gebäude für deine Quest entdeckt! (${quest.objective.current}/${quest.objective.count})`);
                            // Quest-Status überprüfen
                            player.checkQuestCompletion();
                        }
                    }
                    // Wenn es eine Schatzsuche ist und das richtige Gebäude
                    else if (quest.objective.target === 'treasure' && building.id === 'building_3' && !quest.objective.found) {
                        // Schatz gefunden!
                        if (quest.findTreasure && quest.findTreasure()) {
                            alert('Du hast den legendären Schatz gefunden!');
                            // Quest-Status überprüfen
                            player.checkQuestCompletion();
                        }
                    }
                }
            });
        }
    }
}

// HUD aktualisieren
function updateHUD() {
    document.getElementById('health').textContent = `HP: ${player.health}/${player.maxHealth}`;
    document.getElementById('position').textContent = `Position: ${Math.floor(player.x)}, ${Math.floor(player.y)}`;
}

// Inventar anzeigen/ausblenden
function toggleInventory() {
    if (gamePaused) return;
    
    const inventoryPanel = document.getElementById('inventory-panel');
    const isHidden = inventoryPanel.classList.contains('hidden');
    
    if (isHidden) {
        updateInventoryPanel();
        inventoryPanel.classList.remove('hidden');
        gamePaused = true;
    } else {
        inventoryPanel.classList.add('hidden');
        gamePaused = false;
    }
}

// Quest-Panel anzeigen/ausblenden
function toggleQuestPanel() {
    if (gamePaused) return;
    
    const questPanel = document.getElementById('quest-panel');
    const isHidden = questPanel.classList.contains('hidden');
    
    if (isHidden) {
        updateQuestPanel();
        questPanel.classList.remove('hidden');
        gamePaused = true;
    } else {
        questPanel.classList.add('hidden');
        gamePaused = false;
    }
}

// Welt zeichnen
function drawWorld() {
    // Sichtbaren Bereich berechnen
    const startX = Math.floor(camera.x / TILE_SIZE);
    const startY = Math.floor(camera.y / TILE_SIZE);
    const endX = startX + Math.ceil(canvas.width / TILE_SIZE) + 1;
    const endY = startY + Math.ceil(canvas.height / TILE_SIZE) + 1;
    
    // Tiles zeichnen
    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            if (x >= 0 && y >= 0 && x < WORLD_SIZE / TILE_SIZE && y < WORLD_SIZE / TILE_SIZE) {
                const tile = world.map[y][x];
                
                if (tile === 0) {
                    ctx.fillStyle = dayNightCycle.isNight ? '#1B5E20' : '#4CAF50'; // Gras
                } else if (tile === 1) {
                    ctx.fillStyle = dayNightCycle.isNight ? '#0D47A1' : '#2196F3'; // Wasser
                } else if (tile === 2) {
                    ctx.fillStyle = dayNightCycle.isNight ? '#F57F17' : '#FFC107'; // Sand
                }
                
                ctx.fillRect(
                    x * TILE_SIZE - camera.x,
                    y * TILE_SIZE - camera.y,
                    TILE_SIZE,
                    TILE_SIZE
                );
            }
        }
    }
    
    // Items zeichnen
    for (const item of world.items) {
        if (isInViewport(item)) {
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(
                item.x - camera.x,
                item.y - camera.y,
                item.width,
                item.height
            );
        }
    }
    
    // Gebäude zeichnen
    for (const building of world.buildings) {
        if (isInViewport(building)) {
            if (images.house) {
                ctx.drawImage(
                    images.house,
                    building.x - camera.x,
                    building.y - camera.y,
                    building.width,
                    building.height
                );
            } else {
                ctx.fillStyle = '#795548';
                ctx.fillRect(
                    building.x - camera.x,
                    building.y - camera.y,
                    building.width,
                    building.height
                );
            }
        }
    }
    
    // Bäume zeichnen
    for (const tree of world.trees) {
        if (isInViewport(tree)) {
            if (images.tree) {
                ctx.drawImage(
                    images.tree,
                    tree.x - camera.x,
                    tree.y - camera.y,
                    tree.width,
                    tree.height
                );
            } else {
                ctx.fillStyle = '#33691E';
                ctx.fillRect(
                    tree.x - camera.x,
                    tree.y - camera.y,
                    tree.width,
                    tree.height
                );
            }
        }
    }
    
    // Felsen zeichnen
    for (const rock of world.rocks) {
        if (isInViewport(rock)) {
            if (images.rock) {
                ctx.drawImage(
                    images.rock,
                    rock.x - camera.x,
                    rock.y - camera.y,
                    rock.width,
                    rock.height
                );
            } else {
                ctx.fillStyle = '#757575';
                ctx.fillRect(
                    rock.x - camera.x,
                    rock.y - camera.y,
                    rock.width,
                    rock.height
                );
            }
        }
    }
    
    // NPCs zeichnen
    for (const npc of world.npcs) {
        if (isInViewport(npc)) {
            // Sprachblase anzeigen, wenn Spieler in der Nähe ist
            const distance = Math.sqrt(
                Math.pow(npc.x - player.x, 2) + 
                Math.pow(npc.y - player.y, 2)
            );
            
            if (distance < 100) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.ellipse(
                    npc.x + npc.width / 2 - camera.x,
                    npc.y - 20 - camera.y,
                    20, 15, 0, 0, Math.PI * 2
                );
                ctx.fill();
                
                ctx.fillStyle = 'black';
                ctx.font = '12px Arial';
                ctx.fillText(
                    'E',
                    npc.x + npc.width / 2 - 4 - camera.x,
                    npc.y - 15 - camera.y
                );
            }
            
            ctx.fillStyle = npc.color;
            ctx.fillRect(
                npc.x - camera.x,
                npc.y - camera.y,
                npc.width,
                npc.height
            );
        }
    }
    
    // Gegner zeichnen
    for (const enemy of world.enemies) {
        if (isInViewport(enemy)) {
            if (images.enemy) {
                // Gegner mit oranger Färbung zeichnen
                ctx.save();
                ctx.drawImage(
                    images.enemy,
                    enemy.x - camera.x,
                    enemy.y - camera.y,
                    enemy.width,
                    enemy.height
                );
                
                // Orangen Overlay-Filter hinzufügen
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = 'rgba(255, 165, 0, 0.7)'; // Orange mit 70% Deckkraft
                ctx.fillRect(
                    enemy.x - camera.x,
                    enemy.y - camera.y,
                    enemy.width,
                    enemy.height
                );
                ctx.restore();
            } else {
                ctx.fillStyle = '#FF9800'; // Orange Farbe für Gegner ohne Textur
                ctx.fillRect(
                    enemy.x - camera.x,
                    enemy.y - camera.y,
                    enemy.width,
                    enemy.height
                );
            }
            
            // HP-Balken zeichnen
            const healthPercent = enemy.health / enemy.maxHealth;
            const barWidth = enemy.width;
            
            ctx.fillStyle = '#333';
            ctx.fillRect(
                enemy.x - camera.x,
                enemy.y - 10 - camera.y,
                barWidth,
                5
            );
            
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(
                enemy.x - camera.x,
                enemy.y - 10 - camera.y,
                barWidth * healthPercent,
                5
            );
        }
    }
    
    // Spieler zeichnen
    // Schatten unter dem Spieler zeichnen für besseren visuellen Effekt
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
        player.x + player.width/2 - camera.x,
        player.y + player.height - 5 - camera.y,
        player.width/2, player.height/4, 
        0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Wähle die richtige Spielertextur basierend auf Richtung und Animation-Frame
    const playerImage = images[`player_${player.direction}_${player.animationFrame}`] || 
                       images[`player_${player.direction}`];
    
    if (playerImage) {
        // Spieler in ROT färben mit globalCompositeOperation
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        
        // Roten Filter über den Spieler legen
        // Wir zeichnen das ursprüngliche Bild
        if (player.isMoving) {
            // Kleine Auf- und Abbewegung beim Laufen
            const bounceOffset = Math.sin(Date.now() * 0.01) * 2;
            ctx.drawImage(
                playerImage,
                player.x - camera.x,
                player.y - camera.y - bounceOffset,
                player.width,
                player.height
            );
        } else {
            ctx.drawImage(
                playerImage,
                player.x - camera.x,
                player.y - camera.y,
                player.width,
                player.height
            );
        }
        
        // Roter Overlay-Filter
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Rot mit 70% Deckkraft
        ctx.fillRect(
            player.x - camera.x,
            player.y - camera.y,
            player.width,
            player.height
        );
        
        ctx.restore(); // Zurücksetzen des Zeichenkontextes
    } else {
        // Fallback falls das Bild nicht geladen wurde
        ctx.fillStyle = player.color;
        ctx.fillRect(
            player.x - camera.x,
            player.y - camera.y,
            player.width,
            player.height
        );
    }
    
    // HP-Balken für Spieler zeichnen
    const playerHealthPercent = player.health / player.maxHealth;
    ctx.fillStyle = '#333';
    ctx.fillRect(
        player.x - camera.x,
        player.y - 10 - camera.y,
        player.width,
        5
    );
    
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(
        player.x - camera.x,
        player.y - 10 - camera.y,
        player.width * playerHealthPercent,
        5
    );
    
    // --- Dörfer sichtbar machen ---
    if (world.villages && world.villages.length > 0) {
        for (const village of world.villages) {
            // Dorf-Umriss
            ctx.save();
            ctx.strokeStyle = 'rgba(139,69,19,0.5)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(
                village.x - camera.x,
                village.y - camera.y,
                village.radius || 200,
                0, Math.PI * 2
            );
            ctx.stroke();
            ctx.restore();

            // Dorfname
            ctx.save();
            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = 'rgba(139,69,19,0.85)';
            ctx.textAlign = 'center';
            ctx.fillText(
                village.name || 'Dorf',
                village.x - camera.x,
                village.y - (village.radius || 200) - 10 - camera.y
            );
            ctx.restore();

            // Gebäude im Dorf zeichnen (falls nicht schon durch world.buildings erledigt)
            if (village.buildings) {
                for (const building of village.buildings) {
                    ctx.save();
                    ctx.fillStyle = building.color || '#795548';
                    ctx.fillRect(
                        building.x - camera.x,
                        building.y - camera.y,
                        building.width,
                        building.height
                    );
                    ctx.strokeStyle = '#5D4037';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(
                        building.x - camera.x,
                        building.y - camera.y,
                        building.width,
                        building.height
                    );
                    ctx.restore();
                }
            }
        }
    }
}

// Prüft, ob ein Objekt im sichtbaren Bereich liegt
function isInViewport(obj) {
    return (
        obj.x + obj.width > camera.x &&
        obj.x < camera.x + camera.width &&
        obj.y + obj.height > camera.y &&
        obj.y < camera.y + camera.height
    );
}

// Gegner aktualisieren
function updateEnemies() {
    if (gamePaused) return;
    
    world.enemies.forEach(enemy => {
        // Nachts: Gegner meiden Dörfer
        if (dayNightCycle.isNight && isInVillage(enemy.x, enemy.y)) {
            // Gegner verlässt das Dorf (bewegt sich nach außen)
            const nearestVillage = world.villages.reduce((nearest, v) => {
                const d = Math.sqrt((enemy.x - v.x) ** 2 + (enemy.y - v.y) ** 2);
                return d < Math.sqrt((enemy.x - nearest.x) ** 2 + (enemy.y - nearest.y) ** 2) ? v : nearest;
            }, world.villages[0]);
            const dx = enemy.x - nearestVillage.x;
            const dy = enemy.y - nearestVillage.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < nearestVillage.radius + 10) {
                // Bewege Gegner nach außen
                enemy.x += (dx / dist) * enemy.speed * 2;
                enemy.y += (dy / dist) * enemy.speed * 2;
            }
            // Gegner greifen im Dorf nicht an
            return;
        }
        const distToPlayer = Math.sqrt(
            Math.pow(player.x - enemy.x, 2) + 
            Math.pow(player.y - enemy.y, 2)
        );
        if (distToPlayer < enemy.aggroRange) {
            enemy.active = true;
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            if (length > 0) {
                enemy.x += (dx / length) * enemy.speed;
                enemy.y += (dy / length) * enemy.speed;
            }
            // Angriff, wenn Spieler sehr nah ist
            if (distToPlayer < 40 && !dayNightCycle.isNight) {
                if (Math.random() < 0.01) {
                    player.takeDamage(enemy.strength);
                }
            } else if (distToPlayer < 40 && dayNightCycle.isNight) {
                if (Math.random() < 0.03) {
                    player.takeDamage(enemy.strength);
                }
            }
        } else {
            enemy.active = false;
            if (Math.random() < 0.02) {
                enemy.x += (Math.random() - 0.5) * 5;
                enemy.y += (Math.random() - 0.5) * 5;
            }
        }
        // Gegner in der Welt halten
        enemy.x = Math.max(0, Math.min(enemy.x, WORLD_SIZE - enemy.width));
        enemy.y = Math.max(0, Math.min(enemy.y, WORLD_SIZE - enemy.height));
    });
}

// Event-Listener für UI-Elemente hinzufügen
function setupUIEvents() {
    // Inventar schließen
    document.getElementById('close-inventory').addEventListener('click', () => {
        document.getElementById('inventory-panel').classList.add('hidden');
        gamePaused = false;
    });
    
    // Quest-Panel schließen
    document.getElementById('close-quests').addEventListener('click', () => {
        document.getElementById('quest-panel').classList.add('hidden');
        gamePaused = false;
    });
    
    // Dialog schließen
    document.getElementById('close-dialogue').addEventListener('click', () => {
        dialogueManager.closeDialogue();
    });
    
    // Inventar-Button anklicken
    document.getElementById('inventory-button').addEventListener('click', toggleInventory);
    
    // Quest-Button anklicken
    document.getElementById('quest-button').addEventListener('click', toggleQuestPanel);
}

// Spiel-Loop
function gameLoop() {
    // Canvas löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Tag/Nacht-Zyklus aktualisieren
    dayNightCycle.update();
    
    // Spieler bewegen
    movePlayer();
    
    // Gegner aktualisieren
    updateEnemies();
    
    // Gebäudeentdeckungen prüfen
    checkBuildingDiscovery();
    
    // Welt zeichnen
    drawWorld();
    
    // Nächsten Frame anfordern
    requestAnimationFrame(gameLoop);
}

// Spiel initialisieren
async function init() {
    // UI-Events einrichten
    setupUIEvents();
    
    // Bilder laden
    await loadImages();
    
    // Spieler-Texturen laden
    await loadPlayerTextures();
    
    // Welt generieren
    world.generate();
    
    // Spiel starten
    gameLoop();
}

// Spiel starten
init();

// Hilfsfunktion: Dorfbewohner eines Dorfes werden aggressiv
function makeVillageAggressive(village, duration = 600) {
    if (!village.npcs) return;
    for (const npc of village.npcs) {
        npc.aggressive = true;
        npc.aggressiveTimer = duration;
    }
}

// Spieler-Angriff auf NPCs (Dorfbewohner)
function attackNPC(npc) {
    // Prüfe, ob es ein Dorfbewohner ist
    if (npc.name === 'Dorfbewohner' && npc.homeVillage) {
        makeVillageAggressive(npc.homeVillage);
    }
    // ...hier ggf. weiteren Schaden/Logik für NPCs einfügen...
}