import { readFile } from "fs/promises";

/* First the file is split in blocks (machines).
Then, this blocks are split in lines (A, B, prize).
Then, the numbers are extracted from the lines.
Then, the numbers (chars) are converted to actual numbers.
Last, the line is replaced with the new numbers array
*/
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
    );
  return values;
};

// Helper function to find greatest common divisor
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

  // Setting minTokens to maximum number for the start
  let minTokens = Infinity;
  // Try different combinations of A and B pushes
  // We estimate no more than 100 pushes needed as per the problem statement
  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      // Check if this combination reaches the target position
      if (a * aX + b * bX === pX && a * aY + b * bY === pY) {
        // Calculate tokens needed: 3 tokens for A, 1 token for B
        const tokens = a * 3 + b;
        minTokens = Math.min(minTokens, tokens);
      }
    }
  }

  // Return 0 if no solution found within 100 pushes, otherwise return minimum tokens
  return minTokens === Infinity ? 0 : minTokens;
};

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
