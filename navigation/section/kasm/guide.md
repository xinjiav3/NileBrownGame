---
layout: post
title: Kasm Cloud Workspaces
description: Guidebook to Kasm Web Portal
categories: [Documentation]
permalink: /kasm/pages/webguide
menu: nav/Kasm_Sections/web_guides.html
---

<ul>
{% for post in site.posts %}
  {% if post.path contains "/Kasm/Config_Guides/" %}
    <li>
      <a href="{{ site.baseurl }}{{ post.permalink | default: post.url }}">{{ post.title }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>