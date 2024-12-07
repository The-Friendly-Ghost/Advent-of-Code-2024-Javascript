"use strict";

export class Map {
  constructor(map) {
    this.map = [...map];
    this.yLength = map.length;
    this.xLength = map[0].length;
  }

  copy() {
    // Create a deep copy of the map array
    const mapCopy = [...this.map.map((row) => [...row])];
    // Create new Map instance with all properties
    return new Map(mapCopy, this.yLength, this.xLength);
  }

  findGuard() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === "^") {
          return [1, y, x];
        } else if (this.map[y][x] === ">") {
          return [2, y, x];
        } else if (this.map[y][x] === "v") {
          return [3, y, x];
        } else if (this.map[y][x] === "<") {
          return [4, y, x];
        }
      }
    }
  }

  countX() {
    let count = 0;
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === "X") {
          count++;
        }
      }
    }
    return count;
  }

  destroyGuard(pos) {
    this.map[pos[0]][pos[1]] = "X";
  }

  print() {
    for (let row of this.map) {
      console.log(row.join("")); // joins all characters in the row with no space between them
    }
  }

  getChar(pos) {
    if (pos[0] < 0 || pos[0] >= this.yLength) {
      return "0";
    } else if (pos[1] < 0 || pos[1] >= this.xLength) {
      return "0";
    }
    return this.map[pos[0]][pos[1]];
  }

  setChar(pos) {
    if (this.map[pos[0]][pos[1]] !== "0") {
      this.map[pos[0]][pos[1]] = "X";
      return true;
    }
    return false;
  }
  setObstacle(pos) {
    this.map[pos[0]][pos[1]] = "#";
  }
}
