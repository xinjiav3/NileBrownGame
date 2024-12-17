---
layout: base 
title: Test Page for SCSS
description: 
permalink: /test-page
---

  <nav class="navbar">
    <div class="logo">NITD</div>
    <div class="nav-buttons">
      <a href="{{site.baseurl}}/stocks/home">Button1</a>
      <a href="{{site.baseurl}}/stocks/viewer">Button2</a>
      <a href="{{site.baseurl}}/stocks/portfolio">Button3</a>
      <a href="{{site.baseurl}}/stocks/buysell">Button4</a>
      <a onclick="logout()" href="{{site.baseurl}}/stocks/login">Button5</a>
    </div>
  </nav>