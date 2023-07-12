let array = [[0,1],[0,0]]
let anchorPoint = array[1]
let relation = [] // [0,-1] [0,0] [1,0] [1,1]
let afterTF = []
let newArr = []
array.forEach(arr => {
  relation.push([arr[0] - anchorPoint[0], arr[1] - anchorPoint[1]])
})

const transformation = {
  "[-1,0]": [0, 1],
  "[0,1]": [1, 0],
  "[1,0]": [0, -1],
  "[0,-1]": [-1, 0],
  "[-1,-1]": [-1, 1],
  "[-1,1]": [1, 1],
  "[1,1]": [1, -1],
  "[1,-1]": [-1, -1],
  "[-2,0]": [0, 2],
  "[0,2]": [2, 0],
  "[2,0]": [0, -2],
  "[0,-2]": [-2, 0],
  "[0,0]" : [0, 0]
}

relation.forEach(arr => {
  newArr.push(transformation[JSON.stringify(arr)])
})

console.log(newArr)