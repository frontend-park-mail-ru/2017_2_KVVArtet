'use strict'
import Block from '../baseview'
import './custom-module.scss'
class Custom extends Block {
    constructor() {
        super('div', ['win'], {});
    }

    creation(text, href) {
        const wrape = document.querySelector('div.wrapper');
        document.body.style.height = '100%';
        document.body.appendChild(this._element);

        const visible  = new Block('div',['visible']);
        this.appendChildBlock('div',visible);
        document.querySelector('div.visible').innerHTML = `<h3>${text}</h3>`;
        this._element.style.top = Math.floor((window.innerHeight - this._element.offsetHeight)/2) + 'px';
        this._element.style.left = Math.floor((window.innerWidth - this._element.offsetWidth)/2) + 'px';
        if (href) {
            visible.appendChildBlock('p',new Block('p',['link']));
            const button = document.querySelector('p');
            button.innerHTML = `<a class="remove">Close</a>`;
            document.querySelector('a.remove').addEventListener('click',() => {
                document.querySelector('div.win').remove();
            });
        }
    }

}
export default Custom;