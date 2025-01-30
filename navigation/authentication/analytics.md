---
layout: post
title: Your Analytics
permalink: /analytics
search_exclude: true
---

<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>


<style>
    body {
        font-family: Arial;
    }

    /* Style the tab */
    .tab {
        overflow: hidden;
        border: 1px solid #cccccc;
        background-color: transparent;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }

    /* Style the buttons inside the tab */
    .tab button {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        font-size: 17px;
    }

    /* Change background color of buttons on hover */
    .tab button:hover {
        background-color: #5d5d5d !important;
    }

    /* Create an active/current tablink class */
    .tab button.active {
        background-color: #373737 !important;
    }

    /* Style the tab content */
    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top: none;
    }

    .container {
        display: flex;
        justify-content: left;
        width: 100%;
        max-width: 1200px;
        /* padding: 20px; */
        padding-bottom: 20px;
        padding-top: 20px;
        box-sizing: border-box;
    }

    .profile {
        display: flex;
        align-items: flex-start;
        max-width: 800px;
        width: 100%;
        background-color: #2c3e50;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .left-side {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: 20px;
    }

    .avatar {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
        /* Semi-transparent black background */
        padding-top: 60px;
    }

    .modal-content {
        background-color: #3c4e60;
        /* Same background color as .profile */
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #888888;
        width: 80%;
        border-radius: 10px;
        /* Rounded corners */
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        /* Red shadow for alert effect */
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>

<div class="tab">
    <button class="tablinks" onclick="openTab(event, 'Github')">Github</button>
    <button class="tablinks" onclick="openTab(event, 'Bathroom')">Bathroom</button>
    <button class="tablinks" onclick="openTab(event, 'Grades')">Grades</button>
</div>

<div id="Github" class="tabcontent">
    <h3 style="padding-left: 32px;" class="animate__animated animate__fadeIn">Github</h3>
    <!-- Modal Structure -->
    <div id="dataModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <pre id="modalData"></pre>
        </div>
    </div>
    <!-- Analytics Page -->
    <!-- Analytics Page -->
    <div class="container animate__animated animate__fadeIn">
        <div id="profile" class="profile">
            <div class="left-side">
                <img id="avatar" class="avatar" src="" alt="User Avatar">
                <p id="username"></p>
            </div>
            <div class="details">
                <p id="profile-url"></p>
                <p id="issues-count"></p>
                <p id="prs-count"></p>
                <p id="commits-count"></p>
                <p id="repos-url"></p>
                <p id="public-repos"></p>
                <p id="public-gists"></p>
                <p id="followers"></p>
                <p id="following"></p>
            </div>
        </div>
    </div>
</div>

<!-- Bathroom Tab -->
<div id="Bathroom" class="tabcontent">
    <h3 style="padding-left: 32px;" class="animate__animated animate__fadeIn">Bathroom</h3>
    <div class="container">
        <div class="components">
            <table>
                <thead>
                    <tr>
                        <th>Statistic</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Average Duration (minutes)</td>
                        <td id="avg-duration">placeholder</td>
                    </tr>
                    <tr>
                        <td>Number of Times Gone</td>
                        <td id="num-times">placeholder</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Grades Tab -->
<div id="Grades" class="tabcontent">
    <h3 style="padding-left: 32px;" class="animate__animated animate__fadeIn">Grades</h3>
    <div class="container">
        <div class="components">
            <table>
                <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody id="gradesTableBody">
                    <tr>
                        <td>Placeholder</td>
                        <td>Placeholder</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
</script>

<script type="module">
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    // URLs to fetch profile links, user data, and commits
    const profileLinksUrl = `${pythonURI}/api/analytics/github/user/profile_links`;
    const userProfileUrl = `${pythonURI}/api/analytics/github/user`;
    const commitsUrl = `${pythonURI}/api/analytics/github/user/commits`;
    const prsUrl = `${pythonURI}/api/analytics/github/user/prs`;
    const issuesUrl = `${pythonURI}/api/analytics/github/user/issues`;

    async function fetchData() {
        try {
            // Define the fetch requests
            const profileLinksRequest = fetch(profileLinksUrl, fetchOptions);
            const userProfileRequest = fetch(userProfileUrl, fetchOptions);
            const commitsRequest = fetch(commitsUrl, fetchOptions);
            const prsRequest = fetch(prsUrl, fetchOptions);
            const issuesRequest = fetch(issuesUrl, fetchOptions);

            // Run all fetch requests concurrently
            const [profileLinksResponse, userProfileResponse, commitsResponse, prsResponse, issuesResponse] = await Promise.all([
                profileLinksRequest,
                userProfileRequest,
                commitsRequest,
                prsRequest,
                issuesRequest
            ]);

            // Check for errors in the responses
            if (!profileLinksResponse.ok) {
                throw new Error('Failed to fetch profile links: ' + profileLinksResponse.statusText);
            }
            if (!userProfileResponse.ok) {
                throw new Error('Failed to fetch user profile: ' + userProfileResponse.statusText);
            }
            if (!commitsResponse.ok) {
                throw new Error('Failed to fetch commits: ' + commitsResponse.statusText);
            }
            if (!prsResponse.ok) {
                throw new Error('Failed to fetch pull requests: ' + prsResponse.statusText);
            }
            if (!issuesResponse.ok) {
                throw new Error('Failed to fetch issues: ' + issuesResponse.statusText);
            }

            // Parse the JSON data
            const profileLinks = await profileLinksResponse.json();
            const userProfile = await userProfileResponse.json();
            const commitsData = await commitsResponse.json();
            const prsData = await prsResponse.json();
            const issuesData = await issuesResponse.json();

            // Extract commits count
            const commitsArray = commitsData.details_of_commits || [];
            const commitsCount = commitsData.total_commit_contributions || 0;
            const prsArray = prsData.pull_requests || [];
            const prsCount = prsArray.length || 0;
            const issuesArray = issuesData.issues || [];
            const issuesCount = issuesArray.length || 0;

            // Extract relevant information from the user profile data
            const username = userProfile.login || 'N/A';
            const profileUrl = profileLinks.profile_url || 'N/A';
            const avatarUrl = userProfile.avatar_url || '';
            const publicReposUrl = profileLinks.repos_url || 'N/A';  // Added for repos URL
            const publicRepos = userProfile.public_repos || 'N/A';
            const publicGists = userProfile.public_gists || 'N/A';
            const followers = userProfile.followers || 'N/A';
            const following = userProfile.following || 'N/A';

            // Update the HTML elements with the data
            document.getElementById('avatar').src = avatarUrl;
            document.getElementById('username').textContent = `Username: ${username}`;
            document.getElementById('profile-url').innerHTML = `Profile URL: <a href="${profileUrl}" target="_blank">${profileUrl}</a>`;  // Added link to profile URL
            document.getElementById('public-repos').textContent = `Public Repos: ${publicRepos}`;
            document.getElementById('public-gists').textContent = `Public Gists: ${publicGists}`;
            document.getElementById('followers').textContent = `Followers: ${followers}`;

            document.getElementById('commits-count').innerHTML = '<a href="#" class="info-link"><i class="fas fa-info-circle info-icon"></i></a>' + `Commits: ${commitsCount}`;
            document.querySelector('#commits-count .info-link').addEventListener('click', (event) => {
                event.preventDefault();
                showModal(commitsArray);
            });

            document.getElementById('prs-count').innerHTML = '<a href="#" class="info-link"><i class="fas fa-info-circle info-icon"></i></a>' + `Pull Requests: ${prsCount}`;
            document.querySelector('#prs-count .info-link').addEventListener('click', (event) => {
                event.preventDefault();
                showModal(prsArray);
            });

            document.getElementById('issues-count').innerHTML = '<a href="#" class="info-link"><i class="fas fa-info-circle info-icon"></i></a>' + `Issues: ${issuesCount}`;
            document.querySelector('#issues-count .info-link').addEventListener('click', (event) => {
                event.preventDefault();
                showModal(issuesArray);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to convert JSON data to a string with clickable links via Regular Expression (RegEx)
    function jsonToHtml(json) {
        const jsonString = JSON.stringify(json, null, 2);
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return jsonString.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
    }

    // Function to show modal with data
    function showModal(data) {
        const modal = document.getElementById('dataModal');
        const modalData = document.getElementById('modalData');
        const closeBtn = document.getElementsByClassName['close'](0);

        modalData.innerHTML = jsonToHtml(data);
        modal.style.display = 'block';

        closeBtn.onclick = function () {
            modal.style.display = 'none';
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Call the fetchData function to initiate the requests
    fetchData();
</script>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

<script type="module">
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    function calculateAverageDuration(timeIn) {
        const visits = timeIn.split(',');

        let totalDuration = 0;
        visits.forEach(visit => {
            const [checkIn, checkOut] = visit.split('-');

            // Ensure HH format by padding single-digit hours
            const formatTime = time => {
                const parts = time.split(':');
                if (parts[0].length === 1) parts[0] = '0' + parts[0]; // Pad single-digit hour
                return parts.join(':');
            };

            const checkInTime = new Date('1970-01-01T' + formatTime(checkIn)).getTime();
            const checkOutTime = new Date('1970-01-01T' + formatTime(checkOut)).getTime();

            const duration = (checkOutTime - checkInTime) / 1000 / 60; // Convert to minutes
            totalDuration += duration;
        });

        return totalDuration / visits.length; // Return the average duration in minutes
    }


    function getTinkle(personName) {
        const tinkleURL = javaURI + `/api/tinkle/${personName}`;
        console.log(tinkleURL);
        
        fetch(tinkleURL, { ...fetchOptions, credentials: 'include' })
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json(); // Parse the response to JSON
            })
            .then(data => {
                if (data === null) return null;

                // Extract timeIn data
                const timeIn = data.timeIn; // Assuming the timeIn field is like "11:12:05-11:13:06,12:15:10-12:19:12"
                console.log("Time in data:", timeIn);

                // Calculate number of times gone (by counting the commas, add 1)
                const numVisits = timeIn.split(',').length;
                document.getElementById('num-times').textContent = numVisits;

                // Calculate average duration
                const avgDuration = calculateAverageDuration(timeIn);
                document.getElementById('avg-duration').textContent = avgDuration.toFixed(2);
            })
            .catch(err => {
                console.error("Fetch error: ", err);
            });
    }

    function getPerson() {
        const personButton = document.getElementById("fetch_person");
        const URL = javaURI + '/api/person/get';
        
        fetch(URL, { ...fetchOptions, credentials: 'include' })
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json(); // Get the person data
            })
            .then(data => {
                if (data === null) return null;
                console.log("Person data:", data);
                window.id = data.id;
                getTinkle(encodeURIComponent(data.name)); // Fetch tinkle data for the person
            })
            .catch(err => {
                console.error("Fetch error: ", err);
            });
    }

    window.onload = async function () {
        getPerson(); // Fetch person data when the page loads
    }
</script>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    function loadGrades() {
        const gradesURL = `${javaURI}/api/synergy/grades/map/${window.id}`;
        
        fetch(gradesURL, { ...fetchOptions, credentials: 'include' })
            .then(response => response.json())
            .then(grades => {
                const tableBody = document.getElementById('gradesTableBody');
                tableBody.innerHTML = ''; // Clear existing content
                
                for (const [assignment, grade] of Object.entries(grades)) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>Assignment #${assignment}</td>
                        <td>${grade.toFixed(2)}</td>
                    `;
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error('Error loading grades:', error));
    }

    // Load grades when the tab is clicked
    document.querySelector('button[onclick="openTab(event, \'Grades\')"]')
        .addEventListener('click', loadGrades);
</script>
