import Game from "./game";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  canvas.width = 1280;
  canvas.height = 720;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const game = new Game(canvas.width, canvas.height);

  function animate(deltaTime: number) {
    game.render(context);
    requestAnimationFrame(animate);
  }

  animate(0);
});
