export default class InitiativeLine {
	constructor() {
		this.queue = [];
	}

	ShowEveryoneInLine() {
		let resultString = "";
		for(let i = 0; i < this.queue.length; i++){
			resultString += i;
			resultString += ": ";
			resultString += this.queue[i].name;
			resultString += "[";
			resultString += this.queue[i].xpos;
			resultString += ",";
			resultString += this.queue[i].ypos;
			resultString += "]";
			resultString += "  ";
		}
		return resultString;
	}

	NextUnit() {
		let unit = this.queue.shift();
		this.queue.push(unit);
		this.SynchronizeLineId();
		return this.CurrentUnit();
	}

	SynchronizeLineId(){
		for(let i = 0; i < this.queue.length; i++) {
			this.queue[i].lineId = i;
		}
	}

	CurrentUnit() {
		return this.queue[0];
	}

	RemoveUnit(unit) {
		this.queue.splice(unit.lineId, 1);
	}

	PushEveryone(allies, enemies) {

		for(let i = 0; i < allies.length; i++){
			this.queue.push(allies[i]);
		}

		for(let i = 0; i < enemies.length; i++){
			this.queue.push(enemies[i]);
		}
		this.queue.sort(InitiativeLine.compareUnitsByInitiative);
		this.SynchronizeLineId();
	}

	static compareUnitsByInitiative(unit1, unit2){
		if (unit1.initiative < unit2.initiative) {
			return 1;
		}
		if (unit1.initiative > unit2.initiative) {
			return -1;
		}
	}

}
