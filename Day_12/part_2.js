"use strict";

/*
I created the logic / pseudo code myself, Claude Sonnet 3.5 
assisted me here and there in translating it to correct
and functioning code.
*/

import { readFile } from "fs/promises";

const visited = new Set();
const map = (await readFile("input.txt", "utf8"))
  .split(/\r?\n/)
  .map((line) => [...line]);
const mapLen = map.length;
let price = 0;

const calculateRegionSize = function (y, x) {
  let area = 0;
  const c = map[y][x];
  const regionCells = new Set(); // Track cells in this region
  const boundaries = new Set(); // Track boundary coordinates

  // First pass: flood fill to find area and boundaries
  const floodFill = function (y, x) {
    if (y < 0 || y >= mapLen || x < 0 || x >= map[y].length) return;

    const coord = `${y},${x}`;
    if (visited.has(coord) || map[y][x] !== c) return;

    visited.add(coord);
    regionCells.add(coord);
    area++;

    // Recursively fill in all directions
    floodFill(y - 1, x);
    floodFill(y + 1, x);
    floodFill(y, x - 1);
    floodFill(y, x + 1);
  };

  floodFill(y, x);

  // Second pass: identify boundaries
  for (const coord of regionCells) {
    const [cy, cx] = coord.split(",").map(Number);

    // For each cell in the region, check its neighbors
    // If any neighbor is outside the region (different letter or edge of map),
    // that cell face is part of a boundary
    if (cy === 0 || !regionCells.has(`${cy - 1},${cx}`))
      boundaries.add(`${cy},${cx},N`);
    if (cy === mapLen - 1 || !regionCells.has(`${cy + 1},${cx}`))
      boundaries.add(`${cy},${cx},S`);
    if (cx === 0 || !regionCells.has(`${cy},${cx - 1}`))
      boundaries.add(`${cy},${cx},W`);
    if (cx === map[cy].length - 1 || !regionCells.has(`${cy},${cx + 1}`))
      boundaries.add(`${cy},${cx},E`);
  }

  // Count distinct sides
  let sides = 0;
  const processedBoundaries = new Set();

  for (const boundary of boundaries) {
    if (processedBoundaries.has(boundary)) continue;

    const [by, bx, dir] = boundary.split(",");
    let y = parseInt(by);
    let x = parseInt(bx);

    // Start of a new side
    sides++;

    // Mark current boundary as processed
    processedBoundaries.add(boundary);

    // Follow the boundary in both directions
    if (dir === "N" || dir === "S") {
      // Check horizontally
      let tx = x;
      while (boundaries.has(`${y},${tx + 1},${dir}`)) {
        processedBoundaries.add(`${y},${tx + 1},${dir}`);
        tx++;
      }
      tx = x;
      while (boundaries.has(`${y},${tx - 1},${dir}`)) {
        processedBoundaries.add(`${y},${tx - 1},${dir}`);
        tx--;
      }
    } else {
      // Check vertically
      let ty = y;
      while (boundaries.has(`${ty + 1},${x},${dir}`)) {
        processedBoundaries.add(`${ty + 1},${x},${dir}`);
        ty++;
      }
      ty = y;
      while (boundaries.has(`${ty - 1},${x},${dir}`)) {
        processedBoundaries.add(`${ty - 1},${x},${dir}`);
        ty--;
      }
    }
  }

  return area * sides;
};

try {
  for (let y = 0; y < mapLen; y++) {
    const rowLen = map[y].length;
    for (let x = 0; x < rowLen; x++) {
      if (!visited.has(`${y},${x}`)) {
        price += calculateRegionSize(y, x);
      }
    }
  }
  console.log("Final price:", price);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
