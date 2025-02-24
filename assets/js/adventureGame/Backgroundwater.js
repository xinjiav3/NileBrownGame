import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Background extends GameObject {
    constructor(data = null) {
        super();
        this.image = new Image();
        this.image.src = data?.src || 'images/rpg/YangtzeBlueSprites/delnorte.png'; // Use uploaded image

        GameEnv.gameObjects.push(this);
    }

    draw() {
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;

        if (this.image.complete) {
            ctx.drawImage(this.image, 0, 0, width, height);
        } else {
            this.image.onload = () => ctx.drawImage(this.image, 0, 0, width, height);
        }
    }
}