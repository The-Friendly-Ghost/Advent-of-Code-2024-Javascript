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

const findEmptyBlock = function (arr, numLength, numBegin) {
  for (let i = 0; i <= numBegin; ) {
    while (!isNaN(arr[i]) && i < numBegin) {
      i++;
    }
    if (i >= numBegin) {
      return NaN;
    }

    const begin = i;
    let emptyCount = 0;
    while (isNaN(arr[i]) && i < numBegin) {
      emptyCount++;
      i++;
    }

    if (emptyCount >= numLength) {
      return begin;
    }
  }
  return NaN;
};

const optimizeBlocks = function (arr) {
  const len = arr.length;
  let numEnd = len - 1;
  let numLength;

  // 1 loop over entire arr array from back to front
  while (numEnd >= 0) {
    // ===== Searching number block ==== //

    /* 2. keep decrementing back, until a number is found. 
    this sets the end-index of the number block */
    while (isNaN(arr[numEnd]) && numEnd >= 0) {
      numEnd--;
    }
    if (numEnd <= 0) return;
    /* 3. Keep decrementing until we find the beginning
    of the number block */
    let numBegin = numEnd;
    const currentNum = arr[numEnd];
    while (numBegin >= 0 && arr[numBegin] === currentNum) {
      numBegin--;
    }
    numBegin++; // Adjust to start of block

    /* 4. Set num block length */
    numLength = numEnd - numBegin + 1;

    // ===== Searching empty block ==== //
    const nanBegin = findEmptyBlock(arr, numLength, numBegin);

    // Swap values, if empty block is found.
    if (!isNaN(nanBegin)) {
      for (let i = 0; i < numLength; i++) {
        [arr[numBegin + i], arr[nanBegin + i]] = [
          arr[nanBegin + i],
          arr[numBegin + i],
        ];
      }
    }
    numEnd = numBegin - 1;
  }
};

const calculateSum = function (arr) {
  let sum = 0;
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!isNaN(arr[i])) {
      sum += i * arr[i];
    }
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
