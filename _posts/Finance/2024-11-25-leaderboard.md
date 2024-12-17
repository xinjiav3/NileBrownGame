---
layout: none
permalink: /stocks/leaderboard
title: Leaderboard
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leaderboard</title>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f4f4f4;
      text-align: left;
    }
  </style>
</head>
<body>
  <h1>Leaderboard</h1>

  <!-- Top Users -->
  <section>
    <h2>Top 10 Users by Balance</h2>
    <table id="top-users-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Balance</th> <!-- Balance comes first -->
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <!-- Data will be inserted dynamically -->
      </tbody>
    </table>
  </section>

  <!-- Ranked Teams -->
  <!-- 
  <section>
    <h2>Teams Ranked by Total Balance</h2>
    <table id="ranked-teams-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Total Balance</th>
        </tr>
      </thead>
      <tbody>
        <!-- Data will be inserted dynamically -->
      </tbody>
    </table>
  </section>
  -->

  <script>
    // Fetch leaderboard data from the server
    fetch('http://localhost:8085/api/rankings/leaderboard')
      .then(response => response.json())
      .then(data => {
        const topUsers = data; // Directly use the array response

        // Populate Top Users table
        const topUsersTable = document.querySelector('#top-users-table tbody');
        topUsers.forEach((user, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>$${Number(user.balance).toFixed(2)}</td>
            <td>${user.name}</td>
          `;
          topUsersTable.appendChild(row);
        });

        // Populate Ranked Teams table
        /*
        const rankedTeamsTable = document.querySelector('#ranked-teams-table tbody');
        rankedTeams.forEach((team, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.team}</td>
            <td>$${team.totalBalance.toFixed(2)}</td>
          `;
          rankedTeamsTable.appendChild(row);
        });
        */
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        document.body.innerHTML = '<div>Error loading leaderboard data. Please try again later.</div>';
      });
  </script>
</body>
</html>