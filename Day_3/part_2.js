"use strict";
import { promises as fs } from "fs";

/**
 * @returns String - The inputfile, converted to a string
 */
const processFile = async function () {
  const inputStr = await fs.readFile("./input.txt", "utf8");
  return inputStr;
};

const findDo = function (str) {
  let newStr = "";
  let copyMode = true;

  for (let i = 0; str[i]; i++) {
    if (str.startsWith("don't()", i)) {
      copyMode = false;
    } else if (str.startsWith("do()", i)) {
      copyMode = true;
    }
    if (copyMode) {
      newStr += str[i];
    }
  }
  return newStr;
};

/**
 * Finds all occurences of 'mul(...,...)' and returns
 * them as an array of strings
 * @param {str} str
 */
const findMuls = function (str) {
  // finds all occurences of 'mul(...,...)'
  const matches = str.match(/mul\(\d{1,3},\d{1,3}\)/g);

  // remove mul(), and the comma in between. Then convert to numbers.
  for (let i = 0; i < matches.length; i++) {
    matches[i] = matches[i]
      .replace(/[^0-9,]/g, "")
      .split(",")
      .map(Number);
  }
  return matches;
};

const multiplyNums = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][0] * arr[i][1];
  }
  return sum;
};

try {
  const fileString = await processFile();
  const doArr = findDo(fileString);
  const mulArr = findMuls(doArr);
  const sum = multiplyNums(mulArr);
  console.log(sum);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
