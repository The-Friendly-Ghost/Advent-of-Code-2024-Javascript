"use strict";

import { readFile } from "fs/promises";
import { Guard } from "./guard.js";
import { Map } from "./map.js";

try {
  const fileInput = await readFile("./input.txt", "utf8");
  const splitFile = fileInput.split(/\r?\n/);
  const map = new Map(splitFile.map((line) => line.split("")));
  const guard = new Guard(map.findGuard());

  // Mark initial position
  map.setChar(guard.position());

  while (true) {
    const nextPos = guard.next();
    const nextChar = map.getChar(nextPos);

    // Check if guard would move out of bounds
    if (nextChar === "0") {
      map.setChar(guard.position());
      break;
    }

    // If there's an obstacle ahead, turn right
    if (nextChar === "#") {
      guard.turn();
    } else {
      map.setChar(guard.position());
      guard.walk();
    }
  }
  console.log(map.countX());
} catch (error) {
  console.error(`Error: ${error.message}`);
}
