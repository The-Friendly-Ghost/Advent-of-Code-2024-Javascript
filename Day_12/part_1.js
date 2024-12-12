"use strict";

import { readFile } from "fs/promises";

const visited = new Set();
const map = (await readFile("input.txt", "utf8"))
  .split(/\r?\n/)
  .map((line) => [...line]);
const mapLen = map.length;
let price = 0;

const calculateRegionSize = function (y, x) {
  let area = 0;
  let perimeter = 0;
  const c = map[y][x];

  const floodFill = function (y, x, c) {
    // Check if current is a valid position
    if (y < 0 || y >= mapLen || x < 0 || x >= map[y].length) return;
    if (visited.has(`${y},${x}`)) return;

    // Add current position to set, and increase region area
    visited.add(`${y},${x}`);
    area++;

    // Check perimeter positions
    let per = 4;
    // Check above
    if (y > 0 && map[y - 1][x] === c) {
      floodFill(y - 1, x, c);
      per--;
    }
    // Check below
    if (y < mapLen - 1 && map[y + 1][x] === c) {
      floodFill(y + 1, x, c);
      per--;
    }
    // Check left
    if (map[y][x - 1] === c) {
      floodFill(y, x - 1, c);
      per--;
    }
    // Check right
    if (map[y][x + 1] === c) {
      floodFill(y, x + 1, c);
      per--;
    }
    perimeter += per;
  };
  floodFill(y, x, c);
  return area * perimeter;
};

try {
  for (let y = 0; y < mapLen; y++) {
    const rowLen = map[y].length;
    for (let x = 0; x < rowLen; x++) {
      if (!visited.has(`${y},${x}`)) {
        price += calculateRegionSize(y, x);
        // console.log(price);
      }
    }
  }
  console.log(price);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
