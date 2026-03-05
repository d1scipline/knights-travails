function nextSquares(square) {
  let x = square[0];
  let y = square[1];
  let result = [
    [x + 1, y - 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x - 1, y - 2],
  ];

  let valid = [];
  for (let i = 0; i < 8; i++) {
    if (
      result[i][0] >= 0 &&
      result[i][0] <= 7 &&
      result[i][1] >= 0 &&
      result[i][1] <= 7
    ) {
      valid.push(result[i]);
    }
  }
  return valid;
}

function compareCoords(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

class Node {
  constructor(initial) {
    this.x = initial[0];
    this.y = initial[1];
    this.parent = null;
  }
}

function calculatePath(leaf) {
  let array = [];
  let current = leaf;
  while (current != null) {
    array.unshift([current.x, current.y]);
    current = current.parent;
  }
  return array;
}

function knightMoves(initial, destination) {
  const visited = new Set();

  let root = new Node(initial);
  let queue = [root];
  visited.add(`${root.x},${root.y}`);
  while (queue.length != 0) {
    let current = queue.shift();
    if (current.x == destination[0] && current.y == destination[1]) {
      return calculatePath(current);
    } else {
      let children = nextSquares([current.x, current.y]);
      for (let child of children) {
        if (visited.has(`${child[0]},${child[1]}`)) {
          continue;
        }
        let childElement = new Node(child);
        childElement.parent = current;
        queue.push(childElement);
        visited.add(`${childElement.x},${childElement.y}`);
      }
    }
  }
}

function printPath(array) {
  console.log(`You made it in ${array.length - 1} moves! Here's your path:`);
  for (item of array) {
    console.log(item);
  }
}

printPath(knightMoves([3, 3], [4, 3]));
