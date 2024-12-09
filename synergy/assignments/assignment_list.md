---
layout: page 
title: Assignment List
permalink: /synergy/assignments
search_exclude: true
show_reading_time: false 
---

<!-- 
View Assignments using Backend API: /api/assignments (GET)
Submit Assignments using Backend API: /submit/{assignmentId} (POST)
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignments List</title>
</head>
<body>
    <h1>Assignments List</h1>
    <table id="assignmentsTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Points</th>
                <th>Due Date</th>
            </tr>
        </thead>
        <tbody>
            <!-- Assignments will be populated here -->
        </tbody>
    </table>
    <script type="module" src="assets/js/api/config.js"></script>
    <script>
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    window.fetchAssignmentsDebug = function() {
        const debugButton = document.querySelector(".debug-card button");
        debugButton.disabled = true;
        debugButton.style.backgroundColor = '#d3d3d3';
        const debugOptions = {
            URL: `${javaURI}/api/assignments/debug`,
            method: "GET",
            cache: "no-cache"
        };
        fetch(debugOptions.URL, {
            method: debugOptions.method,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Debug request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Debug Data:", data); // Log the fetched data
            // Populate the assignments table
            const tableBody = document.querySelector("#assignmentsTable tbody");
            tableBody.innerHTML = ""; // Clear any existing table rows
            data.assignments.forEach(assignment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${assignment.id}</td>
                    <td>${assignment.name}</td>
                    <td>${assignment.type}</td>
                    <td>${assignment.description}</td>
                    <td>${assignment.points}</td>
                    <td>${assignment.due_date}</td>
                `;
                tableBody.appendChild(row);
            });
            document.getElementById("debugMessage").textContent = "Debug data fetched successfully!";
        })
        .catch(error => {
            console.error("Debug Error:", error);
            document.getElementById("debugMessage").textContent = `Debug Error: ${error.message}`;
            debugButton.disabled = false;
            debugButton.style.backgroundColor = '';
        });
    };
</script>
</body>
</html>
