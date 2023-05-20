import { Game } from '../app';

export default class Player {
  x: number = 0;
  y: number = 0;
  velocityX: number = 0;
  velocityY: number = 0;
  radius: number;
  color: string;
  speed = 3;
  game: Game;
  bodyPartGap = 10;
  bodyParts: BodyPart[];
  length = 100;

  constructor(game: Game, x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.game = game;
    this.bodyParts = [];
  }

  update() {
    this.radius = this.length / 6;

    this.calculateVelocity();

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.checkFoodCollision();
    this.checkBoundaryCollision();

    // Update body parts' positions
    for (let i = this.bodyParts.length - 1; i > 0; i--) {
      const previousPart = this.bodyParts[i - 1];
      this.bodyParts[i].x = previousPart.x;
      this.bodyParts[i].y = previousPart.y;
    }
    if (this.bodyParts.length > 0) {
      this.bodyParts[0].x = this.x;
      this.bodyParts[0].y = this.y;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw body parts
    for (let i = this.bodyParts.length - 1; i > 0; i--) {
      this.bodyParts[i].draw(ctx);
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  calculateVelocity() {
    // Calculate the distance between the current and previous mouse positions
    const mouseDeltaX = this.game.mouse.x - this.game.mouse.prevX;
    const mouseDeltaY = this.game.mouse.y - this.game.mouse.prevY;

    // Check if the mouse is moving
    const isMouseMoving = mouseDeltaX !== 0 || mouseDeltaY !== 0;
    console.log(isMouseMoving);

    // Update the player's velocity based on the mouse movement
    if (isMouseMoving) {
      // Calculate the angle between the player and the mouse position
      const dx = this.game.mouse.x - this.x;
      const dy = this.game.mouse.y - this.y;

      const angle = Math.atan2(dy, dx);

      // Calculate the velocity components based on the angle and speed
      this.velocityX = Math.cos(angle) * this.speed;
      this.velocityY = Math.sin(angle) * this.speed;
    } else {
      // Set the player's velocity to zero when the mouse is not moving
      // this.velocityX = 0;
      // this.velocityY = 0;
    }
  }

  checkFoodCollision() {
    for (let i = 0; i < this.game.foods.length; i++) {
      const food = this.game.foods[i];
      if (
        this.x - this.radius < food.x + food.radius &&
        this.x + this.radius > food.x - food.radius &&
        this.y - this.radius < food.y + food.radius &&
        this.y + this.radius > food.y - food.radius
      ) {
        // Collision detected with food
        // Remove the food object from the game
        this.game.foods.splice(i, 1);

        // Increase the player's size (e.g., by incrementing the radius)
        this.radius += 0.1;
        this.addBodyPart();

        // Add any other logic you want to perform when the player consumes food
      }
    }
  }

  checkBoundaryCollision() {
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    } else if (this.x + this.radius > this.game.width) {
      this.x = this.game.width - this.radius;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
    } else if (this.y + this.radius > this.game.height) {
      this.y = this.game.height - this.radius;
    }
  }

  addBodyPart() {
    const lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
    let x = lastBodyPart ? lastBodyPart.x : this.x;
    let y = lastBodyPart ? lastBodyPart.y : this.y;

    // Calculate new position with the body part gap
    x -= Math.sign(this.velocityX) * (this.radius + this.bodyPartGap);
    y -= Math.sign(this.velocityY) * (this.radius + this.bodyPartGap);

    let color = 0;

    if (lastBodyPart && lastBodyPart?.color != 4) {
      color = lastBodyPart?.color + 1;
    }

    const bodyPart = new BodyPart(this, x, y, color);
    this.bodyParts.push(bodyPart);
  }
}

class BodyPart {
  x: number;
  y: number;
  radius: number;
  colors = ['lime', 'lime', 'lime', 'darkgreen', 'darkgreen'];
  color: number;
  player: Player;

  constructor(player: Player, x: number, y: number, color: number) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.colors[this.color];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.player.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
