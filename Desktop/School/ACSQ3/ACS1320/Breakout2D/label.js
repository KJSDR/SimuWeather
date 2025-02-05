/* eslint-disable import/extensions */
import Sprite from './sprite.js';

export default class Label extends Sprite {
  constructor(x, y, text, color = 'black') {
    super(x, y, 0, 0, color);
    this.text = text;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}
