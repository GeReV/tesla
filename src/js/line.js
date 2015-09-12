import Vector from './vector.js';

export default class Line {
  constructor(x1, y1, x2, y2) {
    this.point1 = new Vector(x1, y1);
    this.point2 = new Vector(x2, y2);
  }

  asVector() {
    return this.point2
      .subtract(this.point1);
  }

  center() {
    return this.asVector()
      .multiply(0.5)
      .add(this.point1);
  }

  length() {
    return this.asVector()
      .length();
  }

  direction() {
    return this.asVector()
      .direction();
  }
}
