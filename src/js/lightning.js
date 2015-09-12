import Vector from './vector.js';
import Line from './line.js';

const TAO = Math.PI * 2;

const MIN_LENGTH = 5;

const DISTANCE_FALLOFF = 0.4;
const ANGLE_CONSTRAINT = TAO * 0.4;

export default class Lightning {
  constructor(x1, y1, x2, y2) {
    const line = new Line(x1, y1, x2, y2);

    this.points = [line.point1, line.point2];

    this.points = this.subdivide(this.points, line);
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    this.points.slice(1).forEach((p) => {
      ctx.lineTo(p.x, p.y);
    });

    ctx.stroke();

    ctx.restore();
  }

  subdivide(points, line) {
    if (line.length() < MIN_LENGTH) {
      return points;
    }

    const center = line.center();

    const direction = line.direction() + (Math.random() - 0.5) * ANGLE_CONSTRAINT,
          distance = line.length() * (Math.random() * DISTANCE_FALLOFF);

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
