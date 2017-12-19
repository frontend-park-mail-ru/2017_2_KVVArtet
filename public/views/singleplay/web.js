import Block from '../baseview';
import DemoGameModule from './DemoGameModule';

export default class SinglePlay extends Block {
    constructor() {
        super();

        this.template = require('./web.html');
    }

    creation() {
         document.getElementById('application').innerHTML = this.template;
       // document.querySelector('div.wrapper').innerHTML = this.template;
        let game = new DemoGameModule();

        game.gamePreRender();

    }

}
