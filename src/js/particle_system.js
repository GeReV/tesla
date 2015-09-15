
export default class ParticleSystem {
  constructor(clazz, lifespan = null) {
    this.ParticleClass = clazz;

    this.particles = [];
    this.deadPool = [];

    this.particleLifespan = lifespan;
  }

  getParticle() {
    const particle = this.deadPool.length ?
        this.deadPool.shift() :
        new this.ParticleClass(0, 0, this.particleLifespan);

    particle.reset();

    this.particles.push(particle);

    return particle;
  }

  update(dt) {
    this.particles.forEach(p => p.update(dt));

    while (this.particles.length && this.particles[0].isDead()) {
      const deadParticle = this.particles.shift();

      this.deadPool.push(deadParticle);
    }
  }

  render(ctx) {
    this.particles.forEach(p => p.render(ctx));
  }
}
