"use strict";

import { readFile } from "fs/promises";

try {
  const map = (await readFile("input.txt", "utf8"))
    .split(/\r?\n/)
    .map((line) => [...line].map((char) => Number(char)));
  //   console.log(map);
  const yLen = map.length;
  const xLen = map[0].length;
  let trials = 0;

  const searchNextNum = function (y, x, uniqueTrials) {
    const current = map[y][x];
    if (current === 9) {
      uniqueTrials.add(`${y},${x}`);
    } else {
      const next = current + 1;
      // Check posities onder, boven, links, rechts
      if (y < yLen - 1 && map[y + 1][x] === next) {
        searchNextNum(y + 1, x, uniqueTrials);
      }
      if (y > 0 && map[y - 1][x] === next) {
        searchNextNum(y - 1, x, uniqueTrials);
      }
      if (x > 0 && map[y][x - 1] === next) {
        searchNextNum(y, x - 1, uniqueTrials);
      }
      if (x < xLen - 1 && map[y][x + 1] === next) {
        searchNextNum(y, x + 1, uniqueTrials);
      }
    }
  };

  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (map[y][x] === 0) {
        const uniqueTrials = new Set();
        searchNextNum(y, x, uniqueTrials);
        trials += uniqueTrials.size;
      }
    }
  }
  console.log(trials);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
