import './choose.scss'
import Custom from '../../custom-module/custom-module'
import Router from '../../../modules/router'
const button = [`Single Play`,`MultiPlayer`];
const classes  = [`single`,`multi`]
const wrape = document.querySelector('div.wrapper');

export default class GameType {
    creation() {
        const application = document.querySelector('div#application')
        if(document.querySelector('div.wrapper') === null) {
            while (application.firstChild) {
                    application.removeChild(document.querySelector('div#application').firstChild);
            }
            const wrape = document.querySelector('div#application').appendChild(document.createElement('div'));
            wrape.setAttribute('class','wrapper')
           const logoClass = application.appendChild(document.createElement('img'));
            logoClass.setAttribute('class','logo')
            logoClass.setAttribute('src','../../../images/logo2.png');
        }


        while (document.querySelector('div.wrapper').firstChild) {
            document.querySelector('div.wrapper').removeChild(document.querySelector('div.wrapper').firstChild);
        }
        let variant = document.querySelector('div.wrapper').appendChild(document.createElement("div"));
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
            new Custom().creation('Coming soon....', true);
        })

        document.querySelector('a.single').addEventListener('click',() =>{
            new Router().go('/singleplay')
        })
    }
}
