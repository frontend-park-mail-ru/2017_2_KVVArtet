let ratio = 16 / 9;
let activeElem;
let activeTile;
let textures = [];
let animations = [];
let conditions = [];
let entities = [];
let dropMenu = 0;
let lowbar = 0;
let lowbarUnits = [];
let notFirstActive = false;
let possibleMoves = [];
let stateAnimationOnMap = false;
let stateAnimationOnLowbar = false;
let indexUnit = {
  warrior: 0,
  mage: 1,
  thief: 2,
  priest: 3,
  skeleton1: 4,
  skeleton2: 5
};
let gameManager;

function AddEntity(unit) {
  let nameTexture = unit.class;
  unit.entity = new Entity();
  unit.entity.lowbarId = gameManager.spriteManager.addSprite(0, Utils.transOnLowbar(lowbar++), gameManager.entities[indexUnit[unit.class]], Utils.madeRectangle(0, 0, 0.09, -0.09 * ratio), true);
  unit.entity.mapId = gameManager.spriteManager.addSprite(unit.ypos, Utils.translationForUnits(unit), gameManager.entities[6 + indexUnit[unit.class]], Utils.madeRectangle(0, 0, (1.2 / 9) * 1.7, -(1.2 / 9) * 1.7 * ratio), true);
  unit.entity.healthbarId = gameManager.spriteManager.addColorSprite(unit.ypos, Utils.transForHealthbar(unit), Utils.madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
  lowbarUnits.push(unit);
}

function movingTo(TileStart, path) {
  if (stateAnimationOnMap) {
    setTimeout(function() {
      requestAnimationFrame(movingTo.bind(this, TileStart, path));
    }, 50);
    return;
  }
  stateAnimationOnMap = true;

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
  let transActiveTile = gameManager.spriteManager.getSprite(activeTile).getTrans();
  setTimeout(function() {
    if (transActiveTile == gameManager.spriteManager.getSprite(activeTile).getTrans()) {
      gameManager.spriteManager.getSprite(activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
    }
    stateAnimationOnMap = false;
  }, 200 * (path.length));
}

function Thunderbolt(TileStart, TileDest) {
  let DestT = Utils.translationForUnits(TileDest.unitOnTile);
  let thunderbolt = gameManager.spriteManager.addSprite(12, Utils.translationOnMap(TileDest.ypos, TileDest.xpos), gameManager.animations[2], Utils.madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true,
    Utils.madeRectangle(0, 0, 1 / 9, -1 / 8));
  Animation.FrameAnimation(thunderbolt, 2, 64, 9, 8, true);
}

function Fireball(TileStart, TileDest) {
  let fireball = gameManager.spriteManager.addSprite(12, Utils.translationOnMap(TileStart.ypos, TileDest.xpos), gameManager.animations[0], Utils.madeRectangle(0, 0, 0.06, -0.06 * ratio), true,
    Utils.madeRectangle(0, 0, 1 / 6, -1 / 6));
  Animation.FrameAnimation(fireball, 2, 32, 6, 6, true);
  Animation.MoveAnimation(Utils.translationForUnits(TileStart), Utils.translationOnMap(TileDest.ypos, TileDest.xpos),
    2, fireball);
  setTimeout(function() {
    for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
      for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
        if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
          Animation.FrameAnimation(gameManager.spriteManager.addSprite(12, Utils.translationOnMap(jj, ii), gameManager.animations[1], Utils.madeRectangle(0, 0, 1 / 16, -(1 / 16) * ratio), true),
            1.2, 44, 6, 8, true);
        }
      }
    }
  }, 2000);
}

