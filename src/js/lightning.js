import extend from 'extend';
import lerp from 'lerp';
import { interpolateLab } from 'd3-color';

import Vector from './vector.js';
import Line from './line.js';

const TAO = Math.PI * 2;

const defaults = {
  minSegmentLength: 10,
  distanceFalloff: 0.4,
  angleConstraint: TAO * 0.4,
  lineStartSize: 1.4,
  lineEndSize: 0.8,
  lineStartColor: '#fbf2ff',
  lineEndColor: '#dea1ea',
  lineStartOpacity: 1,
  lineEndOpacity: 0.2,
  glowColor: '#d471e8',
  glowBlur: 5,
  hitRadius: 10,
  forkProbability: 0.02,
  forkLength: 150
};

export default class Lightning {
  constructor(x1, y1, x2, y2, options) {
    this.options = extend({}, defaults, options || {});

    const distance = Math.random() * this.options.hitRadius,
          direction = Math.random() * TAO;

    x2 += Math.cos(direction) * distance;
    y2 += Math.sin(direction) * distance;

    const line = new Line(x1, y1, x2, y2);

    this.points = [line.point1, line.point2];

    this.points = this.subdivide(this.points, line);

    this.colorFn = interpolateLab(this.options.lineStartColor, this.options.lineEndColor);
    this.sizeFn = lerp.bind(this, this.options.lineStartSize, this.options.lineEndSize);
    this.opacityFn = lerp.bind(this, this.options.lineStartOpacity, this.options.lineEndOpacity);

    this.forks = this.createForks();
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    ctx.shadowBlur = this.options.glowBlur;
    ctx.shadowColor = this.options.glowColor;

    const pointCount = this.points.length;

    this.points.slice(1).forEach((p, i) => {
      const t = i / pointCount;

      ctx.globalAlpha = this.opacityFn(t);
      ctx.lineWidth = this.sizeFn(t);
      ctx.strokeStyle = this.colorFn(t);

      ctx.lineTo(p.x, p.y);

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(p.x, p.y);
    });

    ctx.restore();

    this.forks.forEach(l => l.render(ctx));
  }

  subdivide(points, line) {
    const lineLength = line.length();

    if (lineLength < this.options.minSegmentLength) {
      return points;
    }

    const center = line.center();

    const direction = line.direction() + (Math.random() - 0.5) * this.options.angleConstraint,
          distance = lineLength * (0.1 + Math.random() * 0.9) * this.options.distanceFalloff;

    const offset = new Vector(
      Math.cos(direction) * distance,
      Math.sin(direction) * distance
    );

    points = [points[0], center.add(offset), points[1]];

    const half1 = this.subdivide(
      points.slice(0, 2),
      new Line(points[0].x, points[0].y, points[1].x, points[1].y)
    );
    const half2 = this.subdivide(
      points.slice(1, 3),
      new Line(points[1].x, points[1].y, points[2].x, points[2].y)
    );

    return half1.concat(half2.slice(1)); // half2's first point is the same as half1'x last point, we don't want that duplication.
  }

  createForks() {

    const forks = [];

    if (this.options.forkProbability === null) {
      return forks;
    }

    this.points.slice(1).forEach((p, i) => {
      if (Math.random() > this.options.forkProbability) {
        return;
      }

      const t = i / this.points.length;

      const currentDirection = this.points[i] // i already points to the previous point, no need to subtract.
        .subtract(p)
        .direction();

      const distance = this.options.forkLength * 0.2 + Math.random() * this.options.forkLength * 0.8,
            direction = currentDirection + (Math.random() - 0.5) * this.options.angleConstraint;

      const x2 = p.x + Math.cos(direction) * distance,
            y2 = p.y + Math.sin(direction) * distance;

      forks.push(new Lightning(p.x, p.y, x2, y2, {
        lineStartSize: this.sizeFn(t),
        lineStartColor: this.colorFn(t),
        lineStartOpacity: this.opacityFn(t),
        lineEndSize: 0,
        glowBlur: this.options.glowBlur * 0.8,
        forkProbability: null
      }));
    });

    return forks;
  }
}
