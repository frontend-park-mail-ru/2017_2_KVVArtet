import Utils from "./Utils"
export default class Animation {
  constructor(gameManager) {
    this.gameManager = gameManager;
  }
  static deltaTrans(start, deltaT, deltaTime, timeA) {
    return [start[0] + deltaT[0]*(deltaTime/timeA), start[1] + deltaT[1]*(deltaTime/timeA)];
  }

  MoveAnimation(start, dest, timeA, id) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        this.gameManager.unitManager.units.forEach(function(unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
      } else {
        this.gameManager.spriteManager.getSprite(id).setTrans(Animation.deltaTrans(start, deltaT, deltaTime, timeA));
        this.gameManager.unitManager.units.forEach(function(unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  MoveHtmlAnimation(element, start, dest, time) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= time) {
        element.style.right = dest[0] + 'vw';
        element.style.top = dest[1] + 'vh';
      } else {
        let dT = Animation.deltaTrans(start, deltaT, deltaTime, time);
        element.style.right = dT[0] + 'vw';
        element.style.top = dT[1] + 'vh';
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  FrameAnimation(id, timeA, countFrames,colls, rows, deleteInEnd) {
    let currentTime = performance.now() * 0.001;
    requestAnimationFrame(FrameAnim.bind(this));
    function FrameAnim(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        if (deleteInEnd) {
          this.gameManager.spriteManager.deleteSprite(id);
        }
      } else {
        let frame = Math.floor((deltaTime % timeA)/timeA * countFrames);
        this.gameManager.spriteManager.getSprite(id).setTexCoord(Utils.madeRectangle((frame % colls)/colls, Math.floor(frame / colls)/rows, ((frame % colls) + 1)/colls, (Math.floor(frame / colls)+ 1)/rows));
        requestAnimationFrame(FrameAnim.bind(this));
      }
    }
  }
}
