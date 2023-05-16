export interface ISprite {
  image: HTMLImageElement;
  frameX: number;
  frameY: number;
  width: number;
  height: number;
  maxFrames: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  animate: (deltaTime: number) => void;
}
