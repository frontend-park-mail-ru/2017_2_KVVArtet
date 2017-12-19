
import DungeonMapMaker from "./DungeonMapMaker";
global.actionDeque = [];
global.tiledMap = new DungeonMapMaker().dungeonMapMaker(Math.random() * 10 + 25);
global.mapShiftX = -0.7;
global.mapShiftY = 0.65;
global.ratio = 16/9;
global.countLines = 0;