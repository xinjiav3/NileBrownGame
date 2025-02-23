class Maze {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.grid = this.generateMaze();
  }

  generateMaze() {
    // Simple maze generation logic (e.g., recursive division, random walk, etc.)
    // For simplicity, we'll create a grid with random walls
    const rows = Math.floor(this.height / this.cellSize);
    const cols = Math.floor(this.width / this.cellSize);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Add random walls
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.7) {
          grid[row][col] = 1; // Wall
        }
      }
    }

    return grid;
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