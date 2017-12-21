import GraphicEngine from './GraphicEngine';
import SpriteManager from './SpriteManager';
import State from './State';
import Loader from './Loader';
import Utils from './Utils';
import AnimationManager from './AnimationManager';
import UnitManager from './UnitManager';
import Animation from './Animation';
import Action from "./Action";

//import {global.tiledMap,test} from './GameModule'
//import   './GameModule'

export default class GameManager {
    constructor() {
        this.ratio = 16 / 9;
        this.engine = new GraphicEngine('canvas', true);
        this.spriteManager = new SpriteManager(this.engine);
        this.state = new State();
        this.fullScreen = false;
    }

    startGameRendering(callback) {
        console.log('work rendering uints');
        let loaderTextures = new Loader([
            '/views/singleplay/textures/moveTile.png', '/views/singleplay/textures/activeTile.png',
            '/views/singleplay/textures/select.png', '/views/singleplay/icons/fullscreen.png',
            '/views/singleplay/textures/actionBack.png', '/views/singleplay/icons/circle.png',
            '/views/singleplay/icons/radio2.png', '/views/singleplay/icons/radio1.png'
        ], this.engine.gl);
        let loaderAnimations = new Loader([
            '/views/singleplay/animations/fireball.png', '/views/singleplay/animations/Fire 5.png', '/views/singleplay/animations/thunderbolt.png',
            '/views/singleplay/animations/healing.png', '/views/singleplay/animations/blade_flurry.png', '/views/singleplay/animations/attack.png',
            '/views/singleplay/animations/holly_wrath.png', '/views/singleplay/animations/activeTile.png'
        ], this.engine.gl);
        let loaderConditions = new Loader([
            '/views/singleplay/conditions/WarriorAngry.png',
            '/views/singleplay/conditions/WarriorAttack.png',
            '/views/singleplay/conditions/WarriorDead.png',
            '/views/singleplay/conditions/MageAngry.png',
            '/views/singleplay/conditions/MageAttack.png',
            '/views/singleplay/conditions/MageDead.png',
            '/views/singleplay/conditions/ThiefAngry.png',
            '/views/singleplay/conditions/ThiefAttack.png',
            '/views/singleplay/conditions/ThiefDead.png',
            '/views/singleplay/conditions/PriestAngry.png',
            '/views/singleplay/conditions/PriestAttack.png',
            '/views/singleplay/conditions/PriestDead.png',
            '/views/singleplay/conditions/Skeleton1Angry.png',
            '/views/singleplay/conditions/Skeleton1Attack.png',
            '/views/singleplay/conditions/Skeleton1Dead.png',
            '/views/singleplay/conditions/Skeleton2Angry.png',
            '/views/singleplay/conditions/Skeleton2Attack.png',
            '/views/singleplay/conditions/Skeleton2Dead.png'
        ], this.engine.gl);
        let loaderEntities = new Loader([
            '/views/singleplay/entity/warrior_portrait.png',
            '/views/singleplay/entity/mage_portrait.png',
            '/views/singleplay/entity/thief_portrait.png',
            '/views/singleplay/entity/priest_portrait.png',
            '/views/singleplay/entity/skeleton1_portrait.png',
            '/views/singleplay/entity/skeleton2_portrait.png',
            '/views/singleplay/entity/warrior.png',
            '/views/singleplay/entity/mage.png',
            '/views/singleplay/entity/thief.png',
            '/views/singleplay/entity/priest.png',
            '/views/singleplay/entity/skeleton1.png',
            '/views/singleplay/entity/skeleton2.png'
        ], this.engine.gl);
        loaderTextures.load((textures) => {
            loaderAnimations.load((animations) => {
                loaderConditions.load((conditions) => {
                    loaderEntities.load((entities) => {
                        this.textures = textures;
                        this.initGui();
                        this.initEvents();
                        let animation = new Animation(this);
                        this.animtaionManager = new AnimationManager(animation, this.spriteManager, this.activeTile, this.actionPoint, this.state, animations, this.textures[7]);
                        this.unitManager = new UnitManager(animation, this.animtaionManager, this.spriteManager, this.activeTile, this.actionPoint, this.state, entities, textures, conditions);
                        this.engine.render();
                    }, callback);
                });
            });
        });
    }

    initEvents() {
        document.addEventListener('mousemove', function(event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY /window.innerHeight;
            let xMin = (1 + global.mapShiftX)/2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY)/2;
            let yMax = yMin + 0.8;
            if (x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').hidden && document.getElementById('lose').hidden && !this.state.AnimationOnMap) {
                let i = Math.floor(((x - xMin) / 0.6) / (1 / 16));
                let j = Math.floor(((y - yMin) / 0.8) / (1 / 12));
                if (i < 16 && j < 12 && global.tiledMap[i][j].active) {
                    this.spriteManager.getSprite(this.activeElem).setTrans(Utils.translationOnMap(j, i));
                } else {
                    this.spriteManager.getSprite(this.activeElem).setTrans([-2, -2]);
                }
            }
        }.bind(this));
        document.addEventListener('click', (event) => {
            let x = event.clientX / this.engine.gl.canvas.clientWidth;
            let y = event.clientY / this.engine.gl.canvas.clientHeight;
            if (x >= 0.95 && y >= 0.95) {
                console.log(event.clientX + ' ' + event.clientY);
                if (!this.fullScreen) {
                    document.documentElement.mozRequestFullScreen();
                    this.fullScreen = true;
                } else {
                    document.mozCancelFullScreen();
                    this.fullScreen = false;
                }
            }
            if (x>=0.25 && x <=0.3 && y<=0.05) {
                let action = new Action();
                action.sender = null;
                action.target = null;
                action.ability = null;
                global.actionDeque.push(action);
            }
        });
    }

    initGui() {
        this.activeTile = this.spriteManager.addSprite(-0.9, [
            -2, 3
        ], this.textures[1], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.activeElem = this.spriteManager.addSprite(-1, [
            -2, 3
        ], this.textures[2], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.spriteManager.addSprite(1, [
            0.95, -1 + 0.05 * this.ratio
        ], this.textures[3], Utils.madeRectangle(0, 0, 0.05, -0.05 * this.ratio), true);
        this.actionPoint = this.spriteManager.addSprite(0, Utils.transActionPoint(0), this.textures[6], Utils.madeRectangle(0, 0, 0.023, -0.050*global.ratio), true);
        document.body.style.height = '100vh';
        let rigthBar =  document.createElement('div');
        rigthBar.style.position = 'absolute';
        rigthBar.style.right = '1vw';
        rigthBar.style.top = '17.7vh';
        rigthBar.style.height = '80vh';
        rigthBar.style.width = '8vw';
        rigthBar.style.backgroundImage = 'url(\'/views/singleplay/textures/right_bar.png\')';
        rigthBar.style.backgroundSize = '100% 100%';
        rigthBar.style.backgroundRepeat = 'no-repeat';
        document.getElementsByClassName('container')[0].appendChild(rigthBar);
        let skillBar = document.createElement('div');
        skillBar.style.position = 'absolute';
        skillBar.style.right = '32.5vw';
        skillBar.style.top = '0';
        skillBar.style.width = '35vw';
        skillBar.style.height = '7vh';
        skillBar.style.backgroundImage = 'url(\'/views/singleplay/textures/skill_bar.png\')';
        skillBar.style.backgroundSize = '100% 100%';
        skillBar.style.backgroundRepeat = 'no-repeat';
        document.getElementsByClassName('container')[0].appendChild(skillBar);
    }
}
