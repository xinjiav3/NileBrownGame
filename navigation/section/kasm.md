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

<img src="{{site.baseurl}}/kasm_design/kasm_diagram.png" alt="System Diagram" class="system-diagram" onclick="toggleDiagram()">

<div class="diagram-overlay" id="diagram-overlay" onclick="toggleDiagram()">
    <img src="{{site.baseurl}}/kasm_design/kasm_diagram.png" alt="Enlarged System Diagram">
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

#### Infrastructure Management

To provide the KASM MultiServer features, KASM requires servers and agents. The Web Server, Database Server, and Connection Server manage KASM resources. These servers are the heart of KASM and need to be set up to enable MultiServer capabilities.

To configure these servers, Nighthawk developers have created tools and utilities to spin up these KASM servers.

- **Shell Programming**: Scripts that simplify and drive the setup process.
- **Terraform**: A tool that specializes in creating and sizing AWS servers.
- **Ansible**: A tool that specializes in the configuration management of servers. This is used to make the AWS servers into KASM workers.

<img src="{{site.baseurl}}/kasm_design/kasm_install.png" alt="Kasm install">

### 3. KASM Admin UI

Workspaces and the extensive Workspace Registry are key components of the KASM system. Activating a workspace is where the user's work begins.

Workspaces are developed according to the classroom's needs and then presented to users within the system. The UI allows for limiting usage according to groups.

Essentially, this is like installing all the necessary tools on a single user's laptop and then propagating that configuration and settings to every other user in the room.

#### Workspaces Links

- KASM Admin UI [kasm.ncs.com](https://kasm.nighthawkcodingsociety.com/):
- Del Norte Registry [ncs.com/registry](https://nighthawkcoders.github.io/kasm_registry/1.0/)
- DockerHub [docker/ncs/pusd](https://hub.docker.com/repository/docker/nighthawkcoders/pusd-student-ubuntu/general)
- GitHub CompSci Template [github/kasm-ubuntu](https://github.com/nighthawkcoders/Kasm-Ubuntu22.04-Image-Template)

#### Workspace Registry

KASM provides ready made workspaces that can be used directly or as a template for your spcific customizations.  In Del Norte CompSci, we have customized on top of a KASM provided template.  The customizations were to meet tools and configurations that were not provided directly by KASM.

This illustration shows some of the A's through D's available in the KASM registry.  Also, contained in the registry is one of Del Norte CompSci's customizations.

<img src="{{site.baseurl}}/kasm_design/kasm_registry.png" alt="Kasm registry">

### Costs

As a Teacher or Program Adminstrator, by putting activities into the cloud, data insights are now at our fingertips.  

#### Usage patterns (3 weeks)

It is easy as a Teacher to see if students are making use of available resources.

<img src="{{site.baseurl}}/kasm_design/kasm_usage.png" alt="Kasm usage">

#### AWS Costs (AWS Cloud Compute)

Seeing these costs for the existing Del Norte CompSci two classroom use case can help us evaluate the fixed workstation costs versus cloud workstation costs.  For instance, the Del Norte Photograpy refresh this summer was approximately 80K.

<img src="{{site.baseurl}}/kasm_design/aws_costs.png" alt="AWS costs">

