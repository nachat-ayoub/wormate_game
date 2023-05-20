// * BodyCircle Class
class BodyCircle {
  x: number;
  y: number;
  radius: number;
  delay: number;

  constructor(x: number, y: number, radius: number, delay: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.delay = delay;
  }

  update(playerPositions) {
    // Get the player position based on delay
    const playerPosition =
      playerPositions[Math.max(0, playerPositions.length - this.delay)];

    if (playerPosition) {
      // Update the circle's position based on player position
      this.x = playerPosition.x;
      this.y = playerPosition.y;
    }
  }

  draw(ctx) {
    // Render the circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}
