// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';

class GameLevelSquares {
  constructor(path) {
    this.objects = [
      { class: Background, data: {} },
      { class: PlayerOne },
      { class: PlayerTwo },
    ];
  }

  // Add any methods to manipulate the game level data here
}

export default GameLevelSquares;