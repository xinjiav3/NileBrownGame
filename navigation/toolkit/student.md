---
layout: post
title: Student Toolkit
description:
permalink: /student
menu: nav/homejava.html
show_reading_time: false
---

<div class="container">
    <!-- bathroom -->
    <div class="bathroom-image">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/bathroom.png" alt="Bathroom" />
    </div>
    <div class="bathroom-details">
        <p>
            Toolset transforms bathroom passes and restroom management with smart digital passes, real-time occupancy
            tracking, and seamless feedback options. By enhancing hygiene, accessibility, and comfort, it creates a
            more efficient and user-friendly bathroom experience.
        </p>
    </div>
    <!-- streaming queue -->
    <div class="queue-image">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/group-chat.png" alt="ScreenQueue" />
    </div>
    <div class="queue-details">
        <p>
            Use this sleek presentation system that allows for easier accessibility to screens during live reviews.
            Queue system is integrated to aid line management.
        </p>
    </div>
    <!-- assignment submission -->
    <div class="submission-image">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/submissions.png" alt="Submissions" />
    </div>
    <div class="submission-details">
        <p>Submit assignments on this simple and easy-to-use user interface that is fed directly to Mr. Mortensen.</p>
    </div>
    <!-- seed tracker -->
    <div class="seed-image">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/seedtracker.png" alt="Seed Tracker" />
    </div>
    <div class="seed-details">
        <p>Do you want to request seed? This will allow you to do so.</p>
    </div>
    <!-- SAGAI (ai grader and question maker) tool -->
    <div class="sagai-image">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/sagai.png" alt="SAGAI" />
    </div>
    <div class="sagai-details">
        <p>
            Tired of opening ChatGPT all day everyday? Want an AI companion with you on the site that helps you study
            for CSA? Look no further! Here you can use AI to generate hacks for practice, grade your hack answers
            and get feedback, and ask questions to your follow classmates and teachers!
        </p>
    </div>
</div>

<div class="toolkit-buttons">
    <a href="{{site.baseurl}}/bathroom" class="toolkit-button"
        data-description="Toolset transforms bathroom passes and restroom management with smart digital passes, real-time occupancy tracking, and seamless feedback options. By enhancing hygiene, accessibility, and comfort, it creates a more efficient and user-friendly bathroom experience.">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/bathroom.png" alt="Bathroom" />
        <span class="button-name">Bathroom</span>
        <div class="description">
            <p>Toolset transforms bathroom passes and restroom management with smart digital passes, real-time occupancy
                tracking, and seamless feedback options. By enhancing hygiene, accessibility, and comfort, it creates a
                more efficient and user-friendly bathroom experience.</p>
        </div>
    </a>
    <a href="{{site.baseurl}}/student-toolkit/queue" class="toolkit-button"
        data-description="Gamify your learning experience with these tools that make studying more interactive and fun. Discover educational games, quizzes, and activities to boost your knowledge while enjoying the process."
        data-authors="Author: Jane Smith">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/group-chat.png" alt="ScreenQueue" />
        <span class="button-name">ScreenQueue</span>
        <div class="description">
            <p>Use this sleek presentation system that allows for easier accessibility to screens during live reviews.
                Queue system is integrated to aid line management.</p>
        </div>
    </a>
    <a href="{{site.baseurl}}/student/submissions" class="toolkit-button"
        data-description="Explore collaboration resources that facilitate group work and team projects. Access platforms and tools designed to enhance communication, project management, and collective problem-solving."
        data-authors="Author: Alex Johnson">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/submissions.png" alt="Submissions" />
        <span class="button-name">Assignment Submissions</span>
        <div class="description">
            <p>Submit assignments on this simple and easy-to-use user interface that is fed directly to Mr. Mortensen.
            </p>
        </div>
    </a>

    <a href="{{site.baseurl}}/student/seedtracker" class="toolkit-button"
        data-description="Do you want to request seed? This will allow you to do so."
        data-authors="Author: Alex Johnson">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/seedtracker.png" alt="Seed Tracker" />
        <span class="button-name">Seed Tracker</span>
        <div class="description">
            <p>Do you want to request seed? This will allow you to do so.</p>
        </div>
    </a>

    <a href="{{site.baseurl}}/teacher/sagai" class="toolkit-button"
        data-description="Tired of opening ChatGPT all day everyday? Want an AI companion with you on the site that helps you study for CSA? Look no further! Here you can use AI to generate hacks for practice, grade your hack answers and get feedback, and ask questions to your follow classmates and teachers!">
        <img src="{{site.baseurl}}/images/toolkit-nav-buttons/sagai.png" alt="SAGAI" />
        <span class="button-name">SAGAI</span>
        <div class="description">
            <p>Tired of opening ChatGPT all day everyday? Want an AI companion with you on the site that helps you study
                for CSA? Look no further! Here you can use AI to generate hacks for practice, grade your hack answers
                and get feedback, and ask questions to your follow classmates and teachers!</p>
        </div>
    </a>
</div>

<style>
    .container {  
        display: grid;
        grid-template-columns: 150px 1fr;
        grid-template-rows: auto auto auto auto auto;
        gap: 15px 5px;
        grid-auto-flow: row;
        grid-template-areas:
            "bathroom-image bathroom-details"
            "queue-image queue-details"
            "submission-image submission-details"
            "seed-image seed-details"
            "sagai-image sagai-details";
    }

    .bathroom-image { grid-area: bathroom-image; border-radius: 10px; }

    .bathroom-details { grid-area: bathroom-details; border-radius: 10px; }

    .queue-image { grid-area: queue-image; border-radius: 10px; }

    .queue-details { grid-area: queue-details; border-radius: 10px; }

    .submission-image { grid-area: submission-image; border-radius: 10px; }

    .submission-details { grid-area: submission-details; border-radius: 10px; }

    .seed-image { grid-area: seed-image; border-radius: 10px; }

    .seed-details { grid-area: seed-details; border-radius: 10px; }

    .sagai-image { grid-area: sagai-image; border-radius: 10px; }

    .sagai-details { grid-area: sagai-details; border-radius: 10px; }

    .glow-on-hover-search {
        //this makes it actually glow
        border: none;
        outline: none;
        color: #fff;
        background: #1e1e1e;
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: 10px;
    }

    .glow-on-hover-search:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    .glow-on-hover-search:hover:before {
        opacity: 1;
    }

    .glow-on-hover-search:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #1e1e1e;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    @keyframes glowing {
        0% {
            background-position: 0 0;
        }

        50% {
            background-position: 400% 0;
        }

        100% {
            background-position: 0 0;
        }
    }
</style>
