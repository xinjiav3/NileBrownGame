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
</style>

<div class="container">
    <div id="profile" class="profile">
        <div class="left-side">
            <img id="avatar" class="avatar" src="" alt="User Avatar">
            <p id="username"></p>
        </div>
        <div class="details">
            <p id="profile-url"></p>
            <p id="issues-count"></p>
            <p id="commits-count"></p>
            <p id="prs-count"></p>
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call the fetchData function to initiate the requests
    fetchData();
</script>
