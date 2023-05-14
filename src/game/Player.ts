import Game from '.';
import { Base2dObject } from './utils';

export default class Player extends Base2dObject {
  x = 250;
  y = 250;
  radius = 50;
  image: HTMLImageElement;
  angle = 0;
  canvasWidth: number;
  canvasHeight: number;
  game: Game;
  speed: 10;

  constructor(game: Game, x: number = 400, y: number = 400) {
    super();

    this.game = game;
    this.image = document.querySelector('img#wormface') as HTMLImageElement;
    this.canvasWidth = game.width;
    this.canvasHeight = game.height;

    this.x = game.width / 2 - this.radius; //x;
    this.y = game.height / 2 - this.radius; //y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Save the current canvas state
    ctx.save();

    // Translate to the center of the player image
    ctx.translate(this.x + this.radius, this.y + this.radius);

    // Rotate the canvas based on the player angle
    ctx.rotate(this.angle);

    // Draw the player image
    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );

    // Restore the canvas state
    ctx.restore();
  }

  update() {
    // Update the player
    const dx = this.x - window.mouse.x + this.radius;
    const dy = this.y - window.mouse.y + this.radius;

    this.angle = Math.atan2(dy, dx);

    // * Move the player
    this.move(dx, dy);

    // if (window.mouse.x !== this.x) {
    //   this.x -= dx / 30;
    // }
    // if (window.mouse.y !== this.y) {
    //   this.y -= dy / 30;
    // }
  }

  move(dx: number, dy: number) {
    // Move the player
    // this.x -= dx / 20;
    // this.y -= dy / 20;

    // Update the map position
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const visibleWidth = canvas.width / this.game.map.zoom;
    const visibleHeight = canvas.height / this.game.map.zoom;
    // this.game.map.x = this.x - visibleWidth / 2;
    // this.game.map.y = this.y - visibleHeight / 2;
    this.game.map.x -= dx / 10;
    this.game.map.y -= dy / 10;
  }
}
