import Game from '..';
import { ISprite } from './types';

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

  draw(ctx: CanvasRenderingContext2D, deltaTime?: number) {}
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

export class Food extends Base2dObject {
  sprite: ISprite;
  points = 10;
  image: HTMLImageElement;
  canvasX = 0;
  canvasY = 0;
  canvasWidth = 0;
  canvasHeight = 0;

  maxSpawningTime: number; // * in seconds
  shouldBeRemoved = false;
  spawned: Date;

  constructor(
    game: Game,
    image: string = ['pizza', 'cake', 'coin'][randInt(0, 2)],
    x: number = randInt(game.margin, game.map.width - game.margin),
    y: number = randInt(game.margin, game.map.height - game.margin)
  ) {
    super();

    this.maxSpawningTime = randInt(10, 15); // * in seconds
    this.spawned = new Date();
    this.image = document.querySelector(`#${image}-sprite`) as HTMLImageElement;
    this.width = this.height = 100;
    this.game = game;
    this.x = x;
    this.y = y;

    this.sprite = createSprite({
      width: 150,
      height: 150,
      image: this.image,
      maxFrames: 7,
      fps: 15,
    });
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
    if (!this.isVisible()) {
      return;
    }

    this.canvasX = (this.x - this.game.map.x) * this.game.map.zoom;
    this.canvasY = (this.y - this.game.map.y) * this.game.map.zoom;

    this.canvasWidth = this.width * this.game.map.zoom;
    this.canvasHeight = this.height * this.game.map.zoom;

    ctx.drawImage(
      this.sprite.image,
      this.sprite.frameX * this.sprite.width,
      this.sprite.frameY * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.canvasX,
      this.canvasY,
      this.canvasWidth,
      this.canvasHeight
    );

    this.sprite.animate(deltaTime);
  }

  update() {
    if (this.isCollidingWithPlayer()) {
      this.game.player.addPoints(this.points);
      this.removeFood();
    } else if (this.foodExpired()) {
      this.removeFood();
    }
  }

  foodExpired() {
    return dateDiff(this.spawned, new Date()) > this.maxSpawningTime;
  }

  removeFood() {
    this.shouldBeRemoved = true;
  }

  isCollidingWithPlayer() {
    // * Object Boundaries :
    const top = this.canvasY;
    const left = this.canvasX;
    const right = this.canvasX + this.canvasWidth;
    const bottom = this.canvasY + this.canvasHeight;

    // * Player Boundaries :
    const playerTop = this.game.height / 2 - this.game.player.height / 2;
    const playerLeft = this.game.width / 2 - this.game.player.width / 2;
    const playerRight = this.game.width / 2 + this.game.player.width / 2;
    const playerBottom = this.game.height / 2 + this.game.player.height / 2;

    // Check for collision
    return (
      right >= playerLeft &&
      left <= playerRight &&
      bottom >= playerTop &&
      top <= playerBottom
    );
  }
}

//
//
//
//

export function createSprite(
  sprite: Omit<
    ISprite,
    'animate' | 'frameX' | 'frameY' | 'frameInterval' | 'frameTimer'
  >
): ISprite {
  return {
    ...sprite,
    frameX: 0,
    frameY: 0,
    frameInterval: 1000 / sprite.fps,
    frameTimer: 0,
    animate(deltaTime: number) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrames) {
          this.frameX++;
        } else this.frameX = 0;

        this.frameTimer = 0;
      } else this.frameTimer += deltaTime;
    },
  };
}

//
//
//
//
//

export function dateDiff(startDate: Date, endDate: Date) {
  const differenceInMilliseconds = startDate.getTime() - endDate.getTime();
  const differenceInSeconds = Math.abs(
    Math.floor(differenceInMilliseconds / 1000)
  );

  return differenceInSeconds;
}
