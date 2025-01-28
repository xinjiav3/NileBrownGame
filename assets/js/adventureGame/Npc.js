import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = Prompt.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0; // Start from the first question
        this.alertTimeout = null;


class Npc extends Character {
    constructor(data = null) {
        super(data);
        const questions = data?.quiz?.questions;
        this.quiz = data?.quiz?.title; // Get the quiz title
        this.questions = Prompt.shuffleArray(questions); // Shuffle the quiz questions initially
        this.currentQuestionIndex = 0; // Initialize the current question index
        this.alertTimeout = null;


        this.bindEventListeners();
    }
    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }
    /**

     * Bind key event listeners for proximity interaction.

     * Binds key event listeners to handle object movement.
     * 
     * This method binds keydown and keyup event listeners to handle object movement.
     * The .bind(this) method ensures that 'this' refers to the object object.

     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handle keydown events for interaction.
     * @param {Object} event - The keydown event.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e': // Player 1 interaction
            case 'u': // Player 2 interaction

    
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
            case 'e': // Player 1 
            case 'u': // Player 2 

                this.shareQuizQuestion();
                break;
        }
    }
    /**
     * Handle keyup events to stop player actions.
     * @param {Object} event - The keyup event.
     */
    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            // Clear any active timeouts when the interaction key is released
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    /**
     * Get the next question in the shuffled array.
     * @returns {string} - The next quiz question.
     */
    getNextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length; // Cycle through questions
        return question;
    }
    /**
     * Handle proximity interaction and share a quiz question.
     */
    shareQuizQuestion() {
        const players = GameEnv.gameObjects.filter(obj => obj.state.collisionEvents.includes(this.spriteData.id));
        const hasQuestions = this.questions.length > 0;
        if (players.length > 0 && hasQuestions) {
            players.forEach(player => {
                if (!Prompt.isOpen) {
                    // Assign this NPC as the current NPC in the Prompt system
                    Prompt.currentNpc = this;
                    // Open the Prompt panel with this NPC's details


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
        // Filter objects that are in collision with this NPC
        const players = GameEnv.gameObjects.filter(obj => obj.state.collisionEvents.includes(this.spriteData.id));
        const questions = this.questions.length > 0;


        if (players.length > 0 && questions) {
            players.forEach(player => {
                if (!Prompt.isOpen) {
                    // Display the custom prompt with the NPC's name and question

                    Prompt.openPromptPanel(this);
                }
            });
        }
    }
}
export default Npc;