---
layout: post
title: Kasm Cloud Workspaces
description: A place to share user and development documentation for the Kasm Cloud Workspaces Project
categories: [Kasm]
permalink: /kasm/pages/intro
author: Mr. Mortensen, Rachit Jaiswal, Tanisha Patil, Torin Wolff
menu: nav/kasm_cloud.html
toc: true
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

Kasm supports a modern scalable and resilient design to provide a web-based remote desktop environment.  This means xChromebook or an system that provides a brows can perform same development functions as someone with a Window or Mac computer.

## Kasm Cloud Workpaces Requirements

To run Kasm Clooud Workpace you will need a User account with Login credentials.  

### Kasm Signup

You will need an account, signup on [Nighthawk Pages Login](/portfolio_2025/login)

### Kasm Access

To access cloud workspace login at [kasm.nighthawkcodingsociety.com](https://kasm.nighthawkcodingsociety.com/#/login)

### Kasm Resources

To develop on Kasm and following the resources with this Unit you need to be authorized by the Teacher.  If you are interested in the resources the are described below and on the tab of the Notebook.

## MultiServer Development

The development resources are consolidated on [GitHub](https://github.com/nighthawkcoders/kasm-multi-server)

### Registry

There are three key development consideration when developing workspaces for Kasm ...

- Container Building: Github TBD Link
- Docker Management: [DockerHub](https://hub.docker.com/r/nighthawkcoders/pusd-student-ubuntu/tags)
- Workspace Publication: [Registry](https://nighthawkcoders.github.io/kasm_registry/1.0/)

### Database

Database management is broken down into frontend and backend management.

- Frontend is in portfolio_2025, feature are login and profile.
- Backend is in flask_2025, the repo has migration scripts in scripts/db_migrate.py.  Additionally, there are API's to suppor bulk migration.  



<!---
I think meta data would be required to pull this off effectively

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

-->