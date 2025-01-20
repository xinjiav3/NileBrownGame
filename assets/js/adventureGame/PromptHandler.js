import { javaURI, fetchOptions } from "../api/config.js";
import { getBalance, getChatScore, getQuestionsAnswered } from './StatsManager.js';
import GameObject from "./GameObject.js";

// Handle disabling movement during prompts
let isPromptOpen = false;

export function disableGameControls() {
    isPromptOpen = true;
}

export function enableGameControls() {
    isPromptOpen = false;
}

export function isPromptCurrentlyOpen() {
    return isPromptOpen;
}

const originalHandleKeyDown = GameObject.prototype.handleKeyDown;
GameObject.prototype.handleKeyDown = function(event) {
    if (!isPromptOpen) {
        originalHandleKeyDown.call(this, event);
    }
};

/**
 * Displays a custom prompt with a question and handles user input.
 */
export function showCustomPrompt(question, callback) {
    const promptBox = document.getElementById('custom-prompt');
    const promptMessage = document.getElementById('custom-prompt-message');
    const promptInput = document.getElementById('custom-prompt-input');
    const submitButton = document.getElementById('custom-prompt-submit');

    disableGameControls();

    promptMessage.textContent = question;
    promptInput.value = '';
    promptBox.style.display = 'block';

    submitButton.onclick = () => {
        const userAnswer = promptInput.value.trim();
        if (userAnswer) {
            callback(userAnswer);
            closeCustomPrompt();
        } else {
            alert("Please provide an answer.");
        }
    };
}

/**
 * Closes the custom prompt.
 */
export function closeCustomPrompt() {
    document.getElementById('custom-prompt').style.display = 'none';

    enableGameControls();
}

/**
 * Submits the answer to the server and returns the score.
 */
export async function submitAnswer(content, questionId) {
    try {
        const response = await fetch(`${javaURI}/rpg_answer/submitAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, questionId, personId: 1 })
        });

        const data = await response.json();
        const score = data.question.points || "Error scoring answer";

        // Update stats immediately after submitting the answer
        getBalance();
        getChatScore();
        getQuestionsAnswered();

        return score;
    } catch (error) {
        console.error("Error submitting answer:", error);
        return "Error submitting answer";
    }
}