import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import { shuffleArray, showCustomPrompt, submitAnswer, isPromptCurrentlyOpen } from "./PromptHandler.js";

class Npc extends Character {
    constructor(data = null, quiz="", questions=[]) {
        super(data);
        this.quiz = quiz;
        this.questions = shuffleArray(questions); // Shuffle questions initially
        this.currentQuestionIndex = 0; // Initialize the current question index
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
                this.shareQuizQuestion();
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

    // Get the next question in the shuffled array
    getNextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length;
        return question;
    }

    /**
     * Check for collision with player.
     * If in collision, show a question from the questions array.
     */
    shareQuizQuestion() {
        // Filter all player objects that are in collision with this NPC
        const players = GameEnv.gameObjects.filter(obj => obj instanceof Player && obj.state.collisionEvents.includes(this.spriteData.id));
        const questions = this.questions.length > 0;

        if (players.length > 0 && questions) {
            players.forEach(player => {
                const quiz = this.quiz;
                const question = this.getNextQuestion();
                showCustomPrompt(`${quiz}\n${question}`, async (input) => {
                    const score = await submitAnswer(input, 1);
                });
            }); // closing parenthesis for forEach
        }
    }
}

export default Npc;
