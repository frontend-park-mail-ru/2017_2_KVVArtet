'use strict'
import Block from '../baseview'
import './custom-module.scss'
 class Custom extends Block {
    constructor() {
        super('div', ['win'], {});
    }

    creation(text) {
        const wrape = document.querySelector('div.wrapper');

        wrape.appendChild(this._element);
        const overlay  = new Block('div',['overlay']);
        const visible  = new Block('div',['visible']);
        this.appendChildBlock('div',overlay);
        this.appendChildBlock('div',visible);
        document.querySelector('div.visible').innerHTML = `<h3>${text}</h3>`;
        visible.appendChildBlock('p',new Block('p',['link']));
        const button = document.querySelector('p');
        button.innerHTML = `<a class="remove">Close</a>`
        document.querySelector('a.remove').addEventListener('click',() => {
            document.querySelector('div.win').remove();
        })

    }

}
export default Custom;

