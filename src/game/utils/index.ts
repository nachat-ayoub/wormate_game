import Game from '..';

export const GAME_CONTROLS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

export class Base2dObject {
  x: number;
  y: number;
  width: number;
  height: number;

  draw(ctx: CanvasRenderingContext2D) {}
  update() {}
}

export class GameObject extends Base2dObject {
  x: number;
  y: number;
  width: number;
  height: number;
  game: Game;

  constructor(
    game: Game,
    {
      x = 300,
      y = 300,
      width = 100,
      height = 300,
    }: { x?: number; y?: number; width?: number; height?: number } = {
      x: 300,
      y: 300,
      width: 100,
      height: 300,
    }
  ) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(270, 300, 100, 100);
  }
}
