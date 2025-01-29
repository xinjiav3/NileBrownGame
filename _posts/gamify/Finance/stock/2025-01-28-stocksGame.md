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
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
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
        }
        .search-container input {
            width: 300px;
            padding: 12px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            background-color: #6ab8f9;
        }
        .search-button {
            background-color: #ff8c00;
            color: #fff;
            border: none;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 0 4px 4px 0;
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
        }
        .selected-stocks table {
            width: 100%;
            border-collapse: collapse;
            background-color: #1e1e1e;
        }
        .selected-stocks th, .selected-stocks td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
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

        <div class="money-display">Starting Money: $10,000</div>

        <div class="search-container">
            <input type="text" id="stockSearch" placeholder="Search Stock Symbol">
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

        <div class="animation-container" id="animation">
            <img src="{{site.baseurl}}/assets/images/stock-animation.gif" width="200">
            <p>Simulating...</p>
        </div>

        <div class="result" id="result"></div>
    </div>

    <script>
        let money = 10000;
        let selectedStocks = [];

        async function addStock() {
            const stockSymbol = document.getElementById("stockSearch").value.toUpperCase();
            const response = await fetch(`http://localhost:8085/api/stocks/${stockSymbol}`);
            const data = await response.json();
            const stockPrice = data?.chart?.result?.[0]?.meta?.regularMarketPrice;

            if (!stockPrice || stockPrice > money) {
                alert("Invalid stock or insufficient funds.");
                return;
            }

            const shares = Math.floor(money / stockPrice);
            money -= shares * stockPrice;
            selectedStocks.push({ symbol: stockSymbol, shares, initialPrice: stockPrice });

            document.querySelector(".money-display").textContent = `Remaining Money: $${money.toFixed(2)}`;
            updateTable();
        }

        function updateTable() {
            const table = document.getElementById("stockTable");
            table.innerHTML = `<tr><th>Stock</th><th>Shares</th><th>Price</th></tr>`;
            selectedStocks.forEach(stock => {
                table.innerHTML += `<tr><td>${stock.symbol}</td><td>${stock.shares}</td><td>$${stock.initialPrice.toFixed(2)}</td></tr>`;
            });
        }

        async function simulateYears() {
            document.getElementById("animation").style.display = "block";

            setTimeout(async () => {
                let finalMoney = 0;

                for (const stock of selectedStocks) {
                    const response = await fetch(`http://localhost:8085/api/stocks/${stock.symbol}?years=5`);
                    const data = await response.json();
                    const finalPrice = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                    finalMoney += finalPrice * stock.shares;
                }

                document.getElementById("animation").style.display = "none";
                document.getElementById("result").textContent = `Final Portfolio Value: $${finalMoney.toFixed(2)}`;
            }, 3000);
        }
    </script>

</body>
</html>
