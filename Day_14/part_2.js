"use strict";

const TILES_X = 101;
const TILES_Y = 103;
const AllPositions = new Map();
let currentCount = 0;

// DOM Elements
const nextBtn = document.querySelector(".nextBtn");
const htmlMap = document.querySelector(".map-insert");
const counter = document.querySelector(".curCount");

// Parse file
const initializeRobots = async function () {
  const response = await fetch("input.txt");
  const text = await response.text();
  const robots = text
    .split(/\r?\n/)
    .map((line) =>
      line
        .match(/-?\d+,\d+|-?\d+/g)
        .flatMap((num) => num.split(",").map(Number))
    );

  return robots;
};

// Function to calculate next position on X or Y axis
const calculatePos = function (start, v, len) {
  const moved = v;
  const newPos = (moved + start) % len;
  return (newPos + len) % len;
};

const renderMap = function (arr) {
  htmlMap.innerHTML = ""; // Clear previous content
  arr.forEach((row) => {
    const listItem = document.createElement("li");
    const displayRow = row.map((num) => (num === 0 ? "_" : "X")).join(" "); // Replace 0 with a space
    listItem.textContent = displayRow;
    htmlMap.appendChild(listItem);
  });
  counter.textContent = currentCount;
};

// Check positions. Keep on looping while there is XXXXXXX in a row somewhere.
// This drastically narrows down options
const getNextPositions = function (robots) {
  let sevenInRow = false;
  while (!sevenInRow) {
    currentCount++;
    if (!AllPositions.has(currentCount)) {
      const arrCount = Array.from({ length: TILES_Y }, () =>
        Array(TILES_X).fill(0)
      );
      robots.forEach((robot) => {
        // Get new Y
        robot[1] = calculatePos(robot[1], robot[3], TILES_Y);
        // Get new X
        robot[0] = calculatePos(robot[0], robot[2], TILES_X);
        arrCount[robot[1]][robot[0]]++;
      });
      AllPositions.set(currentCount, arrCount);
      const flatString = AllPositions.get(currentCount)
        .flat()
        .map((num) => (num === 0 ? "_" : "X"))
        .join("");
      sevenInRow = flatString.includes("XXXXXXX");
    }
  }
  renderMap(AllPositions.get(currentCount));
};

// Initialize robots and set up event listeners
const setup = async () => {
  const robots = await initializeRobots();
  nextBtn.addEventListener("click", () => getNextPositions(robots));
};

// Call setup to initialize everything
setup();
