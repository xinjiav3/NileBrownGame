---
layout: post
title: Kasm Cloud Workspaces
description: A central hub for user and development documentation for the Kasm Cloud Workspaces Project
categories: [Kasm]
permalink: /kasm/pages/intro
author: Mr. Mortensen, Rachit Jaiswal, Tanisha Patil, Torin Wolff
menu: nav/kasm_cloud.html
toc: false
---

Our Cloud Workspaces project aims to provide all students with equitable access to powerful computing resources, regardless of the device they own, by utilizing cloud-based desktop environments.


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

**Frontend (portfolio_2025.ncs.com):**  
The user-facing interface where students register and interact with the application. It communicates with the backend to send and receive data from the RDS database via an API.

**Backend (flask2.ncs.com):**  
Handles the business logic, data management, and the Admin UI. The backend exposes an API used by the frontend for CRUD operations on the RDS Database.

### 2. KASM MultiServer & RDS Database

**KASM MultiServer:**  
Manages multiple scalable agents responsible for tasks such as user sessions and resource allocation. It interacts with the RDS Database via an API and utilizes Terraform and Ansible for infrastructure management and automation.

- **Terraform:** Manages infrastructure as code, including RDS Database resources.
- **Ansible:** Automates configuration management, application deployment, and task automation.

### 3. KASM User UI & Admin UI

**KASM User UI & Admin UI (kasm.ncs.com):**  
Provides interfaces for users and admins. The Admin UI offers controls over the MultiServer, enabling management of users, sessions, and configurations, all interacting with the KASM MultiServer to send and receive user data.

## Getting Started with Kasm Cloud Workspaces

To run Kasm Cloud Workspaces, you'll need a user account with login credentials. Sign up at [Nighthawk Pages Login](/portfolio_2025/login) and access the workspace at [kasm.nighthawkcodingsociety.com](https://kasm.nighthawkcodingsociety.com/#/login).

For development resources, visit our [GitHub](https://github.com/nighthawkcoders/kasm-multi-server) repository.

### Key Development Considerations

- **Container Building:** GitHub link (TBD)
- **Docker Management:** [DockerHub](https://hub.docker.com/r/nighthawkcoders/pusd-student-ubuntu/tags)
- **Workspace Publication:** [Registry](https://nighthawkcoders.github.io/kasm_registry/1.0/)

### Database Management

- **Frontend:** Features include login and profile management within portfolio_2025.
- **Backend:** Contains migration scripts in `scripts/db_migrate.py` and APIs supporting bulk migration.

