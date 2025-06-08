// Verschiedene Quest-Definitionen

// Sammle-Objekte-Quests
const gatherQuests = [
    {
        id: 'quest_gather_wood',
        name: 'Brennholz sammeln',
        description: 'Sammle 5 Stück Holz für den Winter.',
        objective: {
            type: 'gather',
            target: 'Holz',
            count: 5,
            current: 0
        },
        rewards: {
            gold: 50,
            exp: 30,
            items: [{ name: 'Heiltrank', type: 'potion', effect: { health: 30 } }]
        },
        checkCompletion: function(player) {
            let collected = 0;
            player.inventory.forEach(item => {
                if (item.name === this.objective.target) {
                    collected++;
                }
            });
            this.objective.current = collected;
            return collected >= this.objective.count;
        }
    },
    {
        id: 'quest_gather_stone',
        name: 'Steine für den Hausbau',
        description: 'Sammle 8 Steine für Bauarbeiten im Dorf.',
        objective: {
            type: 'gather',
            target: 'Stein',
            count: 8,
            current: 0
        },
        rewards: {
            gold: 75,
            exp: 40
        },
        checkCompletion: function(player) {
            let collected = 0;
            player.inventory.forEach(item => {
                if (item.name === this.objective.target) {
                    collected++;
                }
            });
            this.objective.current = collected;
            return collected >= this.objective.count;
        }
    }
];

// Kampf-Quests
const combatQuests = [
    {
        id: 'quest_kill_monsters',
        name: 'Jagd auf Monster',
        description: 'Töte 3 Monster um die Gegend sicherer zu machen.',
        objective: {
            type: 'kill',
            target: 'monster',
            count: 3,
            current: 0
        },
        rewards: {
            gold: 100,
            exp: 50
        },
        checkCompletion: function(player) {
            return this.objective.current >= this.objective.count;
        }
    },
    {
        id: 'quest_night_hunt',
        name: 'Nachtjäger',
        description: 'Töte 5 Monster während der Nacht.',
        objective: {
            type: 'kill',
            target: 'monster',
            nightOnly: true,
            count: 5,
            current: 0
        },
        rewards: {
            gold: 200,
            exp: 100,
            items: [{ name: 'Magischer Ring', type: 'accessory', attackBonus: 5, value: 100 }]
        },
        checkCompletion: function(player) {
            return this.objective.current >= this.objective.count;
        }
    }
];

// Erkundungs-Quests
const explorationQuests = [
    {
        id: 'quest_explore_houses',
        name: 'Dörfer erkunden',
        description: 'Besuche 3 verschiedene Häuser in der Welt.',
        objective: {
            type: 'explore',
            target: 'house',
            locations: [],
            count: 3,
            current: 0
        },
        rewards: {
            gold: 80,
            exp: 60
        },
        checkCompletion: function(player) {
            return this.objective.current >= this.objective.count;
        },
        registerLocation: function(locationId) {
            if (!this.objective.locations.includes(locationId)) {
                this.objective.locations.push(locationId);
                this.objective.current = this.objective.locations.length;
                return true;
            }
            return false;
        }
    },
    {
        id: 'quest_find_treasure',
        name: 'Verborgene Schätze',
        description: 'Finde den versteckten Schatz in der Welt.',
        objective: {
            type: 'explore',
            target: 'treasure',
            found: false,
            count: 1,
            current: 0
        },
        rewards: {
            gold: 500,
            exp: 200,
            items: [{ name: 'Legendäres Schwert', type: 'weapon', attackBonus: 20, value: 1000 }]
        },
        checkCompletion: function(player) {
            return this.objective.found;
        },
        findTreasure: function() {
            this.objective.found = true;
            this.objective.current = 1;
            return true;
        }
    }
];

// Alle Quests kombinieren
const allQuests = [...gatherQuests, ...combatQuests, ...explorationQuests];

// NPCs mit Quests
const questGivers = [
    {
        name: 'Holzfäller Erik',
        color: '#8B4513',
        dialogue: {
            greeting: 'Hallo, Abenteurer! Ich könnte etwas Hilfe gebrauchen.',
            options: [
                {
                    text: 'Hast du eine Aufgabe für mich?',
                    response: 'Ich brauche dringend Holz für den Winter. Kannst du mir helfen?',
                    action: 'giveQuest'
                },
                {
                    text: 'Auf Wiedersehen',
                    response: 'Bis zum nächsten Mal!',
                    action: 'close'
                }
            ],
            quest: gatherQuests[0]
        }
    },
    {
        name: 'Baumeister Olaf',
        color: '#708090',
        dialogue: {
            greeting: 'Willkommen, Fremder! Unser Dorf expandiert.',
            options: [
                {
                    text: 'Kann ich irgendwie helfen?',
                    response: 'Wir benötigen Steine für neue Häuser. Würdest du uns welche sammeln?',
                    action: 'giveQuest'
                },
                {
                    text: 'Auf Wiedersehen',
                    response: 'Leb wohl, komm bald wieder!',
                    action: 'close'
                }
            ],
            quest: gatherQuests[1]
        }
    },
    {
        name: 'Wächterin Freya',
        color: '#4682B4',
        dialogue: {
            greeting: 'Halt! Bist du hier, um zu helfen oder zu stören?',
            options: [
                {
                    text: 'Ich möchte helfen!',
                    response: 'Die Monster werden nachts immer gefährlicher. Zeig mir, dass du kämpfen kannst.',
                    action: 'giveQuest'
                },
                {
                    text: 'Auf Wiedersehen',
                    response: 'Bleib wachsam, Reisender.',
                    action: 'close'
                }
            ],
            quest: combatQuests[1]
        }
    },
    {
        name: 'Entdecker Ragnar',
        color: '#DAA520',
        dialogue: {
            greeting: 'Ah! Ein weiterer Wanderer! Interessiert an Abenteuern?',
            options: [
                {
                    text: 'Was gibt es zu entdecken?',
                    response: 'Es gibt viele Siedlungen zu erkunden. Berichte mir, was du findest!',
                    action: 'giveQuest'
                },
                {
                    text: 'Auf Wiedersehen',
                    response: 'Mögen deine Reisen fruchtbar sein!',
                    action: 'close'
                }
            ],
            quest: explorationQuests[0]
        }
    },
    {
        name: 'Schatzjäger Ingrid',
        color: '#9932CC',
        dialogue: {
            greeting: 'Psst! Ich habe Gerüchte über einen verborgenen Schatz gehört...',
            options: [
                {
                    text: 'Erzähl mir mehr!',
                    response: 'Es soll einen legendären Schatz in dieser Gegend geben. Wirst du ihn für mich suchen?',
                    action: 'giveQuest'
                },
                {
                    text: 'Auf Wiedersehen',
                    response: 'Halt die Augen offen, und erzähl niemandem von unserem Gespräch!',
                    action: 'close'
                }
            ],
            quest: explorationQuests[1]
        }
    }
];
