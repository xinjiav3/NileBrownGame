import GameEnv from './GameEnv.js';
import Player from './Player.js';
import Background from './Background.js';
import Fish from './PlayerFish.js';
import Turtle from './PlayerTurtle.js';
import NPC from './NPC.js';

/**
 * The GameControl object manages the game.
 * 
 * This code uses the JavaScript "object literal pattern" which is nice for centralizing control logic.
 * 
 * The object literal pattern is a simple way to create singleton objects in JavaScript.
 * It allows for easy grouping of related functions and properties, making the code more organized and readable.
 * In the context of GameControl, this pattern helps centralize the game's control logic, 
 * making it easier to manage game states, handle events, and maintain the overall flow of the game.
 * 
 * @type {Object}
 * @property {Player} turtle - The player object.
 * @property {Player} fish 
 * @property {function} start - Initialize game assets and start the game loop.
 * @property {function} gameLoop - The game loop.
 * @property {function} resize - Resize the canvas and player object when the window is resized.
 */
const GameControl = {

    start: function(gameLevel = {}) {
        GameEnv.create();
        for (let object of gameLevel.objects) {
            GameEnv.gameObjects.push(new object.class(object.data));
        }
        // Start the game loop
        this.gameLoop();

        // Add key event listener
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    },

    handleKeyDown: function(event) {
        if (event.code === 'Space') {
            this.checkProximityToNPC();
        }
    },

    checkProximityToNPC: function() {
        var player = GameEnv.gameObjects.find(obj => obj instanceof Fish); 
        var npc = GameEnv.gameObjects.find(obj => obj instanceof NPC);

        if (player && npc) {
            var distance = Math.sqrt(
                Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
            );

            if (distance <= 100) {
                this.showPrompt("Ribbit Ribbit");
            }
        }
    },

    showPrompt: function(message) {
        alert(message);
    },

    gameLoop: function() {
        GameEnv.clear(); // Clear the canvas
        for (let object of GameEnv.gameObjects) {
            object.update(); // Update the game objects
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    resize: function() {
        GameEnv.resize(); // Adapts the canvas to the new window size
        for (let object of GameEnv.gameObjects) {
            object.resize(); // Resize the game objects
        }
    }
};

// Detect window resize events and call the resize function.
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;