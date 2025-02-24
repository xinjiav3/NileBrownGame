// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Backgroundwater.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NpcFrog from './NpcFrog.js';
import Maze from './Maze.js';

class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/rpg/YangtzeBlueSprites/delnorte.png";
    const image_data_water = {
        name: 'water',
        src: image_src_water,
        pixels: {height: 640, width: 1280}
    };

    // Player 1 sprite data (turtle)
    const SaraS_SCALE_FACTOR = 10;
    const sprite_src_SaraS = path + "images/rpg/YangtzeBlueSprites/SaraS.png";
    const sprite_data_turtle = {
        name: 'SaraS',
        src: sprite_src_SaraS,
        SCALE_FACTOR: SaraS_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/SaraS_SCALE_FACTOR) }, 
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/YangtzeBlueSprites/burrit.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (frog)
    const sprite_src_frog = path + "/images/rpg/burrit.jpg";
    const sprite_data_frog = {
        name: 'burrit',
        src: sprite_src_frog,
        SCALE_FACTOR: 16,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 9, columns: 3 },  // This is the stationary npc, down is default 
    };

    // Maze data
    const maze = new Maze(width, height, 40);

    // List of objects definitions for this level
    this.objects = [
      { class: Background, data: image_data_water },
      { class: PlayerOne, data: sprite_data_turtle },
      { class: PlayerTwo, data: sprite_data_fish },
      { class: NpcFrog, data: sprite_data_frog },
      { class: Maze, data: maze }
    ];
  }

  render(ctx) {
    console.log('Rendering game level...');
    this.objects.forEach(obj => {
      console.log(`Rendering object: ${obj.class.name}`);
      if (obj.class === Maze) {
        obj.data.render(ctx);
      } else {
        // Render other objects
        const instance = new obj.class(obj.data);
        instance.render(ctx);
      }
    });
  }
}

export default GameLevelWater;