// import InitiativeLine from "InitiativeLine.js"
// import Unit from "./Unit";
WIDTH = 16;
HEIGHT = 12;
PARTYSIZE = 4;
ENEMIESSIZE = 2;
NOTWALL = 0;
WALL = 1;

/*export default */
class DemoGameModule {
    constructor() {
    this.players = [];
    this.enemies = [];
    this.initiativeLine = new InitiativeLine();
    this.activeUnit = null;
    this.timer = 30000;
    this.intervalId = 0;
    }

    gamePrepare() {
        this.players = DemoGameModule.generatePlayers();
        this.enemies = DemoGameModule.generateEnemies();
        this.initiativeLine.PushEveryone(this.players, this.enemies);
        DemoGameModule.setPlayersPositions(this.players);
        DemoGameModule.setEnemiesPositions(this.enemies);
        console.log("Everyone on positions: ");
        //отрисовка персонажей

        for (let i = 0; i < window.PARTYSIZE + window.ENEMIESSIZE; i++) {
            gameManager.unitManager.addUnit(this.initiativeLine.queue[i]);
        }

        this.activeUnit = this.initiativeLine.CurrentUnit();
        console.log(this.activeUnit.name + " - let's start with you!");
        gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
    }


    gameLoop() {
        if (!this.isPartyDead() && !this.isEnemiesDead()) {
            this.timer -= window.interval;
            document.getElementById('time').innerHTML = "00:" + Math.ceil(this.timer / 1000);
            document.getElementById('time').style.fontSize = "2em";
            //где-то здесь есть работа с АИ
            //отрисовка скилов для каждого персонажа, информация для dropdown и позиций
            if (window.actionDeque.length > 0) {
                console.log("action begin");
                this.activeUnit.actionPoint--;
                let action = window.actionDeque.shift();
                if (action.isMovement() && !action.target.isOccupied()) {
                    this.makeMove(action);
                } else if (action.isAbility()) {
                    console.log("this is ability: " + action.ability.name);
                    if (action.ability.damage[1] < 0) {
                        this.makeHill(action);
                    } else if (action.ability.damage[1] > 0) {
                        this.makeDamage(action);
                    }
                } else if (action.isSkip()) {
                    this.skipAction();
                }

                if(this.activeUnit.actionPoint === 1) {
                    this.sendPossibleMoves();
                }
            }
            console.log("action point: " + this.activeUnit.actionPoint);

            if (this.activeUnit.actionPoint === 0 || Math.ceil(this.timer / 1000) === 0 || this.activeUnit.isDead()){
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

    makeMove(action) {
        console.log(action.sender.getInhabitant().name + " make move from [" + action.sender.xpos + "," + action.sender.ypos + "]" + " to [" + action.target.xpos + "," + action.target.ypos + "]");
        let toMove = action.sender.getInhabitant();
        let pathfinding = new Pathfinding(action.sender);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        let currentTile = action.target;
        while (allMoves.get(currentTile) !== null) {
            path.push(currentTile);
            console.log("current tile - [" + currentTile.xpos + "]" + "[" + currentTile.ypos + "]");
            currentTile = allMoves.get(currentTile);
        }
        console.log(path);
        gameManager.animtaionManager.movingTo(action.sender, path);
        action.sender.unoccupy();
        action.target.occupy(toMove);
        this.activeUnit.xpos = action.target.xpos;
        this.activeUnit.ypos = action.target.ypos;
        console.log("check on unoccupy: " + action.sender.isOccupied());
        console.log("check on occupy: " + action.target.isOccupied());
    }

    makeHill(action) {
        let healedAllies = [];
        //AOE HILL
        if(action.ability.typeOfArea === "circle") {
          console.log("THIS IS AOE HILL");
          for(let i = action.target.xpos-action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
              for(let j = action.target.ypos-action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                  if(i >= 0 && j >= 0 && i < WIDTH && j < HEIGHT) {
                      console.log("WTF is " + i + " " + j);
                      if(window.tiledMap[i][j].isOccupied() && window.tiledMap[i][j].getInhabitant().type === action.sender.getInhabitant().type) {
                          console.log("this is AOE hill on someone: " + i + " " + j);
                          healedAllies.push(window.tiledMap[i][j].getInhabitant());
                          action.sender.getInhabitant().useHealSkill(window.tiledMap[i][j].getInhabitant(), action.ability);
                          console.log("health end: " +window.tiledMap[i][j].getInhabitant().healthpoint);
                      }
                  }
              }
          }
        } else {
          action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
          healedAllies.push(action.target.getInhabitant());
          console.log("health end: " + action.target.getInhabitant().healthpoint);
        }
        gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, healedAllies);
    }

    makeDamage(action) {
        let woundedEnemies = [];
        let deadEnemies = [];
        console.log(action.sender.getInhabitant().name + " make damage");
        console.log("this is damage: " + action.ability.name);
       // console.log("health begin: " + action.target.getInhabitant().healthpoint);

        //AOE DAMAGE
        if(action.ability.typeOfArea === "circle") {
            console.log("THIS IS AOE DAMAGE");
            console.log("target on " + action.target.xpos + " " + action.target.ypos);
            for(let i = action.target.xpos-action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for(let j = action.target.ypos-action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    console.log("i: " + i + " j: " + j);
                    if(i > 0 && j > 0 && i < WIDTH && j < HEIGHT) {
                        if(window.tiledMap[i][j].isOccupied()) {
                            console.log(window.tiledMap[i][j].getInhabitant().name + " IS WOUNDED");
                            action.sender.getInhabitant().useDamageSkill(window.tiledMap[i][j].getInhabitant(), action.ability);
                            if(window.tiledMap[i][j].getInhabitant().deadMark === false) {
                                if (window.tiledMap[i][j].getInhabitant().isDead()) {
                                    deadEnemies.push(window.tiledMap[i][j].getInhabitant());
                                    window.tiledMap[i][j].getInhabitant().deadMark = true;
                                } else {
                                    woundedEnemies.push(window.tiledMap[i][j].getInhabitant());
                                }
                                //console.log("health end: " + action.target.getInhabitant().healthpoint);
                            }
                        }
                    }

                }
            }

        } else {
            action.sender.getInhabitant().useDamageSkill(action.target.getInhabitant(), action.ability);
            if(action.target.getInhabitant().isDead()) {
                deadEnemies.push(action.target.getInhabitant());
            } else {
                woundedEnemies.push(action.target.getInhabitant());
            }
            console.log("health end: " + action.target.getInhabitant().healthpoint);
        }

        if (deadEnemies.length > 0) {
           // console.log(action.target.getInhabitant().name + " IS DEAD");

            gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, deadEnemies, woundedEnemies);
            for(let i = 0; i < deadEnemies.length; i++) {
                this.initiativeLine.RemoveUnit(deadEnemies[i]);
            }            //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
        } else {
            console.log("SOMEONE GET WOUNDED: ", woundedEnemies);
            gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, woundedEnemies);
        }
    }

