import Entity from './Entity';
import Utils from './Utils';
import Action from './Action';

export default class UnitManager {
    constructor(Animation, animationManager, spriteManager, activeTile, state, entities, textures, conditions) {
        this.Animation = Animation;
        this.units = [];
        this.ratio = 16/9;
        this.spriteManager = spriteManager;
        this.animationManager = animationManager;
        this.entities = entities;
        this.textures = textures;
        this.conditions = conditions;
        this.firstActiveUnit = true;
        this.activeTile = activeTile;
        this.possibleMoves = [];
        this.dropMenu = 0;
        this.state = state;
        this.indexUnit = {
            warrior: 0,
            mage: 1,
            thief: 2,
            priest: 3,
            skeleton1: 4,
            skeleton2: 5
        };
    }

    stateCheck(callback) {
        if (this.state.AnimationOnLowbar) {
            setTimeout(function() {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.AnimationOnLowbar = true;
    }

    timeAndRunSkill(nameSkill, sender, target, runAnimation, wounded) {
        switch (nameSkill) {
        case 'Fire ball':
            if (runAnimation) {
                this.animationManager.fireball(sender, target);
            }
            return 1500;
        case 'Thunderbolt':
            if (runAnimation) {
                this.animationManager.thunderbolt(sender, target);
            }
            return 500;

        case 'Massive Heal':
            if (runAnimation) {
                this.animationManager.healing(wounded);
            }
            return 1000;
        case 'Blade flurry':
            if (runAnimation) {
                this.animationManager.blade_flurry(target);
            }
            return 1000;
        case 'Attack': case 'Sawtooth knife':
            if (runAnimation) {
                this.animationManager.attack(target);
            }
            return 500;
        case 'Holly wrath':
            if (runAnimation) {
                this.animationManager.holly_wrath(sender, target);
            }
            return 1500;
        }
        return 500;
    }

    updateHealth(wounded) {
        wounded.forEach(function(item) {
            if (item.healthpoint[0] > 0) {
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, (1.2 / 16) * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
            } else {
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
            }
        }.bind(this));
    }

    addUnit(unit) {
        unit.entity = new Entity();
        unit.entity.lowbarId = this.spriteManager.addSprite(0, Utils.transOnLowbar(this.units.length),this.entities[this.indexUnit[unit.class]], Utils.madeRectangle(0, 0, 0.09, -0.09 * this.ratio), true);
        unit.entity.mapId = this.spriteManager.addSprite(unit.ypos, Utils.translationForUnits(unit), this.entities[6 + this.indexUnit[unit.class]], Utils.madeRectangle(0, 0, (1.2 / 9) * 1.7, -(1.2 / 9) * 1.7 * this.ratio), true);
        unit.entity.healthbarId = this.spriteManager.addColorSprite(unit.ypos, Utils.transForHealthbar(unit), Utils.madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        this.units.push(unit);
    }

    changeActiveUnit() {
        if (this.stateCheck(this.changeActiveUnit.bind(this))) {
            return;
        }
        let x = this.units[0];
        this.units.splice(0, 1);
        this.units.push(x);
        let t = Utils.transOnLowbar(0);
        this.Animation.MoveAnimation(t, [t[0], t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
        for (let i = 0; i < this.units.length - 1; i++) {
            this.Animation.MoveAnimation(Utils.transOnLowbar(i + 1), Utils.transOnLowbar(i),
                0.8, this.units[i].entity.lowbarId);
        }
        setTimeout(function() {
            let t = Utils.transOnLowbar(0);
            this.Animation.MoveAnimation([t[0], t[1] + 0.17], [t[0] + (this.units.length - 1) * 0.1, t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
        }.bind(this), 600);
        setTimeout(function() {
            let t = Utils.transOnLowbar(this.units.length - 1);
            this.Animation.MoveAnimation([t[0], t[1] + 0.17], t, 0.5, this.units[this.units.length - 1].entity.lowbarId);
        }.bind(this), 1120);
        setTimeout(function() {
            this.state.AnimationOnLowbar = false;
        }.bind(this), 1650);
    }

    removeUnitsInInitiativeLine(units) {
        if (this.stateCheck(this.removeUnitsInInitiativeLine.bind(this, units))) {
            return;
        }
        units.forEach(function(unit) {
            this.units.splice(this.units.indexOf(unit), 1);
            this.spriteManager.deleteSprite(unit.entity.lowbarId);
        }.bind(this));
        this.units.forEach(function(unit, i) {
            this.Animation.MoveAnimation(this.spriteManager.getSprite(unit.entity.lowbarId).getTrans(), Utils.transOnLowbar(i), 0.5, unit.entity.lowbarId);
        }.bind(this));
        setTimeout(function() {
            this.state.AnimationOnLowbar = false;
        }.bind(this), 510);
    }

    activeUnit(unit) {
        if (this.firstActiveUnit) {
            this.firstActiveUnit = false;
        } else {
            this.changeActiveUnit(unit);
        }
        this.spriteManager.getSprite(this.activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
        document.onmousedown = function(event) {
            let x = event.clientX / document.getElementById('canvas').clientWidth;
            let y = event.clientY / document.getElementById('canvas').clientHeight;
            if (event.which === 1 && x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hidden && this.dropMenu === 0 && !this.state.AnimationOnMap) {
                let i = Math.floor(((x - 0.2) / 0.6) / (1 / 16));
                let j = Math.floor(((y - 0.065) / 0.8) / (1 / 12));
                let div = document.createElement('div');
                this.dropMenu = div;
                let ul = document.createElement('ul');
                div.className = 'drop-menu';
                div.style.left = event.clientX - 40 + 'px';
                div.style.top = event.clientY - 15 + 'px';
                div.appendChild(ul);
                let elem = global.tiledMap[i][j];
                let func = function(item) {
                    let li = document.createElement('li');
                    li.innerHTML = item.name;
                    li.onclick = function() {
                        let action = new Action();
                        action.sender = global.tiledMap[unit.xpos][unit.ypos];
                        action.target = global.tiledMap[i][j];
                        action.ability = item;
                        global.actionDeque.push(action);
                        this.dropMenu.remove();
                        this.dropMenu = 0;
                    }.bind(this);
                    ul.appendChild(li);
                }.bind(this);
                if (elem.isOccupied() && elem.unitOnTile.type === unit.type) {
                    console.log('Союзник');
                    unit.skills.forEach(function(item) {
                        if (item.typeOfArea === 'circle' && item.damage[0] < 0) {
                            func(item);
                        }
                    });
                } else if (elem.isOccupied() && elem.unitOnTile.type !== unit.type) {
                    console.log('Противник');
                    unit.skills.forEach(function(item) {
                        if (item.damage[0] > 0) {
                            func(item);
                        }
                    });
                } else {
                    console.log('Карта');
                    unit.skills.forEach(function(item) {
                        if (item.typeOfArea === 'circle') {
                            func(item);
                        }
                    });
                    if (elem.active) {
                        let li = document.createElement('li');
                        li.innerHTML = 'Move';
                        li.onclick = function () {
                            let action = new Action();
                            action.sender = global.tiledMap[unit.xpos][unit.ypos];
                            action.target = global.tiledMap[i][j];
                            action.ability = null;
                            global.actionDeque.push(action);
                            this.dropMenu.remove();
                            this.dropMenu = 0;
                        }.bind(this);
                        ul.appendChild(li);
                    }
                }
                document.getElementsByClassName('container')[0].appendChild(div);
            } else if (event.which === 1 && this.dropMenu !== 0 && event.target.tagName !== 'LI') {
                this.dropMenu.remove();
                this.dropMenu = 0;
            }
        }.bind(this);
    }

    unitAttack(nameSkill, sender, target, wounded) {
        let index = this.indexUnit[sender.unitOnTile.class];
        this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[3 * index]);
        setTimeout(function(nameSkill, sender, target) {
            this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[1 + 3 * index]);
            let timer = this.timeAndRunSkill(nameSkill, sender, target, true, wounded);
            setTimeout(function(sender, target) {
                // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
                this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.entities[6 + index]);
                this.updateHealth(wounded);
            }.bind(this, sender, target), timer + 300);
        }.bind(this, nameSkill, sender, target), 500);
    }

    unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
        this.unitAttack(nameSkill, sender, target, wounded);
        let timer = this.timeAndRunSkill(nameSkill);
        setTimeout(() => {
            this.removeUnitsInInitiativeLine(DeadUnits);
            DeadUnits.forEach((unit) => {
                this.spriteManager.getSprite(unit.entity.mapId).setTexture(this.conditions[2 + 3 * this.indexUnit[target.unitOnTile.class]]);
                this.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
            });
        }, timer + 800);
    }

    showPossibleMoves(path) {
        for (let i = 0; i < this.possibleMoves.length; i++) {
            global.tiledMap[this.possibleMoves[i].xpos][this.possibleMoves[i].ypos].active = false;
            this.spriteManager.deleteSprite(this.possibleMoves[i].id);
        }
        this.possibleMoves = [];
        for (let i = 0; i < path.length; i++) {
            this.possibleMoves.push({
                id: this.spriteManager.addSprite(-2, Utils.translationOnMap(path[i].ypos, path[i].xpos), this.textures[0], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio)),
                xpos: path[i].xpos,
                ypos: path[i].ypos
            });
            global.tiledMap[path[i].xpos][path[i].ypos].active = true;
        }
        this.units.forEach((unit) => {
            this.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
            this.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        this.spriteManager.sortSprites();
    }
}
