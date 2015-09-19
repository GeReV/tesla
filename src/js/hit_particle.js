import Particle from './particle.js';

const radius = 15;

export default class HitParticle extends Particle {

  constructor(x, y, lifespan) {
    super(x, y, lifespan);

    this.setRadius(radius);
  }

  render(ctx) {
    if (this.isDead()) {
      return;
    }

    const gradient = ctx.createRadialGradient(
      this.position.x,
      this.position.y,
      this.radius,
      this.position.x,
      this.position.y,
      0);

    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, '#bbbaff');

    ctx.save();

    ctx.globalAlpha = (this.lifespan - this.age) / this.lifespan;

    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.position.x - this.radius,
      this.position.y - this.radius,
      this.position.x + this.radius,
      this.position.y + this.radius
    );

    ctx.restore();
  }

  setRadius(r) {
    this.radius = r;
  }
}
