---
layout: post
permalink: /profile
menu: nav/home.html
search_exclude: true
show_reading_time: false
---


<style>


  .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
  }


.profile-card {
      width: 100%;
      max-width: 600px;
      background-color: #2c3e50; /* Dark blue background */
      border: 1px solid #34495e; /* Darker border */
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      color: #ffffff; /* White text */
  }




  .profile-card label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
  }




  .profile-card input[type="text"],
  .profile-card input[type="file"],
  .profile-card select {
      width: calc(100% - 12px);
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
  }




  .profile-card button {
      background-color: #3498db; /* Blue button */
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
  }




  .profile-card button:hover {
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
  /* CSS styles remain unchanged */
</style>


<div class="profile-container">
  <!-- Profile Setup -->
  <div class="profile-card">
      <h1>Profile Setup</h1>
      <form>
          <div>
              <label for="newUid">Enter New UID:</label>
              <input type="text" id="newUid" placeholder="New UID">
              <button type="button" onclick="changeUid()">Change UID</button>
          </div>
           <div>
              <label for="newUid">Enter New Name:</label>
              <input type="text" id="newName" placeholder="New Name">
              <button type="button" onclick="changeName()">Change Name</button>
          </div>
          <div>
            <label for="kasmServerNeeded">Kasm Server Needed:</label>
            <input type="checkbox" id="kasmServerNeeded" onclick="toggleKasmServerNeeded()">
     </div> 
          <label for="profilePicture">Upload Profile Picture:</label>
          <input type="file" id="profilePicture" accept="image/*" onchange="previewProfilePicture(this)">
          <div class="profile-image-box" id="profileImageBox">
              <!-- Profile picture will be displayed here -->
          </div>
          <button type="button" onclick="saveProfilePicture()">Save Profile Picture</button>
          <p id="profile-message" style="color: red;"></p>
          <div>
              <label for="sectionDropdown">Choose Section:</label>
              <select id="sectionDropdown">
                  <!-- Options will be dynamically populated -->
              </select>
          </div>
          <div>
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
      </form>
  </div>
</div>





<script type="module">
   // Import fetchOptions from config.js
   import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';


   // Global variable to hold predefined sections
   let predefinedSections = [];


   // Function to fetch  sections from kasm2_backend
   async function fetchPredefinedSections() {
       const URL = `${pythonURI}/api/section`;


       try {
           const response = await fetch(URL, fetchOptions);
           if (!response.ok) {
               throw new Error(`Failed to fetch predefined sections: ${response.status}`);
           }


           return await response.json();
       } catch (error) {
           console.error('Error fetching predefined sections:', error.message);
           return []; // Return empty array on error
       }
   }


   // Function to populate section dropdown menu
   function populateSectionDropdown(predefinedSections) {
       const sectionDropdown = document.getElementById('sectionDropdown');
       sectionDropdown.innerHTML = ''; // Clear existing options


       predefinedSections.forEach(section => {
           const option = document.createElement('option');
           option.value = section.abbreviation;
           option.textContent = `${section.abbreviation} - ${section.name}`;
           sectionDropdown.appendChild(option);
       });


       // Display sections in the table
       displayProfileSections();
   }


   // Global variable to hold user sections
   let userSections = [];


   // Function to add a section
   window.addSection = async function () {
       const dropdown = document.getElementById('sectionDropdown');
       const selectedOption = dropdown.options[dropdown.selectedIndex];
       const abbreviation = selectedOption.value;
       const name = selectedOption.textContent.split(' ').slice(1).join(' ');


       if (!abbreviation || !name) {
           document.getElementById('profile-message').textContent = 'Please select a section from the dropdown.';
           return;
       }


       // Clear error message
       document.getElementById('profile-message').textContent = '';


       // Add section to userSections array if not already added
       const sectionExists = userSections.some(section => section.abbreviation === abbreviation && section.name === name);
       if (!sectionExists) {
           userSections.push({ abbreviation, name });


           // Display added section in the table
           displayProfileSections();


           // Save sections immediately
           await saveSections();
       }
   }


   // Function to display added sections in the table
   function displayProfileSections() {
       const tableBody = document.getElementById('profileResult');
       tableBody.innerHTML = ''; // Clear existing rows


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


   // Function to save sections in the specified format
   async function saveSections() {
       const sectionAbbreviations = userSections.map(section => section.abbreviation);


       const sectionsData = {
           sections: sectionAbbreviations
       };


       const URL = `${pythonURI}/api/user/section`; // Adjusted endpoint


       const options = {
           ...fetchOptions,
           method: 'POST',
           headers: {
               ...fetchOptions.headers,
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(sectionsData)
       };


       try {
           const response = await fetch(URL, options);
           if (!response.ok) {
               throw new Error(`Failed to save sections: ${response.status}`);
           }
           console.log('Sections saved successfully!');


           // Fetch updated data and update table immediately after saving
           await fetchDataAndPopulateTable();
       } catch (error) {
           console.error('Error saving sections:', error.message);
           // Handle error display or fallback mechanism
       }
   }


   // Function to fetch data from backend and populate table
   async function fetchDataAndPopulateTable() {
       const URL = `${pythonURI}/api/user/section`; // Endpoint to fetch sections data


       try {
           const response = await fetch(URL, fetchOptions);
           if (!response.ok) {
               throw new Error(`Failed to fetch sections: ${response.status}`);
           }


           const sectionsData = await response.json();
           updateTableWithData(sectionsData); // Call function to update table with fetched data
       } catch (error) {
           console.error('Error fetching sections:', error.message);
           // Handle error display or fallback mechanism
       }
   }


   // Function to update table with fetched data
   function updateTableWithData(data) {
       const tableBody = document.getElementById('profileResult');
       tableBody.innerHTML = ''; // Clear existing rows


       data.sections.forEach(section => {
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
           const img = document.createElement('img');
           img.src = `data:image/jpeg;base64,${profileData.pfp}`;
           img.alt = 'Profile Picture';
           profileImageBox.innerHTML = ''; // Clear existing content
           profileImageBox.appendChild(img); // Append new image element
       } else {
           profileImageBox.innerHTML = '<p>No profile picture available.</p>';
       }


       // Display other profile information as needed
       // Example: Update HTML elements with profileData.username, profileData.email
   }


   // Function to save profile picture
   window.saveProfilePicture = async function () {
       const fileInput = document.getElementById('profilePicture');
       const file = fileInput.files[0];
       if (!file) return;


       try {
           const base64String = await convertToBase64(file);
           await sendProfilePicture(base64String);
           console.log('Profile picture uploaded successfully!');
           // Update UI immediately after successful upload
           const profileImage = document.getElementById('profileImage');
           profileImage.src = base64String; // Set the src attribute directly


           // Fetch image data from backend
           const imageData = await fetchProfilePictureData(); // Implement this function


           // Process imageData as needed
           console.log('Image data from backend:', imageData);
       } catch (error) {
           console.error('Error uploading profile picture:', error.message);
           // Handle error display or fallback mechanism
       }
   }


   // Function to fetch profile picture data
   async function fetchProfilePictureData() {
       try {
           const response = await fetch('/api/id/pfp', {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                   // Include any necessary authorization headers if required
               },
           });
           if (!response.ok) {
               throw new Error('Failed to fetch profile picture data');
           }
           const imageData = await response.json();
           return imageData; // Assuming the backend returns JSON data
       } catch (error) {
           console.error('Error fetching profile picture data:', error.message);
           throw error;
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


   // Function to preview profile picture
   window.previewProfilePicture = function(input) {
       const file = input.files[0];
       if (file) {
           const reader = new FileReader();
           reader.onload = function() {
               const profileImageBox = document.getElementById('profileImageBox');
               profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
           };
           reader.readAsDataURL(file);
       }
   }

     window.changeName = async function() {
     const newName = document.getElementById('newName').value.trim();
     const URL = `${pythonURI}/api/user`; // Adjusted endpoint


     if (!newName) {
         alert('Please enter a new name.');
         return;
     }


     const data = { name : newName };


     const options = {
         ...fetchOptions,
         method: 'PUT',
         headers: {
             ...fetchOptions.headers,
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
     };


     try {
         const response = await fetch(URL, options);
         if (!response.ok) {
             throw new Error(`Failed to change UID: ${response.status}`);
         }
         console.log('Name changed successfully!');


         // Optionally, refresh data or UI after UID change
     } catch (error) {
         console.error('Error changing UID:', error.message);
         // Handle error display or fallback mechanism
     }
 };

   window.changeUid = async function() {
     const newUid = document.getElementById('newUid').value.trim();
     const URL = `${pythonURI}/api/user`; // Adjusted endpoint


     if (!newUid) {
         alert('Please enter a new UID.');
         return;
     }


     const data = { uid: newUid };


     const options = {
         ...fetchOptions,
         method: 'PUT',
         headers: {
             ...fetchOptions.headers,
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
     };


     try {
         const response = await fetch(URL, options);
         if (!response.ok) {
             throw new Error(`Failed to change UID: ${response.status}`);
         }
         console.log('UID changed successfully!');


         // Optionally, refresh data or UI after UID change
     } catch (error) {
         console.error('Error changing UID:', error.message);
         // Handle error display or fallback mechanism
     }
 };

 window.fetchKasmServerNeeded = async function() {
    const URL = `${pythonURI}/api/id`; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch kasm_server_needed: ${response.status}`);
        }

        const userData = await response.json();
        const kasmServerNeeded = userData.kasm_server_needed 

        // Update checkbox state based on fetched value
        const checkbox = document.getElementById('kasmServerNeeded');
        checkbox.checked = kasmServerNeeded;
    } catch (error) {
        console.error('Error fetching kasm_server_needed:', error.message);
        // Handle error display or fallback mechanism
    }
};

// Function to toggle kasm_server_needed attribute on checkbox change
window.toggleKasmServerNeeded = async function() {
    const checkbox = document.getElementById('kasmServerNeeded');
    const newKasmServerNeeded = checkbox.checked;

    const URL = `${pythonURI}/api/user`; // Adjusted endpoint

    const data = {
        kasm_server_needed: newKasmServerNeeded
    };

    const options = {
        ...fetchOptions,
        method: 'PUT',
        headers: {
            ...fetchOptions.headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error(`Failed to update kasm_server_needed: ${response.status}`);
        }
        console.log('Kasm Server Needed updated successfully!');
    } catch (error) {
        console.error('Error updating kasm_server_needed:', error.message);
        // Handle error display or fallback mechanism
    }
};

window.fetchUid = async function() {
    const URL = `${pythonURI}/api/id`; // Adjusted endpoint for fetching user data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch UID: ${response.status}`);
        }

        const userData = await response.json();
        const oldUid = userData.uid || ''; // Default to empty string if attribute doesn't exist

        // Prefill UID input field
        const uidInput = document.getElementById('newUid');
        uidInput.value = oldUid;
    } catch (error) {
        console.error('Error fetching UID:', error.message);
        // Handle error display or fallback mechanism
    }
};

// Function to fetch existing Name from backend
window.fetchName = async function() {
    const URL = `${pythonURI}/api/id`; // Adjusted endpoint for fetching user data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const userData = await response.json();
        const oldName = userData.name || ''; // Default to empty string if attribute doesn't exist

        // Prefill Name input field
        const nameInput = document.getElementById('newName');
        nameInput.value = oldName;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        // Handle error display or fallback mechanism
    }
};

   // Call fetchPredefinedSections and initializeProfileSetup when DOM content is loaded
   document.addEventListener('DOMContentLoaded', async function () {
       try {
           predefinedSections = await fetchPredefinedSections();
           console.log('Predefined Sections:', predefinedSections);
           populateSectionDropdown(predefinedSections); // Populate dropdown with fetched sections
           await fetchUserProfile(); // Fetch user profile data
           await fetchDataAndPopulateTable(); // Fetch and populate table with user sections
           await fetchKasmServerNeeded();
       } catch (error) {
           console.error('Initialization error:', error.message);
           // Handle initialization error gracefully
       }
   });


</script>
