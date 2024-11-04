---
layout: post
title: Mines 
permalink: /casino/mines
---

<!-- Game Board Table -->
<table>
  <tr>
    <td><a href="#">1,1</a></td>
    <td><a href="#">1,2</a></td>
    <td><a href="#">1,3</a></td>
    <td><a href="#">1,4</a></td>
    <td><a href="#">1,5</a></td>
  </tr>
  <tr>
    <td><a href="#">2,1</a></td>
    <td><a href="#">2,2</a></td>
    <td><a href="#">2,3</a></td>
    <td><a href="#">2,4</a></td>
    <td><a href="#">2,5</a></td>
  </tr>
  <tr>
    <td><a href="#">3,1</a></td>
    <td><a href="#">3,2</a></td>
    <td><a href="#">3,3</a></td>
    <td><a href="#">3,4</a></td>
    <td><a href="#">3,5</a></td>
  </tr>
  <tr>
    <td><a href="#">4,1</a></td>
    <td><a href="#">4,2</a></td>
    <td><a href="#">4,3</a></td>
    <td><a href="#">4,4</a></td>
    <td><a href="#">4,5</a></td>
  </tr>
  <tr>
    <td><a href="#">5,1</a></td>
    <td><a href="#">5,2</a></td>
    <td><a href="#">5,3</a></td>
    <td><a href="#">5,4</a></td>
    <td><a href="#">5,5</a></td>
  </tr>
</table>

<!-- Popup Modal for Stakes and Bet Amount -->
<div id="popup" style="display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 2px solid #333; padding: 20px; background-color: white; z-index: 10; width: 200px;">
  <p>Welcome to the game!</p>
  
  <!-- Bet Amount Input -->
  <label for="betAmount">Bet Amount:</label>
  <input type="number" id="betAmount" placeholder="Enter amount" style="width: 100%; margin-top: 5px;">
  
  <br><br>
  
  <!-- Stakes Dropdown Menu -->
  <label for="stakes">Stakes:</label>
  <select id="stakes" style="width: 100%; margin-top: 5px;">
    <option value="" disabled selected>Select Stakes</option>
    <option value="low">Low Stakes</option>
    <option value="medium">Medium Stakes</option>
    <option value="high">High Stakes</option>
  </select>
  
  <br><br>
  
  <button id="betButton">Bet</button>
  <p id="error" style="color: red; display: none; margin-top: 10px;">Please enter a valid amount and select stakes.</p>
</div>

<!-- Background Overlay -->
<div id="overlay" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 5;"></div>

<!-- Winnings Display -->
<div id="winningsDisplay" style="margin-top: 10px;">Winnings: 0.00</div>

<script>
// Function to start game by sending POST request with stakes level
function startGame(stakes) {
  fetch(`http://localhost:8085/api/casino/mines/stakes/${stakes}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.ok) {
      console.log("Game started with stakes:", stakes);
      document.getElementById("popup").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    } else {
      console.error("Failed to start game");
    }
  });
}

// Event listener for Bet button
document.getElementById("betButton").onclick = function() {
  const betAmount = document.getElementById("betAmount").value;
  const stakes = document.getElementById("stakes").value;

  if (betAmount && !isNaN(betAmount) && Number(betAmount) > 0 && stakes) {
    startGame(stakes.toLowerCase()); // Start the game with selected stakes
  } else {
    document.getElementById("error").style.display = "block";
  }
};

// Event listeners for board cell clicks
document.querySelectorAll("table td a").forEach(cell => {
  cell.onclick = function(event) {
    event.preventDefault();
    
    // Get x and y coordinates from cell text (e.g., "1,2")
    const [xCoord, yCoord] = this.textContent.split(',').map(Number);

    // Send GET request to check for a mine at (xCoord, yCoord)
    fetch(`http://localhost:8085/api/casino/mines/${xCoord}/${yCoord}`)
    .then(response => response.json())
    .then(isMine => {
      if (isMine) {
        alert("Boom! You hit a mine!");
      } else {
        alert("Safe! No mine here.");
        updateWinnings(); // Update winnings if cell is safe
      }
    })
    .catch(error => console.error("Error checking mine:", error));
  };
});

// Function to update winnings display
function updateWinnings() {
  fetch("http://localhost:8085/api/casino/mines/winnings")
    .then(response => response.json())
    .then(winnings => {
      document.getElementById("winningsDisplay").textContent = `Winnings: ${winnings.toFixed(2)}`;
    })
    .catch(error => console.error("Error fetching winnings:", error));
}
</script>

