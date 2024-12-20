"use strict";

import { readFile } from "fs/promises";

const processFile = async function () {
  const fileInput = await readFile("./input.txt", "utf8");
  return fileInput.split(/\r?\n/);
};

const getRules = function (arr) {
  const rulesRaw = arr.filter((str) => /^\d{1,2}\|\d{1,2}$/.test(str));
  const rulesSplit = rulesRaw.map((rule) => rule.split("|").map(Number));
  const mergedRules = Array.from({ length: 100 }, () => []);
  rulesSplit.forEach((rule) => {
    mergedRules[rule[1]].push(rule[0]);
  });
  return mergedRules;
};

const getManuals = function (arr) {
  let manualRaw = arr.filter(
    (str) => !/^\d{1,2}\|\d{1,2}$/.test(str) && str !== ""
  );
  const manualSplit = [];
  manualRaw.forEach((manual) => {
    manualSplit.push(manual.split(",").map(Number));
  });
  return manualSplit;
};

const getUnSafeManuals = function (rules, manuals) {
  const manualLen = manuals.length;
  let safeManuals = [];

  // Loop inside of all manuals
  for (let i = 0; i < manualLen; i++) {
    let safe = true;
    let copy = manuals[i].slice();
    let len = copy.length;
    // loop inside of single manual
    while (len > 1) {
      const index = copy[0];
      copy.shift();
      if (copy.some((num) => rules[index].includes(num))) {
        safe = false;
      }
      len--;
    }
    if (!safe) {
      safeManuals.push(manuals[i]);
    }
  }
  return safeManuals;
};

const makeSafeManuals = function (unsafeManuals, rules) {
  const safeManuals = [];

  // Process each unsafe manual
  for (let i = 0; i < unsafeManuals.length; i++) {
    const manual = unsafeManuals[i];
    const ordered = [];
    const remaining = manual.slice();

    // Keep going until we've placed all numbers
    while (remaining.length > 0) {
      // Find a number that has no dependencies in remaining numbers
      const nextIndex = remaining.findIndex(
        (num) => !remaining.some((otherNum) => rules[num].includes(otherNum))
      );

      // Add it to ordered list and remove from remaining
      ordered.push(remaining[nextIndex]);
      remaining.splice(nextIndex, 1);
    }

    safeManuals.push(ordered);
  }

  return safeManuals;
};

const getSum = function (arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    const middle = arr[i][Math.floor(arr[i].length / 2)];
    sum += middle;
  }
  return sum;
};

try {
  const arr = await processFile();
  const rules = getRules(arr);
  const unSafeManuals = getUnSafeManuals(rules, getManuals(arr));
  const safeManuals = makeSafeManuals(unSafeManuals, rules);
  const totalSum = getSum(safeManuals);
  console.log(totalSum);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
