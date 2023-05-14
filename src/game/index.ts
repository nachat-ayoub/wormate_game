import Player from './Player';
import { GameObject } from './utils';

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

  map = {
    width: 2692,
    height: 1954,
    visibleWidth: 0,
    visibleHeight: 0,
    x: 0,
    y: 0,
    zoom: 1, // Customize this ratio as needed
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
    ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    // Calculate the visible width and height of the map based on the current zoom level and canvas size
    this.map.visibleWidth = window.innerWidth / this.map.zoom;
    this.map.visibleHeight = window.innerHeight / this.map.zoom;

    if (this.map.x < 0) this.map.x = 0;
    if (this.map.y < 0) this.map.y = 0;

    if (this.map.x + this.map.visibleWidth > this.map.width) {
      this.map.x = this.map.width - this.map.visibleWidth;
    }

    if (this.map.y + this.map.visibleHeight > this.map.height) {
      this.map.y = this.map.height - this.map.visibleHeight;
    }

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

    // Draw the player
    this.player.draw(ctx);
    this.player.update();
  }
}
