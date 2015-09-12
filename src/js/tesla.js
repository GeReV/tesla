import Line from './line.js';
import Lightning from './lightning.js';

const TAO = Math.PI * 2;

const randomRadius = 40;

export default class Tesla {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);

    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
    this.resizeCanvas();

    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {
    const canvas = this.canvas,
          ctx = this.ctx;

    window.requestAnimationFrame(this.render.bind(this));

    this.clear(ctx, canvas);

    this.renderBall(ctx, canvas);

    if (!this.mousedown) {
      return;
    }

    ctx.save();

    ctx.strokeStyle = '#fff';

    const direction = Math.random() * TAO,
          distance  = Math.random() * randomRadius;

    const lightning = new Lightning(
      canvas.width / 2,
      canvas.height / 2,
      Math.cos(direction) * distance + this.mouseX,
      Math.sin(direction) * distance + this.mouseY
    );

    lightning.render(ctx);

    ctx.restore();
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

  setMousePosition(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }
}
