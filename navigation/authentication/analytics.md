---
layout: base
title: Github Analytics
permalink: /analytics
search_exclude: true
---
<html>
    <style>
        .profile {
            display: flex;
            align-items: center;
            margin: 20px;
        }
        .avatar {
            border-radius: 50%;
            width: 100px;
            height: 100px;
            margin-right: 20px;
        }
        .details {
            line-height: 1.5;
        }
        .commits {
            margin-top: 20px;
        }
    </style>
    <h1>GitHub User Profile</h1>
    <div id="profile" class="profile">
        <img id="avatar" class="avatar" src="" alt="User Avatar">
        <div class="details">
            <p id="username"></p>
            <p id="profile-url"></p>
            <p id="repos-url"></p> <!-- Added for public repos link -->
            <p id="public-repos"></p>
            <p id="public-gists"></p>
            <p id="followers"></p>
            <p id="following"></p>
        </div>
    </div>
    <div class="commits">
        <h2>First Tri Commits</h2>
        <p id="commits-count"></p>
    </div>
    <script type="module">
        import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

        // URLs to fetch profile links, user data, and commits
        const profileLinksUrl = `${pythonURI}/api/analytics/github/user/profile_links`;
        const userProfileUrl = `${pythonURI}/api/analytics/github/user`;
        const commitsUrl = `${pythonURI}/api/analytics/github/user/commits`;

        async function fetchData() {
            try {
                // Fetch profile links
                const profileLinksResponse = await fetch(profileLinksUrl, fetchOptions);
                if (!profileLinksResponse.ok) {
                    throw new Error('Failed to fetch profile links: ' + profileLinksResponse.statusText);
                }
                const profileLinks = await profileLinksResponse.json();

                // Fetch user profile data
                const userProfileResponse = await fetch(userProfileUrl, fetchOptions);
                if (!userProfileResponse.ok) {
                    throw new Error('Failed to fetch user profile: ' + userProfileResponse.statusText);
                }
                const userProfile = await userProfileResponse.json();

                // Fetch commits data
                const commitsResponse = await fetch(commitsUrl, fetchOptions);
                if (!commitsResponse.ok) {
                    throw new Error('Failed to fetch commits: ' + commitsResponse.statusText);
                }
                const commitsData = await commitsResponse.json();
                const commitsCount = commitsData.total_commit_contributions || 'N/A';  // Extract commits count

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
                document.getElementById('commits-count').textContent = `First Tri Commits: ${commitsCount}`;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Call the fetchData function to initiate the requests
        fetchData();
    </script>
</html>
