import Vector from './vector.js';

const TAO = Math.PI * 2;

export default class Particle {

  constructor(x = 0, y = 0, lifespan = null) {
    this.position = new Vector(x, y);

    this.lifespan = lifespan;

    this.reset();
  }

  reset() {
    this.age = 0;
  }

  update(dt) {
    this.age += dt;
  }

  render(ctx) {
    if (this.isDead()) {
      return;
    }

    ctx.save();

    ctx.fillStyle = '#fff';

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 1, 0, TAO);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
  }

  isDead() {
    return typeof this.lifespan === 'number' &&
      this.age >= this.lifespan;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
}
