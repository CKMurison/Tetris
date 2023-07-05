const grid = Array(20).fill(0).map(() => Array(10).fill(0));
const iBlock = [1, 1, 1, 1];

for (let i = 0; i < iBlock.length; i++) {
  grid[10][i + 3] = iBlock[i];
}

console.log(grid);