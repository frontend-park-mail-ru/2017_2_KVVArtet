import Block from '../baseview';
import './main-page.scss';
const imageWall = "wall";
const wrape = document.querySelector('div.menu');
import DemoGameModule from '../singleplay/DemoGameModule'
export const buttons = [
    {
        name: 'First',
        text: 'New Game',
        value: '/login'

    },
    {
        name: 'Second',
        text: 'Singleplayer',
        value:'/singleplay'

    },
    {
        name: 'Third',
        text: 'Registration',
            value: '/signup'
    },
    {
        name: 'Four',
        text: 'Information',
        value:'/info'

    }, {
        name: 'Five',
        text: 'Scoreboard',
        value:'/scoreboard'

    }
];

const blockClass = 'button';

export class MainPage extends Block {
    constructor() {
        super('ul', ['name'], {});
    }

    creation() {
        if (document.querySelector('div.wrapper') === null) {
            let game = new DemoGameModule();
             game.stopGameLoop();
            document.body.innerHTML = `<div id="application"></div>`
            const application = new Block(document.getElementById('application'));

            const wrapper = new Block('div', ['wrapper']);

            const images = "logo";
            application.appendChildBlock("logo",
                new Block('img', [images]));

            const logo = document.querySelector('img.logo');
            logo.setAttribute('src','../images/logo2.png');

            application.appendChildBlock('application', wrapper);
            wrapper.appendChildBlock('menu',new Block('div',['menu']))
        }
        const wrape = document.querySelector('div.menu');
        if (document.querySelector('div.menu') === null) {
            let banner = document.createElement("div");
            document.querySelector('div.wrapper').appendChild(banner)
            banner.setAttribute('class','menu');
            document.querySelector('div.menu').appendChild(this._element)
        }
        else {
            if (document.querySelector('div.menu').childNodes[0] !== undefined) {
                document.querySelector('div.menu').removeChild(document.querySelector('div.menu').childNodes[0]);
                console.log('remove')
            }

            wrape.appendChild(this._element);
        }
        if (document.querySelector('div.score') !==null) {
            document.querySelector('div.score').remove();
        }
        buttons.forEach((button) => {
            let newButtons  =  new Block('a', [blockClass + button.name]);
            this.appendChildBlock('a',newButtons);
            let but  =  document.querySelector('a.' + blockClass + button.name);
            but.innerHTML = `<li>${button.text}</li>`;
            but.querySelector('li').setAttribute('value',button.value);

        });

    }
 }
export default MainPage;

