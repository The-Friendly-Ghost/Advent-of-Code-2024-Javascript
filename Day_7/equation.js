"use strict";

export class Equation {
  constructor(total, nums) {
    this.total = total;
    this.nums = nums;
  }

  /**
   * Function that creates an array of numbers, either 1 or 0.
   * @param {*} num The number to convert to bits
   * @param {*} length The length of the array. Or in other words,
   * the amount of padding.
   * @returns An array with 0 and 1, representing the bit value of num
   */
  getBits(num, length) {
    const result = new Array(length);
    for (let i = length - 1; i >= 0; i--) {
      result[i] = num & 1; // get last bit
      num >>= 1; // shift right
    }
    return result;
  }

  /**
   * Function that checks if a test value can be created with the
   * provided array of numbers and a + or * operator.
   * @returns True, if equation is solved. Otherwise false.
   */
  solved() {
    // The amount of numbers and operators
    const numsAmount = this.nums.length;
    const operatorAmount = numsAmount - 1;
    // Looping must be done for up to 2^operatorAmount combinations
    for (let i = 0; i < 2 ** operatorAmount; i++) {
      /* Iterator value will be converted to a bit value in 
      an array. For example, i = 5 could be [0, 0, 0, 1, 0, 1] */
      const bits = this.getBits(i, operatorAmount);
      // 0 = +-operator - 1 = *-operator
      let sum = this.nums[0];
      for (let ii = 0; ii < operatorAmount; ii++) {
        bits[ii] ? (sum += this.nums[ii + 1]) : (sum *= this.nums[ii + 1]);
      }
      if (sum === this.total) {
        return true;
      }
    }
    return false;
  }
}