function ChangeActiveEntity() {
  if (stateAnimationOnLowbar) {
    setTimeout(function() {
      requestAnimationFrame(ChangeActiveEntity);
    }, 50);
    return;
  }
  stateAnimationOnLowbar = true;
  let x = lowbarUnits[0];
  lowbarUnits.splice(0, 1);
  lowbarUnits.push(x);
  let t = Utils.transOnLowbar(0);
  Animation.MoveAnimation(t, [t[0], t[1] + 0.17], 0.5, lowbarUnits[lowbarUnits.length - 1].entity.lowbarId);
  for (let i = 0; i < lowbarUnits.length - 1; i++) {
    Animation.MoveAnimation(Utils.transOnLowbar(i + 1), Utils.transOnLowbar(i),
      0.8, lowbarUnits[i].entity.lowbarId);
  }
  setTimeout(function() {
    let t = Utils.transOnLowbar(0);
    Animation.MoveAnimation([t[0], t[1] + 0.17], [t[0] + (lowbarUnits.length - 1) * 0.1, t[1] + 0.17], 0.5, lowbarUnits[lowbarUnits.length - 1].entity.lowbarId);
  }, 600);
  setTimeout(function() {
    let t = Utils.transOnLowbar(lowbarUnits.length - 1);
    Animation.MoveAnimation([t[0], t[1] + 0.17], t, 0.5, lowbarUnits[lowbarUnits.length - 1].entity.lowbarId);
  }, 1120);
  setTimeout(function() {
    stateAnimationOnLowbar = false;
  }, 1650);
}

function RemoveUnitsInInitiativeLine(units) {
  if (stateAnimationOnLowbar) {
    setTimeout(function() {
      requestAnimationFrame(RemoveUnitsInInitiativeLine.bind(this, units));
    }, 50);
    return;
  }
  stateAnimationOnLowbar = true;
  units.forEach(function(unit) {
    lowbarUnits.splice(lowbarUnits.indexOf(unit), 1);
    gameManager.spriteManager.deleteSprite(unit.entity.lowbarId);
  });
  lowbarUnits.forEach(function(unit, i) {
    Animation.MoveAnimation(gameManager.spriteManager.getSprite(unit.entity.lowbarId).getTrans(), Utils.transOnLowbar(i), 0.5, unit.entity.lowbarId);
  });
  setTimeout(function() {
    stateAnimationOnLowbar = false;
  }, 510);
}

function ActiveEntity(unit) {
  lowbarUnits.forEach((unit) => {
    gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
    gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
  });
  gameManager.spriteManager.sortSprites();
  if (notFirstActive) {
    ChangeActiveEntity(unit);
  } else {
    notFirstActive = true;
  }
  gameManager.spriteManager.getSprite(activeTile).setTrans(Utils.translationOnMap(unit.ypos, unit.xpos));
  document.onmousedown = function(event) {
    let x = event.clientX / gameManager.engine.gl.canvas.clientWidth;
    let y = event.clientY / gameManager.engine.gl.canvas.clientHeight;
    if (event.which == 1 && x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hasAttribute('hidden') && dropMenu == 0 && !stateAnimationOnMap) {
      let i = Math.floor(((x - 0.2) / 0.6) / (1 / 16));
      let j = Math.floor(((y - 0.065) / 0.8) / (1 / 12));
      let div = document.createElement('div');
      dropMenu = div;
      let ul = document.createElement('ul');
      div.className = 'drop-menu';
      div.style.left = event.clientX - 40 + 'px';
      div.style.top = event.clientY - 15 + 'px';
      div.appendChild(ul);
      let elem = window.tiledMap[i][j];
      let func = function(item) {
        let li = document.createElement('li');
        li.innerHTML = item.name;
        li.onclick = function() {
          let action = new Action();
          action.sender = window.tiledMap[unit.xpos][unit.ypos];
          action.target = window.tiledMap[i][j];
          action.ability = item;
          actionDeque.push(action);
          dropMenu.remove();
          dropMenu = 0;
        };
        ul.appendChild(li);
      };
      // if (!elem.active) {
      //   return;
      // }
      if (elem.isOccupied() && elem.unitOnTile.type == unit.type) {
        console.log("Союзник");
        unit.skills.forEach(function(item, i) {
          if (item.name != 'Move' && item.typeOfArea == "circle" && item.damage[0] < 0) {
            console.log(item.name);
            func(item);
          }
        });
      } else if (elem.isOccupied() && elem.unitOnTile.type != unit.type) {
        console.log("Противник")
        unit.skills.forEach(function(item, i) {
          if (item.name != 'Move' && item.damage[0] > 0) {
            console.log(item.name);
            func(item);
          }
        });
      } else {
        console.log("Карта")
        unit.skills.forEach(function(item, i) {
          if (item.typeOfArea == "circle" || (item.name == 'Move' && elem.active)) {
            console.log(item.name);
            func(item);
          }
        });
      }
      document.getElementsByClassName('container')[0].appendChild(div);
    } else if (event.which == 1 && dropMenu != 0 && event.target.tagName != 'LI') {
      dropMenu.remove();
      dropMenu = 0;
    }
  };
}

