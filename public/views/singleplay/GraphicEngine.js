import {vertexShader,fragmentShader,vertexShader1 ,fragmentShader1} from './Shaders'
import Program from './Program'
import Utils from './Utils'
import {Sprite,Attribute,Uniform} from './Sprite'
import "./global.js"
export default  class GraphicEngine {
  constructor(idCanvas, loop) {
    this.sprites = [];
    this.loop = loop;
    this.gl = document.getElementById(idCanvas).getContext("webgl");
    if (!this.gl) {
      alert('Error in initializate ' + idCanvas + ': Беда, брат! Твой браузер не поддерживает WebGl, но ты держись :D');
      return;
    }
    this.programForSprite = new Program(this.gl, vertexShader, fragmentShader).create();
    this.programForColorObj = new Program(this.gl, vertexShader1, fragmentShader1).create();
    // this.time = performance.now() + 1;
  }

  addSprite(translation, texture, vertexs, blend, texCoord) {
    let attributes = [new Attribute('a_position', vertexs),
      new Attribute('a_texcoord', texCoord ? texCoord : Utils.madeRectangle(0, 0, 1, 1))
    ];
    let uniforms = [new Uniform('u_translation', translation)];
    let sprite = new Sprite(this.gl, this.programForSprite, attributes, uniforms, blend, texture);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  addColorSprite(translation, vertexs, color, blend) {
    let attributes = [new Attribute('a_position', vertexs)];
    let uniforms = [new Uniform('u_translation', translation), new Uniform('u_color', color)];
    let sprite = new Sprite(this.gl, this.programForColorObj, attributes, uniforms, blend);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  render(now) {
    // now *= 0.001;
    // let deltaTime = now - this.time;
    // this.time = now;
    // if (deltaTime != 0) {
    //   document.getElementById('fps').innerHTML = (1 / deltaTime).toFixed(0);
    //   document.getElementById('fps').style.color = 'white';
    // }

    Utils.resize(this.gl);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    let lastProgram;
    this.sprites.forEach((sprite) => {
      if (lastProgram === undefined) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      } else if (lastProgram !== sprite.program) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      }
      sprite.render();
    });

    if (this.loop) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}
