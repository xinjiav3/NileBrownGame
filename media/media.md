---
layout: post
title: Media Bias Game
permalink: /media
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <p>Drag the images into the correct bins (Left, Center, or Right) based on their bias. Order does not matter.</p>
    <div id="bins">
        <div class="bin" data-bin="Left">Left</div>
        <div class="bin" data-bin="Center">Center</div>
        <div class="bin" data-bin="Right">Right</div>
    </div>
    <div id="images">
        <script>
            const imageFiles = [
                { src: "atlanticL.png", company: "Atlantic", bin: "Left" },
                { src: "buzzfeedL.png", company: "Buzzfeed", bin: "Left" },
                { src: "cnnL.png", company: "CNN", bin: "Left" },
                { src: "epochR.png", company: "Epoch Times", bin: "Right" },
                { src: "forbesC.png", company: "Forbes", bin: "Center" },
                { src: "hillC.png", company: "The Hill", bin: "Center" },
                { src: "nbcL.png", company: "NBC", bin: "Left" },
                { src: "newsweekC.png", company: "Newsweek", bin: "Center" },
                { src: "nytL.png", company: "NY Times", bin: "Left" },
                { src: "voxL.png", company: "Vox", bin: "Left" },
                { src: "wtR.png", company: "Washington Times", bin: "Right" },
                { src: "bbcC.png", company: "BBC", bin: "Center" },
                { src: "callerR.png", company: "The Daily Caller", bin: "Right" },
                { src: "dailywireR.png", company: "Daily Wire", bin: "Right" },
                { src: "federalistR.png", company: "Federalist", bin: "Right" },
                { src: "foxR.png", company: "Fox News", bin: "Right" },
                { src: "marketwatchC.png", company: "MarketWatch", bin: "Center" },
                { src: "newsmaxR.png", company: "Newsmax", bin: "Right" },
                { src: "nprL.png", company: "NPR", bin: "Left" },
                { src: "reutersC.png", company: "Reuters", bin: "Center" },
                { src: "wsjC.png", company: "Wall Street Journal", bin: "Center" }
            ];
            imageFiles.forEach((file, index) => {
                document.write(`
                    <img src="assets/${file.src}" 
                         class="image" 
                         draggable="true" 
                         data-company="${file.company}" 
                         data-bin="${file.bin}">
                `);
            });
        </script>
    </div>
    <button id="submit">Submit</button>
    <script>
        const bins = document.querySelectorAll('.bin');
        const images = document.querySelectorAll('.image');
        images.forEach(img => {
            img.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', e.target.dataset.company);
                e.dataTransfer.setData('image-id', e.target.id);
            });
        });
        bins.forEach(bin => {
            bin.addEventListener('dragover', e => e.preventDefault());
            bin.addEventListener('drop', e => {
                const imageId = e.dataTransfer.getData('image-id');
                const img = document.querySelector(`#${imageId}`);
                bin.appendChild(img);
            });
        });
        document.getElementById('submit').addEventListener('click', async () => {
            const incorrectAssignments = [];
            bins.forEach(bin => {
                Array.from(bin.children).forEach(img => {
                    if (img.dataset.bin !== bin.dataset.bin) {
                        incorrectAssignments.push(img.dataset.company);
                    }
                });
            });
            if (incorrectAssignments.length === 0) {
                alert("Congratulations! All images are correctly sorted.");
            } else {
                alert(`Incorrectly sorted companies: ${incorrectAssignments.join(', ')}`);
            }
        });
    </script>
</body>
</html>
