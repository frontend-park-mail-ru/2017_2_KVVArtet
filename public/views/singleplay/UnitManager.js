import Entity from './Entity';
import Utils from './Utils';
import Action from './Action';

export default class UnitManager {
    constructor(Animation, animationManager, spriteManager, activeTile, actionPoint, state, entities, textures, conditions) {
        this.Animation = Animation;
        this.units = [];
        this.spriteManager = spriteManager;
        this.animationManager = animationManager;
        this.entities = entities;
        this.textures = textures;
        this.conditions = conditions;
        this.firstActiveUnit = true;
        this.massiveSkill = false;
        this.activeTile = activeTile;
        this.circle = spriteManager.addSprite(0, Utils.transActiveCircle(0), this.textures[5], Utils.madeRectangle(0, 0, 0.015, -0.015*global.ratio), true);
        this.actionPoint = actionPoint;
        this.activeIndex = 0;
        this.possibleMoves = [];
        this.state = state;
        this.indexUnit = {
            warrior: 0,
            mage: 1,
            thief: 2,
            priest: 3,
            skeleton1: 4,
            skeleton2: 5
        };
        this.skillbar = [];

    }

    stateCheck(callback) {
        console.log(this.state);
        if (this.state.state) {
            setTimeout(function() {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.state = true;
    }

    timeAndRunSkill(nameSkill, sender, target, runAnimation, wounded) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2))/6;
        switch (nameSkill) {
        case 'Fire ball':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.fireball(sender, target);
                }.bind(this), 500);
            }
            return timeA*1000;
        case 'Thunderbolt':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.thunderbolt(sender, target);
                }.bind(this), 500);
            }
            return 500;

        case 'Massive Heal':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.healing(wounded);
                }.bind(this), 500);
            }
            return 1000;
        case 'Blade flurry':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.blade_flurry(target);
                }.bind(this), 500);
            }
            return 1000;
        case 'Attack': case 'Sawtooth knife':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.attack(target);
                }.bind(this), 500);
            }
            return 500;
        case 'Holly wrath':
            if (runAnimation) {
                setTimeout(function() {
                    this.animationManager.holly_wrath(sender, target);
                }.bind(this), 500);
            }
            return timeA*1000;
        }
        return 500;
    }

    updateHealth(wounded) {
        wounded.forEach(function(item) {
            if (item.healthpoint[0] > 0) {
                this.spriteManager.getSprite(item.entity.lowbarHealthId).setVertexs(Utils.madeRectangle(0, 0, (1.2 / 16) * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, (1.2 / 16) * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
            } else {
                this.spriteManager.getSprite(item.entity.lowbarHealthId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
            }
        }.bind(this));
    }

    addUnit(unit) {
        unit.entity = new Entity();
        unit.entity.lowbarId = this.spriteManager.addSprite(0, Utils.transOnLowbar(this.units.length), this.entities[this.indexUnit[unit.class]], Utils.madeRectangle(0, 0, 0.075, -0.075 * global.ratio), true);
        unit.entity.mapId = this.spriteManager.addSprite(unit.ypos, Utils.translationForUnits(unit), this.entities[6 + this.indexUnit[unit.class]], Utils.madeRectangle(0, 0, (1.2 / 9) * 1.7, -(1.2 / 9) * 1.7 * global.ratio), true);
        unit.entity.lowbarHealthId = this.spriteManager.addColorSprite(0, Utils.transOnLowbarHealth(this.units.length), Utils.madeRectangle(0, 0, 0.075, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        unit.entity.healthbarId = this.spriteManager.addColorSprite(unit.ypos, Utils.transForHealthbar(unit), Utils.madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        this.units.push(unit);
    }

    updateSkillbar(name, sender, target) {
    }

    static neighbors(sender, target) {
        console.log("sender"+sender+" target"+target+" neighvoors?");
        if (target.xpos + 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.xpos - 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.ypos + 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        if (target.ypos - 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        return false;
    }


    activeUnit(unit) {
        if (this.firstActiveUnit) {
            this.firstActiveUnit = false;
        } else {
            // this.changeActiveUnit(unit);
        }
        this.currentUnit = unit;
        this.massiveSkill = false;
        let skills = document.getElementsByClassName('skill');
        for (let i = skills.length - 1; i >= 0; i--) {
            skills[i].remove();
        }
        let activeSkillImg = document.getElementById('activeSkill');
        if (!activeSkillImg) {
            activeSkillImg = document.createElement('img');
            activeSkillImg.id = 'activeSkill';
            activeSkillImg.style.position = 'absolute';
            activeSkillImg.style.top = '0';
            activeSkillImg.style.left = 32.5 + 'vw';
            activeSkillImg.style.width = '3.7vw';
            activeSkillImg.style.height = 3.7*global.ratio + 'vh';
            activeSkillImg.src = '/views/singleplay/textures/activeTile.png';
            this.activeSkill = unit.skills[0];
            document.getElementsByClassName('container')[0].appendChild(activeSkillImg);
        } else {
            this.activeSkill = unit.skills[0];
            activeSkillImg.style.left = 32.5 + 'vw';
        }
        unit.skills.forEach(function(skill, i) {
            console.log(skill.name);
            let skillImg = document.createElement('img');
            skillImg.title = skill.getDesciption();
            skillImg.className = 'skill';
            skillImg.style.position = 'absolute';
            skillImg.style.top = '1.1vh';
            skillImg.style.left = (i*3.5 + 0.45 + 32.5) + 'vw';
            skillImg.style.width = '2.6vw';
            skillImg.style.height = 2.6*global.ratio + 'vh';
            skillImg.src = '/views/singleplay/icons/' + skill.name + '.png';
            document.getElementsByClassName('container')[0].appendChild(skillImg);
        }.bind(this));
        // this.animationManager.animationActiveTile(unit);
        while(this.units[this.activeIndex % this.units.length].isDead()) {
            this.activeIndex++;
        }
        this.spriteManager.getSprite(this.circle).setTrans(Utils.transActiveCircle(this.activeIndex % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTrans(Utils.transActionPoint(this.activeIndex++ % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[6]);
        this.spriteManager.getSprite(this.activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
        document.onmousedown = function(event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY / window.innerHeight;
            let xMin = (1 + global.mapShiftX)/2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY)/2;
            let yMax = yMin + 0.8;
            console.log('onmousedown STATE: ' + this.state.state);
            if (event.which === 1 && x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').style.display === 'none' && document.getElementsByClassName('settings')[0].style.display === 'none' && !this.state.state) {
                let i = Math.floor(((x - xMin) / 0.6) / (1 / 16));
                let j = Math.floor(((y - yMin) / 0.8) / (1 / 12));
                if (global.tiledMap[i][j].active || this.massiveSkill) {
                    let action = new Action();
                    action.sender = global.tiledMap[unit.xpos][unit.ypos];
                    action.target = global.tiledMap[i][j];
                    action.ability = this.activeSkill.name === 'Move' ? null : this.activeSkill;
                    global.actionDeque.push(action);
                    if (this.massiveSkill) {
                        this.deleteLastActiveTiles();
                    }
                }
            } else if (event.which === 1 && x >= 0.33 && x <= 0.675 && y >= 0 && y <= 0.07 && document.getElementById('win').style.display === 'none' && document.getElementsByClassName('settings')[0].style.display === 'none') {
                let i = Math.floor((x - 0.33)/(0.35/10));
                this.setCurrentSkill(i);
            }
            return false;
        }.bind(this);
    }

    setCurrentSkill(i, path) {
        if (this.stateCheck(this.setCurrentSkill.bind(this, i, path))) {
            return;
        }
        this.state.state = false;
        if (path) {
            this.path = path;
        }
        if (i >= this.currentUnit.skills.length) {
            return;
        }
        if (i === 0) {
            this.drawActiveTiles(this.path);
            this.massiveSkill = false;
        } else if (this.currentUnit.skills[i].typeOfArea === 'circle') {
            this.possibleMoves.forEach(function(move) {
                global.tiledMap[move.xpos][move.ypos].active = false;
                this.spriteManager.deleteSprite(move.id);
            }.bind(this));
            this.massiveSkill = true;
        } else {
            this.massiveSkill = false;
            let tiles = this.getActiveTiles(global.tiledMap[this.currentUnit.xpos][this.currentUnit.ypos], this.currentUnit.skills[i]);
            this.drawActiveTiles(tiles);
        }
        this.activeSkill = this.currentUnit.skills[i];
        let activeSkill = document.getElementById('activeSkill');
        activeSkill.style.left = 32.5 + (35/10)*i + 'vw';
    }

    getActiveTiles(x, y) {
        let result = [];
        this.units.forEach((unit) => {
            if (y.damage[0] > 0) {
                if (unit.type !== x.unitOnTile.type && !unit.isDead()) {
                    if (this.currentUnit.shooter || (Math.abs(this.currentUnit.xpos - unit.xpos) <= 1 && Math.abs(this.currentUnit.ypos - unit.ypos) <= 1)) {
                        result.push(global.tiledMap[unit.xpos][unit.ypos]);
                    }
                }
            } else {
                if (unit.type === x.unitOnTile.type && !unit.isDead()) {
                    if (this.currentUnit.shooter || (Math.abs(this.currentUnit.xpos - unit.xpos) <= 1 && Math.abs(this.currentUnit.ypos - unit.ypos) <= 1)) {
                        result.push(global.tiledMap[unit.xpos][unit.ypos]);
                    }
                }
            }
        });
        return result;
    }

    deleteLastActiveTiles() {
        this.possibleMoves.forEach(function(move) {
            global.tiledMap[move.xpos][move.ypos].active = false;
            this.spriteManager.deleteSprite(move.id);
        }.bind(this));
        this.possibleMoves = [];
    }

    drawActiveTiles(tiles) {
        this.deleteLastActiveTiles();
        tiles.forEach(function(tile) {
            this.possibleMoves.push({
                id: this.spriteManager.addSprite(-2, Utils.translationOnMap(tile.ypos, tile.xpos), (tile.unitOnTile && !tile.unitOnTile.isDead()) ? (tile.unitOnTile.type === this.currentUnit.type ? this.textures[9] : this.textures[10]) : this.textures[0], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * global.ratio), true),
                xpos: tile.xpos,
                ypos: tile.ypos
            });
            global.tiledMap[tile.xpos][tile.ypos].active = true;
        }.bind(this));
        this.units.forEach((unit) => {
            this.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
            this.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        this.spriteManager.sortSprites();
    }

    unitAttack(nameSkill, sender, target, wounded) {
        this.state.state = true;
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[7]);
        this.updateSkillbar(nameSkill, sender, target);
        let index = this.indexUnit[sender.unitOnTile.class];
        this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[3 * index]);
        let timer = this.timeAndRunSkill(nameSkill, sender, target, true, wounded);
        setTimeout(function(nameSkill, sender, target) {
            this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[1 + 3 * index]);
            setTimeout(function(sender, target) {
                // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
                if (sender.unitOnTile.healthpoint[0] > 0) {
                    this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.entities[6 + index]);
                }
                this.updateHealth(wounded);
                this.state.state = false;
            }.bind(this, sender, target), timer + 100);
        }.bind(this, nameSkill, sender, target), 500);
    }

    unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
        this.unitAttack(nameSkill, sender, target, wounded);
        let timer = this.timeAndRunSkill(nameSkill, sender, target);
        setTimeout(() => {
            // this.removeUnitsInInitiativeLine(DeadUnits);
            DeadUnits.forEach((unit) => {
                this.spriteManager.getSprite(unit.entity.lowbarId).setTexture(this.textures[8]);
                this.spriteManager.getSprite(unit.entity.mapId).setTexture(this.conditions[2 + 3 * this.indexUnit[unit.class]]);
                this.spriteManager.getSprite(unit.entity.lowbarHealthId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
                this.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
            });
        }, timer + 800);
    }
}
