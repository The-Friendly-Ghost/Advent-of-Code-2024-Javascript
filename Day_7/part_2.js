"use strict";

import { readFile } from "fs/promises";
import { Equation } from "./equation_part2.js";

const splitFile = function (str) {
  // Splitting the file on newlines
  const splitNewline = str.split(/\r?\n/);

  // Splitting the file on ':'
  const splitColon = splitNewline.map((line) => line.split(":"));

  // Creating the final array with splitted numbers
  // arr[0] will be the sum (test value)
  // arr[1] will be an array with the numbers
  const equationArr = splitColon.map((arr) => {
    return [Number(arr[0]), arr[1].trim().split(" ").map(Number)];
  });

  return equationArr;
};

try {
  // Process file
  const input = await readFile("./input.txt", "utf8");
  const equationArr = splitFile(input);

  let sum = 0;
  // Looping through all items in the equationArr.
  equationArr.forEach((item) => {
    const test = new Equation(item[0], item[1]);
    /* If the right answer is found by the .solved function, 
    the testvalue is added to the sum */
    if (test.solved()) {
      sum += item[0];
    }
  });
  console.log(sum);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
