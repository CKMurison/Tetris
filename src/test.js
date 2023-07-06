let grid = Array(20).fill(Array(10).fill(0))
const iBlock = [1,1,1,1]

for (let i = 0; i < iBlock.length; i++) {
    grid[10].splice(i+3,1, iBlock[i])
  }

// grid[0].splice(3,4, iBlock)

console.log(grid)