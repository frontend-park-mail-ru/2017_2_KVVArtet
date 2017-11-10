export default class Utils {
  static resize(gl) {
    let displayWidth = gl.canvas.clientWidth;
    let displayHeight = gl.canvas.clientHeight;
    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  static madeRectangle(x0, y0, width, height) {
    return [
      x0, y0,
      width, y0,
      x0, height,
      x0, height,
      width, y0,
      width, height
    ];
  }

  static translationOnMap(i, j) {
    return [-0.6 + j*(1.2/16), 0.85 - i*(1.2/16)*16/9];
  }

  static translationForUnits(unit) {
    return [-0.6 - 0.08 + unit.xpos*(1.2/16), 0.85 - unit.ypos*(1.2/16)*16/9 + (1.2 / 12) * 16/9];
  }

  static transOnLowbar(i) {
    return [-0.55 + 0.005 + i*0.1, -0.79 - 0.01];
  }

  static transForHealthbar(unit) {
    return [-0.6 + 0.003 + unit.xpos*(1.2/16), 0.85 - unit.ypos*(1.2/16)*16/9 + (1.2/17)* 16/9];
  }
}
