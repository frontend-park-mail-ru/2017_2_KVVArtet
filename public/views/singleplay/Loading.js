import GraphicEngine from './GraphicEngine';
import Utils from './Utils';
import Loader from './Loader';

export default class Loading {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'loading';
        this.canvas.style.zIndex = '2000';
        document.body.appendChild(this.canvas);
        this.engine = new GraphicEngine('loading', true);
        let loader = new Loader(['/views/singleplay/animations/loading2.png'], this.engine.gl);
        loader.load(function(texture) {
            this.engine.addColorSprite([0, 0], Utils.madeRectangle(-1, 1, 1, -1), [231/255, 223/255, 221/255, 1], true);
            let id = this.engine.addSprite([0, 0], texture[0], Utils.madeRectangle(-0.5, 0.5*global.ratio, 0.5, -0.5*global.ratio), true, Utils.madeRectangle(0, 0, 1/9, 1/10));
            this.engine.render();
            let timeA = 2;
            let countFrames = 90;
            let colls = 9;
            let rows = 10;
            let currentTime = performance.now() * 0.001;
            requestAnimationFrame(FrameAnim.bind(this));
            function FrameAnim(now) {
                now *= 0.001;
                let deltaTime = now - currentTime;
                if (deltaTime >= timeA) {
                    if (global.load) {
                        delete this.engine.sprites[id];
                        this.engine.loop = false;
                        document.getElementById('loading').remove();
                    } else {
                        currentTime = now;
                        requestAnimationFrame(FrameAnim.bind(this));
                    }
                } else {
                    let frame = Math.floor((deltaTime % timeA)/timeA * countFrames);
                    this.engine.sprites[id].setTexCoord(Utils.madeRectangle((frame % colls)/colls, Math.floor(frame / colls)/rows, ((frame % colls) + 1)/colls, (Math.floor(frame / colls)+ 1)/rows));
                    requestAnimationFrame(FrameAnim.bind(this));
                }
            }
        }.bind(this));
    }
}