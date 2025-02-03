---
toc: false
title: Submission Page
permalink: /student/submissions
search_exclude: true
layout: post
---

<title>Submission Form</title>
<style>
    /* ---------- Global Styles ---------- */
    #timer-container {
        text-align: center;
        font-size: 24px;
        font-family: Arial, sans-serif;
        margin-top: 20px;
    }
    #time-left {
        font-weight: bold;
        transition: color 0.3s ease;
    }
    select, input[type="url"], textarea, button, input[type="text"], input[type="range"] {
        width: 100%;
        padding: 15px; 
        font-size: 18px; 
        margin: 12px 0; 
        border: 1px solid #ddd;
        border-radius: 6px; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    textarea {
        resize: vertical;
        min-height: 150px; 
    }
    button {
        background-color: #4CAF50;
        color: white;
        font-size: 18px; 
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #45A049;
    }
    .modal-content h2 {
        font-size: 28px; 
        color: white;
        margin-bottom: 20px;
    }
    .output-box {
        margin-top: 15px;
        font-size: 30px;
        color: #ffffff;
        animation: moving-glow2 2s infinite;
    }
    .Assignment-Name {
        font-size: 20px; 
        color: white;
    }
    .Assignment-Content {
        font-size: 16px; 
        color: white;
    }
    @keyframes moving-glow {
        0% {
            box-shadow: 0 0 10px rgba(81, 0, 255, 0.8);
        }
        50% {
            box-shadow: 0 0 30px rgba(81, 0, 255, 0.8);
        }
        100% {
            box-shadow: 0 0 10px rgba(81, 0, 255, 0.8);
        }
    }
    @keyframes moving-glow2 {
        0% {
            box-shadow: 0 0 10px rgba(0, 255, 162, 0.8);
        }
        50% {
            box-shadow: 0 0 30px rgba(0, 255, 162, 0.8);
        }
        100% {
            box-shadow: 0 0 10px rgba(0, 255, 162, 0.8);
        }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s infinite;
    }
    /* ---------- End Styles ---------- */
</style>

<div id="modal" class="modal">
    <div class="modal-content">
        <h2>Submit here --</h2>
        <!-- Dropdown with the "Seed" option included -->
        <select id="assignment-select">
            <option value="" disabled selected>Select a Assignment</option>
            <option value="Seed">Seed</option>
        </select>
    </div>
    <div class="Assignment-Content" id="Assignment-Content">Assignment-Content</div>
    <div id="timer-container">
        <p id="time-left"></p>
    </div>
    <br><br>
    <!-- Wrap submission content and comments in a section so we can inject Seed Tracker after it -->
    <div id="submission-section">
        <div>
            <label for="submissionContent" style="font-size: 18px;">Submission Content:</label>
            <input type="url" id="submissionContent" required />
        </div>
        <br><br>
        <div id="comment-section">
            <label for="comments" style="font-size: 18px;">Comments:</label>
            <textarea id="comments" rows="4" style="width: 100%;"></textarea>
        </div>
    </div>
    <br><br>
    <button id="submit-assignment">Submit Assignment</button>
    <br><br>
    <div class="output-box" id="outputBox"></div>
    <br><br>
    <h1>Previous Submissions for: </h1>
    <div class="Assignment-Name" id="Assignment-name">Assignment-Content</div>
    <br><br>
    <table id="submissions-table" style="width: 100%; margin-top: 20px;">
        <thead>
            <tr>
                <th>Submission Content</th>
                <th>Grade</th>
                <th>Feedback</th>
            </tr>
        </thead>
        <tbody>
            <!-- Submissions will be populated here -->
        </tbody>
    </table>
</div>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    let selectedTask = "";
    let assignmentIds = [];
    let assignIndex = 0;
    let assignments;
    let userId = -1;

    // ----------------- Submission Button Logic -----------------
    document.getElementById("submit-assignment").addEventListener("click", Submit);
    function Submit() {
        let urllink_submit = javaURI + "/api/submissions/submit/";
        const submissionContent = document.getElementById('submissionContent').value;
        const comment = document.getElementById('comments').value;
        getUserId();
        if(userId === -1) {
            alert("Please login first");
            return;
        }
        const student_id = userId;
        const assigmentId = assignments[assignIndex - 1].id;
        urllink_submit += assigmentId.toString();
        const data = new FormData();
        data.append("studentId", student_id);
        data.append("content", submissionContent);
        data.append("comment", comment);

        fetch(urllink_submit, {
            method: 'POST',
            credentials: 'include',
            body: data,
        })
        .then(response => {
            const outputBox = document.getElementById('outputBox');
            if(response.ok) {
                outputBox.innerText = 'Successful Submission!';
                fetchSubmissions();
                return response.json();
            } else {
                outputBox.innerText = 'Failed Submission!';
                throw new Error('Failed to submit data: ' + response.statusText);
            }
        })
        .then(result => {
            console.log('Submission successful:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    // ----------------- End Submission Logic -----------------

    // ----------------- Fetching Assignments & Submissions -----------------
    async function fetchAssignments() {
        try {
            const response = await fetch(javaURI + "/api/assignments/debug", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            assignments = await response.json();
            populateAssignmentDropdown(assignments);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function populateAssignmentDropdown(Assignments) {
        const assignmentSelect = document.getElementById('assignment-select');
        // Loop through assignments and add options (besides the Seed option)
        Assignments.forEach(assignment => {
            const option = document.createElement('option');
            option.value = assignment.name;
            option.textContent = assignment.name;
            assignmentSelect.appendChild(option);
            assignmentIds.push(assignment.id);
        });
    }

    async function fetchSubmissions() {
        const urllink = javaURI + "/api/submissions/getSubmissions";
        await getUserId();
        try {
            const response = await fetch(`${urllink}/${userId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const submissions = await response.json();
            populateSubmissionsTable(submissions);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    }

    function populateSubmissionsTable(submissions) {
        const tableBody = document.getElementById('submissions-table').querySelector('tbody');
        tableBody.innerHTML = "";
        submissions.forEach(submission => {
            if(submission.assignmentid == assignIndex) {
                const row = document.createElement('tr');
                const contentCell = document.createElement('td');
                contentCell.textContent = submission.content || 'N/A';
                row.appendChild(contentCell);
                const gradeCell = document.createElement('td');
                gradeCell.textContent = submission.grade || 'Ungraded';
                row.appendChild(gradeCell);
                const feedbackCell = document.createElement('td');
                feedbackCell.textContent = submission.feedback || 'No feedback yet';
                row.appendChild(feedbackCell);
                tableBody.appendChild(row);
            }
        });
    }

    async function getUserId() {
        const url_persons = `${javaURI}/api/person/get`;
        await fetch(url_persons, fetchOptions)
            .then(response => {
                if(!response.ok) { throw new Error(`Spring server response: ${response.status}`); }
                return response.json();
            })
            .then(data => { userId = data.id; })
            .catch(error => { console.error("Java Database Error:", error); });
    }
    // ----------------- End Fetching -----------------

    // ----------------- Assignment Select Event Listener -----------------
    document.getElementById("assignment-select").addEventListener("change", function() {
        selectedTask = this.value;
        assignIndex = this.selectedIndex;
        // If "Seed" is selected (exact match) then trigger the Seed Tracker pop-up
        if(selectedTask === "Seed") {
            // Hide the comment section
            document.getElementById("comment-section").style.display = "none";
            // Insert the Seed Tracker form immediately below the submission section (if not already there)
            if(!document.getElementById("seed-tracker-container")) {
                const seedTrackerHtml = `
                    <div id="seed-tracker-container" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
                        <h3>Seed Tracker</h3>
                        <div class="form-group">
                            <label for="studentName">Student Name</label>
                            <input type="text" id="studentName" placeholder="Enter your name" required>
                        </div>
                        <div class="form-group">
                            <label for="gradeRequest">Requested Grade (Seed)</label>
                            <input type="range" id="gradeRequest" min="0" max="1" step="0.1" value="0.5" oninput="document.getElementById('rangeValue').innerText=this.value">
                            <div class="range-value" id="rangeValue">0.5</div>
                        </div>
                        <div class="form-group">
                            <button onclick="submitEntry()">Submit Entry</button>
                        </div>
                        <div class="range-value" id="message"></div>
                    </div>
                `;
                document.getElementById("submission-section").insertAdjacentHTML('afterend', seedTrackerHtml);
            }
        } else {
            // If any other assignment is selected, show the comment section and remove the Seed Tracker if it exists
            document.getElementById("comment-section").style.display = "block";
            const seedTrackerContainer = document.getElementById("seed-tracker-container");
            if(seedTrackerContainer) {
                seedTrackerContainer.remove();
            }
        }
        // Update Assignment Content if available
        if(assignments && assignments[assignIndex-1]) {
            document.getElementById("Assignment-Content").innerText = assignments[assignIndex-1].description;
        }
        fetchSubmissions();
    });
    // ----------------- End Event Listener -----------------

    // ----------------- Seed Tracker Submit Entry Function -----------------
    // This function handles seed tracker submissions (dummy alert for now)
    window.submitEntry = function() {
        const studentName = document.getElementById("studentName").value;
        const gradeRequest = document.getElementById("gradeRequest").value;
        alert("Seed tracker submitted:\nStudent: " + studentName + "\nRequested Grade: " + gradeRequest);
        // Additional logic for seed tracker submission goes here
    }
    // ----------------- End Seed Tracker Function -----------------

    // ----------------- Initial Load -----------------
    getUserId();
    fetchSubmissions();
    fetchAssignments();
    // ----------------- End Load -----------------
</script>
