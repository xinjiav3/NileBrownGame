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
        align-items: center;
        margin: 20px;
    }
    .profile {
        display: flex;
        align-items: flex-start;
        max-width: 800px;
        width: 100%;
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
            <p id="commits-count"></p>
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

    async function fetchData() {
        try {
            // Define the fetch requests
            const profileLinksRequest = fetch(profileLinksUrl, fetchOptions);
            const userProfileRequest = fetch(userProfileUrl, fetchOptions);
            const commitsRequest = fetch(commitsUrl, fetchOptions);

            // Run all fetch requests concurrently
            const [profileLinksResponse, userProfileResponse, commitsResponse] = await Promise.all([
                profileLinksRequest,
                userProfileRequest,
                commitsRequest
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

            // Parse the JSON data
            const profileLinks = await profileLinksResponse.json();
            const userProfile = await userProfileResponse.json();
            const commitsData = await commitsResponse.json();

            // Extract commits count
            const commitsCount = commitsData.total_commit_contributions || 'N/A';

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
            document.getElementById('commits-count').textContent = `Tri Commits: ${commitsCount}`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Call the fetchData function to initiate the requests
    fetchData();
</script>