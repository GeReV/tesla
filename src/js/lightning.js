import extend from 'extend';
import lerp from 'lerp';
import { interpolateLab } from 'd3-color';

import Vector from './vector.js';
import Line from './line.js';

const TAO = Math.PI * 2;

const defaults = {
  minSegmentLength: 6,
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
  hitRadius: 10
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
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    ctx.shadowBlur = this.options.glowBlur;
    ctx.shadowColor = this.options.glowColor;

    const pointCount = this.points.length;

    const colorFn = interpolateLab(this.options.lineStartColor, this.options.lineEndColor);

    this.points.slice(1).forEach((p, i) => {
      const t = i / pointCount,
            size = lerp(this.options.lineStartSize, this.options.lineEndSize, t),
            opacity = lerp(this.options.lineStartOpacity, this.options.lineEndOpacity, t);

      ctx.globalAlpha = opacity;
      ctx.lineWidth = size;
      ctx.strokeStyle = colorFn(t);

      ctx.lineTo(p.x, p.y);

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(p.x, p.y);
    });

    ctx.restore();
  }

  subdivide(points, line) {
    const lineLength = line.length();

    if (lineLength < this.options.minSegmentLength) {
      return points;
    }

    const center = line.center();

    const direction = line.direction() + (Math.random() - 0.5) * this.options.angleConstraint,
          distance = lineLength * (Math.random() * this.options.distanceFalloff);

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

    return half1.concat(half2);
  }
}
