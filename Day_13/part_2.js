import { readFile } from "fs/promises";

// Function to process the file and adjust prize positions according to the problem statement
const processFile = async function (file) {
  const values = (await readFile(file, "utf8"))
    .split(/\r?\n\r?\n/)
    .map((block) =>
      block.split(/\r?\n/).map((str) => {
        const numbers = str
          .match(/[XY][+=]?(\d+)/g)
          .map((match) => parseInt(match.replace(/[^0-9]/g, "")));
        return numbers;
      })
    )
    .map((machine) => {
      // Add 10000000000000 to the prize coordinates
      machine[2][0] += 10000000000000; // Update X of prize
      machine[2][1] += 10000000000000; // Update Y of prize
      return machine;
    });
  return values;
};

// Helper function to find the greatest common divisor
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Function to calculate minimum tokens needed for a machine
const calculatePushes = function (machine) {
  const [aX, aY] = machine[0]; // A button - 3 tokens
  const [bX, bY] = machine[1]; // B button - 1 token
  const [pX, pY] = machine[2]; // Prize positions

  // If target isn't divisible by GCD, no solution exists
  const gX = gcd(aX, bX);
  const gY = gcd(aY, bY);
  if (pX % gX !== 0 || pY % gY !== 0) {
    return 0;
  }

  // Try different combinations of A and B pushes
  let minTokens = Infinity;
  const maxPresses = 10000; // Significantly increase the search space

  for (let a = 0; a <= maxPresses; a++) {
    for (let b = 0; b <= maxPresses; b++) {
      if (a * aX + b * bX === pX && a * aY + b * bY === pY) {
        const tokens = a * 3 + b;
        minTokens = Math.min(minTokens, tokens);
      }
    }
  }

  return minTokens === Infinity ? 0 : minTokens;
};

// Main execution
try {
  const machines = await processFile("input.txt");
  let tokens = 0;

  machines.forEach((machine) => {
    tokens += calculatePushes(machine);
  });

  console.log(tokens);
} catch (error) {
  console.error(`ERROR: ${error.message}`);
}
