import Utils from './Utils';
export default class AnimationManager {
    constructor(Animation, spriteManager, activeTile, actionPoint, state, animations, texture) {
        this.Animation = Animation;
        this.state = state;
        this.spriteManager = spriteManager;
        this.texture = texture;
        this.activeTile = activeTile;
        this.actionPoint = actionPoint;
        this.animations = animations;
    }

    stateCheck(callback) {
        if (this.state.state) {
            setTimeout(function() {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.state = true;
    }

    movingTo(TileStart, path) {
        if (this.stateCheck(this.movingTo.bind(this, TileStart, path))) {
            return;
        }
        if (!TileStart.unitOnTile) {
            return;
        }
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.texture);
        let unit = TileStart.unitOnTile;
        for (let i = path.length - 1; i >= 0; i--) {
            if (i == path.length - 1) {
                this.Animation.MoveAnimation(Utils.translationForUnits(unit), Utils.translationForUnits(path[i]), 0.2, unit.entity.mapId);
                this.Animation.MoveAnimation(Utils.transForHealthbar(unit), Utils.transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
            } else {
                setTimeout(function() {
                    this.Animation.MoveAnimation(Utils.translationForUnits(path[i + 1]), Utils.translationForUnits(path[i]), 0.2, unit.entity.mapId);
                    this.Animation.MoveAnimation(Utils.transForHealthbar(path[i + 1]), Utils.transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
                }.bind(this), 200 * (path.length - 1 - i));
            }
        }
        let transActiveTile = this.spriteManager.getSprite(this.activeTile).getTrans();
        setTimeout(function() {
            if (transActiveTile == this.spriteManager.getSprite(this.activeTile).getTrans()) {
                this.spriteManager.getSprite(this.activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
            }
            this.state.state = false;
        }.bind(this), 200 * (path.length));
    }

    thunderbolt(TileStart, TileDest) {
        let DestT = Utils.translationForUnits(TileDest.unitOnTile);
        let thunderboltId = this.spriteManager.addSprite(12, Utils.translationOnMap(TileDest.ypos, TileDest.xpos), this.animations[2], Utils.madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true,
            Utils.madeRectangle(0, 0, 1 / 5, -1 / 2));
        this.Animation.FrameAnimation(thunderboltId, 0.5, 8, 5, 2, true);
    }

    fireball(TileStart, TileDest) {
        let timeA = Math.sqrt(Math.pow(TileStart.xpos - TileDest.xpos, 2) + Math.pow(TileStart.ypos - TileDest.ypos, 2))/6;
        let fireballId = this.spriteManager.addSprite(12, Utils.translationOnMap(TileStart.ypos, TileDest.xpos), this.animations[0], Utils.madeRectangle(0, 0, 0.06, -0.06 * 16/9), true,
            Utils.madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(fireballId, timeA, 32, 6, 6, true);
        this.Animation.MoveAnimation(Utils.translationForUnits(TileStart), Utils.translationOnMap(TileDest.ypos, TileDest.xpos),
            timeA, fireballId);
        setTimeout(function() {
            for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
                for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
                    if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
                        this.Animation.FrameAnimation(this.spriteManager.addSprite(12, Utils.translationOnMap(jj, ii), this.animations[1], Utils.madeRectangle(0, 0, 1 / 16, -(1 / 16) * 16/9), true,
                            Utils.madeRectangle(0, 0, 1/5, -1/4)),
                        1.2, 20, 5, 4, true);
                    }
                }
            }
        }.bind(this), timeA*1000);
    }

    healing(units) {
        units.forEach(function(unit) {
            let healId = this.spriteManager.addSprite(12, Utils.translationOnMap(unit.ypos - 1, unit.xpos - 1), this.animations[3], Utils.madeRectangle(0, 0, 3.6/16, -(3.6/16) * 16/9), true,
                Utils.madeRectangle(0, 0, 1/5, -1/5));
            this.Animation.FrameAnimation(healId, 1, 25, 5, 5, true);
        }.bind(this));
    }

    blade_flurry(target) {
        let blade_flurryId = this.spriteManager.addSprite(12, Utils.translationOnMap(target.ypos - 2, target.xpos - 2), this.animations[4], Utils.madeRectangle(0, 0, 6/16, -(6/16)* 16/9), true,
            Utils.madeRectangle(0, 0, 1/5, -1/4));
        this.Animation.FrameAnimation(blade_flurryId, 1, 20, 5, 4, true);
    }

    attack(target) {
        let attackId = this.spriteManager.addSprite(12, Utils.translationOnMap(target.ypos - 0.9, target.xpos - 0.7), this.animations[5], Utils.madeRectangle(0, 0, 2.8/16, -(2.8/16)* 16/9), true,
            Utils.madeRectangle(0, 0, 1/5, -1/2));
        this.Animation.FrameAnimation(attackId, 0.5, 10, 5, 2, true);
    }

    holly_wrath(sender, target) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2))/6;
        let holly_wrathId = this.spriteManager.addSprite(12, Utils.translationOnMap(sender.ypos - 1, sender.xpos - 1), this.animations[6], Utils.madeRectangle(0, 0, 3.6/16, -(3.6/16) * 16/9), true,
            Utils.madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(holly_wrathId, timeA, 21, 5, 5, true);
        this.Animation.MoveAnimation(Utils.translationForUnits(sender), Utils.translationOnMap(target.ypos - 1, target.xpos - 1), timeA, holly_wrathId);
    }

    animationActiveTile(unit) {
        let trans = Utils.transForHealthbar(unit);
        this.spriteManager.getSprite(this.activetile).setTrans([trans[0] - 0.02, trans[1] - 0.01]);
    }
}
