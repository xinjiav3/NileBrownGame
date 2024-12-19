---
layout: post
title: Media Bias Game Leaderboard
permalink: /media/leaderboard
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
</head>
<body>
    <h1>Leaderboard</h1>
    <table id="leaderboard-table" border="1">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            <!-- Leaderboard rows will be inserted here -->
        </tbody>
    </table>
    <script>
        // Fetch leaderboard data from backend
        fetch('http://localhost:8085/api/media')  // Assuming the backend returns a list of usernames
            .then(response => response.json())
            .then(data => {
                const leaderboardTable = document.querySelector("#leaderboard-table tbody");
                if (data.length === 0) {
                    const noDataRow = document.createElement('tr');
                    noDataRow.innerHTML = `<td colspan="2">No data available</td>`;
                    leaderboardTable.appendChild(noDataRow);
                    return;
                }
                data.forEach((username, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>  <!-- Rank generated automatically -->
                        <td>${username}</td>
                    `;
                    leaderboardTable.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching leaderboard:", error));
    </script>
</body>
</html>
