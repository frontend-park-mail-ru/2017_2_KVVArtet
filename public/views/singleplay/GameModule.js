import Background from './Background'
import DungeonMapMaker from "./DungeonMapMaker"
import GameManager from "./GameManager"
import DemoGameModule from "./DemoGameModule"

export default class GameModule {
  constructor() {
    this.actionDeque = [];
    this.tiledMap = new DungeonMapMaker().dungeonMapMaker(Math.random() * 10 + 25);
    this.actionDeque = [];
  }

  gameStart() {
    this.game.gamePrepare();
    this.game.startGameLoop();
  }

  gameGraphic() {
    let back = new Background(this.tiledMap);
    back.render();
    let gameManager = new GameManager(this.tiledMap, this.actionDeque);
    this.game = new DemoGameModule(this.tiledMap, gameManager, this.actionDeque);
    gameManager.startGameRendering(this.gameStart.bind(this));
  }
}
