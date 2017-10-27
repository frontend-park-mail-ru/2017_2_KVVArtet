// import Skill from "Skill.js"

class Unit {
	constructor() {
		this.name = "noname";
		this.class = "noname";
		this.xpos = 0;
		this.ypos = 0;
		this.healthpoint = [0,0];
		this.armor = 0;
		this.damage = [0,0];
		this.inititive = 0;
		this.criticalRate = 0.05;
		this.dodgeRate = 0.05;
		this.blockRate = 0.05;
		this.speed = 4;
		this.skills = [];
		this.type = "enemy"; //enemy player
		this.movePoint = 0;
		this.index = 0;
	}

	makeWarrior(name) {
		this.name = name;
		this.class = "warrior";
		this.healthpoint = [150, 150];
		this.armor = 20;
		this.damage = [20, 25];
		this.initiative = 10;
        let attackSkill = new Skill();
		attackSkill.createWithDamage("Attack", "Deals damage", "point", 1, this.damage, 0);
        let firstSkill = new Skill();
		firstSkill.createWithDamage("Shield Strike", "Smash enemy with a shild, knocking him down for 1 turn", "point", 1, [15,20], 2);
        let secondSkill = new Skill();
		secondSkill.createWithDamage("Heavy blow", "Attack your enemy with double damage", "point", 1, [40,50], 3);
		this.skills = [attackSkill, firstSkill, secondSkill];
		this.type = "player";
	}

	makeMage(name) {
		this.name = name;
		this.class = "mage";
		this.healthpoint = [100, 100];
		this.armor = 10;
		this.damage = [25, 30];
		this.initianitive = 11;
        let attackSkill = new Skill();
		attackSkill.createWithDamage("Attack", "Deals damage", "point", 1, this.damage, 0);
        let firstSkill = new Skill();
		firstSkill.createWithDamage("Thunderbolt", "An electrical jolt deals air damage to target character, knocking him down for 1 turn", "point", 1, [25,30], 2);
        let secondSkill = new Skill();
		secondSkill.createWithDamage("Fire ball", "Hurl a fiery sphere that will explode", "circle", 1, [25,30], 2);
		this.skills = [attackSkill, firstSkill, secondSkill];
		this.type = "player";
	}

	makeThief(name) {
		this.name = name;
		this.class = "thief";
		this.healthpoint = [125, 125];
		this.armor = 15;
		this.damage = [30, 35];
		this.initianitive = 12;
        let attackSkill = new Skill();
		attackSkill.createWithDamage("Attack", "Deals damage", "point", 1, this.damage, 0);
        let firstSkill = new Skill();
		firstSkill.createWithDamage("Sawtooth knife", "Attack enemy with guanteed critical hit", "point", 1, [60,70], 3);
        let secondSkill = new Skill();
		secondSkill.createWithDamage("Blade flurry", "Attack enemies around and deals 100% damage", "circle", 1, this.damage, 2);
		this.skills = [attackSkill, firstSkill, secondSkill];
		this.type = "player";
	}

	makePriest(name) {
		this.name = name;
		this.class = "priest";
		this.healthpoint = [100, 100];
		this.armor = 10;
		this.damage = [-5, -15];
		this.initianitive = 11;
        let attackSkill = new Skill();
		attackSkill.createWithDamage("Heal", "Heal with healing power", "point", 1, this.heal, 0);
        let firstSkill = new Skill();
		firstSkill.createWithHeal("Massive Heal", "Heal all your units in area with 100% healing power", "circle", 1, this.heal[0], 3);
        let secondSkill = new Skill();
		secondSkill.createWithDamage("Holly wrath", "Deal 300% healing power to cursed creatures", "point", 1, [this.heal[0]*2, this.heal[1]*2], 2);
		this.skills = [attackSkill, firstSkill, secondSkill];
		this.type = "player";
	}

	makeSkeleton(textureName) {
		this.name = "Skeleton";
		this.class = textureName;
		this.healthpoint = [150, 150];
		this.armor = 5;
		this.damage = [15, 20];
		this.initianitive = 10;

        let attackSkill = new Skill();
		attackSkill.createWithDamage("Attack", "Deals damage", "point", 1, this.damage, 0);
		this.skills = [attackSkill];
	}

	isDead() {
		if (healthpoint <=0) {
			return true;
		}
	}

	useDamageSkill(unit, skill) {

        let currentSkillDamage = (Math.floor(Math.random() * (skill.damage[1] - skill.damage[0])) + skill.damage[0]);


		if(Math.random() < this.criticalRate) {
			currentSkillDamage *= 2;
		}

		if(Math.random() < enemy.dodgeRate){
			currentSkillDamage = 0;
		} else if(Math.random() < enemy.blockRate) {
			currentSkillDamage *= 0.3;
		}

        unit.healthpoint -= currentSkillDamage * ((100 - enemy.armor) / 100);
	}

	useHealSkill(unit, skill) {
        unit.healthpoint += (Math.floor(Math.random() * (skill.heal[1] - skill.heal[0])) + skill.heal[0]);

	}


}
