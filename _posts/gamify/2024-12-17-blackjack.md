---
layout: post
title: Blackjack
permalink: /gamify/blackjack
---

<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #121212;
        color: white;
    }
    .container {
        width: 40%;
        margin: auto;
        background-color: #222;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #fff;
    }
    button {
        background-color: black;
        color: white;
        border: 1px solid white;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
    }
    button:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
    .error {
        color: red;
        font-weight: bold;
    }
</style>

<div class="container">
    <h1>Blackjack Game</h1>
    <label for="betAmount">Bet Amount:</label>
    <input type="range" id="betAmount" min="1" max="1000" value="100" oninput="updateBetDisplay()">
    <span id="betValue">$100</span>
    <button id="startGame">Start Game</button>
    <button id="hit" disabled>Hit</button>
    <button id="stand" disabled>Stand</button>
    <button id="exit">Exit</button>
    <h2>Dealer's Hand</h2>
    <div id="dealerHand"></div>
    <h2>Your Hand</h2>
    <div id="playerHand"></div>
    <p id="gameStatus" class="error"></p>
</div>
<script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>
<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    let uid = "";
    // Ensure proper headers including authentication token
    function getFetchOptions() {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No auth token found");
            return null;
        }
        return {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
    }
    async function getUID() {
        console.log("Fetching UID...");
        const options = getFetchOptions();
        if (!options) {
            document.getElementById("gameStatus").innerText = "Login required.";
            return;
        }
        try {
            const response = await fetch(`${javaURI}/api/person/get`, options);
            if (!response.ok) throw new Error(`Server response: ${response.status}`);
            const data = await response.json();
            if (!data || !data.uid) throw new Error("UID not found in response");
            uid = data.uid;
            console.log("UID:", uid);
        } catch (error) {
            console.error("Error fetching UID:", error);
            document.getElementById("gameStatus").innerText = "Error fetching UID. Please log in.";
        }
    }
    document.getElementById("startGame").addEventListener("click", async function () {
        try {
            await getUID();
            if (!uid) return;
            const bet = parseInt(document.getElementById("betAmount").value);
            const requestData = { uid, betAmount: bet };
            const response = await fetch(`${javaURI}/api/casino/blackjack/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(requestData),
            });
            if (!response.ok) throw new Error("Failed to start game.");
            const data = await response.json();
            updateUI(data, bet);
        } catch (error) {
            document.getElementById("gameStatus").innerText = error.message;
        }
    });
    function updateBetDisplay() {
        document.getElementById("betValue").innerText = `$${document.getElementById("betAmount").value}`;
    }
</script>




