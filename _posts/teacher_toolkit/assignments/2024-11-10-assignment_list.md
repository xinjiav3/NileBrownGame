---
layout: page 
title: Assignment List
permalink: /synergy/assignments
search_exclude: true
show_reading_time: false 
---

<!-- 
View Assignments using Backend API: /api/assignments
Submit Assignments using Backend API: /submit/{assignmentId}
-->

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignments List</title>
</head>
<body>
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
    <script type="module">
        import {javaURI} from '{{site.baseurl}}/assets/js/api/config.js';
        console.log("Initialized")
        fetch(`${javaURI}/api/assignments/debug`)  // Correct URL
            .then(response => response.json())
            .then(assignments => {
                const tableBody = document.getElementById('assignmentsTable').getElementsByTagName('tbody')[0];
                assignments.forEach(assignment => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${assignment.id}</td>
                        <td>${assignment.name}</td>
                        <td>${assignment.type}</td>
                        <td>${assignment.description}</td>
                        <td>${assignment.points}</td>
                        <td>${assignment.dueDate}</td>
                    `;
                    tableBody.appendChild(row);
                    console.log(row);  // Check if rows are being appended
                });
            })
            .catch(error => console.error('Error fetching assignments:', error));
    </script>
</body>
</html>
