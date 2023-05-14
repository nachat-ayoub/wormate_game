import Game from './game';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.canvas = canvas;
const canvasPosition = canvas.getBoundingClientRect();

window.mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  clicked: false,
};

window.addEventListener('load', () => {
  canvas.addEventListener('mousemove', (e) => {
    window.mouse.x = e.x - canvasPosition.left;
    window.mouse.y = e.y - canvasPosition.top;
  });

  canvas.addEventListener('mousedown', (e) => (window.mouse.clicked = true));
  canvas.addEventListener('mouseup', (e) => (window.mouse.clicked = false));

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const game = new Game(canvas.width, canvas.height);

  function animate(deltaTime: number) {
    game.render(context);

    requestAnimationFrame(animate);
  }

  animate(0);
});
