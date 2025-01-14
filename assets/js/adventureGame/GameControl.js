import GameEnv from './GameEnv.js';
import GameLevelSquares from './GameLevelSquares.js';
import GameLevelDesert from './GameLevelDesert.js';
import GameObject from "./GameObject.js";
import { javaURI, fetchOptions } from "../api/config.js";  // Import javaURI

/**
 * The GameControl object manages the game.
 */
const GameControl = {
    start: function(path) {
        // Create the game environment
        GameEnv.create();

        // Initialize the UI for balance, chat score, and questions answered
        this.initStatsUI();

        // Load the game level
        const gameLevel = new GameLevelDesert(path);
        for (let object of gameLevel.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data);
        }

        // Start the game loop
        this.gameLoop();

        // Load initial stats
        this.getChatScoreBalance();
    },

    gameLoop: function() {
        GameEnv.clear();
        for (let object of GameEnv.gameObjects) {
            object.update();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    resize: function() {
        GameEnv.resize();
        for (let object of GameEnv.gameObjects) {
            object.resize();
        }
    },

    // Initialize UI for game stats
    initStatsUI: function() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '10px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Chat Score: <span id="chatScore">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        `;
        document.body.appendChild(statsContainer);
    },

    // Fetch and update the stats UI
    getChatScoreBalance: function() {
        const personId = 1;
        const endpoints = {
            balance: `${javaURI}/rpg_answer/getBalance/${personId}`,
            chatScore: `${javaURI}/rpg_answer/getChatScore/${personId}`,
            questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
        };

        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(key).innerText = data ?? 0;
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }
};

// Handle disabling movement during prompts
let isPromptOpen = false;

function disableGameControls() {
    isPromptOpen = true;
}

function enableGameControls() {
    isPromptOpen = false;
}

const originalHandleKeyDown = GameObject.prototype.handleKeyDown;
GameObject.prototype.handleKeyDown = function(event) {
    if (!isPromptOpen) {
        originalHandleKeyDown.call(this, event);
    }
};

// Updated prompt functions
function showCustomPrompt(questionId) {
    const promptBox = document.getElementById('custom-prompt');
    const submitButton = document.getElementById('custom-prompt-submit');
    const inputField = document.getElementById('custom-prompt-input');
    const promptMessage = document.getElementById('custom-prompt-message');

    promptMessage.innerText = "Please enter your answer:";
    promptBox.style.display = 'block';
    disableGameControls();

    submitButton.onclick = async function() {
        const userAnswer = inputField.value;
        if (userAnswer.trim() === '') {
            alert("Please provide an answer.");
            return;
        }
        const score = await submitAnswer(userAnswer, questionId);
        alert("Your score: " + score);
        GameControl.getChatScoreBalance();
        closeCustomPrompt();
    };
}

function closeCustomPrompt() {
    const promptBox = document.getElementById('custom-prompt');
    promptBox.style.display = 'none';
    enableGameControls();
}

// Submit the answer and refresh stats
async function submitAnswer(content, questionId) {
    try {
        const response = await fetch(`${javaURI}/rpg_answer/submitAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content, questionId: questionId, personId: 1 })
        });

        if (!response.ok) throw new Error("Failed to submit answer.");

        const data = await response.json();
        GameControl.getChatScoreBalance();
        return data.score || "Error scoring answer";

    } catch (error) {
        console.error("Error submitting answer:", error);
        return "Error submitting answer";
    }
}

// Handle window resizing
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;
