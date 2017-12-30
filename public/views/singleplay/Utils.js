export default class Utils {
  static resize(gl) {
      if (window.location.pathname === '/singleplay') {
          let displayWidth = window.screen.availWidth*(window.devicePixelRatio === 1 ? 1 : 1.5);
          let displayHeight = window.screen.availHeight*(window.devicePixelRatio === 1 ? 1 : 1.5);
          if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
              gl.canvas.width = displayWidth;
              gl.canvas.height = displayHeight;
          }
          gl.viewport(0, 0, window.screen.availWidth*(window.devicePixelRatio === 1 ? 1 : 1.5), window.screen.availHeight*(window.devicePixelRatio === 1 ? 1 : 1.5));

          let settings = document.getElementsByClassName('settings')[0];
          settings.style.top = Math.floor((window.innerHeight - settings.offsetHeight) / 2) + 'px';
          settings.style.left = Math.floor((window.innerWidth - settings.offsetWidth) / 2) + 'px';
      }
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
    return [global.mapShiftX + j*(1.2/16), global.mapShiftY - i*(1.2/16)*16/9];
  }

  static translationForUnits(unit) {
    return [global.mapShiftX - 0.08 + unit.xpos*(1.2/16), global.mapShiftY - unit.ypos*(1.2/16)*16/9 + (1.2 / 12) * 16/9];
  }

  static transOnLowbar(i) {
    return [-0.95, 0.65 - i*0.17];
  }

  static transOnLowbarHealth(i) {
    return [-0.95, 0.65 - i*0.17 - 0.14]
  }

  static transActiveCircle(i) {
    return [-0.95 - 0.03,  0.65 - i*0.17 - 0.05];
  }

  static transActionPoint(i) {
      return [-0.95 + 0.085,  0.65 - i*0.17 - 0.032];
  }

  static transForHealthbar(unit) {
    return [global.mapShiftX + 0.003 + unit.xpos*(1.2/16), global.mapShiftY - unit.ypos*(1.2/16)*16/9 + (1.2/17)* 16/9];
  }
}
