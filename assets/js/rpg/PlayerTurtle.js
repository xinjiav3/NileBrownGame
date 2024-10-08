import Player from "./Player.js";
import GameEnv from "./GameEnv.js";
class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.promptDisplayed = false; // Track if the prompt is already displayed
    }

    update() {
        super.update();
        this.checkProximity();
    }

    checkProximity() {
        for (const gameObject of GameEnv.gameObjects) {
            // Check if the object is a player (you might want to adjust this check)
            if (gameObject instanceof Player && gameObject !== this) {
                const distance = this.getDistance(gameObject);
                if (distance <= 20) {
                    this.showPrompt();
                } else {
                    this.hidePrompt(); // Hide prompt if player is out of range
                }
            }
        }
    }

    getDistance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    showPrompt() {
        if (!this.promptDisplayed) {
            this.promptDisplayed = true;
            // Logic to display the prompt
            console.log("Hello!"); // Replace with actual UI display code
        }
    }

    hidePrompt() {
        if (this.promptDisplayed) {
            this.promptDisplayed = false;
            // Logic to hide the prompt
            console.log("Goodbye!"); // Replace with actual UI hide code
        }
    }

    resize() {
        super.resize();
    }

    handleKeyDown(NULL) {
        return 0;
    }

    handleKeyUp(NULL) {
        return 0;
    }
}

export default NPC;