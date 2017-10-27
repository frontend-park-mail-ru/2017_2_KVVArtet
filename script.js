// import DungeonMapMaker from "DungeonMapMaker"
'use strict';

class Graphic {
  constructor(map) {
    this.ratio = 16/9;
    this.map = map;
    this.fpsNode = document.createTextNode("");
    this.timeNode = document.createTextNode("");
    this.images = [];
    this.DrawObjects = [];
    this.AttribLocations = [];
    this.UniformLocations = [];
    this.actionDeque = [];
    this.time = 0;
    this.dropMenu = 0;
    console.log("constructor");
  }


  InitGr(callback1) {
    console.log("1");
    this.InitGlAndEvents();
    console.log("2");
    this.InitHtmlObjects();
    console.log("3");
    this.InitMapAndBackground();
    console.log("4");
    this.InitGui();
    console.log("5");
    this.StartGame();
    console.log("6");
    callback1();
  }

  loadImage(url, callback) {
    let image = new Image();
    image.src = url;
    image.onload = callback;
    return image;
  }

  loadImages(urls, arg) {
    let imagesToLoad = urls.length;
    let onImageLoad = function() {
      imagesToLoad--;
      if (imagesToLoad == 0) {
        this.kek(arg);
      }
    };
    for (let i = 0; i < imagesToLoad; i++) {
      let image = this.loadImage(urls[i], onImageLoad);
      this.images.push(image);
    }
  }

  kek() {
    console.log('kekeke');
  }

  AddDrawObject(translation, texture, vertexs, blend, texCoord) {
    let obj = new DrawObject(translation, texture, vertexs, blend, texCoord);
    this.DrawObjects.push(obj);
    return this.DrawObjects.length - 1;
  }

  AddEntity(TileEntity) {
    let unit = TileEntity.unitOnTile;
    let nameTexture = unit.class;
    let index;
    switch (nameTexture) {
      case 'thief':
        index = 9;
        break;
      case 'mage':
        index = 10;
        break;
      case 'priest':
        index = 11;
        break;
      case 'skeleton1':
        index = 12;
        break;
      case 'skeleton2':
        index = 13;
        break;
      case 'warrior':
        index = 14;
        break;
      default:
        console.log("ERROR ADDENTITY, NAMETEXTURE NOT FOUND");
    }
    let t = translationOnMap(TileEntity.xpos, TileEntity.ypos);
    t[0] -= 0.008;
    t[1] += (1.2/16)*this.ratio;
    unit.mapId = this.AddDrawObject(t, this.images[index], madeRectangle(0, 0, 1.2/14, -(1.2/9)*this.ratio), true);
  }

  MoveEntity(TileStart, TileDest) {
    let obj = this.DrawObjects[TileStart.unitOnTile.mapId];
    let time = performance.now()*0.001;
    let pT = obj.translation;
    let nT = translationOnMap(TileDest.xpos, TileDest.ypos);
    nT[1] += (1.2/16)*this.ratio;
    let deltaTranslation = [nT[0] - pT[0], nT[1] - pT[1]];
    let timeAnimation = 2;
    requestAnimationFrame(AnimationMove);

    function AnimationMove(now) {
      now *= 0.001;
      let deltaTime = now - time;
      if (deltaTime >= timeAnimation) {
        obj.translation = nT;
      } else {
        obj.translation = [pT[0] + deltaTranslation[0]*deltaTime/timeAnimation,
          pT[1] + deltaTranslation[1]*deltaTime/timeAnimation];
        requestAnimationFrame(AnimationMove);
      }
    }
  }

