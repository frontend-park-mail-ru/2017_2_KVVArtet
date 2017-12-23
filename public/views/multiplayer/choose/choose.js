import './choose.scss'
import Custom from '../../custom-module/custom-module'
import Router from '../../../modules/router'

const button = [`Single Play`,`MultiPlayer`];
const classes  = [`single`,`multi`]
const wrape = document.querySelector('div.wrapper');

export default class GameType {
    creation() {
        while (document.querySelector('div.wrapper').firstChild) {
            document.querySelector('div.wrapper').removeChild(document.querySelector('div.wrapper').firstChild);
        }
        let variant = wrape.appendChild(document.createElement("div"));
        variant.setAttribute('class', 'variant')

        for (let i = 0; i < 2; ++i) {
            variant.appendChild(document.createElement("a"));
        }
        const buttons = document.getElementsByTagName('a');

        for (let i = 0; i < 2; ++i) {
            buttons[i].setAttribute('class', classes[i])
            buttons[i].innerHTML = button[i];
        }
        document.querySelector('a.multi').addEventListener('click',() =>{
            new Custom().creation('Coming soon....')
        })

        document.querySelector('a.single').addEventListener('click',() =>{
            new Router().go('/singleplay')
        })
    }
}
