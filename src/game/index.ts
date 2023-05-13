import Player from './Player';
import { GameObject } from './utils';

export default class Game {
  width: number;
  height: number;
  DEBUG = true;

  map = {
    width: 3000,
    height: 3000,
  };

  player: Player;
  object: GameObject;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.player = new Player(this);
    this.object = new GameObject(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    // draw game objects here
    // Object :
    this.object.draw(ctx);
    this.object.update();

    // Player :
    this.player.draw(ctx);
    this.player.update();

    ctx.restore();
  }
}
