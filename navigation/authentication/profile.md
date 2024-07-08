---
layout: base
title: Profile Setup
permalink: /profile
search_exclude: true
---


{% include nav/home.html %}


<style>
   /* Global styles */
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }


   html, body {
       font-family: Arial, sans-serif;
       line-height: 1.6;
       background-color: #f0f0f0;
   }


   .login-container {
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100vh;
   }


   .login-card {
       width: 100%;
       max-width: 600px;
       background-color: #2c3e50; /* Dark blue background */
       border: 1px solid #34495e; /* Darker border */
       border-radius: 5px;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       padding: 20px;
       color: #ffffff; /* White text */
   }


   .login-card h1 {
       font-size: 24px;
       text-align: center;
       margin-bottom: 20px;
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


   .profile-image-box {
       text-align: center;
       margin-top: 20px;
   }


   .profile-image-box img {
       max-width: 100%;
       height: auto;
       border-radius: 50%;
       border: 2px solid #34495e;
   }
</style>


<div class="login-container">
   <!-- Profile Setup -->
   <div class="login-card">
       <h1>Profile Setup</h1>
       <form id="profileForm">
           <div class="form-group">
               <label for="profilePicture">Upload Profile Picture:</label>
               <input type="file" id="profilePicture" accept="image/*" onchange="previewProfilePicture(this)">
           </div>
           <div class="profile-image-box" id="profileImageBox">
               <!-- Profile picture will be displayed here -->
           </div>
           <div class="form-group">
               <button type="button" onclick="saveProfilePicture()">Save Profile Image</button>
           </div>
           <p id="profile-message" style="color: red;"></p>
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
       </form>
   </div>
</div>


<script type="module">
   // Import fetchOptions from config.js
   import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

   // Function to fetch user profile data
   async function fetchUserProfile() {
       const URL = `${pythonURI}/api/id/pfp`; // Endpoint to fetch user profile data

       try {
           const response = await fetch(URL, fetchOptions);
           if (!response.ok) {
               throw new Error(`Failed to fetch user profile: ${response.status}`);
           }

           const profileData = await response.json();
           displayUserProfile(profileData);
       } catch (error) {
           console.error('Error fetching user profile:', error.message);
           // Handle error display or fallback mechanism
       }
   }

   // Function to display user profile data
   function displayUserProfile(profileData) {
       const profileImageBox = document.getElementById('profileImageBox');
       if (profileData.pfp) {
           getBase64Image(profileData.pfp)
               .then(base64String => {
                   const img = document.createElement('img');
                   img.src = base64String;
                   img.alt = 'Profile Picture';
                   profileImageBox.innerHTML = ''; // Clear existing content
                   profileImageBox.appendChild(img); // Append new image element
               })
               .catch(error => {
                   console.error('Error fetching profile picture:', error.message);
                   profileImageBox.innerHTML = '<p>Error loading profile picture.</p>';
               });
       } else {
           profileImageBox.innerHTML = '<p>No profile picture available.</p>';
       }

       // Display other profile information as needed
       // Example: Update HTML elements with profileData.username, profileData.email
   }

   // Function to get profile picture as base64 string from backend
  async function getBase64Image() {
    const URL = `${pythonURI}/api/id/pfp`; // Endpoint to fetch profile picture base64 data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile picture: ${response.status}`);
        }

        const imageData = await response.blob();
        return await convertBlobToBase64(imageData);
    } catch (error) {
        throw new Error(`Error fetching profile picture: ${error.message}`);
    }
}


   // Function to convert blob data to base64 string
   function convertBlobToBase64(blob) {
       return new Promise((resolve, reject) => {
           const reader = new FileReader();
           reader.onloadend = () => resolve(reader.result);
           reader.onerror = reject;
           reader.readAsDataURL(blob);
       });
   }

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
   window.addSection = function() {
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

   // Function to preview profile picture
   window.previewProfilePicture = function(fileInput) {
       const file = fileInput.files[0];
       if (!file) return;

       const reader = new FileReader();
       reader.onload = function(e) {
           const profileImageBox = document.getElementById('profileImageBox');
           profileImageBox.innerHTML = `<img src="${e.target.result}" alt="Profile Picture">`;
       };
       reader.readAsDataURL(file);
   }

   // Function to save profile picture
   window.saveProfilePicture = async function() {
       const fileInput = document.getElementById('profilePicture');
       const file = fileInput.files[0];
       if (!file) return;

       try {
           const base64String = await convertToBase64(file);
           await sendProfilePicture(base64String);
           console.log('Profile picture uploaded successfully!');
           // Optionally update UI after successful upload, such as displaying a success message or updating profile picture preview
           const profileImageBox = document.getElementById('profileImageBox');
           profileImageBox.innerHTML = `<img src="${base64String}" alt="Profile Picture">`;
       } catch (error) {
           console.error('Error uploading profile picture:', error.message);
           // Handle error display or fallback mechanism
       }
   }

   // Function to convert file to base64
   async function convertToBase64(file) {
       return new Promise((resolve, reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
       });
   }

   // Function to send profile picture to server
   async function sendProfilePicture(base64String) {
       const URL = `${pythonURI}/api/id/pfp`; // Adjust endpoint as needed
       const options = {
           ...fetchOptions,
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
               // Add any other headers if necessary
           },
           body: JSON.stringify({ pfp: base64String })
       };

       try {
           const response = await fetch(URL, options);
           if (!response.ok) {
               throw new Error(`Failed to upload profile picture: ${response.status}`);
           }
           console.log('Profile picture uploaded successfully!');
           // Handle success response as needed
       } catch (error) {
           console.error('Error uploading profile picture:', error.message);
           // Handle error display or fallback mechanism
       }
   }

   // Function to save sections (example action)
   window.saveSections = function() {
       const URL = `${pythonURI}/api/user/section`; // Adjusted endpoint

       const sectionsData = {
           sections: userSections
       };

       const options = {
           ...fetchOptions,
           method: 'PUT',
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

   // Call fetchUserProfile and fetchSections when DOM content is loaded
   document.addEventListener('DOMContentLoaded', async function() {
       await fetchUserProfile();
       await fetchSections();
   });
</script>




