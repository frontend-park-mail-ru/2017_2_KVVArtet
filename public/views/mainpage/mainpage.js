import Block from '../baseview';
import './main-page.scss';
import UserService from '../../servises/user-service';

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
const valuePage = [`/login`,`/singleplay`,'/signup',`/info`,`/scoreboard/1`];
const text = [`New Game`,`Singleplayer`,`Registration`,`Authors`,`Scoreboard`];
export class MainPage extends Block {
    constructor() {
        super('ul', ['name'], {});
    }

    creation() {
        if (document.querySelector('div.wrapper') === null) {
            let game = new DemoGameModule();
             game.stopGameLoop();
            document.body.innerHTML = `<div id="application"></div>`;
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
            while (document.querySelector('div.wrapper').firstChild) {
                document.querySelector('div.wrapper').removeChild(document.querySelector('div.wrapper').firstChild);
            }
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

            wrape.appendChild(document.createElement('ul'))
            wrape.querySelector('ul').setAttribute('class','name')
        }
        if (document.querySelector('div.score') !==null) {
            document.querySelector('div.score').remove();
        }


        for (let i = 0;i<5;++i) {
            document.querySelector('ul.name').appendChild(document.createElement('a'));

        }
        let allButtons = document.getElementsByTagName('a');
        for (let i = 0; i<5; ++i) {
            allButtons[i].innerHTML = `<li>${text[i]}</li>`
            allButtons[i].querySelector('li').setAttribute('value',valuePage[i])
        }

        if (document.cookie && !document.getElementById('user-menu')) {
            let username = getCookie('username');
            let email = getCookie('email');
            document.body.innerHTML += `<div id="user-menu" style="position:absolute;top: 0;  background: white;right: 0;"><p style="margin: 4px;">${username}
            </p><a id="logout" style="margin: 4px;">Logut</a></div>`;
            document.getElementById('logout').addEventListener('click', function() {
                deleteCookie('username');
                deleteCookie('password');
                document.getElementById('user-menu').remove();
                new UserService().logout(username, email);
            });
        }
    }
 }

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default MainPage;

