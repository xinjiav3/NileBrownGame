---
layout: post
title: MorteVision
description: Student Teach and Software Development Objectives for Sprint 2
type: ccc
courses: {'csa': {'week': 8}}
comments: True
---

{% include MorteVision/head.html %}
{% include MorteVision/navbar.html %}

<div id="streamWrapper">
<div id="streamOffline">
<img id="StreamOfflineMort" src="{{ '/assets/MorteVision/image/logo.png?v=' | append: site.github.build_revision | relative_url }}">
<h1 id="StreamOfflineHead">Stream Offline</h1>
<span id="StreamOfflineWitty">Make sure you connect to the stream, or start your own!</span>
</div>
<video id="mortStream" autoplay playsinline></video>
</div>

<div id="streamControl">
<button alt="Begin Streaming" onclick="startStream()"><span class="material-symbols-outlined">podcasts</span></button>
<button alt="Connect To Stream" onclick="viewStream()"><span class="material-symbols-outlined">play_circle</span></button>
<button alt="Fullscreen" onclick="document.getElementById('mortStream').webkitRequestFullScreen()"><span class="material-symbols-outlined">fullscreen</span></button>
</div>
