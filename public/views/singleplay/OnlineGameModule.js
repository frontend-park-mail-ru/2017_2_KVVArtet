import InitiativeLine from './InitiativeLine';
import Unit from './Unit';
import Pathfinding from './Pathfinding';
import Background from './Background';
import GameManager from './GameManager';
import Mediator from "../../modules/mediator";
import Transport from "../../transport/transport.js";
import Action from "./Action";
/*export default */
export default class OnlineGameModule {
    constructor() {
        this.characterList = [];
        this.gameManager = new GameManager();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.players = [];
        this.enemies = [];
        this.initiativeLine = new InitiativeLine();
        this.activeUnit = null;
        this.timer = 30000;
        this.intervalId = 0;
        this.interval = 100;

        this.mediator = new Mediator();
        this.transport = new Transport();
        this.mediator.subscribe("CharacterListResponseMessage", (event) => {
            this.characterListResponse(event).bind(this);
        });
        this.mediator.subscribe("ActionResponseMessage", (event) => {
            this.actionResponse(event).bind(this)
        });
        this.mediator.subscribe("LobbyResponseMessage", (event) => {
            this.lobbyResponse(event).bind(this)
        });
        this.mediator.subscribe("NextRoomResponseMessage", (event) => {
            this.nextRoomResponse(event).bind(this)
        });
        this.mediator.subscribe("StayInLineResponseMessage", (event) => {
            this.stayInLineResponse(event).bind(this)
        });
    }

    gameStart() {
        this.gamePrepare();
        this.startGameLoop();
    }

    gamePreRender() {
        let numberScene = 0;
        let back = new Background(numberScene);
        back.render();
        this.gameManager.startGameRendering(this.gameStart.bind(this));
    }

    messageRequest(request, content = null) {
        this.transport.send(request, content);
    }

    characterListResponse(content) {
        content.characterList.forEach(() => {
            //TODO make unit model from back turn into unit model from front
            this.characterList.push(content.characterList.UserCharacter);
        });
        //drawCharacters()
    }


    actionResponse(content) {
        let action = new Action();
        action.sender = content.sender;
        action.target = content.target;
        action.ability = content.ability;
        //TODO events = content.events
        //TODO обработка действий как в геймлупе
    }


    lobbyResponse(content) {
        if(content.message === "success"){
            this.gamePreRender();
        } else {
            //TODO setTimeout
            this.messageRequest("LobbyRequestMessage");
        }
    }

    nextRoomResponse(content = null) {
    }

    stayInLineResponse(content = null) {
    }

    gamePrepare() {
        //как это должно работать - посылаем некструм реквест через менеджер
        this.messageRequest("NextRoomRequestMessage");
        //ждем ответа от сервера и емита от медиатора

        /*
        this.players = this.generatePlayers();
        this.enemies = this.generateEnemies();
        this.initiativeLine.PushEveryone(this.players, this.enemies);
        this.setPlayersPositions(this.players);
        this.setEnemiesPositions(this.enemies);
        console.log('Everyone on positions: ');
        //отрисовка персонажей
        for (let i = 0; i < this.PARTYSIZE + this.ENEMIESSIZE; i++) {
            console.log(this.enemies);
            this.gameManager.unitManager.addUnit(this.initiativeLine.queue[i]);
        }
        this.activeUnit = this.initiativeLine.CurrentUnit();
        console.log(this.activeUnit.name + ' - let\'s start with you!');
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        */
    }




    gameLoop() {
        this.timer -= this.interval;
        let sec = Math.ceil(this.timer/1000);
        if (sec < 10) {
            sec = '0' + sec;
        }
        document.getElementById('time').innerHTML = '00:' + sec;
    }

    // makePrepareAbility(action) {
    //     if (action.ability.typeOfArea === "circle") {
    //     }
    // }

