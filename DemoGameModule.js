// import InitiativeLine from "InitiativeLine.js"
// import Unit from "./Unit";
/*export default */class DemoGameModule{
	constructor(){
		this.players = [];
		this.enemies = [];
		this.initiativeLine = new InitiativeLine();
		this.activeUnit = null;
		this.timer = window.interval*1000;
        this.intervalId = 0;
	}

	gamePrepare(){
		this.players = Game.generatePlayers();
		this.enemies = Game.generateEnemies();
		this.initiativeLine.PushEveryone(this.players, this.enemies);
		Game.setPlayersPositions(this.players);
		Game.setEnemiesPositions(this.enemies);

		//отрисовка фона, линии инициативы по очереди

		//отрисовка персонажей
		for(let i = 0; i < window.PARTYSIZE; i++){
			//graph.AddEntity(this.players[i].xpos, this.players[i].ypos, this.players[i].class);
		}

		for (i = 0; i < window.ENEMIESSIZE; i++){
			//graph.AddEntity(this.enemies[i].xpos, this.enemies[i].ypos, this.enemies[i].class);
		}
	}


	gameLoop() {
		if (!this.isPartyDead() && !this.isEnemiesDead()) {
			this.timer -= window.interval;
            document.getElementById('time').innerHTML = "00:" + Math.ceil(this.timer/1000);
            //где-то здесь есть работа с АИ
			//отрисовка скилов для каждого персонажа, информация для dropdown и позиций
			if(window.actionDeque.length > 0) {
                this.activeUnit.actionPoint -= 1;
				let action = window.actionDeque.shift();
                if (action.isMovement() && !action.target.isOccupied()) {
                    let toMove = action.sender.getInhabitant();
                    action.sender.unoccupy();
                    action.target.occupy(toMove);
                    //moveEntity(sender, target);
				} else if (action.isAbility()) {
                    if(action.ability.damage[1] < 0){
                        action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
                        //graph.unitAttack(action.ability.name, sender, target);
                    } else {
                        action.sender.getInhabitant().useDamageSkill(action.target.getInhabitant(), action.ability);
                        if(action.target.getInhabitant().isDead()){
                            //graph.unitAttackAndKill(action.ability.name, sender, target);
                            this.initiativeLine.RemoveUnit(action.target.getInhabitant());
                            //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
                        }
                    }
				} else if (action.isSkip()){
					this.skipAction();
				}
			}

            if(this.activeUnit.actionPoint === 0){
                this.skipAction();
            }
		} else {
            if (this.isPartyDead()) {
                this.loseGame();
            }

            if (this.isEnemiesDead()) {
                this.winGame();
            }
        }
	}

	loseGame(){
	    this.stopGameLoop();
        //createoverlaylose
    }

    winGame(){
	    this.stopGameLoop();
	    //createoverlaywin
    }

	static generatePlayers() {
		let newPlayers = [];
		let Roderick = new Unit();
		Roderick.makeWarrior("Roderick");
		let Gendalf = new Unit();
		Gendalf.makeMage("Gendalf");
		let Garreth = new Unit();
		Garreth.makeThief("Garreth");
		let Ethelstan = new Unit();
		Ethelstan.makePriest("Ethelstan");

		newPlayers.push(Roderick);
		newPlayers.push(Gendalf);
		newPlayers.push(Garreth);
		newPlayers.push(Ethelstan);

		return newPlayers;
	}

	static generateEnemies() {
		let newEnemies = [];
		for (let i = 0; i < window.ENEMIESSIZE; i++){
			let Skeleton = new Unit();
			let texture;
			if(i < window.ENEMIESSIZE/2){
				texture = "skeleton1";
			} else {
				texture = "skeleton2";
			}

			Skeleton.makeSkeleton(texture);
			newEnemies.push(Skeleton);
		}

		return newEnemies;
	}

	static setPlayersPositions(players){

		for(let i = 0; i < window.PARTYSIZE; i++){
		    let randRow;
		    let randCol;
			while(true){
				randRow = Math.floor(Math.random() * window.WIDTH);
				randCol = Math.floor(Math.random() * 3); //первые три столбца поля
				if (window.tiledMap[randRow][randCol].isWall === 0 || !window.tiledMap[randCol][randRow].isOccupied()){
					break;
				}
			}
			players[i].xpos = randRow;
			players[i].ypos = randCol;
			window.tiledMap[randRow][randCol].occupy(players[i]);
		}
	}

	static setEnemiesPositions(enemies){
		for(let i = 0; i < window.ENEMIESSIZE; i++){
			let randRow;
			let randCol;
			while(true){
				randRow = Math.floor(Math.random() * window.WIDTH);
				randCol = Math.floor(Math.random() * 3) + 13; //последние три столбца поля
				if (window.tiledMap[randRow][randCol].isWall === 0 || !window.tiledMap[randCol][randRow].isOccupied()){
					break;
				}
			}
			enemies[i].xpos = randRow;
			enemies[i].ypos = randCol;
			window.tiledMap[randRow][randCol].occupy(enemies[i]);
		}
	}

	isPartyDead() {
		for(let i = 0; i < 4; i++) {
			if(!this.players[i].isDead()){
				return false;
			}
		}
		return true;
	}

	isEnemiesDead() {
		for(let i = 0; i < 4; i++) {
			if(!this.enemies[i].isDead()){
				return false;
			}
		}
		return true;

	}

	startGameLoop() {
		this.timer = window.interval*1000;
		this.intervalId = setInterval(() => this.gameLoop(), window.interval);
	}

	stopGameLoop() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	skipAction(){
	    this.timer = 0;
	    this.beginTurn();
    }

    beginTurn(){
        this.activeUnit = this.initiativeLine.NextUnit();
        this.activeUnit.actionPoint = 2;
        //graph.activeEntity(this.activeUnit);
        //изменяем LowerBar
        //изменяем activeEntity
    }
}