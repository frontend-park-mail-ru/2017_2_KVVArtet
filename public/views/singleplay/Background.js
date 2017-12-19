import GraphicEngine from './GraphicEngine';
import Utils from './Utils';
import Loader from './Loader';

export default class Background {
    constructor(numberSchene) {
        this.ratio = 16 / 9;
        this.engine = new GraphicEngine('background', false);
        this.schene = numberSchene;
    }

    static randomInteger() {
        var rand = Math.random() * (4);
        rand = Math.floor(rand);
        return rand;
    }

    InitMapAndSprites() {
        this.engine.addSprite([0, 0], this.textures[4], Utils.madeRectangle(-1, 1, 1, -1));
        let coord = Utils.madeRectangle(0, 0, 1.2 / 16 - 0.015, -(1.2 / 16 - 0.015) * this.ratio);
        global.tiledMap.forEach(function(item, j) {
            item.forEach(function(value, i) {
                if (value.isWall) {
                    let trans = Utils.translationOnMap(i, j);
                    this.engine.addSprite([trans[0] + 0.0075, trans[1] - 0.0075], this.textures[Background.randomInteger()], coord, true);
                }
            }.bind(this));
        }.bind(this));
        for (let i = global.mapShiftX; i <= 1.2 + global.mapShiftX; i += 1.2/16) {
            this.engine.addColorSprite([i, 0.65], Utils.madeRectangle(0, 0, 0.001, -1.6), [1, 1, 1, 1]);
        }
        for (let i = -0.95; i <= 0.65; i += 1.2/16*global.ratio) {
            this.engine.addColorSprite([global.mapShiftX, i], Utils.madeRectangle(0, 0, 1.2, -0.0018), [1, 1, 1, 1]);
        }
        this.engine.addSprite([-0.6, 0.995], this.textures[5], Utils.madeRectangle(0, 0, 0.1875, -0.13), true);
        this.engine.addSprite([0.68, 0.97], this.textures[6], Utils.madeRectangle(0, 0, 0.07, -0.07*global.ratio));
        this.engine.addSprite([0.78, 0.97], this.textures[7], Utils.madeRectangle(0, 0, 0.07, -0.07*global.ratio));
        this.engine.addSprite([0.88, 0.97], this.textures[8], Utils.madeRectangle(0, 0, 0.07, -0.07*global.ratio));
    }

    render() {
        let loader;
        switch(this.schene) {
            case 0:
                loader = new Loader(['/views/singleplay/textures/wall0.png', '/views/singleplay/textures/wall1.png',
                    '/views/singleplay/textures/wall2.png', '/views/singleplay/textures/wall3.png', '/views/singleplay/textures/back1.png',
                    '/views/singleplay/textures/timer.png', '/views/singleplay/icons/talk.png',  '/views/singleplay/icons/bag.png',
                    '/views/singleplay/icons/settings.png'], this.engine.gl);
                break;
        }
        loader.load(this.onLoad.bind(this));
    }
    onLoad(textures) {
        this.textures = textures;
        this.InitMapAndSprites();
        this.engine.render();
        window.addEventListener('resize', function() {
            this.engine.render(performance.now());
        }.bind(this));
    }
}
