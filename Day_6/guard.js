"use strict";

export class Guard {
  // Direction: 1 = up, 2 = right, 3 = down, 4 = left
  constructor(arr) {
    if (arr[0] < 1 || arr[0] > 4)
      throw new Error("Constructor Guard - Direction not valid");
    if (arr[1] < 0 || arr[2] < 0)
      throw new Error("Constructor Guard - Position not valid");
    [this.direction, this.posY, this.posX] = arr;
    this.visited = new Set();
  }

  copy() {
    // Create new Map instance with all properties
    return new Guard([this.direction, this.posY, this.posX]);
  }

  position() {
    return [this.posY, this.posX];
  }

  next() {
    switch (this.direction) {
      case 1:
        return [this.posY - 1, this.posX];
      case 2:
        return [this.posY, this.posX + 1];
      case 3:
        return [this.posY + 1, this.posX];
      case 4:
        return [this.posY, this.posX - 1];
    }
  }
  hasVisited() {
    const currentState = `${this.posY},${this.posX},${this.direction}`;

    if (this.visited.has(currentState)) {
      return true;
    }
    return false;
  }
  walk() {
    this.visited.add(`${this.posY},${this.posX},${this.direction}`);
    switch (this.direction) {
      case 1:
        this.posY--;
        break;
      case 2:
        this.posX++;
        break;
      case 3:
        this.posY++;
        break;
      case 4:
        this.posX--;
        break;
    }
  }
  turn() {
    switch (this.direction) {
      case 1:
      case 2:
      case 3:
        this.direction++;
        break;
      case 4:
        this.direction = 1;
        break;
    }
  }
}
