// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player1 from './Player1.js';
import Player2 from './Player2.js';

// Minimal Definition
class GameLevelSquares {
  constructor(path) {
    this.objects = [
      { class: Background, data: {} },
      { class: Player1 },
      { class: Player2 },
    ];
  }
}

export default GameLevelSquares;