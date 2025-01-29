---
layout: base
permalink: /stocks/home
title: Stocks Home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Market Dashboard</title>
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
            background-color: #001f3f; /* Dark blue background */
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
            background-color: #ff8c00; /* Orange hover effect */
        }
        .dashboard {
            padding: 20px;
            display: flex;
            justify-content: flex-start;
            gap: 40px;
        }
        .dashboard-content {
            width: 70%; /* Increased width for the left side */
        }
        .sidebar {
            width: 35%; /* Width for the right side */
            display: flex;
            flex-direction: column;
            gap: 20px;
            justify-content: space-between; 
            /*left: 50%;*/
            position: relative; 
            background-color: #121212; /* Orange hover effect */
            padding: 20px; /* Add padding to the sidebar */
            box-sizing: border-box; /* Ensure padding doesn't overflow */
        }
        .stock-table, .your-stocks {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            background-color: #121212; /* Orange hover effect */
            border-collapse: collapse;
        }
        .stock-table table, .your-stocks table {
            width: 100%;
            border-collapse: collapse;
            background-color: #121212; /* Orange hover effect */
        }
        .stock-table th, .stock-table td, .your-stocks th, .your-stocks td {
            padding: 10px;
            text-align: left;
            background-color: #121212; /* Orange hover effect */
        }
        .stock-table th, .your-stocks th {
            background-color: #121212; /* Orange hover effect */
        }
        .welcome {
            font-size: 24px;
            font-weight: bold;
        }
        .summary-cards {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
        .card {
            padding: 0px;
            margin: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            flex: 1;
            text-align: center;
            color: #fff;
        }
        .card-orange {
            background-color: #FF8C00; /* Orange color */
        }
        .card-purple {
            background-color: #6A0DAD; /* Purple color */
        }
        .card-darkblue {
            background-color: #001f3f; /* Dark blue color */
        }
        .card h2 {
            margin-top: 2px; 
            font-size: 18px;
        }
        .card p {
            font-size: 28px;
            font-weight: bold;
        }
        .chart-container {
            position: relative;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 20px 0;
            display: flex;
            gap: 20px;
        }
        .chart {
            height: 100%; 
            width: 100%; 
            background-color: #fff; 
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #999;
            flex: 1;
        }
        .search-container {
            margin-bottom: 20px;
            display: flex;
        }
        .search-container input[type="text"] {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 4px;
            outline: none;
            font-size: 16px;
        }
        .search-button {
            background-color: #ff8c00; 
            color: #fff;
            border: none;
            border-radius: 0 4px 4px 0; 
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .search-button:hover {
            background-color: #e07b00;
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
        </div>
    </nav>
    <!-- Dashboard -->
    <div class="dashboard">
        <div class="dashboard-content">
            <h1 id="userIDName" class="welcome">Hi Rafael, Welcome Back</h1>
            <p>Invest your money with small risk!</p>
            <div class="summary-cards">
                <div class="card card-orange">
                    <h2>Today's Dollar</h2>
                    <h2>Change</h2>
                    <p id="totalGain">NA</p>
                </div>
                <div class="card card-purple">
                    <h2>Today's Percent</h2>
                    <h2>Change</h2>
                    <p id="percentIncrease">NA</p>
                </div>
                <div class="card card-darkblue">
                    <h2>Revenue</h2>
                    <h2>Return</h2>
                    <p id="portfolioValue">NA</p>
                </div>
            </div>
            <div class="search-container">
                <input type="text" id="searchBar" placeholder="Search...">
                <button class="search-button" onclick="getStockData()">Search</button>
            </div>
            <div class="chart-container" id="chartContainer">
                <div class="chart" id="chart1">
                    <canvas id="stockChart" width="475" height="375">[Graph Placeholder]</canvas>
                </div>
            </div>
            <div id="output" style="color: red; padding-top: 10px;"></div>
        </div>
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="your-stocks">
                <h3>Your Stocks</h3>
                <table id="yourStocksTable">
                    <tr>
                        <th>Stock</th>
                        <th>Price</th>
                    </tr>
                </table>
            </div>
            <div class="stock-table">
                <h3>Stock Prices</h3>
                <table>
                    <tr>
                        <th>Stock</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>Spotify</td>
                        <td id="SpotifyPrice">$297,408</td>
                    </tr>
                    <tr>
                        <td>Apple</td>
                        <td id="ApplePrice">$142,845</td>
                    </tr>
                    <tr>
                        <td>Google</td>
                        <td id="GooglePrice">$2,823,894</td>
                    </tr>
                    <tr>
                        <td>Facebook</td>
                        <td id="FacebookPrice">$208,123</td>
                    </tr>
                    <tr>
                        <td>Microsoft</td>
                        <td id="MicrosoftPrice">$330,456</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
   <script type="module">
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    async function getUserId(){
        const url_persons = `${javaURI}/api/person/get`;
        await fetch(url_persons, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                userID=data.id;
            })
            .catch(error => {
                console.error("Java Database Error:", error);
            });
    }
    async function getUserStocks() {
        try {
            const response = await fetch(javaURI + `/stocks/table/getStocks?username=${userID}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching user stocks:", error);
            return [];
        }
    }
    async function updateYourStocksTable() {
        const userStocks = await getUserStocks();
        const table = document.getElementById("yourStocksTable");
        // Clear any existing rows (excluding header)
        table.innerHTML = `
            <tr>
                <th>Stock</th>
                <th>Price</th>
            </tr>`;
        // Populate the table with each user's stock and price
        for (const stockInfo of userStocks) {
            const { stockSymbol } = stockInfo;
            const price = await getStockPrice(stockSymbol);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${stockSymbol}</td>
                <td id="${stockSymbol}Price">$${price}</td>
            `;
            table.appendChild(row);
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        updateYourStocksTable();
    });
    let stockChart; // Declare stockChart globally
    async function getStockData() {
        const stockSymbol = document.getElementById("searchBar").value;
        document.getElementById("output").textContent = ""; // Clear previous messages
     try {
        const response = await fetch(javaURI + `/api/stocks/${stockSymbol}`);
        const data = await response.json();
        // Extract timestamps and prices
        const timestamps = data?.chart?.result?.[0]?.timestamp;
        const prices = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
        // Check if data exists
        if (timestamps && prices) {
                // Convert timestamps to readable dates
                const labels = timestamps.map(ts => new Date(ts * 1000).toLocaleString());
               displayChart(labels, prices, stockSymbol);
            } else {
                console.error(`Data not found for ${stockSymbol}. Response structure:`, data);
                document.getElementById("output").textContent = `Data not found for ${stockSymbol}.`;
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            document.getElementById("output").textContent = "Error fetching stock data. Please try again later.";
        }
}
function displayChart(labels, prices, tickerSymbol) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    // Destroy the old chart if it exists
    if (stockChart) {
        stockChart.destroy();
    }
    // Create a gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(106, 13, 173, 0.6)'); // Start with purple (rgba)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)'); // Fade to transparent
    // Determine min and max values for the y-axis based on prices
    const minPrice = Math.min(...prices) * 0.55; // 5% below the minimum price
    const maxPrice = Math.max(...prices) * 1.05; // 5% above the maximum price
    // Create a new chart
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: tickerSymbol.toUpperCase(),
                data: prices,
                borderColor: '#001f3f', // Dark blue color for the line
                borderWidth: 2,
                fill: true,
                backgroundColor: gradient,
                spanGaps: true,
                pointRadius: 0, // Remove dots
                tension: 0.1 // Smooth the line
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                    mode: 'index', // Tooltip for closest point
                    intersect: false // Show tooltip when hovering close to the line
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Timestamp' },
                    ticks: {
                        callback: function(value) {
                            // Format the timestamp to display only hours
                            return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }
                    },
                    grid: {
                        display: false // Remove grid lines on x-axis
                    }
                },
                y: {
                    title: { display: true, text: 'Price (USD)' },
                    grid: {
                        display: false // Remove grid lines on y-axis
                    }
                }
            }
        }
    });
}
async function getStockPrice(stock) {
        try {
            const response = await fetch(javaURI + `/api/stocks/${stock}`);
            const data = await response.json();
            console.log(data);
            const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
            const outputElement = document.getElementById("output");
            if (price !== undefined) {
                //outputElement.textContent = `The price of ${stock} is: $${price}`;
                return(price)
            } else {
                outputElement.textContent = `Price not found for ${stock}.`;
                console.error(`Price not found for ${stock}. Response structure:`, data);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            document.getElementById("output").textContent = "Error fetching stock data. Please try again later.";
        }
return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(prices[symbol]);
                }, 0); // Simulate network delay
            }); 
      }
      document.addEventListener("DOMContentLoaded", () => {
            updateStockPrices(); // Call the function after DOM is fully loaded
            getPortfolioPerformance(userID);
            //getUserIdFromAPI();
        });
