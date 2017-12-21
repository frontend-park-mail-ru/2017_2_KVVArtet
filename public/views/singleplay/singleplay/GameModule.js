import Background from './Background'
import DungeonMapMaker from "./DungeonMapMaker"
import GameManager from "./GameManager"
import DemoGameModule from "./DemoGameModule"

export default class GameModule {

  gameStart() {
    this.game.gamePrepare();
    this.game.startGameLoop();
  }

  gameGraphic() {
    let gameManager = new GameManager();
    this.game = new DemoGameModule();
    gameManager.startGameRendering(this.gameStart.bind(this));
  }
}