  Fireball(TileStart, TileDest) {
    let time = performance.now()*0.001;
    let StartObj = this.DrawObjects[TileStart];
    let DestObj = this.DrawObjects[TileDest];
    let StartT = StartObj.translation;
    let DestT = DestObj.translation;
    let deltaT = [DestT[0] - StartT[0], DestT[1] - StartT[1]];
    let timeAnimation = 2;
    let index = this.AddDrawObject(StartT, this.images[15], madeRectangle(0, 0, 0.06, -0.06*this.ratio), true);
    this.Build();
    requestAnimationFrame(AnimationFireball);
    function AnimationFireball(now) {
      now *= 0.001;
      let deltaTime = now - time;
      if (deltaTime >= timeAnimation) {
        time = now;
        this.DeleteEntity(index);
        let obj = [];
        for (let ii = i - 2; ii < i + 3; ii++) {
          for (let jj = j - 2; jj < j + 3; jj++) {
            if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
              obj.push(this.AddDrawObject(translationOnMap(ii, jj), this.images[46], madeRectangle(0, 0, 1/16, -(1/16)*this.ratio), true));
            }
          }
        }
        this.Build();
        this.Explosion(obj);
        setTimeout(function(obj) {
          obj.forEach(function(item) {
            this.DeleteEntity(item);
          });
          this.Build();
        }, 2000, obj);
      } else {
        let AnimObj = DrawObjects[index];
        AnimObj.texture = images[15 + Math.floor((deltaTime % 1)/(1/31))];
        AnimObj.translation = [StartT[0] + deltaT[0]*deltaTime/timeAnimation, StartT[1] + deltaT[1]*deltaTime/timeAnimation]
        requestAnimationFrame(AnimationFireball);
      }
    }
  }

  Explosion(obj) {
    let time = performance.now()*0.001;
    let timeAnimation = 2;
    requestAnimationFrame(AnimationExplosion);

    function AnimationExplosion(now) {
      now *= 0.001;
      let deltaTime = now - time;
      if (deltaTime < timeAnimation) {
        let texture = this.images[46 + Math.floor((deltaTime % 1)/(1/44))];
        obj.forEach(function(item) {
          this.DrawObjects[item].texture = texture;
        });
        requestAnimationFrame(AnimationExplosion);
      }
    }
  }

  DeleteEntity(TileEntity) {
    delete this.DrawObjects[TileEntity.unitOnTile.mapId];
  }

  ActiveEntity(unit) {
    document.onmousedown = function(event) {
        if (event.which == 1 && this.activeElem[1] != -1 && this.dropMenu == 0) {
          let div = document.createElement('div');
          this.dropMenu = div;
          let ul = document.createElement('ul');
          div.className = 'drop-menu';
          div.style.left = event.clientX - 40 + 'px';
          div.style.top = event.clientY - 15 + 'px';
          div.appendChild(ul);
          unit.skills.forEach(function(item) {
            let li = document.createElement('li');
            li.innerHTML = item.name;
            li.onclick = function() {
              this.actionDeque.push([unit, item, this.map[this.activeElem[2]][this.activeElem[1]].unitOnTile]);
              this.dropMenu.remove();
              this.dropMenu = 0;
            };
            ul.appendChild(li);
          });
          document.getElementsByClassName('container')[0].appendChild(div);
        } else if (event.which == 1 && this.dropMenu != 0 && event.target.tagName != 'LI') {
          this.dropMenu.remove();
          this.dropMenu = 0;
        }
      };
  }

  SetTranslation(index, x) {
    this.DrawObjects[index].translation = x;
  }

  InitGlAndEvents() {
    this.gl = document.getElementById('canvas').getContext("webgl");
    if (!this.gl) {
      alert('Беда, брат! Твой браузер не поддерживает WebGl, но ты держись :D');
    return;
    }
    this.gl.canvas.onmousemove = function(event) {
      let x = event.clientX / this.gl.canvas.clientWidth;
      let y = event.clientY / this.gl.canvas.clientHeight;
      if (x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865) {
        let i = Math.floor(((x - 0.2)/0.6)/(1/16));
        let j = Math.floor(((y - 0.065)/0.8)/(1/12));
        if (this.map[j][i].isWall) {
          this.SetTranslation(this.activeElem[0], [-2, -2]);
          this.activeElem[1] = -1;
          this.activeElem[2] = -1;
        } else if (this.activeElem[1] == -1 || this.activeElem[1] != i || this.activeElem[2] != j) {
          this.SetTranslation(this.activeElem[0], translationOnMap(i, j));
          this.activeElem[1] = i;
          this.activeElem[2] = j;
        }
      } else {
        this.SetTranslation(this.activeElem[0], [-2, -2]);
        this.activeElem[1] = -1;
      }
    };
    document.addEventListener("contextmenu",
      function(event) {
        event.preventDefault();
    });

    this.gl.canvas.onmouseup = function(event) {
      if (this.DrawObjects[this.clickElem].translation[0] != -2) {
        this.SetTranslation(this.clickElem, [-2, -2]);
      }
    };
  }

  InitHtmlObjects() {
    document.getElementById('fps').appendChild(this.fpsNode);
    let timeElem = document.getElementById('time');
    timeElem.appendChild(this.timeNode);
    timeElem.parentNode.style.top = "25%";
    timeElem.parentNode.style.left = "6.3%";
  }

  InitMapAndBackground() {
    this.AddDrawObject([0, 0], this.images[6], madeRectangle(-1, 1, 1, -1));
    let coord = madeRectangle(0, 0, 1.2/16, -(1.2/16)*this.ratio);
    this.map.forEach(function (item, j) {
      item.forEach(function (value, i) {
        if (!value.isWall) {
          AddDrawObject(translationOnMap(i, j), images[0], coord);
        } else {
          AddDrawObject(translationOnMap(i, j), images[1], coord);
      };
    })});
  }

  InitGui() {
    this.activeElem = [
      this.AddDrawObject([-2, -2], this.images[2], madeRectangle(0, 0, 1.2/16, -(1.2/16)*this.ratio)), -1, -1];
    this.clickElem = this.AddDrawObject([-2, -2], this.images[3], madeRectangle(0, 0, 1.2/16, -(1.2/16)*this.ratio));
    this.AddDrawObject([-0.6, 0.85], this.images[8], madeRectangle(0, 0, 1.2, -(1.2/16)*12*this.ratio), true,
    madeRectangle(0.008, 0.01, 0.990, 0.992)); // сетка
    this.AddDrawObject([-0.55, -0.79], this.images[5], madeRectangle(0, 0, 1.1, -0.2)); // lowbar
    this.AddDrawObject([-0.63, -0.80], this.images[4], madeRectangle(0, 0, 0.1, -0.17), true); // стрелочка
    this.AddDrawObject([-0.9, 0.95], this.images[7], madeRectangle(0, 0, 0.2, -0.6)); // часы
  }


  StartGame() {
    console.log("STARTGAME");
    let program = createProgramWithShaders(this.gl,
      [['2d-vertex-shader', this.gl.VERTEX_SHADER], ['2d-fragment-shader', this.gl.FRAGMENT_SHADER]]);

    this.AttribLocations.push({name: 'position', location: this.gl.getAttribLocation(program, 'a_position')});
    this.AttribLocations.push({name: 'texCoord', location: this.gl.getAttribLocation(program, 'a_texcoord')});
    this.UniformLocations.push({name: 'translation', location: this.gl.getUniformLocation(program, 'u_translation')});

    console.log(this.AttribLocations.length);
    this.Build();

    let texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    requestAnimationFrame(DrawScene);

    function DrawScene(now) {
      now *= 0.001;
      let deltaTime = now - time;
      this.time = now;
      this.fpsNode.nodeValue = (1/deltaTime).toFixed(0);
      let minutes = Math.floor(now / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let seconds = Math.floor(now % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.timeNode.nodeValue = minutes + ":" + seconds;
      document.getElementById('time').style.fontSize = this.gl.canvas.clientWidth/5.5 + "%";

      resize(this.gl);
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      this.gl.useProgram(program);

      this.AttribLocations.forEach(function(obj, i) {
        this.gl.enableVertexAttribArray(obj.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.buffer);
        this.gl.vertexAttribPointer(obj.location, 2, this.gl.FLOAT, false, 0, 0);
      });

      this.Draw();
      requestAnimationFrame(DrawScene);
    }

    function Draw() {
      let offset = 0;
      this.DrawObjects.forEach(function(obj, i) {
        if (obj.blend) {
          this.gl.enable( this.gl.BLEND );
          this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        } else {
          this.gl.disable(this.gl.BLEND);
        }
        this.gl.uniform2fv(this.UniformLocations[0].location, obj.translation);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, obj.texture);
        this.gl.drawArrays(this.gl.TRIANGLES, offset, 6);
        offset += 6;
      });
    }
  }

  Build() {
    let defTexCoord = madeRectangle(0, 0, 1, 1);
    let texCoord = [];
    let vertexs = [];
    this.DrawObjects.forEach(function(item) {
      vertexs = vertexs.concat(item.vertexs);
      if (item.texCoord) {
        texCoord = texCoord.concat(item.texCoord);
      } else {
        texCoord = texCoord.concat(defTexCoord);
      }
    });
    console.log(this.AttribLocations.length);
    this.AttribLocations[0].coord = vertexs;
    this.AttribLocations[1].coord = texCoord;

    this.AttribLocations.forEach(function(obj, i) {
      obj.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(obj.coord), this.gl.STATIC_DRAW);
    });
  }

  Init(callback) {
      this.loadImages(['textures/grass.jpg', 'textures/wall.jpg', 'textures/activeGrass.jpg',
      'textures/clickGrass.jpg','textures/arrow.png', 'textures/lowbar.jpg',
      'textures/background.jpg', 'textures/hourglass.png', 'textures/grid.png', 'entity/thief.png',
      'entity/mage.png', 'entity/priest.png', 'entity/skeleton1.png', 'entity/skeleton2.png',
      'entity/warrior.png', 'animations/fireball/1.gif', 'animations/fireball/2.gif',
      'animations/fireball/3.gif', 'animations/fireball/4.gif', 'animations/fireball/5.gif',
      'animations/fireball/6.gif', 'animations/fireball/7.gif', 'animations/fireball/8.gif',
      'animations/fireball/9.gif', 'animations/fireball/10.gif', 'animations/fireball/11.gif',
      'animations/fireball/12.gif', 'animations/fireball/13.gif', 'animations/fireball/14.gif',
      'animations/fireball/15.gif', 'animations/fireball/16.gif', 'animations/fireball/17.gif',
      'animations/fireball/18.gif', 'animations/fireball/19.gif', 'animations/fireball/20.gif',
      'animations/fireball/21.gif', 'animations/fireball/22.gif', 'animations/fireball/23.gif',
      'animations/fireball/24.gif', 'animations/fireball/25.gif', 'animations/fireball/26.gif',
      'animations/fireball/27.gif', 'animations/fireball/28.gif', 'animations/fireball/29.gif',
      'animations/fireball/30.gif', 'animations/fireball/31.gif', 'animations/explosion/1.gif',
      'animations/explosion/2.gif',
      'animations/explosion/3.gif', 'animations/explosion/4.gif', 'animations/explosion/5.gif',
      'animations/explosion/6.gif', 'animations/explosion/7.gif', 'animations/explosion/8.gif',
      'animations/explosion/9.gif', 'animations/explosion/10.gif', 'animations/explosion/11.gif',
      'animations/explosion/12.gif', 'animations/explosion/13.gif', 'animations/explosion/14.gif',
      'animations/explosion/15.gif', 'animations/explosion/16.gif', 'animations/explosion/17.gif',
      'animations/explosion/18.gif', 'animations/explosion/19.gif', 'animations/explosion/20.gif',
      'animations/explosion/21.gif', 'animations/explosion/22.gif', 'animations/explosion/23.gif',
      'animations/explosion/24.gif', 'animations/explosion/25.gif', 'animations/explosion/26.gif',
      'animations/explosion/27.gif', 'animations/explosion/28.gif', 'animations/explosion/29.gif',
      'animations/explosion/30.gif', 'animations/explosion/31.gif', 'animations/explosion/32.gif',
      'animations/explosion/33.gif',
      'animations/explosion/34.gif', 'animations/explosion/35.gif', 'animations/explosion/36.gif',
      'animations/explosion/37.gif', 'animations/explosion/38.gif', 'animations/explosion/39.gif',
      'animations/explosion/40.gif', 'animations/explosion/41.gif', 'animations/explosion/42.gif',
      'animations/explosion/43.gif', 'animations/explosion/44.gif'], callback);
  }
}

