import Block from '../baseview'
import  Background from './Background'
import DungeonMapMaker from "./DungeonMapMaker"
import GameManager from "./GameManager"


export default class SinglePlay extends Block {
    constructor() {
        super();

        this.template = require('./web.html');
    }

    creation() {
     //  this._element.innerHTML = this.template;
      document.body.innerHTML = this.template;

        // document.body.remove();
      const back = new Background(new DungeonMapMaker().dungeonMapMaker(Math.random() * 10 + 25));
       back.render();
        const units = new GameManager();
        units.startGameRendering();
    }

}