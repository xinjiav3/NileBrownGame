---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<style>
.custom-alert {
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.custom-alert button {
    background-color: transparent; /* Fully transparent background */
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
    width: 100%; /* Adjust width to fit content */
    height: 100%; /* Adjust height to fit content */
    position: absolute; /* Position the button relative to the alert box */
}

#custom-prompt {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    padding: 20px;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#custom-prompt-box {
    text-align: center;
}

#custom-prompt input {
    width: 80%;
    padding: 10px;
    margin: 10px 0;
}

#custom-prompt button {
    padding: 10px 20px;
    cursor: pointer;
}

#custom-prompt-message {
    color: black;
}

</style>

<div id="gameContainer">
    <canvas id='gameCanvas'></canvas>
</div>

<div id="custom-alert" class="custom-alert">
    <button onclick="closeCustomAlert()" id="custom-alert-message"></button>
</div>

<div id="custom-prompt" style="display: none;">
    <div id="custom-prompt-box">
        <p id="custom-prompt-message"></p>
        <input type="text" id="custom-prompt-input" placeholder="Type your answer here..." />
        <button id="custom-prompt-submit">Submit</button>
    </div>
</div>


<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';

    const path = "{{site.baseurl}}";

    // Start game engine
    GameControl.start(path);
</script>

<script type="module">
import { javaURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
        function getChatScoreBalance() {
            const personId = 1
            const getChatScoreUrl = `${javaURI}/rpg_answer/getChatScore/` + personId;
            const getBalanceUrl = `${javaURI}/rpg_answer/getBalance/` + personId;
            const getQuestionsAnsweredUrl = `${javaURI}/rpg_answer/getQuestionsAnswered/` + personId;

            fetch(getQuestionsAnsweredUrl, fetchOptions)
                .then(response => {
                    if (response.status !== 200) {
                        console.log("Database response error: " + response.status);
                        document.getElementById("questionsAnswered").innerHTML = 0;
                    }
                    response.json().then(data => {
                        if (data !== null) {
                            document.getElementById("questionsAnswered").innerHTML = data;
                        }
                    });
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });

            fetch(getChatScoreUrl, fetchOptions)
                .then(response => {
                    if (response.status !== 200) {
                        console.log("Database response error: " + response.status);
                        document.getElementById("chatScore").innerHTML = 0;
                    }
                    response.json().then(data => {
                        if (data !== null) {
                            document.getElementById("chatScore").innerHTML = data;
                        }
                    });
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });

            fetch(getBalanceUrl, fetchOptions)
                .then(response => {
                    if (response.status !== 200) {
                        console.log("Database response error: " + response.status);
                        document.getElementById("balance").innerHTML = 0;
                    }
                    response.json().then(data => {
                        if (data !== null) {
                            document.getElementById("balance").innerHTML = data;
                        }
                    });
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });
        }



        async function submitAnswer(content, questionId) {
                    try {
                        const response = await fetch(`${javaURI}/rpg_answer/submitAnswer`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                content: content,
                                questionId: questionId,
                                personId: 1
                            })
                        });

                        if (!response.ok) throw new Error("Network response was not ok");

                        const data = await response.json();

                        return data.score || "Error scoring answer"; // Return score

                    } catch (error) {
                        console.error("Error submitting answer:", error);
                        return "Error submitting answer";
                    }
                }
        window.submitAnswer = submitAnswer;
        window.onload = function() {
            getChatScoreBalance();
        };
        
        function showCustomPrompt(questionId) {
        const promptBox = document.getElementById('custom-prompt');
        const submitButton = document.getElementById('custom-prompt-submit');
        const inputField = document.getElementById('custom-prompt-input');
        const promptMessage = document.getElementById('custom-prompt-message');

        // Show the prompt with the question
        promptMessage.innerText = "Please enter your answer:";
        promptBox.style.display = 'block';

        submitButton.onclick = async function() {
            const userAnswer = inputField.value;
            if (userAnswer.trim() === '') {
                alert("Please provide an answer.");
                return;
            }
            // Call the submitAnswer function with the user answer and question ID
            const score = await submitAnswer(userAnswer, questionId);
            alert("Your score: " + score);
            // Close the prompt
            closeCustomPrompt();
        };
    }

    function closeCustomPrompt() {
        const promptBox = document.getElementById('custom-prompt');
        promptBox.style.display = 'none';
    }

    // Expose the showCustomPrompt function to trigger it when necessary
    window.showCustomPrompt = showCustomPrompt;
</script>
