// eslint-disable-next-line import/extensions
import Sprite from './sprite.js';

class Brick extends Sprite {
  constructor(x, y, width, height, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = 1;
  }
}

export default Brick;
