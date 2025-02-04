---
toc: false
layout: post
title: Seed Tracker Log
type: ccc
permalink: /project/mort-translator/teacher-seed-log
---


<html lang="en">
<head>
    <title>Seed Tracker Log</title>
</head>
<h1>Teacher Seed Log</h1>

<!-- Dropdown to select a student -->
<label for="studentSelect">Select Student:</label>
<select id="studentSelect">
  <option value="">-- Choose a Student --</option>
</select>

<!-- Table for seed change log -->
<table id="seedLogTable">
  <thead>
    <tr>
      <th>Date/Time</th>
      <th>Old Seed</th>
      <th>New Seed</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<script type="module">
  import {javaURI} from '{{site.baseurl}}/assets/js/api/config.js';

  // Fetch student list and populate dropdown
   async function fetchStudents() {
    try {
        const response = await fetch(`${javaURI}/api/seeds/`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const seedEntries = await response.json();
        console.log("Fetched seed data:", seedEntries); // Debugging log

        if (!Array.isArray(seedEntries)) throw new Error("API response is not an array");

        const studentSelect = document.getElementById('studentSelect');
        studentSelect.innerHTML = '<option value="">-- Choose a Student --</option>'; // Reset dropdown

        // Extract unique student names from the seed data
        const studentNames = [...new Set(seedEntries.map(entry => entry.name))];

        studentNames.forEach(name => {
            if (!name) {
                console.warn("Skipping empty student name:", name);
                return; // Skip invalid names
            }
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            studentSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching student list:', error);
        alert("Failed to load student list. Check console for details.");
    }
}

  // Fetch and display the seed log for the selected student
  async function fetchSeedLog(studentId) {
    try {
      const response = await fetch(`${javaURI}/api/seeds/${studentId}`);
      const seedLog = await response.json();

      const tableBody = document.getElementById('seedLogTable').querySelector('tbody');
      tableBody.innerHTML = '';  // Clear existing rows

      if (seedLog.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No seed changes found</td></tr>`;
      } else {
        seedLog.forEach(entry => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${entry.timestamp}</td>
            <td>${entry.oldSeed}</td>
            <td>${entry.newSeed}</td>
            <td>${entry.comment || 'No comment'}</td>
          `;
          tableBody.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Error fetching seed log:', error);
    }
  }

  // Event listener for student selection
  document.getElementById('studentSelect').addEventListener('change', (event) => {
    const studentId = event.target.value;
    if (studentId) {
      fetchSeedLog(studentId);
    } else {
      document.getElementById('seedLogTable').querySelector('tbody').innerHTML = '';
    }
  });

  // Load students when the page loads
  document.addEventListener('DOMContentLoaded', fetchStudents);
</script>

