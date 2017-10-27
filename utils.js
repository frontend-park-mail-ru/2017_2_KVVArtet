'use strict';

function createShader(gl, type, source) {
  let shader = gl.createShader(type); // создание шейдера
  gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
  gl.compileShader(shader); // компилируем шейдер
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) { // если компиляция прошла успешно - возвращаем шейдер
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgramWithShaders(gl, shadersIdAndTypes) {
  let program = gl.createProgram();
  shadersIdAndTypes.forEach(function (shader) {
    let source = document.getElementById(shader[0]).text;
    gl.attachShader(program, createShader(gl, shader[1], source));
  });
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}


function resize(gl) {
  let displayWidth = gl.canvas.clientWidth;
  let displayHeight = gl.canvas.clientHeight;
  if (gl.canvas.width != displayWidth || gl.canvas.height != displayHeight) {
    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function madeRectangle(x0, y0, width, height) {
  return [
    x0, y0,
    width, y0,
    x0, height,
    x0, height,
    width, y0,
    width, height
  ];
}


function translationOnMap(i, j) {
  return [-0.6 + i*(1.2/16), 0.85 - j*(1.2/16)*ratio];
}