function unitAttack(nameSkill, sender, target, wounded) {
  console.log(wounded);
  let index = indexUnit[sender.unitOnTile.class];
  gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.conditions[3 * index]);
  setTimeout(function(nameSkill, sender, target) {
    gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.conditions[1 + 3 * index]);
    let timer;
    switch (nameSkill) {
      case 'Fire ball':
        timer = 2000;
        Fireball(sender, target);
        break;
      case 'Thunderbolt':
        timer = 2000;
        Thunderbolt(sender, target);
        break;
      default:
        timer = 0;
        break;
    }
    setTimeout(function(sender, target) {
      // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
      gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.entities[6 + index]);
      wounded.forEach(function(item) {
        if (item.healthpoint[0] > 0) {
          gameManager.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, (1.2 / 16) * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
        } else {
          gameManager.spriteManager.getSprite(item.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
        }
      });
    }, timer + 400, sender, target);
  }, 500, nameSkill, sender, target);
}

function unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
  let index = indexUnit[sender.unitOnTile.class];
  gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.conditions[3 * index]);
  setTimeout(() => {
    gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.conditions[1 + 3 * index]);
    let timer;
    switch (nameSkill) {
      case 'Fire ball':
        timer = 2000;
        Fireball(sender, target);
        break;
      case 'Thunderbolt':
        timer = 2000;
        Thunderbolt(sender, target);
        break;
      default:
        timer = 500;
        break;
    }
    setTimeout(function(sender, target) {
      // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
      gameManager.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(gameManager.entities[6 + index]);
      RemoveUnitsInInitiativeLine(DeadUnits);
      DeadUnits.forEach((unit) => {
        gameManager.spriteManager.getSprite(unit.entity.mapId).setTexture(gameManager.conditions[2 + 3 * indexUnit[unit.class]]);
        gameManager.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
      });
      wounded.forEach((unit) => {
        if (unit.healthpoint[0] > 0) {
          gameManager.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, (1.2 / 16) * (unit.healthpoint[0] / unit.healthpoint[1]) - 0.006, -0.015));
        } else {
          gameManager.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(Utils.madeRectangle(0, 0, 0, 0));
        }
      });
    }, timer + 50, sender, target);
  }, 500);
}

function showPossibleMoves(path) {
  for (let i = 0; i < possibleMoves.length; i++) {
    window.tiledMap[possibleMoves[i].xpos][possibleMoves[i].ypos].active = false;
    gameManager.spriteManager.deleteSprite(possibleMoves[i].id);
  }
  possibleMoves = [];
  for (let i = 0; i < path.length; i++) {
    possibleMoves.push({
      id: gameManager.spriteManager.addSprite(-2, Utils.translationOnMap(path[i].ypos, path[i].xpos), gameManager.textures[0], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * ratio)),
      xpos: path[i].xpos,
      ypos: path[i].ypos
    });
    window.tiledMap[path[i].xpos][path[i].ypos].active = true;
  }
  lowbarUnits.forEach((unit) => {
    gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
    gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
  });
  gameManager.spriteManager.sortSprites();
}

function InitEvents() {
  document.onmousemove = function(event) {
    let x = event.clientX / gameManager.engine.gl.canvas.clientWidth;
    let y = event.clientY / gameManager.engine.gl.canvas.clientHeight;
    if (x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hasAttribute('hidden') && !stateAnimationOnMap) {
      let i = Math.floor(((x - 0.2) / 0.6) / (1 / 16));
      let j = Math.floor(((y - 0.065) / 0.8) / (1 / 12));
      if (window.tiledMap[i][j].active) {
        gameManager.spriteManager.getSprite(activeElem).setTrans(Utils.translationOnMap(j, i));
      } else {
        gameManager.spriteManager.getSprite(activeElem).setTrans([-2, -2]);
      }
    }
  };
}

function InitGui() {
  activeElem = gameManager.spriteManager.addSprite(-1, [-2, 3], gameManager.textures[2], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * ratio));
  activeTile = gameManager.spriteManager.addSprite(-0.9, [-2, 3], gameManager.textures[1], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * ratio));
}
