class Test {

  constructor() {
    this.grid = this.#createGrid(20, 10) // Generate grid made of 20 arrays, each array being made of 10 zeros.
    this.position = [[9, 5], [10, 3], [10, 4], [10, 5]]
    this.anchorPoint = this.position[1]
    this.relation = [];
    this.rotation = [];
    this.newPosition = [];
  }

  rotatePiece() {
    this.position.forEach(arr => {
      this.relation.push([arr[0] - this.anchorPoint[0], arr[1] - this.anchorPoint[1]])
    })
    // const relation = [ [ -1, 2 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
    this.relation.forEach(rel => {
      let diff = rel[0] + rel[1]
      if (Math.abs(diff) % 2 === 0) { // for distance from anchor of sqrt(2)
        switch (diff) {
          case -2:
            this.rotation.push([rel[0],rel[1] + 2])//'tf to 0,+2'
          case 0: 
            (Math.sign(rel[0]) === 1 ? this.rotation.push([rel[0] - 2,rel[1]])/*tf to -2,0*/ : this.rotation.push([rel[0]+2,rel[1]])/*tf to +2,0"*/ )
          case 2:
            this.rotation.push([rel[0],rel[1] - 2])//'tf to 0,-2'
        }
      } else if (Math.abs(diff) === 1){ // for distance from anchor of 1
        switch(diff){
          case -1:
            (Math.sign(rel[0]) === -1 ? this.rotation.push([rel[0] + 1,rel[1] + 1])/*"tf to +1,+1"*/: this.rotation.push([rel[0] - 1,rel[1] + 1])/*"tf to -1,+1"*/)
          case 1:
            (Math.sign(rel[0]) === 1 ? this.rotation.push([rel[0] - 1,rel[1] - 1])/*"tf to -1,-1"*/: this.rotation.push([rel[0] + 1,rel[1] - 1])/*"tf to +1,-1"*/)
        }
      } else if (Math.abs(rel[0]) === 2 || Math.abs(rel[1]) === 2){
        // edge case tf for i block
      }
    })
    this.rotation.forEach(arr => {
      this.newPosition.push([arr[0]+ this.anchorPoint, arr[1] + this.anchorPoint])
    });
    console.log(this.relation)
    console.log(this.rotation)
    return this.newPosition
  }

  #createGrid(rows, columns) {
    let grid = [];
    let row = new Array(10).fill(0);
    for (let i = 0; i < rows; i++) {
      let row = new Array(10).fill(0);
      grid.push(row)
    }
    return grid;
  }
}

module.exports = Test;


// rotation research (tf = transformation aka new spot)

// let position = [[9, 5], [10, 3], [10, 4], [10, 5]]

// let anchorPoint = position[1]

// let relation = [];

// position.forEach(arr => {
//   relation.push([arr[0] - anchorPoint[0], arr[1] - anchorPoint[1]])
// // })

// // const relation = [[-1,1],[-1,0],[0,0],[1,0]]

// let rotation = null;

// relation.forEach(rel => {
//   let diff = rel[0] + rel[1]
//   if (Math.abs(diff) % 2 === 0) { // for distance from anchor of sqrt(2)
//     switch (diff) {
//       case -2:
//         rotation.push([rel[0],rel[1] + 2])//'tf to 0,+2'
//       case 0: 
//         (Math.sign(rel[0]) === 1 ? rotation.push([rel[0] - 2,rel[1]])/*tf to -2,0*/ : rotation.push([rel[0]+2,rel[1]])/*tf to +2,0"*/ )
//       case 2:
//         rotation.push([rel[0],rel[1] - 2])//'tf to 0,-2'
//     }
//   } else if (Math.abs(diff) === 1){ // for distance from anchor of 1
//     switch(diff){
//       case -1:
//         (Math.sign(rel[0]) === -1 ? rotation.push([rel[0] + 1,rel[1] + 1])/*"tf to +1,+1"*/: rotation.push([rel[0] - 1,rel[1] + 1])/*"tf to -1,+1"*/)
//       case 1:
//         (Math.sign(rel[0]) === 1 ? rotation.push([rel[0] - 1,rel[1] - 1])/*"tf to -1,-1"*/: rotation.push([rel[0] + 1,rel[1] - 1])/*"tf to +1,-1"*/)
//     }
//   } else if (Math.abs(rel[0]) === 2 || Math.abs(rel[1]) === 2){
//     // edge case tf for i block
//   }
// })