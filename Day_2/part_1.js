"use strict";

import { promises as fs } from "fs";

// path to input file
const inputFile = "./Day_2/input.txt";
let numbers = [];
let safeReports = 0;

const processFile = async function () {
  try {
    // We're reading the file from inputFile location.
    const data = await fs.readFile(inputFile);

    // First, we convert the datastream to a readable string
    const inputData = data.toString();

    // Split: splits the string into an array of strings. Split on the newline
    // filter removes empty strings.
    numbers = inputData.split(/\r?\n|\r/).filter((num) => num.trim() !== "");

    /* checks each substring for: 
	1. The levels are either all increasing or all decreasing.
	2. Any two adjacent levels differ by at least one and at most three. */
    numbers.forEach((str) => {
      const arr = str.split(/\s+/).map(Number);
      let increasing = true;
      let decreasing = true;
      let diffValid = true;
      for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i - 1] - arr[i]);
        if (diff < 1 || diff > 3) {
          diffValid = false;
        }
        if (arr[i - 1] > arr[i]) {
          increasing = false;
        } else if (arr[i - 1] < arr[i]) {
          decreasing = false;
        }
      }
      if (diffValid && (increasing || decreasing)) {
        safeReports++;
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

try {
  await processFile();
  console.log(safeReports);
} catch (error) {
  console.error("An error occured: ", error.message);
}