async function updateStockPrices() {
            const stockSymbols = ['Spotify', 'Apple', 'Google', 'Facebook', 'Microsoft'];
            const tickerSymbols = ['SPOT', 'AAPL', 'GOOG', 'META', 'MSFT'];
            const tickerPrices = [];
            let counter = 0; 
            for (const stock of tickerSymbols) {
                const price = await getStockPrice(stock);
                tickerPrices.push(price)              
                const priceElement = document.getElementById(stockSymbols[counter] + "Price");
                if (priceElement) {
                    priceElement.textContent = `$${price}`;
                } else {
                    console.error(`Element with ID ${stock + "Price"} not found.`);
                }
                counter++;                 
                //console.log(price);
                //console.log(tickerPrices);
                //console.log(priceElement);
                //console.log(counter);
            }
        }
async function getPortfolioPerformance(user) {
            // Fetch user's stocks and quantities
            const userStocks = await getUserStock(user);
            const userValue = await getUserValue(user);
            let totalGain = 0;
            let totalLatestValue = 0;
            let totalOldValue = 0;
            for (const { stockSymbol, quantity } of userStocks) {
                const latestPrice = await getStockPrice(stockSymbol);
                const oldPrice = await getOldStockPrice(stockSymbol);
                // Calculate gain for each stock
                const stockGain = (latestPrice - oldPrice) * quantity;
                totalGain += stockGain;
                // Calculate total values for percent increase calculation
                totalLatestValue += latestPrice * quantity;
                totalOldValue += oldPrice * quantity;
            }
            // Calculate percent increase
            const percentIncrease = ((totalLatestValue - totalOldValue) / totalOldValue) * 100;
            console.log(`total increase: $${totalGain.toFixed(2)}, percent increase: ${percentIncrease.toFixed(2)}%`);
            const totalElement = document.getElementById("totalGain");
            const percentElement = document.getElementById("percentIncrease");
            const valueElement = document.getElementById("portfolioValue");
            totalElement.textContent = `$${totalGain.toFixed(2)}`;
            percentElement.textContent = `${percentIncrease.toFixed(2)}%`;
            valueElement.textContent = `$${userValue.toFixed(2)}`;
        }
