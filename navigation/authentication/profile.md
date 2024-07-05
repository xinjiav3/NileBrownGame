---
layout: base
title: Profile S
permalink: /profile
search_exclude: true
---

{% include nav/home.html %}

<style>
    /* Global styles */
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
    }

    .login-card {
        width: 100%;
        max-width: 600px;
        background-color: #2c3e50; /* Dark blue background */
        border: 1px solid #34495e; /* Darker border */
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding-left: 20px;
        padding-right: 20px;
        color: #ffffff; /* White text */
    }

    .login-card h1 {
        font-size: 24px;
        text-align: center;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .form-group input[type="text"],
    .form-group input[type="file"],
    .form-group select {
        width: calc(100% - 12px);
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    .form-group button {
        background-color: #3498db; /* Blue button */
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 16px;
    }

    .form-group button:hover {
        background-color: #2980b9; /* Darker blue on hover */
    }

    .profile-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
    }

    .profile-table th,
    .profile-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }

    .details-button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        background-color: #3498db; /* Blue button */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
    }

    .details-button:hover {
        background-color: #2980b9; /* Darker blue on hover */
    }
</style>

<div class="login-container">
    <!-- Profile Setup -->
    <div class="login-card">
        <h1>Profile Setup</h1>
        <form id="profileForm">
            <div class="form-group">
                <label for="profilePicture">Upload Profile Picture:</label>
                <input type="file" id="profilePicture" accept="image/*" onchange="uploadProfilePicture(this)">
            </div>
            <p id="profile-message" style="color: red;"></p>
        </form>
        <div class="form-group">
            <label for="sectionDropdown">Choose Section:</label>
            <select id="sectionDropdown">
                <!-- Options will be dynamically populated -->
            </select>
        </div>
        <div class="form-group">
            <button type="button" onclick="addSection()">Add Section</button>
        </div>
        <table class="profile-table" id="profileTable">
            <thead>
                <tr>
                    <th>Abbreviation</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody id="profileResult">
                <!-- Table rows will be dynamically populated -->
            </tbody>
        </table>
        <a href="#" id="saveSectionsButton" class="details-button" onclick="saveSections()">Save Sections</a>
    </div>

</div>

<script type="module">
    // Import fetchOptions from config.js
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Array to store user-added sections
    let userSections = [];

    document.addEventListener('DOMContentLoaded', async function() {
        // Fetch existing sections on page load
        await fetchSections();

        // Populate section dropdown menu
        populateSectionDropdown();
    });

    // Function to fetch existing sections
    async function fetchSections() {
        const URL = `${pythonURI}/api/user/section`; // Adjusted endpoint

        try {
            const response = await fetch(URL, fetchOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch sections: ${response.status}`);
            }

            const data = await response.json();
            userSections = data.sections || []; // Assuming data is in { "sections": [...] } format

            // Display fetched sections
            displayProfileSections();
        } catch (error) {
            console.error('Error fetching sections:', error.message);
            // Handle error display or fallback mechanism
        }
    }

    // Function to populate section dropdown menu
    function populateSectionDropdown() {
        const sectionDropdown = document.getElementById('sectionDropdown');
        const sections = [
            { "abbreviation": "CSA", "id": 1, "name": "Computer Science A" },
            { "abbreviation": "CSP", "id": 2, "name": "Computer Science Principles" },
            { "abbreviation": "CSSE", "id": 4, "name": "Computer Science and Software Engineering" }
            // Add more sections as needed
        ];

        sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section.id;
            option.textContent = `${section.abbreviation} - ${section.name}`;
            sectionDropdown.appendChild(option);
        });
    }

    // Function to add a section
    function addSection() {
        const dropdown = document.getElementById('sectionDropdown');
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const abbreviation = selectedOption.textContent.split(' ')[0];
        const name = document.getElementById('sectionName').value.trim();

        if (!abbreviation || !name) {
            document.getElementById('profile-message').textContent = 'Please fill in both fields.';
            return;
        }

        // Clear error message
        document.getElementById('profile-message').textContent = '';

        // Add section to userSections array
        userSections.push({ abbreviation, name });

        // Display added section in the table
        displayProfileSections();
    }

    // Function to display added sections in the table
    function displayProfileSections() {
        const tableBody = document.getElementById('profileResult');
        tableBody.innerHTML = '';

        userSections.forEach(section => {
            const tr = document.createElement('tr');
            const abbreviationCell = document.createElement('td');
            const nameCell = document.createElement('td');

            abbreviationCell.textContent = section.abbreviation;
            nameCell.textContent = section.name;

            tr.appendChild(abbreviationCell);
            tr.appendChild(nameCell);

            tableBody.appendChild(tr);
        });
    }

    // Function to upload profile picture
    async function uploadProfilePicture(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        try {
            const base64String = await convertToBase64(file);
            await sendProfilePicture(base64String);
            console.log('Profile picture uploaded successfully!');
            // Handle success message or UI update
        } catch (error) {
            console.error('Error uploading profile picture:', error.message);
            // Handle error display or fallback mechanism
        }
    }

    // Function to convert file to base64 string
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    // Function to send profile picture to server
    async function sendProfilePicture(base64String) {
        const URL = `${pythonURI}/api/id/pfp`; // Adjust endpoint as needed
        const options = {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({ base64String }),
        };

        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error(`Failed to upload profile picture: ${response.status}`);
        }
        // Handle success response as needed
    }

    // Function to save sections (example action)
    function saveSections() {
        const URL = `${pythonURI}/api/user/section`; // Adjusted endpoint

        const sectionsData = {
            sections: userSections
        };

        const options = {
            ...fetchOptions,
            method: 'POST',
            headers: {
                ...fetchOptions.headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sectionsData)
        };

        fetch(URL, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to save sections: ${response.status}`);
                }
                // Handle success response as needed
                console.log('Sections saved successfully!');
            })
            .catch(error => {
                console.error('Error saving sections:', error.message);
                // Handle error display or fallback mechanism
            });
    }
</script>

