---
layout: post 
title: Github Analytics
permalink: /analytics
menu: nav/home.html
search_exclude: true
---
<style>
    .container {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 1200px;
        padding: 20px;
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
    .details {
        line-height: 1.5;
        margin-left: 20px; /* Add margin to push details to the right */
    }
    .commits {
        margin-top: 20px;
    }
    .clickable {
        cursor: pointer; /* Change cursor to pointer */
        background-color: #3c3e50; /* Light blue background */
        border: 1px solid #2c3e50; /* Border to match .profile color */
        padding: 5px;
        border-radius: 5px; /* Rounded corners */
        transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    }
    .clickable:hover {
        background-color: #5c3e50; /* Slightly darker blue on hover */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add a subtle shadow on hover */
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
        background-color: rgba(0,0,0,0.4); /* Semi-transparent black background */
        padding-top: 60px;
    }
    .modal-content {
        background-color: #3c4e60; /* Same background color as .profile */
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 10px; /* Rounded corners */
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5); /* Red shadow for alert effect */
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

<!-- Modal Structure -->
<div id="dataModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <pre id="modalData"></pre>
    </div>
</div>

<!-- Analytics Page -->
<div class="container">
    <div id="profile" class="profile">
        <div class="left-side">
            <img id="avatar" class="avatar" src="" alt="User Avatar">
            <p id="username"></p>
        </div>
        <div class="details">
            <p id="profile-url"></p>
            <p id="issues-count" class="clickable"></p>
            <p id="commits-count"></p>
            <p id="prs-count" class="clickable"></p>
            <p id="repos-url"></p> <!-- Added for public repos link -->
            <p id="public-repos"></p>
            <p id="public-gists"></p>
            <p id="followers"></p>
            <p id="following"></p>
        </div>
    </div>
</div>

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
            const commitsCount = commitsData.total_commit_contributions || 'N/A';
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
            document.getElementById('following').textContent = `Following: ${following}`;
            document.getElementById('commits-count').textContent = `Commits: ${commitsCount}`;
            document.getElementById('prs-count').textContent = `Pull Requests: ${prsCount}`;
            document.getElementById('issues-count').textContent = `Issues: ${issuesCount}`;

            // Add click event listeners to log data to console
            document.getElementById('prs-count').addEventListener('click', () => {
                showModal(prsArray);
            });

            document.getElementById('issues-count').addEventListener('click', () => {
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
        const closeBtn = document.getElementsByClassName('close')[0];

        modalData.innerHTML = jsonToHtml(data);
        modal.style.display = 'block';

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Call the fetchData function to initiate the requests
    fetchData();
</script>