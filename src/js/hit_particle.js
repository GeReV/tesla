import Particle from './particle.js';

const radius = 15;

export default class HitParticle extends Particle {
  render(ctx) {
    if (this.isDead()) {
      return;
    }

    const gradient = ctx.createRadialGradient(
      this.position.x,
      this.position.y,
      radius,
      this.position.x,
      this.position.y,
      0);

    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, '#bbbaff');

    ctx.save();

    ctx.globalAlpha = (this.lifespan - this.age) / this.lifespan;

    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.position.x - radius,
      this.position.y - radius,
      this.position.x + radius,
      this.position.y + radius
    );

    ctx.restore();
  }
}
