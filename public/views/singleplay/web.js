import Block from '../baseview';
import DemoGameModule from './DemoGameModule';
import Loading from './Loading';

export default class SinglePlay extends Block {
    constructor() {
        super();

        this.template = require('./web.html');
    }

    creation() {
        document.getElementById('application').innerHTML = this.template;

        let loading = new Loading();
        let game = new DemoGameModule();
        game.gamePreRender();
    }

}
