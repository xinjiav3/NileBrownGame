import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {

    constructor(data = null) {
        super(data);
    }

    /**
     * Proximaty interaction keys
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e':  // Player 1 
            case 'u':  // Player 2 
                this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Check for proximity of objects 
     */
    checkProximityToNPC() {
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        var npc = this;
        var names = [];

        if (players.length > 0 && npc) {
            players.forEach(player => {
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );

                if (player != npc && distance <= 100) {
                    names.push(player.spriteData.name);
                }
            });

            if (names.length > 0) {
                super.handleResponse(`Hello, ${names.join(', ')}`);
            }
        }
    }
}

export default NPC;