class ShootingGame extends Phaser.Scene {
    constructor() {
        super();
        this.gameStarted = false;
        this.currentBoss = 1;
        this.canShoot = true;
        this.bossCanShoot = true;
        this.gameOver = false;
    }
    create() {
        // Set background
        this.cameras.main.setBackgroundColor('#000000');
        // Create start screen
        this.createStartScreen();
        // Initialize game objects (initially hidden)
        this.createGameObjects();
        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Create groups for projectiles
        this.heroProjectiles = this.physics.add.group();
        this.bossProjectiles = this.physics.add.group();
        // Setup collisions
        this.setupCollisions();
    }
    createStartScreen() {
        this.startButton = this.add.rectangle(200, 200, 100, 40, 0x00ff00);
        this.startText = this.add.text(160, 190, 'START', { fontSize: '20px', fill: '#fff' });
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => this.startGame());
    }
    createGameObjects() {
        // Hero (blue rectangle)
        this.hero = this.add.rectangle(50, 200, 30, 30, 0x0000ff);
        this.physics.add.existing(this.hero);
        this.hero.health = 100;
        this.hero.body.setCollideWorldBounds(true);
        // Boss (red rectangle)
        this.boss = this.add.rectangle(350, 200, 40, 40, 0xff0000);
        this.physics.add.existing(this.boss);
        this.boss.health = this.currentBoss === 1 ? 100 : 200;
        this.boss.body.setCollideWorldBounds(true);
        // Health text displays
        this.heroHealthText = this.add.text(10, 10, `Hero HP: ${this.hero.health}`, { fontSize: '16px', fill: '#fff' });
        this.bossHealthText = this.add.text(280, 10, `Boss HP: ${this.boss.health}`, { fontSize: '16px', fill: '#fff' });
        // Initially hide game objects
        this.hideGameObjects();
    }
    hideGameObjects() {
        this.hero.visible = false;
        this.boss.visible = false;
        this.heroHealthText.visible = false;
        this.bossHealthText.visible = false;
    }
    showGameObjects() {
        this.hero.visible = true;
        this.boss.visible = true;
        this.heroHealthText.visible = true;
        this.bossHealthText.visible = true;
    }
    startGame() {
        this.gameStarted = true;
        this.gameOver = false;
        this.currentBoss = 1;
        this.hero.health = 100;
        this.boss.health = 100;
        this.startButton.visible = false;
        this.startText.visible = false;
        this.showGameObjects();
    }
    setupCollisions() {
        this.physics.add.collider(this.heroProjectiles, this.boss, this.onHeroProjectileHitBoss, null, this);
        this.physics.add.collider(this.bossProjectiles, this.hero, this.onBossProjectileHitHero, null, this);
    }
    onHeroProjectileHitBoss(boss, projectile) {
        projectile.destroy();
        this.boss.health -= 20;
        this.bossHealthText.setText(`Boss HP: ${this.boss.health}`);
        if (this.boss.health <= 0) {
            if (this.currentBoss === 1) {
                this.advanceToNextBoss();
            } else {
                this.showVictoryScreen();
            }
        }
    }
    onBossProjectileHitHero(hero, projectile) {
        projectile.destroy();
        const damage = this.currentBoss === 1 ? 20 : 50;
        this.hero.health -= damage;
        this.heroHealthText.setText(`Hero HP: ${this.hero.health}`);
        if (this.hero.health <= 0) {
            this.showGameOverScreen();
        }
    }
    advanceToNextBoss() {
        this.currentBoss = 2;
        this.boss.health = 200;
        this.boss.setFillStyle(0xff00ff); // Change color for second boss
        this.bossHealthText.setText(`Boss HP: ${this.boss.health}`);
    }
    showGameOverScreen() {
        this.gameOver = true;
        const gameOverText = this.add.text(150, 200, 'GAME OVER', { fontSize: '32px', fill: '#FF0000' });
        setTimeout(() => {
            gameOverText.destroy();
            this.resetGame();
        }, 4000);
    }
    showVictoryScreen() {
        this.gameOver = true;
        const victoryText = this.add.text(150, 200, 'YOU WIN!', { fontSize: '32px', fill: '#00FF00' });
        setTimeout(() => {
            victoryText.destroy();
            this.resetGame();
        }, 4000);
    }
    resetGame() {
        this.hideGameObjects();
        this.startButton.visible = true;
        this.startText.visible = true;
        this.heroProjectiles.clear(true, true);
        this.bossProjectiles.clear(true, true);
        this.gameStarted = false;
    }
    shootHeroProjectile() {
        if (!this.canShoot) return;
        const projectile = this.add.rectangle(this.hero.x + 20, this.hero.y, 10, 5, 0x00ffff);
        this.heroProjectiles.add(projectile);
        this.physics.add.existing(projectile);
        projectile.body.setVelocityX(300);
        this.canShoot = false;
        setTimeout(() => this.canShoot = true, 4000);
    }
    shootBossProjectile() {
        if (!this.bossCanShoot) return;
        const projectile = this.add.rectangle(this.boss.x - 20, this.boss.y, 10, 5, 0xff6600);
        this.bossProjectiles.add(projectile);
        this.physics.add.existing(projectile);
        const velocity = this.currentBoss === 1 ? -200 : -300;
        projectile.body.setVelocityX(velocity);
        this.bossCanShoot = false;
        setTimeout(() => this.bossCanShoot = true, 4000);
    }
    update() {
        if (!this.gameStarted || this.gameOver) return;
        // Hero movement
        if (this.cursors.up.isDown) {
            this.hero.body.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.hero.body.setVelocityY(200);
        } else {
            this.hero.body.setVelocityY(0);
        }
        // Hero shooting
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.shootHeroProjectile();
        }
        // Boss movement
        const bossSpeed = this.currentBoss === 1 ? 100 : 150;
        this.boss.body.setVelocityY(Math.sin(this.time.now / 1000) * bossSpeed);
        // Boss random shooting
        if (Math.random() < 0.02) {
            this.shootBossProjectile();
        }
        // Clean up projectiles
        this.heroProjectiles.children.each(projectile => {
            if (projectile.x > 400) projectile.destroy();
        });
        this.bossProjectiles.children.each(projectile => {
            if (projectile.x < 0) projectile.destroy();
        });
    }
}
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 400,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: ShootingGame
};
const game = new Phaser.Game(config);