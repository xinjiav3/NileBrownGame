---
layout: post
title: Kasm Cloud Workspaces
description: A place to share all documentation for the Kasm Cloud Workspaces Project
categories: [Documentation]
permalink: /kasm/pages/intro
author: Mr. Mortensen, Rachit Jaiswal, Tanisha Patil, Torin Wolff
menu: nav/kasm_cloud.html
---

<style>
    /* Container for the whole component */
    .installer-container {
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    /* Button to toggle the installer */
    .expand-button {
        padding: 15px 25px;
        background-color: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px 0 0 8px;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
    }

    .expand-button:hover {
        background-color: #0056b3;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        transform: translateX(-5px);
    }

    /* Add an arrow icon */
    .expand-button::before {
        content: '➔';
        margin-right: 10px; /* Space between arrow and text */
        font-size: 18px;
        transition: transform 0.3s ease;
        transform: rotate(180deg);
    }

    /* Rotate the arrow when expanded */
    .expanded .expand-button::before {
        transform: rotate(90deg);
    }

    /* Hidden buttons initially */
    .button-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        transform: translateX(100%); /* Initially hide off-screen */
        transition: transform 0.5s ease;
        opacity: 0; /* Initially hidden */
    }

    /* Buttons styling */
    .guide-button {
        padding: 15px 30px;
        font-size: 18px;
        color: black;
        background-color: #007BFF;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        transition: background-color 0.3s ease;
        width: 250px;
    }

    .guide-button:hover {
        background-color: #0056b3;
    }

    /* Class to reveal the buttons */
    .expanded .button-container {
        transform: translateX(0); /* Bring buttons into view */
        opacity: 1; /* Show buttons */
    }
</style>

<div class="installer-container">
    <button class="expand-button" onclick="toggleInstaller()">Installer Docs</button>
    
    <div class="button-container">
        <a href="https://github.com/nighthawkcoders/kasm-multi-server" class="guide-button">Installer</a>
        <a href="{{site.baseurl}}/kasm/installer/guide" class="guide-button">User Guide</a>
        <a href="{{site.baseurl}}/kasm/installer/developer_guide" class="guide-button">Developers Guide</a>
    </div>
</div>

<script>
    function toggleInstaller() {
        const container = document.querySelector('.installer-container');
        container.classList.toggle('expanded');
    }
</script>

## Multiserver Docs

<ul>
{% for post in site.posts %}
  {% if post.path contains "/Kasm/Config_Guides/" %}
    <li>
      <a href="{{ site.baseurl }}{{ post.permalink | default: post.url }}">{{ post.title }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>

## Relational Database Service (RDS)

<ul>
{% for post in site.posts %}
  {% if post.path contains "/Kasm/RDS/" %}
    <li>
      <a href="{{ site.baseurl }}{{ post.permalink | default: post.url }}">{{ post.title }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>

## Installer Guides (All Versions)

<ul>
{% for post in site.posts %}
  {% if post.path contains "/Kasm/Installer_Guides/" %}
    <li>
      <a href="{{ site.baseurl }}{{ post.permalink | default: post.url }}">{{ post.title }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>