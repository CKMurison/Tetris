let grid = Array(20).fill(Array(10).fill(0))
const iBlock = [1,1,1,1]

for (let i = 0; i < iBlock.length; i++) {
    grid[10].splice(i+3,1, iBlock[i])
  }

// grid[0].splice(3,4, iBlock)

console.log(grid)

// rotation research (tf = transformation aka new spot)

const relation = [[-1,1],[-1,0],[0,0],[1,0]]

let newJay = null;

relation.forEach(rel => {
  let diff = rel[0] + rel[1]
  if (Math.abs(diff) % 2 === 0) { // for distance from anchor of sqrt(2)
    switch (diff) {
      case -2:
        'tf to 0,+2'
        break
      case 0: 
        (Math.sign(rel[0]) === 1 ? "tf to -2,0" : "tf to +2,0" )
        break
      case 2:
        'tf to 0,-2'
        break
    }
  } else if (Math.abs(diff) === 1){ // for distance from anchor of 1
    switch(diff){
      case -1:
        (Math.sign(rel[0]) === -1 ? "tf to +1,+1": "tf to -1,+1")
        break
      case 1:
        (Math.sign(rel[0]) === 1 ? "tf to -1,-1": "tf to +1,-1")
        break
    }
  } else if (Math.abs(rel[0]) === 2 || Math.abs(rel[1]) === 2){
    // edge case tf for i block
  }
})