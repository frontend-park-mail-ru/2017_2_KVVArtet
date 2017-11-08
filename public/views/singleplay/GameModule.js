 import DungeonMapMaker from "./DungeonMapMaker"
// import Game from "DemoGameModule.js"

tiledMap = new DungeonMapMaker().dungeonMapMaker(Math.random() * 10 + 25);
 actionDeque = [];
interval = 100;
// WIDTH = 16;
HEIGHT = 12;
PARTYSIZE = 4;
ENEMIESSIZE = 6;

class GameModule {
  constructor() {
    this.game = new DemoGameModule();
  }

  gameStart() {
    this.game.gamePrepare();
    this.game.startGameLoop();
  }

  gameGraphic() {
      let back = new Background(tiledMap);
    back.render();
    gameManager = new GameManager();
    gameManager.startGameRendering(this.gameStart.bind(this));
  }
}

//export {tiledMap}