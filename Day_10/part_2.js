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

  const searchNextNum = function (y, x) {
    const current = map[y][x];
    if (current === 9) {
      trials++;
    } else {
      const next = current + 1;
      // Check posities onder, boven, links, rechts
      if (y < yLen - 1 && map[y + 1][x] === next) {
        searchNextNum(y + 1, x);
      }
      if (y > 0 && map[y - 1][x] === next) {
        searchNextNum(y - 1, x);
      }
      if (x > 0 && map[y][x - 1] === next) {
        searchNextNum(y, x - 1);
      }
      if (x < xLen - 1 && map[y][x + 1] === next) {
        searchNextNum(y, x + 1);
      }
    }
  };

  for (let y = 0; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (map[y][x] === 0) {
        searchNextNum(y, x);
      }
    }
  }
  console.log(trials);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
