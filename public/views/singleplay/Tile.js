export default class Tile{
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = null;
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
		return this.unitOnTile !== null;
	}
}