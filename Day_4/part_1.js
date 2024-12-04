"use strict";

import { promises as fs } from "fs";

/**
 * @returns String - The inputfile, converted to a string
 */
const processFile = async function () {
  const str = await fs.readFile("./input.txt", "utf8");
  return str;
};

try {
  const inputStr = await processFile();
  const arr = inputStr.split(/\r?\n/);
  const result = 
} catch (error) {
  console.error(`Error: ${error.message}`);
}
