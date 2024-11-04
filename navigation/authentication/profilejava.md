---
layout: post
title: Profile Settings
permalink: /profilejava
menu: nav/home.html
search_exclude: true
show_reading_time: false
---
<div class="profile-container">
 <div class="card">
   <form>
     <div>
       <label for="newUid">Enter New UID:</label>
       <input type="text" id="newUid" placeholder="New UID">
     </div>
     <div>
       <label for="newName">Enter New Name:</label>
       <input type="text" id="newName" placeholder="New Name">
     </div>
      <div>
       <label for="newPassword">Enter New Password:</label>
       <input type="text" id="newPassword" placeholder="New Password">
     </div>
     <br>
     <div>
       <label for="kasmServerNeeded">Kasm Server Needed:
       <input type="checkbox" id="kasmServerNeeded" onclick="toggleKasmServerNeeded()">
       </label>
     </div>
     <br>
     <div>
       <label for="sectionDropdown">Select and Add Section:</label>
       <div class="icon-container">
         <select id="sectionDropdown">
           <!-- Options will be dynamically populated -->
         </select>
         <i class="fas fa-plus" onclick="addSection()"></i>
       </div>
     </div>
     <table>
       <thead>
         <tr>
           <th>Abbreviation</th>
           <th>Name</th>
           <th>Year</th>
         </tr>
       </thead>
       <tbody id="profileResult">
         <!-- Table rows will be dynamically populated -->
       </tbody>
     </table>
     <label for="profilePicture" class="file-icon"> Upload Profile Picture <i class="fas fa-upload"></i> <!-- Replace this with your desired icon -->
     </label>
     <input type="file" id="profilePicture" accept="image/*" onchange="saveProfilePicture()">
     <div class="image-container" id="profileImageBox">
         <!-- Profile picture will be displayed here -->
     </div>
     <p id="profile-message" style="color: red;"></p>
   </form>
 </div>
</div>
<script type="module">
// Import fetchOptions from config.js
import {javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
// Import functions from config.js
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";
// Function to fetch user profile data
async function fetchUserProfile() {
    const URL = javaURI + "/api/person/get"; // Endpoint to fetch user profile data
    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
        const profileData = await response.json();
        // Extract only the pfp field
        const profilePicture = profileData.pfp; // Assuming 'pfp' is the key for the profile picture
        // Display the profile picture
        displayUserProfile(profilePicture);
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
   const URL = javaURI + "/api/person/update"; // Adjust endpoint as needed
   // Create options object for PUT request
   const options = {
       URL,
       body: { pfp: base64String },
       message: 'profile-message', // Adjust the message area as needed
       callback: () => {
           console.log('Profile picture uploaded successfully!');
           // Handle success response as needed
       }
   };
   try {
       await putUpdate(options);
   } catch (error) {
       console.error('Error uploading profile picture:', error.message);
       document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
   }
}
  // Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}
// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}
// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = javaURI + "/api/person/update"; // Adjusted endpoint
       const options = {
           URL,
           body: { uid },
           message: 'uid-message', // Adjust the message area as needed
           callback: () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               window.location.href = '/portfolio_2025/login'
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('uid-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}
window.changePassword = async function(password) {
   if (password) {
       const URL = javaURI + "/api/person/update"; // Adjusted endpoint
       const options = {
           URL,
           body: { password },
           message: 'password-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               window.location.href = '/portfolio_2025/login'
           }
       };
     try {
            alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('password-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}
// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = javaURI + "/api/person/update";
       const options = {
           URL,
           body: { name },
           message: 'name-message',
           callback: () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('name-message').textContent = 'Error updating Name: ' + error.message;
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
document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    window.changePassword(password);
});
window.fetchKasmServerNeeded = async function() {
 const URL = javaURI + "/api/person/get"; // Adjusted endpoint
 try {
     const response = await fetch(URL, fetchOptions);
     if (!response.ok) {
         throw new Error(`Failed to fetch kasm_server_needed: ${response.status}`);
     }
     const userData = await response.json();
     const kasmServerNeeded = userData.kasmServerNeeded
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
   const URL = javaURI + "/api/person/update"; // Adjusted endpoint
   const options = {
       URL,
       body: { kasmServerNeeded: newKasmServerNeeded },
       message: 'kasm-server-message', // Adjust the message area as needed
       callback: () => {
           console.log('Kasm Server Needed updated successfully!');
       }
   };
   try {
       alert(options);
       await putUpdate(options);
   } catch (error) {
       console.error('Error updating kasm_server_needed:', error.message);
       document.getElementById('kasm-server-message').textContent = 'Error updating kasm_server_needed: ' + error.message;
   }
}
   window.fetchUid = async function() {
    const URL = javaURI + "/api/person/get"; // Adjusted endpoint
    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch UID: ${response.status}`);
        }
        const data = await response.json();
        return data.email;
    } catch (error) {
        console.error('Error fetching UID:', error.message);
        return null;
    }
};
// Function to fetch Name from backend
window.fetchName = async function() {
    const URL = javaURI + "/api/person/get"; // Adjusted endpoint
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
        await fetchUserProfile(); // Fetch user profile data
        await fetchKasmServerNeeded();
        await setPlaceholders();
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});
