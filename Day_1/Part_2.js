"use strict";

import { promises as fs } from "fs";

// path to input file
const inputFile = "./Day_1/input.txt";
const array1 = [];
const array2 = [];

const processFile = async function () {
  try {
    // We're reading the file from inputFile location.
    const data = await fs.readFile(inputFile);

    // First, we convert the datastream to a readable string
    const inputData = data.toString();

    // Split: splits the string into an array of strings. Split by the space character
    // filter removes empty strings.
    // Map then turns every sub-string into a number.
    const numbers = inputData
      .split(/\s+/)
      .filter((num) => num.trim() !== "")
      .map(Number);

    numbers.forEach((num, index) => {
      if (index % 2 === 0) {
        array1.push(num);
      } else {
        array2.push(num);
      }
    });

    // Now we sort both Arrays in ascending order
    array1.sort((a, b) => a - b);
    array2.sort((a, b) => a - b);
  } catch {
    throw new Error("Error processing file");
  }
};

const getSimilarityScore = function () {
  let similarityScore = 0;
  array1.forEach((num) => {
    let multiplier = 0;
    for (let i = 0; i < array2.length; i++) {
      if (num === array2[i]) multiplier++;
    }
    similarityScore += num * multiplier;
  });
  return similarityScore;
};

try {
  await processFile(); // Wait for processFile to complete
  console.log(`Similarity Score: ${getSimilarityScore()}`);
} catch (error) {
  console.error("An error occured: ", error.message);
}
