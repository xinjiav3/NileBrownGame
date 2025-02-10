


const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let gameState = "start";
let hero, boss, bullets, bossBullets;
let keys = {};
let bossInterval, shootInterval;

function initGame() {
    hero = { x: 50, y: 180, width: 20, height: 20, health: 100 };
    boss = { x: 330, y: 150, width: 30, height: 30, health: 100, speed: 2 };
    bullets = [];
    bossBullets = [];
    clearInterval(bossInterval);
    clearInterval(shootInterval);
    bossMovement();
    bossShooting();
}

function startScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Press Start", 150, 200);
    canvas.addEventListener("click", startGame);
}

function startGame() {
    gameState = "playing";
    initGame();
    canvas.removeEventListener("click", startGame);
    requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
    keys[e.key] = true;
    if (e.key === " " && gameState === "playing") shoot();
}

function keyUpHandler(e) {
    keys[e.key] = false;
}

function shoot() {
    bullets.push({ x: hero.x + 20, y: hero.y + 5, width: 5, height: 5, speed: 5 });
}

function bossShooting() {
    shootInterval = setInterval(() => {
        bossBullets.push({ x: boss.x, y: boss.y + 5, width: 5, height: 5, speed: -3 });
    }, 2000);
}

function bossMovement() {
    bossInterval = setInterval(() => {
        boss.y += boss.speed;
        if (boss.y <= 0 || boss.y >= canvas.height - boss.height) boss.speed *= -1;
    }, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (keys["ArrowUp"] && hero.y > 0) hero.y -= 3;
    if (keys["ArrowDown"] && hero.y < canvas.height - hero.height) hero.y += 3;

    ctx.fillStyle = "blue";
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);

    ctx.fillStyle = "red";
    ctx.fillRect(boss.x, boss.y, boss.width, boss.height);

    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.x > canvas.width) bullets.splice(index, 1);
        if (
            bullet.x < boss.x + boss.width &&
            bullet.x + bullet.width > boss.x &&
            bullet.y < boss.y + boss.height &&
            bullet.y + bullet.height > boss.y
        ) {
            boss.health -= 20;
            bullets.splice(index, 1);
        }
    });

    bossBullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        ctx.fillStyle = "purple";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.x < 0) bossBullets.splice(index, 1);
        if (
            bullet.x < hero.x + hero.width &&
            bullet.x + bullet.width > hero.x &&
            bullet.y < hero.y + hero.height &&
            bullet.y + bullet.height > hero.y
        ) {
            hero.health -= 20;
            bossBullets.splice(index, 1);
        }
    });

    ctx.fillStyle = "white";
    ctx.fillText(`Hero Health: ${hero.health}`, 10, 20);
    ctx.fillText(`Boss Health: ${boss.health}`, 300, 20);

    if (hero.health <= 0) {
        gameOver();
        return;
    }

    if (boss.health <= 0) {
        nextBoss();
        return;
    }

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameState = "over";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 150, 200);
    setTimeout(() => {
        gameState = "start";
        startScreen();
    }, 4000);
}

function nextBoss() {
    boss = { x: 330, y: 150, width: 30, height: 30, health: 200, speed: 4 };
    hero.health = Math.max(hero.health, 1);
    clearInterval(bossInterval);
    clearInterval(shootInterval);
    bossMovement();
    bossShooting();
    requestAnimationFrame(gameLoop);
}

startScreen();