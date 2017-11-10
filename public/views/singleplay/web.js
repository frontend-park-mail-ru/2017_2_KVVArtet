import Block from '../baseview'
import GameModule from "./GameModule"

export default class SinglePlay extends Block {
  constructor() {
    super();

    this.template = require('./web.html');
  }

  creation() {
    document.body.innerHTML = this.template;

    let gamegame = new GameModule();
    gamegame.gameGraphic();

  }

}
