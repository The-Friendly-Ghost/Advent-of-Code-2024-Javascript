"use strict";
import { readFile } from "fs/promises";

const increaseZero = function (stones) {
  const len = stones.length;
  for (let i = 0; i < len; i++) {
    if (stones[i] === "0") {
      stones[i] = "1";
    }
  }
};

try {
  const stones = (await readFile("input.txt", "utf8")).split(" ");

  // process 25 blinks
  for (let blink = 1; blink <= 25; blink++) {
    // Loop through stones
    for (let i = 0; i < stones.length; i++) {
      const stoneLen = stones[i].length;
      // Option 1: increase zero.
      if (stones[i] === "0") {
        stones[i] = "1";
      } 
	  // Option 2: multiplied by 2024
	  else if (stoneLen % 2 === 1) {
        stones[i] = (Number(stones[i]) * 2024).toString();
      } 
	  // Option 3 : Split in 2
	  else {
        // Create new stone
        stones.splice(i + 1, 0, stones[i].slice(stoneLen / 2));
		// Remove leading zero's from string
        stones[i + 1] = /^0+$/.test(stones[i + 1])   
        ? "0"   
        : stones[i + 1].replace(/^0+/, "");  
        // Set current stone
        stones[i] = stones[i].slice(0, stoneLen / 2);
		// Add extra increment to compensate for the extra stone.
		i++;
      }
    }
  }
  console.log(stones.length);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
