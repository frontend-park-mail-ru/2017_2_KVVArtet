export default class Pathfinding {
    constructor(start, tiledMap){
        this.distance = new Map();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.tiledMap = tiledMap;
        this.path = new Map();
        this.sender = start.getInhabitant();
        this.frontier = [];
        this.frontier.push(start);
        this.path.set(start, null);
        this.distance.set(start, 0);
    }

    possibleMoves() {
        while (this.frontier.length > 0) {
            let current = this.frontier.shift();
            if(this.distance.get(current) === this.sender.speed) {
                break;
            }
            let currentNeighbors = this.tileNeighbors(current);
            for (let i = 0; i < currentNeighbors.length; i++) {
                if (!(this.distance.has(currentNeighbors[i]))) {
                    this.frontier.push(currentNeighbors[i]);
                    this.path.set(currentNeighbors[i], current);
                    this.distance.set(currentNeighbors[i], 1 + this.distance.get(current));
                }
            }
        }
        return this.path;
    }

    tileNeighbors(current) {
        let neighbors = [];
        if (current.xpos + 1 < this.WIDTH && this.tiledMap[current.xpos + 1][current.ypos].isWall === this.NOTWALL
            && !this.tiledMap[current.xpos + 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos + 1][current.ypos]);
        }

        if (current.ypos + 1 < this.HEIGHT && this.tiledMap[current.xpos][current.ypos + 1].isWall === this.NOTWALL
            && !this.tiledMap[current.xpos][current.ypos + 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos + 1]);
        }

        if (current.xpos - 1 >= 0 && this.tiledMap[current.xpos -1][current.ypos].isWall === this.NOTWALL
            && !this.tiledMap[current.xpos - 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos - 1][current.ypos]);
        }

        if (current.ypos -1 >= 0 && this.tiledMap[current.xpos][current.ypos - 1].isWall === this.NOTWALL
            && !this.tiledMap[current.xpos][current.ypos - 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos - 1]);
        }

        return neighbors;
    }


}
