---
layout: base
permalink: /stocks/buysellNew
title: Stocks Buy/Sell New
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
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #001f3f;
            color: #fff;
            box-sizing: border-box;
        }
        .navbar .logo {
            font-size: 2rem;
            flex: 1 1 auto;
        }
        .nav-buttons {
            display: flex;
            flex: 2 1 auto;
            justify-content: flex-end;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        .nav-buttons a {
            font-size: 1rem;
            padding: 0.5rem 1rem;
        }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .card {
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
            color: #fff;
            box-sizing: border-box;
            font-size: 1rem;
        }
        .card h2 {
            font-size: 1.25rem;
        }
        .card p {
            font-size: 1.75rem;
        }
        .main-content {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2%;
            box-sizing: border-box;
        }
        .header {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin: 3rem 0;
        }
        .header h1 {
            font-size: 2rem;
            flex: 1 1 60%;
        }
        .buy-sell-buttons-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            flex: 1 1 35%;
            margin-top: 1rem;
        }
        .buysell {
            margin-top: 0.5rem;
            font-size: 1rem;
        }
        .price-info h2 {
            font-size: 2.5rem;
            margin: 2rem 0;
        }
        .change {
            font-size: 1.25rem;
        }
        .metrics {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 2rem 0;
        }
        .metric {
            flex: 1 1 200px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            padding: 1rem;
            border-radius: 0.25rem;
            text-align: center;
            box-sizing: border-box;
            font-size: 1rem;
        }
        .search-container {
            display: flex;
            width: 100%;
            max-width: 600px;
            margin: 2rem auto;
            background-color: #081e3d;
            padding: 0.5rem;
            border-radius: 0.25rem;
            box-sizing: border-box;
        }
        .search-container input[type="text"] {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 0.25rem 0 0 0.25rem;
            font-size: 1rem;
            background-color: #6ab8f9;
        }
        .search-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            border: none;
            border-radius: 0 0.25rem 0.25rem 0;
            cursor: pointer;
            background-color: #ff8c00;
            transition: background-color 0.3s;
        }
        .search-button:hover {
            background-color: #e07b00;
        }
        .chart-container {
            position: relative;
            width: 100%;
            padding-top: 56.25%;
            margin: 2rem 0;
        }
        .chart {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        canvas#stockChart {
            width: 100% !important;
            height: 100% !important;
        }
        .buy-sell-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
        }
        .buy-button, .sell-button {
            flex: 1;
            padding: 0.75rem;
            font-size: 1rem;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.3s;
            color: #fff;
        }
        .buy-button {
            background-color: #388e3c;
        }
        .buy-button:hover {
            background-color: #2e7d32;
        }
        .sell-button {
            background-color: #d32f2f;
        }
        .sell-button:hover {
            background-color: #c62828;
        }
        html {
            font-size: 16px;
        }
        @media (max-width: 1200px) {
            html {
                font-size: 15px;
            }
        }
        @media (max-width: 992px) {
            html {
                font-size: 14px;
            }
        }
        @media (max-width: 768px) {
            html {
                font-size: 13px;
            }
        }
        @media (max-width: 576px) {
            html {
                font-size: 12px;
            }
        }
        @media (max-width: 768px) {
            .navbar .logo {
                font-size: 1.5rem;
            }
            .nav-buttons a {
                font-size: 0.9rem;
                padding: 0.5rem 1rem;
            }
            .header h1 {
                font-size: 1.75rem;
                flex: 1 1 100%;
                text-align: center;
            }
            .buy-sell-buttons-container {
                flex: 1 1 100%;
                align-items: center;
            }
            .search-container {
                max-width: 90%;
            }
            .summary-cards {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            .card h2 {
                font-size: 1.1rem;
            }
            .card p {
                font-size: 1.5rem;
            }
            .price-info h2 {
                font-size: 2rem;
            }
            .change {
                font-size: 1rem;
            }
            .metric {
                flex: 1 1 150px;
                padding: 0.75rem;
                font-size: 0.9rem;
            }
        }
        @media (max-width: 480px) {
            .search-container {
                flex-direction: column;
            }
            .search-container input[type="text"], .search-button {
                width: 100%;
                border-radius: 0.25rem;
            }
            .search-button {
                margin-top: 0.5rem;
                border-radius: 0.25rem;
            }
            .buy-sell-buttons {
                flex-direction: column;
                gap: 0.5rem;
            }
            .buy-button, .sell-button {
                width: 100%;
            }
        }
        *, *::before, *::after {
            box-sizing: border-box;
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
    <div class="search-container">
        <input type="text" id="searchBar" placeholder="Search..." oninput="this.value = this.value.toUpperCase()">
        <button class="search-button" onclick="getStockData()">Search</button>
    </div>
    <!-- Content to display only after search -->
    <div id="stock-content" style="display: none;">
        <!-- Header with stock name and Buy/Sell buttons on the same line -->
        <!-- Header with stock name and Buy/Sell buttons on the same line -->
    <div class="header">
        <div>
            <h1 id="stock-name">N/A</h1>
            <p id="stock-symbol">NASDAQ: N/A</p>
        </div>
        <div class="buy-sell-buttons-container">
    <div class="buy-sell-buttons">
        <button class="buy-button" onclick="handleBuyClick()">Buy</button>
        <button class="sell-button" onclick="handleSellClick()">Sell</button>
    </div>
    <!-- Quantity Input Box -->
    <input type="number" id="quantity-input" placeholder="Enter quantity" min="1" style="width: 125px; margin-top: 10px;">
    <p class="buysell" id="buysell"></p>
    <p class="userStock" id="userStock"></p>
    <script>
            let buyCooldown = false;
            let sellCooldown = false;
            const changeElement = document.getElementById('buysell');
            function handleBuyClick() {
                let quantity = document.getElementById("quantity-input").value;
                if (!buyCooldown && quantity && !isNaN(quantity)) {
                    buyStock();
                    buyCooldown = true;
                    setTimeout(() => { buyCooldown = false; }, 1000); // 1 second cooldown
                } else {
                    displayError("Please enter a valid quantity.");
                    console.error("quantity");
                    changeElement.textContent = `Please enter a value`;
                    changeElement.classList.add("negative");
                    changeElement.classList.remove("positive");
                }
            }
            function handleSellClick() {
                let quantity = document.getElementById("quantity-input").value;
                if (!sellCooldown && quantity && !isNaN(quantity)) {
                    removeStock();
                    sellCooldown = true;
                    setTimeout(() => { sellCooldown = false; }, 1000); // 1 second cooldown
                } else {
                    displayError("Please enter a valid quantity.");
                    console.error("quantity");
                    changeElement.textContent = `Please enter a value`;
                    changeElement.classList.add("negative");
                    changeElement.classList.remove("positive");
                }
            }
            function displayError(message) {
                const output = document.getElementById("output");
                output.textContent = message;
                setTimeout(() => { output.textContent = ""; }, 2000); // Clear after 2 seconds
            }
        </script>
</div>
    </div>
        <!-- Price Info -->
        <div class="price-info">
            <h2 id="stock-price">N/A</h2>
            <p id="stock-change" class="change positive">N/A</p>
        </div>
        <!-- Summary Cards -->
        <div class="summary-cards">
            <div class="card card-darkblue">
                <h2>Volume:</h2>
                <p id="volume">N/A</p>
            </div>
            <div class="card card-purple">
                <h2>Day High:</h2>
                <p id="day-high">N/A</p>
            </div>
            <div class="card card-orange">
                <h2>52-Week High:</h2>
                <p id="year-high">N/A</p>
            </div>
            <div class="card card-purple">
                <h2>Day Low:</h2>
                <p id="day-low">N/A</p>
            </div>
            <div class="card card-darkblue">
                <h2>52-Week Low:</h2>
                <p id="year-low">N/A</p>
            </div>
        </div>
        <!-- Chart Container -->
        <div class="chart-container" id="chartContainer">
            <div class="chart" id="chart1">
                <canvas id="stockChart" width="475" height="375">[Graph Placeholder]</canvas>
            </div>
        </div>
    </div>
    <div id="output" style="color: red; padding-top: 10px;"></div>
    <script>
     let stockChart;
    var userID = localStorage.getItem('userID')
    console.log(userID);
    async function getStockData() {
        const stockSymbol = document.getElementById("searchBar").value;
        document.getElementById("output").textContent = ""; // Clear previous messages
        document.getElementById("buysell").textContent = ""; // Clear previous messages
        document.getElementById("userStock").textContent = ""; // Clear previous messages
        try {
            const response = await fetch(`http://localhost:8085/api/stocks/${stockSymbol}`);
            const data = await response.json();
            if (data?.chart?.result) {
                // Show stock content container if data is found
                document.getElementById("stock-content").style.display = "block";
                // Display data in HTML elements as in your original script
                const timestamps = data.chart.result[0].timestamp;
                const prices = data.chart.result[0].indicators.quote[0].close;
                const stockName = data.chart.result[0].meta.longName;
                const stockPrice = data.chart.result[0].meta.regularMarketPrice;
                const percentChange = await getPercentChange(stockSymbol);
                document.getElementById('stock-name').textContent = `${stockName} (${stockSymbol})`;
                document.getElementById('stock-symbol').textContent = `NASDAQ: ${stockSymbol}`;
                document.getElementById('stock-price').textContent = `$${stockPrice.toFixed(2)}`;
                const changeElement = document.getElementById('stock-change');
        changeElement.textContent = `${percentChange}%`;
        if (percentChange < 0) {
            changeElement.classList.add("negative");
            changeElement.classList.remove("positive");
        } else {
            changeElement.classList.add("positive");
            changeElement.classList.remove("negative");
        }
        const volume = data?.chart?.result?.[0]?.meta?.regularMarketVolume;
        const dayHigh = data?.chart?.result?.[0]?.meta?.regularMarketDayHigh;
        const dayLow = data?.chart?.result?.[0]?.meta?.regularMarketDayLow;
        const yearHigh = data?.chart?.result?.[0]?.meta?.fiftyTwoWeekHigh;
        const yearLow = data?.chart?.result?.[0]?.meta?.fiftyTwoWeekLow;
        document.getElementById('volume').textContent = volume ? volume.toLocaleString() : 'N/A';
        document.getElementById('day-high').textContent = dayHigh ? `$${dayHigh.toFixed(2)}` : 'N/A';
        document.getElementById('year-high').textContent = dayHigh ? `$${yearHigh.toFixed(2)}` : 'N/A';
        document.getElementById('day-low').textContent = dayLow ? `$${dayLow.toFixed(2)}` : 'N/A';
        document.getElementById('year-low').textContent = dayLow ? `$${yearLow.toFixed(2)}` : 'N/A';
        // Check if data exists
        if (timestamps && prices) {
                // Convert timestamps to readable dates
                const labels = timestamps.map(ts => new Date(ts * 1000).toLocaleString());
               displayChart(labels, prices, stockSymbol);
            } else {
                console.error(`Data not found for ${stockSymbol}. Response structure:`, data);
                document.getElementById("output").textContent = `Data not found for ${stockSymbol}.`;
                document.getElementById("stock-content").style.display = "none"; // Hide content if no data
            }
        } } catch (error) {
            console.error('Error fetching stock data:', error);
            document.getElementById("output").textContent = "Error fetching stock data. Please try again later.";
            document.getElementById("stock-content").style.display = "none"; // Hide content on error
        }
    }
async function getPercentChange(stockSymbol) {
        try {
            const response = await fetch(`http://localhost:8085/api/stocks/${stockSymbol}`);
            const data = await response.json();
            console.log(data);
            const newValue = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
            const oldValue = data?.chart?.result?.[0]?.meta?.chartPreviousClose;
            const percentChange = ((newValue - oldValue) / oldValue) * 100;
            //const outputElement = document.getElementById("output");
            if (percentChange !== undefined) {
                //outputElement.textContent = `The price of ${stock} is: $${price}`;
                return percentChange.toFixed(2);
            } else {
                outputElement.textContent = `Price not found for ${stockSymbol}.`;
                console.error(`Price not found for ${stockSymbol}. Response structure:`, data);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            document.getElementById("output").textContent = "Error fetching stock data. Please try again later.";
        }
        }
async function selectStock(stock) {
    const selectedStockElement = document.querySelector(`.stock-item[onclick="selectStock('${stock}')"]`);
    if (selectedStockElement) {
        selectedStockElement.classList.add("selected");
        currentlySelectedStock = selectedStockElement;
    }
    try {
        const response = await fetch(`http://localhost:8085/api/stocks/${stock}`);
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching stock data:', error);
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
async function buyStock() {
    const stockSymbol = document.getElementById("searchBar").value; // Get the stock symbol from the search bar
    const quantity = document.getElementById("quantity-input").value; 
    const outputElement = document.getElementById("output");
    outputElement.textContent = ""; // Clear previous messages
    console.log(stockSymbol);
    //await delay(1000);
    try {
        const response = await fetch('http://localhost:8085/user/addStock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userID,
                quantity: quantity,
                stockSymbol: stockSymbol
            })
        });
        const changeElement = document.getElementById('buysell');
        const userElement = document.getElementById('userStock');
        // Fetch updated user stock list after buying the stock
        const userStocks = await getUserStock(userID);
        if (response.ok) {
            // Find the stock in userStocks and get its updated quantity
            const stock = userStocks.find(s => s.stockSymbol === stockSymbol);
            const updatedQuantity = stock ? stock.quantity : 1; // Default to 1 if stock is newly added
            outputElement.textContent = `${stockSymbol} has been added to your portfolio.`;
            changeElement.textContent = `${stockSymbol} has been bought`;
            changeElement.classList.add("positive");
            changeElement.classList.remove("negative");
            // Display the updated quantity of the bought stock
            userElement.textContent = `${stockSymbol} current quantity: ${updatedQuantity}`;
            console.log(`Successfully added 1 share of ${stockSymbol} to the portfolio.`);
            //await delay(1000);
        } else {
            changeElement.textContent = `Failed to add ${stockSymbol}. Please try again.`;
            changeElement.classList.add("negative");
            changeElement.classList.remove("positive");
            //userElement.textContent = `${stockSymbol} current quantity: ${updatedQuantity}`;
            console.error(`Failed to add ${stockSymbol}. Status code:`, response.status);
        }
    } catch (error) {
        console.error('Error adding stock:', error);
        changeElement.textContent = "Error adding stock. Please try again later.";
        changeElement.classList.add("negative");
        changeElement.classList.remove("positive");
        //userElement.textContent = `${stockSymbol} current quantity: ${updatedQuantity}`;
    }
}
async function removeStock() {
    const stockSymbol = document.getElementById("searchBar").value; // Get the stock symbol from the search bar
    const quantity = document.getElementById("quantity-input").value;
    const outputElement = document.getElementById("output");
    outputElement.textContent = ""; // Clear previous messages
    console.log(stockSymbol);
    //await delay(1000);
    try {
        const response = await fetch('http://localhost:8085/user/removeStock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userID,
                quantity: quantity,
                stockSymbol: stockSymbol
            })
        });
        const changeElement = document.getElementById('buysell');
        const userElement = document.getElementById('userStock');
        const userStocks = await getUserStock(userID);
        if (response.ok) {
            // Find the stock in userStocks and get its remaining quantity
            const stock = userStocks.find(s => s.stockSymbol === stockSymbol);
            const remainingQuantity = stock ? stock.quantity : 0; // If not found, assume 0
            outputElement.textContent = `${stockSymbol} has been removed from your portfolio.`;
            changeElement.textContent = `${stockSymbol} has been removed`;
            changeElement.classList.add("negative");
            changeElement.classList.remove("positive");
            // Display the updated user stocks with quantities
            userElement.textContent = `${stockSymbol} remaining quantity: ${remainingQuantity}`;
            console.log(`Successfully removed 1 share of ${stockSymbol} from the portfolio.`);
            //await delay(1000);
        } else {
            outputElement.textContent = `Failed to remove ${stockSymbol}. Please try again.`;
            console.error(`Failed to remove ${stockSymbol}. Status code:`, response.status);
        }
    } catch (error) {
        console.error('Error removing stock:', error);
        outputElement.textContent = "Error removing stock. Please try again later.";
    }
}
async function getUserStock(user) {
            try {
                const response = await fetch(`http://localhost:8085/user/getStocks?username=${user}`);
                const stocksData = await response.json();
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
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}