async function getUserStock(user) {
            try {
                const response = await fetch(javaURI + `/stocks/table/getStocks?username=${user}`);
                const stocksData = await response.json();
                console.log(stocksData);
                return stocksData;
            } catch (error) {
                console.error("Error fetching user stocks:", error);
                return [];
            }
        }
async function getOldStockPrice(stock) {
        try {
            const response = await fetch(javaURI + `/api/stocks/${stock}`);
            const data = await response.json();
            console.log(data);
            const oldPrice = data?.chart?.result?.[0]?.meta?.chartPreviousClose;
            const outputElement = document.getElementById("output");
            if (oldPrice !== undefined) {
                //outputElement.textContent = `The price of ${stock} is: $${price}`;
                 console.log(`The previous close price of ${stock} is: $${oldPrice}`);
                return(oldPrice)
            } else {
                outputElement.textContent = `Price not found for ${stock}.`;
                console.error(`Price not found for ${stock}. Response structure:`, data);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            document.getElementById("output").textContent = "Error fetching stock data. Please try again later.";
        }
      }
async function getUserValue(user) {
            try {
                const response = await fetch(javaURI + `/stocks/table/portfolioValue?username=${user}`);
                const stocksData = await response.json();
                console.log(stocksData);
                return stocksData;
            } catch (error) {
                console.error("Error fetching user stocks:", error);
                return [];
            }
        }
async function logout() {
            userID = "";
            console.log(userID);
            localStorage.setItem('userID', userID)
            return(userID);   
        }
document.getElementById("leaderboardButton").addEventListener("click", function () {
    openLeaderboard(); // Open the leaderboard modal when the button is clicked
});
document.getElementById("closeLeaderboardButton").addEventListener("click", function () {
    closeLeaderboard(); // Close the leaderboard modal when the close button is clicked
});
// Open leaderboard modal
function openLeaderboard() {
    const modal = document.getElementById("leaderboardModal");
    const overlay = document.getElementById("modalOverlay");
    modal.style.display = "block";
    overlay.style.display = "block";
    fetchLeaderboard(); // Fetch and display leaderboard data
}
// Close leaderboard modal
function closeLeaderboard() {
    const modal = document.getElementById("leaderboardModal");
    const overlay = document.getElementById("modalOverlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}
// Fetch leaderboard data
function fetchLeaderboard() {
    const leaderboardTable = document.getElementById("leaderboardTable");
    leaderboardTable.innerHTML = `<tr><td colspan="3" style="text-align: center;">Loading...</td></tr>`; // Display loading text
    fetch(javaURI + "/user/leaderboard") // Update API endpoint if needed
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard");
            }
            return response.json();
        })
        .then((data) => {
            leaderboardTable.innerHTML = ""; // Clear the loading text
            if (Array.isArray(data)) {
                // Sort data by balance descending for proper ranking
                const sortedData = data.sort((a, b) => b.balance - a.balance);
                sortedData.forEach((entry, index) => {
                    const rank = index + 1; // Calculate rank based on order
                    const username = entry.username; // Extract username
                    const portfolioValue = entry.balance.toFixed(2); // Extract portfolio value and format it
                    // Append each entry to the leaderboard table
                    leaderboardTable.innerHTML += `
                        <tr>
                            <td>${rank}</td>
                            <td>${username}</td>
                            <td>$${portfolioValue}</td>
                        </tr>
                    `;
                });
            } else {
                leaderboardTable.innerHTML = `
                    <tr>
                        <td colspan="3" style="text-align: center; color: red;">Invalid leaderboard data format</td>
                    </tr>
                `;
            }
        })
        .catch((error) => {
            console.error("Error fetching leaderboard:", error);
            leaderboardTable.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align: center; color: red;">Failed to load leaderboard data</td>
                </tr>
            `;
        });
}