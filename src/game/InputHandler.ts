import Game from ".";

export default class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      this.game.lastKey = "P_" + e.key;
    });
    window.addEventListener("keyup", (e) => {
      this.game.lastKey = "R_" + e.key;
    });
  }
}
