// import Unit from "Unit.js";

class Tile{
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = new Unit();
		this.isWall = null;
	}

	getInhabitant() {
		return this.unitOnTile;
	}

	occupy(unit){
		this.unitOnTile = unit;
	}

	unoccupy(){
		this.unitOnTile = null;
	}

	isOccupied(){
		return this.unitOnTile === null;
	}
}
