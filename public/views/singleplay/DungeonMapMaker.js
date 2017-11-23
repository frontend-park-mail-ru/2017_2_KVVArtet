
import Tile from "./Tile"

let WIDTH = 16;
let HEIGHT = 12;
//console.log(WIDTH);
 export default class DungeonMapMaker {
    constructor() {
        this.UP = 0;
        this.LEFT = 1;
        this.DOWN = 2;
        this.RIGHT = 3;
        this.counter = WIDTH * HEIGHT;
    }

    isDirectionValid(curX, curY, direction) {

        switch (direction) {
            case this.UP:
                return (curY - 1) >= 0;
            case this.DOWN:
                return (curY + 1) < HEIGHT;
            case this.LEFT:
                return (curX - 1) >= 0;
            case this.RIGHT:
                return (curX + 1) < WIDTH;
            default:
                break;
        }
    }

    dungeonMapMaker(tileWalls) {
        let map = [];
        for (let i = 0; i < WIDTH; i++) {
            map[i] = [];
            for (let j = 0; j < HEIGHT; j++) {
                let newTile = new Tile();
                newTile.xpos = i;
                newTile.ypos = j;
                newTile.isWall = 1;
                map[i][j] = newTile;
            }
        }

        let randY = Math.floor(Math.random() * HEIGHT);
        let randX = Math.floor(Math.random() * WIDTH);
        let pointer = [randX, randY];
        console.log(HEIGHT + ' ' +WIDTH);
        console.log(randY+ ' ' +randX);
        map[randX][randY].isWall = 0;
        this.counter--;
        let direction;
        while (this.counter > tileWalls) {
            do {
                direction = Math.floor(Math.random() * 4);
            }
            while (!this.isDirectionValid(pointer[0], pointer[1], direction));

            switch (direction) {
                case this.UP:
                    pointer[1] = pointer[1] - 1;
                    break;
                case this.DOWN:
                    pointer[1] = pointer[1] + 1;
                    break;
                case this.LEFT:
                    pointer[0] = pointer[0] - 1;
                    break;
                case this.RIGHT:
                    pointer[0] = pointer[0] + 1;
                    break;
            }

            if (map[pointer[0]][pointer[1]].isWall === 1) {
                map[pointer[0]][pointer[1]].isWall = 0;
                this.counter--;
            }
        }

        return map;
    }
}
export {WIDTH,HEIGHT}