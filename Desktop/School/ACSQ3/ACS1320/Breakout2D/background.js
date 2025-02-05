class Background {
  constructor(color = '#eee') {
    this.color = color;
  }

  render(ctx, canvas) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

export default Background;
