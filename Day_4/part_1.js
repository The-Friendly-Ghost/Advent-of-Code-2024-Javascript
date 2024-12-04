"use strict";

import { promises as fs } from "fs";

/**
 * @returns String - The inputfile, converted to a string
 */
const processFile = async function () {
  const str = await fs.readFile("./input.txt", "utf8");
  return str;
};

const horizontalCheck = function (word, arr, y, x) {
  let left = true;
  let right = true;

  for (let i = 1; word[i]; i++) {
    if (left && arr[y][x - i] !== word[i]) {
      left = false;
    }
    if (right && arr[y][x + i] !== word[i]) {
      right = false;
    }
  }
  return left + right;
};

const verticalCheck = function (word, arr, y, x) {
  let down = true;
  let up = true;
  let heigth = arr.length;

  for (let i = 1; word[i]; i++) {
    if (y - i < 0 || (up && arr[y - i][x] !== word[i])) {
      up = false;
    }
    if (y + i >= heigth || (down && arr[y + i][x] !== word[i])) {
      down = false;
    }
  }
  return up + down;
};

const diagonalCheck = function (word, arr, y, x) {
  let up_left = true;
  let up_right = true;
  let down_left = true;
  let down_right = true;
  let heigth = arr.length;

  for (let i = 1; word[i]; i++) {
    if (y - i < 0 || x - i < 0 || (up_left && arr[y - i][x - i] !== word[i])) {
      up_left = false;
    }
    if (y - i < 0 || (up_right && arr[y - i][x + i] !== word[i])) {
      up_right = false;
    }
    if (
      y + i >= heigth ||
      x - i < 0 ||
      (down_left && arr[y + i][x - i] !== word[i])
    ) {
      down_left = false;
    }
    if (y + i >= heigth || (down_right && arr[y + i][x + i] !== word[i])) {
      down_right = false;
    }
  }
  return up_left + up_right + down_left + down_right;
};

const searchWordsInArray = function (word, array) {
  let amount = 0;

  if (word === "") {
    throw "Word can't be empty";
  }
  for (let i = 0; i < array.length; i++) {
    for (let ii = 0; array[i][ii]; ii++) {
      if (array[i][ii] === "X") {
        amount += horizontalCheck("XMAS", array, i, ii);
        amount += verticalCheck("XMAS", array, i, ii);
        amount += diagonalCheck("XMAS", array, i, ii);
      }
    }
  }
  return amount;
};

try {
  const inputStr = await processFile();
  const arr = inputStr.split(/\r?\n/);
  const amount = searchWordsInArray("XMAS", arr);
  console.log(amount);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
