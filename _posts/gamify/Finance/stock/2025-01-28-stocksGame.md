---
layout: base
permalink: /stocks/game
title: Stocks Game
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stocks Game - Simulate 5 Years</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- All CSS is kept inline below so we don't get 404 for external styles.css -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #0f0f0f;
            color: #fff;
            margin: 0;
            padding: 0;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #001f3f;
            color: #fff;
        }
        .navbar .logo {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .navbar .nav-buttons {
            display: flex;
            gap: 20px;
        }
        .navbar .nav-buttons a {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            padding: 8px 16px;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .navbar .nav-buttons a:hover {
            background-color: #ff8c00;
        }
        .container {
            padding: 30px;
            text-align: center;
        }
        .search-container {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        .search-container input {
            padding: 12px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            background-color: #6ab8f9;
        }
        .search-container input[type="text"] {
            width: 240px;
        }
        .search-container input[type="number"] {
            width: 80px;
            border-radius: 0;
            border: none;
        }
        .search-button {
            background-color: #ff8c00;
            color: #fff;
            border: none;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 4px;
        }
        .search-button:hover {
            background-color: #e07b00;
        }
        .game-panel {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 30px;
        }
        .money-display {
            font-size: 24px;
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 20px;
        }
        .selected-stocks {
            width: 50%;
            background-color: #121212;
            padding: 20px;
            border-radius: 8px;
            color: white;
            margin: 0 auto;
        }
        .selected-stocks table {
            width: 100%;
            border-collapse: collapse;
            background-color: #1e1e1e;
        }
        .selected-stocks th, .selected-stocks td {
            padding: 12px;
            border-bottom: 1px solid #444;
            text-align: left;
        }
        .simulate-button {
            background-color: #001f3f;
            color: white;
            padding: 15px;
            font-size: 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
        }
        .simulate-button:hover {
            background-color: #ff8c00;
        }
        .animation-container {
            display: none;
            margin-top: 20px;
        }
        .result {
            font-size: 24px;
            font-weight: bold;
            margin-top: 20px;
        }
        /* Extra override if you want green text for error or success messages */
        .error-text {
            color: #6cf12f;
        }
    </style>
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="logo">NITD</div>
        <div class="nav-buttons">
            <a href="{{site.baseurl}}/stocks/home">Home</a>
            <a href="{{site.baseurl}}/crypto/portfolio">Crypto</a>
            <a href="{{site.baseurl}}/stocks/viewer">Stocks</a>
            <a href="{{site.baseurl}}/stocks/portfolio">Portfolio</a>
            <a href="{{site.baseurl}}/stocks/buysell">Buy/Sell</a>
            <a href="{{site.baseurl}}/stocks/leaderboard">Leaderboard</a>
            <a href="{{site.baseurl}}/stocks/game">Stocks Game</a>
        </div>
    </nav>

    <div class="container">
        <h1>Stock Market Simulation Game</h1>
        <p>Pick stocks and simulate their growth over 5 years!</p>

        <!-- A simple 'login' to identify who is playing -->
        <div style="margin-bottom: 20px;">
            <input type="text" id="userEmail" placeholder="Enter your email" 
                   style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
            <button onclick="loginUser()"
                    style="padding: 8px 16px; border: none; border-radius: 4px; background-color: #001f3f; color: #fff; cursor: pointer;">
                Login
            </button>
        </div>

        <div class="money-display" id="moneyDisplay">Starting Money: $10,000</div>

        <!-- Stock search & add section -->
        <div class="search-container">
            <input type="text" id="stockSearch" placeholder="Search Stock Symbol">
            <input type="number" id="stockQuantity" placeholder="Qty" min="1">
            <button class="search-button" onclick="addStock()">Add Stock</button>
        </div>

        <div class="game-panel">
            <div class="selected-stocks">
                <h2>Your Selected Stocks</h2>
                <table id="stockTable">
                    <tr>
                        <th>Stock</th>
                        <th>Shares</th>
                        <th>Price</th>
                    </tr>
                </table>
            </div>
        </div>

        <button class="simulate-button" onclick="simulateYears()">Simulate 5 Years</button>

        <!-- Loading animation -->
        <div class="animation-container" id="animation">
            <!-- If you don't actually have this .gif, remove or fix path -->
            <img src="{{site.baseurl}}/assets/images/stock-animation.gif" width="200" alt="Simulating...">
            <p>Simulating...</p>
        </div>

        <!-- Simulation result -->
        <div class="result" id="result"></div>
    </div>

    <script>
        /**
         * In this script, we assume your Java (Spring Boot) backend:
         *   1) Runs on http://localhost:8085
         *   2) Has routes:
         *      - GET  /stocks/table/getStocks?username=...
         *      - GET  /stocks/table/portfolioValue?username=...
         *      - POST /stocks/table/addStock
         *      - POST /stocks/table/simulateStocks
         * 
         * Make sure your Person + userStocksTable data is in the DB
         * and your code references the correct port/paths below.
         */

        // Adjust if your backend is on a different host/port:
        const BASE_URL = "http://localhost:8085/stocks/table";

        let currentUserEmail = "";

        // On "Login," store the email and refresh data
        function loginUser() {
            const emailInput = document.getElementById("userEmail").value.trim();
            if (!emailInput) {
                alert("Please enter a valid email.");
                return;
            }
            currentUserEmail = emailInput;
            document.getElementById("moneyDisplay").textContent = "Loading portfolio...";
            refreshPortfolio();
        }

        /**
         * Refresh the user's portfolio: fetch the user's stocks, then portfolio value
         */
        async function refreshPortfolio() {
            if (!currentUserEmail) return;
            await getStocks();
            await getPortfolioValue();
        }

        /**
         * GET user's stocks from your backend
         */
        async function getStocks() {
            const table = document.getElementById("stockTable");
            // Reset table to header:
            table.innerHTML = `
                <tr>
                    <th>Stock</th>
                    <th>Shares</th>
                    <th>Price</th>
                </tr>
            `;
            try {
                const url = `${BASE_URL}/getStocks?username=${encodeURIComponent(currentUserEmail)}`;
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error("Failed to fetch user stocks.");
                }
                const stockList = await resp.json(); // array of { stockSymbol, quantity }

                // For now, "Price" is "N/A" unless you fetch real-time from your API
                stockList.forEach(stock => {
                    const rowHtml = `
                        <tr>
                            <td>${stock.stockSymbol}</td>
                            <td>${stock.quantity}</td>
                            <td>N/A</td>
                        </tr>
                    `;
                    table.innerHTML += rowHtml;
                });
            } catch (err) {
                console.error("Error fetching stocks:", err);
                document.getElementById("moneyDisplay").textContent = "Error fetching portfolio value.";
            }
        }

        /**
         * GET the user's total portfolio value (stocks + leftover balance)
         */
        async function getPortfolioValue() {
            try {
                const url = `${BASE_URL}/portfolioValue?username=${encodeURIComponent(currentUserEmail)}`;
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error("Could not fetch portfolio value.");
                }
                const totalValue = await resp.json(); // numeric
                document.getElementById("moneyDisplay").textContent = 
                    `Total Portfolio Value: $${totalValue.toFixed(2)}`;
            } catch (err) {
                console.error("Error loading portfolio value:", err);
                document.getElementById("moneyDisplay").textContent = "Error fetching portfolio value.";
            }
        }

        /**
         * POST to add a stock to the user's portfolio
         */
        async function addStock() {
            if (!currentUserEmail) {
                alert("Please login first.");
                return;
            }
            const stockSymbol = document.getElementById("stockSearch").value.trim().toUpperCase();
            const qtyStr = document.getElementById("stockQuantity").value.trim();
            const quantity = parseInt(qtyStr, 10);

            if (!stockSymbol || isNaN(quantity) || quantity <= 0) {
                alert("Please enter a valid stock symbol and quantity.");
                return;
            }

            const bodyData = {
                username: currentUserEmail,
                stockSymbol: stockSymbol,
                quantity: quantity
            };

            try {
                const resp = await fetch(`${BASE_URL}/addStock`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });
                if (!resp.ok) {
                    const errorText = await resp.text();
                    alert("Error: " + errorText);
                    return;
                }
                // On success, refresh
                await refreshPortfolio();
                // Clear inputs
                document.getElementById("stockSearch").value = "";
                document.getElementById("stockQuantity").value = "";
            } catch (err) {
                console.error("Error adding stock:", err);
            }
        }

        /**
         * Simulate 5 years of stock changes for the user's entire portfolio
         */
        async function simulateYears() {
            if (!currentUserEmail) {
                alert("Please login first.");
                return;
            }
            // Show "Simulating..." animation
            document.getElementById("animation").style.display = "block";
            document.getElementById("result").textContent = "";

            // Fetch user stocks first
            let userStocks = [];
            try {
                const resp = await fetch(`${BASE_URL}/getStocks?username=${encodeURIComponent(currentUserEmail)}`);
                if (!resp.ok) {
                    throw new Error("Could not fetch user stocks before simulation.");
                }
                userStocks = await resp.json(); // array of { stockSymbol, quantity }
            } catch (err) {
                console.error("Error loading stocks for simulation:", err);
                document.getElementById("animation").style.display = "none";
                alert("Cannot load stocks for simulation.");
                return;
            }

            // POST them to /simulateStocks
            const requestBody = {
                username: currentUserEmail,
                stocks: userStocks
            };

            try {
                const response = await fetch(`${BASE_URL}/simulateStocks`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                });

                // Keep animation for ~3s
                setTimeout(async () => {
                    document.getElementById("animation").style.display = "none";

                    if (!response.ok) {
                        const errorMsg = await response.text();
                        document.getElementById("result").textContent = "Error: " + errorMsg;
                        return;
                    }

                    const successMsg = await response.text();
                    console.log(successMsg);

                    // Refresh portfolio to see updated balances
                    await refreshPortfolio();
                    document.getElementById("result").textContent =
                        "Simulation complete! Your updated portfolio and balance are applied.";
                }, 3000);

            } catch (err) {
                console.error("Error simulating years:", err);
                document.getElementById("animation").style.display = "none";
                document.getElementById("result").textContent = "An error occurred during simulation.";
            }
        }
    </script>
</body>
</html>
