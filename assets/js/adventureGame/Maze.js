class Maze {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.rows = Math.floor(height / cellSize);
    this.cols = Math.floor(width / cellSize);
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(1)); // Start with walls

    this.generateMaze(0, 0); // Start maze generation from (0,0)
  }

  generateMaze(row, col) {
    const directions = [
      [0, -1], // Left
      [0, 1],  // Right
      [-1, 0], // Up
      [1, 0],  // Down
    ];

    this.grid[row][col] = 0; // Mark current cell as a path

    directions.sort(() => Math.random() - 0.5); // Shuffle directions

    for (let [dx, dy] of directions) {
      const newRow = row + dy * 2;
      const newCol = col + dx * 2;

      if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && this.grid[newRow][newCol] === 1) {
        this.grid[row + dy][col + dx] = 0; // Remove wall between
        this.generateMaze(newRow, newCol);
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = 'blue';
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === 1) {
          ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }
}

export default Maze;
