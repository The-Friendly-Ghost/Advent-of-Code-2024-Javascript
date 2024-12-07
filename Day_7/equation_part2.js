"use strict";

/* Got some help from Claude 3.5 Sonnet for the helper
function and the overall logic needed for this part 2. */

export class Equation {
  constructor(total, nums) {
    this.total = total;
    this.nums = nums;
  }

  /**
   * Converts a number to base-3 digits
   * @param {number} num - The number to convert
   * @param {number} length - The length of the result array
   * @returns {Array} Array of base-3 digits (0, 1, or 2)
   */
  getBase3Digits(num, length) {
    const digits = new Array(length).fill(0);
    for (let i = length - 1; i >= 0; i--) {
      digits[i] = num % 3;
      num = Math.floor(num / 3);
    }
    return digits;
  }

  /**
   * Function that checks if a test value can be created with the
   * provided array of numbers and a +, * or || operator.
   * @returns True, if equation is solved. Otherwise false.
   */
  solved() {
    // The amount of numbers and operators
    const numsAmount = this.nums.length;
    const operatorAmount = numsAmount - 1;
    // Looping must be done for up to 2^operatorAmount combinations
    for (let i = 0; i < 3 ** operatorAmount; i++) {
      /* Iterator value will be converted to a base 3 array. */
      const operators = this.getBase3Digits(i, operatorAmount);
      // 0 = +-operator - 1 = *-operator
      let sum = this.nums[0];
      for (let ii = 0; ii < operatorAmount; ii++) {
        switch (operators[ii]) {
          case 0: // Addition
            sum += this.nums[ii + 1];
            break;
          case 1: // Multiplication
            sum *= this.nums[ii + 1];
            break;
          case 2: // Concatenation
            sum = Number(`${sum}${this.nums[ii + 1]}`);
            break;
        }
      }
      if (sum === this.total) {
        return true;
      }
    }
    return false;
  }
}
