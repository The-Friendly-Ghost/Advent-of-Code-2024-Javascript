"use strict";

import { promises as fs } from "fs";

/**
 * @returns String - The inputfile, converted to a string
 */
const processFile = async function () {
  const str = await fs.readFile("./input.txt", "utf8");
  return str;
};

const diagonalCheck = function (arr, y, x) {
  if (y <= 0 || y >= arr.length - 1) {
    return 0;
  } else if (x <= 0 || x >= arr[0].length) {
    return 0;
  }

  let diagonal_one = false;
  let diagonal_two = false;
  // Check first diagonal
  if (arr[y - 1][x - 1] === "M" && arr[y + 1][x + 1] === "S") {
    diagonal_one = true;
  } else if (arr[y - 1][x - 1] === "S" && arr[y + 1][x + 1] === "M") {
    diagonal_one = true;
  }
  // Check second diagonal
  if (arr[y + 1][x - 1] === "M" && arr[y - 1][x + 1] === "S") {
    diagonal_two = true;
  } else if (arr[y + 1][x - 1] === "S" && arr[y - 1][x + 1] === "M") {
    diagonal_two = true;
  }

  return diagonal_one && diagonal_two;
};

const searchWordsInArray = function (array) {
  let amount = 0;

  for (let i = 0; i < array.length; i++) {
    for (let ii = 0; array[i][ii]; ii++) {
      if (array[i][ii] === "A") {
        amount += diagonalCheck(array, i, ii);
      }
    }
  }
  return amount;
};

try {
  const inputStr = await processFile();
  const arr = inputStr.split(/\r?\n/);
  const amount = searchWordsInArray(arr);
  console.log(amount);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
