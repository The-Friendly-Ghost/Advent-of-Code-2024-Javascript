import { readFile } from "fs/promises";

const convertFileStr = function (fileStr) {
  const len = fileStr.length;
  const blockStr = [];
  for (let i = 0; i < len; i++) {
    const num = Number(fileStr[i]);
    if (i % 2) {
      for (let ii = 0; ii < num; ii++) {
        blockStr.push(NaN);
      }
    } else {
      const id = Math.ceil(i / 2);
      for (let ii = 0; ii < num; ii++) {
        blockStr.push(id);
      }
    }
  }
  return blockStr;
};

const optimizeBlocks = function (arr) {
  const len = arr.length;
  let front = 0;
  let back = len - 1;
  // loop as long as front doesnt meet back iterator
  while (true) {
    while (!isNaN(arr[front]) && front < len) front++;
    while (isNaN(arr[back]) && back > 0) back--;
    if (front >= back) return;
    [arr[front], arr[back]] = [arr[back], arr[front]];
  }
};

const calculateSum = function (arr) {
  let sum = 0;
  for (let i = 0; !isNaN(arr[i]); i++) {
    sum += i * arr[i];
  }
  return sum;
};

try {
  const fileStr = [...(await readFile("input.txt", "utf8"))];
  const allBlocks = convertFileStr(fileStr);
  optimizeBlocks(allBlocks);
  const sum = calculateSum(allBlocks);
  console.log(sum);
} catch (error) {
  console.error(`Error: ${error.message}`);
}
