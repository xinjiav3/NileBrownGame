---
layout: post
title: Kasm Cloud Workspaces
description: A central blogging hub for user and development documentation for the Kasm Cloud Workspaces Project
categories: [Kasm]
permalink: /kasm/pages/intro
author: Mr. Mortensen, Rachit Jaiswal, Tanisha Patil, Torin Wolff, Isabel Marilla
menu: nav/kasm_cloud.html
toc: false
---

> Our Cloud Workspaces project aims to provide all students with equitable access to powerful computing resources, regardless of the device they own or use, by utilizing cloud-based desktop environments.

<style>
    .system-diagram {
        display: block;
        max-width: 100%;
        margin: 20px auto;
        border-radius: 8px;
        transition: transform 0.3s ease;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .system-diagram:hover {
        transform: scale(1.05);
    }

    .diagram-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s, opacity 0.3s ease;
    }

    .diagram-overlay img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .diagram-overlay.visible {
        visibility: visible;
        opacity: 1;
    }
</style>

---

## KasmV2 Overview

To get insights into how the Nighthawk Coding Society (NCS) made KasmV2 continue reading this overview.

<img src="https://github.com/user-attachments/assets/fbaaf499-b7c9-48d8-9005-df2b96e3a456" alt="System Diagram" class="system-diagram" onclick="toggleDiagram()">

<div class="diagram-overlay" id="diagram-overlay" onclick="toggleDiagram()">
    <img src="https://github.com/user-attachments/assets/fbaaf499-b7c9-48d8-9005-df2b96e3a456" alt="Enlarged System Diagram">
</div>

<script>
    function toggleDiagram() {
        const overlay = document.getElementById('diagram-overlay');
        overlay.classList.toggle('visible');
    }
</script>

### 1. Frontend: Student Registration & Backend: Business Logic

#### Systems

- Frontend [ncs.github.io](https://nighthawkcoders.github.io/portfolio_2025/login)
- Backend [flask2025.ncs.com](https://flask2025.nighthawkcodingsociety.com/login?next=/users/table2)

#### Overview

- **Frontend/Web Form**: A GitHub Pages web application is used to gather required user information and send user data to the Python/Flask backend.
- **Backend/Database**: The data sent from the web application is stored in AWS RDS (Amazon Web Services Relational Database Service) using SQL connection services.
- **Business Logic**: The Python/Flask backend, upon successful save, sends user information via an API to enable access to KASM Workspaces.

#### Users in KASM Workspaces

<img src="{{site.baseurl}}/kasm_design/kasm_users.png" alt="Kasm User Illustration">

### 2. KASM MultiServer

KASM presents workspaces to the user. Upon request by the user to launch a workspace session, KASM supplies an AWS computing resource and streams a session of that workspace to the user's browser. In the Del Norte Computer Science classrooms, the customized workspace contains Visual Studio Code and support for coding languages such as Python, Java, and JavaScript.

#### KASM User UI

<img src="{{site.baseurl}}/kasm_design/kasm_desktop.png" alt="Kasm workspace in Browser">

#### Infrasture Management

To provide the KASM MultiServer features, KASM requires servers and agents. The Web Server, Database Server, and Connection Server manage KASM resources. These servers are the heart of KASM and need to be set up to enable MultiServer capabilities.

To configure these servers, Nighthawk developers have created tools and utilities to spin up these KASM servers.

- **Shell Programming**: Scripts that simplify and drive the setup process.
- **Terraform**: A tool that specializes in creating and sizing AWS servers.
- **Ansible**: A tool that specializes in the configuration management of servers. This is used to make the AWS servers into KASM workers.

<img src="{{site.baseurl}}/kasm_design/kasm_install.png" alt="Kasm install">

### 3. KASM User UI & Admin UI

**KASM User UI & Admin UI [kasm.ncs.com](https://kasm.nighthawkcodingsociety.com/):**  
Provides interfaces for users and admins. The Admin UI offers controls over the MultiServer, enabling management of users, sessions, and configurations, all interacting with the KASM MultiServer to send and receive user data.
