export default class Vector {
  static zero() {
    return new Vector(0, 0);
  }

  constructor(x, y) {
    this.x = +x;
    this.y = +y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  direction() {
    if (this.x === 0) {
      if (this.y > 0) {
        return TAO * 0.25;
      } else if (this.y < 0) {
        return TAO * 0.75;
      }
    }

    return Math.atan(this.y / this.x);
  }

  normalize() {
    const length = this.length();

    if (length == 0) {
      return Vector.zero();
    }

    return new Vector(this.x / length, this.y / length);
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return this.add(other.flip());
  }

  multiply(other) {
    other = +other;

    return new Vector(this.x * other, this.y * other);
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  flip() {
    return this.multiply(-1);
  }
}
