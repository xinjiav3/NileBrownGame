//import GameEnv from './GameEnv.js';

/* Background class for primary background
*/
//export class Background {
    //constructor(data = null) {
        //if (data.src) {
            //this.image = new Image();
            //this.image.src = data.src;
        //} else {
            //this.image = null;
        //}
        //GameEnv.gameObjects.push(this);
    //}

    /* This method draws to GameEnv context, primary background
    */
    //draw() {
        //const ctx = GameEnv.ctx;
        //const width = GameEnv.innerWidth;
        //const height = GameEnv.innerHeight;

        //if (this.image) {
            // Draw the background image scaled to the canvas size
            //ctx.drawImage(this.image, 0, 0, width, height);
       // } else {
            // Fill the canvas with fillstyle color if no image is provided
            //ctx.fillStyle = '#87CEEB';
            //ctx.fillRect(0, 0, width, height);
       // }
   // }

    /* For primary background, update is the same as draw
    */
   // update() {
   //     this.draw();
   // }

/* For primary background, resize is the same as draw
    */
   // resize() {
      //  this.draw();
  //  }
//}

//export default Background;

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyberpunk City</title>
    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        canvas {
            image-rendering: pixelated; /* Keeps a pixel-art effect */
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = 800;
        canvas.height = 400;

        // Draw background
        ctx.fillStyle = "#8B0023"; // Dark red cyberpunk sky
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Function to draw buildings
        function drawBuilding(x, y, width, height, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        }

        // Draw city skyline (simplified)
        drawBuilding(50, 150, 100, 250, "#100028"); 
        drawBuilding(200, 100, 120, 300, "#19002E"); 
        drawBuilding(350, 130, 90, 270, "#240044");
        drawBuilding(500, 80, 110, 320, "#180038");
        drawBuilding(650, 160, 140, 240, "#130026");

        // Draw grid foreground
        function drawGrid() {
            ctx.strokeStyle = "#00FF99";
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 40, 250);
                ctx.lineTo(i * 20, 400);
                ctx.stroke();
            }
            for (let j = 0; j < 10; j++) {
                ctx.beginPath();
                ctx.moveTo(0, 250 + j * 15);
                ctx.lineTo(800, 250 + j * 15);
                ctx.stroke();
            }
        }
        drawGrid();

        // Draw the digital-style "portal" in the middle
        function drawPortal() {
            ctx.fillStyle = "#0000FF"; // Neon blue
            ctx.fillRect(300, 180, 160, 160);
            ctx.clearRect(340, 220, 80, 80); // Inner cut-out for portal effect
        }
        drawPortal();

        // Add neon signs
        function drawNeonSign(x, y, text, color) {
            ctx.fillStyle = color;
            ctx.font = "bold 14px Arial";
            ctx.fillText(text, x, y);
        }
        drawNeonSign(220, 120, "CYBER", "#FF0000");
        drawNeonSign(540, 90, "FUTURE", "#00FF00");

    </script>
</body>
</html>