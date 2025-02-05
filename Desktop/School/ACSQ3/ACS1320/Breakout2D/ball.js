// eslint-disable-next-line import/extensions
import Sprite from './sprite.js';
// eslint-disable-next-line import/extensions
import { canvas } from './constants.js';

class Ball extends Sprite {
  constructor(x, y, radius = 10, color = '#0095DD') {
    super(x, y, 0, 0, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
