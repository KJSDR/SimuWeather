// eslint-disable-next-line import/extensions
import Ball from './ball.js';
// eslint-disable-next-line import/extensions
import Paddle from './paddle.js';
// eslint-disable-next-line import/extensions
import Brick from './brick.js';
// eslint-disable-next-line import/extensions
import Score from './score.js';
// eslint-disable-next-line import/extensions
import Lives from './lives.js';
// eslint-disable-next-line import/extensions
import {
  // eslint-disable-next-line import/extensions, max-len
  canvas, ctx, paddleWidth, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop,
// eslint-disable-next-line import/extensions
} from './constants.js';

class Game {
  constructor() {
    this.ball = new Ball(canvas.width / 2, canvas.height - 30);
    this.paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - 10, paddleWidth, 10);
    this.score = new Score(8, 20);
    this.lives = new Lives(canvas.width - 65, 20);
    this.bricks = [];
    this.gameRunning = false;

    this.createBricks();
  }

  createBricks() {
    // eslint-disable-next-line no-plusplus
    for (let c = 0; c < brickColumnCount; c++) {
      this.bricks[c] = [];
      // eslint-disable-next-line no-plusplus
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }

  drawBricks() {
    // eslint-disable-next-line no-plusplus
    for (let c = 0; c < brickColumnCount; c++) {
      // eslint-disable-next-line no-plusplus
      for (let r = 0; r < brickRowCount; r++) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }

  draw() {
    if (!this.gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawBricks();
    this.ball.move();
    this.paddle.move();

    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.score.draw(ctx);
    this.lives.draw(ctx);

    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => this.draw());
  }

  start() {
    if (!this.gameRunning) {
      this.gameRunning = true;
      this.draw();
    }
  }
}

export default Game;
