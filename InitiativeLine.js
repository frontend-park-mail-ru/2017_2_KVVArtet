class InitiativeLine{
	constructor(units) {
		this.queue = [];
		for(let i = 0; i < units.length; i++){
			this.queue.push(units[i]);
		}
	}

	NextUnit() {
		let unit = this.queue.shift();
		this.queue.push(unit);
	}

	CurrentUnit() {
		return this.queue[this.queue.length-1];
	}	

	RemoveUnit(unit) {
		this.queue.splice(this.queue.indexOf(unit), 1);
	}

	PushEveryone(allies, enemies) {

		allies.forEach(function(ally){
			this.queue.push(ally);
		});

        enemies.forEach(function(enemy){
            this.queue.push(enemy);
        });
		this.queue.sort(InitiativeLine.compareUnitsByInitiative);
	}

	static compareUnitsByInitiative(unit1, unit2){
		if (unit1.initiative > unit2.initiative) {
			return 1;
		}
		if (unit1.initiative <= unit2.initiative) {
			return -1;
		}
	}

}