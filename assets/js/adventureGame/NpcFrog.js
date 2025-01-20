import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";
import { showCustomPrompt, submitAnswer } from "./PromptHandler.js";

class NpcFrog extends GameObject {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
    }

    update() {
        this.draw();
    }

    handleKeyDown({ key }) {
        switch (key) {
            case 'e':
            case 'u':
                this.checkProximityToNPC();
                break;
        }
    }

    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    handleResponse(message) {
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        this.alertTimeout = setTimeout(() => {
            alert(message);
        }, 0);
    }

    checkProximityToNPC() {
        const players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        const npc = this;
        const names = [];

        players.forEach(player => {
            const distance = Math.hypot(player.position.x - npc.position.x, player.position.y - npc.position.y);
            if (player !== npc && distance <= 100) {
                names.push(player.spriteData.name);
            }
        });

        if (names.length > 0) {
            this.handleResponse(`Hello, ${names.join(', ')}`);
            showCustomPrompt("Unit 1: Popcorn Hack 1\nWhich is valid for declaring a variable of type int?\n1. int 123variable;\n2. int variable123;\n3. int variable#123;\n4. int variable 123", async (input) => {
                const score = await submitAnswer(input, 1);
                this.handleResponse(`${score} points have been added to your balance.`);
            });
        }
    }
}

export default NpcFrog;
