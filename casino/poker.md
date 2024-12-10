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
        /* Overall Page Styling */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #1e1e1e;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            transition: all 0.3s ease;
        }
        .container {
            max-width: 700px;
            text-align: center;
            background-color: #2b2b2b;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            transition: box-shadow 0.3s ease;
        }
        .container:hover {
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
        }
        h1 {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #f39c12;
        }
        label, .result, .error {
            display: block;
            margin: 15px 0;
            font-size: 1.1rem;
            color: #bdc3c7;
        }
        input, button {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            font-size: 1rem;
            border-radius: 8px;
            border: none;
            outline: none;
            transition: all 0.3s ease;
        }
        input {
            background-color: #333;
            color: #fff;
            border: 1px solid #555;
        }
        button {
            background-color: #f39c12;
            color: #1e1e1e;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        button:hover {
            background-color: #e67e22;
        }
        .hand {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
        }
        .card {
            width: 60px;
            height: 80px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: #333;
            background-color: #ffffff;
            position: relative;
            transition: transform 0.2s;
        }
        .card.red {
            color: #e74c3c;
        }
        .card:hover {
            transform: scale(1.05);
        }
        .dropdown {
            position: relative;
            display: inline-block;
            margin: 20px 0;
        }
        .dropdown button {
            background: none;
            color: #f39c12;
            padding: 10px;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .dropdown:hover button {
            color: #e67e22;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #444;
            color: #ecf0f1;
            border-radius: 8px;
            padding: 15px;
            width: 250px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            text-align: left;
            font-size: 0.9rem;
            z-index: 1;
        }
        .dropdown:hover .dropdown-content {
            display: block;
        }
        .dropdown-content p {
            margin: 10px 0;
            color: #bdc3c7;
        }
        .result, .error {
            margin-top: 15px;
            font-size: 1.2rem;
            font-weight: 500;
        }
        .error {
            color: #e74c3c;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>One-Hand Poker Game</h1>
        <label for="betAmount">Enter your bet:</label>
        <input type="number" id="betAmount" min="1" placeholder="Bet Amount" required>
        <label for="email">Enter your email:</label>
        <input type="email" id="email" placeholder="Email" required>
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
    <script>
        async function playGame() {
            const bet = parseFloat(document.getElementById("betAmount").value);
            const email = document.getElementById("email").value.trim();
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
            if (!email) {
                errorDiv.innerText = "Please enter your email.";
                return;
            }
            resultDiv.innerText = "Processing your game...";
            try {
                const response = await fetch("http://localhost:8085/api/casino/poker/play", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ bet, email })
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
