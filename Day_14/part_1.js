"use strict";

import { readFile } from "fs/promises";

const SECONDS = 100;
const TILES_X = 101;
const TILES_Y = 103;
// const TILES_X = 11;
// const TILES_Y = 7;

const calculatePos = function (start, v, len) {
  const moved = SECONDS * v;
  const newPos = (moved + start) % len;

  // Handle negative positions
  return (newPos + len) % len; // This ensures the result is always non-negative
};

// Parse file
const robots = (await readFile("input.txt", "utf8"))
  .split(/\r?\n/)
  .map((line) =>
    line.match(/-?\d+,\d+|-?\d+/g).flatMap((num) => num.split(",").map(Number))
  );

let quadrant = [0, 0, 0, 0];
const getQuadrant = function (y, x) {
  if (y < Math.floor(TILES_Y / 2)) {
    if (x < Math.floor(TILES_X / 2)) {
      quadrant[0]++;
    } else if (x > Math.floor(TILES_X / 2)) {
      quadrant[1]++;
    }
  } else if (y > Math.floor(TILES_Y / 2)) {
    if (x < Math.floor(TILES_X / 2)) {
      quadrant[2]++;
    } else if (x > Math.floor(TILES_X / 2)) {
      quadrant[3]++;
    }
  }
};

// Calculate final positions robots
const finalPositions = [];
robots.forEach((robot) => {
  const y = calculatePos(robot[1], robot[3], TILES_Y);
  const x = calculatePos(robot[0], robot[2], TILES_X);
  getQuadrant(y, x);
});

console.log(quadrant);

const sum = quadrant.reduce((acc, value) => acc * value, 1);
console.log(sum);
