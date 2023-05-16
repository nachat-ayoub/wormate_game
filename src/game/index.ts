import Player from './Player';
import { GameObject, Food, randInt } from './utils';

declare global {
  interface Window {
    canvas: HTMLCanvasElement;
    mouse: {
      x: number;
      y: number;
      clicked: boolean;
    };
  }
}

export default class Game {
  width: number;
  height: number;
  DEBUG = true;
  margin = 400;
  map = {
    width: 2692,
    height: 1954,
    visibleWidth: 0,
    visibleHeight: 0,
    x: 1000,
    y: 1000,
    zoom: 1, // Customize this ratio as needed
  };

  player: Player;
  foodObjects: Food[];
  foodTimer = 0;
  maxFoodInMap = 20;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.player = new Player(this);
    this.foodObjects = [new Food(this)];
  }

  spawnFood() {
    for (let i = 0; i < randInt(5, 10); i++) {
      if (this.foodObjects.length === this.maxFoodInMap) break;
      else {
        setTimeout(() => {
          this.foodObjects.push(new Food(this));
        }, randInt(0, 6) * 1000);
      }
    }
  }

  foodSpawnTimer(deltaTime: number, cb: () => void, interval: number = 6) {
    // Update the timer
    this.foodTimer += deltaTime;

    // Check if 6 seconds have elapsed
    if (this.foodTimer >= interval * 1000) {
      // 6000 milliseconds = 6 seconds
      // Perform the action
      cb();

      // Reset the timer
      this.foodTimer = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D, deltaTime: number) {
    console.log(this.foodObjects);
    ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    // Calculate the visible width and height of the map based on the current zoom level and canvas size
    this.map.visibleWidth = window.innerWidth / this.map.zoom;
    this.map.visibleHeight = window.innerHeight / this.map.zoom;

    // * check map bounderies :
    this.map.x = Math.max(
      0,
      Math.min(this.map.x, this.map.width - this.map.visibleWidth)
    );
    this.map.y = Math.max(
      0,
      Math.min(this.map.y, this.map.height - this.map.visibleHeight)
    );

    // console.log({ this.map.x, this.map.y });

    // Draw only the visible portion of the map at the center of the canvas
    ctx.drawImage(
      document.getElementById('mapImage') as HTMLImageElement,
      this.map.x,
      this.map.y,
      this.map.visibleWidth,
      this.map.visibleHeight,
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    this.foodSpawnTimer(deltaTime, () => this.spawnFood(), randInt(6, 10));

    // Draw an object
    for (const object of this.foodObjects) {
      if (object.shouldBeRemoved) {
        this.foodObjects.splice(this.foodObjects.indexOf(object), 1);
      } else {
        object.draw(ctx, deltaTime);
        object.update();
      }
    }

    // Draw the player
    this.player.draw(ctx);
    this.player.update(deltaTime);
  }
}
