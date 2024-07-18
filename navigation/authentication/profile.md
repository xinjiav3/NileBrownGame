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
        </div>
         <div>
            <label for="newUid">Enter New Name:</label>
            <input type="text" id="newName" placeholder="New Name">
        </div>
        <div>
          <label for="kasmServerNeeded">Kasm Server Needed:</label>
          <input type="checkbox" id="kasmServerNeeded" onclick="toggleKasmServerNeeded()">
   </div>
        <label for="profilePicture">Upload Profile Picture:</label>
        <input type="file" id="profilePicture" accept="image/*" onchange="saveProfilePicture()">
        <div class="profile-image-box" id="profileImageBox">
            <!-- Profile picture will be displayed here -->
        </div>
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
     const URL = pythonURI + "/api/section";








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







    // Create a new row and cell for each section
     userSections.forEach(section => {
         const tr = document.createElement('tr');
         const abbreviationCell = document.createElement('td');
         const nameCell = document.createElement('td');







    // Fill in the corresponding cells with data
         abbreviationCell.textContent = section.abbreviation;
         nameCell.textContent = section.name;






    // Add to the table row

         tr.appendChild(abbreviationCell);
         tr.appendChild(nameCell);







    // Add the row to table
         tableBody.appendChild(tr);
     });
 }








 // Function to save sections in the specified format
 async function saveSections() {
  
     const sectionAbbreviations = userSections.map(section => section.abbreviation);








     const sectionsData = {
         sections: sectionAbbreviations
     };








     const URL = pythonURI + "/api/user/section"; // Adjusted endpoint








     const options = {
         ...fetchOptions,
         method: 'POST',
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








 // Function to fetch data from the backend and populate the table
 async function fetchDataAndPopulateTable() {
     const URL = pythonURI + "/api/user/section"; // Endpoint to fetch sections data








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
     const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data








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
     if (file) {
         const reader = new FileReader();
         reader.onload = function() {
             const profileImageBox = document.getElementById('profileImageBox');
             profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
         };
         reader.readAsDataURL(file);
     }




     if (!file) return;

     try {
         const base64String = await convertToBase64(file);
         await sendProfilePicture(base64String);
         console.log('Profile picture uploaded successfully!');


    
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
     const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed
     const options = {
         ...fetchOptions,
         method: 'PUT',
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







   // Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
   const uidInput = document.getElementById('newUid');
   uidInput.value = newUid;
   uidInput.placeholder = `${newUid}`;
}


// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
   const nameInput = document.getElementById('newName');
   nameInput.value = newName;
   nameInput.placeholder = `${newName}`;
}


 // Function to change UID
 window.changeUid = async function(uid) {
     if (uid) {
         const URL = pythonURI + "/api/user"; // Adjusted endpoint

         const options = {
             ...fetchOptions,
             method: 'PUT',
             body: JSON.stringify({ uid })
         };

         try {
             const response = await fetch(URL, options);
             if (!response.ok) {
                 throw new Error(`Failed to update UID: ${response.status}`);
             }
             console.log('UID updated successfully!');
            window.updateUidField(uid);
         } catch (error) {
             console.error('Error updating UID:', error.message);
             // Handle error display or fallback mechanism
         }
     }
 }

 // Function to change Name
 window.changeName = async function(name) {
     if (name) {
         const URL = pythonURI + "/api/user"; // Adjusted endpoint

         const options = {
             ...fetchOptions,
             method: 'PUT',
             body: JSON.stringify({ name })
         };

         try {
             const response = await fetch(URL, options);
             if (!response.ok) {
                 throw new Error(`Failed to update Name: ${response.status}`);
             }
             console.log('Name updated successfully!');
             window.updateNameField(name);
         } catch (error) {
             console.error('Error updating Name:', error.message);
             // Handle error display or fallback mechanism
         }
     }
 }

 // Event listener to trigger updateUid function when UID field is changed
 document.getElementById('newUid').addEventListener('change', function() {
     const uid = this.value;
     window.changeUid(uid);


 });

 // Event listener to trigger updateName function when Name field is changed
 document.getElementById('newName').addEventListener('change', function() {
     const name = this.value;
     window.changeName(name);
     

 });



window.fetchKasmServerNeeded = async function() {
  const URL = pythonURI + "/api/id"; // Adjusted endpoint




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




  const URL = pythonURI + "/api/user"; // Adjusted endpoint




  const data = {
      kasm_server_needed: newKasmServerNeeded
  };




  const options = {
      ...fetchOptions,
      method: 'PUT',
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
     const URL = pythonURI + "/api/id"; // Adjusted endpoint




     try {
         const response = await fetch(URL, fetchOptions);
         if (!response.ok) {
             throw new Error(`Failed to fetch UID: ${response.status}`);
         }




         const data = await response.json();
         return data.uid;
     } catch (error) {
         console.error('Error fetching UID:', error.message);
         return null;
     }
 };




 // Function to fetch Name from backend
 window.fetchName = async function() {
     const URL = pythonURI + "/api/id"; // Adjusted endpoint




     try {
         const response = await fetch(URL, fetchOptions);
         if (!response.ok) {
             throw new Error(`Failed to fetch Name: ${response.status}`);
         }




         const data = await response.json();
         return data.name;
     } catch (error) {
         console.error('Error fetching Name:', error.message);
         return null;
     }
 };






 // Function to set placeholders for UID and Name
 window.setPlaceholders = async function() {
     const uidInput = document.getElementById('newUid');
     const nameInput = document.getElementById('newName');




     try {
         const uid = await window.fetchUid();
         const name = await window.fetchName();




         if (uid !== null) {
             uidInput.placeholder = uid;
         }
         if (name !== null) {
             nameInput.placeholder = name;
         }
     } catch (error) {
         console.error('Error setting placeholders:', error.message);
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
         await setPlaceholders();
     } catch (error) {
         console.error('Initialization error:', error.message);
         // Handle initialization error gracefully
     }
 });


 






</script>









