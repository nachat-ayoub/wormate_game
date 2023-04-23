import InputHandler from "./InputHandler";
import Player from "./Player";

export default class Game {
  width: number;
  height: number;
  lastKey: string;
  inputHandler: InputHandler;
  player: Player;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.lastKey = "";
    this.inputHandler = new InputHandler(this);

    this.player = new Player(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    this.player.draw(ctx);
    this.player.update();
  }
}
