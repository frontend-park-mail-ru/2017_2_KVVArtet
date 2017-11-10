import Block from '../baseview';
import './info.scss';
import Router from '../../modules/router';


const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Info extends Block {
    constructor() {
        super('div', ['info'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
            this.appendChildBlock("first",
                new Block('div', [infoBlock]).setText("TextBlock"));

            this.appendChildBlock("buttonBack",
                new Block('a', [buttonBack]));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0])
        }
        test.appendChild(this._element);

        let navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new Router().go('/')
        });
    }

}
export default Info;

