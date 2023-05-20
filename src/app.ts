import { Food } from './game/Food';
import Player from './game/Player';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
  };

  player: Player;
  foods: Food[] = [];

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.width = 800; // Set your desired canvas width
    this.height = 600; // Set your desired canvas height
    this.player = new Player(
      this,
      this.width / 2,
      this.height / 2,
      30,
      'green'
    ); // Initialize player at the center with radius 10

    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add event listeners to track mouse movement
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove = (event: MouseEvent) => {
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;

    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.mouse.x = (event.clientX - rect.left) * scaleX;
    this.mouse.y = (event.clientY - rect.top) * scaleY;
  };

  handleMouseLeave = () => {
    // this.mouse.x = 0;
    // this.mouse.y = 0;
  };

  update() {
    // Add update logic for the game
    // Update player position based on mouse coordinates
    this.player.update();
  }

  draw() {
    // Add drawing logic for the game
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear the canvas

    for (const food of this.foods) {
      food.draw(this.ctx);
    }

    this.player.draw(this.ctx);
  }

  gameLoop() {
    this.update();
    this.draw();

    requestAnimationFrame(() => this.gameLoop());
  }

  start() {
    for (let i = 0; i < 20; i++) {
      this.spawnFood();
    }

    setInterval(() => {
      if (this.foods.length < 30) {
        for (let i = 0; i < 20; i++) {
          this.spawnFood();
        }
      }
    }, 3000);

    this.gameLoop();
  }

  spawnFood() {
    const radius = 10;
    const x = Math.random() * (this.canvas.width - 2 * radius) + radius;
    const y = Math.random() * (this.canvas.height - 2 * radius) + radius;
    const color = 'red';
    const food = new Food(x, y, radius, color);
    this.foods.push(food);
  }
}

// Create an instance of the game and start it
const game = new Game();
game.start();
