---
layout: post
title: Poker Game
permalink: /casino/poker
---
<title>Poker Game</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 400px;
        width: 100%;
        background-color: #2b2b2b;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        color: #fff;
    }
    label {
        display: block;
        margin: 10px 0 5px;
        color: #ccc;
    }
    input, button {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    h2 {
        text-align: center;
        color: #fff;
    }
    input[type="number"] {
        font-size: 16px;
        color: #333;
    }
    .cards-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .card {
        padding: 10px;
        margin: 5px;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        text-align: center;
    }
    .win-message {
        margin-top: 20px;
        font-size: 18px;
        color: #fff;
        text-align: center;
    }
</style>

<body>
<div class="container">
    <h2>Poker Game</h2>
    <form id="pokerForm">
        <label for="betAmount">Bet Amount:</label>
        <input type="number" id="betAmount" name="betAmount" required min="500">
        <button type="submit">Play Poker</button>
    </form>
    
    <div id="cardsDisplay" class="cards-container" style="display: none;"></div>
    <div id="resultMessage" class="win-message" style="display: none;"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>
<script type="module">
    import { javaURI } from '../assets/js/api/config.js';

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

    document.addEventListener('DOMContentLoaded', () => {
        const token = getCookie('jwt_java_spring');
        if (!token) {
            console.error("Token not found in cookies");
        } else {
            try {
                const decodedToken = jwt_decode(token); // Use global jwt_decode
                console.log("Decoded JWT:", decodedToken.sub); // Log the email or user ID
            } catch (err) {
                console.error('Error decoding token:', err);
            }
        }

        const pokerForm = document.getElementById('pokerForm');

        // Form submission
        pokerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const betAmount = parseFloat(document.getElementById('betAmount').value);

            if (!token) {
                alert('Token is missing. Please log in again.');
                return;
            }

            const email = jwt_decode(token).sub; // Extract user email from token
            const betData = {
                bet: betAmount,
                email: email,
            };

            try {
                const response = await fetch(`${javaURI}/api/casino/poker/play`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(betData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result && result.playerHand && result.dealerHand && result.playerWin !== undefined && result.updatedBalance !== undefined) {
                    displayCards(result.playerHand, result.dealerHand);
                    displayResult(result.playerWin, result.updatedBalance);
                } else {
                    alert('Unexpected response format. Please check the API.');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });

    function displayCards(playerHand, dealerHand) {
        const cardsContainer = document.getElementById('cardsDisplay');
        cardsContainer.style.display = 'flex';

        // Clear existing cards
        cardsContainer.innerHTML = '';

        const playerCardElements = playerHand.map(card => {
            return `<div class="card">${card.rank} ${card.suit}</div>`;
        }).join('');

        const dealerCardElements = dealerHand.map(card => {
            return `<div class="card">${card.rank} ${card.suit}</div>`;
        }).join('');

        cardsContainer.innerHTML = `
            <div>
                <h3>Your Hand</h3>
                ${playerCardElements}
            </div>
            <div>
                <h3>Dealer's Hand</h3>
                ${dealerCardElements}
            </div>
        `;
    }

    function displayResult(playerWin, updatedBalance) {
        const resultMessage = document.getElementById('resultMessage');
        resultMessage.style.display = 'block';

        const message = playerWin
            ? `You won! 🎉\nUpdated Balance: $${updatedBalance}`
            : `You lost! 😞\nUpdated Balance: $${updatedBalance}`;

        resultMessage.textContent = message;
    }
</script>
</body>
