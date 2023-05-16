import Game from '.';
import { Base2dObject } from './utils';

export default class Player extends Base2dObject {
  points = 0;
  x = 250;
  y = 250;
  radius = 30;
  image: HTMLImageElement;
  angle = 0;
  canvasWidth: number;
  canvasHeight: number;
  game: Game;
  minSpeed = 4;
  maxSpeed = 10;
  speed = 4;
  vx = 0;
  vy = 0;
  zoomInterval = 0;
  targetZoom = 0;
  deltaTime = 0;

  constructor(game: Game) {
    super();

    this.game = game;
    this.image = document.querySelector('img#wormface') as HTMLImageElement;
    this.canvasWidth = game.width;
    this.canvasHeight = game.height;
    this.width = this.height = this.radius * 2;

    this.x = game.width / 2 - this.radius;
    this.y = game.height / 2 - this.radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Save the current canvas state
    ctx.save();

    // Translate to the center of the player image
    ctx.translate(
      this.x + this.radius * this.game.map.zoom,
      this.y + this.radius * this.game.map.zoom
    );

    // Rotate the canvas based on the player angle
    ctx.rotate(this.angle);

    // Draw the player image
    ctx.drawImage(
      this.image,
      -this.radius * this.game.map.zoom,
      -this.radius * this.game.map.zoom,
      this.width * this.game.map.zoom,
      this.height * this.game.map.zoom
    );

    // Restore the canvas state
    ctx.restore();
  }

  update(deltaTime?: number) {
    if (deltaTime) {
      this.deltaTime = deltaTime;
    }

    // Update the player
    const dx = this.x - window.mouse.x + this.radius;
    const dy = this.y - window.mouse.y + this.radius;
    this.angle = Math.atan2(dy, dx);

    // * Move the player
    this.move();
  }

  move() {
    const currentZoom = this.game.map.zoom;
    const zoomMultiplier = currentZoom / 1;

    if (window.mouse.clicked) {
      this.speed = this.maxSpeed * zoomMultiplier;
      this.zoomTo(1.2);
    } else {
      this.speed = this.minSpeed * zoomMultiplier;
      this.zoomTo(1);
    }

    this.vx = this.speed * Math.cos(this.angle);
    this.vy = this.speed * Math.sin(this.angle);

    this.game.map.x -= this.vx;
    this.game.map.y -= this.vy;
  }

  zoomTo(targetZoom: number, duration: number = 200) {
    if (!this.deltaTime) return false;

    const zoomIncrement =
      (targetZoom - this.game.map.zoom) * (this.deltaTime / duration);
    this.game.map.zoom += zoomIncrement;
  }

  // * update points :
  addPoints(points: number) {
    this.points += points;
    const scoreElm = document.querySelector(
      '#scorePoints span'
    ) as HTMLSpanElement;

    scoreElm.textContent = this.points.toString();
  }

  resetPoints() {
    this.points = 0;
  }
}
