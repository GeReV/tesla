import Lightning from './lightning.js';
import ParticleSystem from './particle_system.js';
import HitParticle from './hit_particle.js';

const TAO = Math.PI * 2;

export default class Tesla {
  constructor(canvas) {
    this.lastTime = 0;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);

    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    this.resizeCanvas();

    this.particles = new ParticleSystem(HitParticle, 1000);

    this.loop();
  }

  loop(time = 0) {
    window.requestAnimationFrame(this.loop.bind(this));

    this.render(time - this.lastTime);

    this.lastTime = time;
  }

  render(dt) {
    const canvas = this.canvas,
          ctx = this.ctx;

    this.clear(ctx, canvas);

    if (this.mousedown) {
      this.renderLightning(ctx);

      this.renderHit();
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    this.particles.update(dt);
    this.particles.render(ctx);

    ctx.restore();

    this.renderBall(ctx, canvas);
  }

  renderLightning(ctx) {
    const canvas = this.canvas;

    const lightning = new Lightning(
      canvas.width / 2,
      canvas.height / 2,
      this.mouseX,
      this.mouseY
    );

    lightning.render(ctx);
  }

  renderHit() {
    const particle = this.particles.getParticle();

    particle.setPosition(this.mouseX, this.mouseY);
  }

  renderBall(ctx, canvas) {
    ctx.save();

    ctx.fillStyle = '#fff';

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, TAO);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
  }

  clear(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleMouseDown(e) {
    this.mousedown = !!(e.buttons & 1);

    this.setMousePosition(e);
  }

  handleMouseUp(e) {
    this.mousedown = !!(e.buttons & 1);
  }

  handleMouseMove(e) {
    this.setMousePosition(e);
  }

  handleTouchStart(e) {
    this.mousedown = !!e.changedTouches.length;
  }

  handleTouchEnd(e) {
    this.mousedown = e.changedTouches.length === 0;
  }

  handleTouchMove(e) {
    // TODO: Handle multi-touch.
    this.setMousePosition(e.changedTouches[0]);
  }

  setMousePosition(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }
}
