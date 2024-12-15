import { readFile } from "fs/promises";

// Globals
const antiNodesSet = new Set();

// Controleren of een karakter een letter OF nummer is
const isAlphanumeric = function (char) {
  return /^[a-zA-Z0-9]$/.test(char);
};

const getNodes = function (map, yLen, xLen) {
  const characters = [];
  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (isAlphanumeric(map[y][x])) {
        characters.push([map[y][x], y, x]);
        antiNodesSet.add(`${y}, ${x}`);
      }
    }
  }
  return characters;
};

const calculateAntiNodes = function (first, second, yLen, xLen) {
  // Get positions of antennas
  const [, fy, fx] = first;
  const [, sy, sx] = second;
  // calculate difference
  const diffY = sy - fy;
  const diffX = sx - fx;

  // Check first antinode
  let [y1, x1] = [fy - diffY, fx - diffX];
  while (y1 >= 0 && y1 < yLen && x1 >= 0 && x1 < xLen) {
    antiNodesSet.add(`${y1}, ${x1}`);
    y1 -= diffY;
    x1 -= diffX;
  }
  // Check second antinode
  let [y2, x2] = [sy + diffY, sx + diffX];
  while (y2 >= 0 && y2 < yLen && x2 >= 0 && x2 < xLen) {
    antiNodesSet.add(`${y2}, ${x2}`);
    y2 += diffY;
    x2 += diffX;
  }
};

const getAntinodes = function (nodes, yLen, xLen) {
  // Loop through all nodes
  for (let i = 0; i < nodes.length - 1; i++) {
    // Set current node to check
    const freq = nodes[i][0];
    // Create new array for all other nodes and check each position
    nodes.slice(i + 1).forEach((node) => {
      if (node[0] === freq) {
        calculateAntiNodes(nodes[i], node, yLen, xLen);
      }
    });
  }
};

try {
  const map = (await readFile("input.txt", "utf8"))
    .split(/\r?\n/)
    .map((line) => [...line]);
  const yLen = map.length;
  const xLen = map[0].length;
  const allNodes = getNodes(map, yLen, xLen);
  getAntinodes(allNodes, yLen, xLen);
  console.log(antiNodesSet.size);
} catch (error) {
  console.log(`Error: ${error.message}`);
}
