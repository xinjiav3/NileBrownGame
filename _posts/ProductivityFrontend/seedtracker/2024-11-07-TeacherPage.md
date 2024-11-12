---
toc: false
layout: post
title: Seed Tracker Teacher
type: ccc
permalink: /project/mort-translator/teacher-tracker
---



<head>
  <title>Student Weekly Project Submissions</title>
  <style>
    /* ... eshaan add in style later ... */
  </style>
</head>
<body>

<h1>Student Weekly Project Submissions</h1>
<table id="submissionsTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Student Name</th>
      <th>Comment</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    </tbody>
</table>

<script>
  async function fetchSubmissions() {
    try {
    const response = await fetch('http://localhost:8085/api/seeds/'); // Replace with your actual backend API endpoint
    const submissions = await response.json();
    console.log(submissions);
    
    const tableBody = document.getElementById('submissionsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    if (submissions.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No submissions found</td></tr>`;
    } else {
      submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${submission.id}</td>
          <td>${submission.name}</td>
          <td>${submission.comment}</td>
          <td>${submission.grade}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    } catch (error) {
      console.error('Error fetching submissions:', error);
      const tableBody = document.getElementById('submissionsTable').querySelector('tbody');
      tableBody.innerHTML = `<tr><td colspan="4">Error loading data: ${error.message}</td></tr>`;
    }
  }

  // Fetch data on page load
  document.addEventListener('DOMContentLoaded', fetchSubmissions);
</script>

</body>