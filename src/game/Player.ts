import Game from ".";
import { GAME_CONTROLS } from "./utils";

export default class Player {
  width: number;
  height: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  game: Game;
  maxSpeed: number = 3;
  image: any;
  sprite: {
    pos: { x: number; y: number };
    size: { w: number; h: number };
  };

  constructor(game: Game) {
    this.width = 200;
    this.height = 200;
    this.x = 400;
    this.y = 0;

    this.speedX = 0;
    this.speedY = 0;
    this.game = game;
    this.image = document.querySelector("#player");
    this.sprite = {
      pos: { x: 0, y: 0 },
      size: { w: this.width, h: this.height },
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    // * Draw the player :
    ctx.drawImage(
      this.image,
      this.sprite.pos.x * this.width,
      this.sprite.pos.y * this.height,
      this.sprite.size.w,
      this.sprite.size.h,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.sprite.pos.x >= 30) {
      this.sprite.pos.x = 0;
    } else this.sprite.pos.x++;
  }

  update() {
    // * Update the player :
    this.move();
    this.x += this.speedX;
    this.y += this.speedY * 0.7;
  }

  checkMove(): { pressed: boolean; name: string } {
    return {
      pressed: this.game.lastKey.startsWith("P_"),
      name: this.game.lastKey.split("_")[1],
    };
  }

  move() {
    const move = this.checkMove();
    // * Move :
    if (move.name === GAME_CONTROLS.ARROW_RIGHT) {
      this.speedX = move.pressed ? this.maxSpeed : 0;
      this.sprite.pos.y = move.pressed ? 5 : 4;
    } else if (move.name === GAME_CONTROLS.ARROW_LEFT) {
      this.speedX = move.pressed ? -this.maxSpeed : 0;
      this.sprite.pos.y = move.pressed ? 3 : 2;
    } else if (move.name === GAME_CONTROLS.ARROW_DOWN) {
      this.speedY = move.pressed ? this.maxSpeed : 0;
      this.sprite.pos.y = move.pressed ? 1 : 0;
    } else if (move.name === GAME_CONTROLS.ARROW_UP) {
      this.speedY = move.pressed ? -this.maxSpeed : 0;
      this.sprite.pos.y = move.pressed ? 7 : 6;
    }

    // * check boundaries
    const topWall = 130; // ? margin to make game realistic
    const bottomWall = this.game.height - this.height;
    const leftWall = 0;
    const rightWall = this.game.width - this.width;

    if (this.y <= topWall) this.y = topWall;
    else if (this.y > bottomWall) this.y = bottomWall;

    if (this.x < leftWall) this.x = leftWall;
    else if (this.x > rightWall) this.x = rightWall;
  }
}
