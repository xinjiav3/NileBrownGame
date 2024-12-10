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
    }
    .container {
        max-width: 400px;
        width: 100%;
        background-color: #2b2b2b;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    label {
        display: block;
        margin: 10px 0 5px;
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
</style>

<body>
<div class="container">
    <h2>Poker Game</h2>
    <form id="pokerForm">
        <label for="betAmount">Bet Amount:</label>
        <input type="number" id="betAmount" name="betAmount" required min="500">
        <button type="submit">Play Poker</button>
    </form>
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
                if (result) {
                    alert(`Game Result: ${JSON.stringify(result.playerHand)}`);
                } else {
                    alert('Unexpected response format.');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });
</script>
</body>
