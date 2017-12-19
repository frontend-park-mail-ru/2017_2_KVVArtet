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
            this.actionResponse(event).bind(this);
        });
        this.mediator.subscribe("LobbyResponseMessage", (event) => {
            this.lobbyResponse(event).bind(this);
        });
        this.mediator.subscribe("NextRoomResponseMessage", (event) => {
            this.nextRoomResponse(event).bind(this);
        });
        this.mediator.subscribe("StayInLineResponseMessage", (event) => {
            this.stayInLineResponse(event).bind(this);
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
        action.ability = content.properties;
        switch(content.type){
            case "ApplyEffectEvent":
                break;
            case "CastEvent":
                break;
            case "EndTurnEvent":
                this.skipAction();
                break;
            case "HitpointsChangeEvent":
                let amount = content.type.HitpointsChangeEvent.amount;
                if(amount >=0) {
                    this.makeDamage(action, amount);
                } else {
                    this.makeHill(action, amount);
                }
                break;
            case "MoveEvent":
                let route = content.type.ApplyEffectEvent.route; //test how it will be
                this.makeMove(action, route);
                break;
            case "RewardEvent":
                break;
            case "RollbackEvent":
                break;
            default:
                console.log("wrong type of event");
                break;
        }
    }


    lobbyResponse(content) {
        if(content.message === "success"){
           this.gamePreRender();
        } else {
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
        if (!this.isPartyDead() && !this.isEnemiesDead()) {
            if (global.actionDeque.length > 0) {
                console.log('action begin');

                this.messageRequest("ActionRequestMessage", global.actionDeque.shift());
                this.activeUnit.actionPoint = 1;
                // this.activeUnit.actionPoint--;
                // let action = global.actionDeque.shift();
                // if (action.isMovement() && !action.target.isOccupied()) {
                //     this.makeMove(action);
                //     // } else if (action.isPrepareAbility()) {
                //     //     this.makePrepareAbility(action);
                // } else if (action.isAbility()) {
                //     console.log('this is ability: ' + action.ability.name);
                //     if (action.ability.damage[1] < 0) {
                //         this.makeHill(action);
                //     } else if (action.ability.damage[1] > 0) {
                //         this.makeDamage(action);
                //     }
                // } else if (action.isSkip()) {
                //     this.skipAction();
                // }
                //
                // if(this.activeUnit.actionPoint === 1) {
                //     this.sendPossibleMoves();
                // }
            }
            //
            // if (this.activeUnit.actionPoint === 0 || Math.ceil(this.timer / 1000) === 0 || this.activeUnit.isDead()){
            //     this.skipAction();
            // }
        } else {
            if (this.isPartyDead()) {
                this.loseGame();
            }

            if (this.isEnemiesDead()) {
                this.winGame();
            }
        }
    }

    // makePrepareAbility(action) {
    //     if (action.ability.typeOfArea === "circle") {
    //     }
    // }

    makeMove(action, route) {
        this.gameManager.animtaionManager.movingTo(action.sender, route);
    }

    makeHill(action, amount) {
        action.target.getInhabitant().healthpoint += amount;
        this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, [action.target.getInhabitant()]);
    }

    makeDamage(action, amount) {
        action.target.getInhabitant().healthpoint -= amount;
        if(action.target.getInhabitant().healthpoint > 0) {
            this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, [action.target]);
        } else {
            this.gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, [action.target], []);
            this.initiativeLine.RemoveUnit(action.target);
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
