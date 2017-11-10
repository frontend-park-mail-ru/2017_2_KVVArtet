import Block from '../baseview';
import './game.scss';


const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Game extends Block {
    constructor() {
        super('div', ['game'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock("first",
            new Block('div', [infoBlock]).setText("Game"));
        this.appendChildBlock('game', new Block('a', ['logout']).setText('logout'))
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0])
        }
        test.appendChild(this._element);

    }

}
export default Game;