let map = new DungeonMapMaker().dungeonMapMaker(Math.random() * 25 + 20);
let graphic = new Graphic(map);
graphic.Init(Game);

function Game() {
  // // let skills = [new Skill(), new Skill()];
  // // skills[0].name = 'fireball';
  // // skills[1].name = 'move';
  // // let units = [new Unit(), new Unit(), new Unit()];
  // // map[3][3].unitOnTile = units[0];
  // // units[0].class = "mage";
  // // units[0].skills = skills;
  // // units[0].xpos = 3; units[0].ypos = 3;
  // // graphic.AddEntity(map[3][3]);
  // // map[6][5].unitOnTile = units[1];
  // // units[1].class = "warrior";
  // // units[1].skills = skills;
  // // units[1].xpos = 5; units[0].ypos = 6;
  // // graphic.AddEntity(map[6][5]);
  // // map[0][6].unitOnTile = units[2];
  // // units[2].class = "skeleton1";
  // // units[2].skills = skills;
  // // units[2].xpos = 6; units[2].ypos = 0;
  // // graphic.AddEntity(map[0][6]);
  // // graphic.Build();
  // // let i = 0;
  // // gameloop();
  //
  // function gameloop() {
  //   graphic.ActiveEntity(units[i % 3]);
  //   requestAnimationFrame(kek);
  //   i++;
  // }
  //
  // function kek() {
  //   if (actionDeque.length == 0) {
  //     requestAnimationFrame(kek);
  //   } else {
  //     let action = actionDeque.pop();
  //     if (action[1] == 'move') {
  //       MoveEntity(map[action[0].xpos][action[0].ypos], map[action[2].xpos][action[2].ypos]);
  //       gameloop();
  //     } else if (action[1] == 'fireball') {
  //       Fireball(map[action[0].xpos][action[0].ypos], map[action[2].xpos][action[2].ypos]);
  //       gameloop();
  //     } else {
  //       requestAnimationFrame(kek);
  //     }
  //   }
  // }
}
