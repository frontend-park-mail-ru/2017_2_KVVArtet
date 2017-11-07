class Animation {
  static deltaTrans(start, deltaT, deltaTime, timeA) {
    return [start[0] + deltaT[0]*(deltaTime/timeA), start[1] + deltaT[1]*(deltaTime/timeA)];
  }

  static MoveAnimation(start, dest, timeA, id) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving);
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        gameManager.unitManager.units.forEach((unit) => {
          gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        gameManager.spriteManager.sortSprites();
      } else {
        gameManager.spriteManager.getSprite(id).setTrans(Animation.deltaTrans(start, deltaT, deltaTime, timeA));
        gameManager.unitManager.units.forEach((unit) => {
          gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        gameManager.spriteManager.sortSprites();
        requestAnimationFrame(Moving);
      }
    }
  }

  static FrameAnimation(id, timeA, countFrames,colls, rows, deleteInEnd) {
    let currentTime = performance.now() * 0.001;
    requestAnimationFrame(FrameAnim);
    function FrameAnim(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        if (deleteInEnd) {
          gameManager.spriteManager.deleteSprite(id);
        }
      } else {
        let frame = Math.floor((deltaTime % timeA)/timeA * countFrames);
        gameManager.spriteManager.getSprite(id).setTexCoord(Utils.madeRectangle((frame % colls)/colls, Math.floor(frame / colls)/rows, ((frame % colls) + 1)/colls, (Math.floor(frame / colls)+ 1)/rows));
        requestAnimationFrame(FrameAnim);
      }
    }
  }
}