    loseGame() {
        this.stopGameLoop();
        //createoverlaylose
    }

    winGame() {
        setTimeout(function() {
            document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
            document.getElementById('menu').removeAttribute('hidden');
            document.getElementById('menu').innerHTML = 'Вы победили!';
        }, 1000);
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
        for (let i = 0; i < window.ENEMIESSIZE; i++) {
            let Skeleton = new Unit();
            let texture;
            if (i % 2 === 0) {
                texture = "skeleton1";
            } else {
                texture = "skeleton2";
            }
            Skeleton.makeSkeleton(texture);
            newEnemies.push(Skeleton);
        }
        return newEnemies;
    }

    static setPlayersPositions(players) {
        for (let i = 0; i < window.PARTYSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * window.HEIGHT);
                randCol = Math.floor(Math.random() * 3); //первые три столбца поля
                if (window.tiledMap[randCol][randRow].isWall === NOTWALL && !window.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            players[i].xpos = randCol;
            players[i].ypos = randRow;
            window.tiledMap[randCol][randRow].occupy(players[i]);
        }
    }

    static setEnemiesPositions(enemies) {
        for (let i = 0; i < window.ENEMIESSIZE; i++) {
          let randRow;
          let randCol;
          while (true) {
            randRow = Math.floor(Math.random() * window.HEIGHT);
            randCol = Math.floor(Math.random() * 3) + window.WIDTH - 3; //последние три столбца поля
            if (window.tiledMap[randCol][randRow].isWall === NOTWALL && !window.tiledMap[randCol][randRow].isOccupied()) {
                break;
            }
          }
          enemies[i].xpos = randCol;
          enemies[i].ypos = randRow;
          window.tiledMap[randCol][randRow].occupy(enemies[i]);
        }
    }

    isPartyDead() {
        for (let i = 0; i < PARTYSIZE; i++) {
          if (!this.players[i].isDead()) {
            return false;
          }
        }
        return true;
    }

    isEnemiesDead() {
        for (let i = 0; i < ENEMIESSIZE; i++) {
          if (!this.enemies[i].isDead()) {
            return false;
          }
        }
        return true;

    }

    startGameLoop() {
        this.intervalId = setInterval(() => this.gameLoop(), window.interval);
    }

    stopGameLoop() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
    }

    skipAction() {
        this.timer = 30000;
        this.beginTurn();
    }

    sendPossibleMoves() {
        let pathfinding = new Pathfinding(window.tiledMap[this.activeUnit.xpos][this.activeUnit.ypos]);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        for(let key of allMoves.keys()){
            path.push(key);
        }
        path.shift();
        gameManager.unitManager.showPossibleMoves(path);
    }

    beginTurn() {
        this.activeUnit = this.initiativeLine.NextUnit();
        console.log("This turn: ");
        console.log(this.initiativeLine.ShowEveryoneInLine());
        console.log(this.activeUnit.name + " = now your move! Cause initiative:" + this.activeUnit.initiative);
        this.activeUnit.actionPoint = 2;
        gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        //изменяем LowerBar
        //изменяем activeEntity
    }
}
