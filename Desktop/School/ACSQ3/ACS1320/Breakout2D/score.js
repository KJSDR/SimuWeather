class Score {
  constructor(x, y, color = '#0095DD', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.color = color;
    this.font = font;
  }

  increment() {
    this.score += 1;
  }

  reset() {
    this.score = 0;
  }

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }
}

export default Score;
