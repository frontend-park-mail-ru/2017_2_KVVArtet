class Skill{
	constructor() {
		this.name = "move";
		this.decription = "description";
		this.typeOfArea = 'point'; //point, circle
		this.area = 1;
		this.damage = [0,0];
		this.heal = [0,0];
		this.cooldown = 0;
	}


	createWithDamage(name, description, typeOfArea, area, damage, cooldown){
		this.name = name;
		this.description = description;
		this.typeOfArea = typeOfArea;
		this.area = area;
		this.damage = damage;
		this.cooldown = cooldown;
	}

	createWithHeal(name, description, typeOfArea, area, heal, cooldown){
		this.name = name;
		this.description = description;
		this.typeOfArea = typeOfArea;
		this.area = area;
		this.heal = heal;
		this.cooldown = cooldown;
	}

	getDesciption() {
		if(heal[1] === 0) {
			return "Dam: " + this.damage[0] + "-" + this.damage[1] + " Type: " + this.typeOfArea + " with area: " + this.area + "\n" + " Cooldown: " + this.cooldown + "\n" + this.description;
		}

		return "Heal: " + this.heal[0] + "-" + this.heal[1] + " Type: " + this.typeOfArea + " with area: " + this.area + "\n" + " Cooldown: " + this.cooldown + "\n"  + this.description;

	}

}
