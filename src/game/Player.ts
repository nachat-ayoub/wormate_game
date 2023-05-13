import Game from '.';

export default class Player {
  x = 250;
  y = 250;
  radius = 50;
  image: HTMLImageElement;
  angle = 0;
  canvasWidth: number;
  canvasHeight: number;

  constructor(game: Game) {
    this.image = document.querySelector('img#wormface') as HTMLImageElement;
    this.canvasWidth = game.width;
    this.canvasHeight = game.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Save the current canvas state
    ctx.save();

    // Translate to the center of the player image
    ctx.translate(this.x + this.radius, this.y + this.radius);

    // Rotate the canvas based on the player angle
    ctx.rotate(this.angle);

    // Draw the player image
    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );

    // Restore the canvas state
    ctx.restore();
  }

  update() {
    // Update the player
    const dx = this.x - window.mouse.x + this.radius;
    const dy = this.y - window.mouse.y + this.radius;

    // if (window.mouse.clicked) {
    this.angle = Math.atan2(dy, dx);

    // Move the player
    if (window.mouse.x !== this.x) {
      this.x -= dx / 30;
    }
    if (window.mouse.y !== this.y) {
      this.y -= dy / 30;
      // }
    }
  }
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
//
//
//
//
//

// import Game from '.';

// export default class Player {
//   x = 250;
//   y = 250;
//   radius = 50;
//   image: HTMLImageElement;
//   angle = 0;
//   canvasWidth: number;
//   canvasHeight: number;

//   constructor(game: Game) {
//     this.image = document.querySelector('img#wormface') as HTMLImageElement;
//     this.canvasWidth = game.width;
//     this.canvasHeight = game.height;
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     // Save the current canvas state
//     ctx.save();

//     // Move the canvas to the player position
//     ctx.translate(
//       this.canvasWidth / 2 - this.x - this.radius,
//       this.canvasHeight / 2 - this.y - this.radius
//     );

//     // Clear the canvas outside of the visible area
//     ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

//     // Draw the player image
//     ctx.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2);

//     // Restore the canvas state
//     ctx.restore();
//   }

//   update() {
//     // Update the player
//     const dx = this.x - window.mouse.x + this.radius;
//     const dy = this.y - window.mouse.y + this.radius;

//     if (window.mouse.clicked) {
//       this.angle = Math.atan2(dy, dx);

//       // Move the player
//       if (window.mouse.x !== this.x) {
//         this.x -= dx / 30;
//       }
//       if (window.mouse.y !== this.y) {
//         this.y -= dy / 30;
//       }
//     }
//   }
// }
