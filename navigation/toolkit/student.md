---
layout: base 
title: Student Toolkit
description: 
permalink: /student
---

<div class="toolkit-buttons">
  <button class="toolkit-button" data-description="This page contains resources for students." data-authors="Author: John Doe">
    <img src="{{site.baseurl}}/images/testing_for_navbuttons/diddy1.avif" alt="Student Resources" />
  </button>
  <button class="toolkit-button" data-description="Gamify your learning experience with these tools." data-authors="Author: Jane Smith">
    <img src="{{site.baseurl}}/images/testing_for_navbuttons/diddy2.jpg" alt="Gamify Tools" />
  </button>
  <button class="toolkit-button" data-description="Explore collaboration resources." data-authors="Author: Alex Johnson">
    <img src="{{site.baseurl}}/images/testing_for_navbuttons/diddy3.jpg" alt="Collaboration Tools" />
  </button>
</div>

<style>
  .toolkit-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .toolkit-button {
    width: 30%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    position: relative;
    overflow: hidden;
    padding: 0;
  }

  .toolkit-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .toolkit-button:hover {
    background-color: rgba(255, 255, 255, 0.9);
    color: black;
  }

  .toolkit-button:hover::after {
    content: attr(data-description) "\000A" attr(data-authors);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    white-space: pre-line;
    width: max-content;
    text-align: center;
  }
</style>
