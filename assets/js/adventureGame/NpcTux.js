import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";
import { showCustomPrompt, submitAnswer, isPromptCurrentlyOpen } from "./PromptHandler.js";

// Array of Linux command questions
const linuxQuestions = [
    "Which command is used to create a new directory?\n1. mkdir\n2. rmdir\n3. touch\n4. rm",
    "Which command is used to change the current directory?\n1. cd\n2. ls\n3. pwd\n4. mv",
    "Which command lists the contents of a directory?\n1. ls\n2. cd\n3. mkdir\n4. rm",
    "Which command is used to remove a file?\n1. rm\n2. rmdir\n3. del\n4. erase",
    "Which command is used to display the current directory path?\n1. pwd\n2. path\n3. cd\n4. dir",
    "Which command is used to run a script?\n1. ./script.sh\n2. run script.sh\n3. exec script.sh\n4. start script.sh",
    "Which command is used to copy files?\n1. cp\n2. mv\n3. copy\n4. duplicate",
    "Which command is used to move or rename files?\n1. mv\n2. cp\n3. move\n4. rename",
    "Which command is used to display the contents of a file?\n1. cat\n2. show\n3. display\n4. view",
    "Which command is used to create an empty file?\n1. touch\n2. create\n3. new\n4. mkfile"
];

// Function to get a random question from the array
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * linuxQuestions.length);
    return linuxQuestions[randomIndex];
}

class NpcTux extends GameObject {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     * 
     * @override
     */
    update() {
        this.draw();
    }

    /**
     * Handles keydown events for proximity interaction.
     * This method is triggered when a key is pressed and checks for proximity interactions.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     * @param {string} event.key - The key that was pressed.
     * 
     * Keys handled:
     * - 'e': Proximity interaction for Player 1
     * - 'u': Proximity interaction for Player 2
     * 
     * This method calls checkProximityToNPC() if either 'e' or 'u' is pressed.
     */
    handleKeyDown({ key }) {

        if (isPromptCurrentlyOpen() && (key === 'e' || key === 'u')) {
            return; 
        }

        switch (key) {
            case 'e': // Player 1 
            case 'u': // Player 2 
                this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * It also clears the alert timeout if the 'e' or 'u' key is released.
     * 
     * @param {Object} event - The keyup event object.
     * @param {string} event.key - The key that was released.
     */
    handleKeyUp({ key }) {
        // Check if the released key is 'e' or 'u'
        if (key === 'e' || key === 'u') {
            // Clear the alert timeout to cancel the alert
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        if (isPromptCurrentlyOpen()) {
            return; 
        }
        
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }
        
        // Set a new alert timeout
        this.alertTimeout = setTimeout(() => {
            alert(message);
        }, 0);
    }
    
    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        const players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        const npc = this;
        const names = [];


        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != npc && distance <= 500) {
                    names.push(player.spriteData.name);
                }
            });
            // Join all player names inside the proximity
            if (names.length > 0) {
                this.handleResponse(`Hello, ${names.join(', ')}`);
                const question = getRandomQuestion();
                showCustomPrompt(`Unit 1: Linux Command Quiz\n${question}`, async (input) => {
                    const score = await submitAnswer(input, 1);
                    this.handleResponse(`${score} points have been added to your balance.`);
                });
            }
        }
    }
}

export default NpcTux;
