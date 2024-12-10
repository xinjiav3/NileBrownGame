---
layout: post
title: OneHandPoker
permalink: /casino/poker
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poker Game</title>
    <style>
        /* Styling as before */
        /* Add the same styles from your previous code */
    </style>
</head>
<body>
    <div class="container">
        <h1>One-Hand Poker Game</h1>
        <label for="betAmount">Enter your bet:</label>
        <input type="number" id="betAmount" min="1" placeholder="Bet Amount" required>
        <button onclick="playGame()">Play</button>
        <div class="dropdown">
            <button>Show Poker Hands</button>
            <div class="dropdown-content">
                <p>Royal Flush: A, K, Q, J, 10, all same suit</p>
                <p>Straight Flush: Five cards in a sequence, same suit</p>
                <p>Four of a Kind: Four cards of the same rank</p>
                <p>Full House: Three of a kind with a pair</p>
                <p>Flush: Any five cards of the same suit</p>
                <p>Straight: Five cards in sequence</p>
                <p>Three of a Kind: Three cards of the same rank</p>
                <p>Two Pair: Two different pairs</p>
                <p>One Pair: Two cards of the same rank</p>
            </div>
        </div>
        <div id="balance" class="result"></div>
        <div>
            <h3>Player Hand</h3>
            <div id="playerHand" class="hand"></div>
        </div>
        <div>
            <h3>Dealer Hand</h3>
            <div id="dealerHand" class="hand"></div>
        </div>
        <div id="result" class="result"></div>
        <div id="error" class="error"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>
    <script>
        function getCookie(name) {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [key, value] = cookie.trim().split('=');
                if (key === name) {
                    return decodeURIComponent(value);
                }
            }
            return null;
        }

        async function playGame() {
            const bet = parseFloat(document.getElementById("betAmount").value);
            const resultDiv = document.getElementById("result");
            const errorDiv = document.getElementById("error");
            const balanceDiv = document.getElementById("balance");
            const playerHandDiv = document.getElementById("playerHand");
            const dealerHandDiv = document.getElementById("dealerHand");

            errorDiv.innerText = "";
            resultDiv.innerText = "";
            balanceDiv.innerText = "";
            playerHandDiv.innerHTML = "";
            dealerHandDiv.innerHTML = "";

            if (isNaN(bet) || bet <= 0) {
                errorDiv.innerText = "Please enter a valid bet amount.";
                return;
            }

            const token = getCookie('jwt_java_spring');
            if (!token) {
                alert('Token is missing. Please log in again.');
                return;
            }

            resultDiv.innerText = "Processing your game...";

            try {
                const decodedToken = jwt_decode(token);
                console.log("Decoded JWT:", decodedToken);

                const response = await fetch("http://localhost:8085/api/casino/poker/play", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ bet })
                });

                if (!response.ok) {
                    throw new Error("Failed to play the game. Check your input or account balance.");
                }

                const data = await response.json();
                balanceDiv.innerText = `Balance: $${data.updatedBalance.toFixed(2)}`;
                displayHand("playerHand", data.playerHand);
                displayHand("dealerHand", data.dealerHand);
                const resultMessage = data.playerWin ? "You Win!" : "You Lose!";
                resultDiv.innerText = `Result: ${resultMessage}`;
            } catch (error) {
                errorDiv.innerText = "Error: " + error.message;
            }
        }

        function displayHand(handId, hand) {
            const handContainer = document.getElementById(handId);
            handContainer.innerHTML = "";
            hand.forEach(card => {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                if (card.suit === "♥" || card.suit === "♦") {
                    cardDiv.classList.add("red");
                }
                cardDiv.innerHTML = `${card.rank}<br>${card.suit}`;
                handContainer.appendChild(cardDiv);
            });
        }
    </script>
</body>
</html>
