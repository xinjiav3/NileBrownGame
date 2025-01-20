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
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
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
    import { showCustomPrompt, submitAnswer } from '{{site.baseurl}}/assets/js/adventureGame/PromptHandler.js';
    import { getStats } from '{{site.baseurl}}/assets/js/adventureGame/StatsManager.js';

    const path = "{{site.baseurl}}";
    GameControl.start(path);

    window.submitAnswer = submitAnswer;
    window.showCustomPrompt = showCustomPrompt;

    window.onload = function() {
        getStats();
    };
</script>
