import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";

class NpcFrog extends GameObject {
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
        switch (key) {
            case 'e':  // Player 1 
            case 'u':  // Player 2 
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
                closeCustomAlert();
            }
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        // Set a new alert timeout
        this.alertTimeout = setTimeout(() => {
            showCustomAlert(message);
        }, 0);
    }

    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        var npc = this;
        var names = [];

        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != npc && distance <= 100) {
                    names.push(player.spriteData.name);
                }
            });
            // Join all player names inside the proximity
            if (names.length > 0) {
                this.handleResponse(`Hello, ${names.join(', ')}`);
                this.showInputPrompt("Unit 1: Popcorn Hack 1\nWhich is valid for declaring a variable of type int?\n\n1. int 123variable;\n2. int variable123;\n3. int variable#123;\n4. int variable 123", (input) => {
                    this.submitAndDisplayResult(input, 1);
                });
            }
        }
    }

        /**
     * Show a prompt to the player and handle their input.
     * 
     * @param {string} question - The question to display to the player.
     * @param {function} callback - The callback to handle the player's response.
     */
    showInputPrompt(question, callback) {
        this.inputCallback = callback;

        const promptBox = document.getElementById('custom-prompt');
        const promptMessage = document.getElementById('custom-prompt-message');
        const promptInput = document.getElementById('custom-prompt-input');
        
        promptMessage.textContent = question;
        promptInput.value = ''; // Clear previous input
        promptBox.style.display = 'block';

        const submitButton = document.getElementById('custom-prompt-submit');
        submitButton.onclick = () => {
            const inputValue = promptInput.value.trim();
            if (inputValue && this.inputCallback) {
                this.inputCallback(inputValue);
                this.inputCallback = null;
            }
            closeCustomPrompt();
        };
    }

    async submitAndDisplayResult(answer, questionId) {
        // Call the globally available submitAnswer function here
        const score = await window.submitAnswer(answer, questionId);
        this.handleResponse(`Thanks for your answer! Your score is: ${score}`);
    }
}

export default NpcFrog;

/**
 * Show the custom alert with the given message.
 * 
 * @param {string} message - The message to be displayed in the alert.
 */
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

/**
 * Close the custom alert.
 */
function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'none';
}

/**
 * Close the custom prompt.
 */
function closeCustomPrompt() {
    const promptBox = document.getElementById('custom-prompt');
    promptBox.style.display = 'none';
}