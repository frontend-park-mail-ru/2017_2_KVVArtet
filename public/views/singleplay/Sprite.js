class Sprite {
  constructor(gl, program, attributes, uniforms, blend, texture) {
    this.gl = gl;
    this.program = program;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.texture = texture;
    this.blend = blend;
    this.setAttributes();
    this.setUniforms();
    this.needRender = true;
  }

  getLocUnif(uniform) {
    return this.gl.getUniformLocation(this.program, uniform.name);
  }

  setUniforms() {
    this.uniforms.forEach(function(item) {
      item.location = this.getLocUnif(item);
    }.bind(this));
  }

  getLocAttr(attr) {
    return this.gl.getAttribLocation(this.program, attr.name);
  }

  setAttributes(valueAttributes) {
    this.attributes.forEach(function(item) {
      item.location = this.getLocAttr(item);
      item.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(item.data), this.gl.STATIC_DRAW);
    }.bind(this));
  }

  setVertexs(vertexs) {
    this.attributes[0].data = vertexs;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[0].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[0].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTexCoord(coord) {
    this.attributes[1].data = coord;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[1].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[1].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTrans(translation) {
    this.uniforms[0].value = translation;
    this.needRender = true;
  }

  getTrans() {
    return this.uniforms[0].value;
  }

  setTexture(texture) {
    this.texture = texture;
    this.needRender = true;
  }

  render() {
    this.attributes.forEach(function(item) {
      this.gl.enableVertexAttribArray(item.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.vertexAttribPointer(item.location, 2, this.gl.FLOAT, false, 0, 0);
    }.bind(this));

    this.uniforms.forEach(function(item) {
      if (item.value.length == 2) {
        this.gl.uniform2fv(item.location, item.value);
      } else if (item.value.length == 4) {
        this.gl.uniform4fv(item.location, item.value);
      }
    }.bind(this));

    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    if (this.blend) {
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.attributes[0].data.length/2);
    this.needRender = false;
  }
}

class Attribute {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

class Uniform {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

export {Sprite,Attribute,Uniform};
