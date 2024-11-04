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
<span id="StreamOfflineWitty">Why don't you share something?</span>
</div>
<video id="mortStream" autoplay playsinline></video>
</div>

