import Game from '..';

export const GAME_CONTROLS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Base2dObject {
  x: number;
  y: number;
  width: number;
  height: number;
  game: Game;
  deltaTime: number;

  draw(ctx: CanvasRenderingContext2D) {}
  update(deltaTime?: number) {
    if (deltaTime) {
      this.deltaTime = deltaTime;
    }
  }

  isVisible(): boolean {
    return (
      this.x + this.width > this.game.map.x &&
      this.x < this.game.map.x + window.innerWidth &&
      this.y + this.height > this.game.map.y &&
      this.y < this.game.map.y + window.innerHeight
    );
  }
}

export class GameObject2 extends Base2dObject {
  color: string;

  constructor(
    game: Game,
    x: number = randInt(630, 1400),
    y: number = randInt(800, 1200),
    size: number = randInt(100, 300),
    color: string = ['red', 'darkgreen', 'orange', 'lime'][randInt(0, 3)]
  ) {
    super();

    this.x = x;
    this.y = y;
    this.width = this.height = size;
    this.color = color;
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.isVisible()) {
      return;
    }

    const canvasX = (this.x - this.game.map.x) * this.game.map.zoom;
    const canvasY = (this.y - this.game.map.y) * this.game.map.zoom;

    const canvasWidth = this.width * this.game.map.zoom;
    const canvasHeight = this.height * this.game.map.zoom;

    ctx.fillStyle = this.color;
    ctx.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
  }

  update() {}
}

//
//
//
//
//
//
//
//
//
//
//
//
//

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
