"use strict";

import { readFile } from "fs/promises";
import { Guard } from "./guard.js";
import { Map } from "./map.js";

try {
  const fileInput = await readFile("./input.txt", "utf8");
  const splitFile = fileInput.split(/\r?\n/);
  const map = new Map(splitFile.map((line) => line.split("")));
  let infiniteLoops = 0;

  // These two for loops go trough all positions of the map.
  for (let y = 0; y < map.yLength; y++) {
    for (let x = 0; x < map.xLength; x++) {
      // for every position in the map, check if there is a '.'
      if (map.getChar([y, x]) === ".") {
        // create a copy of the original map
        let mapCopy = map.copy();
        // Place the extra #
        mapCopy.setObstacle([y, x]);
        // create guard
        const guard = new Guard(mapCopy.findGuard());

        // This is the actual loop that checks the guard route
        while (true) {
          if (guard.hasVisited()) {
            infiniteLoops++;
            break;
          }
          const nextPos = guard.next();
          const nextChar = mapCopy.getChar(nextPos);

          // Check if guard would move out of bounds
          if (nextChar === "0") {
            break;
          }
          // If there's an obstacle ahead, turn right
          if (nextChar === "#") {
            guard.turn();
          } else {
            mapCopy.setChar(guard.position());
            guard.walk();
          }
        }
      }
    }
  }
  console.log(infiniteLoops);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
