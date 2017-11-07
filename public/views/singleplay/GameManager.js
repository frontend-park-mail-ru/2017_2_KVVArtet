class GameManager {
  constructor() {
    this.ratio = 16/9;
    this.engine =  new GraphicEngine('canvas', true);
    this.spriteManager = new SpriteManager(this.engine);
    this.state = new State();
    this.fullScreen = false;
  }

  startGameRendering(callback) {
    let loaderTextures = new Loader(['textures/activeGrass.jpg', 'textures/activeTile.png', 'textures/select.png', 'icons/fullscreen.png'], this.engine.gl);
    let loaderAnimations = new Loader(['animations/fireball.png', 'animations/explosion.png', 'animations/thunderbolt1.png'], this.engine.gl);
    let loaderConditions = new Loader(['conditions/WarriorAngry.png', 'conditions/WarriorAttack.png', 'conditions/WarriorDead.png',
                                       'conditions/MageAngry.png', 'conditions/MageAttack.png', 'conditions/MageDead.png',
                                       'conditions/ThiefAngry.png', 'conditions/ThiefAttack.png', 'conditions/ThiefDead.png',
                                       'conditions/PriestAngry.png', 'conditions/PriestAttack.png', 'conditions/PriestDead.png',
                                       'conditions/Skeleton1Angry.png', 'conditions/Skeleton1Attack.png', 'conditions/Skeleton1Dead.png',
                                       'conditions/Skeleton2Angry.png', 'conditions/Skeleton2Attack.png', 'conditions/Skeleton2Dead.png'], this.engine.gl);
    let loaderEntities = new Loader(['entity/warrior_portrait.png', 'entity/mage_portrait.png',
                                     'entity/thief_portrait.png', 'entity/priest_portrait.png',
                                     'entity/skeleton1_portrait.png', 'entity/skeleton2_portrait.png',
                                     'entity/warrior.png', 'entity/mage.png', 'entity/thief.png',
                                     'entity/priest.png', 'entity/skeleton1.png', 'entity/skeleton2.png'], this.engine.gl);
    loaderTextures.load((textures) => {
      loaderAnimations.load((animations) => {
        loaderConditions.load((conditions) => {
          loaderEntities.load((entities) => {
            this.textures = textures;
            this.initGui();
            this.initEvents();
            this.animtaionManager = new AnimationManager(this.spriteManager, this.activeTile, this.state, animations);
            this.unitManager = new UnitManager(this.animtaionManager, this.spriteManager, this.activeTile, this.state, entities, textures, conditions);
            this.engine.render();
          }, callback);
        });
      });
    });
  }

  initEvents() {
    document.addEventListener('mousemove', function(event) {
      let x = event.clientX / this.engine.gl.canvas.clientWidth;
      let y = event.clientY / this.engine.gl.canvas.clientHeight;
      if (x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hidden && !this.state.AnimationOnMap) {
        let i = Math.floor(((x - 0.2) / 0.6) / (1 / 16));
        let j = Math.floor(((y - 0.065) / 0.8) / (1 / 12));
        if (window.tiledMap[i][j].active) {
          this.spriteManager.getSprite(this.activeElem).setTrans(Utils.translationOnMap(j, i));
        } else {
          this.spriteManager.getSprite(this.activeElem).setTrans([-2, -2]);
        }
      };
    }.bind(this));
    document.addEventListener('click', (event) => {
      let x = event.clientX / this.engine.gl.canvas.clientWidth;
      let y = event.clientY / this.engine.gl.canvas.clientHeight;
      if (x >= 0.95 && y >= 0.95) {
        if (!this.fullScreen) {
          document.documentElement.mozRequestFullScreen();
          this.fullScreen = true;
        } else {
          document.mozCancelFullScreen();
          this.fullScreen = false;
        }
      }
    });
  }

  initGui() {
    this.activeTile = this.spriteManager.addSprite(-0.9, [-2, 3], this.textures[1], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio));
    this.activeElem = this.spriteManager.addSprite(-1, [-2, 3], this.textures[2], Utils.madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio));
    this.spriteManager.addSprite(1, [0.95, -1 + 0.05*this.ratio], this.textures[3], Utils.madeRectangle(0, 0, 0.05, -0.05*this.ratio), true);
  }
}