    makeMove(action) {
        console.log(action.sender.getInhabitant().name + ' make move from [' + action.sender.xpos + ',' + action.sender.ypos + ']' + ' to [' + action.target.xpos + ',' + action.target.ypos + ']');
        let toMove = action.sender.getInhabitant();
        let pathfinding = new Pathfinding(action.sender, global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        let currentTile = action.target;
        while (allMoves.get(currentTile) !== null) {
            path.push(currentTile);
            console.log('current tile - [' + currentTile.xpos + ']' + '[' + currentTile.ypos + ']');
            currentTile = allMoves.get(currentTile);
        }
        console.log(path);
        this.gameManager.animtaionManager.movingTo(action.sender, path);
        action.sender.unoccupy();
        action.target.occupy(toMove);
        this.activeUnit.xpos = action.target.xpos;
        this.activeUnit.ypos = action.target.ypos;
        console.log('check on unoccupy: ' + action.sender.isOccupied());
        console.log('check on occupy: ' + action.target.isOccupied());
    }

    makeHill(action) {
        let healedAllies = [];
        //AOE HILL
        if(action.ability.typeOfArea === 'circle') {
            console.log('THIS IS AOE HILL');
            for(let i = action.target.xpos-action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for(let j = action.target.ypos-action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    if(i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        console.log('WTF is ' + i + ' ' + j);
                        if(global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().type === action.sender.getInhabitant().type) {
                            console.log('this is AOE hill on someone: ' + i + ' ' + j);
                            healedAllies.push(global.tiledMap[i][j].getInhabitant());
                            action.sender.getInhabitant().useHealSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            console.log('health end: ' +global.tiledMap[i][j].getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
            healedAllies.push(action.target.getInhabitant());
            console.log('health end: ' + action.target.getInhabitant().healthpoint);
        }
        this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, healedAllies);
    }

    makeDamage(action) {
        let woundedEnemies = [];
        let deadEnemies = [];
        console.log(action.sender.getInhabitant().name + ' make damage');
        console.log('this is damage: ' + action.ability.name);
        // console.log("health begin: " + action.target.getInhabitant().healthpoint);

        //AOE DAMAGE
        if(action.ability.typeOfArea === 'circle') {
            console.log('THIS IS AOE DAMAGE');
            console.log('target on ' + action.target.xpos + ' ' + action.target.ypos);
            for(let i = action.target.xpos-action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for(let j = action.target.ypos-action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    console.log("i: " + i + " j: " + j);
                    if(i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        if(global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().deadMark === false) {
                            console.log(global.tiledMap[i][j].getInhabitant().name + " IS WOUNDED");
                            action.sender.getInhabitant().useDamageSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            if (global.tiledMap[i][j].getInhabitant().isDead()) {
                                deadEnemies.push(global.tiledMap[i][j].getInhabitant());
                                global.tiledMap[i][j].getInhabitant().deadMark = true;
                            } else {
                                woundedEnemies.push(global.tiledMap[i][j].getInhabitant());
                            }
                            //console.log("health end: " + action.target.getInhabitant().healthpoint);
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
            console.log('health end: ' + action.target.getInhabitant().healthpoint);
        }

        if (deadEnemies.length > 0) {
            // console.log(action.target.getInhabitant().name + " IS DEAD");

            this.gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, deadEnemies, woundedEnemies);
            for(let i = 0; i < deadEnemies.length; i++) {
                this.initiativeLine.RemoveUnit(deadEnemies[i]);
            }            //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
        } else {
            console.log('SOMEONE GET WOUNDED: ', woundedEnemies);
            this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, woundedEnemies);
        }
    }

    loseGame() {
        this.stopGameLoop();
        document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
        document.getElementById('lose').removeAttribute('hidden');
        //createoverlaylose
    }

    winGame() {
        this.stopGameLoop();
        document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
        document.getElementById('win').removeAttribute('hidden');
        //createoverlaywin
    }

    generatePlayers() {
        let newPlayers = [];
        let Roderick = new Unit();
        Roderick.makeWarrior('Roderick');
        let Gendalf = new Unit();
        Gendalf.makeMage('Gendalf');
        let Garreth = new Unit();
        Garreth.makeThief('Garreth');
        let Ethelstan = new Unit();
        Ethelstan.makePriest('Ethelstan');

        newPlayers.push(Roderick);
        newPlayers.push(Gendalf);
        newPlayers.push(Garreth);
        newPlayers.push(Ethelstan);

        return newPlayers;
    }

    generateEnemies() {
        let newEnemies = [];
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            console.log(i);
            let Skeleton = new Unit();
            let texture;
            if (i % 2 === 0) {
                texture = 'skeleton1';
            } else {
                texture = 'skeleton2';
            }
            Skeleton.makeSkeleton(texture);
            newEnemies.push(Skeleton);
        }
        return newEnemies;
    }

    setPlayersPositions(players) {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3); //первые три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            players[i].xpos = randCol;
            players[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(players[i]);
        }
    }

    setEnemiesPositions(enemies) {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3) + this.WIDTH - 3; //последние три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            enemies[i].xpos = randCol;
            enemies[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(enemies[i]);
        }
    }

    isPartyDead() {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            if (!this.players[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    isEnemiesDead() {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            if (!this.enemies[i].isDead()) {
                return false;
            }
        }
        return true;

    }

    startGameLoop() {
        this.intervalId = setInterval(() => this.gameLoop(), this.interval);
    }

    stopGameLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.unsubscribe();
    }

    skipAction() {
        this.timer = 30000;
        this.beginTurn();
    }

    sendPossibleMoves() {
        let pathfinding = new Pathfinding(global.tiledMap[this.activeUnit.xpos][this.activeUnit.ypos], global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        for(let key of allMoves.keys()){
            path.push(key);
        }
        path.shift();
        this.gameManager.unitManager.showPossibleMoves(path);
    }

    beginTurn() {
        this.activeUnit = this.initiativeLine.NextUnit();
        console.log('This turn: ');
        console.log(this.initiativeLine.ShowEveryoneInLine());
        console.log(this.activeUnit.name + ' = now your move! Cause initiative:' + this.activeUnit.initiative);
        this.activeUnit.actionPoint = 2;
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        //изменяем LowerBar
        //изменяем activeEntity
    }

    unsubscribe() {
        this.mediator.unsubscribe("CharacterListResponseMessage", this.characterListResponse().bind(this));
        this.mediator.unsubscribe("ActionResponseMessage", this.actionResponse().bind(this));
        this.mediator.unsubscribe("LobbyResponseMessage", this.lobbyResponse().bind(this));
        this.mediator.unsubscribe("NextRoomResponseMessage", this.nextRoomResponse().bind(this));
        this.mediator.unsubscribe("StayInLineResponseMessage", this.stayInLineResponse().bind(this));
        //this.mediator.publish("DELETE_GAME");
    }
}