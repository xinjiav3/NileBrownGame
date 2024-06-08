---
layout: default
title: Alien World Background
description: Use JavaScript without external libraries to move background across a screen, OOP style.
categories: [C5.0, C7.0, C7.6]
permalink: /frontend/background
image: /images/alien_planet2.jpg
---

{% assign IMAGE = site.baseurl | append: page.image %}
{% assign WIDTH = 6435 %}
{% assign HEIGHT = 3000 %}

<style>
  #alienWorld {
    filter: invert(0%);
  }
</style>

<canvas id="alienWorld"></canvas>

<script>
  const canvas = document.getElementById("alienWorld");
  const ctx = canvas.getContext('2d');

  // Original aspect ratio of the image
  const ASPECT_RATIO = {{WIDTH}} / {{HEIGHT}};
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  // Calculate new dimensions to maintain aspect ratio
  let canvasWidth, canvasHeight;
  if (maxWidth / maxHeight < ASPECT_RATIO) {
    canvasWidth = maxWidth;
    canvasHeight = maxWidth / ASPECT_RATIO;
  } else {
    canvasHeight = maxHeight;
    canvasWidth = maxHeight * ASPECT_RATIO;
  }
  const canvasLeft = (maxWidth - canvasWidth) / 2;
  const canvasTop = (maxHeight - canvasHeight) / 2;

  // Update canvas dimensions and position
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.position = 'absolute';
  canvas.style.left = `${canvasLeft}px`;
  canvas.style.top = `${canvasTop}px`;

  var gameSpeed = 2;
  class Layer {
    constructor(image, speedRatio) {
      this.x = 0;
      this.y = 0;
      this.width = canvasWidth; // Use the scaled width
      this.height = canvasHeight; // Use the scaled height
      this.image = image;
      this.speedRatio = speedRatio;
      this.speed = gameSpeed * this.speedRatio;
      this.frame = 0;
    }
    update() {
      this.x = (this.x - this.speed) % this.width;
    }
    draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale the image to fit the canvas
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      
      // If the image has moved left (this.x is negative), draw the wrap-around on the right
      if (this.x < 0) {
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    }
  }

  const backgroundImg = new Image();
  backgroundImg.src = '{{IMAGE}}';
  var backgroundObj = new Layer(backgroundImg, 0.5);

  function background() {
    backgroundObj.update();
    backgroundObj.draw();
    requestAnimationFrame(background);
  }
  background();
</script>