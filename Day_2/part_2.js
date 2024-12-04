"use strict";

import { promises as fs } from "fs";

const processFile = async function () {
  try {
    // path to input file
    const inputFile = "./input.txt";
    // Read the file from inputFile location.
    const data = await fs.readFile(inputFile);

    // Convert the datastream to a readable string
    const inputData = data.toString();

    // Split: splits the string into an array of strings. Split on the newline
    // filter removes empty strings.
    const numbers = inputData
      .split(/\r?\n|\r/)
      .filter((num) => num.trim() !== "");

    // Now we split each substring into arrays of numbers
    const numArr = [];
    numbers.forEach((str) => {
      let arr = str.split(/\s+/).map(Number);
      numArr.push(arr);
    });
    return numArr;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Checks if a report is safe or not
 * @param {array} report A single array of numbers
 * @returns Boolean - true if report is safe, false if not safe
 */
const reportIsSafe = function (report) {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < report.length; i++) {
    // Check the difference between two numbers
    const diff = Math.abs(report[i - 1] - report[i]);
    if (diff < 1 || diff > 3) {
      return false;
    }
    // check if number is increasing or decreasing
    if (report[i - 1] > report[i]) {
      increasing = false;
    } else if (report[i - 1] < report[i]) {
      decreasing = false;
    }
  }
  // return true or false
  if (increasing || decreasing) {
    return true;
  }
  return false;
};

/**
 * Applies the problem dampener to check if a report is safe or not
 * @param {array} A single array of numbers
 * @returns Boolean - true if report is safe, false if not safe
 */
const problemDampener = function (report) {
  for (let i = 0; i < report.length; i++) {
    const tempArr = report.filter((num, index) => index !== i);
    if (reportIsSafe(tempArr)) {
      return true;
    }
  }
  return false;
};

/**
 * The main loop. First converts the inputfile to a 2D array of numbers.
 * Then, goes through this array to check for safe reports.
 */
try {
  let arrNum = await processFile();
  let safeReports = 0;

  // Check for safe reports
  for (let i = 0; i < arrNum.length; i++) {
    if (reportIsSafe(arrNum[i])) {
      safeReports++;
    } else if (problemDampener(arrNum[i])) {
      safeReports++;
    }
  }

  console.log(safeReports);
} catch (error) {
  console.error("An error occured: ", error.message);
}
