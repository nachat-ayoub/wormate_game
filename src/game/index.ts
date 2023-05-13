import InputHandler from './InputHandler';
import Player from './Player';

export default class Game {
  width: number;
  height: number;
  lastKey: string;
  inputHandler: InputHandler;
  player: Player;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.player = new Player(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    //! Draw somthing
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(270, 300, 100, 100);

    this.player.draw(ctx);
    this.player.update();
  }
}
