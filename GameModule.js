// import DungeonMapMaker from "DungeonMapMaker"
// import Game from "DemoGameModule.js"

tiledMap = new DungeonMapMaker().dungeonMapMaker( window.tilesWithWalls);
tilesWithWalls = 25;
actionDeque = [];
interval = 100;
WIDTH = 16;
HEIGHT = 12;
PARTYSIZE = 4;
ENEMIESSIZE = 6;

class GameModule {
    constructor(){
        this.game = new DemoGameModule();
    }

    gameStart(){
        this.game.gamePrepare();
        this.game.startGameLoop();
    }
}


gameModule = new GameModule();
StartGraphic(gameModule.gameStart());