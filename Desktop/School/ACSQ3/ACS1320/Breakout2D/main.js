/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions, no-undef, no-unused-vars */
import Sprite from './sprite.js';
import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Score from './score.js';
import Lives from './lives.js';
import Label from './label.js'; // Added missing import
import {
  canvas, ctx, brickHeight, brickWidth, brickRowCount, brickColumnCount,
  brickPadding, brickOffsetTop, brickOffsetLeft, paddleWidth,
  paddleHeight, ballRadius,
} from './constants.js';

const ball = new Ball(canvas.width / 2, canvas.height - 30, ballRadius);
const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight);
const score = new Score(8, 20);
const lives = new Lives(canvas.width - 65, 20);
const label = new Label(200, 150, 'Vive La France');

const bricks = []; // Moved this from constants.js to here

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
    const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
    bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score.increment();
          if (score.score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        brick.render(ctx);
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.move();
  paddle.move();
  drawBricks();
  ball.render(ctx);
  paddle.render(ctx);
  score.draw(ctx);
  lives.draw(ctx);
  collisionDetection();

  // Ball-wall collisions
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    // Ball-paddle collision logic update
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      const hitPosition = (ball.x - paddle.x) / paddleWidth - 0.5;
      ball.dx = hitPosition * 5; // Adjust horizontal speed based on hit position
      ball.dy = -ball.dy;
    } else {
      lives.decrement();
      if (lives.lives === 0) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.reset();
        paddle.x = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
