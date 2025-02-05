class Lives {
  constructor(x, y, initialLives = 3, color = '#0095DD', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.lives = initialLives;
    this.color = color;
    this.font = font;
  }

  decrement() {
    this.lives -= 1;
  }

  reset() {
    this.lives = 3;
  }

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}

export default Lives;
