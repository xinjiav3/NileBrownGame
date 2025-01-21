---
layout: post
title: Grader View
type: issues
permalink: /teacher-toolkit/check-grades
comments: false
---
<style>
  #user-details-container {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .user-card {
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .user-card h3 {
    margin: 0 0 10px;
  }

  .user-card p {
    margin: 5px 0;
  }
</style>
<h2 id="page-title">User Details</h2>
<button id="fetch-user-details-button">Fetch User Details</button>
<div id="user-details-container">
    <p>Click the button to load user details...</p>
</div>

<script type="module">
  import { javaURI } from '{{site.baseurl}}/assets/js/api/config.js';

  function fetchUserDetails() {
    console.log("Fetching user details..."); // Check if the function is triggered
    fetch(`${javaURI}/api/person/get`, {
      method: "GET",
      credentials: "include", // Ensure cookies are sent for authentication
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("User not found or not logged in.");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        return response.json();
      })
      .then((person) => {
        const container = document.getElementById("user-details-container");
        container.innerHTML = `
          <div class="user-card">
            <h3>Name: ${person.name}</h3>
            <p>Email: ${person.email}</p>
            <p>UID: ${person.uid}</p>
          </div>
        `;
      })
      .catch((error) => {
        const container = document.getElementById("user-details-container");
        container.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error("Error fetching user details:", error);
      });
  }

  document
    .getElementById("fetch-user-details-button")
    .addEventListener("click", fetchUserDetails);
</script>
