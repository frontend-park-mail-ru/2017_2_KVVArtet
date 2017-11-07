class AnimationManager {
  constructor(spriteManager, activeTile, state, animations) {
    this.state = state;
    this.spriteManager = spriteManager;
    this.activeTile = activeTile;
    this.animations = animations;
  }

  stateCheck(callback) {
    if (this.state.AnimationOnMap) {
      setTimeout(function() {
        requestAnimationFrame(callback);
      }, 50);
      return true;
    }
    this.state.AnimationOnMap = true;
  }

  movingTo(TileStart, path) {
    if (this.stateCheck(this.movingTo.bind(this, TileStart, path))) {
      return;
    }
    let unit = TileStart.unitOnTile;
    for (let i = path.length - 1; i >= 0; i--) {
      if (i == path.length - 1) {
        Animation.MoveAnimation(Utils.translationForUnits(unit), Utils.translationForUnits(path[i]), 0.2, unit.entity.mapId);
        Animation.MoveAnimation(Utils.transForHealthbar(unit), Utils.transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
      } else {
        setTimeout(function() {
          Animation.MoveAnimation(Utils.translationForUnits(path[i + 1]), Utils.translationForUnits(path[i]), 0.2, unit.entity.mapId);
          Animation.MoveAnimation(Utils.transForHealthbar(path[i + 1]), Utils.transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
        }, 200 * (path.length - 1 - i));
      }
    }
    let transActiveTile = this.spriteManager.getSprite(this.activeTile).getTrans();
    setTimeout(function() {
      if (transActiveTile == this.spriteManager.getSprite(this.activeTile).getTrans()) {
        this.spriteManager.getSprite(this.activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
      }
      this.state.AnimationOnMap = false;
    }.bind(this), 200 * (path.length));
  }

  thunderbolt(TileStart, TileDest) {
    let DestT = Utils.translationForUnits(TileDest.unitOnTile);
    let thunderboltId = this.spriteManager.addSprite(12, Utils.translationOnMap(TileDest.ypos, TileDest.xpos), this.animations[2], Utils.madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true,
      Utils.madeRectangle(0, 0, 1 / 9, -1 / 8));
    Animation.FrameAnimation(thunderboltId, 2, 64, 9, 8, true);
  }

  fireball(TileStart, TileDest) {
    let fireballId = this.spriteManager.addSprite(12, Utils.translationOnMap(TileStart.ypos, TileDest.xpos), this.animations[0], Utils.madeRectangle(0, 0, 0.06, -0.06 * ratio), true,
      Utils.madeRectangle(0, 0, 1 / 6, -1 / 6));
    Animation.FrameAnimation(fireballId, 2, 32, 6, 6, true);
    Animation.MoveAnimation(Utils.translationForUnits(TileStart), Utils.translationOnMap(TileDest.ypos, TileDest.xpos),
      2, fireballId);
    setTimeout(function() {
      for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
        for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
          if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
            Animation.FrameAnimation(this.spriteManager.addSprite(12, Utils.translationOnMap(jj, ii), this.animations[1], Utils.madeRectangle(0, 0, 1 / 16, -(1 / 16) * ratio), true),
              1.2, 44, 6, 8, true);
          }
        }
      }
    }.bind(this), 2000);
  }
}
