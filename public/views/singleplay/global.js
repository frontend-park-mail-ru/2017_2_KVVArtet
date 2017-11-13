
import DungeonMapMaker from "./DungeonMapMaker";
global.actionDeque = [];
global.tiledMap = new DungeonMapMaker().dungeonMapMaker(Math.random() * 10 + 25);